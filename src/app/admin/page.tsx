import { OverviewCardsGroup } from "@/components/admin/OverviewCards";

export default function AdminDashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        <OverviewCardsGroup />

        <div>
          <h1>{"Email"}</h1>
        </div>
      </div>
    </div>
  );
}
