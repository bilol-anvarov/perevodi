'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SectionTwo.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
gsap.registerPlugin(ScrollTrigger);



export default function SectionTwo() {
    const block1Ref = useRef(null);
    const block3Ref = useRef(null);

    
  const { t } = useTranslation();

  useEffect(() => {
    const block1 = block1Ref.current;
    const block3 = block3Ref.current;

    // Анимация для первого блока (выползание сверху)
    gsap.from(block1, {
      y: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: block1,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    });

    // Анимация для третьего блока (выползание сверху после исчезновения первого блока)
    gsap.from(block3, {
      y: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: block1,
        start: "top top", // Начало анимации третьего блока, когда первый блок исчезает
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);



  return (
    <>
    <div className="pl-2.5 pr-2.5">  
      <section className='sectionTwo '>
          <h2 className="title">{t('mainPage.sectionTwo.title')}</h2>
          {/* <div className="images">
              <img className='img1' src="/Средний план.svg" alt="" />
              <img className='img2' src="/Передний план.svg" alt="" />
              <img className='img3' src="/Задний план (Озеро).svg" alt="" />
              <img className='img4' src="/Облака.svg" alt="" />
              </div> */}
      </section>
      <section className='sectionThree '>
          <h2 className="title">{t('mainPage.sectionThree.title')}</h2>
      </section>
      <section className='sectionFour '>
          <h2 className="title">{t('mainPage.sectionFour.title')}</h2>
      </section>
    </div>
    </>
  )
}
