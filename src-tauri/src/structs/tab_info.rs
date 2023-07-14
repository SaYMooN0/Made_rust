use serde::{Serialize, Deserialize};
#[derive(Serialize,Deserialize, Clone)]
pub struct TabInfo {
    name: String,
    content_string: String,
}

impl TabInfo {
    pub fn new(tab_name: String, tab_content: String) -> TabInfo {
        TabInfo {
            name: tab_name,
            content_string: tab_content,
        }
    }
}
