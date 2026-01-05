import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MembershipSection from "@/components/MembershipSection";
import NewsSection from "@/components/NewsSection";
import OurServices from "@/components/OurServices";
import PartnerMarquee from "@/components/PartnerMarquee";
import { ALL_BANNERS_QUERY } from "@/lib/sanity/queries/banner";
import { ALL_NEWS_QUERY } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BANNERS_QUERYResult } from "../../sanity.types";

export default async function Home() {
  const { data: news } = await sanityFetch({ query: ALL_NEWS_QUERY });
  const { data: banners } = await sanityFetch({ query: ALL_BANNERS_QUERY });

  return (
    <main>
      <Navbar />
      <HeroSection banners={banners as ALL_BANNERS_QUERYResult} />
      <AboutSection />
      <PartnerMarquee />
      <OurServices />
      <MembershipSection />
      <NewsSection news={news} />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
