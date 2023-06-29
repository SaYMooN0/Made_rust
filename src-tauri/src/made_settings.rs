use std::fs::{File, OpenOptions};
use std::io::{Read, Write};
use std::str::FromStr;
use std::path::Path;
use std::fmt;
use std::collections::HashMap;
pub struct made_settings {
    current_theme: Theme,
    projects: HashMap<String, String>,
}
impl made_settings {
    pub fn new() -> Self {
        let file_path = Path::new("themes.madeSettings");
        let default_theme_str = "dark";
        let default_theme = Theme::Dark;

        let file_content = if !file_path.exists() {
            let mut file = File::create(&file_path).expect("Failed to create file");
            write!(file, "{}", default_theme_str).expect("Failed to write to file");
            default_theme_str.to_string()
        } else {
            let mut file = OpenOptions::new()
                .read(true)
                .open(file_path)
                .expect("Failed to open file");
            let mut content = String::new();
            file.read_to_string(&mut content).expect("Failed to read from file");
            content
        };

        let current_theme = Theme::from_str(file_content.trim()).unwrap_or_else(|_| {
            let mut file = OpenOptions::new()
                .write(true)
                .open(file_path)
                .expect("Failed to open file");
            write!(file, "{}", default_theme_str).expect("Failed to write to file");
            default_theme
        });

        made_settings { current_theme, projects: HashMap::new() }
    }

    pub fn get_current_theme(&self) -> String {
        self.current_theme.to_string()
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
