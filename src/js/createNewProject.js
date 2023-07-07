const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
function addEvents() {
    document.getElementById("openFileExplorerBtn").addEventListener("click", async function () {
        let directory = await open({ multiple: false, directory: true, });
        document.getElementById("path-input").value = directory;
        let nameAndVersionObject = await invoke("get_name_and_version", { directoryName: directory });
        if (nameAndVersionObject != "-1") {
            document.getElementById("name-input").value = nameAndVersionObject.toString().split('|')[1];
            document.getElementById("version-input").value = nameAndVersionObject.toString().split('|')[0];
        }
        else {
            document.getElementById("warning").innerHTML = "Warning</br>"
        }
    });
    const form = document.getElementById('newProjectForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }
      });
}
async function setThemeOnStart() {
    var linkElement = document.getElementById('theme-link');
    let theme = await invoke("get_current_theme_name");
    linkElement.href = '../themes_css/' + theme + ".css";
}
window.addEventListener("DOMContentLoaded", async () => {
    addEvents();
    await setThemeOnStart();

});