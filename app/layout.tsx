import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import { profile } from "@/lib/data";
import "./globals.css";

// Données structurées schema.org : profil personnel, utile pour le référencement
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Développeur web & IA (en reconversion)",
  email: `mailto:${profile.email}`,
  url: "https://kevin-intertaglia.vercel.app",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saint-Gilles-les-Bains",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  sameAs: [profile.github],
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ⚠️ à remplacer par l'URL Vercel réelle après le déploiement
  metadataBase: new URL("https://kevin-intertaglia.vercel.app"),
  title: "Kévin Intertaglia — Développeur web & IA | Portfolio",
  description:
    "De l'hôtellerie de luxe au développement web assisté par IA. Portfolio de Kévin Intertaglia : 4 projets construits de A à Z avec Claude Code — PWA, Next.js, Supabase, Phaser. La Réunion.",
  openGraph: {
    title: "Kévin Intertaglia — Développeur web & IA",
    description:
      "De l'hôtellerie de luxe au développement web assisté par IA. 4 projets concrets, de l'idée au déploiement.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Lien d'évitement pour la navigation clavier */}
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-menthe px-6 py-3 font-semibold text-nuit focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
