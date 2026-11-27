export type ReportCategory = "institutional";

export type Report = {
    slug: string;
    title: {
        fr: string;
        en: string;
    };
    category: ReportCategory;
    date: string;
    summary: {
        fr: string;
        en: string;
    };
    fileUrl: string;
};

export const reports: Report[] = [
    {
        slug: "certificat",
        title: {
            fr: "Certificat",
            en: "Certificate",
        },
        category: "institutional",
        date: "2026-11-26",
        summary: {
            fr: "Document institutionnel partagé par Waza and Act. Consultez le PDF pour en découvrir le contenu.",
            en: "An institutional document shared by Waza and Act. Open the PDF to view its contents.",
        },
        fileUrl: "/certificat.pdf",
    },
];

export function getReportBySlug(slug: string): Report | undefined {
    return reports.find((report) => report.slug === slug);
}