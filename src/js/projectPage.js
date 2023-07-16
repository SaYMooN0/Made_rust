import welcomePage from './projectPageFiles/pages/welcome.js';
const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project;
function addTab(content, name) {
    if (!name) {
        name = ($(".tabsContainer .tab-item").length + 1);
    }
    var newTabId = "tab-" + name;
    var tabItem = $("<li class='tab-item' data-tab='" + newTabId + "'><a href='#" + newTabId + "'>" + name + `</a>
    <svg class="tab-cross-btn" viewBox="0 0 24 24" fill="none">
        <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></li>`);
    $(".tabsContainer").append(tabItem);
    var tabPage = $("<div class='tabPage' id='" + newTabId + "'>" + content + "</div>");
    $("#containerForPages").append(tabPage);
    $("#containerForPages").tabs("refresh");
    $("#sortable").sortable("refresh");
    let tabCrossBtn = tabItem.find(".tab-cross-btn");
    tabCrossBtn[0].addEventListener('click', closeTab);
}
function closeTab(event) {
    event.stopPropagation();
    let tabItem = $(this).closest('.tab-item');
    let tabId = tabItem.attr('data-tab');
    tabItem.remove();
    $("#" + tabId).remove();
    $("#containerForPages").tabs("refresh");
    $("#containerForPages").tabs("option", "active", 0);
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
function switchToTab(tabName) {
    var newTabId = "tab-" + tabName;
    var tabIndex = $(".tabsContainer .tab-item[data-tab='" + newTabId + "']").index();
    $("#containerForPages").tabs("option", "active", tabIndex);
}


async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
function addCustomMachineryBlock() {
    let machineBtnContainer = document.getElementById("machine-btn");
    machineBtnContainer.style.display = "grid";
}
function addMasterfulMachineryBlock() {
    let multiblockBtnContainer = document.getElementById("multiblock-btn");
    multiblockBtnContainer.style.display = "grid";
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
    addTab(welcomePage, "12")
    addTab("<p>123</p>", "18")
    switchToTab("welcome");
});