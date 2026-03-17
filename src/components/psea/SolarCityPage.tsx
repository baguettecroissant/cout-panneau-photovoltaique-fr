import { City } from "@/types";
import { SOLAR_CONFIG } from "@/data/solar-config";
import { CityHero } from "./CityHero";
import { SchemaOrg } from "./SchemaOrg";
import { DepartmentBreadcrumb } from "./DepartmentBreadcrumb";
import { StepsModule } from "./StepsModule";
import { LocalAidsModule } from "./LocalAidsModule";
import { NearbyCitiesModule } from "./NearbyCitiesModule";
import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";
import { getCityIntro, getLocalInsight, getWhyChoose, getPriceBreakdown, getMaterialAdvice, getEnergyStats, getExpertTip, getClimateAnalysis, getLocalRentability } from "@/lib/text-utils";
import { brands } from "@/data/brands";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Sun, BarChart3, ArrowRight, Lightbulb, Wrench, BookOpen, Zap, TrendingUp, CloudSun, Award, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SolarCityPage({ city }: { city: City }) {
    const config = SOLAR_CONFIG;
    const intro = getCityIntro(city);
    const insight = getLocalInsight(city);
    const whyChoose = getWhyChoose(city);
    const priceBreakdown = getPriceBreakdown(city);
    const materialAdvice = getMaterialAdvice(city);
    const energyStats = getEnergyStats(city);
    const expertTip = getExpertTip(city);
    const climateAnalysis = getClimateAnalysis(city);
    const localRentability = getLocalRentability(city);

    const faqItems = [
        {
            q: `Quel est le prix des panneaux solaires à ${city.name} ?`,
            a: `Le prix d'une installation solaire à ${city.name} varie de ${config.priceMin3kWc} € (3 kWc) à ${config.priceMax9kWc} € (9 kWc) tout compris, avant déduction de la prime à l'autoconsommation. Demandez 3 devis gratuits pour comparer les prix locaux.`,
        },
        {
            q: `Quelle rentabilité pour le solaire à ${city.name} ?`,
            a: `Une installation solaire de 6 kWc à ${city.name} se rentabilise en 8 à 12 ans. Avec une durée de vie de 30 à 40 ans, votre toiture produit de l'énergie gratuite pendant 20+ ans après amortissement. Le bénéfice cumulé atteint 25 000 à 40 000 € sur 25 ans.`,
        },
        {
            q: `Quelles aides pour le solaire à ${city.name} ?`,
            a: `Les habitants de ${city.name} (${city.zip}) bénéficient de la prime à l'autoconsommation (350-500 €/kWc), du rachat EDF OA (0,1297 €/kWh pendant 20 ans), de la TVA réduite 10% (≤ 3 kWc) et de l'exonération d'impôts sur le revenu solaire (≤ 3 kWc).`,
        },
        {
            q: `Combien de temps dure l'installation solaire à ${city.name} ?`,
            a: `L'installation des panneaux solaires prend 1 à 3 jours selon la puissance (3, 6 ou 9 kWc). Les démarches administratives (mairie, Enedis, CONSUEL, EDF OA) nécessitent 2 à 4 mois au total, mais votre installateur du ${city.department_name} les gère entièrement.`,
        },
        {
            q: `Comment trouver un installateur QualiPV à ${city.name} ?`,
            a: `Utilisez notre formulaire ci-dessus pour recevoir jusqu'à 3 devis d'installateurs certifiés QualiPV à ${city.name} et dans le ${city.department_name}. La certification QualiPV est indispensable pour bénéficier des primes.`,
        },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.cout-panneau-photovoltaique.fr" },
            { "@type": "ListItem", "position": 2, "name": "Annuaire", "item": "https://www.cout-panneau-photovoltaique.fr/annuaire" },
            { "@type": "ListItem", "position": 3, "name": city.department_name, "item": `https://www.cout-panneau-photovoltaique.fr/annuaire/${city.department_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${city.department_code}` },
            { "@type": "ListItem", "position": 4, "name": `Solaire à ${city.name}`, "item": `https://www.cout-panneau-photovoltaique.fr/panneau-solaire/${city.slug}` },
        ],
    };

    const relevantGuides = [
        { slug: "prix-panneaux-solaires-2026", label: "Prix panneaux solaires 2026" },
        { slug: "autoconsommation-vs-revente", label: "Autoconsommation vs revente" },
        { slug: "aides-panneaux-solaires-2026", label: "Aides et primes 2026" },
        { slug: "rentabilite-panneau-solaire", label: "Rentabilité : payé en combien d'années ?" },
        { slug: "toiture-vs-sol-panneaux-solaires", label: "Toiture vs sol : quelle solution ?" },
        { slug: "batterie-solaire-domestique", label: "Batterie solaire : prix et rentabilité" },
        { slug: "types-panneaux-solaires", label: "Technologies : TOPCon, HJT, IBC" },
        { slug: "demarches-administratives-solaire", label: "Démarches administratives complètes" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50">
            <SchemaOrg city={city} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <CityHero city={city} />

            {/* Breadcrumb */}
            <div className="bg-zinc-50 border-b border-zinc-200">
                <div className="container mx-auto px-4 max-w-5xl">
                    <DepartmentBreadcrumb city={city} />
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 max-w-5xl py-10">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Intro */}
                        <div className="prose prose-lg prose-zinc max-w-none font-serif">
                            <p>{intro}</p>
                            <p>{insight}</p>
                        </div>

                        {/* Energy Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {energyStats.map((stat, i) => (
                                <div key={i} className="bg-white border border-zinc-200 rounded-xl p-4 text-center">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <p className="text-lg font-bold text-zinc-900 mt-1">{stat.value}</p>
                                    <p className="text-xs text-zinc-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Solar production target */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-amber-800 mb-3">
                                <Zap className="h-5 w-5" /> Production estimée à {city.name}
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="bg-amber-600 text-white rounded-xl p-3">
                                        <span className="text-2xl font-black font-mono">3 kWc</span>
                                    </div>
                                    <p className="text-sm text-amber-700 mt-2 font-medium">{config.priceMin3kWc.toLocaleString('fr-FR')} – {config.priceMax3kWc.toLocaleString('fr-FR')} €</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-amber-600 text-white rounded-xl p-3">
                                        <span className="text-2xl font-black font-mono">6 kWc</span>
                                    </div>
                                    <p className="text-sm text-amber-700 mt-2 font-medium">{config.priceMin6kWc.toLocaleString('fr-FR')} – {config.priceMax6kWc.toLocaleString('fr-FR')} €</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-amber-600 text-white rounded-xl p-3">
                                        <span className="text-2xl font-black font-mono">9 kWc</span>
                                    </div>
                                    <p className="text-sm text-amber-700 mt-2 font-medium">{config.priceMin9kWc.toLocaleString('fr-FR')} – {config.priceMax9kWc.toLocaleString('fr-FR')} €</p>
                                </div>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <BarChart3 className="h-6 w-6 text-amber-600" />
                                Décomposition du prix à {city.name}
                            </h2>
                            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                                {priceBreakdown.map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${i % 2 === 1 ? 'bg-zinc-50' : ''}`}>
                                        <div>
                                            <p className="font-semibold text-zinc-800 text-sm">{item.label}</p>
                                            <p className="text-xs text-zinc-500">{item.detail}</p>
                                        </div>
                                        <span className="font-bold text-amber-700 font-mono text-sm whitespace-nowrap ml-4">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Widget */}
                        <div id="devis">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                <Sun className="h-6 w-6 text-amber-600" />
                                Devis panneaux solaires à {city.name}
                            </h2>
                            <ViteUnDevisWidget />
                        </div>

                        {/* Material Advice */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <Wrench className="h-6 w-6 text-amber-600" />
                                Quel panneau choisir à {city.name} ?
                            </h2>
                            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                                <p className="text-zinc-700 leading-relaxed font-serif">{materialAdvice}</p>
                            </div>
                        </section>

                        {/* Steps */}
                        <StepsModule city={city} />

                        {/* Climate Analysis */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <CloudSun className="h-6 w-6 text-amber-600" />
                                Climat et ensoleillement à {city.name}
                            </h2>
                            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                                <p className="text-zinc-700 leading-relaxed font-serif">{climateAnalysis}</p>
                            </div>
                        </section>

                        {/* Local Rentability */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                                Rentabilité solaire à {city.name}
                            </h2>
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                <p className="text-green-800 leading-relaxed font-serif">{localRentability}</p>
                            </div>
                        </section>

                        {/* Expert Tip */}
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-blue-800 mb-3">
                                <Lightbulb className="h-5 w-5" /> Conseil d&apos;expert — {city.name}
                            </h3>
                            <p className="text-blue-800 text-sm leading-relaxed font-serif">{expertTip}</p>
                        </div>

                        {/* Why choose */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                                Pourquoi investir dans le solaire à {city.name} ?
                            </h2>
                            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                    <p className="text-zinc-700 leading-relaxed font-serif">{whyChoose}</p>
                                </div>
                            </div>
                        </section>

                        {/* Related Guides */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                                Guides solaires pour {city.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {relevantGuides.map((guide) => (
                                    <Link key={guide.slug} href={`/guides/${guide.slug}`} className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
                                        <BookOpen className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                        <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors">{guide.label}</span>
                                        <ArrowRight className="h-3 w-3 text-amber-400 ml-auto" />
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Brand Links */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                <Award className="h-6 w-6 text-amber-600" />
                                Marques disponibles à {city.name}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {brands.slice(0, 7).map((brand) => (
                                    <Link key={brand.slug} href={`/marques/${brand.slug}`} className="text-center bg-white border border-zinc-200 rounded-xl p-3 hover:border-amber-400 hover:shadow-sm transition-all group">
                                        <span className="text-lg font-black text-amber-600">{brand.letter}</span>
                                        <p className="text-xs font-semibold text-zinc-600 group-hover:text-amber-600 mt-1">{brand.name}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Department Link */}
                        <Link
                            href={`/annuaire/${city.department_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${city.department_code}`}
                            className="flex items-center gap-3 bg-zinc-100 border border-zinc-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-sm transition-all group"
                        >
                            <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0" />
                            <div>
                                <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600">Voir toutes les villes du {city.department_name} ({city.department_code})</span>
                                <p className="text-xs text-zinc-500">Annuaire solaire complet du département</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-amber-400 ml-auto" />
                        </Link>

                        {/* FAQ */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Questions fréquentes</h2>
                            <Accordion type="single" collapsible className="bg-white rounded-2xl border border-zinc-200 px-6">
                                {faqItems.map((item, idx) => (
                                    <AccordionItem key={idx} value={`faq-${idx}`}>
                                        <AccordionTrigger className="text-base font-semibold text-zinc-800 py-5">{item.q}</AccordionTrigger>
                                        <AccordionContent className="text-zinc-600 font-serif">{item.a}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <LocalAidsModule city={city} />

                        {/* Price summary card */}
                        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-zinc-900 mb-4">Tarif solaire</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">3 kWc</span>
                                    <span className="font-bold text-zinc-800">{config.priceMin3kWc.toLocaleString('fr-FR')} – {config.priceMax3kWc.toLocaleString('fr-FR')} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">6 kWc</span>
                                    <span className="font-bold text-zinc-800">{config.priceMin6kWc.toLocaleString('fr-FR')} – {config.priceMax6kWc.toLocaleString('fr-FR')} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">9 kWc</span>
                                    <span className="font-bold text-zinc-800">{config.priceMin9kWc.toLocaleString('fr-FR')} – {config.priceMax9kWc.toLocaleString('fr-FR')} €</span>
                                </div>
                                <hr className="border-zinc-100" />
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">Prime autoconsommation</span>
                                    <span className="font-bold text-green-600">350 – 500 €/kWc</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-center text-white">
                            <h3 className="text-lg font-bold mb-3">Simuler ma production</h3>
                            <p className="text-amber-100 text-sm mb-4">Comparez les prix et trouvez le meilleur installateur QualiPV à {city.name}.</p>
                            <Link href="#devis">
                                <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-6 py-4 rounded-xl shadow-md w-full">
                                    Comparer les devis <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>

            <NearbyCitiesModule city={city} />
        </div>
    );
}
