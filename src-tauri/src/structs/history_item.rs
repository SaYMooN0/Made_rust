use serde::{Serialize, Deserialize};
#[derive(Serialize,Deserialize, Clone)]
pub struct HistotyItem {
    history_string: String,
    action_type: String,
    mods: Vec<String>,
    inputs: Vec<String>,
    outputs: Vec<String>,
    file_name_path: String,
    string_num: i32,
}
impl HistotyItem {
    pub fn new(info_string: String) -> HistotyItem {
        let parts: Vec<&str> = info_string.split('|').collect();
        let mods: Vec<String> = parts[1]
            .trim_matches(|c| c == '{' || c == '}')
            .split(',')
            .map(|s| s.to_string())
            .collect();

        let inputs: Vec<String> = parts[2]
            .trim_matches(|c| c == '{' || c == '}')
            .split(',')
            .map(|s| s.to_string())
            .collect();

        let outputs: Vec<String> = parts[3]
            .trim_matches(|c| c == '{' || c == '}')
            .split(',')
            .map(|s| s.to_string())
            .collect();
        let file_name_path = parts[4].to_string();
        let string_num: i32 = parts[5].parse().unwrap();

        HistotyItem {
            history_string: info_string.clone(),
            action_type: parts[0].to_string(),
            mods,
            inputs,
            outputs,
            file_name_path,
            string_num,
        }
    }
}
