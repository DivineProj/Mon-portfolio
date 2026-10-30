"use client";
import Reveal from "./Reveal";
import { useLang } from "./Providers";

export default function About() {
  const { t } = useLang();
  return (
    <section id="apropos" className="section">
      <div className="wrap">
        <Reveal><h2 className="h2">{t.about.title}</h2></Reveal>
        <Reveal className="max-w-3xl space-y-4 text-lg text-mute">{t.about.paragraphs.map((p) => <p key={p}>{p}</p>)}</Reveal>
      </div>
    </section>
  );
}
