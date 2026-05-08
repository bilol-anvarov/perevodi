'use client'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contactform.scss';

const TELEGRAM_BOT_TOKEN = '8206552530:AAGEpigXIY1vzYk8Nig1frvLrc2k7Tr8R3s';
const TELEGRAM_CHAT_ID = '-1003967202673';

const SERVICES_KEYS = [
  'apostille',
  'legalization',
  'translation',
  'notarial',
  'personal',
  'medical',
  'consultation',
];

const initialForm = { name: '', phone: '', service: '', message: '' };
const initialErrors = { name: '', phone: '', service: '' };

export default function ContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const newErrors = { name: '', phone: '', service: '' };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = t('contactForm.errors.nameRequired');
      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contactForm.errors.nameTooShort');
      valid = false;
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = t('contactForm.errors.phoneRequired');
      valid = false;
    } else if (digitsOnly.length < 9) {
      newErrors.phone = t('contactForm.errors.phoneInvalid');
      valid = false;
    }

    if (!formData.service) {
      newErrors.service = t('contactForm.errors.serviceRequired');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ── Phone input — only allow digits, +, spaces, dashes, parens ──
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d\s\+\-\(\)]/g, '');
    setFormData((prev) => ({ ...prev, phone: cleaned }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  // ── Name input — strip digits ──
  const handleNameChange = (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[0-9]/g, '');
    setFormData((prev) => ({ ...prev, name: cleaned }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Send to Telegram ──────────────────────────────────────────
  const sendToTelegram = async () => {
    const serviceName = t(`services.items.${formData.service}.title`);

    const text =
      `📋 *Новая заявка с сайта*\n\n` +
      `👤 *Имя:* ${formData.name}\n` +
      `📞 *Телефон:* ${formData.phone}\n` +
      `🗂 *Услуга:* ${serviceName}\n` +
      (formData.message.trim()
        ? `💬 *Сообщение:* ${formData.message}\n`
        : '') +
      `\n🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}`;

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!res.ok) throw new Error('Telegram API error');
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      await sendToTelegram();
      setStatus('success');
      setFormData(initialForm);
      setErrors(initialErrors);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-form section">
      <div className="container">
        <div className="contact-form__inner">

          {/* Left — info side */}
          <div className="contact-form__info">
            <span className="section-header__eyebrow">{t('contactForm.eyebrow')}</span>
            <h2 className="contact-form__title">{t('contactForm.title')}</h2>
            <p className="contact-form__subtitle">{t('contactForm.subtitle')}</p>

            <ul className="contact-form__perks">
              <li>
                <span className="contact-form__perk-icon">✔</span>
                {t('contactForm.perk1')}
              </li>
              <li>
                <span className="contact-form__perk-icon">✔</span>
                {t('contactForm.perk2')}
              </li>
              <li>
                <span className="contact-form__perk-icon">✔</span>
                {t('contactForm.perk3')}
              </li>
            </ul>

            <div className="contact-form__contacts">
              <a href="tel:+998909006030" className="contact-form__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +998 90 900-60-30
              </a>
              <a href="https://t.me/perevodi1" target="_blank" rel="noopener noreferrer" className="contact-form__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Telegram
              </a>
              <a href="https://wa.me/998712300671" target="_blank" rel="noopener noreferrer" className="contact-form__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form__form-wrap">
            {status === 'success' ? (
              <div className="contact-form__success">
                <div className="contact-form__success-icon">✓</div>
                <h3>{t('contactForm.successTitle')}</h3>
                <p>{t('contactForm.successDesc')}</p>
                <button className="btn btn--primary" onClick={() => setStatus('idle')}>
                  {t('contactForm.successBtn')}
                </button>
              </div>
            ) : (
              <form className="contact-form__form" onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div className={`contact-form__field${errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="cf-name">{t('contactForm.name')}</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder={t('contactForm.namePlaceholder')}
                    autoComplete="name"
                  />
                  {errors.name && <span className="contact-form__field-error">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className={`contact-form__field${errors.phone ? ' has-error' : ''}`}>
                  <label htmlFor="cf-phone">{t('contactForm.phone')}</label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+998 90 000 00 00"
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="contact-form__field-error">{errors.phone}</span>}
                </div>

                {/* Service */}
                <div className={`contact-form__field${errors.service ? ' has-error' : ''}`}>
                  <label htmlFor="cf-service">{t('contactForm.service')}</label>
                  <select
                    id="cf-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>{t('contactForm.servicePlaceholder')}</option>
                    {SERVICES_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t(`services.items.${key}.title`)}
                      </option>
                    ))}
                  </select>
                  {errors.service && <span className="contact-form__field-error">{errors.service}</span>}
                </div>

                {/* Message */}
                <div className="contact-form__field">
                  <label htmlFor="cf-message">{t('contactForm.message')}</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contactForm.messagePlaceholder')}
                  />
                </div>

                {status === 'error' && (
                  <p className="contact-form__error">{t('contactForm.error')}</p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary contact-form__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t('contactForm.sending') : t('contactForm.submit')}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}