import { getBanners } from "@/actions/banners";
import { DataTable } from "@/components/admin/DataTable";
import { AddModal } from "@/components/admin/DataTable/components/AddModal";
import { BannerType } from "@/lib/schemas";
import { Loader } from "lucide-react";
import { Suspense } from "react";

const BannerTable = async () => {
  const banners = (await getBanners()) as BannerType[];
  console.log("B", banners);
  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-xl font-bold text-secondary">Баннер Мэдээлэл</h1>
        <AddModal />
      </div>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <DataTable data={banners} />
      </Suspense>
    </div>
  );
};

export default BannerTable;
