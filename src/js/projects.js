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
function generateProjectLink(projectInfo)
{
    projectsContainer = document.getElementById('projects-container');
    let projectItem={},projectTextName={}, projectTextPath={};
    projectItem = document.createElement('div');
    projectItem.className = "project-item";
    pr.textContent = "3";
    projectItem.id = "prj_item_"+projectInfo[1];
    projectItem.addEventListener('click', projectLinkClicked);
    pr.textContent = "4";
    projectTextName=document.createElement('p');
    projectTextName.textContent = projectInfo[0]+" - "+projectInfo[2];
    projectTextName.className = "project-text-name";
    projectItem.appendChild(projectTextName);

    projectTextPath=document.createElement('p');
    projectTextPath.textContent = projectInfo[1];
    projectTextPath.className = "project-text-path";
    projectItem.appendChild(projectTextPath);

    projectsContainer.appendChild(projectItem);
}
async function setProjects() {
    
    
    let projects = await invoke("get_projects");
    let projectInfo;
    for (let i = 0; i < projects.length; i++) {
        pr.textContent = projects[i]+"  "+i;
        projectInfo = projects[i].toString().split(',');
        if(projectInfo.length==3&&projectInfo[2]!="-0")
        {
            generateProjectLink(projectInfo);
        }
        
    }
    pr.textContent = "worked";
}

window.addEventListener("DOMContentLoaded", async () => {
    pr = document.getElementById('project-header');
    pr.textContent = "before setProjects";
    await setProjects();
    await setThemeOnStart();
   
});