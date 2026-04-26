'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight, Menu, X, BookOpen, Calculator, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface TopicSidebarProps {
  levelId: number;
  levelName: string;
  topics: {
    id: string;
    name: string;
    type: 'theory' | 'math' | 'code';
  }[];
  activeTopicId: string;
  completedTopics: string[];
}

export default function TopicSidebar({ levelId, levelName, topics, activeTopicId, completedTopics }: TopicSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const TopicIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-3.5 h-3.5" />;
      case 'math': return <Calculator className="w-3.5 h-3.5" />;
      case 'code': return <Code2 className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const Content = (
    <>
      <div className="p-6 border-b border-white/5">
        <Link href={`/curriculum/${levelId}`} className="group inline-flex items-center gap-2 text-xs font-bold text-quantum-purple hover:text-quantum-cyan transition-colors mb-4 uppercase tracking-widest">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Level {levelId}
        </Link>
        <h2 className="text-xl font-bold text-white leading-tight">
          {levelName}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-quantum-purple to-quantum-cyan transition-all duration-500" 
              style={{ width: `${(topics.filter(t => completedTopics.includes(t.id)).length / topics.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-quantum-text-body/40">
            {topics.filter(t => completedTopics.includes(t.id)).length}/{topics.length}
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        {topics.map((topic, idx) => {
          const isActive = topic.id === activeTopicId;
          const isCompleted = completedTopics.includes(topic.id);

          return (
            <Link key={topic.id} href={`/curriculum/${levelId}/${topic.id}`}>
              <div 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-quantum-purple/20 to-quantum-cyan/20 border border-quantum-purple/40 ring-1 ring-quantum-purple/20' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${
                  isCompleted ? 'text-quantum-green' : isActive ? 'text-quantum-cyan' : 'text-quantum-text-body/20'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-quantum-cyan' : 'text-quantum-text-body/40'}`}>
                      Topic {idx + 1}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
                    <span className="text-[9px] text-quantum-text-body/30 uppercase flex items-center gap-1">
                      <TopicIcon type={topic.type} /> {topic.type}
                    </span>
                  </div>
                  <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-quantum-text-body/60 group-hover:text-quantum-text-heading'}`}>
                    {topic.name}
                  </p>
                </div>

                {isActive && (
                  <motion.div layoutId="active-nav-indicator" className="w-1.5 h-1.5 rounded-full bg-quantum-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 h-[calc(100vh-12rem)] flex-col bg-white/[0.02] border border-white/5 rounded-2xl glass-panel sticky top-32 overflow-hidden">
        {Content}
      </aside>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-quantum-purple shadow-glow-purple flex items-center justify-center text-white transition-transform active:scale-95"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 w-[85%] max-w-sm bg-quantum-bg-dark border-l border-white/10 z-[51] shadow-2xl flex flex-col"
            >
              {Content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
