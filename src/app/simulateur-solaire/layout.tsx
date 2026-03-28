import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur de Rendement Solaire 2026 — Production & Rentabilité (Gratuit)",
  description: "Simulez gratuitement la production de vos panneaux solaires : kWh/an, économies, retour sur investissement et CO₂ évité. Données PVGIS par département, orientation et inclinaison.",
  alternates: {
    canonical: "https://www.cout-panneau-photovoltaique.fr/simulateur-solaire",
  },
  openGraph: {
    title: "Simulateur de Rendement Solaire — Production & Rentabilité | Gratuit",
    description: "Calculez la production de vos panneaux photovoltaïques par département. Économies, ROI, prime autoconsommation. 100% gratuit.",
    url: "https://www.cout-panneau-photovoltaique.fr/simulateur-solaire",
    type: "website",
  },
};

export default function SimulateurSolaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Simulateur de Rendement Solaire",
            "url": "https://www.cout-panneau-photovoltaique.fr/simulateur-solaire",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
            },
            "description": "Simulez gratuitement la production de vos panneaux solaires photovoltaïques par département. Calcul des économies, retour sur investissement et CO₂ évité.",
            "author": {
              "@type": "Organization",
              "name": "Cout-Panneau-Photovoltaique.fr",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
