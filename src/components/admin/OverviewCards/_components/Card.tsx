import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  };
  Icon: LucideIcon;
  iconClassName: string;
};

export function OverviewCard({ label, data, Icon, iconClassName }: PropsType) {
  return (
    <Card className="rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark">
      <CardContent>
        <span
          className={`flex justify-center items-center w-14 h-14 ${iconClassName}`}
        >
          <Icon color="white" />
        </span>

        <div className="mt-6 flex items-center justify-between">
          {/* <dl> */}
          <dd className="text-sm font-medium text-dark-6">{label}</dd>
          <dt className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
            {data.value}
          </dt>
        </div>
      </CardContent>
    </Card>
  );
}
