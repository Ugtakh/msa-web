import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type PropsType = {
  label: string;
  data: {
    value: string;
  };
  Icon: LucideIcon;
  iconClassName: string;
};

export function OverviewCard({ label, data, Icon, iconClassName }: PropsType) {
  return (
    <Card className="rounded-[10px] bg-white py-6 shadow-1">
      <CardContent>
        <span
          className={`flex justify-center items-center w-14 h-14 rounded-lg ${iconClassName}`}
        >
          <Icon color="white" />
        </span>

        <div className="mt-6 flex items-center justify-between">
          <h1 className="font-semibold text-dark-6 text-secondary">{label}</h1>
          <span className="text-xl font-bold text-secondary">{data.value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
