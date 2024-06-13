use std::error::Error;
use std::{fs::File, path::Path};
use std::io::BufReader;


use crate::food_group_raw_data;
use food_group_raw_data::FoodGroupData;


pub fn read_json_file<P: AsRef<Path>>(path: P) -> Result<serde_json::Value, Box<dyn Error>> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let data = serde_json::from_reader(reader)?;
    Ok(data)
}
pub fn read_json_file_data<P: AsRef<Path>>(path: P) -> Result<FoodGroupData, Box<dyn Error>> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let data = serde_json::from_reader(reader)?;
    Ok(data)
}
fn export_json_file<P: AsRef<Path>>(path: P, data: serde_json::Value) -> Result<(), Box<dyn Error>> {
    let file = File::create(path)?;
    serde_json::to_writer_pretty(file, &data)?;
    Ok(())
}
