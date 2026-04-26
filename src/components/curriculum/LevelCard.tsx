'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';

interface LevelCardProps {
  level: {
    id: number;
    name: string;
    description: string;
    topicCount: number;
    isPremium: boolean;
  };
  progress: { completed: number; total: number; percentage: number };
  status: 'completed' | 'in-progress' | 'not-started';
  index: number;
}

const LevelCard = memo(function LevelCard({ level, progress, status, index }: LevelCardProps) {
  const borderColor =
    status === 'completed'
      ? 'border-quantum-green/40 hover:border-quantum-green/70 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]'
      : status === 'in-progress'
      ? 'border-quantum-purple/40 hover:border-quantum-purple/70 hover:shadow-glow-purple'
      : 'border-white/5 hover:border-white/15';

  const dimmed = false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/curriculum/${level.id}`}>
        <div
          className={`glass-panel p-6 border ${borderColor} rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
            dimmed ? 'opacity-60 hover:opacity-90' : ''
          }`}
        >
          {/* Top accent line */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] ${
              status === 'completed'
                ? 'bg-gradient-to-r from-quantum-green to-quantum-cyan'
                : status === 'in-progress'
                ? 'bg-gradient-to-r from-quantum-purple to-quantum-cyan'
                : 'bg-white/5'
            }`}
          />

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                  status === 'completed'
                    ? 'bg-quantum-green/20 text-quantum-green'
                    : status === 'in-progress'
                    ? 'bg-quantum-purple/20 text-quantum-purple'
                    : 'bg-white/5 text-quantum-text-body/40'
                }`}
              >
                {level.id}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-quantum-text-body/40">
                  Level {level.id}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-1.5">
              {status === 'completed' && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-quantum-green bg-quantum-green/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
              {status === 'in-progress' && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-quantum-purple bg-quantum-purple/10 px-2.5 py-1 rounded-full">
                  <BookOpen className="w-3 h-3" /> In Progress
                </span>
              )}
              {status === 'not-started' && (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-quantum-text-body/60 bg-white/5 px-2.5 py-1 rounded-full">
                  Available
                </span>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-quantum-text-heading transition-colors">
            {level.name}
          </h3>
          <p className="text-sm text-quantum-text-body/60 mb-5 leading-relaxed line-clamp-2">
            {level.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-quantum-text-body/50">
              <span>{level.topicCount} topics</span>
              <span>
                {progress.completed}/{progress.total} completed
              </span>
            </div>
            <ProgressBar percentage={progress.percentage} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default LevelCard;
