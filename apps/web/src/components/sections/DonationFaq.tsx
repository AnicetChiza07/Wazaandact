import { useTranslations } from "next-intl";
import {
    ArrowRightIcon,
    PlusIcon,
} from "@phosphor-icons/react/dist/ssr";

const faqItems = [
    "methods",
    "websitePayment",
    "recurring",
    "verification",
    "international",
    "fees",
] as const;

export default function DonationFaq() {
    const t = useTranslations("DonationPage");

    return (
        <section className="section">
            <div className="container">
                <div className="mx-auto max-w-[720px] text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("faq.badge")}
                    </span>

                    <h2 className="mt-5 text-[clamp(28px,4vw,46px)] leading-[1.12]">
                        {t("faq.title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("faq.accent")}
                        </span>
                    </h2>
                </div>

                <div className="mx-auto mt-10 max-w-[850px] space-y-3">
                    {faqItems.map((id) => (
                        <details
                            key={id}
                            className="group rounded-[20px] border border-slate-200 bg-white p-5 min-[481px]:p-6"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                                <span>{t(`faq.items.${id}.question`)}</span>

                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-ink transition-colors group-open:bg-primary">
                                    <PlusIcon
                                        size={18}
                                        weight="bold"
                                        className="transition-transform duration-300 group-open:rotate-45"
                                    />
                                </span>
                            </summary>

                            <p className="mt-4 max-w-[720px] pr-2 text-[15px] leading-relaxed text-slate-600">
                                {t(`faq.items.${id}.answer`)}
                            </p>
                        </details>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <a
                        href="mailto:info@wazaandact.org"
                        className="group inline-flex items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                    >
                        {t("faq.contact")}
                        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-[2px]">
                            <ArrowRightIcon size={16} weight="bold" />
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}