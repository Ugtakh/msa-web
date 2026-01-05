import { AddPartnerModal } from "./AddPartnerModal";
import PartnerCard from "./PartnerCard";

const PartnerList = () => {
  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-xl font-bold text-secondary">
          Хамтрагчидийн Мэдээлэл
        </h1>
        <AddPartnerModal />
        {/* Modal */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { _id: "1", name: "ECA", partnerLogo: "" },
          { _id: "2", name: "Yalguun Bayan", partnerLogo: "" },
        ].map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default PartnerList;
