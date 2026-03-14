// Aplica el tema guardado en localStorage antes de que se pinte la página.
// Al importarse como módulo externo, Vite lo bundlea y lo sirve desde /_astro/,
// lo que permite CSP sin 'unsafe-inline' en script-src.
const _storageKey = "am-theme";
const _root = document.documentElement;

try {
  const stored = window.localStorage.getItem(_storageKey);
  if (stored === "light" || stored === "dark") {
    _root.dataset.theme = stored;
  } else {
    _root.dataset.theme = "dark";
  }
} catch {
  _root.dataset.theme = "dark";
}
