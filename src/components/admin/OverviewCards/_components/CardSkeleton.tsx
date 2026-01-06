import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="rounded-[10px] bg-white py-6 shadow-1">
          <CardContent>
            <Skeleton className="size-14 rounded-lg" />

            <div className="mt-6 flex items-center justify-between">
              <Skeleton className="h-7 w-32" />

              <Skeleton className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
