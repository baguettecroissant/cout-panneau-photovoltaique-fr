import { Metadata } from "next";
import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";
import { Sun, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Devis Panneaux Solaires Gratuit — Installateurs QualiPV | Cout-Panneau-Photovoltaique.fr",
    description: "Recevez jusqu'à 3 devis gratuits d'installateurs certifiés QualiPV pour vos panneaux solaires. Comparez les prix en 2 minutes.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/devis' },
};

export default function DevisPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 py-12">
                <div className="container mx-auto px-4 max-w-3xl text-center text-white">
                    <Sun className="h-10 w-10 mx-auto mb-4 text-yellow-200" />
                    <h1 className="text-3xl md:text-4xl font-black mb-4">Demandez vos devis solaires gratuits</h1>
                    <p className="text-amber-100 font-serif text-lg">Comparez jusqu&apos;à 3 devis d&apos;installateurs certifiés QualiPV. Gratuit, rapide et sans engagement.</p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12 max-w-3xl">
                <ViteUnDevisWidget />

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {[
                        { icon: <Clock className="h-6 w-6 text-amber-600" />, title: "2 minutes", desc: "Remplissez le formulaire et décrivez votre projet solaire." },
                        { icon: <CheckCircle className="h-6 w-6 text-amber-600" />, title: "3 devis gratuits", desc: "Recevez jusqu'à 3 propositions d'installateurs QualiPV." },
                        { icon: <Sun className="h-6 w-6 text-amber-600" />, title: "Sans engagement", desc: "Comparez les prix librement et choisissez le meilleur installateur." },
                    ].map((s, i) => (
                        <div key={i} className="text-center bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                            <div className="mx-auto w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-3">{s.icon}</div>
                            <h3 className="font-bold text-zinc-900 mb-1">{s.title}</h3>
                            <p className="text-sm text-zinc-500 font-serif">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
