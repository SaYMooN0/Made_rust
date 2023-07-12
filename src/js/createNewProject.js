const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
function addEvents() {
    document.getElementById("openFileExplorerBtn").addEventListener("click", async function () {
        let directory = await open({ multiple: false, directory: true, });
        document.getElementById("path-input").value = directory;
        let creationInfo = await invoke("get_creation_info", { directoryName: directory });
        if (creationInfo != "-1") {
            document.getElementById("name-input").value = creationInfo.toString().split('|')[1];
            document.getElementById("version-input").value = creationInfo.toString().split('|')[0];
            let loader=creationInfo.toString().split('|')[2];
            console.log(loader);
            console.log(loader.charAt(0).toUpperCase() + loader.slice(1));
            document.getElementById("loader-input").value = loader;
            document.getElementById("warning").innerHTML="";
        }
        else {
            document.getElementById("warning").innerHTML = "!Warning! The folder with the modpack that you are trying to open is most likely created not with CurseForge. For better performance and to avoid errors in Made and the modpack itself, it is recommended to recreate your modpack using CurseForge</br>"
        }
    });
    const form = document.getElementById('newProjectForm');
    form.addEventListener('submit', async function (e){
        e.preventDefault();
        let formData = new FormData(form);
        let pair= formData.entries();
        let path=pair.next().value[1];
        let name=pair.next().value[1];
        let version=pair.next().value[1];
        let loader=pair.next().value[1];
        console.log(loader);
        await invoke("add_project", { name: name, path: path,  version: version, loader:loader });
        await invoke("set_current_project", { path:path, name:name });
        location.href = "projectPage.html";
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