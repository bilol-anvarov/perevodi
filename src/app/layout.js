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
    "легализация документов",
    "нотариальный перевод",
    "tarjima xizmati Toshkent",
    "apostil Toshkent",
    "translation services Tashkent",
    "перевод документов Узбекистан",
  ],
  authors: [{ name: "Переводы №1" }],
  creator: "Переводы №1",
  publisher: "Переводы №1",
  metadataBase: new URL("https://perevodi1.uz"),
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
    url: "https://perevodi1.uz",
    siteName: "Переводы №1",
    title: "Переводы №1 — Апостиль, Легализация, Переводы документов",
    description:
      "Профессиональные услуги перевода документов в Ташкенте. Апостиль, легализация, нотариальные переводы. Быстро, точно, надёжно.",
    locale: "ru_RU",
    alternateLocale: ["uz_UZ", "en_US"],
    images: [
      {
        url: "/og-image.png", // add a 1200x630 branded image to /public
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
    images: ["/og-image.png"],
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
    // google: "your-google-search-console-token", // add when ready
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <MainContextProvider>
          <Header />
          <div id="root">
            {children}
          </div>
          <Footer />
        </MainContextProvider>
      </body>
    </html>
  );
}

// Developer: Bilol Anvarov