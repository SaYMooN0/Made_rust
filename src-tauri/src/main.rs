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
fn main() {
    let theme = match theme::Theme::from_file(String::from("../src/themes_css/default_light.css")) {
        Ok(theme) => {
            // Здесь 'theme' является экземпляром структуры Theme
            println!("Theme created:");
            theme
        },
        Err(e) => {
            // Если возникла ошибка, выведем её
            eprintln!("Failed to create a theme----1:");
            return; // Если не удалось создать тему, выходим из функции
        }
    };

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
