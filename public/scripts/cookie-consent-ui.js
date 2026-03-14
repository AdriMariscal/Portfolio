// Banner de consentimiento de cookies.
// Archivo externo → cubierto por script-src 'self' sin 'unsafe-inline'.

const STORAGE_KEY = "am-cookie-consent-v1";

function loadPrefs() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function savePrefs(partialPrefs) {
  const stored = {
    necessary: true,
    analytics: !!partialPrefs.analytics,
    marketing: !!partialPrefs.marketing,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // si localStorage falla, no rompemos la navegación
  }

  window.amCookieConsent = {
    getPrefs: () => loadPrefs(),
    hasConsent: (category) => {
      const prefs = loadPrefs();
      if (!prefs) return false;
      if (category === "necessary") return true;
      if (category === "analytics") return !!prefs.analytics;
      if (category === "marketing") return !!prefs.marketing;
      return false;
    },
  };

  try {
    document.dispatchEvent(new CustomEvent("am:cookie-consent", { detail: stored }));
  } catch {
    // CustomEvent debería existir en navegadores modernos
  }

  return stored;
}

function initCookieConsent() {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  const analyticsInput = banner.querySelector('[data-cookie-input="analytics"]');
  const marketingInput = banner.querySelector('[data-cookie-input="marketing"]');
  const btnReject = banner.querySelector("[data-cookie-reject]");
  const btnAcceptAll = banner.querySelector("[data-cookie-accept-all]");
  const btnSaveSelection = banner.querySelector("[data-cookie-accept-selected]");
  const footerTriggers = document.querySelectorAll("[data-cookie-open-footer]");

  function syncUIFromPrefs(prefs) {
    const prefsSafe = prefs || { analytics: false, marketing: false };
    if (analyticsInput) analyticsInput.checked = !!prefsSafe.analytics;
    if (marketingInput) marketingInput.checked = !!prefsSafe.marketing;
  }

  function openBanner({ focus } = {}) {
    const prefs = loadPrefs();
    banner.removeAttribute("hidden");
    syncUIFromPrefs(prefs);
    if (focus && typeof banner.focus === "function") {
      banner.focus();
    }
  }

  function closeBanner() {
    banner.setAttribute("hidden", "true");
  }

  const existing = loadPrefs();
  if (!existing) {
    syncUIFromPrefs({ analytics: false, marketing: false });
    banner.removeAttribute("hidden");
  } else {
    savePrefs(existing);
    syncUIFromPrefs(existing);
    closeBanner();
  }

  btnReject?.addEventListener("click", () => {
    savePrefs({ analytics: false, marketing: false });
    closeBanner();
  });

  btnAcceptAll?.addEventListener("click", () => {
    savePrefs({ analytics: true, marketing: true });
    closeBanner();
  });

  btnSaveSelection?.addEventListener("click", () => {
    const prefs = {
      analytics: !!analyticsInput?.checked,
      marketing: !!marketingInput?.checked,
    };
    savePrefs(prefs);
    closeBanner();
  });

  footerTriggers.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      openBanner({ focus: true });
    });
  });
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  initCookieConsent();
} else {
  document.addEventListener("DOMContentLoaded", initCookieConsent);
}
