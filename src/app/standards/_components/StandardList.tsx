"use client";

import { ALL_STANDARDS_QUERYResult } from "../../../../sanity.types";
import PdfModal from "./PdfModal";
import { useEffect, useState } from "react";
import { getStandards } from "@/actions/standards";
import StandardCard from "./StandardCard";
import { StandardSkeleton } from "./StandardSkeleton";

const Standardlist = () => {
  const [selectedStandard, setSelectedStandard] = useState<
    ALL_STANDARDS_QUERYResult[0] | null
  >(null);
  const [standards, setStandarts] = useState<ALL_STANDARDS_QUERYResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const rows = await getStandards();
    setStandarts(rows as ALL_STANDARDS_QUERYResult);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading ? (
        <StandardSkeleton />
      ) : (
        standards?.map((standard) => (
          <StandardCard
            standard={standard}
            setSelectedStandard={setSelectedStandard}
          />
        ))
      )}

      <PdfModal
        selectedStandard={selectedStandard}
        setSelectedStandard={setSelectedStandard}
      />
    </div>
  );
};

export default Standardlist;
