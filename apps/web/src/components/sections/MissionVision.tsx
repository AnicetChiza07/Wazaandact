import { useTranslations } from "next-intl";
import type { Icon } from "@phosphor-icons/react";
import {
    EyeIcon,
    HandHeartIcon,
    TargetIcon,
} from "@phosphor-icons/react/dist/ssr";

type Card = {
    key: "mission" | "vision" | "values";
    icon: Icon;
    card: string;
    line: string;
    title: string;
    text: string;
    iconWrap: string;
};

const cards: Card[] = [
    {
        key: "mission",
        icon: TargetIcon,
        card: "bg-linear-to-br from-ink via-ink to-ink-soft text-white",
        line: "bg-white/20",
        title: "text-white",
        text: "text-white/70",
        iconWrap: "bg-primary text-ink",
    },
    {
        key: "vision",
        icon: EyeIcon,
        card: "bg-primary text-ink",
        line: "bg-ink/20",
        title: "text-ink",
        text: "text-ink/75",
        iconWrap: "bg-ink text-white",
    },
    {
        key: "values",
        icon: HandHeartIcon,
        card: "bg-primary/15 text-ink",
        line: "bg-ink/15",
        title: "text-ink",
        text: "text-slate-600",
        iconWrap: "bg-primary text-ink",
    },
];

/** Cercles décoratifs (identiques sur les trois cartes, sans animation). */
function Rings() {
    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-28 h-[340px] w-[340px]"
        >
            <span className="absolute inset-0 rounded-full border border-dashed border-current/30">
                <span className="absolute left-1/2 top-0 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            </span>
            <span className="absolute inset-[55px] rounded-full border border-current/25">
                <span className="absolute bottom-0 left-1/2 h-[8px] w-[8px] -translate-x-1/2 translate-y-1/2 rounded-full bg-current" />
            </span>
            <span className="absolute inset-[110px] rounded-full border border-dashed border-current/30" />
        </span>
    );
}

export default function MissionVision() {
    const t = useTranslations("MissionVision");

    return (
        <section className="section bg-white">
            <div className="container">
                {/* En-tête */}
                <div className="grid items-start gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>
                    <h2 className="max-w-[760px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>
                </div>

                {/* Cartes */}
                <div className="mt-10 grid gap-5 min-[481px]:mt-14 md:grid-cols-3">
                    {cards.map((item, index) => (
                        <article
                            key={item.key}
                            className={`relative flex min-h-[380px] flex-col overflow-hidden rounded-[28px] p-7 pb-[96px] transition-transform duration-300 hover:-translate-y-1 min-[481px]:min-h-[420px] min-[481px]:p-8 min-[481px]:pb-[100px] ${item.card}`}
                        >
                            {item.key === "mission" && (
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -left-16 -top-16 h-[260px] w-[260px] rounded-full bg-primary/30 blur-[90px]"
                                />
                            )}
                            <Rings />

                            {/* Numéro creux, à droite */}
                            <span className="relative self-end font-display text-[56px] leading-none [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1px_currentColor] min-[481px]:text-[64px]">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className={`relative mt-5 block h-px w-full ${item.line}`} />

                            {/* Texte */}
                            <div className="relative mt-auto pt-6">
                                <h3
                                    className={`text-[clamp(26px,2.4vw,32px)] ${item.title}`}
                                >
                                    {t(`${item.key}.title`)}
                                </h3>
                                <p
                                    className={`mt-3 max-w-[360px] text-[15px] leading-relaxed ${item.text}`}
                                >
                                    {t(`${item.key}.description`)}
                                </p>
                            </div>

                            {/* Icône du thème, à gauche */}
                            <span
                                className={`absolute bottom-6 left-6 flex h-[56px] w-[56px] items-center justify-center rounded-full ${item.iconWrap}`}
                            >
                                <item.icon size={26} weight="duotone" />
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}