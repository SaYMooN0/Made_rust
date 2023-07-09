const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project;
const tabs = document.querySelectorAll('.tab');
$( function() {
    $("#tabs").tabs();
    $("#sortable").sortable({
      axis: "x",
      update: function(event, ui) {
        var sortedIDs = $("#sortable").sortable("toArray");
        console.log(sortedIDs);
      }
    });
  
    $("#sortable").disableSelection();
  } );
function main() {

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