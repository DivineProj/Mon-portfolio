"use client";
import { useLang } from "./Providers";

export default function Marquee() {
  const { t } = useLang();
  const names = t.skills.groups.flatMap((g) => g.items.map((i) => i.name));
  const row = [...names, ...names];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        {row.map((n, i) => <span key={i} className="whitespace-nowrap font-display text-2xl font-bold text-mute">{n}</span>)}
      </div>
    </div>
  );
}
