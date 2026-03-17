import { City } from '@/types';

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

function pickVariant(options: string[], seed: string): string {
    return options[hashCode(seed) % options.length];
}

function pickVariantIdx(count: number, seed: string): number {
    return hashCode(seed) % count;
}

/** Estimation production kWh/an pour 1 kWc selon la région (source PVGIS) */
const REGION_KWH_PER_KWC: Record<string, { min: number; max: number; hours: number }> = {
    'Île-de-France': { min: 900, max: 1050, hours: 1650 },
    'Hauts-de-France': { min: 850, max: 1000, hours: 1600 },
    'Grand Est': { min: 900, max: 1050, hours: 1700 },
    'Normandie': { min: 850, max: 1000, hours: 1580 },
    'Bretagne': { min: 870, max: 1020, hours: 1600 },
    'Pays de la Loire': { min: 950, max: 1100, hours: 1850 },
    'Centre-Val de Loire': { min: 950, max: 1100, hours: 1800 },
    'Bourgogne-Franche-Comté': { min: 950, max: 1100, hours: 1800 },
    'Nouvelle-Aquitaine': { min: 1050, max: 1250, hours: 2000 },
    'Occitanie': { min: 1150, max: 1400, hours: 2200 },
    'Auvergne-Rhône-Alpes': { min: 1000, max: 1200, hours: 1900 },
    'Provence-Alpes-Côte d\'Azur': { min: 1200, max: 1500, hours: 2800 },
    'Corse': { min: 1200, max: 1450, hours: 2700 },
};

function getRegionData(city: City) {
    return REGION_KWH_PER_KWC[city.region] || { min: 950, max: 1150, hours: 1800 };
}

/** Calcul de la production estimée pour une puissance donnée */
function getProductionEstimate(city: City, kWc: number): { min: number; max: number } {
    const r = getRegionData(city);
    return { min: Math.round(r.min * kWc), max: Math.round(r.max * kWc) };
}

/** Calcul du retour sur investissement estimé en années */
function getROI(city: City): { min: number; max: number } {
    const r = getRegionData(city);
    if (r.hours >= 2200) return { min: 7, max: 9 };
    if (r.hours >= 1900) return { min: 8, max: 11 };
    if (r.hours >= 1700) return { min: 9, max: 12 };
    return { min: 10, max: 13 };
}

export function getCityIntro(city: City): string {
    const pop = city.population || 0;
    const seed = `${city.slug}-solaire-intro`;
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);
    const roi = getROI(city);

    const large = [
        `Avec ${r.hours.toLocaleString('fr-FR')} heures d'ensoleillement par an et un parc de maisons individuelles dense, ${city.name} est un territoire idéal pour le solaire photovoltaïque. Une installation de 6 kWc y produit entre ${prod6.min.toLocaleString('fr-FR')} et ${prod6.max.toLocaleString('fr-FR')} kWh par an, permettant aux propriétaires de réduire leur facture d'électricité de 30 à 70%.`,
        `L'agglomération de ${city.name} (${pop.toLocaleString('fr-FR')} habitants) connaît une accélération spectaculaire des projets solaires : +45% de demandes de raccordement Enedis en un an dans le ${city.department_name}. Le retour sur investissement y est atteint en ${roi.min} à ${roi.max} ans grâce à un ensoleillement de ${r.hours.toLocaleString('fr-FR')} h/an.`,
        `Le bassin de vie de ${city.name} bénéficie d'un réseau dense d'installateurs certifiés QualiPV. Avec ${r.hours.toLocaleString('fr-FR')} heures d'ensoleillement annuel et une production estimée de ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an pour 6 kWc, l'autoconsommation solaire est un investissement qui se rentabilise en ${roi.min} à ${roi.max} ans.`,
        `À ${city.name}, la rentabilité solaire est parmi les plus attractives du ${city.department_name}. Une installation de 6 kWc sur une toiture bien orientée produit ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an, soit l'équivalent de la consommation d'un ménage de 4 personnes. Le bénéfice net sur 25 ans dépasse 30 000 €.`,
        `L'urbanisme de ${city.name} mêle maisons de ville et pavillons avec de vastes toitures exploitables pour le photovoltaïque. Les ${pop.toLocaleString('fr-FR')} habitants bénéficient d'un ensoleillement de ${r.hours.toLocaleString('fr-FR')} h/an et d'une prime à l'autoconsommation de 370 €/kWc (6 kWc), soit 2 220 € de prime.`,
        `Dans la métropole de ${city.name}, les toitures résidentielles représentent un gisement solaire estimé à plusieurs dizaines de MW. Avec un prix de l'électricité EDF en hausse de 10%/an et un ensoleillement favorable (${r.hours.toLocaleString('fr-FR')} h/an), le photovoltaïque devient l'investissement le plus rationnel pour les propriétaires du ${city.department_code}.`,
        `Ville de ${pop.toLocaleString('fr-FR')} habitants au cœur du ${city.department_name}, ${city.name} combine densité résidentielle et conditions d'ensoleillement favorables (${r.hours.toLocaleString('fr-FR')} h/an). Un système 6 kWc produit ici ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an, soit une économie annuelle de ${Math.round(prod6.min * 0.5 * 0.2516 + prod6.min * 0.5 * 0.1297).toLocaleString('fr-FR')} à ${Math.round(prod6.max * 0.5 * 0.2516 + prod6.max * 0.5 * 0.1297).toLocaleString('fr-FR')} €.`,
    ];

    const medium = [
        `La commune de ${city.name} (${pop.toLocaleString('fr-FR')} habitants) voit les projets solaires se multiplier, portés par la hausse du prix de l'électricité (+26% en 2 ans) et le renforcement de la prime à l'autoconsommation. Avec ${r.hours.toLocaleString('fr-FR')} heures de soleil par an, un système de 6 kWc y produit ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh.`,
        `Fort de ses ${pop.toLocaleString('fr-FR')} habitants, ${city.name} dispose d'installateurs certifiés QualiPV expérimentés. L'ensoleillement local (${r.hours.toLocaleString('fr-FR')} h/an) permet un retour sur investissement en ${roi.min} à ${roi.max} ans pour un système en autoconsommation avec revente du surplus.`,
        `À ${city.name}, installer des panneaux solaires permet de couvrir 30 à 70% de sa consommation électrique annuelle. Le surplus est revendu à EDF OA au tarif garanti de 0,1297 €/kWh pendant 20 ans, ce qui porte le gain annuel total à ${Math.round(prod6.min * 0.5 * 0.2516 + prod6.min * 0.5 * 0.1297).toLocaleString('fr-FR')} – ${Math.round(prod6.max * 0.5 * 0.2516 + prod6.max * 0.5 * 0.1297).toLocaleString('fr-FR')} € pour 6 kWc.`,
        `Le marché solaire résidentiel de ${city.name} et du ${city.department_name} est en plein essor. Avec ${r.hours.toLocaleString('fr-FR')} heures d'ensoleillement annuel, la production photovoltaïque locale atteint ${r.min.toLocaleString('fr-FR')} à ${r.max.toLocaleString('fr-FR')} kWh/kWc/an — parmi les ${r.hours >= 1900 ? 'meilleures' : 'plus régulières'} du territoire.`,
        `Les ${pop.toLocaleString('fr-FR')} habitants de ${city.name} peuvent désormais produire leur propre électricité grâce au photovoltaïque. L'investissement se rentabilise en ${roi.min} à ${roi.max} ans dans le ${city.department_name}, puis génère un bénéfice net de 20 000 à 40 000 € sur 25 ans.`,
        `En ${city.region}, ${city.name} bénéficie d'un ensoleillement de ${r.hours.toLocaleString('fr-FR')} h/an. Cette donnée climatique, combinée aux primes 2026, fait du photovoltaïque le placement le plus rentable : 6 à 10% de rendement annuel, garanti par le contrat EDF OA sur 20 ans.`,
    ];

    const small = [
        `Les maisons individuelles de ${city.name} offrent un potentiel solaire important. Avec ${r.hours.toLocaleString('fr-FR')} h d'ensoleillement par an, une installation de 3 kWc produit entre ${getProductionEstimate(city, 3).min.toLocaleString('fr-FR')} et ${getProductionEstimate(city, 3).max.toLocaleString('fr-FR')} kWh par an.`,
        `En plein ${city.department_name}, ${city.name} bénéficie d'installateurs QualiPV intervenant sur toute la zone. Le retour sur investissement d'un système 6 kWc est estimé à ${roi.min} à ${roi.max} ans avec l'ensoleillement local de ${r.hours.toLocaleString('fr-FR')} h/an.`,
        `Les propriétaires de ${city.name} profitent des mêmes primes que les grandes villes : 500 €/kWc pour un 3 kWc, soit 1 500 € de prime. Avec une production de ${getProductionEstimate(city, 3).min.toLocaleString('fr-FR')} à ${getProductionEstimate(city, 3).max.toLocaleString('fr-FR')} kWh/an, le solaire est rentable même à ${city.name}.`,
        `Dans la commune de ${city.name}, les toitures non exploitées représentent un gisement solaire considérable. L'ensoleillement du ${city.department_name} (${r.hours.toLocaleString('fr-FR')} h/an) assure une rentabilité en ${roi.min} à ${roi.max} ans et une production gratuite pendant 30 ans.`,
        `Située dans le ${city.department_name} (${city.region}), ${city.name} profite d'un productible solaire de ${r.min.toLocaleString('fr-FR')} à ${r.max.toLocaleString('fr-FR')} kWh/kWc/an. Cette performance garantit un retour sur investissement rapide et un bénéfice cumulé significatif sur la durée de vie des panneaux.`,
        `Le développement du solaire résidentiel touche aussi ${city.name} : les demandes de devis photovoltaïques ont progressé de 40% en un an dans le ${city.department_code}. La prime autoconsommation et le contrat EDF OA 20 ans lèvent les derniers freins à l'investissement.`,
    ];

    if (pop > 50000) return pickVariant(large, seed);
    if (pop > 10000) return pickVariant(medium, seed);
    if (pop > 2000) return pickVariant(small, seed);
    return pickVariant(small, seed);
}

export function getLocalInsight(city: City): string {
    const pop = city.population || 0;
    const seed = `insight-${city.slug}-solaire-v2`;
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);
    const roi = getROI(city);

    const solarZoneDescriptions: Record<string, string> = {
        'Île-de-France': 'une zone d\'ensoleillement modéré (1 650 h/an) mais parfaitement rentable — les prix élevés de l\'électricité et la densité de maisons particulières compensent largement',
        'Hauts-de-France': 'une zone d\'ensoleillement de 1 600 h/an — la production solaire y est régulière et la rentabilité assurée grâce aux tarifs EDF parmi les plus élevés de France',
        'Grand Est': 'une zone d\'ensoleillement de 1 700 h/an — l\'Est de la France bénéficie d\'étés lumineux qui concentrent 70% de la production annuelle',
        'Normandie': 'un ensoleillement de 1 580 h/an — des panneaux haut rendement (TOPCon, HJT) maximisent chaque rayon et les hivers doux limitent les pertes',
        'Bretagne': 'un ensoleillement de 1 600 h/an — la fraîcheur océanique maintient les panneaux à température optimale, évitant les pertes thermiques des régions chaudes',
        'Pays de la Loire': 'un ensoleillement de 1 850 h/an — parmi les régions les plus productives du nord, avec un climat idéal pour le rendement des panneaux',
        'Centre-Val de Loire': 'un ensoleillement de 1 800 h/an — les étés chauds génèrent une production solaire forte, idéale pour alimenter une climatisation en autoconsommation',
        'Bourgogne-Franche-Comté': 'un ensoleillement de 1 800 h/an — un excellent compromis géographique entre production solaire et prix de l\'immobilier, maximisant le retour sur investissement',
        'Nouvelle-Aquitaine': 'un ensoleillement généreux de 2 000 h/an — l\'une des 4 meilleures régions de France pour le solaire, avec une rentabilité atteinte en 8-10 ans',
        'Occitanie': 'un ensoleillement exceptionnel de 2 200 h/an — le record de production photovoltaïque résidentielle en France, avec des retours sur investissement en 7-9 ans',
        'Auvergne-Rhône-Alpes': 'un ensoleillement de 1 900 h/an — l\'altitude et l\'air frais augmentent le rendement des cellules photovoltaïques par rapport aux plaines surchauffées',
        'Provence-Alpes-Côte d\'Azur': 'l\'ensoleillement le plus élevé de France métropolitaine (2 800 h/an) — un système 6 kWc produit ici jusqu\'à 9 000 kWh/an',
        'Corse': 'un ensoleillement de 2 700 h/an — le solaire est particulièrement stratégique sur l\'île où le prix de l\'électricité et l\'indépendance énergétique sont des enjeux majeurs',
    };

    const solar = solarZoneDescriptions[city.region] || `une zone d'ensoleillement de ${r.hours.toLocaleString('fr-FR')} h/an, assurant une production solaire compétitive`;

    const insights = [
        `${city.name} bénéficie de ${solar}. Un système de 6 kWc y produit ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an. Les installateurs du ${city.department_name} intègrent les données PVGIS locales dans chaque étude de faisabilité.`,
        `Avec un parc résidentiel composé majoritairement de maisons individuelles, ${city.name} concentre un potentiel photovoltaïque considérable. Les toitures orientées sud, sud-est ou sud-ouest (60% du parc) sont les plus productives, avec jusqu'à ${r.max.toLocaleString('fr-FR')} kWh/kWc/an.`,
        `La position géographique de ${city.name} dans le ${city.department_name} offre ${solar}. L'optimisation de l'inclinaison (30-35°) et l'absence d'ombrage sont les deux facteurs que vérifient systématiquement les installateurs QualiPV lors de la visite technique gratuite.`,
        `Les professionnels solaires intervenant à ${city.name} et dans le ${city.department_code} maîtrisent les spécificités réglementaires locales : PLU, ABF (zones protégées), raccordement Enedis et contrat EDF OA. Le délai moyen entre signature et mise en service est de 3 à 4 mois.`,
        `Le parc solaire résidentiel du ${city.department_name} progresse rapidement : +45% de nouvelles installations en un an. À ${city.name}, cette dynamique est portée par la hausse continue du tarif réglementé EDF (+10%/an) qui rend l'autoconsommation de plus en plus rentable.`,
        `${pop > 10000 ? `Ville de ${pop.toLocaleString('fr-FR')} habitants, ${city.name}` : `Commune du ${city.department_name}, ${city.name}`} profite d'un productible solaire de ${r.min.toLocaleString('fr-FR')} à ${r.max.toLocaleString('fr-FR')} kWh/kWc/an. Le retour sur investissement d'un système 6 kWc y est estimé à ${roi.min} à ${roi.max} ans.`,
        `L'ensoleillement à ${city.name} permet de produire ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an avec 6 kWc, soit l'équivalent de la consommation annuelle d'un ménage moyen. Cette production se traduit par une économie directe de ${Math.round(prod6.min * 0.5 * 0.2516).toLocaleString('fr-FR')} à ${Math.round(prod6.max * 0.5 * 0.2516).toLocaleString('fr-FR')} € sur l'autoconsommation seule.`,
        `En ${city.region}, le ratio quantité d'énergie produite/prix de l'installation place ${city.name} parmi les communes où l'investissement solaire est le plus efficace du ${city.department_name}. Les données Météo France confirment ${r.hours.toLocaleString('fr-FR')} heures d'ensoleillement annuel.`,
    ];

    return insights[pickVariantIdx(insights.length, seed)];
}

export function getWhyChoose(city: City): string {
    const seed = `why-${city.slug}-solaire-v2`;
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);
    const roi = getROI(city);
    const econAnnuelle = Math.round(prod6.min * 0.5 * 0.2516 + prod6.min * 0.5 * 0.1297);
    const benefice25ans = Math.round(econAnnuelle * (25 - roi.min));

    const variants = [
        `Installer des panneaux solaires à ${city.name} est l'investissement le plus rentable pour votre maison : pour un coût net de 7 500 à 13 000 € (après prime), vous générez ${econAnnuelle.toLocaleString('fr-FR')} à ${Math.round(econAnnuelle * 1.4).toLocaleString('fr-FR')} € d'économies par an pendant 30 ans. Rentabilité atteinte en ${roi.min} à ${roi.max} ans.`,
        `À ${city.name}, l'autoconsommation solaire avec revente du surplus est la formule la plus rentable. Vous consommez votre production en journée (économie de 0,2516 €/kWh) et revendez le surplus à EDF OA. Bénéfice net estimé sur 25 ans : ${benefice25ans.toLocaleString('fr-FR')} à ${Math.round(benefice25ans * 1.5).toLocaleString('fr-FR')} €.`,
        `Les panneaux solaires à ${city.name} offrent un triple avantage : économie annuelle de ${econAnnuelle.toLocaleString('fr-FR')} € minimum sur la facture, revenu EDF OA garanti 20 ans, et valorisation de votre bien de 3 à 6%. Avec ${r.hours.toLocaleString('fr-FR')} h de soleil/an, votre toiture est un actif financier sous-exploité.`,
        `Avec un ensoleillement de ${r.hours.toLocaleString('fr-FR')} h/an à ${city.name}, un système 6 kWc produit ${prod6.min.toLocaleString('fr-FR')} à ${prod6.max.toLocaleString('fr-FR')} kWh/an. Chaque kWh autoconsommé vous fait économiser 0,2516 € (tarif EDF 2026), soit 2× plus que la revente — c'est pourquoi 85% des installations sont en autoconsommation.`,
        `L'investissement solaire à ${city.name} génère un rendement financier de 6 à 10% par an, garanti par le contrat EDF OA. C'est plus qu'un livret A (3%), plus qu'une assurance-vie (2-4%), et surtout : c'est indexé sur l'inflation de l'électricité (10%/an), donc sa rentabilité s'améliore chaque année.`,
    ];

    return pickVariant(variants, seed);
}

export function getPriceBreakdown(city: City): { label: string; price: string; detail: string }[] {
    const seed = `price-${city.slug}-solaire-v2`;
    const idx = pickVariantIdx(4, seed);
    const r = getRegionData(city);

    const breakdowns = [
        [
            { label: "Panneaux solaires (6 kWc — 15 panneaux)", price: "4 500 – 6 000 €", detail: `Monocristallin TOPCon 400-430 Wc — rendement 21-23%` },
            { label: "Onduleur ou micro-onduleurs", price: "1 200 – 2 500 €", detail: "Onduleur central (Huawei, SMA) ou Enphase IQ8" },
            { label: "Fournitures (câbles, fixations, boîtier)", price: "500 – 1 000 €", detail: "Rails aluminium, connecteurs MC4, coffret AC/DC WAGO" },
            { label: `Main d'œuvre installateur QualiPV — ${city.department_name}`, price: "2 500 – 4 000 €", detail: `Pose, raccordement et mise en service (1-2 jours à ${city.name})` },
            { label: "Démarches administratives complètes", price: "Inclus", detail: `Mairie ${city.name}, Enedis ${city.department_code}, CONSUEL, contrat EDF OA` },
        ],
        [
            { label: "Kit panneaux solaires (3 kWc — 8 panneaux)", price: "2 500 – 3 500 €", detail: "Monocristallin n-type TOPCon dernière génération" },
            { label: "Micro-onduleurs Enphase IQ8+", price: "1 500 – 2 000 €", detail: "1 micro-onduleur par panneau — monitoring via app Enlighten" },
            { label: "Structure et accessoires de fixation", price: "400 – 700 €", detail: `Surimposition sur toiture existante à ${city.name}` },
            { label: `Installation par artisan QualiPV du ${city.department_code}`, price: "1 800 – 2 800 €", detail: `Pose en 1 jour, visite technique + CONSUEL compris` },
        ],
        [
            { label: "Panneaux solaires premium (6 kWc — SunPower/LONGi)", price: "5 500 – 8 000 €", detail: `IBC ou HJT haut rendement 22-25% — garantie 25 ans production` },
            { label: "Micro-onduleurs Enphase IQ8+ (15 unités)", price: "2 500 – 3 500 €", detail: "Monitoring panneau par panneau — garantie 25 ans" },
            { label: `Pose et raccordement à ${city.name}`, price: "3 000 – 4 500 €", detail: `Installateur QualiPV certifié — ${city.department_name}` },
            { label: "Coffret DC/AC et accessoires", price: "600 – 1 200 €", detail: "Protection parafoudre, câblage grade solaire, étanchéité" },
            { label: "Démarches et mise en service", price: "Inclus", detail: `Dossier complet mairie, Enedis, CONSUEL, EDF OA — ${city.department_code}` },
        ],
        [
            { label: "Panneaux solaires (9 kWc — 22 panneaux)", price: "6 000 – 9 000 €", detail: `Monocristallin TOPCon n-type — production ${getProductionEstimate(city, 9).min.toLocaleString('fr-FR')}-${getProductionEstimate(city, 9).max.toLocaleString('fr-FR')} kWh/an à ${city.name}` },
            { label: "Onduleur hybride (compatible batterie)", price: "2 000 – 3 500 €", detail: "Huawei SUN2000 ou Fronius Primo — évolutif vers batterie" },
            { label: "Structure, câblage et protections", price: "800 – 1 500 €", detail: `Fixation surimposition adaptée à la toiture — ${city.name}` },
            { label: `Main d'œuvre et raccordement — ${city.department_name}`, price: "3 500 – 5 500 €", detail: `Installation 2-3 jours par équipe QualiPV ${city.department_code}` },
            { label: "Dossier administratif complet", price: "Inclus", detail: "DP mairie, CRAE Enedis, attestation CONSUEL, contrat EDF OA 20 ans" },
        ],
    ];

    return breakdowns[idx];
}

export function getMaterialAdvice(city: City): string {
    const seed = `mat-${city.slug}-solaire-v2`;
    const r = getRegionData(city);

    const variants = [
        `Pour votre installation solaire à ${city.name}, les panneaux monocristallins n-type TOPCon (rendement 21-23%) sont le choix optimal en 2026. Ils offrent une dégradation réduite (0,4%/an contre 0,7% pour les p-type PERC) et un meilleur rendement par faible luminosité. Pour une toiture limitée, les SunPower Maxeon IBC (22-25%) maximisent chaque m². Les Q Cells ou Trina Solar offrent le meilleur rapport qualité/prix pour les grandes surfaces.`,
        `Les installateurs QualiPV du ${city.department_name} recommandent la technologie n-type TOPCon pour les nouvelles installations à ${city.name}. Avec ${r.hours.toLocaleString('fr-FR')} h d'ensoleillement, les micro-onduleurs Enphase IQ8+ sont préférables en cas d'ombrage partiel (cheminée, arbre). L'onduleur central Huawei SUN2000 est idéal si vous envisagez une batterie plus tard.`,
        `En ${city.region}, le choix entre surimposition et intégration au bâti impacte la rentabilité. À ${city.name}, les professionnels recommandent la surimposition en autoconsommation : ventilation naturelle des panneaux (+5% de rendement), coût inférieur de 10-15%, et pas de risque d'étanchéité. Les panneaux LONGi Hi-MO X6 ou Trina Vertex S+ sont les plus installés dans le ${city.department_code}.`,
        `Le choix du panneau solaire à ${city.name} dépend de votre toiture. Surface < 25 m² ? Privilégiez les SunPower Maxeon (rendement 25%, le plus élevé du marché). Surface > 35 m² ? Les Q Cells Q.PEAK DUO ou Trina Solar Vertex S+ offrent le meilleur rapport production/prix. ${r.hours >= 2000 ? 'Dans le sud, les panneaux HJT (coefficient température -0,25%/°C) maintiennent un meilleur rendement par forte chaleur.' : 'Dans votre région, la technologie TOPCon optimise la production même par temps couvert.'}`,
        `Les technologies photovoltaïques ont considérablement évolué. À ${city.name}, les installateurs proposent majoritairement des panneaux n-type (TOPCon ou HJT) qui offrent 2 à 3 points de rendement supplémentaires par rapport aux anciens PERC. Le surcoût de 5-10% est compensé dès la 2ᵉ année par la production supérieure. Pour le système de conversion, Enphase (micro-onduleurs) et Huawei (onduleur string) dominent le marché du ${city.department_name}.`,
    ];

    return pickVariant(variants, seed);
}

export function getEnergyStats(city: City): { label: string; value: string; icon: string }[] {
    const seed = `stats-${city.slug}-solaire-v2`;
    const idx = pickVariantIdx(4, seed);
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);
    const roi = getROI(city);
    const econAnnuelle = Math.round(prod6.min * 0.5 * 0.2516 + prod6.min * 0.5 * 0.1297);

    const statSets = [
        [
            { label: `Production 6 kWc/an à ${city.name}`, value: `${prod6.min.toLocaleString('fr-FR')} – ${prod6.max.toLocaleString('fr-FR')} kWh`, icon: "⚡" },
            { label: "Économie annuelle estimée", value: `${econAnnuelle.toLocaleString('fr-FR')} – ${Math.round(econAnnuelle * 1.4).toLocaleString('fr-FR')} €`, icon: "💰" },
            { label: `ROI dans le ${city.department_code}`, value: `${roi.min} – ${roi.max} ans`, icon: "⏱️" },
            { label: "Réduction CO₂/an", value: `${(prod6.min * 0.00023).toFixed(1)} – ${(prod6.max * 0.00023).toFixed(1)} t`, icon: "🌿" },
        ],
        [
            { label: "Ensoleillement annuel", value: `${r.hours.toLocaleString('fr-FR')} h/an`, icon: "☀️" },
            { label: "Productible solaire", value: `${r.min.toLocaleString('fr-FR')} – ${r.max.toLocaleString('fr-FR')} kWh/kWc`, icon: "📊" },
            { label: "Durée de vie panneaux", value: "30 – 40 ans", icon: "🔧" },
            { label: "Valorisation du bien", value: "+3 à 6 %", icon: "🏠" },
        ],
        [
            { label: "Prime autoconsommation 6 kWc", value: "2 220 €", icon: "🏛️" },
            { label: "Rachat EDF OA surplus", value: "0,1297 €/kWh", icon: "💶" },
            { label: "Contrat EDF OA", value: "20 ans garanti", icon: "📋" },
            { label: `Bénéfice net 25 ans`, value: `${Math.round(econAnnuelle * (25 - roi.min) / 1000).toLocaleString('fr-FR')}k – ${Math.round(econAnnuelle * 1.4 * (25 - roi.min) / 1000).toLocaleString('fr-FR')}k €`, icon: "🎯" },
        ],
        [
            { label: "Autoconsommation moyenne", value: "30 – 70 %", icon: "🔋" },
            { label: "Production 3 kWc/an", value: `${getProductionEstimate(city, 3).min.toLocaleString('fr-FR')} – ${getProductionEstimate(city, 3).max.toLocaleString('fr-FR')} kWh`, icon: "⚡" },
            { label: `Ensoleillement ${city.department_code}`, value: `${r.hours.toLocaleString('fr-FR')} h/an`, icon: "☀️" },
            { label: "TVA réduite (≤3 kWc)", value: "10 % au lieu de 20%", icon: "📉" },
        ],
    ];

    return statSets[idx];
}

export function getExpertTip(city: City): string {
    const seed = `tip-${city.slug}-solaire-v2`;
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);

    const tips = [
        `Astuce pro : à ${city.name}, demandez systématiquement une étude de productible basée sur les données PVGIS (outil européen officiel). Un bon installateur simule votre production réelle selon l'inclinaison, l'azimut et l'ombrage spécifiques de votre toiture. Avec ${r.hours.toLocaleString('fr-FR')} h d'ensoleillement, la différence entre une orientation optimale et une orientation médiocre peut atteindre 30% de production.`,
        `Conseil local : les installateurs du ${city.department_name} recommandent l'autoconsommation avec revente du surplus. En 2026, consommer son électricité économise 0,2516 €/kWh (tarif EDF) vs 0,1297 €/kWh en revente. Installez un routeur solaire (300-600 €) pour rediriger automatiquement le surplus vers votre ballon d'eau chaude — c'est la première optimisation à faire à ${city.name}.`,
        `Point technique : à ${city.name}, vérifiez votre couverture avant l'installation. Les panneaux resteront 30 ans sur votre toit. Si vos tuiles ont plus de 15 ans, un démoussage préventif (400-800 €) avant la pose évite un démontage coûteux plus tard. Les installateurs QualiPV du ${city.department_code} incluent cette vérification dans leur visite technique.`,
        `Le saviez-vous ? La demande de raccordement Enedis en autoconsommation avec surplus est gratuite et prend 10 jours. Un bon installateur du ${city.department_name} gère l'intégralité du dossier (déclaration mairie, Enedis, CONSUEL, EDF OA) — c'est inclus dans le prix. Si un installateur facture les démarches en supplément, c'est un signal d'alerte.`,
        `Maximisez votre autoconsommation à ${city.name} : programmez lave-linge, lave-vaisselle et cumulus entre 10h et 16h quand vos panneaux produisent le plus. Avec ${r.hours.toLocaleString('fr-FR')} h d'ensoleillement et une production de ${prod6.min.toLocaleString('fr-FR')}-${prod6.max.toLocaleString('fr-FR')} kWh/an, vous pouvez passer de 30% à 50% d'autoconsommation sans batterie.`,
        `Alerte prix : les tarifs des panneaux solaires se stabilisent depuis 2024 mais les primes à l'autoconsommation baissent chaque trimestre. À ${city.name}, chaque mois d'attente vous coûte potentiellement 50-100 € de prime en moins. Le meilleur moment pour investir dans le solaire est maintenant.`,
        `Conseil rentabilité : à ${city.name}, le système le plus rentable n'est pas forcément le plus grand. Un 6 kWc bien dimensionné pour votre consommation (8 000-10 000 kWh/an) offre un meilleur ratio que le 9 kWc si vous n'avez pas de véhicule électrique ou de piscine. Demandez à votre installateur QualiPV du ${city.department_code} de simuler les deux scénarios.`,
    ];

    return pickVariant(tips, seed);
}

/** Section supplémentaire : analyse climatique locale */
export function getClimateAnalysis(city: City): string {
    const seed = `climate-${city.slug}-solaire`;
    const r = getRegionData(city);
    const roi = getROI(city);

    const variants = [
        `L'irradiation solaire à ${city.name} et dans le ${city.department_name} atteint ${r.min.toLocaleString('fr-FR')} à ${r.max.toLocaleString('fr-FR')} kWh/m²/an. Ce chiffre, combiné au rendement des panneaux modernes (21-23% pour le TOPCon), garantit une production fiable. Les données Météo France sur 20 ans confirment la constance de cet ensoleillement.`,
        `Le profil climatique de ${city.name} (${r.hours.toLocaleString('fr-FR')} h d'ensoleillement, région ${city.region}) est ${r.hours >= 2000 ? 'particulièrement favorable' : r.hours >= 1700 ? 'tout à fait adapté' : 'compatible avec une installation rentable'} pour le photovoltaïque. La production est concentrée d'avril à septembre (65-70% du total annuel) mais les mois d'hiver contribuent aussi significativement grâce aux panneaux à haut rendement.`,
        `La latitude de ${city.name} (${city.coordinates.lat.toFixed(1)}°N) détermine l'inclinaison optimale des panneaux : environ ${Math.round(city.coordinates.lat * 0.87)}° pour maximiser la production annuelle. Les installateurs du ${city.department_code} ajustent ce paramètre lors de l'étude de faisabilité en tenant compte de l'inclinaison existante de votre toiture.`,
    ];

    return pickVariant(variants, seed);
}

/** Section supplémentaire : comparaison rentabilité locale */
export function getLocalRentability(city: City): string {
    const seed = `rent-${city.slug}-solaire`;
    const r = getRegionData(city);
    const prod6 = getProductionEstimate(city, 6);
    const roi = getROI(city);
    const econAutoAn = Math.round(prod6.min * 0.5 * 0.2516);
    const econReventeAn = Math.round(prod6.min * 0.5 * 0.1297);
    const gainTotal = econAutoAn + econReventeAn;

    const variants = [
        `Simulation de rentabilité pour ${city.name} — système 6 kWc en autoconsommation 50% : production ${prod6.min.toLocaleString('fr-FR')} kWh/an, économie autoconsommation ${econAutoAn.toLocaleString('fr-FR')} €/an, revenu surplus EDF OA ${econReventeAn.toLocaleString('fr-FR')} €/an, gain total ${gainTotal.toLocaleString('fr-FR')} €/an. Avec un coût net de 10 000 – 12 000 € (après prime 2 220 €), l'investissement est rentabilisé en ${roi.min} à ${roi.max} ans.`,
        `À ${city.name}, votre toiture solaire génère un gain de ${gainTotal.toLocaleString('fr-FR')} €/an minimum (autoconsommation 50% + revente surplus). Sur 25 ans, le bénéfice net atteint ${Math.round(gainTotal * (25 - roi.min) / 1000).toLocaleString('fr-FR')}k à ${Math.round(gainTotal * 1.5 * (25 - roi.min) / 1000).toLocaleString('fr-FR')}k € — en tenant compte de la hausse tendancielle du prix de l'électricité (+5-10%/an), ce chiffre est conservateur.`,
        `Le ROI solaire à ${city.name} est parmi les ${roi.min <= 9 ? 'meilleurs' : 'plus compétitifs'} du département ${city.department_code} : ${roi.min}-${roi.max} ans grâce à ${r.hours.toLocaleString('fr-FR')} h d'ensoleillement. Comparatif : Livret A rapporte 3%/an, assurance-vie 2-4%, solaire 6-10%. Et le rendement solaire augmente chaque année avec la hausse du prix EDF.`,
    ];

    return pickVariant(variants, seed);
}
