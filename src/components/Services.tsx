"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { useLang } from "./Providers";

// Une image par service, dans le même ordre que la liste dans src/data/content.ts.
// Pour changer une image : remplace le fichier dans public/images/services/ (même nom) ou change le chemin ici.
const images = [
  "/images/services/site-web.svg",
  "/images/services/application-web.svg",
  "/images/services/application-mobile.svg",
  "/images/services/api.svg",
  "/images/services/base-de-donnees.svg",
  "/images/services/maintenance.svg",
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="section bg-bg2">
      <div className="wrap">
        <Reveal><h2 className="h2">{t.services.title}</h2></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full">
                {images[i] && (
                  <Image src={images[i]} alt="" width={640} height={360} unoptimized
                    className="-mx-6 -mt-6 mb-5 aspect-video w-[calc(100%+3rem)] max-w-none object-cover" />
                )}
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-mute">{s.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="mb-4 max-w-xl text-mute">{t.services.note}</p>
          <Link href="/#contact" className="btn btn-p">{t.services.quote}</Link>
        </Reveal>
      </div>
    </section>
  );
}
