use serde::{Serialize, Deserialize};
use crate::structs::history_item::HistotyItem;
use crate::structs::tab_info::TabInfo;


#[derive(Serialize,Deserialize, Clone)]
pub struct ProjectSettings {
    leave_comments: bool,
    history: Vec<HistotyItem>,
    tabs:Vec<TabInfo>
}

impl ProjectSettings {
    pub fn new(setting_info:String) -> ProjectSettings {
        let do_leave_comments: bool = true;
        ProjectSettings {
            leave_comments: do_leave_comments,
            history: [].to_vec(),
            tabs:[].to_vec()
        }
    }
}
impl Default for ProjectSettings {
    fn default() -> Self {
        Self {
            leave_comments: true,
            history: [].to_vec(),
            tabs:[].to_vec()
        }
    }
}
