
import ContactForm from "@/components/MainPage/Contactform";
import Hero from "@/components/MainPage/Hero";
import Services from "@/components/MainPage/Services";
import WhyUs from "@/components/MainPage/Whyus";

export default function Home() {

  return (
    <main className="">
      <Hero />
      <Services />
      <WhyUs />
      <ContactForm />
    </main>
  );
}
