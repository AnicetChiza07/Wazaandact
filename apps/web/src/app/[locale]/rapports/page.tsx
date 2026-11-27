import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import ReportsListing from "@/components/sections/ReportsListing";
import { reports } from "@/data/reports";

export const instant = false;

export default async function ReportsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "ReportsPage",
    });

    return (
        <>
            <PageHero
                image="/images/post-2.jpg"
                imageAlt=""
                currentPage={t("hero.breadcrumb")}
                title={t("hero.title")}
                accent={t("hero.accent")}
                description={t("hero.description")}
            />

            <ReportsListing reports={reports} locale={locale} />
        </>
    );
}