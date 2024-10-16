'use client'
import React from 'react'
import './Conditions.css'
import { useTranslation } from 'react-i18next';



export default function ConditionCard({number, text, dalay}) {

    const { t } = useTranslation();

  return (
    <div className={`card fade-in-section opacity-0 ${dalay && 'delay-animation'}`}>
        <div className="CardHeading">
            <span className='number'>{number}</span>
            <h4>{t(`mainPage.conditions.${text}.title`)}</h4>
        </div>
        <p className='descr'>{t(`mainPage.conditions.${text}.descr`)}</p>
    </div>
  )
}
