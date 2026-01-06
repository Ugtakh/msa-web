"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_STANDARDS_QUERYResult } from "../../../../sanity.types";

type StandardCardProps = {
  standard: ALL_STANDARDS_QUERYResult[0];
  setSelectedStandard: (st: ALL_STANDARDS_QUERYResult[0]) => void;
};
const StandardCard = ({ standard, setSelectedStandard }: StandardCardProps) => {
  return (
    <div
      key={standard.code}
      className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full uppercase">
          {standard.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-1">
        {standard.name}
      </h3>
      <h4 className="text-sm text-muted-foreground mb-1">{standard.code}</h4>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          setSelectedStandard(standard);
        }}
      >
        <FileText className="w-4 h-4 mr-2" />
        {"PDF үзэх"}
      </Button>
    </div>
  );
};

export default StandardCard;
