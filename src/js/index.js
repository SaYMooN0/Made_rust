const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}
async function divClicked()
{
  let divElement=document.getElementById("myDivId");
  let newText = await invoke("get_color");
  divElement.style.color=newText;
  divElement.textContent=newText;
}
function switchTheme(newTheme) {
  var linkElement = document.querySelector('#theme-link');
  linkElement.href = 'themes_css/' + newTheme;
}
window.addEventListener("DOMContentLoaded", () => {
  // greetInputEl = document.querySelector("#greet-input");
  // greetMsgEl = document.querySelector("#greet-msg");
  // document.querySelector("#greet-button").addEventListener("click", () => divClicked());
  document.getElementById("div1").addEventListener("click", () => switchTheme("default_light.css"));
});
