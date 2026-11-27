"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    BankIcon,
    CheckIcon,
    CopyIcon,
    DeviceMobileIcon,
} from "@phosphor-icons/react/dist/ssr";

const bankDetails = [
    {
        id: "bank",
        label: "bankName",
        value: "ACCESS BANK R.D.Congo (SA)",
    },
    {
        id: "account",
        label: "accountNumber",
        value: "30008113301",
    },
    {
        id: "swift",
        label: "swift",
        value: "ABNGCDKI",
    },
];

export default function DonationMethods() {
    const t = useTranslations("DonationMethods");
    const [copied, setCopied] = useState<string | null>(null);

    const copyValue = async (id: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(id);
            window.setTimeout(() => setCopied(null), 1800);
        } catch {
            setCopied(null);
        }
    };

    return (
        <section className="section bg-slate-50">
            <div className="container">
                <div className="mx-auto max-w-[700px] text-center">
                    <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] font-normal uppercase tracking-[0.14em] text-ink">
                        {t("badge")}
                    </span>

                    <h2 className="mt-5 text-[clamp(28px,4vw,46px)] leading-[1.12]">
                        {t("title")}{" "}
                        <span className="bg-linear-to-r from-primary to-ink bg-clip-text text-transparent">
                            {t("accent")}
                        </span>
                    </h2>

                    <p className="mt-5 text-[15px] leading-relaxed text-slate-600 min-[481px]:text-[16px]">
                        {t("description")}
                    </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-[1000px] gap-5 lg:grid-cols-2">
                    {/* Airtel Money */}
                    <article className="rounded-[24px] border border-slate-200 bg-white p-6 min-[481px]:p-8">
                        <div className="flex items-center gap-4">
                            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary/15 text-ink">
                                <DeviceMobileIcon
                                    size={25}
                                    weight="regular"
                                />
                            </span>

                            <div>
                                <h3 className="font-display text-[22px] font-semibold text-ink">
                                    {t("airtelTitle")}
                                </h3>
                                <p className="mt-1 text-[14px] text-slate-500">
                                    {t("airtelDescription")}
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 flex items-center justify-between gap-4 rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                            <div className="min-w-0">
                                <p className="text-[12px] uppercase tracking-[0.1em] text-slate-500">
                                    {t("phoneNumber")}
                                </p>
                                <p className="mt-1 break-all text-[18px] font-semibold text-ink min-[481px]:text-[20px]">
                                    +243 991 901 271
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    copyValue("airtel", "+243991901271")
                                }
                                aria-label={t(
                                    copied === "airtel" ? "copied" : "copy",
                                )}
                                className="flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-ink transition-colors hover:border-primary hover:bg-primary/10"
                            >
                                {copied === "airtel" ? (
                                    <CheckIcon size={19} weight="bold" />
                                ) : (
                                    <CopyIcon size={19} weight="regular" />
                                )}
                            </button>
                        </div>

                        <p className="mt-5 text-[14px] leading-relaxed text-slate-600">
                            {t("airtelInstructions")}
                        </p>
                    </article>

                    {/* Virement bancaire */}
                    <article className="rounded-[24px] border border-slate-200 bg-white p-6 min-[481px]:p-8">
                        <div className="flex items-center gap-4">
                            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary/15 text-ink">
                                <BankIcon size={25} weight="regular" />
                            </span>

                            <div>
                                <h3 className="font-display text-[22px] font-semibold text-ink">
                                    {t("bankTitle")}
                                </h3>
                                <p className="mt-1 text-[14px] text-slate-500">
                                    {t("bankDescription")}
                                </p>
                            </div>
                        </div>

                        <dl className="mt-7">
                            {bankDetails.map((detail, index) => (
                                <div
                                    key={detail.id}
                                    className={`flex items-center justify-between gap-4 py-4 ${
                                        index > 0
                                            ? "border-t border-slate-200"
                                            : ""
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <dt className="text-[12px] uppercase tracking-[0.1em] text-slate-500">
                                            {t(detail.label)}
                                        </dt>
                                        <dd className="mt-1 break-all text-[15px] font-semibold text-ink">
                                            {detail.value}
                                        </dd>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            copyValue(detail.id, detail.value)
                                        }
                                        aria-label={t(
                                            copied === detail.id
                                                ? "copied"
                                                : "copy",
                                        )}
                                        className="flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-ink transition-colors hover:border-primary hover:bg-primary/10"
                                    >
                                        {copied === detail.id ? (
                                            <CheckIcon
                                                size={18}
                                                weight="bold"
                                            />
                                        ) : (
                                            <CopyIcon
                                                size={18}
                                                weight="regular"
                                            />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </dl>
                    </article>
                </div>

                <p className="mx-auto mt-6 max-w-[760px] text-center text-[13px] leading-relaxed text-slate-500">
                    {t("transferNote")}
                </p>
            </div>
        </section>
    );
}