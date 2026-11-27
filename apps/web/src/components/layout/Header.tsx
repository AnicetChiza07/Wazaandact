"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
    type Icon,
    BriefcaseIcon,
    EnvelopeSimpleIcon,
    FileTextIcon,
    HouseIcon,
    InfoIcon,
    ListIcon,
    NewspaperIcon,
    XIcon,
} from "@phosphor-icons/react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

type NavItem = {
    href: string;
    label: string;
    icon: Icon;
    exact?: boolean;
};

export default function Header() {
    const t = useTranslations("Header");
    const rawPathname = usePathname();
    const pathname = rawPathname.replace(/\/+$/, "") || "/";
    const locale = pathname.split("/")[1] || "fr";
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const navItems: NavItem[] = [
        { href: `/${locale}`, label: t("home"), icon: HouseIcon, exact: true },
        { href: `/${locale}/a-propos`, label: t("about"), icon: InfoIcon },
        { href: `/${locale}/actualites`, label: t("news"), icon: NewspaperIcon },
        { href: `/${locale}/offres-emploi`, label: t("jobs"), icon: BriefcaseIcon },
        { href: `/${locale}/rapports`, label: t("reports"), icon: FileTextIcon },
        { href: `/${locale}/contact`, label: t("contact"), icon: EnvelopeSimpleIcon },
    ];

    const isActive = (item: NavItem) =>
        item.exact ? pathname === item.href : pathname.startsWith(item.href);

    const isSolid = isScrolled || isOpen;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        const raf = requestAnimationFrame(handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed left-1/2 top-[10px] z-50 w-[calc(100%-20px)] max-w-[1280px] -translate-x-1/2 min-[481px]:top-4 min-[481px]:w-[calc(100%-32px)]"
        >
            <div
                className={`flex items-center justify-between gap-3 rounded-full border px-4 py-[10px] backdrop-blur-md transition-all duration-300 min-[901px]:pl-5 min-[901px]:pr-3 ${
                    isSolid
                        ? "border-slate-200 bg-white/80"
                        : "border-white/15 bg-black/20"
                }`}
            >
                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    onClick={() => setIsOpen(false)}
                    className="flex shrink-0 items-center focus-visible:outline-white"
                >
                    <Image
                        src="/logo.png"
                        alt="Waza and Act"
                        width={140}
                        height={48}
                        priority
                        className="h-[48px] w-auto"
                    />
                </Link>

                {/* Navigation + langue, regroupées à droite */}
                <div className="hidden items-center gap-3 min-[901px]:flex">
                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = isActive(item);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] transition-colors duration-300 focus-visible:outline-white min-[1025px]:px-4 min-[1025px]:text-[14.5px] ${
                                        active
                                            ? isSolid
                                                ? "bg-primary/10 font-semibold text-ink ring-1 ring-inset ring-slate-300"
                                                : "bg-white/10 font-semibold text-white ring-1 ring-inset ring-white/25"
                                            : isSolid
                                                ? "font-medium text-slate-600 hover:text-primary"
                                                : "font-medium text-white/85 hover:text-primary"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <span
                        aria-hidden="true"
                        className={`h-6 w-px transition-colors duration-300 ${
                            isSolid ? "bg-slate-200" : "bg-white/20"
                        }`}
                    />

                    <LanguageSwitcher solid={isSolid} />
                </div>

                {/* Bouton menu mobile */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={t("menu")}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    className={`cursor-pointer rounded-full p-[6px] transition-colors focus-visible:outline-white min-[901px]:hidden ${
                        isSolid
                            ? "text-ink hover:bg-slate-100"
                            : "text-white hover:bg-white/10"
                    }`}
                >
                    {isOpen ? <XIcon size={26} /> : <ListIcon size={26} />}
                </button>
            </div>

            {/* Menu mobile */}
            <div
                id="mobile-menu"
                className={`absolute left-0 top-full mt-2 flex h-[calc(100dvh-98px)] w-full flex-col gap-2 overflow-y-auto rounded-[20px] border border-slate-200 bg-white/95 p-5 backdrop-blur-lg transition-all duration-300 min-[481px]:h-[calc(100dvh-110px)] min-[901px]:hidden ${
                    isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible pointer-events-none -translate-y-2 opacity-0"
                }`}
            >
                {navItems.map((item) => {
                    const active = isActive(item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-[14px] text-[15px] transition-colors ${
                                active
                                    ? "bg-primary/10 font-semibold text-ink"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-ink"
                            }`}
                        >
                            <item.icon
                                size={20}
                                weight={active ? "fill" : "regular"}
                                className={active ? "text-primary" : ""}
                            />
                            {item.label}
                        </Link>
                    );
                })}

                <div className="mt-1 shrink-0 border-t border-slate-200 pt-3">
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}