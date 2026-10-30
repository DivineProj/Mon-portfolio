import { NextResponse } from "next/server";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// E-mail reçu : mise en page rose poudré, avec styles en ligne (obligatoire pour Gmail, Outlook, etc.)
function emailHtml(o: { name: string; email: string; subject: string; message: string; date: string }) {
  const name = esc(o.name), email = esc(o.email), subject = esc(o.subject), date = esc(o.date);
  const message = esc(o.message).replace(/\r?\n/g, "<br>");
  const reply = `mailto:${encodeURIComponent(o.email).replace(/%40/g, "@")}?subject=${encodeURIComponent("Re: " + o.subject)}`;
  const font = "font-family:'Segoe UI',Helvetica,Arial,sans-serif";
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#FBE6EC;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name} vous a écrit : ${subject}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBE6EC;padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
    <tr><td style="background:#D96C8C;border-radius:20px 20px 0 0;padding:28px 32px;${font};">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3B2430;font-weight:700;">Portfolio · Divine Etoundé</div>
      <div style="margin-top:8px;font-size:26px;line-height:1.25;color:#ffffff;font-weight:800;">Nouveau message reçu</div>
    </td></tr>
    <tr><td style="background:#ffffff;padding:32px;${font};color:#3B2430;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5;">
        <tr><td style="padding:0 0 4px;color:#A5546C;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">De</td></tr>
        <tr><td style="padding:0 0 18px;font-size:17px;font-weight:700;">${name}</td></tr>
        <tr><td style="padding:0 0 4px;color:#A5546C;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">E-mail</td></tr>
        <tr><td style="padding:0 0 18px;"><a href="mailto:${email}" style="color:#D96C8C;font-weight:600;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:0 0 4px;color:#A5546C;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Sujet</td></tr>
        <tr><td style="padding:0 0 24px;font-size:17px;font-weight:700;">${subject}</td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="background:#FBE6EC;border-left:4px solid #D96C8C;border-radius:10px;padding:18px 20px;font-size:16px;line-height:1.65;color:#3B2430;">${message}</td>
      </tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
        <td style="background:#D96C8C;border-radius:12px;"><a href="${reply}" style="display:inline-block;padding:14px 28px;${font};font-size:16px;font-weight:700;color:#3B2430;text-decoration:none;">Répondre à ${name}</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="background:#F4B4C3;border-radius:0 0 20px 20px;padding:16px 32px;${font};font-size:12px;color:#3B2430;">
      Reçu le ${date} via le formulaire de contact de ton portfolio.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

const hits = new Map<string, number[]>(); // limitation simple : 5 messages / 10 min / IP (mémoire du serveur)

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  const isProd = process.env.NODE_ENV === "production"; // pas de limite pendant les tests en local
  if (isProd && recent.length >= 5) return NextResponse.json({ error: "rate" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // robot : on fait semblant

  const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = s(b.name, 100), email = s(b.email, 150), subject = s(b.subject, 150), message = s(b.message, 3000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || subject.length < 3 || message.length < 10) {
    console.error("[contact] Formulaire refusé par le serveur (champ trop court ou e-mail invalide)");
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  console.log("[contact] Envoi vers Resend, clé commençant par", key.slice(0, 6), "→", to);

  let r: Response;
  try {
    r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>", to: [to], reply_to: email,
        subject: `[Portfolio] ${subject}`, text: `De : ${name} <${email}>\n\n${message}`,
        html: emailHtml({ name, email, subject, message, date: new Date().toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Porto-Novo" }) }),
      }),
    });
  } catch (e) {
    console.error("[contact] Impossible de joindre Resend (connexion internet ou blocage réseau) :", e);
    return NextResponse.json({ error: "send" }, { status: 502 });
  }
  if (!r.ok) {
    console.error("[contact] Resend a refusé l'envoi :", r.status, await r.text()); // visible dans le terminal
    return NextResponse.json({ error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
