use std::fs::File;
use std::io::prelude::*;
use std::sync::Mutex;
use std::path::Path;
use regex::Regex;
use lazy_static::lazy_static;
use walkdir::{WalkDir, DirEntry};
use crate::theme::Theme;
pub struct ThemesCollection {
    themes: Vec<Theme>,
    current_theme: Theme,
}
impl ThemesCollection {
    pub fn new() -> ThemesCollection {
        let themes = vec![
            Theme::from_file("../src/themes_css/default_dark.css".to_string()).unwrap(),
            Theme::from_file("../src/themes_css/default_light.css".to_string()).unwrap(),
        ];
        ThemesCollection {
            current_theme: themes[0].clone(), // Мы клонируем первый элемент, чтобы избежать ошибок владения
            themes,
        }
    }
    // pub fn initialize_themes(&mut self) -> Result<(), Box<dyn std::error::Error>> {
    //     for entry in WalkDir::new("../src/themes_css")
    //         .into_iter()
    //         .filter_map(|e| e.ok())
    //         .filter(|e| !e.file_type().is_dir()) {
    //         let theme = Theme::from_file(entry.path().to_str().unwrap().to_string())?;
    //         self.themes.push(theme);
    //     }
    //     Ok(())
    // }
}
