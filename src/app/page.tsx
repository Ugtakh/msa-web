import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import Navbar from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import MembershipSection from "@/components/sections/MembershipSection";
import NewsSection from "@/components/sections/NewsSection";
import OurServices from "@/components/sections/OurServices";
import PartnerMarquee from "@/components/sections/PartnerMarquee";

import { ALL_BANNERS_QUERY } from "@/lib/sanity/queries/banner";
import { ALL_NEWS_QUERY } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/lib/sanity/client";

// import { ALL_BANNERS_QUERYResult } from "../../sanity.types";

export default async function Home() {
  const news = await sanityFetch({ query: ALL_NEWS_QUERY });
  const banners = await sanityFetch({ query: ALL_BANNERS_QUERY });

  return (
    <main>
      <Navbar />
      <HeroSection banners={banners} />
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
