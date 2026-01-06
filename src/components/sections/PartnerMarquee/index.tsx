import { sanityFetch } from "@/lib/sanity/client";
import PartnerList from "./_components/PartnerList";
import { ALL_PARTNERS_QUERY } from "@/lib/sanity/queries/partners";

const PartnerMarquee = async () => {
  const partners = await sanityFetch({ query: ALL_PARTNERS_QUERY });

  return <PartnerList partners={partners} />;
};

export default PartnerMarquee;
