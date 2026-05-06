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
       <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.5657 20.5L15.5657 14.5M17.5657 9.5C17.5657 10.4193 17.3846 11.3295 17.0328 12.1788C16.6811 13.0281 16.1654 13.7997 15.5154 14.4497C14.8654 15.0998 14.0938 15.6154 13.2445 15.9672C12.3952 16.3189 11.4849 16.5 10.5657 16.5C9.64643 16.5 8.73618 16.3189 7.8869 15.9672C7.03762 15.6154 6.26595 15.0998 5.61594 14.4497C4.96593 13.7997 4.45031 13.0281 4.09853 12.1788C3.74675 11.3295 3.56569 10.4193 3.56569 9.5C3.56569 7.64348 4.30318 5.86301 5.61594 4.55025C6.92869 3.2375 8.70917 2.5 10.5657 2.5C12.4222 2.5 14.2027 3.2375 15.5154 4.55025C16.8282 5.86301 17.5657 7.64348 17.5657 9.5Z"/>
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