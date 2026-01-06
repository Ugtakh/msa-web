import { Suspense } from "react";
import Loading from "@/components/Loading";
import { AddStandardModal } from "./AddStandardModal";
import StandardList from "./StandardList";

const StandardsComp = () => {
  return (
    <div>
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-bold text-secondary">Стандарт Мэдээлэл</h1>
        <AddStandardModal />
      </div>
      <Suspense fallback={<Loading />}>
        <StandardList />
      </Suspense>
    </div>
  );
};

export default StandardsComp;
