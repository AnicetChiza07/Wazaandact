"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
    type Icon,
    CalendarCheckIcon,
    GraduationCapIcon,
    HammerIcon,
    HandHeartIcon,
    MapPinAreaIcon,
    UsersThreeIcon,
} from "@phosphor-icons/react";
import { stats } from "@/data/stats";

/** Icône de chaque statistique, selon son identifiant (UsersThree par défaut) */
const icons: Record<string, Icon> = {
    youth: GraduationCapIcon,
    trained: HammerIcon,
    neighborhoods: MapPinAreaIcon,
    projects: HandHeartIcon,
    years: CalendarCheckIcon,
};

const DURATION_MS = 1800;

/** Compte de 0 à `target` une seule fois, quand l'élément devient visible */
function useCountUp(target: number) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        // Mouvement réduit : le chiffre final s'affiche d'un coup (durée quasi nulle)
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = reduced ? 1 : DURATION_MS;

        let frame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }
                observer.disconnect();

                const start = performance.now();
                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4); // ralentit à la fin
                    setValue(Math.round(target * eased));
                    if (progress < 1) {
                        frame = requestAnimationFrame(tick);
                    }
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [target]);

    return { ref, value };
}

function StatItem({
    id,
    target,
    suffix,
    label,
    locale,
    highlight,
}: {
    id: string;
    target: number;
    suffix?: string;
    label: string;
    locale: string;
    highlight?: boolean;
}) {
    const { ref, value } = useCountUp(target);
    const IconComponent = icons[id] ?? UsersThreeIcon;

    return (
        <li className={`flex w-full items-center gap-3.5 rounded-[20px] border px-4 py-3.5 transition-colors duration-300 ${
                highlight
                    ? "border-primary bg-primary"
                    : "border-white/20 hover:border-primary/70"
            } min-[481px]:w-auto min-[481px]:min-w-[270px] min-[481px]:pr-6`}>
            <span className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-white ${
                    highlight ? "bg-ink" : "bg-primary"
                }`}>
                <IconComponent size={22} />
            </span>

            <span className="min-w-0">
                <span
                    ref={ref}
                    aria-label={`${new Intl.NumberFormat(locale).format(target)}${suffix ?? ""}`}
                    className={`block font-sans text-[clamp(24px,2.4vw,30px)] font-semibold leading-none tabular-nums ${
                        highlight
                            ? "text-ink"
                            : "bg-linear-to-r from-primary to-white bg-clip-text text-transparent"
                    }`}
                >
                    {new Intl.NumberFormat(locale).format(value)}
                    {suffix}
                </span>
                <span className={`mt-1.5 block text-[14px] leading-snug first-letter:uppercase min-[481px]:whitespace-nowrap ${
                        highlight ? "text-ink/80" : "text-white/70"
                    }`}>
                    {label}
                </span>
            </span>
        </li>
    );
}

export default function Stats() {
    const t = useTranslations("Stats");
    const locale = useLocale();
    // 5 statistiques : 3 en haut, 2 en bas. Sinon, deux rangées équilibrées.
    const topCount = stats.length >= 5 ? 3 : Math.ceil(stats.length / 2);

    return (
        <section className="section relative overflow-hidden bg-linear-to-br from-ink via-ink to-ink-soft">
            {/* Décor : halo vert + cercles */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-primary/25 blur-[130px]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-48 -left-48 h-[460px] w-[460px] rounded-full border border-dashed border-white/10"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-28 h-[280px] w-[280px] rounded-full border border-white/10"
            />

            <div className="container relative">
                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-white">
                        {t("badge")}
                    </span>
                    <h2 className="mt-5 max-w-[680px] text-[clamp(26px,3.6vw,44px)] leading-[1.12] text-white">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-white bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>
                </div>

                <div className="mt-12 flex flex-col gap-4 min-[481px]:mt-16">
                    {[stats.slice(0, topCount), stats.slice(topCount)].map(
                        (row, rowIndex) =>
                            row.length > 0 && (
                                <ul
                                    key={rowIndex}
                                    className="flex flex-col items-stretch justify-center gap-4 min-[481px]:flex-row min-[481px]:flex-wrap min-[481px]:items-center"
                                >
                                    {row.map((stat) => (
                                        <StatItem
                                            key={stat.id}
                                            id={stat.id}
                                            target={stat.value}
                                            suffix={stat.suffix}
                                            label={t(`items.${stat.id}`)}
                                            locale={locale}
                                            highlight={stat.highlight}
                                        />
                                    ))}
                                </ul>
                            ),
                    )}
                </div>
            </div>
        </section>
    );
}