const themeToggle = document.querySelector("#themeToggle");


/* =================================
   TEMA CLARO / ESCURO
================================= */

function applyTheme() {
    const savedTheme =
        localStorage.getItem("elementar-theme") || "light";

    document.documentElement.dataset.theme = savedTheme;

    themeToggle.textContent =
        savedTheme === "dark" ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-pressed",
        String(savedTheme === "dark")
    );
}


themeToggle.addEventListener("click", () => {
    const isDark =
        document.documentElement.dataset.theme !== "dark";

    const newTheme =
        isDark ? "dark" : "light";

    document.documentElement.dataset.theme = newTheme;

    localStorage.setItem(
        "elementar-theme",
        newTheme
    );

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );
});


/* =================================
   INICIA A PÁGINA
================================= */

applyTheme();