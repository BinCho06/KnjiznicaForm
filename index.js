function changeTheme() {
    const icon = document.getElementById("theme-icon");
    if (icon.src.endsWith("sun.ico")) {
        applyLightModeStyles();
        icon.src = "slike/moon.ico";
        icon.style.filter = "invert(0)";
    } else {
        applyDarkModeStyles();
        icon.src = "slike/sun.ico";
        icon.style.filter = "invert(1)";
    }
}

function applyDarkModeStyles() {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
    document.querySelector("form").style.backgroundColor = "#111";
    document.getElementById("icon").style.backgroundColor = "#000";
}

function applyLightModeStyles() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.querySelector("form").style.backgroundColor = "#fff";
    document.getElementById("icon").style.backgroundColor = "#fff";
}