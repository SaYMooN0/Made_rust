use std::fs::File;
use std::io::prelude::*;
use regex::Regex;
pub struct Theme {
    name: String,
    main_back: String,
    second_back: String,
    main_front: String,
    second_front: String,
    main_bright: String,
    second_bright: String,
}

impl Theme {
    pub fn new(
        name: String,
        main_back: String,
        second_back: String,
        main_front: String,
        second_front: String,
        main_bright: String,
        second_bright: String,
    ) -> Self {
        Theme {
            name,
            main_back,
            second_back,
            main_front,
            second_front,
            main_bright,
            second_bright,
        }
    }

    pub fn get_full_path(&self) -> String {
        format!("../themes_css/{}.css", self.name)
    }
    pub fn from_file(path: String) -> Result<Self, Box<dyn std::error::Error>> {
        let mut file = File::open(&path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;

        let re = Regex::new(r"--main-backcolor:\s*(.*?);\s*--second-backcolor:\s*(.*?);\s*--main-frontcolor:\s*(.*?);\s*--second-frontcolor:\s*(.*?);\s*--main-brightcolor:\s*(.*?);\s*--second-brightcolor:\s*(.*?);")?;

        let caps = re
            .captures(&contents)
            .ok_or("Failed to match the pattern")?;
        let name = path.split("/").last().unwrap().replace(".css", "");
        Ok(Theme {
            name,
            main_back: caps[1].to_string(),
            second_back: caps[2].to_string(),
            main_front: caps[3].to_string(),
            second_front: caps[4].to_string(),
            main_bright: caps[5].to_string(),
            second_bright: caps[6].to_string(),
        })
    }
}
