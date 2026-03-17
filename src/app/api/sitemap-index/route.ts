import { getAllDepartments } from '@/lib/cities';
import { NextResponse } from 'next/server';

export async function GET() {
    const BASE_URL = 'https://www.cout-panneau-photovoltaique.fr';
    const departments = getAllDepartments();

    const sitemapEntries = [
        `    <sitemap><loc>${BASE_URL}/sitemap/0.xml</loc></sitemap>`,
        ...departments.map((_, i) =>
            `    <sitemap><loc>${BASE_URL}/sitemap/${i + 1}.xml</loc></sitemap>`
        ),
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
