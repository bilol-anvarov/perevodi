import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: localStorage.getItem("i18nextLng") || "uz",
        detection: {
            order: ["queryString", "cookie"],
            cache: ["cookie"],
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
    });


// Получение языка из secureLocalStorage
const savedLanguage = localStorage.getItem("i18nextLng");

// Если сохраненный язык есть, устанавливаем его
if (savedLanguage) {
    i18n.changeLanguage(savedLanguage);
}


const saveLanguageToLocalStorage = (lang) => {
    localStorage.setItem("i18nextLng", lang);
};

export { i18n, saveLanguageToLocalStorage };