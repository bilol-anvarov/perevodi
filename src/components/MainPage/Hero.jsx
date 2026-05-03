'use client'
export default function Hero() {
  return <div>TEST HERO</div>;
}
// import Link from 'next/link';
// import { useTranslation } from 'react-i18next';
// import './Hero.scss';

// export default function Hero() {
//   const { t } = useTranslation();

//   const services = [
//     { key: 'apostille', icon: '📄' },
//     { key: 'legalization', icon: '⚖️' },
//     { key: 'translation', icon: '✍️' },
//     { key: 'personal', icon: '🪪' },
//     { key: 'consultation', icon: '💬' },
//   ];

//   return (
//     <section className="hero">
//       <div className="hero__bg" />

//       <div className="container">
//         <div className="hero__inner">

//           {/* Eyebrow */}
//           <p className="hero__eyebrow">
//             {t('hero.eyebrow')}
//           </p>

//           {/* Heading */}
//           <h1 className="hero__heading">
//             {t('hero.heading')} <span>{t('hero.headingAccent')}</span>
//           </h1>

//           {/* Subtitle */}
//           <p className="hero__subtitle">
//             {t('hero.subtitle')}
//           </p>

//           {/* Trust badges */}
//           <div className="hero__badges">
//             <span>✔ {t('hero.badge1')}</span>
//             <span>✔ {t('hero.badge2')}</span>
//             <span>✔ {t('hero.badge3')}</span>
//           </div>

//           {/* CTA Buttons */}
//           <div className="hero__ctas">
//             <Link href="/contact" className="btn btn--primary">
//               {t('hero.cta1')}
//             </Link>
//             <Link href="/contact" className="btn btn--outline">
//               {t('hero.cta2')}
//             </Link>
//           </div>

//           {/* Quick services strip */}
//           <div className="hero__services">
//             {services.map((s) => (
//               <div key={s.key} className="hero__service-item">
//                 <span className="hero__service-icon">{s.icon}</span>
//                 <span className="hero__service-label">{t(`hero.services.${s.key}`)}</span>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>

//       {/* Bottom wave divider */}
//       <div className="hero__wave">
//         <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F8FA" />
//         </svg>
//       </div>
//     </section>
//   );
// }
