import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import NewsListing from "@/components/sections/NewsListing";
import { getAllPosts } from "@/data/posts";

export const instant = false;

export default async function NewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "NewsPage" });

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

            <NewsListing posts={getAllPosts()} locale={locale} />
        </>
    );
}