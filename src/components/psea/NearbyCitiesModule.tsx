import Link from "next/link";
import { City } from "@/types";
import { getNearbyCities } from "@/lib/cities";
import { MapPin } from "lucide-react";

export function NearbyCitiesModule({ city }: { city: City }) {
    const nearby = getNearbyCities(city, 8);
    if (nearby.length === 0) return null;

    return (
        <section className="bg-white py-10 border-t border-zinc-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">
                    Panneaux solaires à proximité de {city.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {nearby.map(c => (
                        <Link
                            key={c.slug}
                            href={`/panneau-solaire/${c.slug}`}
                            className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all group text-sm"
                        >
                            <MapPin className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            <div className="min-w-0">
                                <span className="text-zinc-700 group-hover:text-amber-600 font-medium block truncate">{c.name}</span>
                                <span className="text-xs text-zinc-400">{c.zip}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
