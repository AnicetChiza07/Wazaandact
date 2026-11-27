import { getTranslations } from "next-intl/server";
import {
    ArrowRightIcon,
    PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/sections/PageHero";
import DonationMethods from "@/components/sections/DonationMethods";
import DonationFaq from "@/components/sections/DonationFaq";

export default async function DonationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "DonationPage",
    });

    return (
        <>
            <PageHero
                image="/images/kit.jpg"
                imageAlt=""
                currentPage={t("hero.breadcrumb")}
                title={t("hero.title")}
                accent={t("hero.accent")}
                description={t("hero.description")}
            />

            <DonationMethods />
            <DonationFaq />
        </>
    );
}