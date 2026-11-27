import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Questrial } from "next/font/google";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import "./globals.css";

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-questrial",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "404 | Page not found",
    description: "The page you are looking for could not be found.",
};

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body
                className={`${questrial.variable} ${playfair.variable} antialiased`}
            >
                <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-12">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full border border-dashed border-primary/20"
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-36 -left-36 h-[440px] w-[440px] rounded-full border border-primary/10"
                    />

                    <div className="container relative">
                        <section className="mx-auto grid max-w-[1000px] overflow-hidden rounded-[28px] border border-slate-200 bg-white md:grid-cols-[0.9fr_1.1fr]">
                            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-ink p-8 md:min-h-[460px]">
                                <span
                                    aria-hidden="true"
                                    className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full border border-dashed border-white/15"
                                />
                                <span
                                    aria-hidden="true"
                                    className="absolute -bottom-24 -left-20 h-[260px] w-[260px] rounded-full border border-white/10"
                                />

                                <span className="relative bg-linear-to-r from-primary to-white bg-clip-text font-display text-[clamp(120px,25vw,210px)] leading-none text-transparent">
                                    404
                                </span>
                            </div>

                            <div className="flex flex-col justify-center p-7 min-[481px]:p-10 lg:p-14">
                                <span className="inline-flex w-fit items-center rounded-full border border-neutral-400/50 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-ink">
                                    Error 404
                                </span>

                                <h1 className="mt-6 text-[clamp(32px,5vw,48px)] leading-[1.1]">
                                    Page not found
                                </h1>

                                <p className="mt-5 max-w-[420px] text-[15px] leading-relaxed text-slate-600">
                                    The page you’re looking for doesn’t exist or
                                    may have been moved.
                                </p>

                                <Link
                                    href="/en"
                                    className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-primary py-[10px] pl-6 pr-[10px] text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-[2px] hover:brightness-110"
                                >
                                    Back to homepage
                                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-[2px]">
                                        <ArrowRightIcon
                                            size={16}
                                            weight="bold"
                                        />
                                    </span>
                                </Link>
                            </div>
                        </section>
                    </div>
                </main>
            </body>
        </html>
    );
}