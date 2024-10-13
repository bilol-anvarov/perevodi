import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18n as nextI18NextConfig } from './next-i18next.config.mjs';
import commonRu from './public/locales/ru/common.json';
import commonUz from './public/locales/uz/common.json';


const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || nextI18NextConfig.defaultLocale;
  }
  return nextI18NextConfig.defaultLocale;
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: nextI18NextConfig.defaultLocale,
    lng: getInitialLanguage(),
    debug: true,
    resources: {
      ru: {
        common: commonRu,
      },
      uz: {
        common: commonUz,
      },
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
