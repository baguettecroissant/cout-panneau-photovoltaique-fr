import type { Metadata } from "next";
import { Montserrat, PT_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cout-panneau-photovoltaique.fr'),
  title: "Coût Panneau Photovoltaïque 2026 — Prix, Rentabilité & Devis",
  description: "Comparez les prix des panneaux solaires photovoltaïques : 3, 6 et 9 kWc. Simulez votre rentabilité et obtenez 3 devis gratuits d'installateurs QualiPV.",
  openGraph: {
    title: "Coût Panneau Photovoltaïque 2026 — Prix, Rentabilité & Devis",
    description: "Panneaux solaires : comparez les prix, simulez votre rentabilité et obtenez des devis gratuits d'installateurs certifiés QualiPV.",
    url: 'https://www.cout-panneau-photovoltaique.fr',
    siteName: 'Cout-Panneau-Photovoltaique.fr',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Coût Panneau Photovoltaïque 2026 — Prix, Rentabilité & Devis",
    description: "Panneaux solaires : comparez les prix, simulez votre rentabilité et obtenez des devis gratuits.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cout-Panneau-Photovoltaique.fr",
  "url": "https://www.cout-panneau-photovoltaique.fr",
  "logo": "https://www.cout-panneau-photovoltaique.fr/icon.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cout-Panneau-Photovoltaique.fr",
  "url": "https://www.cout-panneau-photovoltaique.fr",
  "description": "Guide indépendant : prix, rentabilité et installateurs de panneaux solaires photovoltaïques en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${ptSerif.variable} ${robotoMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1 pb-14 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
