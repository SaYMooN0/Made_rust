// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use lazy_static::lazy_static;
use structs::project::Project;
use std::fs::File;
use std::io::{self, BufRead, Read};
use std::path::Path;
use std::sync::Mutex;
mod structs;
use structs::{made_settings, project};
lazy_static! {
    static ref SETTINGS: Mutex<made_settings::MadeSettings> =
        Mutex::new(made_settings::MadeSettings::new());
    static ref CURRENT_PROJECT: Mutex<project::Project> =
        Mutex::new(project::Project::default());
}
#[tauri::command]
fn set_current_project(path: String, name: String) {
    let mut current_project = CURRENT_PROJECT.lock().unwrap();
    match project::Project::new(&path,&name) {
        Ok(project) => *current_project = project,
        Err(error) => {
            *current_project=project::Project::default();
        }
    }
}
#[tauri::command]
fn get_current_project()->Project {
    return  CURRENT_PROJECT.lock().unwrap().clone();
}

#[tauri::command]
fn get_projects() -> Vec<Vec<String>> {
    let setting_for_made = SETTINGS.lock().unwrap();
    let projects_dictionary = setting_for_made.get_projects_dictionary();

    let projects_to_send: Vec<Vec<String>> = projects_dictionary
        .into_iter()
        .map(|(key, value)| vec![key, value.clone(), get_project_version(value.clone())])
        .collect();
    return projects_to_send;
}
#[tauri::command]
fn get_current_theme_name() -> String {
    let setting_for_made = SETTINGS.lock().unwrap();
    return setting_for_made.get_current_theme();
}
#[tauri::command]
fn add_project(name: String, path: String, version: String, loader:String) {
    let mut setting_for_made = SETTINGS.lock().unwrap();
    setting_for_made.add_project(name, path, version, loader);

}
#[tauri::command]
fn remove_project(name: String) {
    let mut setting_for_made = SETTINGS.lock().unwrap();
    setting_for_made.remove_project(name).unwrap();
}
#[tauri::command]
fn get_creation_info(directory_name: &str) -> String {
    let full_path = directory_name.to_owned() + "\\minecraftinstance.json";
    let path = Path::new(&full_path);
    let mut file = match File::open(&path) {
        Err(_) => return "-1".to_string(),
        Ok(file) => file,
    };
    let name = match path.parent() {
        Some(parent) => match parent.file_name() {
            Some(name) => match name.to_str() {
                Some(name) => name.to_string(),
                None => return "-1".to_string(),
            },
            None => return "-1".to_string(),
        },
        None => return "-1".to_string(),
    };
    let mut contents = String::new();
    if let Err(_) = file.read_to_string(&mut contents) {
        return "-1".to_string();
    };
    let version_start = match contents.find("\"minecraftVersion\":") {
        Some(start) => start,
        None => return "-1".to_string(),
    };
    let version_end = match contents[version_start..].find(',') {
        Some(end) => end,
        None => return "-1".to_string(),
    };
    let version = &contents[version_start..version_start + version_end]
        .split("\"minecraftVersion\":")
        .collect::<Vec<&str>>()[1]
        .trim()
        .trim_matches(',')
        .trim_matches('\"');
    let mut clean_version:String =  version.to_string();
    clean_version.retain(|c| c.is_digit(10) || c == '.');
    let loader_section_start = match contents.find("\"baseModLoader\":") {
        Some(start) => start,
        None => return "-1".to_string(),
    };
    let loader_name_start = match contents[loader_section_start..].find("\"name\":") {
        Some(start) => start + loader_section_start,
        None => return "-1".to_string(),
    };
    let loader_name_end = match contents[loader_name_start..].find("\",") {
        Some(end) => end + loader_name_start,
        None => return "-1".to_string(),
    };
    let loader_name: &str = &contents[loader_name_start..loader_name_end]
        .split("\"name\":")
        .collect::<Vec<&str>>()[1]
        .trim()
        .trim_matches('\"');
    let clean_loader = &loader_name.split('-').next().unwrap_or("-1").to_string();
    format!("{}|{}|{}", clean_version, name, clean_loader)
}
fn get_project_version(file_path: String) -> String {
    let path = Path::new(&file_path);
    match File::open(&path) {
        Ok(file) => {
            let lines: Result<Vec<String>, _> = io::BufReader::new(file).lines().collect();

            match lines {
                Ok(lines) => match lines.get(2) {
                    Some(line) => {
                        let parts: Vec<&str> = line.split(':').collect();
                        if parts.len() < 2 {
                            String::from("-0")
                        } else {
                            String::from(parts[1])
                        }
                    }
                    None => String::from("-0"),
                },
                Err(_) => String::from("-0"),
            }
        }
        Err(_) => String::from("-0"),
    }
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_current_theme_name,
            add_project,
            get_projects,
            remove_project,
            get_creation_info,
            get_current_project,
            set_current_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
