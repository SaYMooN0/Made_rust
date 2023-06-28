const { invoke } = window.__TAURI__.tauri;



async function setThemeOnStart() {
  var linkElement = document.getElementById('theme-link');
  let theme=await invoke("get_current_theme_name");
  linkElement.href = './themes_css/' + theme+".css";
}

window.addEventListener("DOMContentLoaded", async () => {
  await setThemeOnStart();

  //document.getElementById("div1").addEventListener("click", () => switchTheme("default_light.css"));
});


async function greet() {
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

function switchTheme(newTheme) {
  var linkElement = document.querySelector('#theme-link');
  linkElement.href = './themes_css/' + newTheme+".css";
}
