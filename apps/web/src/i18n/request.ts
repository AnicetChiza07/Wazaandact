import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
  
    // Garantir que locale est toujours une chaîne valide
    const resolvedLocale = locale ?? routing.defaultLocale;
    const finalLocale = routing.locales.includes(resolvedLocale as Locale) 
        ? resolvedLocale 
        : routing.defaultLocale;

  return {
        locale: finalLocale,
        messages: (await import(`../../messages/${finalLocale}.json`)).default
  };
});