'use client'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './footer.scss';

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { key: 'home',     src: '/' },
    { key: 'services', src: '/services' },
    { key: 'about',    src: '/about' },
    { key: 'contact',  src: '/contact' },
  ];

  const services = [
    'apostille',
    'legalization',
    'translation',
    'notarial',
    'personal',
    'medical',
    'consultation',
  ];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* ── Col 1: Brand ── */}
            <div className="footer__col footer__col--brand">
              <Link href="/" className="footer__logo">
                <img src="/logo.png" alt="Переводы №1" />
              </Link>
              <p className="footer__tagline">{t('footer.tagline')}</p>
              <div className="footer__socials">
                <a
                  href="https://t.me/perevodi1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label="Telegram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.48c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.17 14.4l-2.938-.916c-.637-.2-.65-.637.136-.943l11.462-4.42c.537-.194 1.006.131.732.127z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/998909620082"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.135 1.535 5.88L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.201 16.722c-.26.733-1.522 1.4-2.083 1.458-.534.056-1.044.267-3.518-.733-2.978-1.222-4.878-4.244-5.022-4.444-.145-.2-1.178-1.567-1.178-2.989s.745-2.122 1.022-2.411c.256-.267.556-.333.745-.333h.533c.178 0 .422-.067.656.5.256.6.856 2.078.933 2.233.078.156.133.334.022.534-.1.2-.156.322-.311.5-.156.178-.322.4-.456.533-.155.156-.316.322-.133.622.178.3.8 1.322 1.722 2.144 1.178 1.056 2.178 1.389 2.478 1.544.3.156.467.133.644-.067.178-.2.756-.878.956-1.178.2-.3.4-.244.667-.144.267.1 1.689.8 1.978.944.289.145.478.222.544.345.067.122.067.7-.193 1.378z" />
                  </svg>
                </a>
                <a
                  href="tel:+998909620082"
                  className="footer__social"
                  aria-label="Phone"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ── Col 2: Nav ── */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t('footer.nav')}</h4>
              <ul className="footer__links">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <Link href={link.src}>
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Services ── */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t('footer.services')}</h4>
              <ul className="footer__links">
                {services.map((key) => (
                  <li key={key}>
                    <Link href="/services">
                      {t(`services.items.${key}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact ── */}
            <div className="footer__col">
              <h4 className="footer__col-title">{t('footer.contact')}</h4>
              <ul className="footer__contact-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href="tel:+998909620082">+998 90 962-00-82</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href="tel:+998909006030">+998 90 900-60-30</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:bestperevodi1@mail.ru">bestperevodi1@mail.ru</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{t('footer.address')}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>{t('footer.hours')}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            © {new Date().getFullYear()} {t('footer.copy')}
          </p>
          <p className="footer__copy footer__copy--right">
            {t('footer.office')}
          </p>
        </div>
      </div>
    </footer>
  );
}