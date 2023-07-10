import tabM from './projectPageFiles/pages/tab.js';
const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project, choosingDiv, makingDiv;
function main() {
    
    // document.getElementById('tab-1').innerHTML += tabM;
    let divider = document.getElementById('divider');
    choosingDiv = document.getElementById('modificationsChoosingPart');
    makingDiv = document.getElementById('modificationsMakingPart');
    divider.addEventListener('mousedown', mouseDown);
    choosingDiv.style.width = '20%';
    makingDiv.style.width = '80%';
}
function addTab(tabName) {
    let newTab = $("<li></li>");
    let newLink = $("<a></a>").attr("href", "#" + tabName).text(tabName);
    newTab.append(newLink);
    $("#sortable").append(newTab);
    $("#containerForPages").tabs("refresh");
    $("#sortable").sortable("refresh");
}
$(function () {
    $("#containerForPages").tabs();
    $("#sortable").sortable({
        axis: "x"
    });
    $("#sortable").disableSelection();
});
function mouseDown(e) {
    e.preventDefault();
    let containerWidth = document.getElementById('mainContainer').offsetWidth;
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    function mouseMove(e) {
        let newWidth = (e.clientX / containerWidth) * 100;
        if (newWidth > 14 && newWidth < 40) {
            choosingDiv.style.width = newWidth + '%';
            makingDiv.style.width = (100 - newWidth) + '%';
            console.log(choosingDiv);
        }
    }

    function mouseUp() {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    }
}
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
window.addEventListener("DOMContentLoaded", async () => {
    await setThemeOnStart();
    project = await invoke("get_current_project");
    main();
});