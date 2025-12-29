import { Skeleton } from "@/components/ui/skeleton";

const tablesIdx = [1, 2, 3, 4, 5, 6];

const BannerTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* table rows */}
      {tablesIdx.map((i) => (
        <div key={i} className="grid grid-cols-5 gap-4 items-center">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
};

export default BannerTableSkeleton;
