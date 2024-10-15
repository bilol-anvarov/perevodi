'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "./History.css";
import { testApi } from '@/utils/api';
import { useMainContext } from '@/context/MainContext';

async function fetchBranch({ activeLan }) {
  const response = await testApi.get(`toys-list/`, {
    headers: {
      "Accept-Language": activeLan,
    },
  });
  return response.data;
}

export default function History() {
  const { activeLan } = useMainContext();
  const { t } = useTranslation();
  const [products, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBranch(activeLan).then(info => {
      setData(info);
    });
  }, [activeLan]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section id='history'>
      <h2 className="title">{t('mainPage.history.title')}</h2>
      <div className="mainCtr">
        <div className="info">
          {activeLan === "uz" ? (
            <h3>{products[currentIndex]?.name_uz}</h3>
          ) : (
            <h3>{products[currentIndex]?.name_ru}</h3>
          )}
          {activeLan === "uz" ? (
            <p>{products[currentIndex]?.description_uz}</p>
          ) : (
            <p>{products[currentIndex]?.description_ru}</p>
          )}
          <button type="button">
            {t('mainPage.history.more')}
          </button>
        </div>
        <div className="island">
            <div className="slider">
                <button className={`slider-arrow ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        >
                        <path
                            d="M13.3333 8L2.66665 8M2.66665 8L6.66665 12M2.66665 8L6.66665 4"
                            stroke="#F4ECD9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    <div className="imgCtr">
                        <img src={products[currentIndex]?.picture} alt={products[currentIndex]?.name} />

                    </div>
                </motion.div>
            <button className={`slider-arrow ${currentIndex === products.length ? 'disabled' : ''}`} onClick={handleNext}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    >
                    <path
                        d="M2.66669 8H13.3334M13.3334 8L9.33335 4M13.3334 8L9.33335 12"
                        stroke="#F4ECD9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>

            </button>
                    </div>
        </div>
      </div>
    </section>
  );
}
