
const themeToggle = document.querySelector("#themeToggle");

// Aplica o tema salvo pelo Elementar.
// Se ainda não houver preferência, usa o tema claro.
function applyTheme() {
  const savedTheme = localStorage.getItem("elementar-theme");

  document.body.classList.toggle(
    "dark-theme",
    savedTheme === "dark"
  );

  themeToggle.textContent =
    savedTheme === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  localStorage.setItem(
    "elementar-theme",
    isDark ? "dark" : "light"
  );

  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

applyTheme();