use serde::{Serialize, Deserialize};
use crate::structs::history_item::HistotyItem;


#[derive(Serialize,Deserialize, Clone)]
pub struct ProjectSettings {
    leave_comments: bool,
    history: Vec<HistotyItem>,
}

impl ProjectSettings {
    pub fn new(setting_info: String) -> ProjectSettings {
        let mut history_items_container: Vec<HistotyItem> = Vec::new();
        let mut do_leave_comments: bool = true;
        let mut history_string: String = String::new();

        for (idx, line) in setting_info.lines().enumerate() {
            if line.contains("DoLeaveComments:") {
                let parts: Vec<&str> = line.split("DoLeaveComments:").collect();
                do_leave_comments = parts[1].trim().parse::<bool>().unwrap_or(true);
            } else if line.contains("History:") {
                history_string = setting_info.lines().skip(idx + 1).collect::<Vec<&str>>().join("\n");
                break;
            }
        }
        for line in history_string.lines() {
            let history_item=HistotyItem::new(line.to_string());
            history_items_container.push(history_item);
        }

        ProjectSettings {
            leave_comments: do_leave_comments,
            history: history_items_container
        }
    }
}


impl Default for ProjectSettings {
    fn default() -> Self {
        Self {
            leave_comments: true,
            history: [].to_vec()
        }
    }
}
