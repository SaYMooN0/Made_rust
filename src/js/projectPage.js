import tabM from './projectPageFiles/pages/tab.js';
const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project;
function main() {
    // document.getElementById('tab-1').innerHTML += tabM;
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