import { City } from "@/types";
import { SOLAR_CONFIG } from "@/data/solar-config";

export function SchemaOrg({ city }: { city: City }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Installateurs panneaux solaires à ${city.name}`,
        "description": `Installation de panneaux solaires photovoltaïques à ${city.name} (${city.zip}). Comparez les devis d'installateurs QualiPV du ${city.department_name}.`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.name,
            "postalCode": city.zip,
            "addressRegion": city.department_name,
            "addressCountry": "FR",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": city.coordinates.lat,
            "longitude": city.coordinates.lng,
        },
        "priceRange": `${SOLAR_CONFIG.priceMin3kWc}€ - ${SOLAR_CONFIG.priceMax9kWc}€`,
        "areaServed": city.department_name,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
