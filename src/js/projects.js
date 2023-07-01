const { invoke } = window.__TAURI__.tauri;
var projectsContainer = {};
var pr = {};
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
function projectLinkClicked() {
    pr.textContent = "clicked";
    pr.textContent = this.textContent;
}
function createCorruptedSign(id) {
    let sign = document.createElement('div');
    sign.innerHTML = '<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return sign;
}
function generateProjectLink(projectInfo) {
    projectsContainer = document.getElementById('projects-container');
    let projectItem = {}, projectTextName = {}, projectTextPath = {}, projectMoreButton = {}, projectTextVersion = {};
    projectItem = document.createElement('div');
    projectItem.className = "project-item";
    projectItem.id = "prj_item_" + projectInfo[1];
    projectItem.addEventListener('click', projectLinkClicked);

    projectTextName = document.createElement('p');
    projectTextName.className = "project-text-name";
    projectTextName.textContent = projectInfo[0];
    projectItem.appendChild(projectTextName);

    projectTextPath = document.createElement('p');
    projectTextPath.className = "project-text-path";
    projectTextPath.textContent = projectInfo[1];
    projectItem.appendChild(projectTextPath);

    projectMoreButton = document.createElement('svg');
    projectMoreButton.className = "project-more-button";
    projectItem.appendChild(projectMoreButton);

    //if (projectInfo[2] != "-0") {
        projectTextVersion = document.createElement('p');
        projectTextVersion.className = "project-text-version";
        projectTextVersion.textContent = projectInfo[2];
        projectItem.appendChild(projectTextVersion);
    //}
    //else {
        //projectTextVersion = createCorruptedSign();
    //}

    projectItem.appendChild(projectTextVersion);

    projectsContainer.appendChild(projectItem);
}
async function setProjects() {


    let projects = await invoke("get_projects");
    let projectInfo;
    for (let i = 0; i < projects.length; i++) {
        pr.textContent = projects[i] + "  " + i;
        projectInfo = projects[i].toString().split(',');
        if (projectInfo.length == 3) {
            generateProjectLink(projectInfo);
        }

    }
}

window.addEventListener("DOMContentLoaded", async () => {
    pr = document.getElementById('project-header');
    pr.textContent = "before setProjects";
    await setProjects();
    await setThemeOnStart();

});