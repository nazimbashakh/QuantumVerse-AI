'use client';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Building2, ExternalLink, Award, GraduationCap, Sparkles, ShieldCheck, BookOpen, Trophy } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

const JOBS = [
  { title: 'Quantum Software Engineer', company: 'IBM Quantum', location: 'Remote', type: 'Full-time', level: 'Senior', salary: '$150k–$200k', tags: ['Qiskit', 'Python', 'Quantum Circuits'], applyUrl: '#' },
  { title: 'Quantum Research Scientist', company: 'Google Quantum AI', location: 'Mountain View, CA', type: 'Full-time', level: 'PhD Required', salary: '$180k–$250k', tags: ['Algorithm Design', 'QML', 'Research'], applyUrl: '#' },
  { title: 'Quantum Applications Developer', company: 'Amazon Braket', location: 'Seattle, WA', type: 'Full-time', level: 'Mid-level', salary: '$130k–$170k', tags: ['AWS', 'Cirq', 'Optimization'], applyUrl: '#' },
  { title: 'Post-Quantum Cryptographer', company: 'Microsoft Azure Quantum', location: 'Redmond, WA', type: 'Full-time', level: 'Senior', salary: '$160k–$220k', tags: ['Lattice Crypto', 'Security', 'C++'], applyUrl: '#' },
  { title: 'Quantum Hardware Engineer', company: 'Rigetti Computing', location: 'Berkeley, CA', type: 'Full-time', level: 'Senior', salary: '$140k–$190k', tags: ['Superconducting', 'Cryogenics', 'Fabrication'], applyUrl: '#' },
  { title: 'QML Researcher', company: 'Xanadu', location: 'Toronto, Canada', type: 'Full-time', level: 'PhD Required', salary: '$120k–$180k', tags: ['PennyLane', 'ML', 'Photonics'], applyUrl: '#' },
  { title: 'Trapped Ion Engineer', company: 'IonQ', location: 'College Park, MD', type: 'Full-time', level: 'Senior', salary: '$155k–$210k', tags: ['Trapped Ion', 'Laser Systems', 'Python'], applyUrl: '#' },
  { title: 'Quantum Error Correction Researcher', company: 'Quantinuum', location: 'Cambridge, UK', type: 'Full-time', level: 'PhD Required', salary: '£90k–£130k', tags: ['QEC', 'Stabilizer Codes', 'Surface Codes'], applyUrl: '#' },
  { title: 'Quantum Photonics Engineer', company: 'PsiQuantum', location: 'Palo Alto, CA', type: 'Full-time', level: 'Senior', salary: '$160k–$220k', tags: ['Photonics', 'Silicon Photonics', 'CMOS'], applyUrl: '#' },
  { title: 'Quantum Systems Architect', company: 'D-Wave Systems', location: 'Burnaby, BC', type: 'Full-time', level: 'Senior', salary: '$140k–$185k', tags: ['Annealing', 'Optimization', 'Systems'], applyUrl: '#' },
];

const CERTS = [
  { name: 'Quantum Foundation Certificate', tier: 'Bronze', icon: '🥉', topics: 24, desc: 'Complete Levels 1–3', stat1: 'Top 45%', stat2: 'Beg. Developer', stat3: 'Foundation' },
  { name: 'Quantum Developer Certificate', tier: 'Silver', icon: '🥈', topics: 48, desc: 'Complete Levels 1–6', stat1: 'Top 20%', stat2: 'Jr. Researcher', stat3: 'Intermediate' },
  { name: 'Quantum Algorithm Specialist', tier: 'Gold', icon: '🥇', topics: 80, desc: 'Complete Levels 1–9', stat1: 'Top 10%', stat2: 'Algorithm Eng.', stat3: 'Advanced' },
  { name: 'Quantum Research Associate', tier: 'Platinum', icon: '💎', topics: 115, desc: 'Complete Levels 1–12', stat1: 'Top 3%', stat2: 'Sr. Researcher', stat3: 'Expert' },
  { name: 'Quantum Master Certification', tier: 'Diamond', icon: '👑', topics: 137, desc: 'Complete all 15 Levels', stat1: 'Top 0.5%', stat2: 'Distinguished', stat3: 'Master' },
];

const INTERVIEW_CATS = [
  { name: 'Quantum Basics', count: 50, color: '#06B6D4' },
  { name: 'Linear Algebra', count: 40, color: '#10B981' },
  { name: 'Quantum Gates & Circuits', count: 45, color: '#A78BFA' },
  { name: 'Algorithms', count: 60, color: '#F59E0B' },
  { name: 'Error Correction', count: 35, color: '#7C3AED' },
  { name: 'QML & Applications', count: 70, color: '#06B6D4' },
];

function CertCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="perspective-1000 h-[300px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div className="w-full h-full relative preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 90, damping: 18 }}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3"
          style={{ background: 'rgba(19,19,43,0.9)', border: '1px solid #1E1E3F', backdropFilter: 'blur(20px)' }}>
          <div className="text-5xl">{cert.icon}</div>
          <h3 className="text-base font-black" style={{ color: '#F1F5F9' }}>{cert.name}</h3>
          <p className="text-xs" style={{ color: 'rgba(148,163,184,0.6)' }}>{cert.desc}</p>
          <div className="w-full h-1.5 rounded-full mt-auto" style={{ background: 'rgba(30,30,63,0.8)' }}>
            <div className="h-full w-0 rounded-full" style={{ background: 'linear-gradient(to right, #6D28D9, #A78BFA)' }} />
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.4)' }}>{cert.tier} Tier</span>
            <span className="text-[10px] font-black flex items-center gap-1" style={{ color: '#06B6D4' }}><BookOpen className="w-3 h-3" />{cert.topics} topics</span>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col justify-center space-y-4"
          style={{ background: 'rgba(30,15,60,0.95)', border: '1px solid rgba(109,40,217,0.4)', transform: 'rotateY(180deg)' }}>
          <ShieldCheck className="w-10 h-10 mx-auto" style={{ color: '#06B6D4' }} />
          <h3 className="text-base font-black text-center" style={{ color: '#F1F5F9' }}>Unlock Benefits</h3>
          {[['Market Position', cert.stat1, '#10B981'], ['Industry Level', cert.stat2, '#06B6D4'], ['Mastery', cert.stat3, '#A78BFA']].map(([k, v, c]) => (
            <div key={k} className="flex justify-between pb-2" style={{ borderBottom: '1px solid rgba(30,30,63,0.8)' }}>
              <span className="text-xs font-bold" style={{ color: 'rgba(148,163,184,0.5)' }}>{k}</span>
              <span className="text-xs font-black" style={{ color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function CareerPage() {
  const [tab, setTab] = useState<'jobs' | 'certs' | 'interview'>('jobs');

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Career Hub"
        subtitle="Quantum job board, blockchain certifications, and AI-powered interview preparation"
        breadcrumbs={[{ label: 'Career Hub' }]}
        icon={<Briefcase className="w-6 h-6" style={{ color: '#A78BFA' }} />}
      />

      {/* Tab switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl mb-6 w-fit" style={{ background: 'rgba(18,18,42,0.8)', border: '1px solid #1E1E3F' }}>
        {[
          { id: 'jobs', label: 'Job Board', icon: Briefcase },
          { id: 'certs', label: 'Certifications', icon: Award },
          { id: 'interview', label: 'Interview Prep', icon: GraduationCap },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={tab === t.id ? {
              background: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(109,40,217,0.4)',
            } : { color: 'rgba(148,163,184,0.5)' }}
          >
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {/* Jobs tab */}
      {tab === 'jobs' && (
        <div className="space-y-3">
          {JOBS.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="p-5 rounded-2xl transition-all group cursor-pointer"
              style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F', backdropFilter: 'blur(20px)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold transition-colors" style={{ color: '#F1F5F9' }}>{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{job.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                        style={{ background: 'rgba(109,40,217,0.1)', border: '1px solid rgba(109,40,217,0.2)', color: '#A78BFA' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-2 flex-shrink-0">
                  <p className="text-lg font-black" style={{ color: '#10B981' }}>{job.salary}</p>
                  <p className="text-xs font-bold" style={{ color: 'rgba(148,163,184,0.4)' }}>{job.level} · {job.type}</p>
                  <a href={job.applyUrl} className="inline-flex items-center gap-1 text-xs font-bold transition-colors hover:opacity-80" style={{ color: '#A78BFA' }}>
                    Apply <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Certs tab */}
      {tab === 'certs' && (
        <div>
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)' }}>
            <Trophy className="w-5 h-5" style={{ color: '#A78BFA' }} />
            <div>
              <p className="text-sm font-bold" style={{ color: '#F1F5F9' }}>Hover or click certificates to reveal stats</p>
              <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>Earn cryptographic blockchain certificates as you complete levels</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CERTS.map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
          </div>
        </div>
      )}

      {/* Interview tab */}
      {tab === 'interview' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl flex items-start gap-3" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#06B6D4' }} />
            <div>
              <h3 className="font-bold" style={{ color: '#F1F5F9' }}>300 Interview Questions</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>Curated from IBM, Google, Microsoft, Amazon, IonQ, and Quantinuum hiring processes</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INTERVIEW_CATS.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="p-5 rounded-2xl cursor-pointer transition-all"
                style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}40`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F'}
              >
                <h3 className="font-bold mb-2" style={{ color: cat.color }}>{cat.name}</h3>
                <p className="text-3xl font-black" style={{ color: '#F1F5F9' }}>{cat.count}</p>
                <span className="text-xs font-bold" style={{ color: 'rgba(148,163,184,0.4)' }}>questions available</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
