"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { site } from "@/data/site";
import { useLang } from "./Providers";

const ease = [0.2, 0.8, 0.2, 1] as const;

function Line({ text, base }: { text: string; base: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <motion.span key={i} className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: base + i * 0.05, ease }}>{ch}</motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  const x = useMotionValue(600), y = useMotionValue(200);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgb(var(--acc) / 0.16), transparent 70%)`;
  const rise = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.8, ease } });

  return (
    <section id="accueil" className="relative overflow-hidden pb-20 pt-32 md:pt-40"
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); }}>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div className="wrap relative grid items-center gap-12 md:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h1 className="font-display text-[clamp(3.2rem,11vw,9rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            <span className="sr-only">{site.name}</span>
            <Line text={site.firstName} base={0.1} />
            <Line text={site.lastName} base={0.5} />
          </h1>
          <motion.p {...rise(1.2)} className="mt-8 max-w-xl text-xl text-mute md:text-2xl">{t.hero.tagline}</motion.p>
          <motion.div {...rise(1.4)} className="mt-8 flex flex-wrap gap-3">
            <Link href="/#realisations" className="btn btn-p">{t.hero.seeWork}</Link>
            <Link href="/#contact" className="btn">{t.hero.contactMe}</Link>
            {site.cvUrl
              ? <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="btn">{t.hero.cv}</a>
              : <span aria-disabled="true" className="btn cursor-default opacity-55">{t.hero.cvMissing}</span>}
          </motion.div>
        </div>

        <motion.div {...rise(0.9)} className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-acc md:translate-x-4 md:translate-y-4" />
          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 1.0, duration: 1.1, ease }}
            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-bg2">
            <Image src={site.photo} alt={t.hero.photoAlt} fill priority sizes="(min-width: 768px) 36vw, 90vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
