export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDepartments, getCitiesByDepartment } from "@/lib/cities";
import Link from "next/link";
import { MapPin, ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const deptCode = slug.split('-').pop()!;
    const dept = getAllDepartments().find(d => d.code === deptCode);
    if (!dept) return {};
    return {
        title: `Panneaux Solaires ${dept.name} (${dept.code}) — Installateurs QualiPV | Cout-Panneau-Photovoltaique.fr`,
        description: `Trouvez un installateur de panneaux solaires certifié QualiPV dans le ${dept.name} (${dept.code}). Comparez les devis et prix locaux.`,
        alternates: { canonical: `https://www.cout-panneau-photovoltaique.fr/annuaire/${slug}` },
    };
}

export function generateStaticParams() {
    return getAllDepartments().map(d => ({
        slug: `${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`,
    }));
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    const deptCode = slug.split('-').pop()!;
    const dept = getAllDepartments().find(d => d.code === deptCode);
    if (!dept) notFound();

    const cities = getCitiesByDepartment(deptCode)
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, 40);

    return (
        <div className="min-h-screen bg-zinc-50">
            <section className="container mx-auto px-4 py-12 max-w-5xl">
                <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
                    <Link href="/" className="hover:text-amber-600">Accueil</Link> /
                    <Link href="/annuaire" className="hover:text-amber-600">Annuaire</Link> /
                    <span className="text-zinc-800 font-semibold">{dept.name} ({dept.code})</span>
                </nav>

                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Panneaux solaires dans le {dept.name}</h1>
                <p className="text-lg text-zinc-500 mb-3 font-serif">
                    Comparez les devis d&apos;installateurs solaires certifiés QualiPV dans le {dept.name} ({dept.code}), région {dept.region}.
                </p>
                {dept.aide_locale && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
                        💡 <strong>Aide locale :</strong> {dept.aide_locale}
                    </div>
                )}

                <h2 className="text-xl font-bold text-zinc-900 mb-4">Principales villes — {dept.name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
                    {cities.map(city => (
                        <Link
                            key={city.slug}
                            href={`/panneau-solaire/${city.slug}`}
                            className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-sm transition-all group"
                        >
                            <MapPin className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            <div className="min-w-0">
                                <span className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors block truncate">{city.name}</span>
                                <span className="text-xs text-zinc-400">{city.zip}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-8 text-center">
                    <Sun className="h-8 w-8 mx-auto mb-4 text-amber-200" />
                    <h2 className="text-2xl font-bold mb-3">Devis solaire {dept.name}</h2>
                    <p className="text-amber-100 mb-6">Recevez 3 devis gratuits d&apos;installateurs certifiés QualiPV dans le {dept.name}.</p>
                    <Link href="/devis">
                        <Button className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-8 py-5 rounded-xl shadow-lg">
                            Comparer les devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
