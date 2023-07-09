const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
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
async function openExistingProjectChoosingDialog() {
    const file = await open({
        multiple: false,
        filters: [{
          name: 'project',
          extensions: ['madeProject']
        }]
      });
    console.log(file);
    location.href="projectPage.html";
    console.log(1);
}
function createCorruptedSign(name) {
    let sign = document.createElement('div');
    sign.className = "corrupted-sign";
    sign.innerHTML = '<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z" class="corrupted-sign-line" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    sign.addEventListener('mouseover', function () {
        this.parentNode.style.backgroundColor = 'var(--main-backcolor)';
    });
    sign.addEventListener('mouseout', function () {
        this.parentNode.style.backgroundColor = '';
    });
    let dialog = document.createElement('dialog');
    dialog.className = "corrupted-sign-dialog";
    dialog.innerHTML = `
        <div class="corrupted-sign-dialog-container">
        <p class="csd-txt">The Made file "${name}" is corrupted and cannot be opened. File recovery is very unlikely. In this situation, it is recommended to delete it and recreate it. Deleting the Made file will not entail any changes in your modpack. Only data about collections of items and tags inside Made will be lost. Would you like to delete a corrupted file:</p>
        <div class="csd-btn csd-btn-cncl" id="cancel">Cancel</div>
        <div class="csd-btn csd-btn-dlt" id="delete">Delete</div>
        </div>
    `;
    dialog.querySelector("#cancel").addEventListener('click', function () {
        dialog.close();
    });
    dialog.querySelector("#delete").addEventListener('click', function () {

        let projectToDelete = document.getElementById("prj_item_" + name);
        projectToDelete.remove();
        dialog.close();
        invoke("remove_project", { name: name });
    });

    document.body.appendChild(dialog);
    sign.addEventListener('click', function () {
        dialog.showModal();
    });

    return sign;
}
function generateProjectLink(projectInfo) {
    projectsContainer = document.getElementById('projects-container');
    let projectItem = {}, projectTextName = {}, projectTextPath = {}, projectMoreButton = {}, projectTextVersion = {};
    projectItem = document.createElement('div');
    projectItem.className = "project-item";
    projectItem.id = "prj_item_" + projectInfo[0];
    //projectItem.addEventListener('click', projectLinkClicked);

    projectTextName = document.createElement('p');
    projectTextName.className = "project-text-name";
    projectTextName.textContent = projectInfo[0];
    projectItem.appendChild(projectTextName);

    projectTextPath = document.createElement('p');
    projectTextPath.className = "project-text-path";
    projectTextPath.textContent = projectInfo[1];
    projectItem.appendChild(projectTextPath);

    projectMoreButton = document.createElement('svg');
    projectMoreButton.innerHTML = '<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 342.382 342.382"xml:space="preserve"><g> <g> <g><path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/></g><g> <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/></g><g><path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219 c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/></g>  </g></g> </svg>';
    projectMoreButton.className = "project-more-button";
    projectMoreButton.addEventListener('mouseover', function () {
        this.parentNode.style.backgroundColor = 'var(--main-backcolor)';
    });
    projectMoreButton.addEventListener('mouseout', function () {
        this.parentNode.style.backgroundColor = '';
    });
    projectItem.appendChild(projectMoreButton);

    if (projectInfo[2] != "-0") {
        projectTextVersion = document.createElement('p');
        projectTextVersion.className = "project-text-version";
        projectTextVersion.textContent = projectInfo[2];
        projectItem.appendChild(projectTextVersion);
    }
    else {
        projectTextVersion = createCorruptedSign(projectInfo[0]);
    }

    projectItem.appendChild(projectTextVersion);

    projectsContainer.appendChild(projectItem);
}
async function setProjects() {
    let projects = await invoke("get_projects");
    let projectInfo;
    for (let i = 0; i < projects.length; i++) {
        projectInfo = projects[i].toString().split(',');
        if (projectInfo.length == 3) {
            generateProjectLink(projectInfo);
        }

    }
}
window.addEventListener("DOMContentLoaded", async () => {
    document.getElementById('openExistingProjectBtn').addEventListener('click', openExistingProjectChoosingDialog);
    pr = document.getElementById('project-header');
    await setProjects();
    await setThemeOnStart();

});