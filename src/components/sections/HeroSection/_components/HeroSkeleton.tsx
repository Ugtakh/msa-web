export const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-secondary/20 animate-pulse" />

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Title Line 1 & 2 */}
          <div className="h-12 md:h-16 lg:h-20 bg-white/10 rounded-lg w-3/4 mx-auto animate-pulse" />
          <div className="h-12 md:h-16 lg:h-20 bg-white/10 rounded-lg w-1/2 mx-auto animate-pulse" />

          {/* Subtitle */}
          <div className="h-6 md:h-8 bg-white/5 rounded-lg w-1/3 mx-auto animate-pulse mt-8" />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <div className="w-40 h-14 bg-white/10 rounded-full animate-pulse" />
            <div className="w-40 h-14 bg-white/10 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Controls Skeleton */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
        <div className="w-24 h-4 bg-white/10 rounded-full animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
      </div>
    </section>
  );
};
