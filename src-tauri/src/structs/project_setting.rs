use serde::{Serialize, Deserialize};
use crate::structs::history_item::HistotyItem;
use crate::structs::tab_info::TabInfo;

use super::tab_info;


#[derive(Serialize,Deserialize, Clone)]
pub struct ProjectSettings {
    leave_comments: bool,
    history: Vec<HistotyItem>,
    tabs:Vec<TabInfo>
}

impl ProjectSettings {
    pub fn new(setting_info: String) -> ProjectSettings {
        let mut tabs_container: Vec<TabInfo> = Vec::new();
        let mut do_leave_comments: bool = true;
        let mut tabs_string: String = String::new();
        let mut history_string: String = String::new();

        for (idx, line) in setting_info.lines().enumerate() {
            if line.contains("DoLeaveComments:") {
                let parts: Vec<&str> = line.split("DoLeaveComments:").collect();
                do_leave_comments = parts[1].trim().parse::<bool>().unwrap_or(true);
            } else if line.contains("Tabs:") {
                tabs_string = setting_info.lines().skip(idx + 1).collect::<Vec<&str>>().join("\n");
                break;
            }
        }

        for line in tabs_string.lines() {
            if line.starts_with("History:") {
                history_string = line.replace("History:", "").trim().to_string();
                break;
            }
            let parts: Vec<&str> = line.split("-").collect();
            if parts.len() == 2 {
                let tab = TabInfo::new(parts[0].trim().to_string(), parts[1].trim().to_string());
                tabs_container.push(tab);
            }
        }

        ProjectSettings {
            leave_comments: do_leave_comments,
            history: [].to_vec(),
            tabs: tabs_container,
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
