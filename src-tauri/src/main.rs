// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::sync::Mutex;
use lazy_static::lazy_static;
mod made_settings;


lazy_static! {
    static ref SETTINGS: Mutex<made_settings::made_settings> = Mutex::new(made_settings::made_settings::new());
}

#[tauri::command]
fn get_current_theme_name() -> String {
    let setting_for_made = SETTINGS.lock().unwrap();
    return setting_for_made.get_current_theme();
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_current_theme_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
