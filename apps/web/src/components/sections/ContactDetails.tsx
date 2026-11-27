import {
    EnvelopeSimpleIcon,
    MapPinLineIcon,
    PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";

export default function ContactDetails() {
    const t = useTranslations("ContactPage");

    return (
        <section className="section bg-slate-50">
            <div className="container">
                <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Coordonnées */}
                    <aside className="flex flex-col justify-center border border-white/20 bg-ink p-7 text-white min-[481px]:p-9 lg:rounded-r-none lg:rounded-l-[24px]">
                        <span className="inline-flex w-fit items-center rounded-full border border-white/25 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-white">
                            {t("contactBadge")}
                        </span>

                        <h2 className="mt-5 font-display text-[clamp(26px,3vw,36px)] leading-tight text-white">
                            {t("contactTitle")}
                        </h2>

                        <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                            {t("contactDescription")}
                        </p>

                        <div className="mt-8 space-y-6">
                            {/* Téléphones regroupés */}
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                                    <PhoneIcon size={21} weight="regular" />
                                </span>

                                <div className="flex flex-col gap-1 pt-1">
                                    <a
                                        href="tel:+243819795060"
                                        className="w-fit text-[15px] text-white/75 transition-colors hover:text-primary"
                                    >
                                        (+243) 819 795 060
                                    </a>
                                    <a
                                        href="tel:+243991901271"
                                        className="w-fit text-[15px] text-white/75 transition-colors hover:text-primary"
                                    >
                                        (+243) 991 901 271
                                    </a>
                                </div>
                            </div>

                            {/* Adresses e-mail regroupées */}
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                                    <EnvelopeSimpleIcon size={21} weight="regular" />
                                </span>

                                <div className="flex flex-col gap-1 pt-1">
                                    <a
                                        href="mailto:info@wazaandact.org"
                                        className="w-fit break-all text-[15px] text-white/75 transition-colors hover:text-primary"
                                    >
                                        info@wazaandact.org
                                    </a>
                                    <a
                                        href="mailto:wazaandact@gmail.com"
                                        className="w-fit break-all text-[15px] text-white/75 transition-colors hover:text-primary"
                                    >
                                        wazaandact@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Adresse */}
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-ink">
                                    <MapPinLineIcon size={21} weight="regular" />
                                </span>

                                <p className="max-w-[320px] pt-1 text-[15px] leading-relaxed text-white/75">
                                    Q. Murara, Comm. Goma, Av. Rwenzori,
                                    Boulevard Julien Paluku, N. 003, Goma, RDC
                                </p>
                            </div>
                        </div>

                        {/* Plainte alignée sur le bord gauche du panneau */}
                        <div className="mt-7 border-t border-white/15 pt-5">
                            <p className="text-[13px] leading-relaxed text-white/60">
                                {t("complaintsNote")}
                            </p>
                            <a
                                href="mailto:plainte@wazaandact.org"
                                className="mt-1 inline-block break-all text-[14px] font-medium text-primary transition-colors hover:text-white"
                            >
                                plainte@wazaandact.org
                            </a>
                        </div>
                    </aside>

                    {/* Formulaire frontend, à connecter au backend plus tard */}
                    <div className="border border-slate-200 bg-white p-7 min-[481px]:p-9 lg:rounded-l-none lg:rounded-r-[24px]">
                        <p className="max-w-[620px] text-[15px] leading-relaxed text-slate-600">
                            {t("formDescription")}
                        </p>

                        <form className="mt-8 space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-2 block text-[14px] font-medium text-ink"
                                    >
                                        {t("nameLabel")}
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        placeholder={t("namePlaceholder")}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-2 block text-[14px] font-medium text-ink"
                                    >
                                        {t("emailFieldLabel")}
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder={t("emailPlaceholder")}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-subject"
                                    className="mb-2 block text-[14px] font-medium text-ink"
                                >
                                    {t("subjectLabel")}
                                </label>
                                <input
                                    id="contact-subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder={t("subjectPlaceholder")}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-[14px] font-medium text-ink"
                                >
                                    {t("messageLabel")}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={6}
                                    required
                                    placeholder={t("messagePlaceholder")}
                                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
                                />
                            </div>

                            <button
                                type="button"
                                disabled
                                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-primary px-7 py-3 text-[15px] font-semibold text-ink opacity-70"
                            >
                                {t("submit")}
                            </button>

                            <p className="text-[13px] leading-relaxed text-slate-500">
                                {t("formNote")}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}