"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "./Providers";

export default function Work() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="realisations" className="section">
      <div className="wrap">
        <Reveal><h2 className="h2">{t.work.title}</h2><p className="-mt-6 mb-10 max-w-2xl text-mute">{t.work.intro}</p></Reveal>
        <ul className="border-t border-line">
          {t.work.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.title} delay={i * 0.06}>
                <li className="border-b border-line">
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`work-${i}`}
                    className="group relative flex w-full items-center justify-between gap-6 py-7 text-left">
                    <span className="absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 rounded-2xl bg-acc/5 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="min-w-0">
                      <span className="block font-display text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{it.title}</span>
                      <span className="mt-1 block max-w-xl text-mute">{it.text}</span>
                    </span>
                    <span aria-hidden="true" className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line transition group-hover:border-acc ${isOpen ? "border-acc bg-acc text-accink" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`work-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
                        <div className="grid gap-8 pb-8 md:grid-cols-2">
                          <div><p className="mb-2 font-display font-bold">{t.work.includes}</p><ul className="list-inside list-disc space-y-1 text-mute">{it.includes.map((x) => <li key={x}>{x}</li>)}</ul></div>
                          <div><p className="mb-2 font-display font-bold">{t.work.stack}</p><ul className="flex flex-wrap gap-2">{it.stack.map((x) => <li key={x} className="tag">{x}</li>)}</ul></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
