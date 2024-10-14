'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import "./History.css"

export default function History() {
    const { t } = useTranslation()

  return (
    <section id='history'>
        <h2 className="title">{t('mainPage.history.title')}</h2>
        <div className="mainCtr">
            <div className="info">
                <h3>Золотая курочка</h3>
                <p>Я несу яички, а мои пёрышки используют в подушках, одеялках и даже в тёплой одёжке. В будние дни я суечусь на кухне, готовлю еду для всех фермерских деток.</p>
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
                
            </div>
        </div>
    </section>
  )
}
