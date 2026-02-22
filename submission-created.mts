interface FormPayload {
  form_name: string;
  ordered_human_fields: { name: string; title: string; value: string }[];
  data: Record<string, string>;
  created_at: string;
}

export default async (req: Request) => {
  const { payload } = (await req.json()) as { payload: FormPayload };

  if (payload.form_name !== "contact") {
    return new Response("Ignored: not a contact form submission");
  }

  const mailgunApiKey = Netlify.env.get("MAILGUN_API_KEY");
  const mailgunDomain = Netlify.env.get("MAILGUN_DOMAIN");

  if (!mailgunApiKey || !mailgunDomain) {
    console.error(
      "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN environment variables"
    );
    return new Response("Email not sent: missing email service configuration", {
      status: 500,
    });
  }

  const { name, email, language, format, message } = payload.data;

  const subject = `New contact form message from ${name || "a visitor"}`;

  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
      <h2 style="color: #6b7c5e; border-bottom: 1px solid #ddd; padding-bottom: 12px;">
        New Message from Your Website
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; width: 160px; color: #555;">Name</td>
          <td style="padding: 8px 12px;">${escapeHtml(name || "Not provided")}</td>
        </tr>
        <tr style="background: #f9f8f5;">
          <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; color: #555;">Email</td>
          <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email || "")}">${escapeHtml(email || "Not provided")}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; color: #555;">Preferred Language</td>
          <td style="padding: 8px 12px;">${escapeHtml(language || "Not specified")}</td>
        </tr>
        <tr style="background: #f9f8f5;">
          <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; color: #555;">Session Format</td>
          <td style="padding: 8px 12px;">${escapeHtml(format || "Not specified")}</td>
        </tr>
        ${
          message
            ? `<tr>
          <td style="padding: 8px 12px; font-weight: bold; vertical-align: top; color: #555;">Message</td>
          <td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>`
            : ""
        }
      </table>
      <p style="margin-top: 24px; font-size: 13px; color: #888;">
        Submitted on ${new Date(payload.created_at).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Zurich" })}
      </p>
    </div>
  `;

  const textBody = [
    `New contact form message`,
    ``,
    `Name: ${name || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Preferred Language: ${language || "Not specified"}`,
    `Session Format: ${format || "Not specified"}`,
    message ? `Message: ${message}` : "",
    ``,
    `Submitted on ${new Date(payload.created_at).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Zurich" })}`,
  ]
    .filter(Boolean)
    .join("\n");

  const formData = new URLSearchParams({
    from: `Sophie Klose Website <noreply@${mailgunDomain}>`,
    to: "contact@sophieklose.com",
    subject,
    html: htmlBody,
    text: textBody,
    ...(email ? { "h:Reply-To": email } : {}),
  });

  const response = await fetch(
    `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Mailgun API error:", response.status, error);
    return new Response("Failed to send email", { status: 500 });
  }

  console.log("Email sent successfully to contact@sophieklose.com");
  return new Response("Email sent");
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
