import { Suspense } from "react";
import PartnerList from "./_components/PartnerList";

const PartnerPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        <Suspense fallback={<div />}>
          <PartnerList />
        </Suspense>
      </div>
    </div>
  );
};

export default PartnerPage;
