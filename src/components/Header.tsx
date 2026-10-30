"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { site } from "@/data/site";
import { useLang } from "./Providers";

const ids = ["accueil", "apropos", "competences", "realisations", "services", "contact"] as const;

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const labels = [t.nav.home, t.nav.about, t.nav.skills, t.nav.work, t.nav.services, t.nav.contact];

  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => { obs.disconnect(); removeEventListener("keydown", onKey); };
  }, []);

  const iconBtn = "grid h-11 w-11 place-items-center rounded-xl border border-line transition hover:border-acc";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-acc focus:px-4 focus:py-2 focus:text-accink">{t.common.skip}</a>
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">{site.firstName}<span className="text-acc">.</span></Link>

        <nav aria-label={t.common.mainNav} className="hidden items-center gap-6 lg:flex">
          {ids.map((id, i) => (
            <Link key={id} href={`/#${id}`} className="relative py-1 text-[15px] font-medium">
              {labels[i]}
              <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-acc transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-p !min-h-10 !px-4 !py-1.5 text-sm">{t.nav.cta}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label={t.common.lang} className={`${iconBtn} font-mono text-sm font-bold`}>{t.common.langShort}</button>
          <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={t.common.theme} className={`${iconBtn} hover:rotate-[-8deg]`}>
            <svg className="dark:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg className="hidden dark:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.common.closeMenu : t.common.openMenu} className={`${iconBtn} lg:hidden`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label={t.common.mobileNav} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-bg lg:hidden">
            <div className="wrap flex flex-col py-3">
              {ids.map((id, i) => (<Link key={id} href={`/#${id}`} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">{labels[i]}</Link>))}
              <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-p mt-3">{t.nav.cta}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
