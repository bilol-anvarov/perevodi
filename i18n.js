import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18n as nextI18NextConfig } from './next-i18next.config.mjs';
import commonRu from './public/locales/ru/common.json';
import commonUz from './public/locales/uz/common.json';
import commonEn from './public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: nextI18NextConfig.defaultLocale,
    lng: nextI18NextConfig.defaultLocale, // always start with default, MainContext handles the real value on mount
    debug: process.env.NODE_ENV === 'development', // disable debug in production
    resources: {
      ru: { common: commonRu },
      uz: { common: commonUz },
      en: { common: commonEn },
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
