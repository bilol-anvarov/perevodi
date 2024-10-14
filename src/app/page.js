import Conditions from "@/components/Condistions/Conditions";
import Heading from "@/components/heading/Heading";
import History from "@/components/History/History";
import MapIndex from "@/components/map";
import Questions from "@/components/Questions/Questions";
import SectionFour from "@/components/sectionFour/sectionFour";
import SectionTwo from "@/components/sectionTwo/SectionTwo";



export default function Home() {

  return (
    <main className="">
        <Heading />
        <SectionTwo />
        <SectionFour />
        <Conditions />
        <History />
        <Questions />
        <MapIndex/>
    </main>
  );
}
