import { City } from "@/types";
import { Sun } from "lucide-react";

export function CityHero({ city }: { city: City }) {
    return (
        <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 py-12 md:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="flex items-center gap-2 text-amber-100 text-sm font-medium mb-4">
                    <Sun className="h-4 w-4" />
                    <span>Installateurs certifiés QualiPV — {city.department_name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                    Panneaux solaires à <span className="text-yellow-200">{city.name}</span> — Rentabilité et installateurs {city.department_code}
                </h1>
                <p className="text-lg text-amber-100 max-w-3xl font-serif">
                    Comparez les devis d&apos;installateurs solaires certifiés à {city.name} ({city.zip}). Autoconsommation, revente EDF OA : simulez votre rentabilité.
                </p>
            </div>
        </section>
    );
}
