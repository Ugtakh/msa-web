import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MembershipSection from "@/components/MembershipSection";
import NewsSection from "@/components/NewsSection";
import OurServices from "@/components/OurServices";
import PartnerMarquee from "@/components/PartnerMarquee";
import { ALL_NEWS_QUERY, NEWS_QUERY_BY_ID } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/sanity/lib/live";
// import { databases } from "@/lib/appwrite/client";

export default async function Home() {
  // const datas = databases.createDocument;
  const { data: news } = await sanityFetch({ query: ALL_NEWS_QUERY });
  // console.log(news);

  return (
    <main>
      <Navbar />
      <HeroSection />
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
