"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    MapPinLineIcon,
} from "@phosphor-icons/react";
import { achievements } from "@/data/achievements";

const GAP = 20;

export default function Achievements() {
    const t = useTranslations("Achievements");
    const trackRef = useRef<HTMLUListElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) {
            return;
        }
        const max = el.scrollWidth - el.clientWidth;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft < max - 4);
    }, []);

    useEffect(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [update]);

    const scrollByCard = (direction: 1 | -1) => {
        const el = trackRef.current;
        if (!el) {
            return;
        }
        const card = el.querySelector("li");
        const step = (card?.getBoundingClientRect().width ?? el.clientWidth) + GAP;
        el.scrollBy({ left: step * direction, behavior: "smooth" });
    };

    const arrowClass = (visible: boolean) =>
        `absolute top-1/2 z-10 flex h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-primary transition-all duration-300 hover:bg-primary hover:text-white min-[481px]:h-[56px] min-[481px]:w-[56px] ${
            visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`;

    return (
        <section className="section bg-slate-50">
            <div className="container">
                {/* En-tête */}
                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>
                    <h2 className="mt-5 max-w-[720px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>
                </div>

                {/* Carrousel : 3 cartes sur grand écran, 2 sur tablette, 1 sur mobile */}
                <div className="relative mt-10 min-[481px]:mt-14">
                    <button
                        type="button"
                        onClick={() => scrollByCard(-1)}
                        aria-label={t("prev")}
                        tabIndex={canPrev ? 0 : -1}
                        className={`${arrowClass(canPrev)} left-3 min-[481px]:left-4`}
                    >
                        <ArrowLeftIcon size={22} weight="bold" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard(1)}
                        aria-label={t("next")}
                        tabIndex={canNext ? 0 : -1}
                        className={`${arrowClass(canNext)} right-3 min-[481px]:right-4`}
                    >
                        <ArrowRightIcon size={22} weight="bold" />
                    </button>

                    <ul
                        ref={trackRef}
                        onScroll={update}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {achievements.map((item, index) => (
                            <li
                                key={item.id}
                                className="group relative h-[420px] shrink-0 basis-full snap-start overflow-hidden rounded-[24px] bg-ink min-[481px]:h-[460px] md:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-40px)/3)]"
                            >
                                <Image
                                    src={item.image}
                                    alt={t(`items.${item.id}.title`)}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    priority={index < 3}
                                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                />

                                {/* Voiles */}
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent" />

                                {/* Numéro */}
                                <span className="absolute right-5 top-5 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-primary text-[15px] font-medium text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Texte */}
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <span className="inline-flex items-center gap-2 text-[13px] text-white/85">
                                        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-white">
                                            <MapPinLineIcon size={15} />
                                        </span>
                                        {t(`items.${item.id}.location`)}
                                    </span>

                                    <h3 className="mt-2 text-[clamp(18px,1.6vw,21px)] leading-[1.25] text-white">
                                        {t(`items.${item.id}.title`)}
                                    </h3>

                                    {/* Description : apparaît au survol (bureau) */}
                                    <div className="hidden grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-500 lg:grid lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                                        <p className="overflow-hidden text-[14px] leading-relaxed text-white/75">
                                            <span className="block pt-2">
                                                {t(`items.${item.id}.description`)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}