import { Card } from "@/components/ui/card";
import { ALL_STANDARDS_QUERYResult } from "../../../../../sanity.types";
import { FileTypeIcon } from "lucide-react";

type StandardCardProps = {
  standard: ALL_STANDARDS_QUERYResult[0];
};

const StandartCard = ({ standard }: StandardCardProps) => {
  return (
    <Card className="w-full flex flex-col items-center relative mx-auto overflow-hidden p-1 backdrop-blur py-4 hover:shadow-2xl hover:scale-105 tran transition-all duration-300">
      <div className="relative flex flex-col items-center justify-center drop-shadow-2">
        <FileTypeIcon className="w-20 h-15" />
        <span className="text-xs text-secondary">PDF FILE</span>
        <h1 className="font-semibold text-center text-secondary p-2">
          {standard.name}
        </h1>
        <span className="text-xs text-muted-foreground">{standard.code}</span>
      </div>
    </Card>
  );
};

export default StandartCard;
