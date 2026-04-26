'use client';
import { use, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Lock, CheckCircle2, Circle, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LEVELS, TOPICS, QUIZ_DATA } from '@/data/curriculum';
import { useProgress } from '@/lib/progress';
import TopicSidebar from '@/components/curriculum/TopicSidebar';
import ContentTabs from '@/components/curriculum/ContentTabs';
import QuizSection from '@/components/curriculum/QuizSection';
import XPAnimation from '@/components/curriculum/XPAnimation';
import BackButton from '@/components/ui/BackButton';

interface TopicPageProps {
  params: Promise<{ level: string; topic: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const router = useRouter();
  const { level: levelIdStr, topic: topicId } = use(params);
  const levelId = parseInt(levelIdStr);
  const level = LEVELS.find(l => l.id === levelId);
  const topics = TOPICS[levelId] || [];
  
  // Bug Fix: Finding topic by ID or index, prioritizing ID for the URL scheme requested
  const topic = topics.find(t => t.id === topicId);
  const topicIndex = topics.findIndex(t => t.id === topicId);
  const quiz = QUIZ_DATA[topicId];

  // Debug logs for USER verification
  useEffect(() => {
    console.log('Level param from URL:', levelIdStr);
    console.log('Topic param from URL:', topicId);
    console.log('Found topic data:', topic?.name);
  }, [levelIdStr, topicId, topic]);


  const { completedTopics, isTopicComplete, markTopicComplete, isLoading } = useProgress();

  const [activeTab, setActiveTab] = useState('theory');
  const [showXP, setShowXP] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-quantum-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!topic || !level) return <div className="p-20 text-center text-white">Topic not found.</div>;

  const isCompleted = isTopicComplete(topicId);

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    const newlyCompleted = await markTopicComplete(topicId, levelId);
    if (newlyCompleted) {
      setShowXP(true);
    }
  };

  const nextTopic = topics[topicIndex + 1];
  const prevTopic = topics[topicIndex - 1];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto pb-20 px-4 pt-4 lg:pt-8 relative">
      <XPAnimation show={showXP} onComplete={() => setShowXP(false)} />

      {/* Sticky Inner Sidebar */}
      <TopicSidebar 
        levelId={levelId}
        levelName={level.name}
        topics={topics.map(t => ({ id: t.id, name: t.name, type: t.type }))}
        activeTopicId={topicId}
        completedTopics={completedTopics}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <BackButton href={`/curriculum/${levelId}`} label="Back to level overview" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-quantum-purple/10 border border-quantum-purple/20 rounded-full text-[10px] font-mono font-black text-quantum-purple uppercase tracking-widest leading-none">
                  PHASE {topicIndex + 1}
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-quantum-green bg-quantum-green/10 px-2.5 py-1 rounded-full border border-quantum-green/20">
                    <CheckCircle2 className="w-3 h-3" /> Mastered
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight">
                {topic.name}
              </h1>
            </div>

            <button 
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`
                flex items-center gap-2.5 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500
                ${isCompleted 
                  ? 'bg-quantum-green/10 border border-quantum-green/30 text-quantum-green cursor-default' 
                  : 'bg-gradient-to-r from-quantum-green to-quantum-cyan text-white shadow-glow-cyan hover:scale-[1.02] active:scale-95 group'}
              `}
            >
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Trophy className="w-5 h-5 group-hover:animate-bounce" />}
              {isCompleted ? 'Topic Mastered' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        {/* Learning Content */}
        <ContentTabs 
          content={topic.content} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          topicName={topic.name}
        />

        {/* Quiz Section */}
        {quiz && (
          <QuizSection 
            questions={quiz.questions} 
            onComplete={handleMarkComplete} 
          />
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-white/5 gap-4">
          {prevTopic ? (
            <Link 
              href={`/curriculum/${levelId}/${prevTopic.id}`}
              className="flex-1 max-w-[280px] p-4 lg:p-6 glass-panel border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.05] transition-all group lg:flex lg:flex-row lg:items-center lg:gap-4 flex flex-col items-start gap-2"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-quantum-purple transition-colors">
                <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-quantum-purple" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-quantum-text-body/30 tracking-widest">Previous Topic</span>
                <p className="text-sm font-bold text-white truncate group-hover:text-quantum-purple transition-colors">{prevTopic.name}</p>
              </div>
            </Link>
          ) : <div className="flex-1 max-w-[280px]" />}

          {nextTopic ? (
            <Link 
              href={`/curriculum/${levelId}/${nextTopic.id}`}
              className="flex-1 max-w-[280px] p-4 lg:p-6 glass-panel border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.05] transition-all group lg:flex lg:flex-row-reverse lg:items-center lg:gap-4 flex flex-col items-end gap-2 text-right"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-quantum-cyan transition-colors">
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-quantum-cyan" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-quantum-text-body/30 tracking-widest">Next Topic</span>
                <p className="text-sm font-bold text-white truncate group-hover:text-quantum-cyan transition-colors">{nextTopic.name}</p>
              </div>
            </Link>
          ) : (
            <Link 
              href="/curriculum"
              className="flex-1 max-w-[280px] p-4 lg:p-6 glass-panel border border-quantum-purple/20 rounded-2xl bg-quantum-purple/5 hover:bg-quantum-purple/10 transition-all group lg:flex lg:flex-row-reverse lg:items-center lg:gap-4 flex flex-col items-end gap-2 text-right"
            >
              <div className="w-10 h-10 rounded-full bg-quantum-purple flex items-center justify-center shrink-0 shadow-glow-purple">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-white tracking-widest">Level Complete</span>
                <p className="text-sm font-bold text-white truncate">Back to Curriculum</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
