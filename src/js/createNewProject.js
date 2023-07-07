const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
function addEvents() {
    document.getElementById("openCreateProjectDialogBtn").addEventListener("click", function () { document.getElementById('createNewProjectDialog').showModal(); });
    document.getElementById("dialogCancelBtn").addEventListener("click", function () { document.getElementById('createNewProjectDialog').close(); });
    let result;
    document.getElementById("openFileExplorerBtn").addEventListener("click", async function () {
        let directory = await open({ multiple: false, directory: true, });
        document.getElementById("path-input").value = directory;
        let nameAndVersionObject = await invoke("get_name_and_version", { directoryName: directory });
        if (nameAndVersionObject != "-1") {
            document.getElementById("name-input").value = nameAndVersionObject.toString().split('|')[1];
            document.getElementById("version-input").value = nameAndVersionObject.toString().split('|')[0];
        }
        else
        {

        }
    });
    console.log(result);
}
window.addEventListener("DOMContentLoaded", async () => {
    addEvents();
    await setThemeOnStart();

});