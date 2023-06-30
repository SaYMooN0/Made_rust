// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{sync::Mutex, collections::HashMap};
use lazy_static::lazy_static;

mod made_settings;
mod project;
use project::Project;


lazy_static! {
    static ref SETTINGS: Mutex<made_settings::MadeSettings> = Mutex::new(made_settings::MadeSettings::new());
}
#[tauri::command]
fn get_projects() -> HashMap<String, String> {
    let setting_for_made = SETTINGS.lock().unwrap();
    return setting_for_made.get_projects_dictionary();
}
#[tauri::command]
fn get_current_theme_name() -> String {
    let setting_for_made = SETTINGS.lock().unwrap();
    return setting_for_made.get_current_theme();
}
#[tauri::command]
fn add_project(name:String,path:String){
    let mut setting_for_made = SETTINGS.lock().unwrap();
    setting_for_made.add_project(name, path);
}
fn main() {
    let file_path ="C:/Users/SaYMooNchik/curseforge/minecraft/Instances/test 1.19/test 1.19.madeProject";
    match Project::new(file_path) {
        Ok(project) => {
            println!("Name: {}", project.name);
            println!("Version: {}", project.version);
            println!("Path: {}", project.path);
            println!("Items Collection:");
            for item in &project.items_collection {
                println!("{}", item);
            }
            println!("Tags Collection:");
            for tag in &project.tags_collection {
                println!("{}", tag);
            }
        }
        Err(err) => {
            eprintln!("Error: {}", err);
        }
    }


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_current_theme_name, add_project, get_projects])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
