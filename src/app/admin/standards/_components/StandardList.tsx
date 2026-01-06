import { getStandards } from "@/actions/standards";
import NotFoundData from "../../partners/_components/NotFoundData";
import StandartCard from "./StandardCard";

const StandardList = async () => {
  const standards = await getStandards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
      {standards.length > 0 ? (
        standards.map((standard) => (
          <StandartCard key={standard._id} standard={standard} />
        ))
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default StandardList;
