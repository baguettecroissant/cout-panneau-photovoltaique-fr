import { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const brand = brands.find(b => b.slug === slug);
    if (!brand) return {};
    return {
        title: `${brand.name} — Panneaux Solaires ${brand.country} | Cout-Panneau-Photovoltaique.fr`,
        description: `${brand.name} : ${brand.tagline}. Avis, rendements, prix et points forts de la marque ${brand.name} en 2026.`,
        alternates: { canonical: `https://www.cout-panneau-photovoltaique.fr/marques/${brand.slug}` },
    };
}

export function generateStaticParams() {
    return brands.map(b => ({ slug: b.slug }));
}

export default async function BrandPage({ params }: Props) {
    const { slug } = await params;
    const brand = brands.find(b => b.slug === slug);
    if (!brand) notFound();

    return (
        <div className="min-h-screen bg-white">
            <section className="container mx-auto px-4 py-12 max-w-3xl">
                <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
                    <Link href="/" className="hover:text-amber-600">Accueil</Link> /
                    <Link href="/marques" className="hover:text-amber-600">Marques</Link> /
                    <span className="text-zinc-800 font-semibold">{brand.name}</span>
                </nav>

                <div className="flex items-center gap-5 mb-8">
                    <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <span className="text-4xl font-black text-amber-700">{brand.letter}</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-zinc-900">{brand.name}</h1>
                        <p className="text-zinc-500">{brand.country}</p>
                    </div>
                </div>

                <p className="text-amber-700 font-semibold text-lg mb-6">{brand.tagline}</p>

                <div className="prose prose-zinc max-w-none font-serif mb-10">
                    <p>{brand.description}</p>
                </div>

                <h2 className="text-xl font-bold text-zinc-900 mb-4">Points forts</h2>
                <div className="grid md:grid-cols-2 gap-3 mb-10">
                    {brand.strengths.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-amber-800">{s}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8 text-center">
                    <Sun className="h-8 w-8 mx-auto mb-4 text-amber-200" />
                    <h2 className="text-2xl font-bold mb-3">Installateur {brand.name} près de chez vous</h2>
                    <p className="text-amber-100 mb-6">Comparez les devis d&apos;installateurs certifiés proposant des panneaux {brand.name}.</p>
                    <Link href="/devis">
                        <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-8 py-5 rounded-xl shadow-lg">
                            Demander mes devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Other brands */}
                <div className="mt-10 pt-8 border-t border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4">Autres marques</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {brands.filter(b => b.slug !== brand.slug).map(b => (
                            <Link key={b.slug} href={`/marques/${b.slug}`} className="text-sm text-zinc-600 hover:text-amber-600 font-medium flex items-center gap-2 p-3 bg-zinc-50 rounded-lg hover:bg-amber-50 transition-colors border border-zinc-200 hover:border-amber-300">
                                <span className="font-black text-amber-600">{b.letter}</span>
                                {b.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
