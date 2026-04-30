'use client'
import i18next from "i18next";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion'


const MainContext = createContext({});

export function MainContextProvider({ children }) {
  const [activeLan, setActiveLan] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("i18nextLng") || "uz";
    }
    return "uz"; // Default language for server-side rendering
  });

 



  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", activeLan);
      i18next.changeLanguage(activeLan);
    }
  }, [activeLan]);

  const changeLan = (language) => {
    setActiveLan(language);
  };

  const values = {
    activeLan,
    changeLan,
  };


  return (
  <MainContext.Provider value={values}>
    {children}
  </MainContext.Provider>);
}

export function useMainContext() {
  return useContext(MainContext);
}