
import "./app.scss";

import Header from "@/components/header/HeaderV2";
import { MainContextProvider } from "@/context/MainContext";

export const metadata = {
  title: "i18n",
  description:
    'i18n',
  openGraph: {
    locale: "uz_UZ",
    type: "website",
    url: "https://test.uz/",
    title: "",
    description:
      '',
    siteName: "i18n",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <MainContextProvider>
          <Header />
          <div  id="root">
            {children}
          </div>
        </MainContextProvider>
      </body>
    </html>
  );
}
// Developer is Bilol Anvarov
