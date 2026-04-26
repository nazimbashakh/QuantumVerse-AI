'use client';

import Skeleton from '@/components/ui/Skeleton';

export default function SimulatorSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-11 w-24 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar Library Skeleton */}
        <div className="xl:w-64 shrink-0">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-6">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="h-px bg-white/5" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Circuit Grid Skeleton */}
        <div className="flex-1 space-y-6">
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 min-h-[400px] relative overflow-hidden">
            {/* Qubit Lines */}
            <div className="space-y-12 mt-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 relative">
                  <Skeleton className="h-4 w-12" />
                  <div className="flex-1 h-[2px] bg-white/5 relative">
                    {/* Placeholder Gate Boxes */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/4 h-10 w-10 border border-white/10 bg-white/5 rounded-lg" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-2/3 h-10 w-10 border border-white/10 bg-white/5 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
