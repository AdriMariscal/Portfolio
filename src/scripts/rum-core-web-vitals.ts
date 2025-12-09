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

const RUM_ENDPOINT = import.meta.env.PUBLIC_RUM_ENDPOINT as
  | string
  | undefined;

/**
 * Envía la métrica a los destinos que tengamos disponibles:
 *  - Consola (dev)
 *  - Google Analytics 4 (si existe window.gtag)
 *  - Endpoint propio (si hay PUBLIC_RUM_ENDPOINT configurado)
 */
function sendToAnalytics(metric: WebVitalMetric) {
  const { name, value, rating, delta, id } = metric;

  // 1. Log en consola para debug (solo recomendable en dev)
  if (import.meta.env.DEV) {
    // value: LCP en ms, INP en ms, CLS sin unidades
    // rating: "good" | "needs-improvement" | "poor"
    console.info("[CWV]", name, {
      value,
      rating,
      delta,
      id,
      path: window.location.pathname,
    });
  }

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
      path: window.location.pathname,
    });
  }

  // 3. Sistema propio (Netlify Function, API externa, etc.)
  //    Solo se envía si has definido PUBLIC_RUM_ENDPOINT
  if (typeof window !== "undefined" && RUM_ENDPOINT) {
    const payload = {
      name,
      value,
      rating,
      delta,
      id,
      path: window.location.pathname,
      ts: Date.now(),
      // cuidado: no añadimos PII; todo es técnico
    };

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

// Ejecutamos automáticamente al cargar el script
initCoreWebVitalsRUM();
