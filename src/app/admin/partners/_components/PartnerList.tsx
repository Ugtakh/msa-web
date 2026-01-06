import { getPartners } from "@/actions/partners";
import PartnerCard from "./PartnerCard";
import NotFoundData from "./NotFoundData";

const PartnerList = async () => {
  const partners = await getPartners();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
      {partners.length > 0 ? (
        partners.map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default PartnerList;
