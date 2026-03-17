import { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { GUIDE_CATEGORIES } from "@/types/guide";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, BookOpen, Sun } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = guides.find(g => g.slug === slug);
    if (!guide) return {};
    return {
        title: guide.metaTitle,
        description: guide.metaDescription,
        alternates: { canonical: `https://www.cout-panneau-photovoltaique.fr/guides/${guide.slug}` },
        openGraph: {
            title: guide.metaTitle,
            description: guide.metaDescription,
            url: `https://www.cout-panneau-photovoltaique.fr/guides/${guide.slug}`,
            type: 'article',
        },
    };
}

export function generateStaticParams() {
    return guides.map(g => ({ slug: g.slug }));
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const guide = guides.find(g => g.slug === slug);
    if (!guide) notFound();

    const cat = GUIDE_CATEGORIES[guide.category];
    const guideIndex = guides.findIndex(g => g.slug === slug);
    const prevGuide = guideIndex > 0 ? guides[guideIndex - 1] : null;
    const nextGuide = guideIndex < guides.length - 1 ? guides[guideIndex + 1] : null;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.cout-panneau-photovoltaique.fr" },
            { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://www.cout-panneau-photovoltaique.fr/guides" },
            { "@type": "ListItem", "position": 3, "name": guide.title, "item": `https://www.cout-panneau-photovoltaique.fr/guides/${guide.slug}` },
        ],
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "description": guide.metaDescription,
        "dateModified": guide.updatedAt,
        "author": { "@type": "Organization", "name": "Cout-Panneau-Photovoltaique.fr" },
        "publisher": { "@type": "Organization", "name": "Cout-Panneau-Photovoltaique.fr" },
    };

    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <article className="container mx-auto px-4 py-12 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
                    <Link href="/" className="hover:text-amber-600">Accueil</Link> /
                    <Link href="/guides" className="hover:text-amber-600">Guides</Link> /
                    <span className="text-zinc-800 font-semibold truncate">{guide.title}</span>
                </nav>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="text-xs text-amber-600 font-semibold uppercase bg-amber-50 px-3 py-1 rounded-full">{cat.label}</span>
                    <span className="text-xs text-zinc-400 ml-auto">{guide.readTime} · Mis à jour le {new Date(guide.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 leading-tight">{guide.title}</h1>
                <p className="text-lg text-zinc-500 mb-10 font-serif">{guide.excerpt}</p>

                <div
                    className="prose prose-lg prose-zinc max-w-none font-serif prose-headings:font-sans prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                />

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8 text-center">
                    <Sun className="h-8 w-8 mx-auto mb-4 text-amber-200" />
                    <h2 className="text-2xl font-bold mb-3">Comparez les devis solaires</h2>
                    <p className="text-amber-100 mb-6">Recevez 3 devis gratuits d&apos;installateurs certifiés QualiPV.</p>
                    <Link href="/devis">
                        <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-8 py-5 rounded-xl shadow-lg">
                            Simuler ma production <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex gap-4">
                    {prevGuide && (
                        <Link href={`/guides/${prevGuide.slug}`} className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 hover:border-amber-400 transition-all group">
                            <span className="text-xs text-zinc-400 flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Précédent</span>
                            <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors block mt-1 line-clamp-2">{prevGuide.title}</span>
                        </Link>
                    )}
                    {nextGuide && (
                        <Link href={`/guides/${nextGuide.slug}`} className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl p-4 hover:border-amber-400 transition-all group text-right">
                            <span className="text-xs text-zinc-400 flex items-center gap-1 justify-end">Suivant <ArrowRight className="h-3 w-3" /></span>
                            <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors block mt-1 line-clamp-2">{nextGuide.title}</span>
                        </Link>
                    )}
                </div>

                {/* Other guides */}
                <div className="mt-10 pt-8 border-t border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-amber-500" />
                        Autres guides solaires
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {guides.filter(g => g.slug !== guide.slug).slice(0, 4).map(g => (
                            <Link key={g.slug} href={`/guides/${g.slug}`} className="text-sm text-zinc-600 hover:text-amber-600 font-medium flex items-center gap-2 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                                <ArrowRight className="h-3 w-3 text-amber-400" />
                                {g.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
