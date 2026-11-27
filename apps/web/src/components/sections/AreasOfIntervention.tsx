"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
    BookOpenTextIcon,
    CaretDownIcon,
    CloudSunIcon,
    FirstAidKitIcon,
    HandshakeIcon,
    ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

const areas = [
    {
        id: "protection",
        icon: ShieldCheckIcon,
        image: "/images/protection.jpg",
    },
    {
        id: "education",
        icon: BookOpenTextIcon,
        image: "/images/education.jpg",
    },
    {
        id: "health",
        icon: FirstAidKitIcon,
        image: "/images/sante.jpg",
    },
    {
        id: "climateGender",
        icon: CloudSunIcon,
        image: "/images/climat-genre.jpg",
    },
    {
        id: "conflictResolution",
        icon: HandshakeIcon,
        image: "/images/resolution-conflits.jpg",
    },
] as const;

export default function AreasOfIntervention() {
    const t = useTranslations("AreasOfIntervention");
    const [activeId, setActiveId] = useState<string | null>("protection");

    return (
        <section className="section bg-slate-50">
            <div className="container">
                <div className="mx-auto max-w-[720px] text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>

                    <h2 className="mt-5 text-[clamp(28px,4vw,48px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>

                    <p className="mt-5 text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                        {t("description")}
                    </p>
                </div>

                {/* Panneaux dépliants pour ordinateur */}
                <div className="mt-12 hidden h-[480px] gap-3 lg:flex">
                    {areas.map((area) => {
                        const isActive = activeId === area.id;
                        const Icon = area.icon;

                        return (
                            <button
                                key={area.id}
                                type="button"
                                onClick={() =>
                                    setActiveId(isActive ? null : area.id)
                                }
                                onMouseEnter={() => setActiveId(area.id)}
                                aria-expanded={isActive}
                                className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-[24px] bg-ink text-left transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                    isActive ? "flex-[4]" : "flex-[1]"
                                }`}
                            >
                                <Image
                                    src={area.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 60vw, 20vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/20"
                                />

                                {isActive ? (
                                    <span className="absolute inset-x-0 bottom-0 p-6 xl:p-8">
                                        <span className="mb-4 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary text-ink">
                                            <Icon
                                                size={24}
                                                weight="regular"
                                            />
                                        </span>

                                        <span className="block font-display text-[25px] font-semibold leading-tight text-white xl:text-[30px]">
                                            {t(`items.${area.id}.title`)}
                                        </span>

                                        <span className="mt-3 block max-w-[460px] text-[14px] leading-relaxed text-white/80 xl:text-[15px]">
                                            {t(
                                                `items.${area.id}.description`,
                                            )}
                                        </span>
                                    </span>
                                ) : (
                                    <span className="absolute inset-0 flex flex-col items-center justify-end gap-5 py-6">
                                        <span className="rotate-180 text-[14px] font-semibold text-white [writing-mode:vertical-rl]">
                                            {t(`items.${area.id}.title`)}
                                        </span>

                                        <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white">
                                            <Icon
                                                size={21}
                                                weight="regular"
                                            />
                                        </span>
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Accordéon pour mobile et tablette */}
                <ul className="mt-10 flex flex-col gap-3 lg:hidden">
                    {areas.map((area) => {
                        const isActive = activeId === area.id;
                        const Icon = area.icon;

                        return (
                            <li
                                key={area.id}
                                className="overflow-hidden rounded-[20px] border border-slate-200 bg-white"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveId(isActive ? null : area.id)
                                    }
                                    aria-expanded={isActive}
                                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-primary/15 text-ink">
                                            <Icon
                                                size={22}
                                                weight="regular"
                                            />
                                        </span>

                                        <span className="font-display text-[18px] font-semibold text-ink">
                                            {t(`items.${area.id}.title`)}
                                        </span>
                                    </span>

                                    <CaretDownIcon
                                        size={20}
                                        aria-hidden="true"
                                        className={`shrink-0 text-primary transition-transform duration-300 ${
                                            isActive ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isActive && (
                                    <div>
                                        <div className="relative h-[220px] overflow-hidden bg-ink">
                                            <Image
                                                src={area.image}
                                                alt=""
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
                                            />
                                        </div>

                                        <p className="p-5 pt-4 text-[15px] leading-relaxed text-slate-600">
                                            {t(
                                                `items.${area.id}.description`,
                                            )}
                                        </p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}