'use client'
import Link from 'next/link';
import './header.scss'
import { useTranslation } from 'react-i18next';

import '../../../i18n';
import BtnsChangeLng from './Buttons';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LinkLayout = ({ name, src, onClickFunc }) => {
  return (
    <li className='link'>
      <Link onClick={onClickFunc} href={src}>
        {name}
      </Link>
    </li>
  );
};

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const [ifOpenBar, setIfOpenBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-y-hidden', ifOpenBar);
    return () => document.body.classList.remove('overflow-y-hidden');
  }, [ifOpenBar]);

  // Scroll listener with cleanup
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIfOpenBar(false);
  }, [pathname]);

  function closeNavBar() {
    setIfOpenBar(false);
  }

  const navLinks = [
    { name: t('nav.home'),     src: '/' },
    { name: t('nav.services'), src: '/services' },
    { name: t('nav.about'),    src: '/about' },
    { name: t('nav.contact'),  src: '/contact' },
  ];

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header_inside">

        <Link onClick={closeNavBar} href="/" className="logo">
          <img src="/logo.png" alt="LexBridge Logo" className='w-[100px]'/>
        </Link>

        {/* Desktop nav */}
        <nav className="nav desktop">
          <ul className="links">
            {navLinks.map((link) => (
              <LinkLayout
                key={link.src}
                name={link.name}
                src={link.src}
                onClickFunc={closeNavBar}
              />
            ))}
          </ul>

          <div className="nav__right">
            <BtnsChangeLng />

            <div
              className="menu"
              onClick={() => setIfOpenBar((prev) => !prev)}
              aria-label="Toggle menu"
              role="button"
            >
              <div className={`iconMenu${ifOpenBar ? ' active' : ''}`}>
                <div className="bar bar--1" />
                <div className="bar bar--2" />
                <div className="bar bar--3" />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <nav className={`nav mobile${ifOpenBar ? ' active' : ''}`}>
        <ul className="links">
          {navLinks.map((link) => (
            <LinkLayout
              key={link.src}
              name={link.name}
              src={link.src}
              onClickFunc={closeNavBar}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
