import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MembershipSection from "@/components/MembershipSection";
import NewsSection from "@/components/NewsSection";
import OurServices from "@/components/OurServices";
import PartnerMarquee from "@/components/PartnerMarquee";
// import { databases } from "@/lib/appwrite/client";

export default async function Home() {
  // const datas = databases.createDocument;

  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PartnerMarquee />
      <OurServices />
      <MembershipSection />
      <NewsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
