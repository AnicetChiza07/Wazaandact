import type { Metadata } from "next";
import { Playfair_Display, Questrial } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const instant = false;

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
    title: "Waza and Act",
    description: "Organisation humanitaire en RDC",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${questrial.variable} ${playfair.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}