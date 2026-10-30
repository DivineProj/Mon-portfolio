"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { useLang } from "./Providers";
import type { Content } from "@/data/content";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type State = { kind: "idle" | "loading" | "good" | "bad"; msg: string };

function validate(d: Record<string, string>, c: Content["contact"]): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = c.eName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = c.eEmail;
  if (d.subject.trim().length < 3) e.subject = c.eSubject;
  if (d.message.trim().length < 10) e.message = c.eMessage;
  return e;
}

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>({ kind: "idle", msg: "" });

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs = validate(d, c);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setState({ kind: "bad", msg: c.fix });
      (form.elements.namedItem(Object.keys(errs)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setState({ kind: "loading", msg: "" });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      if (r.status === 429) setState({ kind: "bad", msg: c.rate });
      else if (r.ok) { form.reset(); setState({ kind: "good", msg: c.ok }); }
      else if (r.status === 503 || r.status === 502) await sendWithoutServer(d, form); // Resend absent ou refusé
      else setState({ kind: "bad", msg: c.fail });
    } catch {
      setState({ kind: "bad", msg: c.network });
    }
  }

  // Plan B sans clé à configurer : service FormSubmit (le 1er message demande une activation par e-mail),
  // puis, en dernier recours, ouverture de la messagerie avec le message déjà rédigé.
  async function sendWithoutServer(d: Record<string, string>, form: HTMLFormElement) {
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: d.name, email: d.email, message: d.message, _subject: `[Portfolio] ${d.subject}`, _captcha: "false", _template: "table" }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && String(j.success) === "true") { form.reset(); setState({ kind: "good", msg: c.ok }); return; }
    } catch {}
    const body = encodeURIComponent(`${d.message}\n\n${d.name} (${d.email})`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject)}&body=${body}`;
    setState({ kind: "good", msg: c.mailFallback });
  }

  const field = "w-full rounded-xl border-[1.5px] border-line bg-card px-4 py-3 outline-none transition focus:border-acc focus:ring-4 focus:ring-acc/20 aria-[invalid=true]:border-red-500";
  const links: [string, string, string][] = [
    ["E-mail", `mailto:${site.email}`, site.email], ["WhatsApp", `https://wa.me/${site.whatsapp}`, site.whatsapp],
    ["LinkedIn", site.linkedin, site.linkedin], ["GitHub", site.github, site.github],
  ];

  return (
    <section id="contact" className="section bg-bg2">
      <div className="wrap">
        <Reveal><h2 className="h2">{c.title}</h2><p className="-mt-6 mb-8 max-w-xl text-mute">{c.intro}</p></Reveal>
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="grid max-w-xl gap-4">
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
            {([["name", c.name, "text", "name"], ["email", c.email, "email", "email"], ["subject", c.subject, "text", "off"]] as const).map(([n, l, t, ac]) => (
              <label key={n} className="grid gap-1.5 font-semibold">{l}
                <input name={n} type={t} autoComplete={ac} required maxLength={150} aria-invalid={!!errors[n]} className={field} />
                <span className="min-h-5 text-sm font-medium text-red-600 dark:text-red-400">{errors[n]}</span>
              </label>
            ))}
            <label className="grid gap-1.5 font-semibold">{c.message}
              <textarea name="message" rows={6} required maxLength={3000} aria-invalid={!!errors.message} className={field} />
              <span className="min-h-5 text-sm font-medium text-red-600 dark:text-red-400">{errors.message}</span>
            </label>
            <div><button type="submit" disabled={state.kind === "loading"} className="btn btn-p disabled:opacity-60">{state.kind === "loading" ? c.sending : c.send}</button></div>
            <p role="status" aria-live="polite" className={state.msg ? `rounded-xl border px-4 py-3 ${state.kind === "good" ? "border-emerald-600" : "border-red-500"}` : "hidden"}>{state.msg}</p>
          </form>
        </Reveal>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {links.map(([label, href, val]) => val
            ? <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-acc underline-offset-4">{label}</a></li>
            : <li key={label} className="text-mute">{label} : {c.missing}</li>)}
        </ul>
      </div>
    </section>
  );
}
