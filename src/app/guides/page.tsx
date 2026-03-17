import { Metadata } from "next";
import { guides } from "@/data/guides";
import { GUIDE_CATEGORIES } from "@/types/guide";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Guides Panneaux Solaires 2026 : Prix, Aides, Rentabilité — Tout Savoir",
    description: "Tous nos guides sur les panneaux solaires : prix, autoconsommation, aides 2026, rentabilité, technologies et démarches. Conseils d'experts indépendants.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/guides' },
};

export default function GuidesPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <section className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Guides solaires</h1>
                <p className="text-lg text-zinc-500 mb-10 font-serif">Tout savoir sur les panneaux solaires : prix, rentabilité, aides et démarches.</p>

                <div className="grid md:grid-cols-2 gap-6">
                    {guides.map(guide => {
                        const cat = GUIDE_CATEGORIES[guide.category];
                        return (
                            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                                <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-md transition-all h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-lg">{cat.emoji}</span>
                                        <span className="text-xs text-amber-600 font-semibold uppercase">{cat.label}</span>
                                        <span className="text-xs text-zinc-400 ml-auto">{guide.readTime}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">{guide.title}</h2>
                                    <p className="text-zinc-500 text-sm flex-1 font-serif">{guide.excerpt}</p>
                                    <span className="text-amber-600 text-sm font-semibold mt-4 flex items-center gap-1">
                                        <BookOpen className="h-3 w-3" /> Lire le guide <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
