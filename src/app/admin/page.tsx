import { Suspense } from "react";
import { OverviewCardsGroup } from "@/components/admin/OverviewCards";
import { OverviewCardsSkeleton } from "@/components/admin/OverviewCards/_components/CardSkeleton";

export default function AdminDashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        <Suspense fallback={<OverviewCardsSkeleton />}>
          <OverviewCardsGroup />
        </Suspense>
      </div>
    </div>
  );
}
