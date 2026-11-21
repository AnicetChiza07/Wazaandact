import { getTranslations } from 'next-intl/server';
// Indique à Next.js 16 que cette route peut bloquer le pré-rendu 
// car elle dépend des paramètres dynamiques (locale)
export const instant = false;

export default async function Home({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    // On récupère la locale de manière asynchrone
    const { locale } = await params;
  
    // On charge les traductions côté serveur (optimisé)
    const t = await getTranslations({ locale, namespace: 'Home' });
  
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold">{t('title')}</h1>
                <p className="text-lg">{t('description')}</p>
            </main>
        </div>
    );
}