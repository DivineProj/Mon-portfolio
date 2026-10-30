"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { content, type Content, type Lang } from "@/data/content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content };
const LangContext = createContext<Ctx>({ lang: "fr", setLang: () => {}, t: content.fr });
export const useLang = () => useContext(LangContext);

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    const initial: Lang = saved === "en" || saved === "fr" ? saved : navigator.language.startsWith("en") ? "en" : "fr";
    setLangState(initial);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user"><LangProvider>{children}</LangProvider></MotionConfig>
    </ThemeProvider>
  );
}
