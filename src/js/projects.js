const { invoke } = window.__TAURI__.tauri;
var projectsContainer = {};
var pr={};
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
function projectLinkClicked()
{
    pr.textContent="clicked";
    pr.textContent = this.textContent;
}
async function setProjects() {
    
    projectsContainer = document.getElementById('projects-container');
    let projects = await invoke("get_projects");
    let projectItem={};
    let projectTextName={}, projectTextPath={};
    for (const [key, value] of Object.entries(projects)) {
        projectItem = document.createElement('div');
        projectItem.className = "project-item";
        projectItem.id = "prj_item_"+key;
        projectItem.addEventListener('click', projectLinkClicked);
      
        projectTextName=document.createElement('p');
        projectTextName.textContent = key;
        projectTextName.className = "project-text-name";
        projectItem.appendChild(projectTextName);

        projectTextPath=document.createElement('p');
        projectTextPath.textContent = value;
        projectTextPath.className = "project-text-path";
        projectItem.appendChild(projectTextPath);

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