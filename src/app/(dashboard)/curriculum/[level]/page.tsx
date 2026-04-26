'use client';
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Lock, Clock, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { LEVELS, TOPICS } from '@/data/curriculum';
import { useProgress } from '@/lib/progress';
import TopicRow from '@/components/curriculum/TopicRow';
import ProgressBar from '@/components/curriculum/ProgressBar';
import BackButton from '@/components/ui/BackButton';

interface LevelPageProps {
  params: Promise<{ level: string }>;
}

export default function LevelPage({ params }: LevelPageProps) {
  const { level: levelIdStr } = use(params);
  const levelId = parseInt(levelIdStr);
  const level = LEVELS.find(l => l.id === levelId);
  const topics = TOPICS[levelId] || [];
  
  const { completedTopics, getLevelProgress, isLoading } = useProgress();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-quantum-cyan animate-spin" />
      </div>
    );
  }

  if (!level) return <div className="p-20 text-center text-white">Level not found.</div>;

  const progress = getLevelProgress(levelId, topics.length);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="pt-8 space-y-4">
        <div className="flex flex-col gap-3">
          <BackButton href="/curriculum" label="Curriculum" />
          <span className="text-xs font-bold text-quantum-text-body/40 uppercase tracking-widest block pt-2">
            Level {levelId}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              {level.name}
            </h1>
            <p className="text-quantum-text-body/60 max-w-xl leading-relaxed">
              {level.description}
            </p>
          </div>
          
          <div className="w-full md:w-64 glass-panel border border-white/5 p-4 rounded-2xl bg-white/[0.01]">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-quantum-text-body/40 uppercase tracking-widest">Level Progress</span>
              <span className="text-white">{progress.percentage}%</span>
            </div>
            <ProgressBar percentage={progress.percentage} showLabel={false} />
            <div className="mt-2 text-[10px] text-quantum-text-body/30 text-right">
              {progress.completed}/{progress.total} Topics Completed
            </div>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-quantum-purple" />
          <h2 className="text-sm font-black text-white uppercase tracking-widest">Inside this level</h2>
        </div>
        
        <div className="space-y-3">
          {topics.map((topic, idx) => (
            <TopicRow 
              key={topic.id}
              topic={topic}
              isCompleted={completedTopics.includes(topic.id)}
              index={idx}
            />
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex items-center justify-center text-center">
        <p className="text-xs text-quantum-text-body/30 max-w-md leading-relaxed italic">
          \"The quantum mechanical world is far more strange and beautiful than anything classical physics could have imagined.\"
        </p>
      </div>
    </div>
  );
}
