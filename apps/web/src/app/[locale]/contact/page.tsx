import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import ContactDetails from "@/components/sections/ContactDetails";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "ContactPage",
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

            <ContactDetails />
        </>
    );
}