'use client';
import { motion } from 'framer-motion';
import { Book, Calculator, Lightbulb, Code2, Cpu, Info, Target, Eye, AlertTriangle, CheckCircle, GraduationCap, Link as LinkIcon, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { memo } from 'react';
import { TopicContent } from '@/data/curriculum';
import Link from 'next/link';

interface TopicArticleProps {
  content: TopicContent;
  topicName?: string;
}

const ContentTabs = memo(function ContentTabs({ content, activeTab, setActiveTab, topicName }: any) {
  return (
    <div className="space-y-12">
      {/* 1. Prerequisites */}
      {content.prerequisites && content.prerequisites.topics.length > 0 && (
        <section className="bg-quantum-purple/10 border border-quantum-purple/30 p-6 rounded-2xl flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg font-black text-quantum-purple uppercase tracking-widest">
            <LinkIcon className="w-5 h-5" /> Prerequisites
          </h3>
          <p className="text-quantum-text-body/80 text-sm font-medium">Before proceeding, ensure you have an understanding of:</p>
          <div className="flex flex-wrap gap-3">
            {content.prerequisites.topics.map((t: any, idx: number) => (
              <span key={idx} className="bg-black/40 px-4 py-2 rounded-xl text-sm font-bold border border-white/5 text-quantum-cyan">
                {t.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 2. What You Will Learn */}
      <section className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
        <h3 className="flex items-center gap-2 text-lg font-black text-white uppercase tracking-widest">
          <GraduationCap className="w-5 h-5 text-quantum-green" /> What You Will Learn
        </h3>
        <ul className="list-none space-y-3">
          {content.whatYouWillLearn && Array.isArray(content.whatYouWillLearn) ? (
            content.whatYouWillLearn.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-quantum-green shrink-0 mt-0.5" />
                <div className="text-quantum-text-body font-medium leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {item}
                  </ReactMarkdown>
                </div>
              </li>
            ))
          ) : (
            <li className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-quantum-cyan shrink-0 mt-0.5" />
              <span className="text-quantum-text-body/60 italic font-medium">Learning objectives for this topic are being updated...</span>
            </li>
          )}
        </ul>
      </section>

      {/* 3. Introduction */}
      <section className="glass-panel p-8 rounded-2xl border-white/5 space-y-4">
        <h2 className="text-2xl font-black text-white">1. Introduction</h2>
        <p className="text-quantum-text-body/90 text-lg leading-relaxed">{content.introduction}</p>
      </section>

      {/* 4. Key Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-white">2. Key Concepts</h2>
        <div className="grid gap-6">
          {content.keyConcepts?.map((concept: any, idx: number) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border-white/5">
              <h3 className="text-xl font-bold text-quantum-cyan mb-3">{concept.heading}</h3>
              <p className="text-quantum-text-body/90 leading-relaxed">{concept.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Mathematics & Formalism */}
      <section className="glass-panel p-8 rounded-2xl border-white/5 space-y-6 overflow-x-auto">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <Calculator className="w-6 h-6 text-quantum-purple" /> 3. Mathematics
        </h2>
        <div className="prose prose-invert max-w-none text-xl p-4 bg-black/40 rounded-xl border border-white/5 w-full">
          <div className="w-full text-center">
            <ReactMarkdown 
              remarkPlugins={[remarkMath]} 
              rehypePlugins={[rehypeKatex]}
            >
              {content.mathematics?.replaceAll('\\n', '\n')}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* 4. Real World Applications */}
      <section className="glass-panel p-8 rounded-2xl border-white/5 space-y-6">
        <h2 className="text-2xl font-black text-white">4. Real World Applications</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {content.realWorldApplications?.map((app: any, idx: number) => (
            <div key={idx} className="bg-black/30 p-6 rounded-xl border border-white/5">
              <h4 className="font-bold text-white mb-2">{app.title}</h4>
              <p className="text-sm text-quantum-text-body/80 leading-relaxed">{app.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Common Mistakes */}
      <section className="bg-[#FF453A]/5 border border-[#FF453A]/20 p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-black text-[#FF453A] flex items-center gap-3">
          <AlertTriangle className="w-6 h-6" /> 5. Common Mistakes & Misconceptions
        </h2>
        <div className="space-y-4">
          {content.commonMistakes?.map((mistake: any, idx: number) => (
            <div key={idx} className="bg-black/40 p-6 rounded-xl border border-[#FF453A]/10">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-[#FF453A] shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2">Mistake: {mistake.mistake}</h4>
                  <p className="text-quantum-text-body text-sm leading-relaxed"><strong className="text-quantum-green font-bold">Correction:</strong> {mistake.correction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Summary */}
      <section className="glass-panel p-8 rounded-2xl border-white/5 space-y-6 bg-gradient-to-br from-white/[0.02] to-quantum-purple/[0.05]">
        <h2 className="text-2xl font-black text-white">6. Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-quantum-text-body/90 text-lg leading-relaxed marker:text-quantum-purple">
          {content.summary?.map((sum: string, idx: number) => (
            <li key={idx}><span>{sum}</span></li>
          ))}
        </ul>
      </section>
      
    </div>
  );
});

export default ContentTabs;
