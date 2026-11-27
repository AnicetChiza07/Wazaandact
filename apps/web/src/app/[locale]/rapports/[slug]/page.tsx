import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    DownloadSimpleIcon,
    FilePdfIcon,
} from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { getReportBySlug, reports } from "@/data/reports";

export const instant = false;

function formatDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
}

export function generateStaticParams() {
    return reports.map((report) => ({
        slug: report.slug,
    }));
}

export default async function ReportDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const report = getReportBySlug(slug);

    if (!report) {
        notFound();
    }

    const t = await getTranslations({
        locale,
        namespace: "ReportsPage",
    });

    const title = report.title[locale as "fr" | "en"];
    const summary = report.summary[locale as "fr" | "en"];

    return (
        <>
            <PageHero
                image="/images/post-2.jpg"
                imageAlt=""
                currentPage={t("hero.breadcrumb")}
                title={title}
                accent=""
                description=""
                align="left"
                titleSize="compact"
                topContent={
                    <div className="flex flex-col items-start gap-4">
                        <Link
                            href={`/${locale}/rapports`}
                            className="inline-flex items-center gap-2 text-[14px] font-medium text-white/85 transition-colors hover:text-primary"
                        >
                            <ArrowLeftIcon size={17} />
                            {t("backToReports")}
                        </Link>

                        <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-white/25 bg-ink/55 px-4 py-2.5 text-[13px] text-white/90 backdrop-blur-sm">
                            <span className="font-medium text-white">
                                {t(`categories.${report.category}`)}
                            </span>

                            <span
                                aria-hidden="true"
                                className="h-1 w-1 shrink-0 rounded-full bg-white/60"
                            />

                            <time dateTime={report.date}>
                                {formatDate(report.date, locale)}
                            </time>
                        </div>
                    </div>
                }
            />

            <section className="section bg-white">
                <div className="container">
                    <div className="mx-auto max-w-[1000px]">
                        {/* Résumé et téléchargement */}
                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                            <div>
                                <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-primary">
                                    {t("documentDetails")}
                                </span>

                                <h2 className="mt-3 font-display text-[clamp(24px,3vw,34px)] leading-tight text-ink">
                                    {t("aboutDocument")}
                                </h2>

                                <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                                    {summary}
                                </p>
                            </div>

                            <a
                                href={report.fileUrl}
                                download
                                className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                            >
                                {t("downloadPdf")}
                                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-y-[2px]">
                                    <DownloadSimpleIcon
                                        size={16}
                                        weight="bold"
                                    />
                                </span>
                            </a>
                        </div>

                        {/* Aperçu du PDF */}
                        <div className="mt-10 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 min-[481px]:px-7">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-ink">
                                        <FilePdfIcon size={20} />
                                    </span>

                                    <div>
                                        <h3 className="text-[14px] font-semibold text-ink">
                                            {t("previewTitle")}
                                        </h3>
                                        <p className="mt-0.5 text-[12px] text-slate-500">
                                            PDF
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={report.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors hover:text-primary"
                                >
                                    {t("openInNewTab")}
                                    <ArrowUpRightIcon size={15} />
                                </a>
                            </div>

                            <iframe
                                src={report.fileUrl}
                                title={title}
                                className="h-[70vh] min-h-[520px] w-full bg-white"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}