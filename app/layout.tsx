import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import { profile } from "@/lib/data";
import "./globals.css";

// Données structurées schema.org : profil personnel, utile pour le référencement
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Développeur freelance — intégration de l'IA en entreprise et sites web",
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
  metadataBase: new URL("https://kevin-intertaglia.vercel.app"),
  title: "Kévin Intertaglia — Intégration IA en entreprise & sites web | La Réunion",
  description:
    "Développeur freelance à La Réunion : j'aide les entreprises à intégrer l'IA (Claude) dans leur quotidien, j'automatise les tâches répétitives et je crée des sites web.",
  openGraph: {
    title: "Kévin Intertaglia — IA en entreprise & sites web",
    description:
      "Intégration de l'IA en entreprise, automatisations et sites web. Freelance à La Réunion.",
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
        {/* Statistiques de visite anonymes (actives une fois déployé sur Vercel) */}
        <Analytics />
      </body>
    </html>
  );
}
