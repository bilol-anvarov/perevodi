"use client";

import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center">
        {t("mainPage.heading.headingText")}
      </h1>
    </main>
  );
}
