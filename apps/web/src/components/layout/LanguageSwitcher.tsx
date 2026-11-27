"use client";

import { useRouter, usePathname } from "next/navigation";

const languages = [
    { code: "fr", label: "FR", name: "Français", flagUrl: "https://flagcdn.com/w80/fr.png" },
    { code: "en", label: "EN", name: "English", flagUrl: "https://flagcdn.com/w80/gb.png" },
];

type Props = {
    /** true : header blanc (après scroll / menu mobile) — false : header transparent sur l'image */
    solid?: boolean;
};

export default function LanguageSwitcher({ solid = true }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    // Langue active depuis l'URL (ex: "/fr/..." -> "fr")
    const currentLocale = pathname.split("/")[1] || "fr";

    // On affiche la langue vers laquelle on peut basculer
    const target = languages.find((l) => l.code !== currentLocale) || languages[1];

    const handleSwitch = () => {
        const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
        router.push(`/${target.code}${pathWithoutLocale}`);
    };

    return (
        <button
            type="button"
            onClick={handleSwitch}
            lang={target.code}
            aria-label={target.name}
            title={target.name}
            className={`group inline-flex cursor-pointer items-center gap-[10px] rounded-full border py-[5px] pl-[5px] pr-4 text-[13px] font-medium tracking-[0.12em] transition-all duration-300 focus-visible:outline-white ${
                solid
                    ? "border-slate-200 bg-white/70 text-ink hover:border-primary/60 hover:bg-primary/10"
                    : "border-white/25 bg-white/10 text-white hover:border-primary hover:bg-white/20"
            }`}
        >
            <span
                key={target.code}
                className="animate-fade-up relative flex h-[25px] w-[25px] shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={target.flagUrl}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </span>
            <span key={`${target.code}-label`} className="animate-fade-up">
                {target.label}
            </span>
        </button>
    );
}