'use client'
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import './contact.scss';

const TELEGRAM_BOT_TOKEN = '8206552530:AAGEpigXIY1vzYk8Nig1frvLrc2k7Tr8R3s';
const TELEGRAM_CHAT_ID = '-5166065997';

const SERVICES_KEYS = [
  'apostille', 'legalization', 'translation',
  'notarial', 'personal', 'medical', 'consultation',
];

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

const initialForm = { name: '', phone: '', service: '', message: '' };
const initialErrors = { name: '', phone: '', service: '', files: '' };

export default function ContactPage() {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [dragOver, setDragOver] = useState(false);

  // ── Validation ──────────────────────────────────────────────
  const validate = () => {
    const newErrors = { name: '', phone: '', service: '', files: '' };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = t('contactForm.errors.nameRequired'); valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contactForm.errors.nameTooShort'); valid = false;
    }

    const digits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = t('contactForm.errors.phoneRequired'); valid = false;
    } else if (digits.length < 9) {
      newErrors.phone = t('contactForm.errors.phoneInvalid'); valid = false;
    }

    if (!formData.service) {
      newErrors.service = t('contactForm.errors.serviceRequired'); valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ── File handling ───────────────────────────────────────────
  const addFiles = (incoming) => {
    const arr = Array.from(incoming);
    let err = '';

    const valid = arr.filter((f) => {
      if (!ALLOWED_TYPES.includes(f.type)) {
        err = t('contactPage.fileTypeError'); return false;
      }
      if (f.size > MAX_FILE_SIZE) {
        err = t('contactPage.fileSizeError'); return false;
      }
      return true;
    });

    setFiles((prev) => {
      const merged = [...prev, ...valid];
      if (merged.length > MAX_FILES) {
        setErrors((e) => ({ ...e, files: t('contactPage.fileCountError') }));
        return prev;
      }
      if (err) setErrors((e) => ({ ...e, files: err }));
      else setErrors((e) => ({ ...e, files: '' }));
      return merged;
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setErrors((e) => ({ ...e, files: '' }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  // ── Input handlers ──────────────────────────────────────────
  const handleNameChange = (e) => {
    setFormData((p) => ({ ...p, name: e.target.value.replace(/[0-9]/g, '') }));
    if (errors.name) setErrors((p) => ({ ...p, name: '' }));
  };

  const handlePhoneChange = (e) => {
    setFormData((p) => ({ ...p, phone: e.target.value.replace(/[^\d\s\+\-\(\)]/g, '') }));
    if (errors.phone) setErrors((p) => ({ ...p, phone: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  // ── Send to Telegram ────────────────────────────────────────
  const sendToTelegram = async () => {
    const serviceName = t(`services.items.${formData.service}.title`);
    const text =
      `📋 *Новая заявка — Страница Контакты*\n\n` +
      `👤 *Имя:* ${formData.name}\n` +
      `📞 *Телефон:* ${formData.phone}\n` +
      `🗂 *Услуга:* ${serviceName}\n` +
      (formData.message.trim() ? `💬 *Сообщение:* ${formData.message}\n` : '') +
      (files.length ? `📎 *Файлов:* ${files.length}\n` : '') +
      `\n🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}`;

    // Send text message
    const msgRes = await fetch(
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
    if (!msgRes.ok) throw new Error('Telegram message failed');

    // Send each file
    for (const file of files) {
      const fd = new FormData();
      fd.append('chat_id', TELEGRAM_CHAT_ID);

      const isImage = file.type.startsWith('image/');
      fd.append(isImage ? 'photo' : 'document', file);

      const endpoint = isImage ? 'sendPhoto' : 'sendDocument';
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${endpoint}`, {
        method: 'POST',
        body: fd,
      });
    }
  };

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await sendToTelegram();
      setStatus('success');
      setFormData(initialForm);
      setFiles([]);
      setErrors(initialErrors);
    } catch {
      setStatus('error');
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <main className="contact-page">

      {/* ── Page Hero ── */}
      <section className="contact-page__hero">
        <div className="container">
          <span className="section-header__eyebrow">{t('contactPage.eyebrow')}</span>
          <h1 className="contact-page__hero-title">{t('contactPage.title')}</h1>
          <p className="contact-page__hero-subtitle">{t('contactPage.subtitle')}</p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="contact-page__body section">
        <div className="container">
          <div className="contact-page__grid">

            {/* ── Left: Form ── */}
            <div className="contact-page__form-side">
              {status === 'success' ? (
                <div className="contact-page__success">
                  <div className="contact-page__success-icon">✓</div>
                  <h3>{t('contactForm.successTitle')}</h3>
                  <p>{t('contactForm.successDesc')}</p>
                  <button className="btn btn--primary" onClick={() => setStatus('idle')}>
                    {t('contactForm.successBtn')}
                  </button>
                </div>
              ) : (
                <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
                  <h2 className="contact-page__form-title">{t('contactPage.formTitle')}</h2>

                  {/* Name */}
                  <div className={`cp-field${errors.name ? ' has-error' : ''}`}>
                    <label htmlFor="cp-name">{t('contactForm.name')}</label>
                    <input id="cp-name" name="name" type="text" value={formData.name}
                      onChange={handleNameChange} placeholder={t('contactForm.namePlaceholder')} autoComplete="name" />
                    {errors.name && <span className="cp-field__error">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className={`cp-field${errors.phone ? ' has-error' : ''}`}>
                    <label htmlFor="cp-phone">{t('contactForm.phone')}</label>
                    <input id="cp-phone" name="phone" type="tel" inputMode="tel"
                      value={formData.phone} onChange={handlePhoneChange}
                      placeholder="+998 90 000 00 00" autoComplete="tel" />
                    {errors.phone && <span className="cp-field__error">{errors.phone}</span>}
                  </div>

                  {/* Service */}
                  <div className={`cp-field${errors.service ? ' has-error' : ''}`}>
                    <label htmlFor="cp-service">{t('contactForm.service')}</label>
                    <select id="cp-service" name="service" value={formData.service} onChange={handleChange}>
                      <option value="" disabled>{t('contactForm.servicePlaceholder')}</option>
                      {SERVICES_KEYS.map((key) => (
                        <option key={key} value={key}>{t(`services.items.${key}.title`)}</option>
                      ))}
                    </select>
                    {errors.service && <span className="cp-field__error">{errors.service}</span>}
                  </div>

                  {/* Message */}
                  <div className="cp-field">
                    <label htmlFor="cp-message">{t('contactForm.message')}</label>
                    <textarea id="cp-message" name="message" rows={4}
                      value={formData.message} onChange={handleChange}
                      placeholder={t('contactForm.messagePlaceholder')} />
                  </div>

                  {/* File upload */}
                  <div className="cp-field">
                    <label>{t('contactPage.attachLabel')}</label>
                    <div
                      className={`cp-dropzone${dragOver ? ' cp-dropzone--over' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <p>{t('contactPage.dropzoneText')}</p>
                      <span>{t('contactPage.dropzoneHint')}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={(e) => addFiles(e.target.files)}
                      />
                    </div>
                    {errors.files && <span className="cp-field__error">{errors.files}</span>}

                    {/* File list */}
                    {files.length > 0 && (
                      <ul className="cp-files">
                        {files.map((file, i) => (
                          <li key={i} className="cp-files__item">
                            <span className="cp-files__icon">
                              {file.type.startsWith('image/') ? '🖼' : '📄'}
                            </span>
                            <span className="cp-files__name">{file.name}</span>
                            <span className="cp-files__size">{formatSize(file.size)}</span>
                            <button type="button" className="cp-files__remove" onClick={() => removeFile(i)}>✕</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {status === 'error' && (
                    <p className="cp-error">{t('contactForm.error')}</p>
                  )}

                  <button type="submit" className="btn btn--primary cp-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? t('contactForm.sending') : t('contactPage.submit')}
                  </button>
                </form>
              )}
            </div>

            {/* ── Right: Info ── */}
            <div className="contact-page__info-side">

              {/* Contact details */}
              <div className="contact-page__info-card">
                <h3 className="contact-page__info-title">{t('contactPage.infoTitle')}</h3>
                <ul className="contact-page__info-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <div>
                      <span>{t('contactPage.phone')}</span>
                      <a href="tel:+998909006030">+998 90 900-60-30</a>
                      <a href="tel:+998712300671">+998 71 230-06-71</a>
                    </div>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    <div>
                      <span>Telegram</span>
                      <a href="https://t.me/perevodi1" target="_blank" rel="noopener noreferrer">@perevodi1</a>
                    </div>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    <div>
                      <span>WhatsApp</span>
                      <a href="https://wa.me/998712300671" target="_blank" rel="noopener noreferrer">+998 71 230-06-71</a>
                    </div>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div>
                      <span>{t('contactPage.email')}</span>
                      <a href="mailto:bestperevodi1@mail.ru">bestperevodi1@mail.ru</a>
                    </div>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <span>{t('contactPage.address')}</span>
                      <p>{t('contactPage.addressValue')}</p>
                    </div>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    <div>
                      <span>{t('contactPage.hours')}</span>
                      <p>{t('contactPage.hoursValue')}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Office photo placeholder */}
              <div className="contact-page__office-photo">
                <div className="contact-page__office-photo-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p>{t('contactPage.officePhotoLabel')}</p>
                  <span>{t('contactPage.officeRoom')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Map section ── */}
      <section className="contact-page__map-section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__eyebrow">{t('contactPage.mapEyebrow')}</span>
            <h2 className="section-header__title">{t('contactPage.mapTitle')}</h2>
            <p className="section-header__subtitle">{t('contactPage.mapSubtitle')}</p>
          </div>
        </div>

        <div className="contact-page__map-wrap">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d256.7909354089443!2d69.25780113165432!3d41.281660461287785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a937d622f1f%3A0xc91c995b73518f41!2z0J3Rg9C60YPRgdGB0LrQsNGPINGD0LvQuNGG0LAgNDZBLCAxMDAxMzksINCi0LDRiNC60LXQvdGCLCBUYXNoa2VudCwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1778115662890!5m2!1sru!2s"
            width="100%"
            height="480"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location"
          />
          <a
            href="https://maps.app.goo.gl/SmmfbRWmFgLT8P9DA"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-page__map-btn btn btn--primary"
          >
            {t('contactPage.mapBtn')}
          </a>
        </div>
      </section>

    </main>
  );
}