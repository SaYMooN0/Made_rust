// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_color() -> String {
    let color: String="#bdda57".to_string();
    return  color;
}


#[tauri::command]
fn greet(name: &str) -> String {
    
    let string:String= format!("New, {}! You've been greeted from Rust!", name);
    return  string;
}



mod theme;
mod themes_collection;
fn main() {
    let mut themes_collection =themes_collection::ThemesCollection::new();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
