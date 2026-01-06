import Loading from "@/components/Loading";
import BannerTable from "./BannerTable";
import { AddModal } from "@/components/admin/DataTable/components/AddModal";
import { Suspense } from "react";

const BannerList = () => {
  return (
    <div>
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-bold text-secondary">Баннер Мэдээлэл</h1>
        <AddModal />
      </div>
      <Suspense fallback={<Loading />}>
        <BannerTable />
      </Suspense>
    </div>
  );
};

export default BannerList;
