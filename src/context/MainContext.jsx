'use client'
import i18next from "i18next";
import { createContext, useContext, useState, useEffect } from "react";


const MainContext = createContext({});

const SUPPORTED_LANGS = ['uz', 'ru', 'en'];
const DEFAULT_LANG = 'uz';

export function MainContextProvider({ children }) {
  const [activeLan, setActiveLan] = useState(DEFAULT_LANG);

  // Read saved language on mount (client only)
  useEffect(() => {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      setActiveLan(saved);
      i18next.changeLanguage(saved);
    }
  }, []);

  // Sync to localStorage and i18next on change
  useEffect(() => {
    localStorage.setItem('i18nextLng', activeLan);
    i18next.changeLanguage(activeLan);
  }, [activeLan]);

  const changeLan = (language) => {
    if (SUPPORTED_LANGS.includes(language)) {
      setActiveLan(language);
    }
  };

  return (
    <MainContext.Provider value={{ activeLan, changeLan }}>

        {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
