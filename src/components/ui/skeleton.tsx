import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

// Movie card skeleton
export function MovieCardSkeleton() {
  return (
    <div className="w-[180px] lg:w-[230px] bg-secondary rounded-[10px] overflow-hidden">
      <Skeleton className="w-full h-[220px] lg:h-[280px]" />
      <div className="p-2 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="min-h-[3rem] max-h-[4rem] w-full" />
      </div>
    </div>
  )
}

// Movie grid skeleton
export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-5 justify-center max-w-[1280px]">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Hero slider skeleton
export function HeroSliderSkeleton() {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  )
}

// Movie detail skeleton
export function MovieDetailSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1080px] flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-x-6 w-full">
          <Skeleton className="w-[290px] h-[428px] rounded" />
          <Skeleton className="w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] rounded" />
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-3/4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Full page skeleton for comprehensive loading
export function FullPageSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-4 min-h-screen">
      <HeroSliderSkeleton />
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
          <Skeleton className="h-8 w-48" />
          <MovieGridSkeleton count={10} />
        </div>
        <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
          <Skeleton className="h-8 w-48" />
          <MovieGridSkeleton count={10} />
        </div>
        <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
          <Skeleton className="h-8 w-48" />
          <MovieGridSkeleton count={10} />
        </div>
      </div>
    </div>
  )
}

// Search page skeleton
export function SearchPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <Skeleton className="h-8 w-80 mb-6" />
      <MovieGridSkeleton count={10} />
    </div>
  )
}

// Category page skeleton
export function CategoryPageSkeleton() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
        <Skeleton className="h-8 w-48" />
        <MovieGridSkeleton count={20} />
      </div>
    </div>
  )
}

export { Skeleton }
