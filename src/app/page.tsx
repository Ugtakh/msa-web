import { Suspense } from "react";
import Navbar from "@/components/Header";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import MembershipSection from "@/components/sections/MembershipSection";
import NewsSection from "@/components/sections/NewsSection";
import OurServices from "@/components/sections/OurServices";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import { HeroSkeleton } from "@/components/sections/HeroSection/_components/HeroSkeleton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<div className="h-24 bg-gray-50 animate-pulse" />}>
        <PartnerMarquee />
      </Suspense>
      <OurServices />
      <MembershipSection />
      <Suspense
        fallback={<div className="grid grid-cols-3 gap-4 h-96 animate-pulse" />}
      >
        <NewsSection />
      </Suspense>
      <ContactSection />
      <FooterSection />
    </main>
  );
}
