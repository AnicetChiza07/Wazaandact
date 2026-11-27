import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

const partners = [1, 2, 3, 4, 5];

export default function Partners({ locale }: { locale: string }) {
    const t = useTranslations("Partners");

    return (
        <section className="section bg-white">
            <div className="container">
                <div className="text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>

                    <h2 className="mx-auto mt-5 max-w-[720px] text-[clamp(28px,4vw,48px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {partners.map((number) => (
                        <div
                            key={number}
                            className="group flex h-[140px] items-center justify-center rounded-[20px] border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-primary/60"
                        >
                            <Image
                                src={`/images/part-${number}.png`}
                                alt={t(`items.part${number}`)}
                                width={180}
                                height={90}
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 18vw"
                                className="max-h-[64px] max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href={`/${locale}/partners`}
                        className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                    >
                        {t("viewAll")}
                        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-[2px]">
                            <ArrowRightIcon size={16} weight="bold" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}