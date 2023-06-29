// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{sync::Mutex, collections::HashMap};
use lazy_static::lazy_static;
mod made_settings;


lazy_static! {
    static ref SETTINGS: Mutex<made_settings::made_settings> = Mutex::new(made_settings::made_settings::new());
}
#[tauri::command]
fn get_projects() -> HashMap<String, String> {
    let mut setting_for_made = SETTINGS.lock().unwrap();
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
    let book_reviews = get_projects();
    add_project("name3".to_string(), "path2".to_string());
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_current_theme_name])
        .invoke_handler(tauri::generate_handler![get_projects])
        .invoke_handler(tauri::generate_handler![add_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
