'use client';

import Skeleton from '@/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse text-white/5">
      {/* Welcome Header Skeleton */}
      <div className="glass-panel p-8 lg:p-10 border border-white/5 rounded-3xl min-h-[200px] flex flex-col justify-end gap-4 overflow-hidden relative">
        <Skeleton className="h-10 w-2/3 max-w-sm mb-4" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="absolute top-8 right-8">
          <Skeleton className="h-14 w-48 rounded-2xl" />
        </div>
      </div>

      {/* Stats Row Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart Skeleton */}
        <div className="xl:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-end gap-3 h-40">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="flex-1 rounded-xl min-h-[10%]" style={{ height: `${20 + i * 10}%` }} />
            ))}
          </div>
        </div>

        {/* Recent Topics Skeleton */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <Skeleton className="h-6 w-40" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 min-h-[160px] space-y-4">
             <Skeleton className="h-12 w-12 rounded-xl" />
             <Skeleton className="h-5 w-24" />
             <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
