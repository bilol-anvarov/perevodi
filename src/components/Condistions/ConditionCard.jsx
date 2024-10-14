'use client'
import React from 'react'
import './Conditions.css'
import { useTranslation } from 'react-i18next';



export default function ConditionCard({number, text}) {

    const { t } = useTranslation();

  return (
    <div className='card'>
        <div className="CardHeading">
            <span className='number'>{number}</span>
            <h4>{t(`mainPage.conditions.${text}.title`)}</h4>
        </div>
        <p className='descr'>{t(`mainPage.conditions.${text}.descr`)}</p>
    </div>
  )
}
