"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { gallery } from "@/data/gallery";

/** Nombre de cartes visibles de chaque côté de la carte centrale */
const VISIBLE_SIDE = 2;

/**
 * Réglages selon la distance à l'image active.
 * x : décalage horizontal (en % de la largeur de la carte), scale : taille,
 * blur : flou en px, veil : voile sombre, tilt : inclinaison en degrés,
 * inset : hauteur retirée en haut ET en bas, en % (les cartes lointaines sont moins hautes).
 */
const LOOK = [
    { x: 0, scale: 1, blur: 0, veil: 0, tilt: 0, inset: 0 },
    { x: 40, scale: 0.94, blur: 0, veil: 0.15, tilt: 12, inset: 5 },
    { x: 72, scale: 0.88, blur: 3, veil: 0.3, tilt: 16, inset: 9 },
] as const;

/** Délai entre deux images (défilement automatique) */
const AUTOPLAY_MS = 5000;

export default function Gallery() {
    const t = useTranslations("Gallery");
    const total = gallery.length;
    const [active, setActive] = useState(Math.floor(total / 2));
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const pointerStartX = useRef<number | null>(null);

    const paused = isHovered || isHidden;

    // Défilement automatique : pause au survol et quand l'onglet est caché
    useEffect(() => {
        if (paused) {
            return;
        }
        const timer = setTimeout(() => {
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!reduced) {
                setActive((value) => (value + 1) % total);
            }
        }, AUTOPLAY_MS);
        return () => clearTimeout(timer);
    }, [active, paused, total]);

    useEffect(() => {
        const handleVisibility = () => setIsHidden(document.hidden);
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    const goTo = (index: number) => setActive((index + total) % total);

    /** Position de la carte par rapport au centre, en boucle (ex. -3 … +3 pour 7 images) */
    const offsetOf = (index: number) => {
        let offset = (index - active) % total;
        if (offset > total / 2) {
            offset -= total;
        }
        if (offset < -total / 2) {
            offset += total;
        }
        return offset;
    };

    const current = gallery[active];
    const captionKey = `items.${current.id}`;
    const hasCaption = t.has(`${captionKey}.title`);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "ArrowLeft") {
            goTo(active - 1);
        }
        if (event.key === "ArrowRight") {
            goTo(active + 1);
        }
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
        <section className="section overflow-hidden bg-white">
            <div className="container">
                {/* En-tête */}
                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>
                    <h2 className="mt-5 max-w-[680px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>

                    {/* Légende de l'image active (facultative) */}
                    <div className="mt-6 min-h-[52px]" aria-live="polite">
                        {hasCaption && (
                            <div key={current.id} className="animate-fade-up">
                                <p className="font-display text-[20px] font-semibold leading-tight text-ink">
                                    {t(`${captionKey}.title`)}
                                </p>
                                {t.has(`${captionKey}.place`) && (
                                    <p className="mt-1 text-[14px] text-slate-500">
                                        {t(`${captionKey}.place`)}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scène 3D, avec fondu sur les côtés comme le marquee */}
            <div
                className="mx-auto mt-4 max-w-[1200px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                }}
            >
            <div
                role="group"
                aria-roledescription="carousel"
                aria-label={t("title")}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onPointerDown={(event) => {
                    pointerStartX.current = event.clientX;
                }}
                onPointerUp={handlePointerUp}
                className="relative h-[330px] touch-pan-y select-none [perspective:1400px] focus-visible:outline-offset-[-4px] min-[481px]:h-[400px] lg:h-[460px]"
            >
                {gallery.map((image, index) => {
                    const offset = offsetOf(index);
                    const distance = Math.abs(offset);
                    const visible = distance <= VISIBLE_SIDE;
                    const isActive = offset === 0;
                    const look = LOOK[Math.min(distance, LOOK.length - 1)];
                    const direction = Math.sign(offset);

                    return (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => setActive(index)}
                            aria-label={`${index + 1} / ${total}`}
                            aria-current={isActive}
                            tabIndex={visible ? 0 : -1}
                            className={`absolute left-0 right-0 mx-auto w-[250px] cursor-pointer overflow-hidden rounded-[24px] bg-slate-100 transition-[transform,opacity,filter,top,bottom] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] min-[481px]:w-[420px] lg:w-[560px] ${
                                visible ? "opacity-100" : "pointer-events-none opacity-0"
                            } ${distance === 1 ? "max-md:blur-[3px]" : ""} ${
                                distance === 2 ? "max-md:pointer-events-none max-md:opacity-0" : ""
                            }`}
                            style={{
                                transform: `translateX(${direction * look.x}%) translateZ(${
                                    -distance * 40
                                }px) rotateY(${-direction * look.tilt}deg) scale(${look.scale})`,
                                top: `${look.inset}%`,
                                bottom: `${look.inset}%`,
                                filter: look.blur ? `blur(${look.blur}px)` : undefined,
                                zIndex: 10 - distance,
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={
                                    t.has(`items.${image.id}.title`)
                                        ? t(`items.${image.id}.title`)
                                        : ""
                                }
                                fill
                                sizes="(min-width: 1024px) 1120px, (min-width: 481px) 840px, 500px"
                                quality={92}
                                priority={index === active}
                                draggable={false}
                                className="object-cover"
                            />
                            {/* Voile sur les cartes latérales */}
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-black transition-opacity duration-700"
                                style={{ opacity: look.veil }}
                            />
                        </button>
                    );
                })}
            </div>
            </div>

            {/* Commandes */}
            <div className="container">
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => goTo(active - 1)}
                        aria-label={t("prev")}
                        className="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full border border-slate-300 text-ink transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                        <ArrowLeftIcon size={20} weight="bold" />
                    </button>

                    <span className="min-w-[72px] text-center text-[14px] tabular-nums text-slate-500">
                        {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>

                    <button
                        type="button"
                        onClick={() => goTo(active + 1)}
                        aria-label={t("next")}
                        className="flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full bg-primary text-ink transition-all duration-300 hover:brightness-110"
                    >
                        <ArrowRightIcon size={20} weight="bold" />
                    </button>
                </div>
            </div>
        </section>
    );
}