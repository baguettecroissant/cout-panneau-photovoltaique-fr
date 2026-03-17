import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SOLAR_CONFIG } from "@/data/solar-config";
import { guides } from "@/data/guides";
import { brands } from "@/data/brands";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Sun, CheckCircle, MapPin, Star, Zap, BookOpen, Award } from "lucide-react";

const faqItems = [
    { q: "Quel est le prix moyen des panneaux solaires ?", a: "Le prix d'une installation solaire résidentielle varie de 6 000 € (3 kWc) à 21 000 € (9 kWc) tout compris, pose et matériaux inclus. Le système le plus populaire (6 kWc, 15 panneaux) coûte entre 10 000 et 15 000 € avant prime à l'autoconsommation." },
    { q: "Quelles aides pour le solaire en 2026 ?", a: "La prime à l'autoconsommation atteint 350 à 500 €/kWc selon la puissance. Le surplus est racheté par EDF OA à 0,1297 €/kWh pendant 20 ans. La TVA est réduite à 10% pour les installations ≤ 3 kWc. Les revenus solaires sont exonérés d'impôts (≤ 3 kWc)." },
    { q: "En combien d'années les panneaux sont-ils rentables ?", a: "Le retour sur investissement se situe entre 8 et 12 ans selon l'ensoleillement, la puissance installée et votre consommation. Avec une durée de vie de 30-40 ans, vous bénéficiez de 20+ ans d'énergie gratuite après amortissement." },
    { q: "Autoconsommation ou revente totale ?", a: "L'autoconsommation avec revente du surplus est la formule la plus rentable en 2026. Consommer votre électricité solaire économise 0,2516 €/kWh (tarif EDF) contre seulement 0,1297 €/kWh en revente. L'autoconsommation est donc 2× plus rentable." },
    { q: "Quelle puissance installer (3, 6 ou 9 kWc) ?", a: "Un couple consommant 4 000 kWh/an optera pour 3 kWc. Une famille de 4 personnes (8 000-10 000 kWh) choisira 6 kWc. 9 kWc convient aux grandes maisons, piscine chauffée ou recharge de véhicule électrique." },
    { q: "Faut-il une certification QualiPV ?", a: "Oui, la certification QualiPV (ou RGE) est obligatoire pour bénéficier de la prime à l'autoconsommation et du contrat de rachat EDF OA. Sans installateur certifié, vous perdez toutes les aides financières." },
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

const topCities = [
    { name: "Toulouse", slug: "toulouse-31000" },
    { name: "Lyon", slug: "lyon-69001" },
    { name: "Marseille", slug: "marseille-13006" },
    { name: "Nice", slug: "nice-06000" },
    { name: "Nantes", slug: "nantes-44000" },
    { name: "Strasbourg", slug: "strasbourg-67000" },
    { name: "Montpellier", slug: "montpellier-34000" },
    { name: "Bordeaux", slug: "bordeaux-33000" },
];

export default function HomePage() {
    const config = SOLAR_CONFIG;

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* ── Hero ── */}
            <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-300 py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="flex items-center gap-2 text-amber-100 text-sm font-medium mb-6">
                                <Sun className="h-4 w-4" />
                                <span>Guide indépendant — Installateurs certifiés QualiPV</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                <span className="text-yellow-200">Produisez</span> votre électricité solaire en 2026
                            </h1>
                            <p className="text-lg md:text-xl text-amber-100 mb-8 font-serif max-w-2xl">
                                Panneaux solaires photovoltaïques — Simulez votre rentabilité et recevez 3 devis gratuits d&apos;installateurs QualiPV.
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/devis">
                                    <Button className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-7 rounded-xl shadow-lg text-lg">
                                        Simuler ma production <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/guides">
                                    <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 px-6 py-7 rounded-xl text-lg">
                                        <BookOpen className="mr-2 h-5 w-5" /> Lire les guides
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-6 mt-8 text-sm text-amber-100">
                                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-300" /> 100% gratuit</span>
                                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-300" /> Sans engagement</span>
                                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-300" /> QualiPV certifié</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-white text-center">
                                <Sun className="h-16 w-16 mx-auto mb-4 text-yellow-200" />
                                <p className="text-3xl font-black font-mono">{config.priceMin6kWc.toLocaleString('fr-FR')} – {config.priceMax6kWc.toLocaleString('fr-FR')} €</p>
                                <p className="text-amber-200 mt-2">Installation 6 kWc tout compris</p>
                                <p className="text-sm text-amber-200/80 mt-1">Avant prime autoconsommation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Price Grid ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 text-center mb-4">Prix panneaux solaires 2026</h2>
                    <p className="text-zinc-500 text-center mb-12 max-w-2xl mx-auto font-serif">Le coût dépend de la puissance : choisissez la taille adaptée à votre consommation.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { kWc: "3 kWc", panels: "8 panneaux", price: `${config.priceMin3kWc.toLocaleString('fr-FR')} – ${config.priceMax3kWc.toLocaleString('fr-FR')} €`, desc: "Idéal pour un couple — 3 000 à 4 500 kWh/an", popular: false },
                            { kWc: "6 kWc", panels: "15 panneaux", price: `${config.priceMin6kWc.toLocaleString('fr-FR')} – ${config.priceMax6kWc.toLocaleString('fr-FR')} €`, desc: "Le plus populaire — 6 000 à 8 500 kWh/an", popular: true },
                            { kWc: "9 kWc", panels: "22 panneaux", price: `${config.priceMin9kWc.toLocaleString('fr-FR')} – ${config.priceMax9kWc.toLocaleString('fr-FR')} €`, desc: "Grande maison ou VE — 9 000 à 13 000 kWh/an", popular: false },
                        ].map(item => (
                            <Link key={item.kWc} href="/devis" className="group">
                                <div className={`border rounded-2xl p-8 hover:shadow-lg transition-all h-full ${item.popular ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-400' : 'border-zinc-200 bg-zinc-50 hover:border-amber-400'}`}>
                                    {item.popular && <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Le + populaire</span>}
                                    <h3 className="text-2xl font-black text-zinc-900 mb-1">{item.kWc}</h3>
                                    <p className="text-sm text-zinc-500 mb-4">{item.panels}</p>
                                    <p className="text-xl font-bold text-amber-600 font-mono mb-3">{item.price}</p>
                                    <p className="text-zinc-500 text-sm font-serif mb-4">{item.desc}</p>
                                    <span className="text-green-700 text-sm font-semibold flex items-center gap-1">
                                        Simuler <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Guides ── */}
            <section className="py-16 bg-zinc-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 text-center mb-12">Guides solaires</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {guides.slice(0, 4).map(guide => (
                            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                                <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-md transition-all h-full flex flex-col">
                                    <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold mb-3">
                                        <BookOpen className="h-3 w-3" /> {guide.readTime}
                                    </div>
                                    <h3 className="text-base font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">{guide.title}</h3>
                                    <p className="text-zinc-500 text-sm flex-1 font-serif line-clamp-3">{guide.excerpt}</p>
                                    <span className="text-amber-600 text-sm font-semibold mt-4 flex items-center gap-1">Lire <ArrowRight className="h-3 w-3" /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/guides">
                            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-5 rounded-xl font-semibold">
                                Tous les guides <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Value Stack ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black text-zinc-900 text-center mb-12">Pourquoi nous faire confiance ?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Sun className="h-8 w-8 text-amber-500" />, title: "Installateurs certifiés QualiPV", desc: "Tous nos partenaires sont certifiés RGE & QualiPV, condition obligatoire pour les primes et le contrat EDF OA." },
                            { icon: <Zap className="h-8 w-8 text-green-600" />, title: "Simulation en 2 minutes", desc: "Remplissez un seul formulaire et recevez jusqu'à 3 devis personnalisés, gratuitement et sans engagement." },
                            { icon: <Star className="h-8 w-8 text-yellow-500" />, title: "Guide indépendant", desc: "Nous ne vendons rien : nos comparatifs et simulations sont 100% indépendants, basés sur les données du marché." },
                        ].map((v, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4">{v.icon}</div>
                                <h3 className="font-bold text-zinc-900 mb-2">{v.title}</h3>
                                <p className="text-zinc-500 text-sm font-serif">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── City Finder ── */}
            <section className="py-16 bg-zinc-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black text-zinc-900 text-center mb-4">Prix solaire par ville</h2>
                    <p className="text-zinc-500 text-center mb-10 font-serif">Retrouvez les tarifs, installateurs QualiPV et production estimée pour votre commune.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {topCities.map(city => (
                            <Link key={city.slug} href={`/panneau-solaire/${city.slug}`} className="flex items-center gap-2 p-4 bg-white border border-zinc-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                                <MapPin className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                <span className="font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors">{city.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/annuaire" className="text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors">
                            Voir tout l&apos;annuaire par département →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Brands ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-black text-zinc-900 text-center mb-10">Marques de panneaux solaires</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                        {brands.map(brand => (
                            <Link key={brand.slug} href={`/marques/${brand.slug}`} className="group text-center p-4 bg-zinc-50 rounded-2xl border border-zinc-200 hover:border-amber-400 hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-amber-100 rounded-full mx-auto flex items-center justify-center mb-2">
                                    <span className="text-xl font-black text-amber-700">{brand.letter}</span>
                                </div>
                                <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600">{brand.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/marques" className="text-amber-600 font-semibold text-sm hover:text-amber-700">Toutes les marques →</Link>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-16 bg-zinc-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-black text-zinc-900 text-center mb-10">Questions fréquentes</h2>
                    <Accordion type="single" collapsible className="bg-white rounded-2xl border border-zinc-200 px-6 shadow-sm">
                        {faqItems.map((item, idx) => (
                            <AccordionItem key={idx} value={`faq-${idx}`}>
                                <AccordionTrigger className="text-base font-semibold text-zinc-800 py-5">{item.q}</AccordionTrigger>
                                <AccordionContent className="text-zinc-600 font-serif">{item.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <Award className="h-12 w-12 mx-auto mb-6 text-amber-200" />
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Votre toiture peut produire de l&apos;argent</h2>
                    <p className="text-amber-100 text-lg mb-8 font-serif">Comparez les devis d&apos;installateurs certifiés QualiPV et bénéficiez des primes 2026. C&apos;est gratuit, rapide et sans engagement.</p>
                    <Link href="/devis">
                        <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-10 py-7 rounded-xl shadow-lg text-lg">
                            Simuler ma production solaire <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
