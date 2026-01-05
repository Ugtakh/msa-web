// import { getBanners } from "@/actions/banners";
import { DataTable } from "@/components/admin/DataTable";
import type { BannerType } from "@/lib/schemas";

const BannerTable = async () => {
  // const datas = await getBanners();

  // return <DataTable data={datas.rows as BannerType[]} />;
  return <DataTable data={[]} />;
};

export default BannerTable;
