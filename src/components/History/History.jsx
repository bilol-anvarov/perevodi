'use client'
import React, { useEffect, useState, useRef  } from "react";
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
  const popupRef = useRef(null); // Создаем реф для попапа

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleClickOutside = (event) => {
            // Если клик был вне попапа, закрыть его
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopup(false);
            }
        };

        // Добавляем обработчик события клика
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Убираем обработчик события при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsPopup]);

    if (!product) return null;
    return (
        <div className="popup">
          <div className="closeBtnCtr">
            {/* <div className="closeBtn" onClick={()=>{setIsPopup(false)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M2.99979 3.71784e-05C2.74392 3.71784e-05 2.48776 0.0975058 2.29276 0.293006L0.292762 2.29301C-0.0982383 2.68401 -0.0982383 3.31707 0.292762 3.70707L7.58573 11L0.292762 18.293C-0.0982383 18.684 -0.0982383 19.3171 0.292762 19.7071L2.29276 21.7071C2.68376 22.0981 3.31682 22.0981 3.70682 21.7071L10.9998 14.4141L18.2928 21.7071C18.6828 22.0981 19.3168 22.0981 19.7068 21.7071L21.7068 19.7071C22.0978 19.3161 22.0978 18.683 21.7068 18.293L14.4139 11L21.7068 3.70707C22.0978 3.31707 22.0978 2.68301 21.7068 2.29301L19.7068 0.293006C19.3158 -0.0979941 18.6828 -0.0979941 18.2928 0.293006L10.9998 7.58598L3.70682 0.293006C3.51132 0.0975058 3.25567 3.71784e-05 2.99979 3.71784e-05Z"
                fill="#105A25"
              />
            </svg>

            </div> */}
          </div>
            <div className="popupInside" ref={popupRef}>
              <div className="name mb-[10px] flex gap-[15px] justify-between">
              {activeLan === "uz" ? (
                <h2 className="mb-[20px]" dangerouslySetInnerHTML={{__html: product.name_uz}} />
              ) : (
                <h2 className="mb-[20px]" dangerouslySetInnerHTML={{__html: product.name_ru}} />
              )}
              <svg
                  onClick={()=>{setIsPopup(false)}}
                  className="cursor-pointer w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx={12} cy={12} r={10} stroke="black" strokeWidth="1.41176" />
                  <path
                    d="M14.5 9.5L9.5 14.5M9.49998 9.49998L14.5 14.5"
                    stroke="black"
                    strokeWidth="1.41176"
                    strokeLinecap="round"
                  />
                </svg>

              </div>
              {activeLan === "uz" ? (
                <div className="role mb-[15px]">{product.role_uz}</div>
              ) : (
                <div className="role mb-[15px]">{product.role_ru}</div>
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




  useEffect(() => {
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        // Задаем случайное начальное положение
        dot.style.top = `${Math.random() * 100}vh`;
        dot.style.left = `${Math.random() * 100}vw`;
  
        // Устанавливаем случайную скорость и направление движения
        const moveX = Math.random() * 2000 - 1000; // Случайное значение по X (-100 до 100)
        const moveY = Math.random() * 2000 - 1000; // Случайное значение по Y (-100 до 100)
        const duration = Math.random() * 40 + 20; // Случайная длительность анимации (3-8 сек)
  
        // Применяем уникальные значения анимации для каждой точки
        dot.style.setProperty('--moveX', `${moveX}px`);
        dot.style.setProperty('--moveY', `${moveY}px`);
        dot.style.setProperty('--duration', `${duration}s`);
      });
  }, []);



  return (
    <>
    <section  id='history' className="fade-in-section opacity-0">
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
            <h3 className="mb-[20px]" dangerouslySetInnerHTML={{__html: products[currentIndex]?.name_uz}} />
          ) : (
            <h3 className="mb-[20px]" dangerouslySetInnerHTML={{__html: products[currentIndex]?.name_ru}} />
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
                    <div className="imgCtr cursor-pointer" onClick={()=>{setIsPopup(true)}}>
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
                <div className="role mb-[15px]">{products[currentIndex]?.role_uz}</div>
              ) : (
                <div className="role mb-[15px]">{products[currentIndex]?.role_ru}</div>
              )}
        </div>
        <div className="dotsCtr">
            {Array.from({ length: 100 }).map((_, i) => (
                <span key={i} className="dot"></span>
            ))}
        </div>
      </div>
    </section>
    {isPopup && <Popup product={products[currentIndex]} activeLan={activeLan}setIsPopup={setIsPopup}/>}

      </>
  );
}
