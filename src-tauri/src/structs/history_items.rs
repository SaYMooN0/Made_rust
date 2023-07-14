#[derive(Clone)]
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
    pub fn new() -> HistotyItem {
        HistotyItem {
            history_string: String::from(""),
            mod_name:  String::from(""),
            craft_type:  String::from(""),
            inputs: [].to_vec(),
            outputs: [].to_vec(),
            file_name_path:  String::from(""),
            string_num: 1,
        }
    }
}
