import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/data/site";
import { content } from "@/data/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${content.fr.role}`, template: `%s | ${site.name}` },
  description: content.fr.metaDescription,
  openGraph: { title: `${site.name} – ${content.fr.role}`, description: content.fr.hero.tagline, type: "website", locale: "fr_FR", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: content.fr.hero.tagline },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#D96C8C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
