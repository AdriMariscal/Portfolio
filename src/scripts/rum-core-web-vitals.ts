// src/scripts/rum-core-web-vitals.ts
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

/**
 * Tipo genérico de métrica que devuelve web-vitals:
 * name: "LCP" | "INP" | "CLS" | ...
 * value: número de la métrica (segundos o unidad normalizada)
 * rating: "good" | "needs-improvement" | "poor"
 */
type WebVitalMetric = Metric & {
  name: "LCP" | "INP" | "CLS";
};

const DEFAULT_RUM_ENDPOINT = "/.netlify/functions/rum-collect";
const RUM_ENDPOINT = (import.meta.env.PUBLIC_RUM_ENDPOINT as
  | string
  | undefined) ?? DEFAULT_RUM_ENDPOINT;
const CONSENT_STORAGE_KEY = "am-cookie-consent-v1";
const RUM_STORAGE_KEY = "am-rum-metrics-v1";
let rumInitialized = false;

type ConsentPrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt?: string;
};

type StoredMetric = {
  name: "LCP" | "INP" | "CLS";
  value: number;
  rating: string;
  delta: number;
  id: string;
  path: string;
  ts: number;
};

type LocalRUMStore = {
  updatedAt: string;
  entries: StoredMetric[];
};

const readConsentPrefs = (): ConsentPrefs | null => {
  if (typeof window === "undefined") return null;

  try {
    const api = (window as any).amCookieConsent;
    if (api?.getPrefs) {
      return api.getPrefs();
    }

    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
};

const hasAnalyticsConsent = () => {
  const prefs = readConsentPrefs();
  return Boolean(prefs?.analytics);
};

const loadLocalRUM = (): LocalRUMStore => {
  if (typeof window === "undefined") {
    return { updatedAt: new Date().toISOString(), entries: [] };
  }

  try {
    const raw = window.localStorage.getItem(RUM_STORAGE_KEY);
    if (!raw) {
      return { updatedAt: new Date().toISOString(), entries: [] };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.entries)) {
      return { updatedAt: new Date().toISOString(), entries: [] };
    }
    return {
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      entries: parsed.entries,
    };
  } catch {
    return { updatedAt: new Date().toISOString(), entries: [] };
  }
};

const saveLocalRUM = (entry: StoredMetric) => {
  if (typeof window === "undefined") return;

  try {
    const store = loadLocalRUM();
    const entries = [...store.entries, entry].slice(-500);
    window.localStorage.setItem(
      RUM_STORAGE_KEY,
      JSON.stringify({ updatedAt: new Date().toISOString(), entries })
    );
  } catch {
    // No bloqueamos la UX si localStorage falla.
  }
};

/**
 * Envía la métrica a los destinos que tengamos disponibles:
 *  - Consola (dev)
 *  - Google Analytics 4 (si existe window.gtag)
 *  - Endpoint propio (si hay PUBLIC_RUM_ENDPOINT configurado)
 */
function sendToAnalytics(metric: WebVitalMetric) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  const { name, value, rating, delta, id } = metric;
  const payload = {
    name,
    value,
    rating,
    delta,
    id,
    path: window.location.pathname,
    ts: Date.now(),
  };

  // 1. Log en consola para debug (solo recomendable en dev)
  if (import.meta.env.DEV) {
    // value: LCP en ms, INP en ms, CLS sin unidades
    // rating: "good" | "needs-improvement" | "poor"
    console.info("[CWV]", name, {
      value,
      rating,
      delta,
      id,
      path: payload.path,
    });
  }

  // Guardamos una copia local para el panel interno
  saveLocalRUM(payload);

  // 2. Google Analytics 4 (si en el futuro añades GA4 con gtag)
  //    GA4 lo verá como evento "LCP", "INP" o "CLS"
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, {
      // Conviene normalizar las unidades:
      // - LCP/INP → segundos
      // - CLS      → tal cual
      value:
        name === "CLS" ? value : Math.round((value / 1000) * 1000) / 1000,
      metric_id: id,
      metric_delta: delta,
      metric_rating: rating,
      path: payload.path,
    });
  }

  // 3. Sistema propio (Netlify Function, API externa, etc.)
  //    Solo se envía si has definido PUBLIC_RUM_ENDPOINT
  if (typeof window !== "undefined" && RUM_ENDPOINT) {
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        navigator.sendBeacon(RUM_ENDPOINT, blob);
      } else {
        // Fallback para navegadores sin sendBeacon
        fetch(RUM_ENDPOINT, {
          method: "POST",
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).catch(() => {
          // Silencioso; no queremos romper la navegación por un error de telemetría
        });
      }
    } catch {
      // Igual: nunca romper la UX por métricas
    }
  }
}

/**
 * Inicializa la captura de métricas de Core Web Vitals.
 * Llamar una única vez en el cliente.
 */
export function initCoreWebVitalsRUM() {
  // Solo tiene sentido en navegador
  if (typeof window === "undefined") return;
  if (rumInitialized) return;
  if (!hasAnalyticsConsent()) return;

  rumInitialized = true;
  // LCP: Largest Contentful Paint
  onLCP((metric) => {
    sendToAnalytics(metric as WebVitalMetric);
  });

  // INP: Interaction to Next Paint
  onINP((metric) => {
    sendToAnalytics(metric as WebVitalMetric);
  });

  // CLS: Cumulative Layout Shift
  onCLS((metric) => {
    sendToAnalytics(metric as WebVitalMetric);
  });
}

const initIfConsent = () => {
  if (rumInitialized) return;
  if (hasAnalyticsConsent()) {
    initCoreWebVitalsRUM();
  }
};

if (typeof window !== "undefined") {
  initIfConsent();
  document.addEventListener("am:cookie-consent", (event) => {
    const detail = (event as CustomEvent).detail as ConsentPrefs | undefined;
    if (detail?.analytics) {
      initIfConsent();
    }
  });
}
