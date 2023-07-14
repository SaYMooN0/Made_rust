use std::fs::File;
use std::io::prelude::*;
use std::io::BufWriter;
use std::io::{BufRead, BufReader};
use std::string;

use serde::{Deserialize, Serialize};

use super::project_setting;

#[derive(Serialize, Deserialize, Clone)]
pub struct Project {
    pub name: String,
    pub version: String,
    pub loader: String,
    pub directory: String,
    pub full_path: String,
    pub items_collection: Vec<String>,
    pub tags_collection: Vec<String>,
    pub settings: project_setting::ProjectSettings,
}

impl Project {
    pub fn new(path: &str, project_name: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let mut full_path: String = path.to_owned();
        full_path += "\\";
        full_path += &project_name;
        full_path += ".madeProject";
        let file = File::open(&full_path.clone())?;
        let mut reader = BufReader::new(file);

        let mut name = String::new();
        let mut version = String::new();
        let mut loader = String::new();
        let mut items_collection = Vec::new();
        let mut tags_collection = Vec::new();
        let mut parsing_items = false;
        let mut parsing_tags = false;

        let mut full_file_string = String::new();
        reader.read_to_string(&mut full_file_string)?;

        let mut lines = full_file_string.lines();

        let mut project_settings_string = String::new();

        while let Some(line) = lines.next() {
            let line = line.to_string(); // Сконвертируем &str в String
            if line.starts_with("name:") {
                name = line.split(':').nth(1).unwrap().trim().to_string();
            } else if line.starts_with("version:") {
                version = line.split(':').nth(1).unwrap().trim().to_string();
            } else if line.starts_with("loader:") {
                loader = line.split(':').nth(1).unwrap().trim().to_string();
            } else if line.starts_with("items_collection:") {
                parsing_items = true;
            } else if line.starts_with("tags_collection:") {
                parsing_items = false;
                parsing_tags = true;
            } else if parsing_items {
                if let Some(item) = line.strip_suffix(';') {
                    items_collection.push(item.trim().to_string());
                }
            } else if line.starts_with("Settings:") {
                parsing_tags = false;
                project_settings_string = lines.collect::<Vec<&str>>().join("\n");
                break;
            } else if parsing_tags {
                if let Some(tag) = line.strip_suffix(';').map(|s| s.trim()) {
                    tags_collection.push(tag.to_string());
                }
            }
        }
        let settings = project_setting::ProjectSettings::new(project_settings_string);

        Ok(Self {
            name,
            version,
            loader,
            directory: path.to_string(),
            full_path: full_path,
            items_collection,
            tags_collection,
            settings,
        })
    }
    pub fn create_project_file(
        name: &str,
        path: &str,
        version: &str,
        loader: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let file = File::create(path)?;
        let mut writer = BufWriter::new(&file);
        writer.write_all(b"!doctype:madefile\n")?;
        writer.write_fmt(format_args!("name:{}\n", name))?;
        writer.write_fmt(format_args!("version:{}\n", version))?;
        writer.write_fmt(format_args!("loader:{}\n", loader))?;
        writer.write_all(b"items_collection:\n{\n\n}\n")?;
        writer.write_all(b"tags_collection:\n{\n\n}\n")?;
        writer.write_fmt(format_args!("settings:\n"))?;
        writer.flush()?;

        Ok(())
    }
}
impl Default for Project {
    fn default() -> Self {
        let setings_string=String::from("-1");
        Self {
            name: String::from("-1"),
            version: String::from("0.1.0"),
            loader: String::from("default_loader"),
            directory: String::from("/default/directory"),
            full_path: String::from("/default/fullpath"),
            items_collection: Vec::new(),
            tags_collection: Vec::new(),
            settings: project_setting::ProjectSettings::new(setings_string),
        }
    }
}
