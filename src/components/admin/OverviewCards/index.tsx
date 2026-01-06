import { OverviewCard } from "./_components/Card";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_STATISTICS_QUERY } from "@/lib/sanity/queries/dashboard";
import { statistics } from "@/lib/types";

export async function OverviewCardsGroup() {
  const statData = await sanityFetch({ query: ALL_STATISTICS_QUERY });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
      {statistics.map(({ label, value, icon, iconClassName }) => (
        <OverviewCard
          key={value}
          label={label}
          data={{
            value: statData[value],
          }}
          Icon={icon}
          iconClassName={iconClassName}
        />
      ))}
    </div>
  );
}
