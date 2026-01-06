import { Skeleton } from "@/components/ui/skeleton";

export const StandardSkeleton = () => {
  return (
    <>
      {[191, 292, 393, 494].map((i) => (
        <div className="h-50.5 bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="w-12 h-12 " />
            <Skeleton className="w-9 h-6 rounded-full" />
          </div>
          <Skeleton className="h-7 mb-2" />
          <Skeleton className="h-5 mb-2" />
          <Skeleton className="w-full h-8" />
        </div>
      ))}
    </>
  );
};
