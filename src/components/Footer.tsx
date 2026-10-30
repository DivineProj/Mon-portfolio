"use client";
import { site } from "@/data/site";
import { useLang } from "./Providers";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line py-8 text-mute">
      <div className="wrap flex flex-wrap justify-between gap-3 text-[15px]">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{t.role}</span>
      </div>
    </footer>
  );
}
