export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCityFromSlug, getAllCitySlugs, generateCityMetadata } from "@/lib/seo-utils";
import { SolarCityPage } from "@/components/psea/SolarCityPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) return {};
    return generateCityMetadata(city);
}

export function generateStaticParams() {
    return getAllCitySlugs().slice(0, 500).map(slug => ({ slug }));
}

export default async function PanneauSolairePage({ params }: Props) {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) notFound();
    return <SolarCityPage city={city} />;
}
