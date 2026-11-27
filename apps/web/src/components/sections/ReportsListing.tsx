"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    ArrowUpRightIcon,
    FileTextIcon,
    MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import type { Report } from "@/data/reports";

function formatDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
}

function normalize(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export default function ReportsListing({
    reports,
    locale,
}: {
    reports: Report[];
    locale: string;
}) {
    const t = useTranslations("ReportsPage");
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = Array.from(
        new Set(reports.map((report) => report.category)),
    );

    const filteredReports = useMemo(() => {
        const query = normalize(search);
        const currentLocale = locale === "fr" ? "fr" : "en";

        return reports.filter((report) => {
            const matchesCategory =
                activeCategory === "all" ||
                report.category === activeCategory;

            const matchesSearch =
                !query ||
                normalize(report.title[currentLocale]).includes(query) ||
                normalize(report.summary[currentLocale]).includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, locale, reports, search]);

    return (
        <section className="section bg-slate-50">
            <div className="container">
                {/* Recherche et catégories */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <label className="relative block min-w-0 flex-1 lg:max-w-[380px]">
                        <span className="sr-only">{t("searchLabel")}</span>
                        <MagnifyingGlassIcon
                            size={20}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={t("searchPlaceholder")}
                            className="h-[52px] w-full rounded-full border border-slate-200 bg-white pl-12 pr-5 text-[14px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                        />
                    </label>

                    <div
                        aria-label={t("categoriesLabel")}
                        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        <button
                            type="button"
                            aria-pressed={activeCategory === "all"}
                            onClick={() => setActiveCategory("all")}
                            className={`shrink-0 rounded-full border px-5 py-3 text-[13px] font-semibold transition-colors ${
                                activeCategory === "all"
                                    ? "border-ink bg-ink text-white"
                                    : "border-slate-200 bg-white text-ink hover:border-primary"
                            }`}
                        >
                            {t("all")}
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                aria-pressed={activeCategory === category}
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 rounded-full border px-5 py-3 text-[13px] font-semibold transition-colors ${
                                    activeCategory === category
                                        ? "border-ink bg-ink text-white"
                                        : "border-slate-200 bg-white text-ink hover:border-primary"
                                }`}
                            >
                                {t(`categories.${category}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cartes de documents */}
                {filteredReports.length > 0 ? (
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {filteredReports.map((report) => {
                            const currentLocale = locale === "fr" ? "fr" : "en";

                            return (
                                <article
                                    key={report.slug}
                                    className="flex min-h-[260px] flex-col rounded-[24px] border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-primary/60 min-[481px]:p-7"
                                >
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
                                        <span className="font-semibold text-primary">
                                            {t(`categories.${report.category}`)}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="h-1 w-1 shrink-0 rounded-full bg-slate-300"
                                        />

                                        <time
                                            dateTime={report.date}
                                            className="text-slate-500"
                                        >
                                            {formatDate(report.date, locale)}
                                        </time>
                                    </div>

                                    <h2 className="mt-4 font-display text-[clamp(20px,2vw,25px)] font-semibold leading-snug text-ink">
                                        {report.title[currentLocale]}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-slate-600">
                                        {report.summary[currentLocale]}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-ink">
                                            <FileTextIcon size={15} />
                                            PDF
                                        </span>

                                        <Link
                                            href={`/${locale}/rapports/${report.slug}`}
                                            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-ink transition-colors hover:text-primary"
                                        >
                                            {t("readMore")}
                                            <ArrowUpRightIcon
                                                size={17}
                                                weight="bold"
                                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <p className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 text-[15px] text-slate-600">
                        {t("empty")}
                    </p>
                )}
            </div>
        </section>
    );
}