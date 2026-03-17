export interface City {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    department_code: string;
    region: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    population?: number;
    department_info?: {
        code: string;
        name: string;
        region: string;
        aide_locale: string;
    };
}

export interface SolarConfig {
    slug: string;
    label: string;
    shortLabel: string;
    article: string;
    priceMin3kWc: number;
    priceMax3kWc: number;
    priceMin6kWc: number;
    priceMax6kWc: number;
    priceMin9kWc: number;
    priceMax9kWc: number;
    unit: string;
    cpl: number;
    icon: string;
    color: string;
    description: string;
    vudBoxId: string;
}
