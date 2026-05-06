"use client";

import Hero from "@/components/MainPage/Hero";
import Services from "@/components/MainPage/Services";
import WhyUs from "@/components/MainPage/Whyus";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="">
      <Hero />
      <Services />
      <WhyUs />
    </main>
  );
}
