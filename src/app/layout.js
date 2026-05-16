import Footer from "@/components/footer/footer";
import Header from "@/components/header/HeaderV2";
import { MainContextProvider } from "@/context/MainContext";
import "./app.scss";

export const metadata = {
  title: {
    default: "Переводы №1 — Апостиль, Легализация, Переводы документов",
    template: "%s | Переводы №1",
  },
  description:
    "Профессиональные услуги перевода документов в Ташкенте. Апостиль, легализация, нотариальные переводы. Быстро, точно, надёжно. Бизнес-центр «Идеал», 2-й этаж, кабинет 201.",
  keywords: [
    "переводы Ташкент",
    "апостиль Ташкент",
    "легализация документов Ташкент",
    "нотариальный перевод Ташкент",
    "перевод документов Узбекистан",
    "бюро переводов Ташкент",
    "апостиль на диплом Ташкент",
    "заверенный перевод",
    "перевод паспорта Ташкент",
    "tarjima xizmati Toshkent",
    "apostil Toshkent",
    "hujjat tarjimasi",
    "notarial tasdiqlash Toshkent",
    "legalizatsiya Toshkent",
    "shaxsiy hujjatlar tarjimasi",
    "translation services Tashkent",
    "apostille Tashkent",
    "document legalization Uzbekistan",
    "certified translation Tashkent",
    "notarized translation Uzbekistan",
  ],
  authors: [{ name: "Переводы №1" }],
  creator: "Переводы №1",
  publisher: "Переводы №1",
  metadataBase: new URL("https://perevodin1.uz"),
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/uz",
      "ru-RU": "/ru",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    url: "https://perevodin1.uz",
    siteName: "Переводы №1",
    title: "Переводы №1 — Апостиль, Легализация, Переводы документов",
    description:
      "Профессиональные услуги перевода документов в Ташкенте. Апостиль, легализация, нотариальные переводы. Быстро, точно, надёжно.",
    locale: "ru_RU",
    alternateLocale: ["uz_UZ", "en_US"],
    images: [
      {
        url: "https://perevodin1.uz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Переводы №1 — Ташкент",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Переводы №1 — Апостиль, Легализация, Переводы документов",
    description:
      "Профессиональные услуги перевода документов в Ташкенте. Быстро, точно, надёжно.",
    images: ["https://perevodin1.uz/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "xpE-AbBKyyrQUuOticoUbbxthdAyhk363r73TCRMMWU",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Переводы №1",
    "url": "https://perevodin1.uz",
    "telephone": "+998909620082",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nukus ko'chasi 46, Ideal Business Center, 2-qavat, 201-xona",
      "addressLocality": "Toshkent",
      "addressCountry": "UZ"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "description": "Профессиональные услуги перевода документов в Ташкенте. Апостиль, легализация, нотариальные переводы.",
    "priceRange": "$$",
    "sameAs": [
      "https://t.me/perevodin1"
    ]
  };
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MainContextProvider>
          <Header />
          <div id="root">{children}</div>
          <Footer />
        </MainContextProvider>
      </body>
    </html>
  );
}

// Developer: Bilol Anvarov
