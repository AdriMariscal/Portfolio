// Aplica el tema guardado en localStorage.
// Archivo externo → cubierto por script-src 'self' sin 'unsafe-inline'.
const _key = "am-theme";
const _root = document.documentElement;
try {
  const stored = window.localStorage.getItem(_key);
  if (stored === "light" || stored === "dark") {
    _root.dataset.theme = stored;
  } else {
    _root.dataset.theme = "dark";
  }
} catch {
  _root.dataset.theme = "dark";
}
