'use client';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function ProgressBar({ percentage, size = 'sm', showLabel = true }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="flex items-center gap-3 w-full">
      <div className={`flex-1 ${height} rounded-full bg-white/5 overflow-hidden`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-quantum-purple to-quantum-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono font-bold text-quantum-text-body/60 min-w-[3ch] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
}
