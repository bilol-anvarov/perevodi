'use client'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './Services.scss';

const SERVICES = [
  {
    key: 'apostille',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: 'legalization',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h18M3 12h18M3 18h18" />
        <rect x="2" y="3" width="20" height="18" rx="2" />
      </svg>
    ),
  },
  {
    key: 'translation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5h12M9 3v2m-3.232 13.232l2.828-2.829m0 0l2.829 2.829M9.768 15.404A7.49 7.49 0 0112 15c1.004 0 1.96.19 2.84.536M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    key: 'notarial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    key: 'personal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0M9 12h6m-6 4h6" />
      </svg>
    ),
  },
  {
    key: 'medical',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'consultation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="services section">
      <div className="container">

        <div className="section-header">
          <span className="section-header__eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section-header__title">{t('services.title')}</h2>
          <p className="section-header__subtitle">{t('services.subtitle')}</p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <div key={service.key} className="services__card">
              <div className="services__card-icon">
                {service.icon}
              </div>
              <h3 className="services__card-title">
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="services__card-desc">
                {t(`services.items.${service.key}.desc`)}
              </p>
              <Link href="/services" className="services__card-link">
                {t('services.learnMore')} →
              </Link>
            </div>
          ))}
        </div>

        <div className="services__cta">
          <Link href="/contact" className="btn btn--primary">
            {t('services.cta')}
          </Link>
        </div>

      </div>
    </section>
  );
}