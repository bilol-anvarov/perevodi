'use client'
import { useTranslation } from 'react-i18next';
import './WhyUs.scss';

const REASONS = [
  {
    key: 'confidential',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    stat: '100%',
  },
  {
    key: 'speed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    stat: '24/7',
  },
  {
    key: 'countries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    stat: '50+',
  },
  {
    key: 'quality',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    stat: '№1',
  },
];

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="whyus section">
      <div className="whyus__bg" />

      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">{t('whyus.eyebrow')}</span>
          <h2 className="section-header__title">{t('whyus.title')}</h2>
          <p className="section-header__subtitle">{t('whyus.subtitle')}</p>
        </div>

        <div className="whyus__grid">
          {REASONS.map((reason) => (
            <div key={reason.key} className="whyus__card">
              <div className="whyus__card-top">
                <div className="whyus__card-icon">
                  {reason.icon}
                </div>
                <span className="whyus__card-stat">{reason.stat}</span>
              </div>
              <h3 className="whyus__card-title">
                {t(`whyus.items.${reason.key}.title`)}
              </h3>
              <p className="whyus__card-desc">
                {t(`whyus.items.${reason.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}