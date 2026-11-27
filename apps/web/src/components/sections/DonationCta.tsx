import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
    ArrowRightIcon,
    GraduationCapIcon,
    HandHeartIcon,
    UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";

// Image de fond : à remplacer par une photo dédiée si besoin (public/images/)
const BACKGROUND = "/images/about.jpg";

const impacts = [
    { key: "education", icon: GraduationCapIcon },
    { key: "training", icon: UsersThreeIcon },
    { key: "autonomy", icon: HandHeartIcon },
] as const;

export default function DonationCta({ locale }: { locale: string }) {
    const t = useTranslations("DonationCta");

    return (
        <section className="section relative isolate overflow-hidden bg-ink">
            {/* Image plein cadre */}
            <Image
                src={BACKGROUND}
                alt=""
                fill
                sizes="100vw"
                className="-z-20 object-cover"
            />

            {/* Voile noir neutre, comme sur le hero : l'image reste visible */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-r from-black/75 via-black/50 to-black/30"
            />

            <div className="container">
                <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                    {/* Gauche : titre, paragraphe, boutons */}
                    <div>
                        <h2 className="max-w-[620px] text-[clamp(28px,4vw,50px)] leading-[1.1] text-white">
                            {t("title")}{" "}
                            <span className="bg-linear-to-r from-primary to-white bg-clip-text text-transparent">
                                {t("accent")}
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-white/80 min-[481px]:text-[16px]">
                            {t("description")}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`/${locale}/don`}
                                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-[14px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110 focus-visible:outline-white"
                            >
                                {t("donate")}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-[14px] text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-[2px] hover:border-primary hover:bg-white/20 focus-visible:outline-white"
                            >
                                {t("contact")}
                                <ArrowRightIcon
                                    size={16}
                                    weight="bold"
                                    className="transition-transform duration-300 group-hover:translate-x-[2px]"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Droite : trois cartes */}
                    <ul className="flex flex-col gap-3">
                        {impacts.map((item) => (
                            <li
                                key={item.key}
                                className="flex items-center gap-4 rounded-[20px] border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-colors duration-300 hover:border-primary/70 min-[481px]:p-5"
                            >
                                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                    <item.icon size={26} />
                                </span>
                                <span>
                                    <span className="block font-display text-[18px] font-semibold leading-tight text-white">
                                        {t(`impacts.${item.key}.title`)}
                                    </span>
                                    <span className="mt-1 block text-[14px] leading-snug text-white/70">
                                        {t(`impacts.${item.key}.text`)}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}