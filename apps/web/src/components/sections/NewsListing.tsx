"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpRightIcon,
    ClockIcon,
} from "@phosphor-icons/react";
import type { Post } from "@/data/posts";

const POSTS_PER_PAGE = 6;

function formatDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
}

export default function NewsListing({
    posts,
    locale,
}: {
    posts: Post[];
    locale: string;
}) {
    const t = useTranslations("NewsPage");
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const sortedPosts = useMemo(
        () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
        [posts],
    );

    const featured = sortedPosts.find((post) => post.featured);
    const otherPosts = sortedPosts.filter(
        (post) => post.slug !== featured?.slug,
    );

    const categories = Array.from(
        new Set(otherPosts.map((post) => post.category)),
    );

    const filteredPosts =
        activeCategory === "all"
            ? otherPosts
            : otherPosts.filter((post) => post.category === activeCategory);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const visiblePosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE,
    );

    function selectCategory(category: string) {
        setActiveCategory(category);
        setCurrentPage(1);
    }

    return (
        <section className="section bg-white">
            <div className="container">
                {/* Article à la une, choisi dans les données */}
                {featured && (
                    <div>
                        <h2 className="mb-5 font-display text-[clamp(24px,3vw,32px)] text-ink">
                            {t("featuredHeading")}
                        </h2>

                        <Link
                            href={`/${locale}/actualites/${featured.slug}`}
                            className="group grid overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-colors hover:border-primary/60 md:grid-cols-2"
                        >
                            <div className="relative min-h-[260px] bg-slate-100 sm:min-h-[340px]">
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                            </div>

                            <div className="flex flex-col justify-center p-6 min-[481px]:p-8 lg:p-10">
                                <span className="w-fit rounded-full bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                                    {t("featured")}
                                </span>

                                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
                                    <span className="font-medium text-primary">
                                        {featured.category}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className="h-1 w-1 shrink-0 rounded-full bg-slate-300"
                                    />

                                    <time
                                        dateTime={featured.date}
                                        className="text-slate-500"
                                    >
                                        {formatDate(featured.date, locale)}
                                    </time>

                                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                                        <ClockIcon size={15} />
                                        {t("readTime", {
                                            minutes: featured.readMinutes,
                                        })}
                                    </span>
                                </div>

                                <h3 className="mt-4 font-display text-[clamp(23px,2.5vw,34px)] font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
                                    {featured.title}
                                </h3>

                                <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-slate-600">
                                    {featured.excerpt}
                                </p>

                                <span className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-ink">
                                    {t("readArticle")}
                                    <ArrowUpRightIcon
                                        size={17}
                                        weight="bold"
                                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Séparation entre l’article à la une et les autres actualités */}
                {featured && (
                    <div
                        aria-hidden="true"
                        className="mt-12 border-t border-slate-200"
                    />
                )}

                {/* Filtres par catégorie */}
                <div
                    aria-label={t("categoriesLabel")}
                    className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    <button
                        type="button"
                        aria-pressed={activeCategory === "all"}
                        onClick={() => selectCategory("all")}
                        className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                            activeCategory === "all"
                                ? "border-primary bg-primary text-ink"
                                : "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-ink"
                        }`}
                    >
                        {t("all")}
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            aria-pressed={activeCategory === category}
                            onClick={() => selectCategory(category)}
                            className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                                activeCategory === category
                                    ? "border-primary bg-primary text-ink"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-ink"
                        }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grille des autres articles */}
                <div className="mt-10">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-primary">
                                {t("latestBadge")}
                            </span>
                            <h2 className="mt-2 font-display text-[clamp(26px,3.5vw,40px)] leading-tight text-ink">
                                {t("latestTitle")}
                            </h2>
                        </div>

                        <p className="text-[14px] text-slate-500">
                            {t("articleCount", {
                                count: filteredPosts.length,
                            })}
                        </p>
                    </div>

                    {visiblePosts.length > 0 ? (
                        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {visiblePosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/${locale}/actualites/${post.slug}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white transition-colors hover:border-primary/60"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
                                                {post.category}
                                            </span>

                                            <span
                                                aria-hidden="true"
                                                className="h-1 w-1 shrink-0 rounded-full bg-slate-300"
                                            />

                                            <time
                                                dateTime={post.date}
                                                className="text-[12px] text-slate-500"
                                            >
                                                {formatDate(post.date, locale)}
                                            </time>
                                        </div>

                                        <h3 className="mt-3 line-clamp-2 font-display text-[21px] font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
                                            {post.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-slate-600">
                                            {post.excerpt}
                                        </p>

                                        <span className="mt-auto flex items-center justify-between gap-3 pt-5">
                                            <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-500">
                                                <ClockIcon size={15} />
                                                {t("readTime", {
                                                    minutes: post.readMinutes,
                                                })}
                                            </span>

                                            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                                                {t("readArticle")}
                                                <ArrowUpRightIcon
                                                    size={15}
                                                    weight="bold"
                                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                />
                                            </span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-7 rounded-[20px] border border-slate-200 bg-slate-50 p-6 text-[15px] text-slate-600">
                            {t("empty")}
                        </p>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav
                            aria-label={t("paginationLabel")}
                            className="mt-10 flex items-center justify-center gap-2"
                        >
                            <button
                                type="button"
                                aria-label={t("previousPage")}
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(1, page - 1),
                                    )
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeftIcon size={17} />
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    aria-current={
                                        currentPage === page ? "page" : undefined
                                    }
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[14px] font-medium transition-colors ${
                                        currentPage === page
                                            ? "border-primary bg-primary text-ink"
                                            : "border-slate-200 text-slate-600 hover:border-primary hover:text-ink"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                aria-label={t("nextPage")}
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1),
                                    )
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowRightIcon size={17} />
                            </button>
                        </nav>
                    )}
                </div>
            </div>
        </section>
    );
}