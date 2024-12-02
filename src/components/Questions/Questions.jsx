'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Questions.css'
import QuestionCard from './QuestionCard'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

export default function Questions() {
    const { t } = useTranslation()
    
  // useEffect(() => {
  //   const sections = document.querySelectorAll('.fade-in-section');

  //   sections.forEach(section => {
  //     gsap.fromTo(section, 
  //       { opacity: 0, y: 50 }, // начальное состояние
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scrollTrigger: {
  //           trigger: section,
  //           start: 'top 90%', // когда верх секции достигает 80% высоты окна
  //           toggleActions: 'play none none reverse', // анимация будет воспроизводиться при скролле
  //           once: true,
  //         },
  //       }
  //     );
  //   });
  // }, []);



  return (
    <section className='questions' id='questions'>
        <h2 className="title">{t('mainPage.questions.title')}</h2>
        <div className="cards">
            <QuestionCard question={t('mainPage.questions.card1.title')} answer={t('mainPage.questions.card1.descr')} />
            <QuestionCard question={t('mainPage.questions.card2.title')} answer={t('mainPage.questions.card2.descr')} />
            <QuestionCard question={t('mainPage.questions.card3.title')} answer={t('mainPage.questions.card3.descr')} />
            <QuestionCard question={t('mainPage.questions.card4.title')} answer={t('mainPage.questions.card4.descr')} />
            <QuestionCard question={t('mainPage.questions.card5.title')} answer={t('mainPage.questions.card5.descr')} />
            <QuestionCard question={t('mainPage.questions.card6.title')} answer={t('mainPage.questions.card6.descr')} />
            <QuestionCard question={t('mainPage.questions.card7.title')} answer={t('mainPage.questions.card7.descr')} />
        </div>
        <div className="banner mt-[60px]">
          <img src="/banner.png" className='max-[1023px]:hidden w-full rounded-[32px]' alt="sda" />
          <img src="/bannerMobile.png" className='lg:hidden w-full rounded-[32px]' alt="ads" />
        </div>
    </section>
  )
}
