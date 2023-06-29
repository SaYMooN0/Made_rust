const { invoke } = window.__TAURI__.tauri;
var projectsContainer = {};
var pr={};
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}

async function setProjects() {
    
    projectsContainer = document.getElementById('projects-container');
    let projects = await invoke("get_projects");
    let projectItem={};
    for (const [key, value] of Object.entries(projects)) {
        projectItem = document.createElement('div');
        projectItem.className = "project-item";
        projectItem.id = key;
        projectItem.textContent = key+": " + value;
        projectsContainer.appendChild(projectItem);
    }
    pr.textContent = "worked";
}

window.addEventListener("DOMContentLoaded", async () => {
    pr = document.getElementById('project-header');
    pr.textContent = "projects";
    await setProjects();
    await setThemeOnStart();
   
});