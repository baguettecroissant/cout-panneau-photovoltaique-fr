export interface Guide {
    id: number;
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    category: GuideCategory;
    readTime: string;
    updatedAt: string;
    excerpt: string;
    heroImage?: string;
    heroAlt?: string;
    content: string;
}

export type GuideCategory =
    | 'prix'
    | 'autoconsommation'
    | 'aides'
    | 'rentabilite'
    | 'installation'
    | 'batterie'
    | 'technologie'
    | 'demarches';

export const GUIDE_CATEGORIES: Record<GuideCategory, { label: string; emoji: string; color: string }> = {
    prix: { label: 'Prix', emoji: '💰', color: 'amber' },
    autoconsommation: { label: 'Autoconsommation', emoji: '🔋', color: 'green' },
    aides: { label: 'Aides & Primes', emoji: '🏛️', color: 'blue' },
    rentabilite: { label: 'Rentabilité', emoji: '📊', color: 'emerald' },
    installation: { label: 'Installation', emoji: '🏠', color: 'orange' },
    batterie: { label: 'Stockage', emoji: '🔌', color: 'purple' },
    technologie: { label: 'Technologie', emoji: '⚡', color: 'cyan' },
    demarches: { label: 'Démarches', emoji: '📋', color: 'slate' },
};
