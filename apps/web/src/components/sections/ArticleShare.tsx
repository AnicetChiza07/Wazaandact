"use client";

import { useState } from "react";
import {
    FacebookLogoIcon,
    LinkedinLogoIcon,
    LinkSimpleIcon,
    XLogoIcon,
} from "@phosphor-icons/react";

type ArticleShareProps = {
    title: string;
    copyLabel: string;
    copiedLabel: string;
    shareLabel: string;
};

export default function ArticleShare({
    title,
    copyLabel,
    copiedLabel,
    shareLabel,
}: ArticleShareProps) {
    const [copied, setCopied] = useState(false);

    function shareOnFacebook() {
        const url = new URL(
            "https://www.facebook.com/sharer/sharer.php",
        );
        url.searchParams.set("u", window.location.href);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
    }

    function shareOnLinkedIn() {
        const url = new URL(
            "https://www.linkedin.com/sharing/share-offsite/",
        );
        url.searchParams.set("url", window.location.href);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
    }

    function shareOnX() {
        const url = new URL("https://twitter.com/intent/tweet");
        url.searchParams.set("url", window.location.href);
        url.searchParams.set("text", title);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }

    const buttonClassName =
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink transition-colors hover:border-primary hover:bg-primary";

    return (
        <div className="flex flex-wrap items-center justify-start gap-3">
            <p className="text-[14px] font-medium text-ink">
                {shareLabel}
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={shareOnFacebook}
                    aria-label="Facebook"
                    className={buttonClassName}
                >
                    <FacebookLogoIcon size={19} weight="regular" />
                </button>

                <button
                    type="button"
                    onClick={shareOnLinkedIn}
                    aria-label="LinkedIn"
                    className={buttonClassName}
                >
                    <LinkedinLogoIcon size={19} weight="regular" />
                </button>

                <button
                    type="button"
                    onClick={shareOnX}
                    aria-label="X"
                    className={buttonClassName}
                >
                    <XLogoIcon size={19} weight="regular" />
                </button>

                <button
                    type="button"
                    onClick={copyLink}
                    aria-label={copied ? copiedLabel : copyLabel}
                    title={copied ? copiedLabel : copyLabel}
                    className={buttonClassName}
                >
                    <LinkSimpleIcon size={18} weight="regular" />
                </button>

                <span className="sr-only" aria-live="polite">
                    {copied ? copiedLabel : ""}
                </span>
            </div>
        </div>
    );
}