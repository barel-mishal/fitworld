use std::{collections::HashMap, error::Error, str::FromStr};

use serde::{Deserialize, Serialize};
use surrealdb::{engine::remote::ws::Client, method::Query, sql::Thing, Surreal};
use crate::db_food_group::{FoodGroup, Ingredient as DbIngredient, Measurements as DbMeasurements, IngredientMeasurements as DbIngredientMeasurements};



#[derive(Serialize, Deserialize, Debug)]
pub struct FoodGroupData {
    data: Data,
    groups: Vec<Group>,
}

impl FoodGroupData {
    pub fn db_hydrate_food_group(&self) -> Vec<FoodGroup> {
        let data = &self.groups;
        data.iter().map(|x| {
            let name: String = insert_spaces_before_uppercase_letters(x.key.clone());
            let id = format!("Food_Group:{}", x.key.clone());
            FoodGroup::new(
                id,
                name,
                x.name.clone(),
                x.info.clone(),
                x.calories,
                x.carbs,
                x.protein,
                x.fats,
            )
        }).collect()
    }
    pub fn db_hydrate_measurement(&self) -> HashMap<Thing, DbMeasurements> {
        let measurements_set: HashMap<Thing, DbMeasurements> = self.data.ingredients
        .iter()
        .fold(HashMap::new(), |mut acc, x| {
            x.measurements.iter()
            .for_each(|x| {
                let unit_name: String = x.english_name.clone().chars().filter(|c| c.is_alphabetic() || c.is_numeric()).collect();
                if unit_name.is_empty() {
                    return;
                };
                let unit_name = create_measurement_id(&unit_name);
                let key = Thing::from_str(&unit_name).expect(format!("Failed to create Thing from {}", unit_name).as_str());
                let value = DbMeasurements::new(
                    key.clone(),
                    x.english_name.clone(),
                    x.name.clone(),
                );
                acc.insert(key, value);
            });
            acc
        });
        measurements_set
    }
    pub async fn db_hydrate_ingredient(&self, db: Surreal<Client>) -> Result<(), Box<dyn Error>>
    {
        let data = &self.data.ingredients;
        for ing in data {
            let all_measurements = ing.measurements.clone();
            let first_measurement = ing.measurements.first().unwrap();
            let group_id = format!("Food_Group:{}", ing.group_type.clone());
            let group = Thing::from_str(group_id.as_str()).expect(format!("Failed to create Thing from {}", group_id.clone()).as_str());
            let selected_measurement = Self::create_thing_from_english_name_for_measurment(first_measurement.english_name.clone());
            match selected_measurement {
                None => {
                    println!("selected_measurement is None");
                    return Ok(());
                },
                selected_measurement => {
                    let ingredient = DbIngredient::new(
                        group,
                        selected_measurement.unwrap(),
                        ing.food_group_number.clone(),
                        ing.english_name.clone(),
                        ing.name.clone(),
                        ing.serving,
                        first_measurement.unit_weight.clone(),
                        ing.add_protein,
                        ing.add_fat,
                        ing.add_carbs,
                        ing.amount,
                    );
                    let ingredients_db: Vec<DbIngredient> = db.create("Ingredient").content(ingredient).await?;
                    let record = ingredients_db.iter().next().unwrap();

                    match &record.id {
                        None => {
                            println!("record is None");
                            return Ok(());
                        },
                        id => {
                            for x in all_measurements {
                                let out = Self::create_thing_from_english_name_for_measurment(x.english_name.clone()).expect(format!("Failed to create Thing from {}", x.english_name).as_str());
                                let weight = x.weight;
                                let unit = x.english_unit_weight.clone();
                                let food_measurement = DbIngredientMeasurements::new(
                                    id.clone().unwrap(), 
                                    out, 
                                    weight, 
                                    unit, 
                                );
                                let query = format!("RELATE {}->ingredient_measurements->{} CONTENT {}", food_measurement.r#in, food_measurement.out, serde_json::to_string(&food_measurement).unwrap());
                                println!("query: {}", query);
                                let mut ingredient_measurements_db = db.query(query).await?;
                                let record: Vec<DbIngredientMeasurements> = ingredient_measurements_db.take(0)?;
                                println!("record: {:?}", record);
                            }
                        }
                    }
                }
            }
        }
        
        Ok(())
    }
    pub fn db_hydrate_food_measurement<F>(&self, get_ingredient_record: F, get_measurment_record: F) -> Vec<(Thing, DbIngredientMeasurements)> 
    where F: Fn(&str) -> Thing
    {
        let data = &self.data.ingredients;
        let data = data.iter().flat_map(|x| {
            let ingredient_record = get_ingredient_record(&x.english_name);
            let measurement_record = get_measurment_record(&x.english_name);
            let measurement: Vec<_> = x.measurements.iter().map(|x| {
                let weight = x.weight;
                let unit_name: String = x.unit_weight.clone();
                (
                    ingredient_record.clone(), 
                    DbIngredientMeasurements::new(
                        ingredient_record.clone(),
                        measurement_record.clone(),
                        weight,
                        unit_name,
                    )
                )
            }).collect();
            measurement
        });
        data.collect()
    }

    pub fn create_thing_from_english_name_for_measurment(english_name: String) -> Option<Thing> {
        let unit_name: String = english_name.chars().filter(|c| c.is_alphabetic() || c.is_numeric()).collect();
        if unit_name.is_empty() {
            return None;
        }
        let str_id = format!("Measurements:⟨{}⟩", unit_name);
        Some(Thing::from_str(&str_id).expect(format!("Failed to create Thing from {}", str_id).as_str()))
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Data {
    // group: HashMap<String, Group>,
    ingredients: Vec<Ingredient>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Group {
    #[serde(default)]
    name: String,
    #[serde(default)]
    calories: f32,
    #[serde(default)]
    carbs: f32,
    #[serde(default)]
    fats: f32,
    #[serde(default)]
    protein: f32,
    #[serde(default)]
    units: Vec<UnitGroup>,
    #[serde(default)]
    info: Vec<String>,
    #[serde(default)]
    comment: HashMap<String, serde_json::Value>,
    #[serde(rename = "foodGroupNumber", default)]
    food_group_number: Vec<i32>,
    #[serde(default)]
    key: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct Ingredient {
    #[serde(default, rename = "addCarbs")]
    add_carbs: f32,
    #[serde(default, rename = "addFat")]
    add_fat: f32,
    #[serde(default, rename = "addProtein")]
    add_protein: f32,
    #[serde(default)]
    amount: f32,
    #[serde(default, rename = "englishName")]
    english_name: String,
    #[serde(default, rename = "groupType")]
    group_type: String,
    #[serde(default)]
    id: String,
    #[serde(default)]
    measurements: Vec<Measurement>,
    #[serde(default)]
    name: String,
    #[serde(default, rename = "selectedUnitName")]
    selected_unit_name: String,
    #[serde(default)]
    serving: f32,
    #[serde(default, rename = "servingUnit")]
    serving_unit: String,
    #[serde(default, rename = "foodGroupNumber")]
    food_group_number: Vec<i32>,
    #[serde(default)]
    comment: HashMap<String, serde_json::Value>,
}

#[derive(Serialize, Deserialize, Debug)]
struct UnitGroup {
    #[serde(default)]
    name: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Measurement {
    #[serde(default, rename = "englishName")]
    english_name: String,
    #[serde(default, rename = "englishUnitWeight")]
    english_unit_weight: String,
    #[serde(default)]
    name: String,
    #[serde(default, rename = "unitWeight")]
    unit_weight: String,
    #[serde(default)]
    weight: f32,
}





fn insert_spaces_before_uppercase_letters(key: String) -> String {
    key.chars()
        .fold((String::new(), false), |(mut result, mut prev_is_lowercase), c| {
            if c.is_uppercase() && prev_is_lowercase {
                result.push(' ');
            }
            result.push(c);
            (result, c.is_lowercase())
        })
        .0
}

pub fn create_measurement_id(name: &str) -> String {
    format!("Measurements:⟨{}⟩", name)
}
pub fn create_ingredient_id(name: &str) -> String {
    format!("Ingredient:{}", name)
}
pub fn create_ingredient_measurement_id(name: &str) -> String {
    format!("Ingredient_Measurements:⟨{}⟩", name)
}
pub fn create_food_group_id(name: &str) -> String {
    format!("Food_Group:{}", name)
}