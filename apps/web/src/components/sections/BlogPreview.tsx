import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    ClockIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Post } from "@/data/posts";

/** « 7 Nov. » : jour + mois abrégé, selon la langue de la page */
function shortDate(date: string, locale: string) {
    const parts = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
    }).formatToParts(new Date(date));

    return parts
        .map((part) =>
            part.type === "month"
                ? part.value.charAt(0).toUpperCase() + part.value.slice(1)
                : part.value,
        )
        .join("")
        .trim();
}

/** « 20 Oct. 2026 » : pour les petites cartes */
function dateWithYear(date: string, locale: string) {
    const parts = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).formatToParts(new Date(date));

    return parts
        .map((part) =>
            part.type === "month"
                ? part.value.charAt(0).toUpperCase() + part.value.slice(1)
                : part.value,
        )
        .join("")
        .trim();
}

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

/** Style des cartes de droite : gris clair, comme les sections claires du site */
const side = {
    card: "border border-slate-200 bg-slate-50",
    category: "text-primary",
    title: "text-ink group-hover:text-primary",
    excerpt: "text-slate-600",
    date: "text-slate-500",
    link: "text-ink",
    ring: "border-slate-200",
};

export default function BlogPreview({
    locale,
    posts,
}: {
    locale: string;
    posts: Post[];
}) {
    const t = useTranslations("BlogPreview");
    const [featured, ...others] = posts;

    if (!featured) {
        return null;
    }

    return (
        <section className="section bg-white">
            <div className="container">
                {/* En-tête */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                            {t("badge")}
                        </span>
                        <h2 className="mt-5 max-w-[640px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                            {t("title")}{" "}
                            <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                                {t("accent")}
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="mt-10 grid gap-5 min-[481px]:mt-14 lg:grid-cols-[1.1fr_1fr]">
                    {/* Article à la une */}
                    <Link
                        href={`/${locale}/actualites/${featured.slug}`}
                        className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink lg:min-h-[500px]"
                    >
                        <Image
                            src={featured.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 55vw, 100vw"
                            priority
                            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/25" />

                        {/* Haut : catégorie + lecture à gauche, date à droite */}
                        <div className="relative flex items-start justify-between gap-3 p-5 min-[481px]:p-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink">
                                    {t("featured")}
                                </span>
                                <span className="inline-flex items-center rounded-full border border-neutral-300/50 bg-black/35 px-4 py-2 text-[12px] text-white backdrop-blur-md">
                                    {featured.category}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300/50 bg-black/35 px-4 py-2 text-[12px] text-white backdrop-blur-md">
                                    <ClockIcon size={14} />
                                    {t("readTime", { minutes: featured.readMinutes })}
                                </span>
                            </div>

                            <time
                                dateTime={featured.date}
                                className="inline-flex shrink-0 items-center rounded-full border border-neutral-300/50 bg-white/15 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md"
                            >
                                {shortDate(featured.date, locale)}
                            </time>
                        </div>

                        {/* Bas : texte directement sur l'image */}
                        <div className="relative p-5 min-[481px]:p-7">
                            <h3 className="max-w-[560px] text-[clamp(22px,2.4vw,32px)] leading-[1.15] text-white">
                                {featured.title}
                            </h3>

                            <p className="mt-3 line-clamp-2 max-w-[520px] text-[15px] leading-relaxed text-white/75">
                                {featured.excerpt}
                            </p>

                            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/20 pt-5">
                                <span className="flex items-center gap-3">
                                    <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-ink">
                                        {initials(featured.author)}
                                    </span>
                                    <span className="text-[14px] font-medium text-white">
                                        {featured.author}
                                    </span>
                                </span>
                                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
                                    <ArrowUpRightIcon size={20} weight="bold" />
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Articles suivants + bouton */}
                    <div className="flex flex-col gap-6">
                    <ul className="grid flex-1 gap-5 lg:grid-rows-2">
                        {others.map((post) => {
                            const style = side;

                            return (
                                <li key={post.slug} className="flex">
                                    <Link
                                        href={`/${locale}/actualites/${post.slug}`}
                                        className={`group relative flex w-full flex-col overflow-hidden rounded-[28px] min-[481px]:flex-row ${style.card}`}
                                    >
                                        {/* Cercles décoratifs */}
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none absolute -bottom-24 -right-24 h-[260px] w-[260px] rounded-full border border-dashed ${style.ring}`}
                                        />
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none absolute -bottom-12 -right-12 h-[160px] w-[160px] rounded-full border ${style.ring}`}
                                        />

                                        {/* Photo collée au bord de la carte */}
                                        <span className="relative h-[190px] shrink-0 overflow-hidden bg-black/20 min-[481px]:h-auto min-[481px]:w-[180px] lg:w-[190px]">
                                            <Image
                                                src={post.image}
                                                alt=""
                                                fill
                                                sizes="(min-width: 481px) 190px, 100vw"
                                                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                                            />
                                            <time
                                                dateTime={post.date}
                                                className="absolute right-2.5 top-2.5 inline-flex items-center rounded-full bg-white px-3 py-1 text-[12px] font-medium text-ink"
                                            >
                                                {shortDate(post.date, locale)}
                                            </time>
                                        </span>

                                        {/* Texte */}
                                        <span className="relative flex flex-1 flex-col p-5">
                                            <span
                                                className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${style.category}`}
                                            >
                                                {post.category}
                                            </span>

                                            <span
                                                className={`mt-2 line-clamp-2 font-display text-[clamp(18px,1.7vw,22px)] font-semibold leading-[1.22] ${style.title}`}
                                            >
                                                {post.title}
                                            </span>

                                            <span
                                                className={`mt-2 line-clamp-2 text-[14px] leading-relaxed ${style.excerpt}`}
                                            >
                                                {post.excerpt}
                                            </span>

                                            <span className="mt-auto flex items-center justify-between gap-4 pt-4">
                                                <time
                                                    dateTime={post.date}
                                                    className={`text-[13px] ${style.date}`}
                                                >
                                                    {dateWithYear(post.date, locale)}
                                                </time>
                                                <span
                                                    className={`inline-flex items-center gap-2 text-[14px] font-medium ${style.link}`}
                                                >
                                                    {t("readMore")}
                                                    <ArrowUpRightIcon
                                                        size={15}
                                                        weight="bold"
                                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                    />
                                                </span>
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <Link
                        href={`/${locale}/actualites`}
                        className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                    >
                        {t("viewAll")}
                        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-[2px]">
                            <ArrowRightIcon size={16} weight="bold" />
                        </span>
                    </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}