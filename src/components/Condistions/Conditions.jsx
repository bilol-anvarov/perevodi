'use client'
import React from 'react'
import './Conditions.css'
import { useTranslation } from 'react-i18next';
import ConditionCard from './ConditionCard';

export default function Conditions() {

    const { t } = useTranslation();

  return (
    <section className='conditions ' id='getToys'>
        <h2 className='title'>{t('mainPage.conditions.title')}</h2>
        <div className="cards">
            <ConditionCard number={'1'} text={'card1'} />
            <ConditionCard number={'2'} text={'card2'} dalay={true}/>
            <ConditionCard number={'3'} text={'card3'} />
            <ConditionCard number={'4'} text={'card4'} dalay={true}/>
        </div>
    </section>
  )
}
