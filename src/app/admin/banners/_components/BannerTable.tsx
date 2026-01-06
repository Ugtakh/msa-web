import { getBanners } from "@/actions/banners";
import { DataTable } from "@/components/admin/DataTable";
import { BannerType } from "@/lib/schemas";

const BannerTable = async () => {
  const banners = (await getBanners()) as BannerType[];

  return <DataTable data={banners} />;
};

export default BannerTable;
