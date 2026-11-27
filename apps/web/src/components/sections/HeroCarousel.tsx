"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const AUTOPLAY_MS = 6000;

// Page à créer : /[locale]/don
const DONATE_HREF = "/don";

const slides = [
    { image: "/hero/hero-1.jpg", href: "/a-propos" },
    { image: "/hero/hero-2.jpg", href: "/a-propos" },
    { image: "/hero/hero-3.jpg", href: "/contact" },
];

export default function HeroCarousel({ locale }: { locale: string }) {
    const t = useTranslations("Hero");
    const [active, setActive] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const pointerStartX = useRef<number | null>(null);

    const paused = reducedMotion || isHovered || isHidden;
    const donateLabel = t.has("donate") ? t("donate") : "Faire un don";

    const goTo = (index: number) =>
        setActive((index + slides.length) % slides.length);

    useEffect(() => {
        if (paused) {
            return;
        }

        const timer = setTimeout(() => {
            setActive((current) => (current + 1) % slides.length);
        }, AUTOPLAY_MS);

        return () => clearTimeout(timer);
    }, [active, paused]);

    useEffect(() => {
        const handleVisibility = () => setIsHidden(document.hidden);
        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const handleMotion = () => setReducedMotion(motionQuery.matches);

        handleMotion();
        document.addEventListener("visibilitychange", handleVisibility);
        motionQuery.addEventListener("change", handleMotion);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            motionQuery.removeEventListener("change", handleMotion);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "ArrowLeft") {
            goTo(active - 1);
        }

        if (event.key === "ArrowRight") {
            goTo(active + 1);
        }
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
        pointerStartX.current = event.clientX;
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
        if (pointerStartX.current === null) {
            return;
        }

        const delta = event.clientX - pointerStartX.current;
        pointerStartX.current = null;

        if (Math.abs(delta) > 50) {
            goTo(delta < 0 ? active + 1 : active - 1);
        }
    };

    return (
        <section
            aria-roledescription="carousel"
            aria-label={t("region")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex h-[100svh] min-h-[640px] touch-pan-y items-center justify-center overflow-hidden bg-ink focus-visible:outline-white"
        >
            {/* Images */}
            {slides.map((slide, index) => (
                <div
                    key={slide.image}
                    aria-hidden={index !== active}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === active ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={t(`slides.${index}.alt`)}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className={`object-cover ${
                            index === active ? "animate-hero-kenburns" : ""
                        }`}
                    />
                </div>
            ))}

            {/* Voile : noir profond + teinte verte de la marque */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/45 to-black/85" />
            <div className="pointer-events-none absolute inset-0 bg-primary/25 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/30 to-transparent" />

            {/* Contenu */}
            <div className="container relative z-10 flex flex-col items-center pb-28 pt-28 text-center">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        aria-hidden={index !== active}
                        className={`flex-col items-center gap-5 transition-opacity duration-700 ${
                            index === active
                                ? "flex"
                                : "pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 opacity-0 md:flex"
                        }`}
                    >
                        {index === active && (
                            <>
                                <span
                                    className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-neutral-400/50 bg-black/40 px-4 py-2 text-[12px] font-normal tracking-[0.14em] text-white backdrop-blur-md"
                                    style={{ animationDelay: "80ms" }}
                                >
                                    <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-white" />
                                    {t(`slides.${index}.badge`)}
                                </span>

                                <h1
                                    className="animate-fade-up max-w-[820px] text-[clamp(28px,4vw,50px)] font-semibold leading-[1.15] tracking-[-0.01em] text-white"
                                    style={{ animationDelay: "180ms" }}
                                >
                                    {t(`slides.${index}.title`)}{" "}
                                    <span className="bg-linear-to-r from-primary to-white bg-clip-text text-transparent not-italic">
                                        {t(`slides.${index}.accent`)}
                                    </span>{" "}
                                    {t(`slides.${index}.titleEnd`)}
                                </h1>

                                <span
                                    className="animate-fade-up h-[3px] w-16 rounded-full bg-primary"
                                    style={{ animationDelay: "250ms" }}
                                />

                                <p
                                    className="animate-fade-up max-w-[600px] text-[15px] leading-relaxed text-white/85 min-[481px]:text-[17px]"
                                    style={{ animationDelay: "320ms" }}
                                >
                                    {t(`slides.${index}.description`)}
                                </p>

                                <div
                                    className="animate-fade-up mt-3 flex flex-col items-center gap-3 sm:flex-row"
                                    style={{ animationDelay: "440ms" }}
                                >
                                    {/* Bouton Faire un don */}
                                    <Link
                                        href={`/${locale}${DONATE_HREF}`}
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-[14px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110 focus-visible:outline-white"
                                    >
                                        {donateLabel}
                                    </Link>

                                    {/* Bouton secondaire */}
                                    <Link
                                        href={`/${locale}${slide.href}`}
                                        className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-[14px] text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-primary hover:bg-white/20 focus-visible:outline-white"
                                    >
                                        {t(`slides.${index}.cta`)}
                                        <ArrowRightIcon
                                            size={16}
                                            weight="bold"
                                            className="transition-transform duration-300 group-hover:translate-x-[2px]"
                                        />
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Contrôles du carrousel */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
                <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    aria-label={t("prev")}
                    className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-white/85 focus-visible:outline-white"
                >
                    <ArrowLeftIcon size={18} weight="bold" />
                </button>

                <div className="flex items-center gap-2">
                    {slides.map((slide, index) => {
                        const isCurrent = index === active;

                        return (
                            <button
                                key={slide.image}
                                type="button"
                                onClick={() => goTo(index)}
                                aria-label={t("goTo", { number: index + 1 })}
                                aria-current={isCurrent ? "true" : undefined}
                                className={`group flex h-[20px] cursor-pointer items-center focus-visible:outline-white ${
                                    isCurrent ? "w-[48px]" : "w-[24px]"
                                }`}
                            >
                                <span
                                    className={`relative h-[3px] w-full overflow-hidden rounded-full ${
                                        isCurrent
                                            ? "bg-white/40"
                                            : "bg-white/25"
                                    }`}
                                >
                                    {isCurrent && (
                                        <span
                                            key={active}
                                            className="absolute inset-y-0 left-0 rounded-full bg-white"
                                            style={{
                                                animation: `hero-progress ${AUTOPLAY_MS}ms linear both`,
                                                animationPlayState: paused
                                                    ? "paused"
                                                    : "running",
                                            }}
                                        />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    aria-label={t("next")}
                    className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-white/85 focus-visible:outline-white"
                >
                    <ArrowRightIcon size={18} weight="bold" />
                </button>
            </div>

            {/* Compteur */}
            <div className="absolute bottom-8 right-8 z-20 hidden items-baseline gap-1 text-white md:flex">
                <span className="font-display text-[22px] font-semibold text-primary">
                    {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] text-white/60">
                    / {String(slides.length).padStart(2, "0")}
                </span>
            </div>
        </section>
    );
}