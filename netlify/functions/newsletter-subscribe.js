const parseBody = (event) => {
  if (!event?.body) return {};

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  try {
    const asJson = JSON.parse(rawBody);
    if (asJson && typeof asJson === "object") return asJson;
  } catch {
    // fallback to form-encoded
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
};

const sanitize = (value) => (typeof value === "string" ? value.trim() : "");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Método no permitido." }),
    };
  }

  const body = parseBody(event);

  if (sanitize(body["bot-field"])) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Listo. Te avisaré cuando publique algo relevante.",
      }),
    };
  }

  const email = sanitize(body.email);

  if (!email || !isValidEmail(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "Introduce un email válido." }),
    };
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    console.error("BUTTONDOWN_API_KEY not configured");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message:
          "El servicio de newsletter no está disponible en este momento.",
      }),
    };
  }

  const clientIp =
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || undefined;

  try {
    const response = await fetch(
      "https://api.buttondown.com/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          tags: ["blog"],
          ...(clientIp ? { ip_address: clientIp } : {}),
        }),
      },
    );

    if (response.status === 201) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Listo. Te avisaré cuando publique algo relevante.",
        }),
      };
    }

    if (response.status === 400) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Ya estás suscrito. ¡Gracias!",
        }),
      };
    }

    if (response.status === 429) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          message: "Demasiadas solicitudes. Inténtalo en unos minutos.",
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message:
          "No se pudo completar la suscripción. Inténtalo de nuevo.",
      }),
    };
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message:
          "Error al procesar la suscripción. Inténtalo de nuevo.",
      }),
    };
  }
};
