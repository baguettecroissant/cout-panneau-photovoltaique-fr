import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-blue-50 relative overflow-hidden">
            {/* Subtle stars pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 30px, white, transparent), radial-gradient(1px 1px at 40px 70px, white, transparent), radial-gradient(1px 1px at 50px 160px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(1px 1px at 160px 120px, white, transparent)', backgroundSize: '200px 200px' }} />

            {/* Main footer content */}
            <div className="container mx-auto px-4 py-14 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4">
                            Cout-Panneau-Photovoltaique<span className="text-amber-400">.fr</span>
                        </h3>
                        <p className="text-blue-300 text-sm leading-relaxed mb-4">
                            Le guide indépendant pour comparer les prix d&apos;installation de panneaux solaires photovoltaïques en France. Installateurs certifiés QualiPV.
                        </p>
                        <Link
                            href="/devis"
                            className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
                        >
                            Devis gratuit →
                        </Link>
                    </div>

                    {/* Guides populaires */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Guides</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/guides/prix-panneaux-solaires-2026" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Prix panneaux solaires</Link></li>
                            <li><Link href="/guides/autoconsommation-vs-revente" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Autoconsommation vs revente</Link></li>
                            <li><Link href="/guides/aides-panneaux-solaires-2026" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Aides et primes solaires</Link></li>
                            <li><Link href="/guides/rentabilite-panneau-solaire" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Rentabilité solaire</Link></li>
                            <li><Link href="/guides" className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">Tous les guides →</Link></li>
                        </ul>
                    </div>

                    {/* Villes populaires */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Villes</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/panneau-solaire/paris-75000" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Solaire Paris</Link></li>
                            <li><Link href="/panneau-solaire/lyon-69000" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Solaire Lyon</Link></li>
                            <li><Link href="/panneau-solaire/marseille-13000" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Solaire Marseille</Link></li>
                            <li><Link href="/panneau-solaire/toulouse-31000" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Solaire Toulouse</Link></li>
                            <li><Link href="/annuaire" className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">Tout l&apos;annuaire →</Link></li>
                        </ul>
                    </div>

                    {/* Infos */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Informations</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Accueil</Link></li>
                            <li><Link href="/marques" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Marques</Link></li>
                            <li><Link href="/marques/sunpower" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">SunPower</Link></li>
                            <li><Link href="/marques/enphase" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Enphase</Link></li>
                            <li><Link href="/faq" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">FAQ</Link></li>
                            <li><Link href="/mentions-legales" className="text-blue-300 hover:text-amber-300 text-sm transition-colors">Mentions légales</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Cross-linking */}
                <div className="mt-10 pt-8 border-t border-blue-700">
                    <p className="text-blue-500 text-xs text-center">
                        Voir aussi : <Link href="https://www.cout-borne-recharge.fr" className="text-blue-400 hover:text-amber-300 transition-colors">Recharger sa voiture grâce au solaire</Link> · <Link href="https://www.cout-chauffage-energie.fr" className="text-blue-400 hover:text-amber-300 transition-colors">Production d&apos;eau chaude solaire</Link>
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-blue-800/50 relative z-10">
                <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-500">
                    <p>© 2026 Cout-Panneau-Photovoltaique.fr — Tous droits réservés.</p>
                    <p>Guide indépendant · Devis gratuits d&apos;installateurs certifiés QualiPV · France métropolitaine</p>
                </div>
            </div>
        </footer>
    );
}
