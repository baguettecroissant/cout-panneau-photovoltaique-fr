import { City } from "@/types";

export function StepsModule({ city }: { city: City }) {
    const steps = [
        { num: "1", title: "Étude de faisabilité", desc: `Un installateur QualiPV de ${city.name} visite votre toiture, vérifie l'orientation, l'inclinaison et l'ombrage. Il dimensionne votre système (3, 6 ou 9 kWc) selon votre consommation.` },
        { num: "2", title: "Démarches administratives", desc: `Déclaration préalable en mairie, demande de raccordement Enedis, dossier CONSUEL — votre installateur gère tout pour vous dans le ${city.department_name}.` },
        { num: "3", title: "Installation (1-3 jours)", desc: `Pose des panneaux sur votre toiture, installation de l'onduleur, câblage et mise en service. L'installation est réalisée par des techniciens certifiés QualiPV.` },
        { num: "4", title: "Raccordement et activation", desc: `Enedis raccorde votre installation au réseau. Vous signez le contrat EDF OA pour la revente du surplus. Votre toiture produit de l'argent !` },
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                Les étapes de votre projet solaire à {city.name}
            </h2>
            <div className="space-y-4">
                {steps.map((step) => (
                    <div key={step.num} className="flex gap-4 bg-white border border-zinc-200 rounded-xl p-5">
                        <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0">
                            {step.num}
                        </div>
                        <div>
                            <h3 className="font-bold text-zinc-900 mb-1">{step.title}</h3>
                            <p className="text-sm text-zinc-600 font-serif">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
