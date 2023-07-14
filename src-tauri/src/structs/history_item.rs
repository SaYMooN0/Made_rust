use serde::{Serialize, Deserialize};
#[derive(Serialize,Deserialize, Clone)]
pub struct HistotyItem {
    history_string: String,
    mod_name: String,
    craft_type: String,
    inputs: Vec<String>,
    outputs: Vec<String>,
    file_name_path: String,
    string_num: i32,
}
impl HistotyItem {
    pub fn new(info_string:String) -> HistotyItem {
        
        HistotyItem {
            history_string: info_string,
            mod_name:  String::from(""),
            craft_type:  String::from(""),
            inputs: [].to_vec(),
            outputs: [].to_vec(),
            file_name_path:  String::from(""),
            string_num: 1,
        }
    }
}
