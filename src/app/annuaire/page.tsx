import { Metadata } from "next";
import { getAllDepartments } from "@/lib/cities";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Annuaire Panneaux Solaires par Département — France | Cout-Panneau-Photovoltaique.fr",
    description: "Trouvez un installateur de panneaux solaires certifié QualiPV dans votre département. Annuaire complet par région et département.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/annuaire' },
};

export default function AnnuairePage() {
    const departments = getAllDepartments();
    const regions = [...new Set(departments.map(d => d.region))].sort();

    return (
        <div className="min-h-screen bg-zinc-50">
            <section className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Annuaire solaire par département</h1>
                <p className="text-lg text-zinc-500 mb-10 font-serif">Retrouvez les installateurs et prix solaires pour chaque département de France.</p>

                <div className="space-y-10">
                    {regions.map(region => {
                        const regionDepts = departments.filter(d => d.region === region).sort((a, b) => a.code.localeCompare(b.code));
                        return (
                            <div key={region}>
                                <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-amber-500" />
                                    {region}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {regionDepts.map(dept => (
                                        <Link
                                            key={dept.code}
                                            href={`/annuaire/${dept.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${dept.code}`}
                                            className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-sm transition-all group"
                                        >
                                            <span className="text-xs text-amber-600 font-mono font-bold">{dept.code}</span>
                                            <p className="text-sm font-semibold text-zinc-700 group-hover:text-amber-600 transition-colors">{dept.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
