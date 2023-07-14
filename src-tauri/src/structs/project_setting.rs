use super::history_items;

pub struct ProjectSettings {
    leave_comments: bool,
    history: Vec<history_items::HistotyItem>,
}

impl ProjectSettings {
    pub fn new() -> ProjectSettings {
        let do_leave_comments: bool = true;
        ProjectSettings {
            leave_comments: do_leave_comments,
            history: [].to_vec(),
        }
    }
}
impl Default for ProjectSettings {
    fn default() -> Self {
        Self {
            leave_comments: true,
            history: [].to_vec(),
        }
    }
}
