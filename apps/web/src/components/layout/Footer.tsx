"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Icon } from "@phosphor-icons/react";
import {
    ArrowRightIcon,
    ArrowUpIcon,
    BriefcaseIcon,
    EnvelopeSimpleIcon,
    FacebookLogoIcon,
    FileTextIcon,
    HouseIcon,
    ImagesIcon,
    InfoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
    NewspaperIcon,
    PhoneIcon,
    XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Suspense } from "react";
import CurrentYear from "@/components/layout/CurrentYear";

const socialLinks = [
    { key: "facebook", icon: FacebookLogoIcon, href: "" },
    { key: "instagram", icon: InstagramLogoIcon, href: "" },
    { key: "x", icon: XLogoIcon, href: "" },
    { key: "linkedin", icon: LinkedinLogoIcon, href: "" },
];

type FooterLink = {
    href: string;
    label: string;
    icon: Icon;
};

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();

    const navigationLinks: FooterLink[] = [
        {
            href: `/${locale}`,
            label: t("links.home"),
            icon: HouseIcon,
        },
        {
            href: `/${locale}/a-propos`,
            label: t("links.about"),
            icon: InfoIcon,
        },
        {
            href: `/${locale}/actualites`,
            label: t("links.news"),
            icon: NewspaperIcon,
        },
        {
            href: `/${locale}/contact`,
            label: t("links.contact"),
            icon: EnvelopeSimpleIcon,
        },
    ];

    const resourceLinks: FooterLink[] = [
        {
            href: `/${locale}/offres-emploi`,
            label: t("links.jobs"),
            icon: BriefcaseIcon,
        },
        {
            href: `/${locale}/rapports`,
            label: t("links.reports"),
            icon: FileTextIcon,
        },
        {
            href: `/${locale}/galerie`,
            label: t("links.gallery"),
            icon: ImagesIcon,
        },
    ];

    const renderLinks = (links: FooterLink[]) =>
        links.map(({ href, label, icon: IconComponent }) => (
            <li key={href}>
                <Link
                    href={href}
                    className="group inline-flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-primary"
                >
                    <IconComponent
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="shrink-0 transition-colors group-hover:text-primary"
                    />
                    <span>{label}</span>
                </Link>
            </li>
        ));

    const goToTop = () => {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <footer className="relative overflow-hidden bg-ink text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-40 h-[380px] w-[380px] rounded-full border border-dashed border-white/10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-28 h-[260px] w-[260px] rounded-full border border-white/10"
            />

            <div className="container relative">
                <div className="grid gap-10 py-14 min-[481px]:py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
                    <div>
                        <Link
                            href={`/${locale}`}
                            aria-label={t("homeLabel")}
                            className="inline-flex"
                        >
                            <Image
                                src="/logo.png"
                                alt="Waza and Act"
                                width={180}
                                height={62}
                                className="h-[60px] w-auto"
                            />
                        </Link>

                        <p className="mt-5 max-w-[340px] text-[14px] leading-relaxed text-white/70">
                            {t("description")}
                        </p>

                        <div className="mt-6 flex items-center gap-2">
                            {socialLinks.map(({ key, icon: IconComponent, href }) =>
                                href ? (
                                    <a
                                        key={key}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={t(`social.${key}`)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-primary hover:bg-primary hover:text-ink"
                                    >
                                        <IconComponent
                                            size={20}
                                            weight="regular"
                                        />
                                    </a>
                                ) : (
                                    <span
                                        key={key}
                                        aria-label={t(`social.${key}`)}
                                        title={t(`social.${key}`)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80"
                                    >
                                        <IconComponent
                                            size={20}
                                            weight="regular"
                                        />
                                    </span>
                                ),
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-display text-[18px] font-semibold text-white">
                            {t("navigationTitle")}
                        </h2>

                        <nav aria-label={t("navigationLabel")} className="mt-5">
                            <ul className="flex flex-col gap-3">
                                {renderLinks(navigationLinks)}
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h2 className="font-display text-[18px] font-semibold text-white">
                            {t("resourcesTitle")}
                        </h2>

                        <nav aria-label={t("resourcesLabel")} className="mt-5">
                            <ul className="flex flex-col gap-3">
                                {renderLinks(resourceLinks)}
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h2 className="font-display text-[18px] font-semibold text-white">
                            {t("contactTitle")}
                        </h2>

                        <ul className="mt-5 flex flex-col gap-4">
                            <li>
                                <a
                                    href="tel:+243819795060"
                                    className="inline-flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-primary"
                                >
                                    <PhoneIcon
                                        size={18}
                                        weight="regular"
                                        aria-hidden="true"
                                    />
                                    <span>(+243) 819 795 060</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="tel:+243991901271"
                                    className="inline-flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-primary"
                                >
                                    <PhoneIcon
                                        size={18}
                                        weight="regular"
                                        aria-hidden="true"
                                    />
                                    <span>(+243) 991 901 271</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="mailto:info@wazaandact.org"
                                    className="inline-flex items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-primary"
                                >
                                    <EnvelopeSimpleIcon
                                        size={18}
                                        weight="regular"
                                        aria-hidden="true"
                                    />
                                    <span>info@wazaandact.org</span>
                                </a>
                            </li>
                        </ul>

                        <Link
                            href={`/${locale}/don`}
                            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                        >
                            {t("donateButton")}
                            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-[2px]">
                                <ArrowRightIcon size={16} weight="bold" />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-white/15 py-5 text-center min-[481px]:flex-row min-[481px]:justify-between min-[481px]:text-left">
                    <p className="text-[13px] text-white/60">
                        ©{" "}
                        <Suspense fallback={null}>
                            <CurrentYear />
                        </Suspense>{" "}
                        {t("copyright")}
                    </p>

                    <button
                        type="button"
                        onClick={goToTop}
                        className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-white/75 transition-colors hover:text-primary"
                    >
                        {t("backToTop")}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-ink">
                            <ArrowUpIcon size={16} weight="regular" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}