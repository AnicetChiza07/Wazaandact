import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

type PageHeroProps = {
    image: string;
    imageAlt: string;
    currentPage: string;
    title: string;
    accent?: string;
    description?: string;
    imagePosition?: string;
    topContent?: ReactNode;
    align?: "left" | "center";
    titleSize?: "default" | "compact";
};

export default function PageHero({
    image,
    imageAlt,
    currentPage,
    title,
    accent = "",
    description = "",
    imagePosition = "center",
    topContent,
    align = "left",
    titleSize = "default",
}: PageHeroProps) {
    const locale = useLocale();
    const t = useTranslations("Header");
    const isLeftAligned = align === "left";

    return (
        <section className="relative flex min-h-[560px] h-[70vh] items-center overflow-hidden bg-ink">
            <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: imagePosition }}
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-black/65 via-black/50 to-ink/80"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-primary/15 mix-blend-multiply"
            />

            <div
                className={`container relative z-10 py-32 ${
                    isLeftAligned ? "text-left" : "text-center"
                }`}
            >
                <nav
                    aria-label="Breadcrumb"
                    className={`mb-6 flex items-center gap-2 text-[13px] text-white/70 ${
                        isLeftAligned ? "justify-start" : "justify-center"
                    }`}
                >
                    <Link
                        href={`/${locale}`}
                        className="transition-colors hover:text-primary"
                    >
                        {t("home")}
                    </Link>

                    <span aria-hidden="true">/</span>

                    <span aria-current="page" className="text-white">
                        {currentPage}
                    </span>
                </nav>

                {topContent && (
                    <div className="mb-6">
                        {topContent}
                    </div>
                )}

                <h1
                    className={`font-semibold leading-[1.12] text-white ${
                        isLeftAligned ? "mr-auto" : "mx-auto"
                    } ${
                        titleSize === "compact"
                            ? "max-w-[780px] text-[clamp(28px,3.5vw,44px)]"
                            : "max-w-[900px] text-[clamp(32px,5vw,58px)]"
                    }`}
                >
                    <span className="block">{title}</span>

                    {accent && (
                        <span className="mt-1 block bg-linear-to-r from-primary to-white bg-clip-text text-transparent">
                            {accent}
                        </span>
                    )}
                </h1>

                {description && (
                    <p
                        className={`mt-6 max-w-[680px] text-[15px] leading-relaxed text-white/80 min-[481px]:text-[17px] ${
                            isLeftAligned ? "" : "mx-auto"
                        }`}
                    >
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}