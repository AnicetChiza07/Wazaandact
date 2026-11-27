"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";

const milestones = [
    "foundation",
    "notarizedAct",
    "provincialRecognition",
    "liaisonOffice",
] as const;

type MilestoneId = (typeof milestones)[number];

function MilestoneCard({
    id,
    highlighted,
}: {
    id: MilestoneId;
    highlighted: boolean;
}) {
    const t = useTranslations("HistoryTimeline");

    return (
        <article
            className={`group w-full rounded-[20px] border p-5 transition-colors duration-300 ${
                highlighted
                    ? "border-primary/40 bg-primary/5"
                    : "border-slate-200 bg-white"
            }`}
        >
            <h3 className="font-display text-[19px] font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
                {t(`items.${id}.title`)}
            </h3>

            <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                {t(`items.${id}.description`)}
            </p>
        </article>
    );
}

export default function HistoryTimeline() {
    const t = useTranslations("HistoryTimeline");
    const trackRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [progress, setProgress] = useState(0);

    const update = useCallback(() => {
        const element = trackRef.current;

        if (!element) {
            return;
        }

        const maxScroll = element.scrollWidth - element.clientWidth;
        const currentScroll = element.scrollLeft;

        setCanPrev(currentScroll > 4);
        setCanNext(currentScroll < maxScroll - 4);
        setProgress(
            maxScroll > 0
                ? Math.min((currentScroll / maxScroll) * 100, 100)
                : 0,
        );
    }, []);

    useEffect(() => {
        const element = trackRef.current;

        if (!element) {
            return;
        }

        let frame = 0;

        const scheduleUpdate = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        const observer = new ResizeObserver(scheduleUpdate);

        observer.observe(element);
        window.addEventListener("resize", scheduleUpdate);

        scheduleUpdate();

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", scheduleUpdate);
            cancelAnimationFrame(frame);
        };
    }, [update]);

    const scrollByMilestone = (direction: -1 | 1) => {
        const element = trackRef.current;

        if (!element) {
            return;
        }

        const card = element.querySelector<HTMLElement>(
            "[data-timeline-card]",
        );
        const step = (card?.getBoundingClientRect().width ?? 300) + 24;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        element.scrollBy({
            left: step * direction,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <section className="section overflow-hidden bg-white">
            <div className="container">
                <div className="flex flex-col gap-6 min-[481px]:flex-row min-[481px]:items-end min-[481px]:justify-between">
                    <div>
                        <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                            {t("badge")}
                        </span>

                        <h2 className="mt-5 max-w-[720px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                            {t("title")}{" "}
                            <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                                {t("accent")}
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[660px] text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                            {t("description")}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() => scrollByMilestone(-1)}
                            disabled={!canPrev}
                            aria-label={t("previous")}
                            className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-slate-300 text-ink transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-35"
                        >
                            <ArrowLeftIcon size={19} weight="bold" />
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollByMilestone(1)}
                            disabled={!canNext}
                            aria-label={t("next")}
                            className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full bg-primary text-ink transition-colors hover:brightness-110 disabled:pointer-events-none disabled:opacity-35"
                        >
                            <ArrowRightIcon size={19} weight="bold" />
                        </button>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    onScroll={update}
                    className="mt-8 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    <ol className="relative flex h-[470px] w-max min-w-full gap-6 lg:h-[560px]">
                        {/* Ligne de la frise */}
                        <span
                            aria-hidden="true"
                            className="absolute left-[140px] right-[140px] top-[calc(50%-1px)] h-[2px] bg-slate-200 lg:left-[160px] lg:right-[160px]"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute left-[140px] top-[calc(50%-1px)] h-[2px] bg-primary transition-[width] duration-300 lg:left-[160px]"
                            style={{ width: `${progress}%` }}
                        />

                        {milestones.map((id, index) => {
                            const isAbove = index % 2 === 0;
                            const isFirst = index === 0;

                            return (
                                <li
                                    key={id}
                                    data-timeline-card
                                    className="group relative grid h-full w-[280px] shrink-0 grid-rows-[1fr_76px_0fr] lg:w-[320px] lg:grid-rows-[1fr_84px_1fr]"
                                >
                                    {/* Mobile : toutes les cartes au-dessus de la ligne.
                                        Desktop : les cartes alternent en zigzag. */}
                                    <div
                                        className={`row-start-1 flex items-end pb-4 ${
                                            isAbove ? "" : "lg:hidden"
                                        }`}
                                    >
                                        <MilestoneCard
                                            id={id}
                                            highlighted={isFirst}
                                        />
                                    </div>

                                    {!isAbove && (
                                        <div className="row-start-3 hidden items-start pt-4 lg:flex">
                                            <MilestoneCard
                                                id={id}
                                                highlighted={false}
                                            />
                                        </div>
                                    )}

                                    {/* Repère et trait vertical */}
                                    <div className="relative row-start-2 flex items-center justify-center">
                                        <span
                                            aria-hidden="true"
                                            className={`absolute left-1/2 w-px -translate-x-1/2 bg-slate-300 ${
                                                isAbove
                                                    ? "top-0 h-1/2"
                                                    : "top-0 h-1/2 lg:top-1/2 lg:h-1/2"
                                            }`}
                                        />

                                        <span
                                            className={`relative z-10 flex shrink-0 items-center justify-center whitespace-pre-line rounded-full text-center font-semibold leading-tight ${
                                                isFirst
                                                    ? "h-[76px] w-[76px] border-[3px] border-primary bg-primary px-2 text-[11px] text-ink lg:h-[84px] lg:w-[84px]"
                                                    : "h-[62px] w-[62px] border-2 border-primary bg-white px-1 text-[11px] text-ink"
                                            }`}
                                        >
                                            {t(`items.${id}.date`)}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}