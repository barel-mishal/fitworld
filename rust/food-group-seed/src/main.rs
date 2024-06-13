use std::error::Error;

use surrealdb::{engine::remote::ws::Ws, opt::auth::Root, Surreal};
use util::read_json_file_data;

use crate::db_food_group::{FoodGroup, Measurements};

mod food_group_raw_data;
mod db_food_group;
mod util;


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let path = "/Users/barel/projects/food-group/food_groups_export.json";
    
    let data = read_json_file_data(path)?;

    let db = Surreal::new::<Ws>("127.0.0.1:8000").await?;

    // Signin as a namespace, database, or root user
    db.signin(Root {
        username: "root",
        password: "root",
    })
    .await?;

    // Select a specific namespace / database
    db.use_ns("namespace").use_db("database").await?;


    let food_group = data.db_hydrate_food_group();
    println!("food_group");
    for group in food_group {
        let food_group_db: Vec<FoodGroup> = db.create("Food_Group").content(group).await?;
        let record = food_group_db.first().unwrap();
        println!("record: {:?}", record);
    }
    let measurements = data.db_hydrate_measurement();
    println!("measurements");
    for (key, value) in measurements {
        let measurements_db: Vec<Measurements> = db.create("Measurements").content(value).await?;
        let record = measurements_db.first().unwrap();
        println!("record: {:?}", record);
    }
    println!("ingredients");
    println!("path: {}", path);
    let ingredients = data.db_hydrate_ingredient(db).await?;
    println!("ingredients: end");
    println!("path: {}", path); 


    
    Ok(())
}

