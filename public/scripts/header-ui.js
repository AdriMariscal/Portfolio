// Nav toggle móvil + theme toggle (claro/oscuro).
// Archivo externo → cubierto por script-src 'self' sin 'unsafe-inline'.

// --- Nav toggle ---
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  const handleToggle = () => {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.classList.toggle("nav-toggle--open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  toggle.addEventListener("click", handleToggle);

  const mql = window.matchMedia("(min-width: 769px)");
  const handleMqChange = (event) => {
    if (event.matches) {
      nav.classList.remove("nav--open");
      toggle.classList.remove("nav-toggle--open");
      toggle.setAttribute("aria-expanded", "false");
    }
  };

  mql.addEventListener("change", handleMqChange);
}

// --- Theme toggle (claro / oscuro) ---
const themeToggle = document.querySelector("[data-theme-toggle]");
if (themeToggle) {
  const storageKey = "am-theme";
  const root = document.documentElement;

  const getCurrent = () => (root.dataset.theme === "dark" ? "dark" : "light");

  const syncLabel = () => {
    const mode = getCurrent();
    const label = themeToggle.querySelector(".theme-toggle__label");
    if (label) {
      label.textContent = mode === "dark" ? "Claro" : "Oscuro";
    }
    themeToggle.setAttribute(
      "aria-label",
      mode === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
    themeToggle.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  };

  const setTheme = (next) => {
    root.dataset.theme = next;
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // ignoramos errores de localStorage
    }
    syncLabel();
  };

  themeToggle.addEventListener("click", () => {
    const next = getCurrent() === "dark" ? "light" : "dark";
    setTheme(next);
  });

  syncLabel();
}
