
use std::collections::HashMap;
use std::fmt;
use std::fs;
use std::fs::{File, OpenOptions};
use std::io::prelude::*;
use std::io::{BufReader, Read, Write};
use std::path::Path;
use std::str::FromStr;
use crate::structs::project::Project;
pub struct MadeSettings {
    current_theme: Theme,
    projects: HashMap<String, String>,
}

impl MadeSettings {
    pub fn new() -> Self {
        let theme_file_path = Path::new("themes.madeSettings");
        let links_file_path = Path::new("links.madeSettings");
        let default_theme_str = "dark";
        let default_theme = Theme::Dark;
        let theme_file_content = Self::read_or_create_file(&theme_file_path, &default_theme_str);
        let current_theme = Theme::from_str(theme_file_content.trim()).unwrap_or_else(|_| {
            Self::write_to_file(&theme_file_path, &default_theme_str);
            default_theme
        });
        let mut projects = HashMap::new();
        Self::read_or_create_file(&links_file_path, "");
        let links_file_content = Self::read_from_file(&links_file_path);
        for line in links_file_content.lines() {
            let parts: Vec<&str> = line.splitn(2, '=').collect();
            if parts.len() == 2 {
                projects.insert(parts[0].to_string(), parts[1].to_string());
            }
        }
        MadeSettings {
            current_theme,
            projects,
        }
    }
    fn read_or_create_file(file_path: &Path, default_content: &str) -> String {
        if !file_path.exists() {
            let mut file = File::create(file_path).expect("Failed to create file");
            write!(file, "{}", default_content).expect("Failed to write to file");
            default_content.to_string()
        } else {
            Self::read_from_file(file_path)
        }
    }
    fn read_from_file(file_path: &Path) -> String {
        let mut file = OpenOptions::new()
            .read(true)
            .open(file_path)
            .expect("Failed to open file");
        let mut content = String::new();
        file.read_to_string(&mut content)
            .expect("Failed to read from file");
        content
    }

    fn write_to_file(file_path: &Path, content: &str) {
        let mut file = OpenOptions::new()
            .write(true)
            .open(file_path)
            .expect("Failed to open file");
        write!(file, "{}", content).expect("Failed to write to file");
    }

    pub fn get_current_theme(&self) -> String {
        self.current_theme.to_string()
    }
    pub fn get_projects_dictionary(&self) -> HashMap<String, String> {
        self.projects.clone()
    }
    pub fn add_project(&mut self, name: String, path: String, version: String) {
        let mut full_path: String = path.to_owned();
        full_path += "\\";
        full_path += &name;
        full_path += ".madeProject";
        match Project::create_project_file(&name, &full_path,&version){
            Ok(project) => {self.projects.insert(name.clone(), path.clone());
                let links_file_path = Path::new("links.madeSettings");
                let mut file = OpenOptions::new()
                    .write(true)
                    .append(true)
                    .open(&links_file_path)
                    .expect("Failed to open file");
                writeln!(file).expect("Failed to write new line to file");
                writeln!(file, "{}={}", name, full_path).expect("Failed to write to file");
                },
            Err(error) => {
                eprintln!("Ошибка при создании проекта: {}", error);
            }
        }
    }
    pub fn remove_project(&mut self, key: String) -> std::io::Result<()> {
        self.projects.remove(&key);
        let file_path = "links.madeSettings";
        let file = File::open(file_path)?;
        let reader = BufReader::new(file);
        let lines: std::io::Result<Vec<String>> = reader.lines().collect();
        let filtered_lines: Vec<String> = lines?
            .into_iter()
            .filter(|line| !line.starts_with(&format!("{}=", key)))
            .collect();
        fs::write(file_path, filtered_lines.join("\n"))?;
        Ok(())
    }
}
enum Theme {
    Dark,
    Light,
    Users,
}

impl FromStr for Theme {
    type Err = ();

    fn from_str(s: &str) -> Result<Theme, ()> {
        match s {
            "dark" => Ok(Theme::Dark),
            "light" => Ok(Theme::Light),
            "users" => Ok(Theme::Users),
            _ => Err(()),
        }
    }
}
impl fmt::Display for Theme {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let printable = match *self {
            Theme::Dark => "dark",
            Theme::Light => "light",
            Theme::Users => "users",
        };
        write!(f, "{}", printable)
    }
}
