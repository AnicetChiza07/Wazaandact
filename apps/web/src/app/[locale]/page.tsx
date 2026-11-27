import { getTranslations } from "next-intl/server";
import HeroCarousel from "@/components/sections/HeroCarousel";
import Marquee from "@/components/sections/Marquee";
import AboutIntro from "@/components/sections/AboutIntro";
import MissionVision from "@/components/sections/MissionVision";
import Stats from "@/components/sections/Stats";
import Achievements from "@/components/sections/Achievements";
import Gallery from "@/components/sections/Gallery";
import DonationCta from "@/components/sections/DonationCta";
import BlogPreview from "@/components/sections/BlogPreview";
import { getLatestPosts } from "@/data/posts";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";

export const instant = false;

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Home" });

    return (
        <>
            <HeroCarousel locale={locale} />
            <Marquee />
            <AboutIntro locale={locale} />
            <MissionVision />
            <Stats />
            <Achievements />
            <Gallery />
            <DonationCta locale={locale} />
            <BlogPreview locale={locale} posts={getLatestPosts(3)} />
            <Testimonials />
            <Partners locale={locale} />
        </>
    );
}