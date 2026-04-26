'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, BookOpen, Calculator, Code2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TopicRowProps {
  topic: {
    id: string;
    levelId: number;
    name: string;
    type: 'theory' | 'math' | 'code';
    estimatedMinutes: number;
  };
  isCompleted: boolean;
  index: number;
}

const TopicRow = memo(function TopicRow({ topic, isCompleted, index }: TopicRowProps) {
  const Icon = topic.type === 'theory' ? BookOpen : topic.type === 'math' ? Calculator : Code2;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/curriculum/${topic.levelId}/${topic.id}`}>
        <div className="group flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-quantum-purple/30 hover:bg-white/5 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-quantum-green/10 text-quantum-green' : 'bg-white/5 text-quantum-text-body/40'}`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-quantum-purple uppercase tracking-wider">
                  Topic {index + 1}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <div className="flex items-center gap-1 text-[10px] text-quantum-text-body/40 uppercase tracking-wider">
                  <Icon className="w-3 h-3" /> {topic.type}
                </div>
              </div>
              <h4 className="text-white font-semibold group-hover:text-quantum-cyan transition-colors">
                {topic.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-quantum-text-body/40">
              <Clock className="w-3.5 h-3.5" />
              {topic.estimatedMinutes} min
            </div>
            <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-quantum-purple group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default TopicRow;
