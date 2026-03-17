import Link from "next/link";
import { City } from "@/types";
import { ChevronRight } from "lucide-react";

export function DepartmentBreadcrumb({ city }: { city: City }) {
    return (
        <nav className="flex items-center gap-1 py-3 text-sm text-zinc-500 overflow-x-auto">
            <Link href="/" className="hover:text-amber-600 whitespace-nowrap">Accueil</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link href="/annuaire" className="hover:text-amber-600 whitespace-nowrap">Annuaire</Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link
                href={`/annuaire/${city.department_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${city.department_code}`}
                className="hover:text-amber-600 whitespace-nowrap"
            >
                {city.department_name}
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <span className="text-zinc-800 font-semibold truncate">Solaire à {city.name}</span>
        </nav>
    );
}
