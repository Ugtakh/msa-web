import { Suspense } from "react";
import { AddPartnerModal } from "./AddPartnerModal";
import PartnerList from "./PartnerList";
import Loading from "@/components/Loading";

const PartnersComp = async () => {
  return (
    <div>
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-bold text-secondary">
          Хамтрагчидийн Мэдээлэл
        </h1>
        <AddPartnerModal />
      </div>
      <Suspense fallback={<Loading />}>
        <PartnerList />
      </Suspense>
    </div>
  );
};

export default PartnersComp;
