import welcomePage from './projectPageFiles/pages/welcome.js';
const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project;
function addTab(content, name) {
    if (!name) {
        name = ($(".tabsContainer .tab-item").length + 1);
    }
    var newTabId = "tab-" + name;
    var tabItem = $("<li class='tab-item' data-tab='" + newTabId + "'><a href='#" + newTabId + "'>" + name + "</a></li>");
    $(".tabsContainer").append(tabItem);
    var tabPage = $("<div class='tabPage' id='" + newTabId + "'>" + content + "</div>");
    $("#containerForPages").append(tabPage);
    $("#containerForPages").tabs("refresh");
    $("#sortable").sortable("refresh");
}
function addWelcomeTab() {
    addTab(welcomePage, "welcome")
}
$(function () {
    $("#containerForPages").tabs();
    $("#sortable").sortable({
        axis: "x"
    });
    $("#sortable").disableSelection();
});
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
function addCustomMachineryBlock() {
    let machineBtnContainer = document.getElementById("machine-btn");
    machineBtnContainer.style.display="grid";
}
function addMasterfulMachineryBlock() {
    let multiblockBtnContainer = document.getElementById("multiblock-btn");
    multiblockBtnContainer.style.display="grid";
}
window.addEventListener("DOMContentLoaded", async () => {
    await setThemeOnStart();
    project = await invoke("get_current_project");
    console.log(project);
    if (project.loader == "forge") {
        if (["1.18.2", "1.16.5"].includes(project.version)) {
            addCustomMachineryBlock();
            addMasterfulMachineryBlock();
        }
        else if (project.version == "1.16.4") {
            addCustomMachineryBlock();
        }
    }
    else if (project.loader == "fabric") {
        if (project.version == "1.18.2") {
            addCustomMachineryBlock();
        }
    }
    addWelcomeTab();
});