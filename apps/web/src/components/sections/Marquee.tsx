import { useTranslations } from "next-intl";

type RowProps = {
    items: string[];
    direction: "left" | "right";
};

function MarqueeRow({ items, direction }: RowProps) {
    // Chaque groupe répète la liste pour couvrir les grands écrans
    const group = [...items, ...items];

    return (
        <div className="marquee-mask group relative overflow-hidden">
            <div
                className={`flex w-max ${
                    direction === "left"
                        ? "animate-marquee-left"
                        : "animate-marquee-right"
                } group-hover:[animation-play-state:paused]`}
            >
                {[0, 1].map((copy) => (
                    <ul
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex shrink-0 items-center gap-3 pr-3"
                    >
                        {group.map((item, index) => (
                            <li
                                key={`${copy}-${index}`}
                                className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-6 py-[10px] text-[15px] font-medium text-ink/75 transition-colors duration-300 hover:border-primary hover:text-ink"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default function Marquee() {
    const t = useTranslations("Marquee");
    const rowOne = t.raw("rowOne") as string[];
    const rowTwo = t.raw("rowTwo") as string[];

    return (
        <section
            aria-label={t("title")}
            className="section relative bg-white"
        >
            <div className="flex flex-col gap-10">
                <MarqueeRow items={rowOne} direction="left" />
                <MarqueeRow items={rowTwo} direction="right" />
            </div>
        </section>
    );
}