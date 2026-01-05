"use client";

import { useCurrentUser } from "@sanity/sdk-react";

import { Button } from "@/components/ui/button";
import { StatisticCards } from "@/components/admin/StatisticCards";
import { OverviewCardsGroup } from "@/components/admin/OverviewCards";
import { OverviewCardsSkeleton } from "@/components/admin/OverviewCards/_components/CardSkeleton";

export default function AdminDashboard() {
  const user = useCurrentUser();
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        {/* <Suspense fallback={<OverviewCardsSkeleton />}> */}
        <OverviewCardsGroup />
        {/* </Suspense> */}
        <div>
          <h1>{user?.email || "Email"}</h1>
        </div>
      </div>
    </div>
  );
}
