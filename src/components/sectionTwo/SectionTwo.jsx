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


    // sections.forEach(section => {
    //   gsap.set(section, { opacity: 0, y: 50 }); // начальное состояние
    // });

    sections.forEach(section => {
      const hasDelayClass = section.classList.contains('delay-animation');
      const delay = hasDelayClass ? 0.2 : 0;

      gsap.fromTo(section, 
        { opacity: 0, y: 50 }, // начальное состояние
        {
          opacity: 1,
          y: 0,
          delay: delay,
          once: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%', // когда верх секции достигает 99% высоты окна
            // toggleActions: 'play none none reverse', // анимация будет воспроизводиться при скролле
            once: true, // анимация произойдет только один раз // анимация будет воспроизводиться при скролле
          },
        }
      );
    });
  }, []);



  return (
    <>
    <div className="pl-2.5 pr-2.5">  
      <section className='sectionTwo fade-in-section opacity-0'>
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
