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



const Popup = ({product, setIsPopup, activeLan}) => {
    document.body.style.overflow = "hidden";
    console.log(product)
    if(!product) return null
    return (
        <div className="popup">
            <div className="closeBtn fixed top-[100px] right-[70px]" onClick={()=>{setIsPopup(false)}}>X</div>
            <div className="popupInside">
            {activeLan === "uz" ? (
                <h2 className="mb-[20px]">{product.name_uz}</h2>
            ) : (
                <h2 className="mb-[20px]">{product.name_ru}</h2>
            )}
            {activeLan === "uz" ? (
                <p>{product.description_uz}</p>
            ) : (
                <p>{product.description_ru}</p>
            )}
            <br />
            {activeLan === "uz" ? (
                <p>{product.facts_uz}</p>
            ) : (
                <p>{product.facts_ru}</p>
            )}
            <br />
            {activeLan === "uz" ? (
                <p>{product.short_description_uz}</p>
            ) : (
                <p>{product.short_description_ru}</p>
            )}

            </div>
        </div>
    )
}

export default function History() {
  const { activeLan } = useMainContext();
  const { t } = useTranslation();
  const [products, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopup, setIsPopup] = useState(false)

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

  useEffect(()=>{
    if(!isPopup) {
        document.body.style.overflow = "";
    }
  },[isPopup])

  console.log(products)
  return (
    <>
    <section id='history'>
      <h2 className="title">{t('mainPage.history.title')}</h2>
      <div className="mainCtr">
        <div className="info">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.5 }}
            >
          {activeLan === "uz" ? (
            <h3 className="mb-[20px]">{products[currentIndex]?.name_uz}</h3>
          ) : (
            <h3 className="mb-[20px]">{products[currentIndex]?.name_ru}</h3>
          )}
          {activeLan === "uz" ? (
            <p>{products[currentIndex]?.description_uz}</p>
          ) : (
            <p>{products[currentIndex]?.description_ru}</p>
          )}
            </motion.div>
          <button type="button" onClick={()=>{setIsPopup(true)}}>
            {t('mainPage.history.more')}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={11}
                    viewBox="0 0 14 11"
                    fill="none"
                >
                <path
                    d="M1.66663 5.5H12.3333M12.3333 5.5L8.33329 1.5M12.3333 5.5L8.33329 9.5"
                    stroke="#F4ECD9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>

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
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
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
            {activeLan === "uz" ? (
            <div className="role">{products[currentIndex]?.role_uz}</div>
          ) : (
            <div className="role">{products[currentIndex]?.role_ru}</div>
          )}
        </div>
      </div>
    </section>
    {isPopup && <Popup product={products[currentIndex]} activeLan={activeLan}setIsPopup={setIsPopup}/>}

      </>
  );
}
