'use client';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, LayoutGrid, Info, Loader2 } from 'lucide-react';
import { LEVELS, TOPICS } from '@/data/curriculum';
import { useProgress } from '@/lib/progress';
import LevelCard from '@/components/curriculum/LevelCard';
import BackButton from '@/components/ui/BackButton';

export default function Curriculum() {
  const { getLevelProgress, getLevelStatus, getTotalXP, isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-quantum-cyan animate-spin" />
      </div>
    );
  }

  const totalXP = getTotalXP();



  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 pt-4 px-4">
      <BackButton href="/dashboard" label="Back to Dashboard" />
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-quantum-purple font-mono text-xs font-black uppercase tracking-[0.2em]"
          >
            <BookOpen className="w-4 h-4 shadow-glow-purple" />
            Learning Path
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black text-white leading-tight"
          >
            Your Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">Learning Path</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-quantum-text-body/60 text-lg max-w-2xl leading-relaxed"
          >
            115 topics across 15 progressive levels. From your first qubit to quantum machine learning.
          </motion.p>
        </div>

        {/* Global Progress Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel border border-white/5 p-6 rounded-3xl flex items-center gap-6 shadow-2xl relative overflow-hidden group min-w-[280px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-quantum-purple/5 to-quantum-cyan/5 group-hover:opacity-100 transition-opacity" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shadow-glow-purple">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{totalXP}</div>
            <div className="text-xs font-bold text-quantum-text-body/40 uppercase tracking-widest flex items-center gap-1.5">
              Total XP Earned
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
        {LEVELS.map((level, idx) => {
          const topicsCount = TOPICS[level.id]?.length || 0;
          const progress = getLevelProgress(level.id, topicsCount);
          const status = getLevelStatus(level.id, topicsCount);

          return (
            <LevelCard 
              key={level.id}
              level={level}
              progress={progress}
              status={status}
              index={idx}
            />
          );
        })}
      </div>

      {/* Info Banner Removed */}
    </div>
  );
}
