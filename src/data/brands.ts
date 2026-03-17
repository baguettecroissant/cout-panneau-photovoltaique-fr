export interface Brand {
    slug: string;
    name: string;
    country: string;
    tagline: string;
    description: string;
    strengths: string[];
    letter: string;
    letterColor: string;
    image?: string;
    imageAlt?: string;
}

export const brands: Brand[] = [
    {
        slug: "sunpower",
        name: "SunPower",
        country: "États-Unis",
        tagline: "Panneaux haut rendement à cellules IBC Maxeon",
        description: "SunPower est le pionnier des panneaux solaires à cellules IBC (Interdigitated Back Contact), une technologie brevetée qui place tous les contacts électriques à l'arrière de la cellule pour un rendement record de 22,8%. La gamme Maxeon, fabriquée avec une base en cuivre solide, offre une résistance mécanique unique et la garantie la plus longue du marché : 40 ans sur la production et les matériaux. Les panneaux SunPower conservent 92% de leur puissance après 25 ans, contre 80-85% pour les panneaux standards. Choix premium pour les toitures à surface limitée où chaque m² compte.",
        strengths: ["Rendement record 22,8%", "Garantie 40 ans", "Technologie IBC Maxeon", "Dégradation minimale 0,25%/an", "Idéal petites toitures"],
        letter: "S",
        letterColor: "amber",
    },
    {
        slug: "enphase",
        name: "Enphase",
        country: "États-Unis",
        tagline: "Leader mondial des micro-onduleurs solaires",
        description: "Enphase Energy a révolutionné le solaire résidentiel en inventant le micro-onduleur : un petit convertisseur installé directement sous chaque panneau. Contrairement à un onduleur central classique, la technologie Enphase IQ8 permet à chaque panneau de fonctionner indépendamment, éliminant les pertes dues à l'ombrage partiel et augmentant la production de 5 à 25%. Le système Enphase Enlighten offre un monitoring panneau par panneau en temps réel. La fiabilité est exceptionnelle : garantie 25 ans et taux de panne inférieur à 0,05% par an. Compatible avec toutes les marques de panneaux.",
        strengths: ["Micro-onduleur IQ8 révolutionnaire", "Monitoring panneau par panneau", "Garantie 25 ans", "Anti-ombrage intelligent", "Taux de panne < 0,05%/an"],
        letter: "E",
        letterColor: "orange",
    },
    {
        slug: "dualsun",
        name: "DualSun",
        country: "France (Marseille)",
        tagline: "Le panneau hybride français qui produit électricité et eau chaude",
        description: "DualSun est l'unique fabricant français de panneaux solaires hybrides (PVT) : la face avant produit de l'électricité photovoltaïque tandis qu'un échangeur thermique à l'arrière récupère la chaleur pour chauffer l'eau sanitaire. Le modèle DualSun Spring produit ainsi 2 à 3 fois plus d'énergie par m² qu'un panneau classique. Conçus et assemblés à Marseille, les panneaux DualSun bénéficient du label « Origine France Garantie ». Idéal pour les projets combinant production électrique et eau chaude solaire, notamment avec une pompe à chaleur.",
        strengths: ["Panneau hybride PVT unique", "Made in France (Marseille)", "2-3x plus d'énergie par m²", "Eau chaude + électricité", "Label Origine France Garantie"],
        letter: "D",
        letterColor: "blue",
    },
    {
        slug: "systovi",
        name: "Systovi",
        country: "France (Carquefou)",
        tagline: "Panneaux solaires et aérovoltaïque 100% français",
        description: "Systovi, basée à Carquefou près de Nantes, est le dernier fabricant français de panneaux solaires photovoltaïques intégrés en toiture. Son produit phare, le système aérovoltaïque R-VOLT, est unique au monde : il combine production photovoltaïque, récupération de chaleur et filtration de l'air. La technologie « brise-soleil » optimise le refroidissement des cellules pour maintenir un rendement élevé même en plein été. Tous les panneaux Systovi sont certifiés NF et bénéficient d'une garantie produit de 20 ans. L'usine française emploie plus de 100 personnes.",
        strengths: ["Fabrication 100% française", "Système aérovoltaïque R-VOLT", "Certification NF", "Intégration toiture native", "Garantie 20 ans"],
        letter: "S",
        letterColor: "green",
    },
    {
        slug: "q-cells",
        name: "Q Cells",
        country: "Corée du Sud (Hanwha)",
        tagline: "Panneaux solaires allemands à technologie Q.ANTUM",
        description: "Q Cells (filiale de Hanwha Solutions) combine l'ingénierie allemande et la puissance industrielle coréenne pour produire des panneaux solaires au rapport qualité/prix parmi les meilleurs du marché. La technologie propriétaire Q.ANTUM DUO Z utilise des cellules demi-coupées et une conception sans busbar pour maximiser la surface active et atteindre un rendement de 21,4%. Les panneaux Q.PEAK DUO résistent aux conditions difficiles (neige, vent, grêle) avec une certification PID et Hot-Spot Free. Très populaires en France, les Q Cells sont plébiscités par les installateurs pour leur fiabilité et facilité de pose.",
        strengths: ["Technologie Q.ANTUM DUO Z", "Rendement 21,4%", "Excellent rapport qualité/prix", "Anti Hot-Spot & PID Free", "Très populaire en France"],
        letter: "Q",
        letterColor: "blue",
    },
    {
        slug: "trina-solar",
        name: "Trina Solar",
        country: "Chine",
        tagline: "N°1 mondial en volume, fiabilité prouvée depuis 1997",
        description: "Trina Solar est l'un des plus grands fabricants de panneaux solaires au monde avec plus de 170 GW installés. Fondée en 1997, l'entreprise investit massivement en R&D (plus de 1 500 brevets) et a battu 25 records mondiaux de rendement cellulaire. La gamme résidentielle Vertex S+ utilise la technologie n-type TOPCon pour un rendement de 22,5% et une dégradation première année limitée à 1% (vs 2-3% pour les panneaux p-type classiques). Les panneaux Trina sont classés « Top Performer » par DNV et « Tier 1 » par Bloomberg NEF depuis plus de 10 années consécutives.",
        strengths: ["N°1 mondial (170 GW installés)", "Technologie n-type TOPCon", "25 records mondiaux", "Tier 1 Bloomberg NEF", "R&D 1 500+ brevets"],
        letter: "T",
        letterColor: "red",
    },
    {
        slug: "longi",
        name: "LONGi",
        country: "Chine",
        tagline: "Leader mondial du monocristallin et recordman d'efficacité",
        description: "LONGi Green Energy est le plus grand fabricant mondial de wafers et cellules en silicium monocristallin, la technologie la plus performante du marché. L'entreprise a été le moteur de la transition de l'industrie vers le monocristallin, réduisant les coûts de 75% en 10 ans. La gamme résidentielle Hi-MO X6 utilise la technologie HPBC (Hybrid Passivated Back Contact) pour un rendement de 22,8% et une esthétique tout noir élégante. LONGi détient le record mondial absolu de rendement en cellule HJT à 27,09%. Garantie linéaire de 30 ans avec 87,4% de puissance conservée.",
        strengths: ["Record mondial 27,09% (HJT)", "Technologie HPBC", "N°1 du monocristallin", "Esthétique tout noir", "Garantie linéaire 30 ans"],
        letter: "L",
        letterColor: "emerald",
    },
];
