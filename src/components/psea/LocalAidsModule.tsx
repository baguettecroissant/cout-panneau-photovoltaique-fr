import { City } from "@/types";

export function LocalAidsModule({ city }: { city: City }) {
    return (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-amber-800 mb-3">🏛️ Aides solaires à {city.name}</h3>
            <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>Prime autoconsommation : 350 à 500 €/kWc</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>TVA réduite 10% (≤ 3 kWc)</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>Rachat EDF OA : 0,1297 €/kWh — 20 ans</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>Exonération impôts (≤ 3 kWc)</span>
                </li>
                {city.department_info?.aide_locale && (
                    <li className="flex items-start gap-2 mt-2 pt-2 border-t border-amber-200">
                        <span className="font-bold text-green-600">💡</span>
                        <span className="text-green-800">{city.department_info.aide_locale}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}
