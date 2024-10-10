import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const frSupportedLocales = [
  'fr',
  'fr-FR',
  'fr-CA',
  'fr-BE',
  'fr-CH',
  'fr-LU',
  'fr-MC',
];

export default getRequestConfig(async () => {
  const acceptLanguageHeaders = headers().get('accept-language');
  const languages = acceptLanguageHeaders?.split(';');
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = 'en';
  if (languages && isFrenchDetected(languages)) {
    locale = 'fr';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

function isFrenchDetected(languages: string[]) {
  return languages?.some((language) =>
    frSupportedLocales.some((frLocale) => language.includes(frLocale)),
  );
}
