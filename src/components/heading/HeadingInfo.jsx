'use client'
import React from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function HeadingInfo() {

    const { t } = useTranslation();

    return (
        <div className="info">
            <h1>{t('mainPage.heading.headingText')}</h1>
            <p>{t('mainPage.heading.description')}</p>
            <div className="btnTitle">
                <Link href="#getToys">
                    <span className="btn">
                        {t('mainPage.heading.participate')}
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
                    </span>
                    
                </Link>
                <div className="title">
                    {/* <span className="free">{t('mainPage.heading.free')}</span> */}
                    <span className="date">{t('mainPage.heading.dates')}</span>
                </div>
            </div>
        </div>
    )
}
