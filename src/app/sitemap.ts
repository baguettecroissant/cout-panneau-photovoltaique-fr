import { MetadataRoute } from 'next';
import { getAllDepartments, getCitiesByDepartment } from '@/lib/cities';
import { guides } from '@/data/guides';
import { brands } from '@/data/brands';

const BASE_URL = 'https://www.cout-panneau-photovoltaique.fr';

export async function generateSitemaps() {
    const departments = getAllDepartments();
    return [
        { id: 0 },
        ...departments.map((_, i) => ({ id: i + 1 })),
    ];
}

export default async function sitemap(props: {
    id: Promise<string> | string | number;
}): Promise<MetadataRoute.Sitemap> {
    const rawId = await Promise.resolve(props.id);
    const id = Number(rawId);
    const departments = getAllDepartments();

    if (id === 0) {
        const staticPages: MetadataRoute.Sitemap = [
            { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
            { url: `${BASE_URL}/devis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
            { url: `${BASE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
            { url: `${BASE_URL}/marques`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
            { url: `${BASE_URL}/annuaire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
            { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
            { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        ];

        const guidePages: MetadataRoute.Sitemap = guides.map(g => ({
            url: `${BASE_URL}/guides/${g.slug}`,
            lastModified: new Date(g.updatedAt),
            changeFrequency: 'monthly',
            priority: 0.8,
        }));

        const brandPages: MetadataRoute.Sitemap = brands.map(b => ({
            url: `${BASE_URL}/marques/${b.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        const deptPages: MetadataRoute.Sitemap = departments
            .filter(d => d && d.code && d.name)
            .map(d => ({
                url: `${BASE_URL}/annuaire/${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }));

        return [...staticPages, ...guidePages, ...brandPages, ...deptPages];
    }

    // Department-based city sitemap
    const deptIndex = id - 1;
    const dept = departments[deptIndex];

    if (!dept || !dept.code) return [];

    const deptCities = getCitiesByDepartment(dept.code);
    const sortedCities = [...deptCities].sort(
        (a, b) => (b.population || 0) - (a.population || 0)
    );

    return sortedCities.map(city => ({
        url: `${BASE_URL}/panneau-solaire/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: (city.population || 0) > 50000 ? 0.6 : (city.population || 0) > 10000 ? 0.5 : 0.4,
    }));
}
