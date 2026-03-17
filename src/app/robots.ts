import { MetadataRoute } from 'next';
import { getAllDepartments } from '@/lib/cities';

const BASE_URL = 'https://www.cout-panneau-photovoltaique.fr';

export default function robots(): MetadataRoute.Robots {
    const departments = getAllDepartments();

    const sitemaps = [
        `${BASE_URL}/sitemap/0.xml`,
        ...departments.map((_, i) => `${BASE_URL}/sitemap/${i + 1}.xml`),
    ];

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/api/'],
            },
        ],
        sitemap: sitemaps,
    };
}
