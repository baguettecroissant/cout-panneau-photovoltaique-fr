import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";

export const metadata: Metadata = {
    title: "FAQ Panneaux Solaires — Questions Fréquentes | Cout-Panneau-Photovoltaique.fr",
    description: "Réponses à toutes vos questions sur les panneaux solaires : prix, aides, rentabilité, autoconsommation, technologies et démarches.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/faq' },
};

const faqItems = [
    { q: "Quel est le prix moyen des panneaux solaires ?", a: "Le prix d'une installation solaire résidentielle varie de 6 000 € (3 kWc — 8 panneaux) à 21 000 € (9 kWc — 22 panneaux) tout compris. Le système le plus populaire (6 kWc — 15 panneaux) coûte entre 10 000 et 15 000 € avant prime à l'autoconsommation (370 €/kWc pour 6 kWc, soit 2 220 € de prime)." },
    { q: "Combien de temps pour rentabiliser les panneaux solaires ?", a: "Le retour sur investissement se situe entre 8 et 12 ans selon la région, la puissance et votre consommation. Dans le sud de la France (PACA, Occitanie), comptez 7-9 ans. Dans le nord (Hauts-de-France, Grand Est), comptez 10-13 ans. Après amortissement, votre toiture produit de l'énergie gratuite pendant 20+ ans." },
    { q: "Quelles aides pour installer des panneaux solaires en 2026 ?", a: "Vous bénéficiez de la prime à l'autoconsommation (350-500 €/kWc), du tarif de rachat EDF OA garanti 20 ans (0,1297 €/kWh), de la TVA réduite 10% (≤ 3 kWc) et de l'exonération d'impôts sur les revenus solaires (≤ 3 kWc). Certaines régions proposent des aides complémentaires." },
    { q: "Autoconsommation ou revente totale ?", a: "L'autoconsommation avec revente du surplus est la formule la plus rentable en 2026, car consommer son électricité solaire économise 0,2516 €/kWh (tarif EDF) contre seulement 0,1297 €/kWh en revente. C'est donc 2× plus rentable de consommer que de revendre." },
    { q: "Quelle puissance installer (3, 6 ou 9 kWc) ?", a: "Un couple consommant 4 000 kWh/an optera pour 3 kWc. Une famille de 4 personnes (8 000-10 000 kWh) choisira 6 kWc. 9 kWc convient aux grandes maisons, piscine chauffée ou recharge de véhicule électrique." },
    { q: "Faut-il une batterie avec les panneaux solaires ?", a: "En 2026, la batterie n'est pas indispensable. Sans batterie, vous autoconsommez 30-40% de votre production et revendez le surplus. Avec batterie (4 000-8 000 € pour 5-10 kWh), vous montez à 60-80% d'autoconsommation mais le surcoût allonge la rentabilité de 3-5 ans." },
    { q: "Quelle est la durée de vie des panneaux solaires ?", a: "Les panneaux solaires actuels ont une durée de vie de 30 à 40 ans. Les fabricants garantissent 80-87% de la puissance nominale à 25 ans. SunPower garantit même 92% à 25 ans et offre une garantie de 40 ans. L'onduleur a une durée de vie de 10-15 ans (25 ans pour les micro-onduleurs Enphase)." },
    { q: "Faut-il un installateur certifié ?", a: "Oui, la certification RGE/QualiPV est obligatoire pour bénéficier de la prime à l'autoconsommation et du contrat de rachat EDF OA. Sans installateur certifié, vous perdez toutes les aides financières. Vérifiez la certification sur qualit-enr.org." },
    { q: "Peut-on installer des panneaux solaires en copropriété ?", a: "Oui, depuis la loi Climat et Résilience 2021, le vote en assemblée générale requiert la majorité simple (article 24) pour les installations en toiture collective. L'autoconsommation collective permet de partager la production entre copropriétaires." },
    { q: "Les panneaux solaires fonctionnent-ils quand il pleut ?", a: "Oui, les panneaux fonctionnent avec la lumière (pas le soleil direct). Un jour couvert produit 10-30% de la production d'un jour ensoleillé. La pluie ne les endommage pas et nettoie même naturellement les panneaux. C'est pourquoi le solaire est rentable partout en France, y compris dans le nord." },
];

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } })),
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <section className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Questions fréquentes</h1>
                <p className="text-lg text-zinc-500 mb-10 font-serif">Trouvez les réponses à vos questions sur les panneaux solaires.</p>

                <Accordion type="single" collapsible className="bg-zinc-50 rounded-2xl border border-zinc-200 px-6">
                    {faqItems.map((item, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`}>
                            <AccordionTrigger className="text-base font-semibold text-zinc-800 py-5">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-zinc-600 font-serif">{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="text-center mt-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8">
                    <Sun className="h-8 w-8 mx-auto mb-4 text-amber-200" />
                    <h2 className="text-2xl font-bold mb-3">Vous avez un projet solaire ?</h2>
                    <p className="text-amber-100 mb-6">Obtenez 3 devis gratuits d&apos;installateurs certifiés QualiPV.</p>
                    <Link href="/devis">
                        <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-8 py-5 rounded-xl shadow-lg">
                            Simuler ma production <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
