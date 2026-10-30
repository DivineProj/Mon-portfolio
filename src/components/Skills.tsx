"use client";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { useLang } from "./Providers";

export default function Skills() {
  const { t } = useLang();
  return (
    <section id="competences" className="section bg-bg2">
      <div className="wrap">
        <Reveal><h2 className="h2">{t.skills.title}</h2></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full">
                <h3 className="font-display text-xl font-bold">{g.title}</h3>
                <p className="mt-1 text-mute">{g.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (<li key={s.name} className="tag">{s.name}{s.level && <small className="ml-2 opacity-70">{s.level}</small>}</li>))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
