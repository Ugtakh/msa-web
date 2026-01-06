import { sanityFetch } from "@/lib/sanity/client";
import HeroList from "./_components/HeroList";
import { ALL_BANNERS_QUERY } from "@/lib/sanity/queries/banner";

const HeroSection = async () => {
  const banners = await sanityFetch({ query: ALL_BANNERS_QUERY });
  return <HeroList banners={banners} />;
};

export default HeroSection;
