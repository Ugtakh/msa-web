import { Suspense } from "react";

const StandartsPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        <Suspense fallback={<div />}>
          <div className="flex justify-between pb-6">
            <h1 className="text-xl font-bold text-secondary">
              Стандарт Мэдээлэл
            </h1>
            {/* <AddPartnerModal /> */}
            {/* Modal */}
          </div>
          {/* <PartnerList /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default StandartsPage;
