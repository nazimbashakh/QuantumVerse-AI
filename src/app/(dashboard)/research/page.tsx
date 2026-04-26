'use client';
import { motion } from 'framer-motion';
import { Beaker, Star, ExternalLink, BookOpen, Filter, TrendingUp, Atom } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

const PAPERS = [
  { title: 'Quantum Supremacy Using a Programmable Superconducting Processor', authors: 'F. Arute et al. (Google)', year: 2019, journal: 'Nature', citations: 8500, tags: ['Supremacy', 'Hardware'], url: 'https://doi.org/10.1038/s41586-019-1666-5' },
  { title: 'Quantum Error Correction Below the Surface Code Threshold', authors: 'Google Quantum AI Team', year: 2024, journal: 'Nature', citations: 1200, tags: ['Error Correction', 'Surface Code'], url: '#' },
  { title: 'Variational Quantum Eigensolver for Molecular Simulation', authors: 'A. Peruzzo et al.', year: 2014, journal: 'Nature Communications', citations: 5600, tags: ['VQE', 'Chemistry'], url: '#' },
  { title: 'Quantum Approximate Optimization Algorithm', authors: 'E. Farhi, J. Goldstone, S. Gutmann', year: 2014, journal: 'arXiv:1411.4028', citations: 4200, tags: ['QAOA', 'Optimization'], url: '#' },
  { title: 'A Quantum Approximate Optimization Algorithm', authors: 'E. Farhi, J. Goldstone, S. Gutmann', year: 2020, journal: 'Science', citations: 3800, tags: ['Algorithms', 'Theory'], url: '#' },
  { title: 'Post-Quantum Cryptography: Current State and Quantum Mitigation', authors: 'D. J. Bernstein, T. Lange', year: 2017, journal: 'Springer', citations: 2800, tags: ['PQC', 'Cryptography'], url: '#' },
  { title: 'Quantum Machine Learning', authors: 'J. Biamonte et al.', year: 2017, journal: 'Nature', citations: 6100, tags: ['QML', 'Theory'], url: '#' },
  { title: 'IBM Quantum Heron: A New Era of Quantum Computing', authors: 'IBM Quantum Team', year: 2024, journal: 'IBM Research', citations: 320, tags: ['Hardware', 'Superconducting'], url: '#' },
];

const TAG_COLORS: Record<string, string> = {
  Supremacy: '#EF4444', Hardware: '#F59E0B', 'Error Correction': '#10B981', 'Surface Code': '#10B981',
  VQE: '#06B6D4', Chemistry: '#06B6D4', QAOA: '#A78BFA', Optimization: '#A78BFA',
  PQC: '#7C3AED', Cryptography: '#7C3AED', QML: '#F59E0B', Theory: '#94A3B8',
  Algorithms: '#06B6D4', Superconducting: '#EF4444',
};

const ALL_TAGS = [...new Set(PAPERS.flatMap(p => p.tags))];

export default function ResearchPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? PAPERS.filter(p => p.tags.includes(activeTag)) : PAPERS;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Research Lab"
        subtitle="Curated landmark papers, breakthroughs, and academic resources in quantum computing"
        breadcrumbs={[{ label: 'Research Lab' }]}
        icon={<Beaker className="w-6 h-6" style={{ color: '#10B981' }} />}
      />

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Papers', value: PAPERS.length, color: '#A78BFA', icon: BookOpen },
          { label: 'Total Citations', value: '32k+', color: '#10B981', icon: Star },
          { label: 'Topics', value: ALL_TAGS.length, color: '#06B6D4', icon: Atom },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
            <stat.icon className="w-5 h-5 flex-shrink-0" style={{ color: stat.color }} />
            <div>
              <p className="text-lg font-black" style={{ color: '#F1F5F9' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTag(null)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          style={!activeTag ? {
            background: 'linear-gradient(135deg, #6D28D9, #7C3AED)', color: '#fff',
          } : { background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F', color: 'rgba(148,163,184,0.5)' }}
        >
          All
        </button>
        {ALL_TAGS.map(tag => {
          const c = TAG_COLORS[tag] ?? '#94A3B8';
          return (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={activeTag === tag ? {
                background: `${c}25`, border: `1px solid ${c}50`, color: c,
              } : { background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F', color: 'rgba(148,163,184,0.4)' }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Papers */}
      <div className="space-y-4">
        {filtered.map((paper, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="p-5 rounded-2xl transition-all group cursor-pointer"
            style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-bold leading-snug transition-colors" style={{ color: '#F1F5F9' }}>{paper.title}</h3>
                <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{paper.authors}</p>
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map(tag => {
                    const c = TAG_COLORS[tag] ?? '#94A3B8';
                    return (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                        style={{ background: `${c}15`, border: `1px solid ${c}30`, color: c }}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="text-right flex-shrink-0 space-y-1.5">
                <p className="text-xs font-bold" style={{ color: 'rgba(148,163,184,0.4)' }}>{paper.journal}, {paper.year}</p>
                <p className="text-xs font-bold flex items-center gap-1 justify-end" style={{ color: '#06B6D4' }}>
                  <Star className="w-3 h-3" />{paper.citations.toLocaleString()} citations
                </p>
                <a href={paper.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold transition-colors hover:opacity-80" style={{ color: '#A78BFA' }}>
                  View Paper <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
