'use client'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMainContext } from '@/context/MainContext';
import secureLocalStorage from 'react-secure-storage';

const LANGUAGES = [
  { code: 'uz', label: 'UZ', alt: 'Flag of Uzbekistan' },
  { code: 'ru', label: 'RU', alt: 'Flag of Russia' },
  { code: 'en', label: 'EN', alt: 'Flag of England' },
];

export default function BtnsChangeLng() {
  const { changeLan, activeLan } = useMainContext();
  const [ifOpenLangBar, setIfOpenLangBar] = useState(false);
  const { i18n } = useTranslation();

  const currentLang = activeLan || 'uz';

  const changeLanguage = (lng) => {
    changeLan(lng);
    secureLocalStorage.setItem('i18nextLng', lng);
    setIfOpenLangBar(false); // close after selecting
  };

  // Close on outside click
  useEffect(() => {
    if (!ifOpenLangBar) return; // skip listener when already closed

    const close = (e) => {
      const menu = document.querySelector('.language_menu');
      if (menu && !menu.contains(e.target)) {
        setIfOpenLangBar(false);
      }
    };

    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [ifOpenLangBar]);

  // Other languages to show in dropdown (all except active)
  const otherLangs = LANGUAGES.filter((l) => l.code !== currentLang);

  return (
    <div
      className="language_menu"
      onClick={() => setIfOpenLangBar((prev) => !prev)}
    >
      {/* Active language flag */}
      <div className="flag">
        <img
          src={`/flag_${currentLang}.svg`}
          alt={LANGUAGES.find((l) => l.code === currentLang)?.alt}
        />
      </div>

      {/* Dropdown */}
      <div className={`language_bar${ifOpenLangBar ? ' show' : ''}`}>
        <div className="language_bar_inside">
          {otherLangs.map((lang) => (
            <div
              key={lang.code}
              className="flag"
              onClick={(e) => {
                e.stopPropagation(); // prevent re-toggling the menu
                changeLanguage(lang.code);
              }}
            >
              <img src={`/flag_${lang.code}.svg`} alt={lang.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
