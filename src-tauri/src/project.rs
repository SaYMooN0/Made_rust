use std::fs::File;
use std::io::{BufRead, BufReader};

pub struct Project {
    pub name: String,
    pub version: String,
    pub path: String,
    pub items_collection: Vec<String>,
    pub tags_collection: Vec<String>,
}

impl Project {
    pub fn new(file_path: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let file = File::open(file_path)?;
        let reader = BufReader::new(file);

        let mut name = String::new();
        let mut version = String::new();
        let mut items_collection = Vec::new();
        let mut tags_collection = Vec::new();
        let mut parsing_items = false;
        let mut parsing_tags = false;

        for line in reader.lines() {
            let line = line?;
            if line.starts_with("name:") {
                name = line.split(':').nth(1).unwrap().trim().to_string();
            } else if line.starts_with("version:") {
                version = line.split(':').nth(1).unwrap().trim().to_string();
            } else if line.starts_with("items_collection:") {
                parsing_items = true;
            } else if line.starts_with("tags_collection:") {
                parsing_items = false;
                parsing_tags = true;
            } else if parsing_items {
                if let Some(item) = line.strip_suffix(';') {
                    items_collection.push(item.trim().to_string());
                }
            } else if parsing_tags {
                if let Some(tag) = line.strip_prefix('#').map(|s| s.trim()) {
                    tags_collection.push(tag.to_string());
                }
            }
        }

        Ok(Self {
            name,
            version,
            path: file_path.to_string(),
            items_collection,
            tags_collection,
        })
    }
}
