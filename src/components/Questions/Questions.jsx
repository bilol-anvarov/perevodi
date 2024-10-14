'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import './Questions.css'
import QuestionCard from './QuestionCard'

export default function Questions() {
    const { t } = useTranslation()

  return (
    <section className='questions'>
        <h2 className="title">{t('mainPage.questions.title')}</h2>
        <div className="cards">
            <QuestionCard question={t('mainPage.questions.card1.title')} answer={t('mainPage.questions.card1.descr')} />
            <QuestionCard question={t('mainPage.questions.card2.title')} answer={t('mainPage.questions.card2.descr')} />
            <QuestionCard question={t('mainPage.questions.card3.title')} answer={t('mainPage.questions.card3.descr')} />
            <QuestionCard question={t('mainPage.questions.card4.title')} answer={t('mainPage.questions.card4.descr')} />
        </div>
    </section>
  )
}
