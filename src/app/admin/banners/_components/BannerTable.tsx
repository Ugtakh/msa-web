import { DataTable } from "@/components/admin/DataTable";
import { AddModal } from "@/components/admin/DataTable/components/AddModal";

const BannerTable = async () => {
  return (
    <div>
      <div className="flex justify-between pb-6">
        <h1 className="text-xl font-bold text-secondary">Баннер Мэдээлэл</h1>
        <AddModal />
      </div>
      <DataTable data={[]} />;
    </div>
  );
};

export default BannerTable;
