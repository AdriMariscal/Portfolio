const ALLOWED_METRICS = new Set(["LCP", "INP", "CLS"]);
const MAX_VALUES_PER_DAY = 200;
const MAX_DAYS = 60;

const ensureStore = () => {
  if (!globalThis.__rumMetricsStore) {
    globalThis.__rumMetricsStore = {
      version: 1,
      updatedAt: null,
      days: {},
    };
  }

  return globalThis.__rumMetricsStore;
};

const parseBody = (event) => {
  if (!event?.body) return null;
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const normalizeNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const pruneDays = (store) => {
  const dayKeys = Object.keys(store.days).sort();
  if (dayKeys.length <= MAX_DAYS) return;

  const removeCount = dayKeys.length - MAX_DAYS;
  dayKeys.slice(0, removeCount).forEach((key) => {
    delete store.days[key];
  });
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Método no permitido." }),
    };
  }

  const payload = parseBody(event);
  if (!payload || typeof payload !== "object") {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Payload inválido." }),
    };
  }

  const name = payload.name;
  if (!ALLOWED_METRICS.has(name)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Métrica no soportada." }),
    };
  }

  const value = normalizeNumber(payload.value);
  const delta = normalizeNumber(payload.delta);
  if (value === null || delta === null) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Valores de métrica inválidos." }),
    };
  }

  const timestamp = normalizeNumber(payload.ts) ?? Date.now();
  const dateKey = new Date(timestamp).toISOString().slice(0, 10);
  const store = ensureStore();
  const day = store.days[dateKey] ?? {
    LCP: { count: 0, sum: 0, values: [] },
    INP: { count: 0, sum: 0, values: [] },
    CLS: { count: 0, sum: 0, values: [] },
  };

  const metricBucket = day[name];
  metricBucket.count += 1;
  metricBucket.sum += value;
  metricBucket.values.push(value);
  if (metricBucket.values.length > MAX_VALUES_PER_DAY) {
    metricBucket.values.shift();
  }

  store.days[dateKey] = day;
  store.updatedAt = new Date().toISOString();
  pruneDays(store);

  return {
    statusCode: 202,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ ok: true }),
  };
};
