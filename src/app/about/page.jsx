'use client'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './about.scss';

const STATS = [
  { key: 'years',    value: '16+' },
  { key: 'clients',  value: '5000+' },
  { key: 'countries',value: '50+' },
  { key: 'docs',     value: '20000+' },
];

const VALUES = [
  {
    key: 'confidential',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    key: 'accuracy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: 'speed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    key: 'legal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6l9-4 9 4v6c0 5.25-3.75 10.15-9 11.5C6.75 22.15 3 17.25 3 12V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const PROCESS = [
  { key: 'apply' },
  { key: 'consult' },
  { key: 'process' },
  { key: 'deliver' },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="about-page">

      {/* ── Hero ── */}
      <section className="about-page__hero">
        <div className="container">
          <div className="about-page__hero-inner">
            <div className="about-page__hero-content">
              <span className="section-header__eyebrow">{t('about.eyebrow')}</span>
              <h1 className="about-page__hero-title">{t('about.title')}</h1>
              <p className="about-page__hero-desc">{t('about.desc')}</p>
              <Link href="/contact" className="btn btn--primary">
                {t('about.cta')}
              </Link>
            </div>

            {/* Stats */}
            <div className="about-page__stats">
              {STATS.map((stat) => (
                <div key={stat.key} className="about-page__stat">
                  <span className="about-page__stat-value">{stat.value}</span>
                  <span className="about-page__stat-label">{t(`about.stats.${stat.key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="about-page__story section">
        <div className="container">
          <div className="about-page__story-inner">
            <div className="about-page__story-content">
              <span className="section-header__eyebrow">{t('about.story.eyebrow')}</span>
              <h2>{t('about.story.title')}</h2>
              <p>{t('about.story.p1')}</p>
              <p>{t('about.story.p2')}</p>
            </div>
            <div className="about-page__story-visual">
              <div className="about-page__story-card">
                <div className="about-page__story-badge">
                  <span>{t('about.story.badge')}</span>
                </div>
                <div className="about-page__story-lines">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="about-page__story-line" />
                  ))}
                </div>
                <div className="about-page__story-stamp">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" stroke="#D4A73A" strokeWidth="1.5" strokeDasharray="4 2" />
                    <circle cx="40" cy="40" r="30" stroke="#D4A73A" strokeWidth="1" opacity="0.5" />
                    <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle" fill="#D4A73A" fontSize="8" fontWeight="700" fontFamily="Montserrat, sans-serif">№1</text>
                    <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="#D4A73A" fontSize="5" fontFamily="Montserrat, sans-serif">ПЕРЕВОДЫ</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-page__values section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__eyebrow">{t('about.values.eyebrow')}</span>
            <h2 className="section-header__title">{t('about.values.title')}</h2>
          </div>
          <div className="about-page__values-grid">
            {VALUES.map((val) => (
              <div key={val.key} className="about-page__value-card">
                <div className="about-page__value-icon">{val.icon}</div>
                <h3>{t(`about.values.items.${val.key}.title`)}</h3>
                <p>{t(`about.values.items.${val.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="about-page__process section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__eyebrow">{t('about.process.eyebrow')}</span>
            <h2 className="section-header__title">{t('about.process.title')}</h2>
          </div>
          <div className="about-page__process-steps">
            {PROCESS.map((step, index) => (
              <div key={step.key} className="about-page__step">
                <div className="about-page__step-number">{`0${index + 1}`}</div>
                <div className="about-page__step-content">
                  <h3>{t(`about.process.steps.${step.key}.title`)}</h3>
                  <p>{t(`about.process.steps.${step.key}.desc`)}</p>
                </div>
                {index < PROCESS.length - 1 && (
                  <div className="about-page__step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="about-page__cta-banner">
        <div className="container">
          <h2>{t('about.ctaBanner.title')}</h2>
          <p>{t('about.ctaBanner.desc')}</p>
          <div className="about-page__cta-btns">
            <Link href="/contact" className="btn btn--primary">
              {t('about.ctaBanner.btn1')}
            </Link>
            <Link href="/services" className="btn btn--outline">
              {t('about.ctaBanner.btn2')}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}