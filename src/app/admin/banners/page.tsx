import { Suspense } from "react";
import BannerTableSkeleton from "./_components/BannerSkeleton";
import BannerTable from "./_components/BannerTable";

const BannerPage = async () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-6 p-6">
        <Suspense fallback={<BannerTableSkeleton />}>
          <BannerTable />
        </Suspense>
      </div>
    </div>
  );
};

export default BannerPage;
