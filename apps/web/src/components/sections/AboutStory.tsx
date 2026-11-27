import Image from "next/image";
import { useTranslations } from "next-intl";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export default function AboutStory() {
    const t = useTranslations("About");
    const facts = t.raw("story.facts") as string[];
    const author = t("story.quoteAuthor");

    return (
        <section className="section overflow-hidden bg-slate-50">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    {/* Images à gauche */}
                    <div className="relative mx-auto aspect-square w-full max-w-[470px]">
                        {/* Cercle en pointillés autour de l'ensemble */}
                        <span
                            aria-hidden="true"
                            className="absolute -inset-3 rounded-full border border-dashed border-primary/40"
                        />

                        {/* Cercle sombre qui dépasse derrière la grande image */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-2 translate-x-5 translate-y-5 rounded-full bg-ink"
                        />

                        {/* Grande image ronde */}
                        <div className="absolute inset-6 overflow-hidden rounded-full bg-slate-100">
                            <Image
                                src="/images/education.jpg"
                                alt={t("story.mainImageAlt")}
                                fill
                                sizes="(min-width: 1024px) 42vw, 90vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Petite image ronde superposée */}
                        <div className="absolute bottom-1 left-0 h-[132px] w-[132px] overflow-hidden rounded-full border-[7px] border-slate-50 bg-slate-100 min-[481px]:h-[164px] min-[481px]:w-[164px]">
                            <Image
                                src="/images/kit.jpg"
                                alt={t("story.secondaryImageAlt")}
                                fill
                                sizes="(min-width: 481px) 164px, 132px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Texte à droite */}
                    <div>
                        <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                            {t("story.badge")}
                        </span>

                        <h2 className="mt-5 max-w-[680px] text-[clamp(28px,4vw,44px)] leading-[1.12]">
                            {t("story.title")}{" "}
                            <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                                {t("story.accent")}
                            </span>
                        </h2>

                        <div className="mt-6 max-w-[620px] space-y-4 text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                            <p>{t("story.paragraph1")}</p>
                            <p>{t("story.paragraph2")}</p>
                        </div>

                        {/* Repères rapides */}
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {facts.map((fact) => (
                                <li
                                    key={fact}
                                    className="rounded-full border border-slate-200 bg-white px-4 py-[7px] text-[13px] font-medium text-ink"
                                >
                                    {fact}
                                </li>
                            ))}
                        </ul>

                        {/* Citation sur fond sombre */}
                        <blockquote className="mt-7 flex items-start gap-4 border-l-[3px] border-primary bg-ink p-5 text-white min-[481px]:p-6">
                            <QuotesIcon
                                size={24}
                                weight="regular"
                                className="mt-1 shrink-0 text-primary"
                                aria-hidden="true"
                            />
                            <p className="font-sans text-[15px] font-normal leading-relaxed text-white min-[481px]:text-[16px]">
                                {t("story.quote")}
                            </p>
                        </blockquote>

                        {/* Fondateur, détaché du fond sombre */}
                        <div className="mt-5 flex items-center gap-3">
                            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-semibold text-white">
                                {initials(author)}
                            </span>
                            <span className="leading-tight">
                                <span className="block text-[15px] font-semibold text-ink">
                                    {author}
                                </span>
                                <span className="mt-0.5 block text-[13px] text-slate-500">
                                    {t("story.quoteRole")}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}