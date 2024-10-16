'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SectionTwo.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
gsap.registerPlugin(ScrollTrigger);



export default function SectionTwo() {
    
  const { t } = useTranslation();

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');




    sections.forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 }, // начальное состояние
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 99%', // когда верх секции достигает 80% высоты окна
            toggleActions: 'play none none reverse', // анимация будет воспроизводиться при скролле
          },
        }
      );
    });
  }, []);



  return (
    <>
    <div className="pl-2.5 pr-2.5">  
      <section className='fade-in-section sectionTwo opacity-0'>
          <h2 className="title">{t('mainPage.sectionTwo.title')}</h2>
      </section>
      <section className='fade-in-section sectionThree opacity-0'>
          <h2 className="title">{t('mainPage.sectionThree.title')}</h2>
      </section>
      <section className='fade-in-section sectionFour opacity-0'>
          <img src="/Frame 40445.svg" className='sectionFourImg' alt="" />
          <h2 className="title">{t('mainPage.sectionFour.title')}</h2>
      </section>
    </div>
    </>
  )
}
