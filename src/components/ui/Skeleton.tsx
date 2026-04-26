'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/5 border border-white/5 relative overflow-hidden",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent",
        className
      )}
      {...props}
    />
  );
}
