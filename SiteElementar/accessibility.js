/* =================================
   PREFERÊNCIAS DE ACESSIBILIDADE
   Elementar
================================= */

const ACCESSIBILITY_KEYS = {
    theme: "elementar-theme",
    contrast: "elementar-contrast",
    textScale: "elementar-text-scale"
};

function applyAccessibilityPreferences() {
    const root = document.documentElement;

    const savedTheme =
        localStorage.getItem(ACCESSIBILITY_KEYS.theme) || "light";

    const savedContrast =
        localStorage.getItem(ACCESSIBILITY_KEYS.contrast) || "normal";

    const savedTextScale =
        Number(
            localStorage.getItem(ACCESSIBILITY_KEYS.textScale)
        ) || 100;

    root.dataset.theme = savedTheme;
    root.dataset.contrast = savedContrast;

    const validTextScale = Math.min(
        150,
        Math.max(80, savedTextScale)
    );

    root.style.setProperty(
        "--text-scale",
        String(validTextScale / 100)
    );
}

applyAccessibilityPreferences();