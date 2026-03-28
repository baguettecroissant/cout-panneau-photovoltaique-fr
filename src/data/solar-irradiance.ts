/**
 * Données d'ensoleillement par département français.
 * Source : données PVGIS (Photovoltaic Geographical Information System) — Commission européenne.
 * Valeurs en kWh/kWc/an pour une installation optimale (inclinaison 30°, orientation sud).
 */

export interface DepartmentSolarData {
  code: string;
  name: string;
  /** Production annuelle en kWh par kWc installé (orientation sud, inclinaison 30°) */
  kWhPerKWc: number;
  /** Zone climatique H1, H2 ou H3 */
  zone: "H1" | "H2" | "H3";
}

// Facteurs de correction selon l'orientation
export const ORIENTATION_FACTORS: Record<string, { label: string; factor: number; description: string }> = {
  sud: { label: "Sud", factor: 1.0, description: "Orientation optimale — 100% du rendement" },
  "sud-est": { label: "Sud-Est", factor: 0.95, description: "Très bon rendement — 95% de l'optimal" },
  "sud-ouest": { label: "Sud-Ouest", factor: 0.95, description: "Très bon rendement — 95% de l'optimal" },
  est: { label: "Est", factor: 0.80, description: "Bon rendement — 80% de l'optimal" },
  ouest: { label: "Ouest", factor: 0.80, description: "Bon rendement — 80% de l'optimal" },
  "nord-est": { label: "Nord-Est", factor: 0.55, description: "Rendement réduit — 55% de l'optimal" },
  "nord-ouest": { label: "Nord-Ouest", factor: 0.55, description: "Rendement réduit — 55% de l'optimal" },
  nord: { label: "Nord", factor: 0.45, description: "Rendement faible — Déconseillé" },
};

// Facteurs de correction selon l'inclinaison du toit
export const INCLINATION_FACTORS: Record<string, { label: string; factor: number }> = {
  "0": { label: "Toit plat (0°)", factor: 0.90 },
  "15": { label: "Faible pente (15°)", factor: 0.96 },
  "30": { label: "Pente idéale (30°)", factor: 1.00 },
  "45": { label: "Pente standard (45°)", factor: 0.96 },
  "60": { label: "Forte pente (60°)", factor: 0.85 },
  "90": { label: "Vertical (90° - façade)", factor: 0.58 },
};

// Tarifs et constantes 2026
export const SOLAR_TARIFFS = {
  /** Prix électricité EDF tarif bleu TTC (c€/kWh) */
  electricityPrice: 0.2516,
  /** Tarif rachat surplus EDF OA (€/kWh) — ≤ 9 kWc */
  surplusBuybackRate: 0.1297,
  /** Taux d'autoconsommation moyen (sans batterie) */
  selfConsumptionRate: 0.40,
  /** Taux d'autoconsommation avec batterie */
  selfConsumptionRateWithBattery: 0.70,
  /** Prix moyen par kWc installé (€) */
  pricePerKWc: 2000,
  /** Prime autoconsommation par kWc (€) — moyenne ≤ 9 kWc */
  primeAutoconsoPerKWc: 400,
  /** Émissions CO2 évitées par kWh solaire (kg CO2) — mix FR */
  co2PerKWh: 0.052,
  /** Dégradation annuelle des panneaux (%) */
  annualDegradation: 0.005,
  /** Durée de vie des panneaux (ans) */
  panelLifespan: 30,
  /** Augmentation annuelle du prix de l'électricité (%) */
  electricityInflation: 0.04,
};

// Données d'ensoleillement par département
export const DEPARTMENTS_SOLAR: DepartmentSolarData[] = [
  // Ile-de-France
  { code: "75", name: "Paris", kWhPerKWc: 1050, zone: "H1" },
  { code: "77", name: "Seine-et-Marne", kWhPerKWc: 1060, zone: "H1" },
  { code: "78", name: "Yvelines", kWhPerKWc: 1050, zone: "H1" },
  { code: "91", name: "Essonne", kWhPerKWc: 1060, zone: "H1" },
  { code: "92", name: "Hauts-de-Seine", kWhPerKWc: 1050, zone: "H1" },
  { code: "93", name: "Seine-Saint-Denis", kWhPerKWc: 1050, zone: "H1" },
  { code: "94", name: "Val-de-Marne", kWhPerKWc: 1050, zone: "H1" },
  { code: "95", name: "Val-d'Oise", kWhPerKWc: 1040, zone: "H1" },
  // Nord & Est
  { code: "02", name: "Aisne", kWhPerKWc: 1000, zone: "H1" },
  { code: "08", name: "Ardennes", kWhPerKWc: 990, zone: "H1" },
  { code: "10", name: "Aube", kWhPerKWc: 1040, zone: "H1" },
  { code: "14", name: "Calvados", kWhPerKWc: 1020, zone: "H2" },
  { code: "22", name: "Côtes-d'Armor", kWhPerKWc: 1030, zone: "H2" },
  { code: "25", name: "Doubs", kWhPerKWc: 1030, zone: "H1" },
  { code: "27", name: "Eure", kWhPerKWc: 1030, zone: "H1" },
  { code: "29", name: "Finistère", kWhPerKWc: 1050, zone: "H2" },
  { code: "35", name: "Ille-et-Vilaine", kWhPerKWc: 1050, zone: "H2" },
  { code: "44", name: "Loire-Atlantique", kWhPerKWc: 1120, zone: "H2" },
  { code: "50", name: "Manche", kWhPerKWc: 1020, zone: "H2" },
  { code: "51", name: "Marne", kWhPerKWc: 1020, zone: "H1" },
  { code: "52", name: "Haute-Marne", kWhPerKWc: 1030, zone: "H1" },
  { code: "54", name: "Meurthe-et-Moselle", kWhPerKWc: 1010, zone: "H1" },
  { code: "55", name: "Meuse", kWhPerKWc: 1010, zone: "H1" },
  { code: "56", name: "Morbihan", kWhPerKWc: 1080, zone: "H2" },
  { code: "57", name: "Moselle", kWhPerKWc: 1000, zone: "H1" },
  { code: "59", name: "Nord", kWhPerKWc: 970, zone: "H1" },
  { code: "60", name: "Oise", kWhPerKWc: 1020, zone: "H1" },
  { code: "61", name: "Orne", kWhPerKWc: 1020, zone: "H2" },
  { code: "62", name: "Pas-de-Calais", kWhPerKWc: 960, zone: "H1" },
  { code: "67", name: "Bas-Rhin", kWhPerKWc: 1050, zone: "H1" },
  { code: "68", name: "Haut-Rhin", kWhPerKWc: 1070, zone: "H1" },
  { code: "70", name: "Haute-Saône", kWhPerKWc: 1040, zone: "H1" },
  { code: "71", name: "Saône-et-Loire", kWhPerKWc: 1100, zone: "H1" },
  { code: "76", name: "Seine-Maritime", kWhPerKWc: 1000, zone: "H1" },
  { code: "80", name: "Somme", kWhPerKWc: 990, zone: "H1" },
  { code: "88", name: "Vosges", kWhPerKWc: 1020, zone: "H1" },
  { code: "89", name: "Yonne", kWhPerKWc: 1060, zone: "H1" },
  { code: "90", name: "Territoire de Belfort", kWhPerKWc: 1040, zone: "H1" },
  // Centre & Ouest
  { code: "01", name: "Ain", kWhPerKWc: 1100, zone: "H1" },
  { code: "03", name: "Allier", kWhPerKWc: 1120, zone: "H1" },
  { code: "15", name: "Cantal", kWhPerKWc: 1150, zone: "H1" },
  { code: "16", name: "Charente", kWhPerKWc: 1180, zone: "H2" },
  { code: "17", name: "Charente-Maritime", kWhPerKWc: 1220, zone: "H2" },
  { code: "18", name: "Cher", kWhPerKWc: 1100, zone: "H2" },
  { code: "19", name: "Corrèze", kWhPerKWc: 1130, zone: "H1" },
  { code: "21", name: "Côte-d'Or", kWhPerKWc: 1080, zone: "H1" },
  { code: "23", name: "Creuse", kWhPerKWc: 1100, zone: "H1" },
  { code: "24", name: "Dordogne", kWhPerKWc: 1180, zone: "H2" },
  { code: "28", name: "Eure-et-Loir", kWhPerKWc: 1060, zone: "H1" },
  { code: "36", name: "Indre", kWhPerKWc: 1120, zone: "H2" },
  { code: "37", name: "Indre-et-Loire", kWhPerKWc: 1110, zone: "H2" },
  { code: "38", name: "Isère", kWhPerKWc: 1150, zone: "H1" },
  { code: "39", name: "Jura", kWhPerKWc: 1070, zone: "H1" },
  { code: "41", name: "Loir-et-Cher", kWhPerKWc: 1100, zone: "H2" },
  { code: "42", name: "Loire", kWhPerKWc: 1140, zone: "H1" },
  { code: "43", name: "Haute-Loire", kWhPerKWc: 1180, zone: "H1" },
  { code: "45", name: "Loiret", kWhPerKWc: 1080, zone: "H1" },
  { code: "49", name: "Maine-et-Loire", kWhPerKWc: 1110, zone: "H2" },
  { code: "53", name: "Mayenne", kWhPerKWc: 1080, zone: "H2" },
  { code: "58", name: "Nièvre", kWhPerKWc: 1080, zone: "H1" },
  { code: "63", name: "Puy-de-Dôme", kWhPerKWc: 1150, zone: "H1" },
  { code: "69", name: "Rhône", kWhPerKWc: 1160, zone: "H1" },
  { code: "72", name: "Sarthe", kWhPerKWc: 1080, zone: "H2" },
  { code: "73", name: "Savoie", kWhPerKWc: 1200, zone: "H1" },
  { code: "74", name: "Haute-Savoie", kWhPerKWc: 1150, zone: "H1" },
  { code: "79", name: "Deux-Sèvres", kWhPerKWc: 1160, zone: "H2" },
  { code: "85", name: "Vendée", kWhPerKWc: 1180, zone: "H2" },
  { code: "86", name: "Vienne", kWhPerKWc: 1150, zone: "H2" },
  { code: "87", name: "Haute-Vienne", kWhPerKWc: 1120, zone: "H1" },
  // Sud-Ouest
  { code: "09", name: "Ariège", kWhPerKWc: 1250, zone: "H2" },
  { code: "12", name: "Aveyron", kWhPerKWc: 1220, zone: "H2" },
  { code: "31", name: "Haute-Garonne", kWhPerKWc: 1260, zone: "H2" },
  { code: "32", name: "Gers", kWhPerKWc: 1240, zone: "H2" },
  { code: "33", name: "Gironde", kWhPerKWc: 1220, zone: "H2" },
  { code: "40", name: "Landes", kWhPerKWc: 1230, zone: "H2" },
  { code: "46", name: "Lot", kWhPerKWc: 1220, zone: "H2" },
  { code: "47", name: "Lot-et-Garonne", kWhPerKWc: 1230, zone: "H2" },
  { code: "64", name: "Pyrénées-Atlantiques", kWhPerKWc: 1200, zone: "H2" },
  { code: "65", name: "Hautes-Pyrénées", kWhPerKWc: 1220, zone: "H2" },
  { code: "81", name: "Tarn", kWhPerKWc: 1260, zone: "H2" },
  { code: "82", name: "Tarn-et-Garonne", kWhPerKWc: 1260, zone: "H2" },
  // Méditerranée & Sud-Est
  { code: "04", name: "Alpes-de-Haute-Provence", kWhPerKWc: 1400, zone: "H2" },
  { code: "05", name: "Hautes-Alpes", kWhPerKWc: 1420, zone: "H1" },
  { code: "06", name: "Alpes-Maritimes", kWhPerKWc: 1380, zone: "H3" },
  { code: "07", name: "Ardèche", kWhPerKWc: 1280, zone: "H2" },
  { code: "11", name: "Aude", kWhPerKWc: 1350, zone: "H3" },
  { code: "13", name: "Bouches-du-Rhône", kWhPerKWc: 1430, zone: "H3" },
  { code: "20", name: "Corse", kWhPerKWc: 1450, zone: "H3" },
  { code: "26", name: "Drôme", kWhPerKWc: 1300, zone: "H2" },
  { code: "30", name: "Gard", kWhPerKWc: 1380, zone: "H3" },
  { code: "34", name: "Hérault", kWhPerKWc: 1400, zone: "H3" },
  { code: "48", name: "Lozère", kWhPerKWc: 1250, zone: "H2" },
  { code: "66", name: "Pyrénées-Orientales", kWhPerKWc: 1420, zone: "H3" },
  { code: "83", name: "Var", kWhPerKWc: 1430, zone: "H3" },
  { code: "84", name: "Vaucluse", kWhPerKWc: 1380, zone: "H3" },
  // Outre-mer
  { code: "971", name: "Guadeloupe", kWhPerKWc: 1550, zone: "H3" },
  { code: "972", name: "Martinique", kWhPerKWc: 1500, zone: "H3" },
  { code: "973", name: "Guyane", kWhPerKWc: 1400, zone: "H3" },
  { code: "974", name: "La Réunion", kWhPerKWc: 1500, zone: "H3" },
];

/**
 * Lookup rapide département par code
 */
export function getDepartmentByCode(code: string): DepartmentSolarData | undefined {
  return DEPARTMENTS_SOLAR.find(d => d.code === code);
}

/**
 * Recherche département par nom (partiel, insensible à la casse)
 */
export function searchDepartments(query: string): DepartmentSolarData[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return DEPARTMENTS_SOLAR.filter(
    d => d.name.toLowerCase().includes(q) || d.code.startsWith(q)
  ).slice(0, 10);
}
