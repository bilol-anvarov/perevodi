import "./globals.css";
import './app.css';

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/HeaderV2";
import ScrollToUp from "@/components/ScrollToUp";
import Script from 'next/script';
import { MainContextProvider } from "@/context/MainContext";




export const metadata = {
  title: "Дружная ферма",
  description: "Дарим игрушки за покупки! Акция \"Дружная ферма\" в Makro! - Xaridlar uchun o‘yinchoqlar sovg‘a qilamiz! Makroda \"Ahil ferma\" aksiyasi!",
  openGraph: {
    locale: 'ru_RU, uz_UZ',
    type: 'website',
    url: 'https://makromarket.uz/',
    title: "Дружная ферма",
    description: "Дарим игрушки за покупки! Акция \"Дружная ферма\" в Makro! - Xaridlar uchun o‘yinchoqlar sovg‘a qilamiz! Makroda \"Ahil ferma\" aksiyasi!",
    siteName: "Makro",
  },
};


export default function RootLayout({ children }) {


  return (
    <html lang="ru">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Makro, supermarket, магазин, макро, узбекистан, каталог, новости, акции, фрукты, офощи, товары, онлайн магазин, ягоды, ташкент, купить, хозяйственные товары, работа в makro" />
        <meta name="google" content="notranslate" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:image" content="https://makromarket.uz/banner_makro.png" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta name="author" content="MakroMarket" />
      </head>
      <body className="body makro">
          <MainContextProvider>
            <Header />
              <div id="root" className="root">  
                  {children}
              </div>
            <ScrollToUp />
            <Footer />
          </MainContextProvider>
      </body>
    </html>
  );
}
// Developer is Bilol Anvarov