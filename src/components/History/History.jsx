'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import "./History.css"
import api, { testApi } from '@/utils/api'
import { useMainContext } from '@/context/MainContext'




async function fetchBranch({activeLan}) {
    const response = await testApi.get(`toys-list/`,  {
      headers: {
          "Accept-Language": activeLan,
      },
    })
    return response.data;
  }



  
export default function History() {

    const {activeLan} = useMainContext()
    const { t } = useTranslation()
    const [products, setData] = useState([])


    const [currentIndex, setCurrentIndex] = useState(0);

    const currentProduct = products[currentIndex];


  
    // Переключение на следующий продукт
    const nextProduct = () => {
      setCurrentIndex((currentIndex + 1) % products.length);
    };
  
    // Переключение на предыдущий продукт
    const prevProduct = () => {
      setCurrentIndex((currentIndex - 1 + products.length) % products.length);
    };

    useEffect(() => {
        fetchBranch(activeLan).then(info => {
          setData(info);
        });
    }, [activeLan]);
    
    
  return (
    <section id='history'>
    <h2 className="title">{t('mainPage.history.title')}</h2>
    <div className="mainCtr">
      <div className="info">
        <h3>{currentProduct && currentProduct.name}</h3>
        <p>{currentProduct && currentProduct.description}</p>
        <button type="button">
          {t('mainPage.history.more')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M2.66663 8.5H13.3333M13.3333 8.5L9.33329 4.5M13.3333 8.5L9.33329 12.5"
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
          <button className={`slider-arrow ${currentIndex === 0 ? 'disabled' : ''}`} onClick={prevProduct}>
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

          <img src={currentProduct && currentProduct.picture} alt={currentProduct && currentProduct.name} />

          <button className={`slider-arrow ${currentIndex === products.length ? 'disabled' : ''}`} onClick={nextProduct}>
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
        <div className="role">
          {currentProduct && currentProduct.role}
        </div>
      </div>
    </div>
  </section>
  )
}
