import {
  BoxIcon,
  Building2Icon,
  DollarSign,
  NewspaperIcon,
  NotebookIcon,
  UsersIcon,
  ViewIcon,
} from "lucide-react";
import { OverviewCard } from "./_components/Card";

export async function OverviewCardsGroup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
      <OverviewCard
        label="Нийт баннер"
        data={{
          value: 100,
          growthRate: 5,
        }}
        Icon={ViewIcon}
        iconClassName="bg-green-400 rounded-lg"
      />

      <OverviewCard
        label="Нийт хамтрагчид"
        data={{
          value: 100,
          growthRate: 10,
        }}
        Icon={Building2Icon}
        iconClassName="bg-orange-400 rounded-lg"
      />

      <OverviewCard
        label="Нийт стандарт"
        data={{
          value: 100,
          growthRate: 10,
        }}
        Icon={NotebookIcon}
        iconClassName="bg-violet-400 rounded-lg"
      />

      <OverviewCard
        label="Нийт мэдээ"
        data={{
          value: 10,
          growthRate: 10,
        }}
        Icon={NewspaperIcon}
        iconClassName="bg-blue-400 rounded-lg"
      />
    </div>
  );
}
