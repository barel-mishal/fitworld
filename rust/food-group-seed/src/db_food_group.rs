use std::str::FromStr;

use serde::{Deserialize, Serialize, Serializer};
use surrealdb::sql::{Datetime, Thing};
use serde::ser::SerializeStruct;


#[derive(Serialize, Deserialize, Debug)]
pub struct FoodGroup {
    id: Option<Thing>,
    group_name: String,
    group_hebrew_name: String,
    info: Vec<String>,
    calories: f32,
    carbs: f32,
    protein: f32,
    fats: f32,
}

impl FoodGroup {
    pub fn new(id: String, group_name: String, group_hebrew_name: String, info: Vec<String>, calories: f32, carbs: f32, protein: f32, fats: f32) -> Self {
        Self {
            id: Thing::from_str(id.as_str()).ok(),
            group_name,
            group_hebrew_name,
            info,
            calories,
            carbs,
            protein,
            fats,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ingredient {
    pub id: Option<Thing>,
    group: Thing,
    #[serde(rename = "selectedMeasurement")]
    selected_measurement: Thing,
    #[serde(rename = "foodGroupNumber")]
    food_group_number: Vec<i32>,
    name: String,
    hebrew_name: String,
    serving: f32,
    #[serde(rename = "servingUnit")]
    serving_unit: String,
    #[serde(rename = "addProtein")]
    add_protein: f32,
    #[serde(rename = "addFat")]
    add_fat: f32,
    #[serde(rename = "addCarbs")]
    add_carbs: f32,
    amount: f32,
}

impl Ingredient {
    pub fn new(group: Thing, selected_measurement: Thing, food_group_number: Vec<i32>, name: String, hebrew_name: String, serving: f32, serving_unit: String, add_protein: f32, add_fat: f32, add_carbs: f32, amount: f32) -> Self {
        Self {
            id: None,
            group,
            selected_measurement,
            food_group_number,
            name,
            hebrew_name,
            serving,
            serving_unit,
            add_protein,
            add_fat,
            add_carbs,
            amount,
        }
    }
}

#[derive(Deserialize, Debug)]
pub struct IngredientMeasurements {
    pub id: Option<Thing>,
    pub r#in: Thing,
    pub out: Thing,
    weight: f32,
    unit: String,
    hebrew_unit: String,
}

impl IngredientMeasurements {
    pub fn new(r#in: Thing, out: Thing, weight: f32, unit: String, hebrew_unit: String) -> Self {
        Self {
            id: None,
            r#in,
            out,
            weight,
            unit,
            hebrew_unit,
        }
    }
}

impl Serialize for IngredientMeasurements {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("FoodMeasurement", 5)?;
        state.serialize_field("in", &format!("{}", self.r#in))?;
        state.serialize_field("out", &format!("{}", self.out))?;
        state.serialize_field("weight", &self.weight)?;
        state.serialize_field("unit", &self.unit)?;
        state.end()
    }
}


#[derive(Serialize, Deserialize, Debug)]
pub struct Measurements {
    id: Option<Thing>,
    name: String,
    hebrew_name: String,
}

impl Measurements {
    pub fn new(id: Thing, name: String, hebrew_name: String) -> Self {
        Self {
            id: Some(id),
            name,
            hebrew_name,
        }
    }
    
}

#[derive(Serialize, Deserialize, Debug)]
struct Eat {
    id: Option<Thing>, 
    #[serde(rename = "userId")]
    user_id: Thing,
    food: Thing,
    amount: f32,
    measurement: Thing,
    #[serde(rename = "createdAt")]
    created_at: Datetime,
    #[serde(rename = "updatedAt")]
    updated_at: Datetime,
    #[serde(rename = "eatAt")]
    eated_at: Datetime,
    commited: Option<Datetime>,
}