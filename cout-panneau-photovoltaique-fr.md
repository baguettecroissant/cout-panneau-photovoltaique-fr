# cout-panneau-photovoltaique.fr — Project Spec

## Identité
- **Domaine** : `cout-panneau-photovoltaique.fr`
- **Type** : EMD single-niche
- **Baseline** : Panneaux solaires photovoltaïques — Simulez votre rentabilité
- **Ton éditorial** : Optimiste et chiffré. On parle de rentabilité, d'autoconsommation, de revente EDF OA. Beaucoup de chiffres, graphiques implicites. Ton positif "votre toiture peut produire de l'argent".
- **Persona** : Propriétaire maison, 35-60 ans, intéressé par l'indépendance énergétique

---

## 🎨 Design System (UNIQUE)

### Typographie
- **Headings** : `Montserrat` (bold, impactant, grand)
- **Body** : `PT Serif` (serif doux, journal scientifique)
- **Data** : `Roboto Mono`

### Palette
```css
--primary: #D97706;        /* Amber-600 — soleil */
--primary-light: #FFFBEB;  /* Amber-50 */
--secondary: #1E40AF;      /* Blue-800 — panneau/ciel */
--accent: #15803D;         /* Green-700 — écologie CTA */
--text: #1E1B18;           /* Warm dark */
--bg: #FEFCE8;             /* Yellow-50 — lumineux */
--card-bg: #FFFFFF;
```

### Layout Homepage
- **Hero** : Gradient sunrise amber→yellow→white en haut, image toiture avec panneaux solaires, titre "Produisez votre électricité" + compteur dynamique
- **Style** : Cards avec icône soleil en watermark, asymétriques (grande à gauche + 2 petites à droite)
- **Icônes** : Solar-specific custom SVG + Lucide
- **Section separators** : Rayons de soleil SVG convergents

### Style des composants
- **Cards** : `border-radius: 8px`, border-top 3px amber gradient, shadow-sm
- **Boutons CTA** : Rounded, fond green-700, icône soleil, hover brightness
- **Progress bars** : Pour montrer "rentabilité atteinte en X ans"
- **Footer** : Fond blue-900, étoiles subtiles en background pattern

---

## 📄 Template Page Ville (UNIQUE wording)

### Pattern titre H1
```
Panneaux solaires à {VILLE} — Rentabilité et installateurs {DEPT}
```

### Pattern intro
```
Installer des panneaux photovoltaïques à {VILLE} est rentable en {N_ANNEES} ans en moyenne. 
{VARIANTE_INTRO}. Un système de {PUISSANCE} kWc coûte entre {PRIX_MIN}€ et {PRIX_MAX}€ 
avant aides, avec une prime à l'autoconsommation de {PRIME}€.
```

Variantes :
1. "Avec {HEURES_SOLEIL}h d'ensoleillement/an, votre toiture à {VILLE} est un atout productif"
2. "Le tarif de rachat EDF OA à {TARIF}€/kWh sécurise votre investissement sur 20 ans"
3. "Les installateurs QualiPV du {DEPT_NOM} dimensionnent votre système au plus juste"
4. "Autoconsommation + revente du surplus = la combinaison la plus rentable en {ANNEE}"

### Pattern CTA : `Simuler ma production solaire à {VILLE}`

---

## ViteUnDevis : #37 | CPL 21.4€ | Rev/100 : 669€ | Taux 92%

## Structure
```
/                                  → Homepage (sunrise hero)
/devis                             → Widget #37
/panneau-solaire/[slug]            → Pages villes (35K+)
/guides + /guides/[slug]
/marques + /marques/[slug]
/annuaire + /annuaire/[slug]
/faq · /mentions-legales · /sitemap.xml + /sitemap/[id]
```

## Guides (8)
1. Prix panneaux solaires 2026 : 3, 6 et 9 kWc tout compris
2. Autoconsommation vs revente totale : simulation réaliste
3. Aides panneaux solaires : prime autoconsommation, TVA 10%
4. Rentabilité panneau solaire : payé en combien d'années ?
5. Toiture vs sol vs carport solaire : comparatif
6. Batterie stockage solaire : prix et quand c'est pertinent
7. Monocristallin vs polycristallin : quel panneau choisir ?
8. Démarches Enedis, mairie, EDF OA : guide étape par étape

## Marques : SunPower, Enphase, DualSun, Systovi, Q Cells, Trina Solar, Longi

## Maillage externe
- `cout-borne-recharge.fr` → "recharger sa voiture grâce au solaire"
- `cout-chauffage-energie.fr` → "production d'eau chaude solaire"
