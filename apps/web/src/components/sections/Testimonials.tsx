import { useTranslations } from "next-intl";
import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import { testimonials } from "@/data/testimonials";

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

type Item = {
    id: string;
    quote: string;
    name: string;
    role: string;
};

function Card({ item }: { item: Item }) {
    return (
        <li className="rounded-[20px] border border-slate-200 bg-white p-6">
            <QuotesIcon size={28} className="text-primary" />

            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                {item.quote}
            </p>

            <div className="mt-5 flex items-center gap-3">
                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
                    {initials(item.name)}
                </span>

                <span>
                    <span className="block text-[15px] font-semibold leading-tight text-ink">
                        {item.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-slate-500">
                        {item.role}
                    </span>
                </span>
            </div>
        </li>
    );
}

/** Colonne qui défile en boucle grâce à la duplication du contenu. */
function Column({
    items,
    direction,
}: {
    items: Item[];
    direction: "up" | "down";
}) {
    return (
        <div
            className={`flex h-max self-start flex-col ${
                direction === "up"
                    ? "animate-marquee-up"
                    : "animate-marquee-down"
            } group-hover:[animation-play-state:paused]`}
        >
            {[0, 1].map((copy) => (
                <ul
                    key={copy}
                    aria-hidden={copy === 1}
                    className="flex flex-col gap-4 pb-4"
                >
                    {items.map((item) => (
                        <Card key={`${copy}-${item.id}`} item={item} />
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const t = useTranslations("Testimonials");

    const items: Item[] = testimonials.map((id) => ({
        id,
        quote: t(`items.${id}.quote`),
        name: t(`items.${id}.name`),
        role: t(`items.${id}.role`),
    }));

    // Répartition en deux colonnes : 1, 3, 5… à gauche ; 2, 4, 6… à droite.
    const first = items.filter((_, index) => index % 2 === 0);
    const second = items.filter((_, index) => index % 2 === 1);

    return (
        <section className="section overflow-hidden bg-slate-50">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                    <div>
                        <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                            {t("badge")}
                        </span>

                        <h2 className="mt-5 max-w-[520px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                            {t("title")}{" "}
                            <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                                {t("accent")}
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[460px] text-[15px] leading-relaxed min-[481px]:text-[16px]">
                            {t("description")}
                        </p>
                    </div>

                    <div className="marquee-mask-y group relative h-[420px] overflow-hidden min-[481px]:h-[480px] lg:h-[520px]">
                        <div className="grid h-full min-h-0 grid-cols-1 gap-4 md:grid-cols-2">
                            <Column items={first} direction="up" />

                            <div className="max-md:hidden">
                                <Column items={second} direction="down" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}