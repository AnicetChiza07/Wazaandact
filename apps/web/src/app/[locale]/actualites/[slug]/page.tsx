import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
    ArrowLeftIcon,
    ClockIcon,
} from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import ArticleShare from "@/components/sections/ArticleShare";
import { getAllPosts, getPostBySlug } from "@/data/posts";

export const instant = false;

function formatDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }));
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const t = await getTranslations({
        locale,
        namespace: "ArticlePage",
    });

    const paragraphs = post.content?.length
        ? post.content
        : [post.excerpt];

    return (
        <>
            <PageHero
                image={post.image}
                imageAlt={post.title}
                currentPage={t("breadcrumb")}
                title={post.title}
                accent=""
                description=""
                align="left"
                titleSize="compact"
                topContent={
                    <div className="flex flex-col items-start gap-4">
                        <Link
                            href={`/${locale}/actualites`}
                            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/85 transition-colors hover:text-primary"
                        >
                            <ArrowLeftIcon size={17} />
                            {t("backToNews")}
                        </Link>

                        <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-white/25 bg-ink/55 px-4 py-2.5 text-[13px] text-white/90 backdrop-blur-sm">
                            <span className="font-medium text-white">
                                {post.category}
                            </span>

                            <span
                                aria-hidden="true"
                                className="h-1 w-1 shrink-0 rounded-full bg-white/60"
                            />

                            <time dateTime={post.date}>
                                {formatDate(post.date, locale)}
                            </time>

                            <span className="inline-flex items-center gap-1.5">
                                <ClockIcon size={15} />
                                {t("readTime", {
                                    minutes: post.readMinutes,
                                })}
                            </span>
                        </div>
                    </div>
                }
            />

            <article className="section bg-white">
                <div className="container">
                    <div className="mx-auto max-w-[820px]">
                        <div className="space-y-6 text-[16px] leading-[1.85] text-slate-600">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-12 border-t border-slate-200 pt-6">
                            <ArticleShare
                                title={post.title}
                                copyLabel={t("copyLink")}
                                copiedLabel={t("copied")}
                                shareLabel={t("shareArticle")}
                            />
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}