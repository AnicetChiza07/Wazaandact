import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import AboutStory from "@/components/sections/AboutStory";
import MissionVision from "@/components/sections/MissionVision";
import AreasOfIntervention from "@/components/sections/AreasOfIntervention";
import Stats from "@/components/sections/Stats";
import HistoryTimeline from "@/components/sections/HistoryTimeline";
import DonationCta from "@/components/sections/DonationCta";
import Parteners from "@/components/sections/Partners";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });

    return (
        <>
            <PageHero
                image="/images/formation.jpg"
                imageAlt=""
                currentPage={t("hero.breadcrumb")}
                title={t("hero.title")}
                accent={t("hero.accent")}
                description={t("hero.description")}
            />

            <AboutStory />
            <MissionVision />
            <AreasOfIntervention />
            <Stats />
            <HistoryTimeline />
            <DonationCta locale={locale} />
            <Parteners locale={locale} />
        </>
    );
}