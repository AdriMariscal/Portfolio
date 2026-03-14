const parseBody = (event) => {
  if (!event?.body) {
    return {};
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  try {
    const asJson = JSON.parse(rawBody);
    if (asJson && typeof asJson === "object") {
      return asJson;
    }
  } catch {
    // fallback to form-encoded
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
};

const sanitize = (value) => (typeof value === "string" ? value.trim() : "");

const buildMessage = () => {
  return "Recibido. En breve te respondo con los siguientes pasos.";
};

const verifyHcaptcha = async ({ token, remoteip }) => {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, reason: "HCAPTCHA_SECRET_KEY no configurada." };
  }

  const params = new URLSearchParams({
    response: token,
    secret,
  });

  if (remoteip) {
    params.append("remoteip", remoteip);
  }

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    return { ok: false, reason: "No se pudo validar hCaptcha." };
  }

  const data = await response.json();
  return { ok: Boolean(data?.success), reason: data?.["error-codes"]?.[0] };
};

const notifySlack = async ({ webhookUrl, payload }) => {
  if (!webhookUrl) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return { ok: response.ok, status: response.status };
};

const notifyCrm = async ({ endpoint, token, payload }) => {
  if (!endpoint) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  return { ok: response.ok, status: response.status };
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Método no permitido." }),
    };
  }

  const body = parseBody(event);

  // Honeypot: si bot-field tiene valor, es spam — rechazar silenciosamente
  if (sanitize(body["bot-field"])) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: buildMessage() }),
    };
  }

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const message = sanitize(body.message);
  const goal = sanitize(body.goal);
  const url = sanitize(body.url);
  const stack = sanitize(body.stack);
  const deadline = sanitize(body.deadline);
  const budget = sanitize(body.budget);
  const captchaToken = sanitize(body["h-captcha-response"]);

  if (!name || !email || !message || !goal) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Faltan datos obligatorios. Revisa el formulario e inténtalo de nuevo.",
      }),
    };
  }

  const captchaEnabled = Boolean(process.env.HCAPTCHA_SECRET_KEY);

  if (captchaEnabled) {
    if (!captchaToken) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Completa el hCaptcha para poder enviar el formulario." }),
      };
    }

    const verification = await verifyHcaptcha({
      token: captchaToken,
      remoteip: event.headers?.["x-forwarded-for"]?.split(",")[0],
    });

    if (!verification.ok) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "No se pudo validar el hCaptcha. Reinténtalo en unos segundos.",
        }),
      };
    }
  }

  const payload = {
    name,
    email,
    message,
    goal,
    url,
    stack,
    deadline,
    budget,
    source: "contact-form",
    receivedAt: new Date().toISOString(),
  };

  const slackPayload = {
    text: `Nuevo contacto desde el portfolio`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Nuevo contacto (portfolio)", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Nombre:*\n${name}` },
          { type: "mrkdwn", text: `*Email:*\n${email}` },
          { type: "mrkdwn", text: `*Objetivo:*\n${goal || "No indicado"}` },
          { type: "mrkdwn", text: `*URL:*\n${url || "No indicada"}` },
          { type: "mrkdwn", text: `*Stack:*\n${stack || "No indicado"}` },
          { type: "mrkdwn", text: `*Plazo:*\n${deadline || "No indicado"}` },
          { type: "mrkdwn", text: `*Presupuesto:*\n${budget || "No indicado"}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Mensaje:*\n${message}` },
      },
    ],
  };

  const [slackResult, crmResult] = await Promise.all([
    notifySlack({ webhookUrl: process.env.SLACK_WEBHOOK_URL, payload: slackPayload }),
    notifyCrm({
      endpoint: process.env.CRM_ENDPOINT_URL,
      token: process.env.CRM_BEARER_TOKEN,
      payload,
    }),
  ]);

  if (!slackResult.ok && !crmResult.ok) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message:
          "No se pudo registrar tu solicitud. Inténtalo de nuevo o escribe directamente a info@adrianmariscal.es.",
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: buildMessage() }),
  };
};
