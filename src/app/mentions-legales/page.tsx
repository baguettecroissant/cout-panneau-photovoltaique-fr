import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales — Cout-Panneau-Photovoltaique.fr",
    description: "Mentions légales et politique de confidentialité du site cout-panneau-photovoltaique.fr.",
    alternates: { canonical: 'https://www.cout-panneau-photovoltaique.fr/mentions-legales' },
};

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-black text-zinc-900 mb-8">Mentions Légales</h1>

                <div className="prose prose-zinc max-w-none font-serif">
                    <h2>Éditeur du site</h2>
                    <p>Le site <strong>cout-panneau-photovoltaique.fr</strong> est un guide indépendant dédié à l&apos;information des particuliers sur les installations de panneaux solaires photovoltaïques et leur coût en France.</p>

                    <h2>Hébergement</h2>
                    <p>Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>

                    <h2>Données personnelles</h2>
                    <p>En utilisant le formulaire de demande de devis, vous acceptez que vos informations soient transmises à nos partenaires installateurs certifiés QualiPV afin qu&apos;ils puissent vous contacter pour établir un devis. Aucune donnée n&apos;est conservée au-delà du traitement de votre demande.</p>
                    <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données.</p>

                    <h2>Cookies</h2>
                    <p>Ce site utilise des cookies strictement nécessaires à son fonctionnement. Aucun cookie de tracking publicitaire n&apos;est utilisé.</p>

                    <h2>Affiliation</h2>
                    <p>Ce site contient des liens d&apos;affiliation vers des services de mise en relation avec des installateurs (ViteUnDevis). Cela signifie que nous percevons une commission lorsque vous effectuez une demande de devis via nos formulaires. Cela n&apos;affecte en rien le prix que vous payez.</p>

                    <h2>Propriété intellectuelle</h2>
                    <p>L&apos;ensemble du contenu (textes, images, graphiques) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans autorisation préalable.</p>
                </div>
            </div>
        </div>
    );
}
