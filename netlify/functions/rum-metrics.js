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

const percentile = (values, p) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p));
  return sorted[index];
};

const summarizeMetric = (bucket) => {
  if (!bucket || !bucket.count) {
    return { count: 0, avg: null, p75: null };
  }

  const avg = bucket.sum / bucket.count;
  const p75 = percentile(bucket.values || [], 0.75);
  return { count: bucket.count, avg, p75 };
};

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Método no permitido." }),
    };
  }

  const store = ensureStore();
  const days = Object.entries(store.days)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      metrics: {
        LCP: summarizeMetric(data.LCP),
        INP: summarizeMetric(data.INP),
        CLS: summarizeMetric(data.CLS),
      },
    }));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      updatedAt: store.updatedAt,
      source: "memory",
      days,
    }),
  };
};
