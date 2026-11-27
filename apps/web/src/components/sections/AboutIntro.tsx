import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRightIcon, GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";

export default function AboutIntro({ locale }: { locale: string }) {
    const t = useTranslations("AboutIntro");

    return (
        <section className="section bg-slate-50">
            <div className="container">
                <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
                    {/* Image — 50 % */}
                    <div className="relative min-h-[320px] overflow-hidden rounded-[24px] min-[481px]:min-h-[420px] md:min-h-[520px]">
                        <Image
                            src="/images/about.jpg"
                            alt={t("imageAlt")}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                        <span className="absolute left-5 top-5 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-primary text-white">
                            <GraduationCapIcon size={22} weight="fill" />
                        </span>
                    </div>

                    {/* Contenu — 50 % */}
                    <div className="flex flex-col justify-center rounded-[24px] bg-primary/10 p-7 min-[481px]:p-10 lg:p-14">
                        <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                            {t("badge")}
                        </span>

                        <h2 className="mt-5 text-[clamp(26px,3.2vw,40px)] leading-[1.15]">
                            {t("title")}{" "}
                            <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                                {t("accent")}
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed min-[481px]:text-[16px]">
                            {t("description")}
                        </p>

                        <Link
                            href={`/${locale}/a-propos`}
                            className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                        >
                            {t("cta")}
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