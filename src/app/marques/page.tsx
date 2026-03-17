import { Metadata } from "next";
import { brands } from "@/data/brands";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "Marques de Panneaux Solaires — Comparatif 2026 | Cout-Panneau-Photovoltaique.fr",
    description: "Comparatif des meilleures marques de panneaux solaires : SunPower, Enphase, DualSun, Systovi, Q Cells, Trina Solar, LONGi. Avis, rendements et prix.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/marques' },
};

export default function MarquesPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <section className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Marques de panneaux solaires</h1>
                <p className="text-lg text-zinc-500 mb-10 font-serif">Découvrez les fabricants les plus fiables et performants du marché.</p>

                <div className="grid md:grid-cols-2 gap-6">
                    {brands.map(brand => (
                        <Link key={brand.slug} href={`/marques/${brand.slug}`} className="group">
                            <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-md transition-all flex gap-5">
                                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-black text-amber-700">{brand.letter}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">{brand.name}</h2>
                                        <span className="text-xs text-zinc-400">{brand.country}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 font-serif mb-3">{brand.tagline}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {brand.strengths.slice(0, 2).map((s, i) => (
                                            <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-zinc-300 group-hover:text-amber-500 mt-4 flex-shrink-0 transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
