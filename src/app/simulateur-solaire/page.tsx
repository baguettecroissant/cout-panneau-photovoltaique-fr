"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Sun, ArrowRight, ArrowLeft, CheckCircle, Zap, TrendingUp,
  Leaf, Euro, MapPin, Compass, TriangleIcon, BatteryCharging,
  Info, Calculator, Download, RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEPARTMENTS_SOLAR, ORIENTATION_FACTORS, INCLINATION_FACTORS,
  SOLAR_TARIFFS, searchDepartments,
  type DepartmentSolarData,
} from "@/data/solar-irradiance";

/* ─────────────────────────────── types ─────────────────────────────── */

type Orientation = keyof typeof ORIENTATION_FACTORS;
type Inclination = keyof typeof INCLINATION_FACTORS;

interface SimulationResult {
  productionYear1: number;
  selfConsumedKWh: number;
  surplusKWh: number;
  savingsYear1: number;
  surplusRevenueYear1: number;
  totalRevenueYear1: number;
  installationCost: number;
  primeAutoconso: number;
  netCost: number;
  roiYears: number;
  savings25Years: number;
  co2Saved25Years: number;
  treesEquivalent: number;
  monthlyProduction: number[];
}

/* ──────────────────────── monthly distribution ──────────────────────── */

// Répartition mensuelle typique de la production solaire en France (%)
const MONTHLY_DISTRIBUTION = [
  0.045, 0.055, 0.08, 0.095, 0.115, 0.125,
  0.13, 0.12, 0.095, 0.07, 0.045, 0.025,
];

/* ──────────────────────── calculation engine ──────────────────────── */

function calculateSolarProduction(
  department: DepartmentSolarData,
  orientation: Orientation,
  inclination: Inclination,
  powerKWc: number,
  withBattery: boolean,
): SimulationResult {
  const t = SOLAR_TARIFFS;

  // Base production
  const orientationFactor = ORIENTATION_FACTORS[orientation].factor;
  const inclinationFactor = INCLINATION_FACTORS[inclination].factor;
  const productionYear1 = Math.round(
    department.kWhPerKWc * powerKWc * orientationFactor * inclinationFactor
  );

  // Self-consumption
  const selfConsRate = withBattery ? t.selfConsumptionRateWithBattery : t.selfConsumptionRate;
  const selfConsumedKWh = Math.round(productionYear1 * selfConsRate);
  const surplusKWh = productionYear1 - selfConsumedKWh;

  // Year 1 revenues
  const savingsYear1 = Math.round(selfConsumedKWh * t.electricityPrice);
  const surplusRevenueYear1 = Math.round(surplusKWh * t.surplusBuybackRate);
  const totalRevenueYear1 = savingsYear1 + surplusRevenueYear1;

  // Costs
  const installationCost = Math.round(powerKWc * t.pricePerKWc);
  const primeAutoconso = Math.round(powerKWc * t.primeAutoconsoPerKWc);
  const netCost = installationCost - primeAutoconso;

  // 25-year simulation with degradation & electricity inflation
  let cumSavings = 0;
  let cumCO2 = 0;
  let roiYears = t.panelLifespan;
  let roiFound = false;

  for (let y = 1; y <= 25; y++) {
    const degradation = Math.pow(1 - t.annualDegradation, y - 1);
    const prodThisYear = productionYear1 * degradation;
    const elecPrice = t.electricityPrice * Math.pow(1 + t.electricityInflation, y - 1);

    const selfCons = prodThisYear * selfConsRate;
    const surplus = prodThisYear - selfCons;

    cumSavings += selfCons * elecPrice + surplus * t.surplusBuybackRate;
    cumCO2 += prodThisYear * t.co2PerKWh;

    if (!roiFound && cumSavings >= netCost) {
      roiYears = y;
      roiFound = true;
    }
  }

  // Monthly production year 1
  const monthlyProduction = MONTHLY_DISTRIBUTION.map(pct =>
    Math.round(productionYear1 * pct)
  );

  return {
    productionYear1,
    selfConsumedKWh,
    surplusKWh,
    savingsYear1,
    surplusRevenueYear1,
    totalRevenueYear1,
    installationCost,
    primeAutoconso,
    netCost,
    roiYears,
    savings25Years: Math.round(cumSavings),
    co2Saved25Years: Math.round(cumCO2),
    treesEquivalent: Math.round(cumCO2 / 25), // ~25 kg CO2/arbre/an
    monthlyProduction,
  };
}

/* ──────────────────────── format helpers ──────────────────────── */

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
function fmtEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

/* ──────────────────────── progress bar ──────────────────────── */

function StepProgress({ step, total }: { step: number; total: number }) {
  const labels = ["Localisation", "Toiture", "Puissance", "Options"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300
            ${i + 1 <= step ? "bg-amber-500 text-white shadow-md" : "bg-zinc-200 text-zinc-400"}`}>
            {i + 1 <= step ? <CheckCircle className="h-5 w-5" /> : i + 1}
          </div>
          <span className={`hidden sm:inline text-sm font-medium transition-colors ${i + 1 <= step ? "text-amber-700" : "text-zinc-400"}`}>
            {label}
          </span>
          {i < labels.length - 1 && (
            <div className="flex-1 h-1 rounded bg-zinc-200 mx-1">
              <div className={`h-full rounded transition-all duration-500 ${i + 1 < step ? "bg-amber-500 w-full" : "bg-transparent w-0"}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────── bar chart ──────────────────────── */

function MonthlyChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5 h-40 px-2">
      {data.map((val, i) => {
        const height = max > 0 ? (val / max) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center flex-1 gap-1">
            <span className="text-[10px] font-mono text-zinc-500 tabular-nums">{val}</span>
            <div className="w-full relative rounded-t-sm overflow-hidden" style={{ height: `${height}%`, minHeight: "4px" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-yellow-400 opacity-90" />
            </div>
            <span className="text-[10px] font-medium text-zinc-500">{MONTH_LABELS[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────── main page ──────────────────────── */

export default function SimulateurSolaire() {
  const [step, setStep] = useState(1);

  // Step 1 — Location
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<DepartmentSolarData | null>(null);

  // Step 2 — Roof
  const [orientation, setOrientation] = useState<Orientation>("sud");
  const [inclination, setInclination] = useState<Inclination>("30");

  // Step 3 — Power
  const [powerKWc, setPowerKWc] = useState(6);

  // Step 4 — Options
  const [withBattery, setWithBattery] = useState(false);

  // Results
  const [showResult, setShowResult] = useState(false);

  const searchResults = useMemo(() => searchDepartments(searchQuery), [searchQuery]);

  const result = useMemo(() => {
    if (!selectedDept) return null;
    return calculateSolarProduction(selectedDept, orientation, inclination, powerKWc, withBattery);
  }, [selectedDept, orientation, inclination, powerKWc, withBattery]);

  const handleSubmit = useCallback(() => {
    if (selectedDept) setShowResult(true);
  }, [selectedDept]);

  const resetAll = useCallback(() => {
    setStep(1);
    setSearchQuery("");
    setSelectedDept(null);
    setOrientation("sud");
    setInclination("30");
    setPowerKWc(6);
    setWithBattery(false);
    setShowResult(false);
  }, []);

  // ─── compass visual ───
  const compassDirections: { key: Orientation; angle: number; abbr: string }[] = [
    { key: "nord", angle: 0, abbr: "N" }, { key: "nord-est", angle: 45, abbr: "NE" },
    { key: "est", angle: 90, abbr: "E" }, { key: "sud-est", angle: 135, abbr: "SE" },
    { key: "sud", angle: 180, abbr: "S" }, { key: "sud-ouest", angle: 225, abbr: "SO" },
    { key: "ouest", angle: 270, abbr: "O" }, { key: "nord-ouest", angle: 315, abbr: "NO" },
  ];

  /* ════════════════════════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-300 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            Outil Gratuit — Données PVGIS 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Simulateur de <span className="text-yellow-200">Rendement Solaire</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
            Estimez la production de vos panneaux solaires, vos économies annuelles et votre retour sur investissement en 2 minutes.
          </p>
        </div>
      </section>

      {/* ── Wizard ── */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          {!showResult ? (
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
              <div className="p-6 md:p-10">
                <StepProgress step={step} total={4} />

                {/* ── STEP 1: Location ── */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900">Où sont vos panneaux ?</h2>
                        <p className="text-zinc-500 text-sm">L'ensoleillement varie du simple au double en France</p>
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                      <input
                        type="text"
                        placeholder="Tapez un département (ex: Rhône, 69, Var...)"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setSelectedDept(null); }}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border-2 border-zinc-200 rounded-2xl text-lg focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                        autoFocus
                      />
                    </div>

                    {/* Search results */}
                    {searchQuery && !selectedDept && (
                      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden mb-6 max-h-64 overflow-y-auto">
                        {searchResults.length > 0 ? searchResults.map((dept) => (
                          <button
                            key={dept.code}
                            onClick={() => { setSelectedDept(dept); setSearchQuery(`${dept.name} (${dept.code})`); }}
                            className="w-full flex items-center justify-between p-4 hover:bg-amber-50 transition-colors border-b border-zinc-100 last:border-b-0 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-sm font-bold text-amber-700">{dept.code}</span>
                              <span className="font-medium text-zinc-900">{dept.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4 text-amber-500" />
                              <span className="text-sm font-mono font-semibold text-amber-600">{fmt(dept.kWhPerKWc)} kWh/kWc</span>
                            </div>
                          </button>
                        )) : (
                          <p className="p-4 text-zinc-500 text-center">Aucun département trouvé</p>
                        )}
                      </div>
                    )}

                    {/* Selected department card */}
                    {selectedDept && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
                              <Sun className="h-6 w-6 text-amber-700" />
                            </div>
                            <div>
                              <p className="font-bold text-zinc-900 text-lg">{selectedDept.name} ({selectedDept.code})</p>
                              <p className="text-sm text-zinc-500">Zone climatique {selectedDept.zone}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-amber-600 font-mono">{fmt(selectedDept.kWhPerKWc)}</p>
                            <p className="text-xs text-zinc-500">kWh/kWc/an</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedDept}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white h-14 text-lg rounded-2xl disabled:opacity-40 shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 2: Roof ── */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-amber-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    {/* Orientation */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Compass className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900">Orientation de votre toiture</h2>
                        <p className="text-zinc-500 text-sm">Le sud offre le meilleur rendement</p>
                      </div>
                    </div>

                    {/* Visual compass */}
                    <div className="relative w-56 h-56 mx-auto mb-6">
                      <div className="absolute inset-0 border-2 border-zinc-200 rounded-full" />
                      <div className="absolute inset-3 border border-zinc-100 rounded-full" />
                      {compassDirections.map(({ key, angle, abbr }) => {
                        const isSelected = orientation === key;
                        const factor = ORIENTATION_FACTORS[key].factor;
                        const rad = ((angle - 90) * Math.PI) / 180;
                        const r = 85;
                        const x = 50 + (r / 112) * 50 * Math.cos(rad);
                        const y = 50 + (r / 112) * 50 * Math.sin(rad);
                        return (
                          <button
                            key={key}
                            onClick={() => setOrientation(key)}
                            className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full text-xs font-bold transition-all duration-200
                              ${isSelected
                                ? "bg-amber-500 text-white shadow-lg scale-125 ring-4 ring-amber-200"
                                : factor >= 0.8
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : factor >= 0.55
                                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                    : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                            style={{ left: `${x}%`, top: `${y}%` }}
                            title={ORIENTATION_FACTORS[key].label}
                          >
                            {abbr}
                          </button>
                        );
                      })}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-amber-600">{Math.round(ORIENTATION_FACTORS[orientation].factor * 100)}%</span>
                      </div>
                    </div>
                    <p className="text-center text-sm text-zinc-500 mb-8">{ORIENTATION_FACTORS[orientation].description}</p>

                    {/* Inclination */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <TriangleIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900">Inclinaison du toit</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {Object.entries(INCLINATION_FACTORS).map(([key, { label, factor }]) => (
                        <button
                          key={key}
                          onClick={() => setInclination(key as Inclination)}
                          className={`p-3 border-2 rounded-xl text-center transition-all
                            ${inclination === key
                              ? "border-amber-400 bg-amber-50 shadow-sm"
                              : "border-zinc-200 hover:border-amber-300"}`}
                        >
                          <span className="block text-sm font-bold text-zinc-900">{label}</span>
                          <span className={`block text-xs mt-1 font-mono ${factor >= 0.95 ? "text-green-600" : factor >= 0.85 ? "text-amber-600" : "text-red-500"}`}>
                            {Math.round(factor * 100)}%
                          </span>
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => setStep(3)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white h-14 text-lg rounded-2xl shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 3: Power ── */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-amber-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                        <Zap className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900">Puissance de l&apos;installation</h2>
                        <p className="text-zinc-500 text-sm">Adaptez à votre consommation électrique</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        type="range"
                        min={1}
                        max={12}
                        step={0.5}
                        value={powerKWc}
                        onChange={(e) => setPowerKWc(Number(e.target.value))}
                        className="w-full h-3 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <div className="flex justify-between text-xs text-zinc-400 mt-1 px-1">
                        <span>1 kWc</span>
                        <span>6 kWc</span>
                        <span>12 kWc</span>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <span className="text-5xl font-black text-amber-600 font-mono">{powerKWc}</span>
                      <span className="text-2xl text-zinc-400 ml-2">kWc</span>
                      <p className="text-sm text-zinc-400 mt-2">≈ {Math.round(powerKWc / 0.4)} panneaux de 400 Wc</p>
                    </div>

                    {/* Quick presets */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {[
                        { kWc: 3, label: "3 kWc", desc: "Couple / petit logement", panels: "8 panneaux" },
                        { kWc: 6, label: "6 kWc", desc: "Famille 4 personnes", panels: "15 panneaux" },
                        { kWc: 9, label: "9 kWc", desc: "Grande maison / VE", panels: "22 panneaux" },
                      ].map(p => (
                        <button
                          key={p.kWc}
                          onClick={() => setPowerKWc(p.kWc)}
                          className={`p-4 border-2 rounded-xl text-center transition-all
                            ${powerKWc === p.kWc
                              ? "border-amber-400 bg-amber-50 shadow-sm"
                              : "border-zinc-200 hover:border-amber-300"}`}
                        >
                          <span className="block text-lg font-black text-zinc-900">{p.label}</span>
                          <span className="block text-xs text-zinc-500 mt-1">{p.desc}</span>
                          <span className="block text-xs text-amber-600 font-semibold mt-1">{p.panels}</span>
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => setStep(4)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white h-14 text-lg rounded-2xl shadow-md font-bold"
                    >
                      Continuer <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* ── STEP 4: Options ── */}
                {step === 4 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-amber-600 mb-4 font-medium">
                      <ArrowLeft className="h-4 w-4" /> Retour
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                        <BatteryCharging className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900">Options de stockage</h2>
                        <p className="text-zinc-500 text-sm">Une batterie augmente votre taux d&apos;autoconsommation</p>
                      </div>
                    </div>

                    <div className="grid gap-4 mb-8">
                      <button
                        onClick={() => setWithBattery(false)}
                        className={`p-5 border-2 rounded-2xl text-left transition-all flex items-start gap-4
                          ${!withBattery ? "border-amber-400 bg-amber-50 shadow-sm" : "border-zinc-200 hover:border-amber-300"}`}
                      >
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                          <Sun className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-lg">Sans batterie</p>
                          <p className="text-sm text-zinc-500 mt-1">Autoconsommation ~40% • Le surplus est revendu à EDF OA à 0,1297 €/kWh</p>
                          <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Le + populaire</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setWithBattery(true)}
                        className={`p-5 border-2 rounded-2xl text-left transition-all flex items-start gap-4
                          ${withBattery ? "border-amber-400 bg-amber-50 shadow-sm" : "border-zinc-200 hover:border-amber-300"}`}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                          <BatteryCharging className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 text-lg">Avec batterie</p>
                          <p className="text-sm text-zinc-500 mt-1">Autoconsommation ~70% • Stockez le surplus produit la journée pour le soir</p>
                          <span className="inline-block mt-2 text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Stockage intelligent</span>
                        </div>
                      </button>
                    </div>

                    {/* Summary before submit */}
                    <div className="bg-zinc-50 rounded-2xl p-5 mb-6 border border-zinc-200">
                      <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <CheckCircle className="h-4 w-4 text-green-600" /> Récapitulatif
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span className="text-zinc-500">Département</span><span className="font-semibold">{selectedDept?.name} ({selectedDept?.code})</span></li>
                        <li className="flex justify-between"><span className="text-zinc-500">Ensoleillement</span><span className="font-semibold font-mono text-amber-600">{selectedDept ? fmt(selectedDept.kWhPerKWc) : "—"} kWh/kWc</span></li>
                        <li className="flex justify-between"><span className="text-zinc-500">Orientation</span><span className="font-semibold">{ORIENTATION_FACTORS[orientation].label} ({Math.round(ORIENTATION_FACTORS[orientation].factor * 100)}%)</span></li>
                        <li className="flex justify-between"><span className="text-zinc-500">Inclinaison</span><span className="font-semibold">{INCLINATION_FACTORS[inclination].label}</span></li>
                        <li className="flex justify-between"><span className="text-zinc-500">Puissance</span><span className="font-semibold font-mono">{powerKWc} kWc ({Math.round(powerKWc / 0.4)} panneaux)</span></li>
                        <li className="flex justify-between"><span className="text-zinc-500">Batterie</span><span className="font-semibold">{withBattery ? "Oui" : "Non"}</span></li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-green-700 hover:bg-green-800 text-white h-14 text-lg rounded-2xl shadow-lg font-bold"
                    >
                      <Sun className="mr-2 h-5 w-5" /> Calculer ma production solaire
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : result && (
            /* ══════════════ RESULT PAGE ══════════════ */
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Hero Result */}
              <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-300 rounded-3xl p-8 md:p-10 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                    <CheckCircle className="h-4 w-4" /> Simulation terminée
                  </div>
                  <p className="text-amber-100 text-sm mb-2">{selectedDept?.name} ({selectedDept?.code}) • {powerKWc} kWc • {ORIENTATION_FACTORS[orientation].label}</p>
                  <p className="text-5xl md:text-6xl font-black font-mono mb-2">{fmt(result.productionYear1)}</p>
                  <p className="text-xl text-amber-100">kWh produits par an</p>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Euro, color: "green", label: "Économies / an", value: fmtEuro(result.totalRevenueYear1), sub: `${fmtEuro(result.savingsYear1)} autoconso + ${fmtEuro(result.surplusRevenueYear1)} surplus` },
                  { icon: TrendingUp, color: "blue", label: "Retour investissement", value: `${result.roiYears} ans`, sub: `Sur ${SOLAR_TARIFFS.panelLifespan} ans de durée de vie` },
                  { icon: Euro, color: "amber", label: "Gains sur 25 ans", value: fmtEuro(result.savings25Years), sub: `Investissement : ${fmtEuro(result.netCost)}` },
                  { icon: Leaf, color: "emerald", label: "CO₂ évité (25 ans)", value: `${fmt(result.co2Saved25Years)} kg`, sub: `≈ ${fmt(result.treesEquivalent)} arbres plantés` },
                ].map((kpi, i) => {
                  const bgMap: Record<string, string> = { green: "bg-green-50 border-green-200", blue: "bg-blue-50 border-blue-200", amber: "bg-amber-50 border-amber-200", emerald: "bg-emerald-50 border-emerald-200" };
                  const iconBgMap: Record<string, string> = { green: "bg-green-100", blue: "bg-blue-100", amber: "bg-amber-100", emerald: "bg-emerald-100" };
                  const iconColorMap: Record<string, string> = { green: "text-green-600", blue: "text-blue-600", amber: "text-amber-600", emerald: "text-emerald-600" };
                  const textMap: Record<string, string> = { green: "text-green-700", blue: "text-blue-700", amber: "text-amber-700", emerald: "text-emerald-700" };
                  return (
                    <div key={i} className={`${bgMap[kpi.color]} border rounded-2xl p-5`}>
                      <div className={`${iconBgMap[kpi.color]} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <kpi.icon className={`h-5 w-5 ${iconColorMap[kpi.color]}`} />
                      </div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">{kpi.label}</p>
                      <p className={`text-xl md:text-2xl font-black font-mono ${textMap[kpi.color]}`}>{kpi.value}</p>
                      <p className="text-[11px] text-zinc-400 mt-1">{kpi.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Monthly Chart */}
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-1">Production mensuelle estimée</h3>
                <p className="text-sm text-zinc-400 mb-6">En kWh par mois — Année 1</p>
                <MonthlyChart data={result.monthlyProduction} />
              </div>

              {/* Financial breakdown */}
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <Euro className="h-5 w-5 text-green-600" /> Détail financier
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Production annuelle", value: `${fmt(result.productionYear1)} kWh`, highlight: false },
                    { label: `Autoconsommation (${withBattery ? "70%" : "40%"})`, value: `${fmt(result.selfConsumedKWh)} kWh`, highlight: false },
                    { label: "Surplus revendu à EDF OA", value: `${fmt(result.surplusKWh)} kWh`, highlight: false },
                    { label: "divider", value: "", highlight: false },
                    { label: `Économie autoconsommation (${SOLAR_TARIFFS.electricityPrice} €/kWh)`, value: `+${fmtEuro(result.savingsYear1)}/an`, highlight: true },
                    { label: `Revente surplus (${SOLAR_TARIFFS.surplusBuybackRate} €/kWh)`, value: `+${fmtEuro(result.surplusRevenueYear1)}/an`, highlight: true },
                    { label: "Total revenus annuels", value: `+${fmtEuro(result.totalRevenueYear1)}/an`, highlight: true },
                    { label: "divider", value: "", highlight: false },
                    { label: "Coût installation estimé", value: fmtEuro(result.installationCost), highlight: false },
                    { label: "Prime à l'autoconsommation", value: `-${fmtEuro(result.primeAutoconso)}`, highlight: true },
                    { label: "Coût net après prime", value: fmtEuro(result.netCost), highlight: false },
                  ].map((row, i) => row.label === "divider" ? (
                    <div key={i} className="border-t border-zinc-100 my-2" />
                  ) : (
                    <div key={i} className="flex justify-between items-center py-1">
                      <span className="text-sm text-zinc-600">{row.label}</span>
                      <span className={`text-sm font-mono font-semibold ${row.highlight ? "text-green-600" : "text-zinc-900"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl">
                <div className="flex gap-4">
                  <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-2"><strong>Important :</strong> Ces résultats sont des estimations basées sur les données d&apos;ensoleillement PVGIS et les tarifs 2026. La production réelle dépend de facteurs locaux (ombrage, neige, encrassement, micro-climat).</p>
                    <p>Pour un chiffrage exact, un technicien QualiPV doit réaliser une <strong>visite technique gratuite</strong> de votre toiture.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Button onClick={resetAll} variant="outline" className="h-14 rounded-2xl font-medium text-zinc-600">
                  <RotateCcw className="mr-2 h-5 w-5" /> Nouvelle simulation
                </Button>
                <Link href="/devis" className="block">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white h-14 rounded-2xl shadow-lg font-bold text-lg">
                    Recevoir 3 devis gratuits <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SEO Content ── */}
      <section className="py-16 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4 max-w-4xl prose prose-zinc">
          <h2>Comment fonctionne notre simulateur de rendement solaire ?</h2>
          <p>
            Notre <strong>simulateur solaire gratuit</strong> utilise les données
            d&apos;irradiation du <strong>PVGIS</strong> (Photovoltaic Geographical Information System)
            de la Commission européenne pour estimer précisément la production de vos <strong>panneaux solaires photovoltaïques</strong>.
          </p>

          <h3>Les facteurs qui influencent votre production</h3>
          <ul>
            <li><strong>L&apos;ensoleillement local :</strong> Entre 960 kWh/kWc/an dans le Nord et 1 450 kWh/kWc/an en Provence, la localisation est le facteur n°1. Consultez nos <Link href="/annuaire" className="text-amber-600">pages départementales</Link> pour vos données locales.</li>
            <li><strong>L&apos;orientation :</strong> Une toiture <strong>plein sud</strong> capte 100% de l&apos;énergie disponible. Sud-Est ou Sud-Ouest offrent encore 95% du rendement optimal. L&apos;est et l&apos;ouest descendent à 80%.</li>
            <li><strong>L&apos;inclinaison :</strong> L&apos;angle idéal en France est de <strong>30° à 35°</strong>. Un toit plat ou très pentu réduit le rendement de 10 à 15%.</li>
            <li><strong>La puissance installée :</strong> De 3 kWc (8 panneaux) à 9 kWc (22 panneaux), la puissance détermine directement le volume de kWh produits annuellement.</li>
          </ul>

          <h3>Autoconsommation ou revente : quel mode est le plus rentable ?</h3>
          <p>
            En 2026, l&apos;<strong>autoconsommation avec revente du surplus</strong> est la formule la
            plus rentable. Chaque kWh que vous consommez vous fait économiser <strong>0,2516 €</strong> (tarif
            EDF), tandis que la revente du surplus à <Link href="/guides/autoconsommation-vs-revente" className="text-amber-600">EDF OA</Link> ne vous rapporte que
            0,1297 €/kWh. L&apos;autoconsommation est donc <strong>2× plus avantageuse</strong> que la revente.
          </p>
          <p>
            L&apos;ajout d&apos;une <strong>batterie de stockage</strong> permet de passer de 40% à 70%
            d&apos;autoconsommation en stockant l&apos;énergie produite la journée pour l&apos;utiliser le
            soir. C&apos;est particulièrement intéressant si vous êtes souvent absent en journée.
          </p>

          <h3>Comment sont calculées les économies sur 25 ans ?</h3>
          <p>
            Notre simulation intègre la <strong>dégradation annuelle</strong> des panneaux (0,5%/an),
            la <strong>hausse du prix de l&apos;électricité</strong> (+4%/an en moyenne sur la dernière
            décennie) et les <strong>primes à l&apos;autoconsommation</strong> actuelles. Les panneaux ont une
            durée de vie prouvée de <strong>30 à 40 ans</strong>, avec des garanties constructeur de 25 ans.
          </p>
          <p>
            Pour aller plus loin, consultez notre <Link href="/guides/rentabilite-panneau-solaire" className="text-amber-600 font-semibold">guide complet de la rentabilité solaire</Link> ou
            nos <Link href="/guides/prix-panneaux-solaires-2026" className="text-amber-600 font-semibold">tarifs détaillés par puissance</Link>. Prêt à passer à l&apos;action ?
            Obtenez <Link href="/devis" className="text-green-700 font-bold">3 devis gratuits</Link> d&apos;installateurs QualiPV.
          </p>
        </div>
      </section>
    </div>
  );
}
