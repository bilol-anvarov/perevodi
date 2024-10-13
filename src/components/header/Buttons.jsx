'use client'
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMainContext } from '@/context/MainContext';
import secureLocalStorage from 'react-secure-storage';

export default function BtnsChangeLng() {
  const { changeLan, activeLan } = useMainContext();
  const [ifOpenLangBar, setIfOpenLangBar] = useState(false);
  const { i18n } = useTranslation();



  const changeLanguage = (lng) => {
    changeLan(lng);
    secureLocalStorage.setItem('i18nextLng', lng);
  };

  useEffect(() => {

    const close = (event) => {
      let item = document.querySelector('.language_menu');
      if (item && !item.contains(event.target) && ifOpenLangBar) {
        setIfOpenLangBar(false);
      }
    };

    window.addEventListener('click', close);

    return () => {
      window.removeEventListener('click', close);
    };
  }, [i18n, ifOpenLangBar]);




  return (
    <div className="language_menu" onClick={() => setIfOpenLangBar(!ifOpenLangBar)}>
      <div className="flag">
        <img  src={`/flag_${activeLan ? activeLan : 'uz'}.svg`} alt={`Flag of ${activeLan}`} />
      </div>
      <div className={`language_bar${ifOpenLangBar ? ' show' : ''}`}>
        <div className="language_bar_inside">
          {activeLan === 'ru' ? (
            <div className="flag" onClick={() => changeLanguage('uz')}>
              <img  src="/flag_uz.svg" alt="Flag of Uzbekistan" />
            </div>
          ) : (
            <div className="flag" onClick={() => changeLanguage('ru')}>
              <img  src="/flag_ru.svg" alt="Flag of Russia" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
