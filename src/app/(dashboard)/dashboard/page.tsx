'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Flame, BookOpen, FlaskConical, Bot, Cpu, Target,
  TrendingUp, ChevronRight, BarChart3, Trophy, Clock,
  Newspaper, Star, Calendar, ArrowRight, Award, Users,
  CheckCircle2, AlertCircle, Atom
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

// ── Animated counter ──────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = target / 60;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ── Countdown timer ────────────────────────────────────────
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
      const diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
      setTimeLeft({ h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-2">
      {[timeLeft.h, timeLeft.m, timeLeft.s].map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="text-center">
            <div className="text-lg font-black" style={{ color: '#A78BFA' }}>{pad(v)}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.5)' }}>
              {['HRS', 'MIN', 'SEC'][i]}
            </div>
          </div>
          {i < 2 && <span className="text-lg font-black mb-3" style={{ color: 'rgba(167,139,250,0.4)' }}>:</span>}
        </div>
      ))}
    </div>
  );
}

// ── News ticker items ──────────────────────────────────────
const NEWS_HEADLINES = [
  '⚛ IBM unveils 1000+ qubit Condor processor, breaking quantum volume records',
  '🔬 Google Quantum AI achieves new milestone in error correction below threshold',
  '🚀 Microsoft Azure Quantum opens public access to topological qubits',
  '📡 China demonstrates satellite-based quantum key distribution at 1200km',
  '💻 IonQ announces trapped-ion quantum computer with 99.9% gate fidelity',
  '🔐 NIST finalizes post-quantum cryptography standards for global adoption',
  '🌐 Amazon Braket adds new quantum hardware providers: QuEra and IQM',
  '🧬 Quantum machine learning model outperforms classical AI on drug discovery',
];

const QUICK_ACCESS = [
  {
    title: 'Curriculum',
    desc: 'Master quantum computing step by step',
    icon: BookOpen,
    href: '/curriculum',
    gradient: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
    glow: 'rgba(109,40,217,0.35)',
  },
  {
    title: 'QuantumBot AI',
    desc: 'Ask any quantum question, get expert answers',
    icon: Bot,
    href: '/quantumbot',
    gradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
    glow: 'rgba(6,182,212,0.35)',
  },
  {
    title: 'Circuit Simulator',
    desc: 'Build and visualize quantum circuits',
    icon: Cpu,
    href: '/simulator',
    gradient: 'linear-gradient(135deg, #059669, #10B981)',
    glow: 'rgba(16,185,129,0.35)',
  },
  {
    title: 'Practicals Lab',
    desc: 'Run real Qiskit and Cirq code',
    icon: FlaskConical,
    href: '/practicals',
    gradient: 'linear-gradient(135deg, #B45309, #F59E0B)',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    title: 'Challenge Arena',
    desc: 'Compete with quantum problems daily',
    icon: Trophy,
    href: '/challenges',
    gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    glow: 'rgba(167,139,250,0.35)',
  },
  {
    title: 'Progress Analytics',
    desc: 'Track velocity, weak areas and predictions',
    icon: BarChart3,
    href: '/research',
    gradient: 'linear-gradient(135deg, #DC2626, #EF4444)',
    glow: 'rgba(239,68,68,0.3)',
  },
];

const RECENT_TOPICS = [
  { title: 'Quantum Teleportation Protocol', level: 'Level 6', progress: 100, xp: 50 },
  { title: 'Bell States & Measurements', level: 'Level 6', progress: 100, xp: 50 },
  { title: "Grover's Search Algorithm", level: 'Level 7', progress: 65, xp: 30 },
  { title: 'Quantum Phase Estimation', level: 'Level 7', progress: 20, xp: 10 },
  { title: 'Quantum Fourier Transform', level: 'Level 7', progress: 0, xp: 0 },
];

// Card wrapper styled with new theme
function DashCard({ children, className = '', style = {}, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(19,19,43,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid #1E1E3F',
        borderRadius: '16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Quantum Explorer';
  const tickerRef = useRef<HTMLDivElement>(null);
  
  const [userStats, setUserStats] = useState({
    xp: 0,
    streakDays: 0,
    completedTopics: 0,
    level: 1,
  });

  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/stats')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setUserStats({
              xp: data.xp || 0,
              streakDays: data.streakDays || 0,
              completedTopics: data.completedTopics || 0,
              level: data.level || 1,
            });
          }
        })
        .catch(console.error);
    }
  }, [session]);

  const STATS = [
    {
      label: 'Total XP', value: userStats.xp, suffix: '', icon: Zap,
      color: '#06B6D4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.2)',
    },
    {
      label: 'Day Streak', value: userStats.streakDays, suffix: ' 🔥', icon: Flame,
      color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.2)',
    },
    {
      label: 'Topics Done', value: userStats.completedTopics, suffix: '/137', icon: BookOpen,
      color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.2)',
    },
    {
      label: 'Practicals', value: 0, suffix: '/40', icon: FlaskConical,
      color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.2)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ── Hero Welcome Banner ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-8 lg:p-10"
        style={{
          background: 'linear-gradient(135deg, rgba(19,19,43,0.9) 0%, rgba(30,15,60,0.9) 100%)',
          border: '1px solid rgba(109,40,217,0.3)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase"
                style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#06B6D4' }}>
                Pioneer Status
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B' }}>
                <Flame className="w-3 h-3" /> {userStats.streakDays} day streak
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}>
                Level {userStats.level}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: '#F1F5F9' }}>
                Welcome back,{' '}
                <span style={{ background: 'linear-gradient(to right, #A78BFA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {firstName}
                </span>
              </h1>
              <p className="mt-2 max-w-md text-sm font-medium" style={{ color: 'rgba(148,163,184,0.8)' }}>
                Your learning velocity is in the top 10% globally. Keep pushing the boundaries of quantum knowledge.
              </p>
            </div>

            {/* XP Progress */}
            <div className="max-w-sm space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold" style={{ color: '#94A3B8' }}>Level {userStats.level} Progress</span>
                <span className="text-xs font-black" style={{ color: '#A78BFA' }}>{userStats.xp.toLocaleString()} / 5,000 XP</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(30,30,63,0.8)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((userStats.xp / 5000) * 100, 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(to right, #6D28D9, #A78BFA, #06B6D4)' }}
                />
              </div>
            </div>
          </div>

          <Link
            href="/curriculum"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all hover:scale-[1.03] active:scale-95 flex-shrink-0 self-start lg:self-auto"
            style={{
              background: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
              boxShadow: '0 0 30px rgba(109,40,217,0.5)',
            }}
          >
            Continue Learning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* ── Quantum News Ticker ────────────────────────────── */}
      <DashCard className="p-0 overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
        <div className="flex items-center">
          <div
            className="flex items-center gap-2 px-5 py-3.5 flex-shrink-0 text-xs font-black uppercase tracking-widest"
            style={{ background: 'rgba(6,182,212,0.12)', borderRight: '1px solid rgba(6,182,212,0.2)', color: '#06B6D4' }}
          >
            <Newspaper className="w-4 h-4" />
            <span className="hidden sm:inline">Quantum</span> News
          </div>
          <div className="flex-1 overflow-hidden py-3.5 px-4">
            <div className="animate-ticker flex gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...NEWS_HEADLINES, ...NEWS_HEADLINES].map((h, i) => (
                <span key={i} className="text-xs font-medium" style={{ color: '#94A3B8' }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DashCard>

      {/* ── Stats Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="p-5 rounded-2xl dash-stat-card"
            style={{ border: `1px solid ${stat.border}` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl" style={{ background: stat.bg }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="w-4 h-4 opacity-30" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-black" style={{ color: '#F1F5F9' }}>
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs font-bold mt-1" style={{ color: 'rgba(148,163,184,0.5)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Quick Access + Activity ───────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Access 6 cards */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-black" style={{ color: '#F1F5F9' }}>Command Center</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_ACCESS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={item.href} className="block h-full">
                  <div
                    className="p-5 rounded-2xl h-full space-y-3 transition-all duration-300 cursor-pointer group"
                    style={{
                      background: 'rgba(19,19,43,0.85)',
                      border: '1px solid #1E1E3F',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(109,40,217,0.4)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${item.glow}`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ background: item.gradient }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: '#F1F5F9' }}>{item.title}</h3>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(148,163,184,0.6)' }}>{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold" style={{ color: '#A78BFA' }}>
                      Open <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-black" style={{ color: '#F1F5F9' }}>Recent Activity</h2>
          <DashCard className="p-5 space-y-3">
            {RECENT_TOPICS.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="p-3 rounded-xl space-y-2 transition-colors cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(30,30,63,0.5)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(109,40,217,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: '#F1F5F9' }}>{topic.title}</p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(148,163,184,0.4)' }}>{topic.level}</p>
                  </div>
                  {topic.progress === 100 ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  ) : topic.progress > 0 ? (
                    <span className="text-[10px] font-black flex-shrink-0" style={{ color: '#06B6D4' }}>{topic.progress}%</span>
                  ) : (
                    <span className="text-[10px] font-bold flex-shrink-0" style={{ color: 'rgba(148,163,184,0.3)' }}>New</span>
                  )}
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(30,30,63,0.8)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${topic.progress}%`,
                      background: topic.progress === 100
                        ? '#10B981'
                        : 'linear-gradient(to right, #6D28D9, #06B6D4)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
            <Link
              href="/curriculum"
              className="flex items-center justify-center gap-1 text-xs font-bold pt-2 transition-colors hover:opacity-80"
              style={{ color: '#A78BFA' }}
            >
              View all topics <ChevronRight className="w-3 h-3" />
            </Link>
          </DashCard>
        </div>
      </div>

      {/* ── Daily Challenge Card ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashCard className="p-6" style={{ border: '1px solid rgba(167,139,250,0.2)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #A78BFA)' }}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm" style={{ color: '#F1F5F9' }}>Daily Challenge</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(167,139,250,0.6)' }}>Resets in</p>
              </div>
            </div>
            <CountdownTimer />
          </div>
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.15)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: '#F1F5F9' }}>
              Implement Deutsch-Jozsa Algorithm
            </p>
            <p className="text-xs" style={{ color: 'rgba(148,163,184,0.7)' }}>
              Determine if a function is constant or balanced using a quantum circuit. +75 XP
            </p>
          </div>
          <Link
            href="/challenges"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6D28D9, #7C3AED)' }}
          >
            <Zap className="w-4 h-4" /> Attempt Challenge
          </Link>
        </DashCard>

        {/* Explore More */}
        <div className="space-y-3">
          {[
            { href: '/glossary', icon: BookOpen, label: 'Quantum Glossary', desc: '80+ terms with definitions', color: '#06B6D4', border: 'rgba(6,182,212,0.2)' },
            { href: '/research', icon: Star, label: 'Research Lab', desc: 'Latest papers & breakthroughs', color: '#10B981', border: 'rgba(16,185,129,0.2)' },
            { href: '/career', icon: Award, label: 'Career Hub', desc: 'Jobs, certifications & interview prep', color: '#A78BFA', border: 'rgba(167,139,250,0.2)' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <DashCard
                className="p-4 flex items-center gap-4 transition-all cursor-pointer"
                style={{ border: `1px solid ${item.border}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: item.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: '#F1F5F9' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(167,139,250,0.5)' }} />
              </DashCard>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
