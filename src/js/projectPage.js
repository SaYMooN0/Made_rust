import welcomePage from './projectPageFiles/pages/welcome.js';
const { invoke } = window.__TAURI__.tauri;
const { open } = window.__TAURI__.dialog;
var project;
function addTab(content) {
    var newTabId = "tab-" + ($(".tabsContainer .tab-item").length + 1);

    var tabItem = $("<li class='tab-item' data-tab='" + newTabId + "'><a href='#" + newTabId + "'>" + newTabId + "</a></li>");
    $(".tabsContainer").append(tabItem);

    var tabPage = $("<div class='tabPage' id='" + newTabId + "'>" + content + "</div>");
    $("#containerForPages").append(tabPage);
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
function addCustomMachineryBlock() {
    let modofocationContainer= document.getElementById("action-choosing-container");
    console.log(modofocationContainer);
    modofocationContainer.innerHTML+=`<div class="new-modification-btn">
    <svg class="action-icon-machine" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <rect stroke="#000000" fill-opacity="0" rx="5" id="svg_2" height="51.90231" width="51.140152" y="2.048845" x="1.993386" stroke-width="3" fill="#0fffff" />
        <rect stroke="#000000" fill-opacity="0" rx="3" id="svg_3" height="16.663848" width="20.067077"  y="31.602497" x="25.600229" stroke-width="3" fill="#0fffff" />
        <line stroke="#000000" stroke-linecap="null" stroke-linejoin="null" id="svg_10" y2="34.170673" x2="21.330495" y1="34.170673" x1="7.927611" fill-opacity="0" stroke-opacity="null" stroke-width="3" fill="none" />
        <line stroke="#000000" stroke-linecap="null" stroke-linejoin="null" id="svg_16" y2="38.485393" x2="21.330495" y1="38.485393" x1="7.927611" fill-opacity="0" stroke-opacity="null" stroke-width="3"fill="none" />
        <line stroke="#000000" stroke-linecap="null" stroke-linejoin="null" id="svg_17" y2="42.79682" x2="21.330495" y1="42.79682" x1="7.927611" fill-opacity="0" stroke-opacity="null" stroke-width="3"fill="none" />
        <line stroke="#000000" stroke-linecap="null" stroke-linejoin="null" id="svg_18" y2="46.992569"x2="21.330495" y1="46.992569" x1="7.927611" fill-opacity="0" stroke-opacity="null" stroke-width="3" fill="none" />
        <rect stroke="#000000" fill-opacity="0" rx="3" id="svg_20" height="16.663848" width="37.667078"y="8.934487" x="8.000229" stroke-width="3" fill="#0fffff" /></svg>
    <p class="action-label">New machine</p></div>`;
}
function addMasterfulMachineryBlock() {
    let modofocationContainer= document.getElementById("action-choosing-container");
    console.log(modofocationContainer);
    modofocationContainer.innerHTML+=`
    <div class="new-modification-btn">
        <svg class="action-icon-multiblock" viewBox="0 0 470 470" xmlns="http://www.w3.org/2000/svg">
            <path d="m465.642,267.424c-0.006,-0.597 -0.084,-1.196 -0.235,-1.787c-0.019,-0.072 -0.04,-0.142 -0.061,-0.213c-0.063,-0.218 -0.137,-0.434 -0.221,-0.649c-0.029,-0.076 -0.057,-0.151 -0.089,-0.226c-0.102,-0.238 -0.217,-0.472 -0.346,-0.703c-0.018,-0.032 -0.032,-0.067 -0.051,-0.099c-0.16,-0.277 -0.323,-0.515 -0.494,-0.745c-0.04,-0.054 -0.084,-0.104 -0.126,-0.156c-0.148,-0.187 -0.303,-0.366 -0.466,-0.536c-0.053,-0.055 -0.106,-0.109 -0.161,-0.163c-0.185,-0.181 -0.376,-0.352 -0.577,-0.511c-0.034,-0.027 -0.065,-0.056 -0.099,-0.082c-0.243,-0.186 -0.495,-0.356 -0.756,-0.51c-0.039,-0.026 -107.888,-62.857 -107.888,-62.857l0,-125.687c0,-0.026 -0.005,-0.05 -0.005,-0.076c-0.006,-0.597 -0.084,-1.196 -0.235,-1.787c-0.019,-0.072 -0.04,-0.142 -0.061,-0.213c-0.063,-0.218 -0.137,-0.434 -0.221,-0.649c-0.029,-0.076 -0.057,-0.151 -0.089,-0.226c-0.102,-0.238 -0.217,-0.472 -0.346,-0.703c-0.018,-0.032 -0.032,-0.067 -0.051,-0.099c-0.16,-0.278 -0.323,-0.516 -0.495,-0.746c-0.039,-0.052 -0.082,-0.101 -0.122,-0.152c-0.15,-0.19 -0.307,-0.371 -0.471,-0.542c-0.051,-0.053 -0.102,-0.105 -0.155,-0.156c-0.188,-0.185 -0.384,-0.36 -0.589,-0.522c-0.029,-0.023 -0.056,-0.049 -0.086,-0.071c-0.245,-0.189 -0.5,-0.36 -0.764,-0.516c-0.033,-0.022 -111.607,-65.022 -111.607,-65.022c-2.334,-1.359 -5.217,-1.359 -7.551,0l-111.573,65c-0.297,0.178 -0.554,0.351 -0.801,0.54c-0.027,0.021 -0.052,0.044 -0.079,0.066c-0.207,0.164 -0.405,0.34 -0.595,0.527c-0.052,0.051 -0.102,0.102 -0.153,0.155c-0.165,0.172 -0.322,0.354 -0.472,0.544c-0.04,0.051 -0.083,0.099 -0.122,0.151c-0.172,0.23 -0.335,0.468 -0.483,0.722c-0.031,0.056 -0.045,0.09 -0.063,0.123c-0.129,0.231 -0.244,0.465 -0.346,0.703c-0.032,0.074 -0.06,0.15 -0.089,0.226c-0.084,0.214 -0.158,0.43 -0.221,0.649c-0.021,0.071 -0.042,0.141 -0.06,0.213c-0.152,0.591 -0.23,1.19 -0.235,1.787c0,0.025 -0.005,0.05 -0.005,0.076l0,125.689l-107.849,62.829c-0.3,0.18 -0.553,0.35 -0.796,0.537c-0.033,0.026 -0.064,0.054 -0.097,0.08c-0.201,0.16 -0.393,0.331 -0.578,0.512c-0.054,0.053 -0.108,0.107 -0.16,0.162c-0.163,0.17 -0.318,0.349 -0.466,0.536c-0.042,0.053 -0.086,0.103 -0.126,0.157c-0.171,0.229 -0.334,0.467 -0.482,0.72c-0.031,0.056 -0.045,0.09 -0.063,0.123c-0.129,0.231 -0.244,0.465 -0.346,0.703c-0.032,0.074 -0.06,0.15 -0.089,0.226c-0.084,0.214 -0.158,0.43 -0.221,0.649c-0.021,0.071 -0.042,0.141 -0.06,0.213c-0.152,0.591 -0.23,1.19 -0.235,1.787c0,0.025 -0.005,0.05 -0.005,0.076l0,130c0,2.669 1.419,5.137 3.725,6.48l111.573,65c0.021,0.012 0.044,0.02 0.065,0.032c0.268,0.153 0.545,0.293 0.833,0.413c0.28,0.116 0.562,0.208 0.85,0.289c0.071,0.02 0.143,0.037 0.215,0.055c0.225,0.056 0.454,0.101 0.687,0.136c0.077,0.012 0.152,0.026 0.229,0.035c0.295,0.035 0.593,0.059 0.897,0.059s0.603,-0.023 0.897,-0.059c0.077,-0.009 0.152,-0.023 0.229,-0.035c0.233,-0.035 0.462,-0.08 0.687,-0.136c0.072,-0.018 0.144,-0.035 0.215,-0.055c0.288,-0.081 0.57,-0.173 0.843,-0.286c0.294,-0.122 0.571,-0.262 0.839,-0.416c0.021,-0.012 0.044,-0.02 0.065,-0.032l107.797,-62.801l107.798,62.801c0.021,0.012 0.044,0.02 0.065,0.032c0.268,0.153 0.544,0.293 0.832,0.413c0.281,0.116 0.562,0.208 0.849,0.289c0.072,0.02 0.144,0.038 0.216,0.056c0.225,0.056 0.453,0.101 0.686,0.136c0.077,0.012 0.153,0.026 0.23,0.035c0.295,0.035 0.593,0.059 0.897,0.059s0.602,-0.023 0.897,-0.059c0.077,-0.009 0.153,-0.023 0.23,-0.035c0.232,-0.035 0.461,-0.08 0.686,-0.136c0.072,-0.018 0.144,-0.035 0.216,-0.056c0.287,-0.081 0.569,-0.173 0.841,-0.286c0.296,-0.123 0.572,-0.263 0.84,-0.416c0.021,-0.012 0.044,-0.02 0.065,-0.032l111.573,-65c2.306,-1.344 3.725,-3.812 3.725,-6.48l0,-130c0,-0.027 -0.004,-0.051 -0.004,-0.077zm-22.395,0.076l-96.674,56.32l-96.674,-56.32l96.674,-56.32l96.674,56.32zm-312.32,-181.951l96.573,56.261l0,112.64l-96.573,-56.261l0,-112.64zm208.146,112.64l-96.573,56.262l0,-112.64l96.573,-56.261l0,112.639zm-111.573,195l-96.573,56.262l0,-112.64l96.573,-56.261l0,112.639zm15,-112.64l96.573,56.261l0,112.64l-96.573,-56.261l0,-112.64zm-7.5,-264.369l96.674,56.32l-96.674,56.32l-96.674,-56.32l96.674,-56.32zm-111.573,195l96.674,56.32l-96.674,56.32l-96.674,-56.32l96.674,-56.32zm-104.073,69.369l96.573,56.261l0,112.64l-96.573,-56.262l0,-112.639zm334.719,168.902l0,-112.64l96.573,-56.261l0,112.64l-96.573,56.261z" />
        </svg><p class="action-label">New multiblock</p>
    </div>`;
}
window.addEventListener("DOMContentLoaded", async () => {
    await setThemeOnStart();
    project = await invoke("get_current_project");
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
    addTab( welcomePage);
});