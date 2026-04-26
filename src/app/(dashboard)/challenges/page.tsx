'use client';
import { motion } from 'framer-motion';
import { Trophy, Zap, Clock, Users, AlertCircle, CheckCircle2, ChevronLeft, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from '@/components/ui/PageHeader';

const RunnableEditor = dynamic(() => import('@/components/curriculum/RunnableEditor'), { ssr: false });

const CHALLENGES = [
  { id: 1, title: 'Qubit Warm-up', difficulty: 'Easy', xp: 50, timeLimit: '10 min', description: 'Create a 3-qubit GHZ state and verify the measurement outcomes show perfect correlations.', starter: 'from qiskit import QuantumCircuit\n\n# Create GHZ state\nqc = QuantumCircuit(3, 3)\n# Your code here\n\nprint(qc)' },
  { id: 2, title: 'Entanglement Explorer', difficulty: 'Easy', xp: 75, timeLimit: '15 min', description: 'Generate and verify all 4 Bell states using Qiskit. Print measurement statistics for each.', starter: 'from qiskit import QuantumCircuit\n\n# Generate Bell states\n# |Φ+⟩, |Φ-⟩, |Ψ+⟩, |Ψ-⟩\n' },
  { id: 3, title: 'Gate Master', difficulty: 'Medium', xp: 100, timeLimit: '20 min', description: 'Decompose a Toffoli gate using only single-qubit and CNOT gates. Verify equivalence.', starter: 'from qiskit import QuantumCircuit\n\n# Decompose Toffoli\nqc = QuantumCircuit(3)\n# Your decomposition here\n' },
  { id: 4, title: 'Oracle Builder', difficulty: 'Medium', xp: 125, timeLimit: '25 min', description: "Build an oracle for Grover's algorithm that marks the state |101⟩ and verify it.", starter: 'from qiskit import QuantumCircuit\n\n# Build Oracle for |101⟩\nqc = QuantumCircuit(3)\n# Your oracle here\n' },
  { id: 5, title: 'QFT Implementer', difficulty: 'Hard', xp: 200, timeLimit: '35 min', description: 'Implement the Quantum Fourier Transform from scratch for 3 qubits. Verify against Qiskit built-in.', starter: 'from qiskit import QuantumCircuit\nimport numpy as np\n\n# Implement QFT\ndef qft(n):\n    qc = QuantumCircuit(n)\n    # Your QFT here\n    return qc\n' },
  { id: 6, title: "Grover's Search", difficulty: 'Hard', xp: 250, timeLimit: '40 min', description: "Implement Grover's full algorithm (oracle + diffusion) to search a 4-qubit space for |1010⟩.", starter: 'from qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\n\n# Full Grover algorithm\n# 1. Superposition\n# 2. Oracle\n# 3. Diffusion\n' },
];

const LEADERBOARD = [
  { rank: 1, name: 'QuantumNinja', score: 3450, solved: 24 },
  { rank: 2, name: 'SchrodingersCat', score: 3200, solved: 21 },
  { rank: 3, name: 'QubitMaster', score: 2950, solved: 19 },
  { rank: 4, name: 'Alice_Bob', score: 2800, solved: 18 },
  { rank: 5, name: 'EntanglementPro', score: 2600, solved: 16 },
];

const DIFF_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Easy:   { color: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)' },
  Medium: { color: '#06B6D4', bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.2)' },
  Hard:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)' },
  Expert: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)' },
};

const RANK_COLORS = ['#F59E0B', '#94A3B8', '#B45309', 'rgba(148,163,184,0.3)'];

export default function ChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState<typeof CHALLENGES[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (activeChallenge) {
    const ds = DIFF_STYLES[activeChallenge.difficulty] ?? DIFF_STYLES.Easy;
    return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-4">
        <div className="flex items-center justify-between flex-shrink-0">
          <button onClick={() => setActiveChallenge(null)}
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: 'rgba(148,163,184,0.5)' }}>
            <ChevronLeft className="w-4 h-4" /> Abandon
          </button>
          <div className="flex items-center gap-3 px-5 py-2 rounded-full"
            style={{ background: 'rgba(109,40,217,0.1)', border: '1px solid rgba(109,40,217,0.25)' }}>
            <Clock className="w-4 h-4 animate-pulse" style={{ color: '#A78BFA' }} />
            <span className="text-lg font-black tabular-nums" style={{ color: '#A78BFA' }}>{fmt(timeLeft)}</span>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(148,163,184,0.4)' }}>remaining</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[380px] flex flex-col gap-4">
            <div className="p-5 rounded-2xl space-y-3 flex-shrink-0"
              style={{ background: 'rgba(19,19,43,0.85)', border: `1px solid ${ds.border}` }}>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>
                {activeChallenge.difficulty} · {activeChallenge.timeLimit}
              </span>
              <h2 className="text-xl font-black" style={{ color: '#F1F5F9' }}>{activeChallenge.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>{activeChallenge.description}</p>
              <div className="flex items-center gap-2 text-sm font-bold p-3 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                <Trophy className="w-4 h-4" /> Reward: +{activeChallenge.xp} XP
              </div>
            </div>
            <div className="p-5 rounded-2xl space-y-3 flex-1"
              style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
              <h3 className="text-sm font-black" style={{ color: '#F1F5F9' }}>Rules</h3>
              {['Code must execute without errors', 'No classical emulation loopholes', 'Time bonus if completed under 5 minutes'].map((r, i) => (
                <p key={i} className="text-xs flex items-start gap-2" style={{ color: 'rgba(148,163,184,0.6)' }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />{r}
                </p>
              ))}
              <button onClick={() => setActiveChallenge(null)}
                className="w-full mt-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}>
                Submit Solution
              </button>
            </div>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden" style={{ border: '1px solid #1E1E3F' }}>
            <RunnableEditor initialCode={activeChallenge.starter} language="python" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Challenge Arena"
        subtitle="Daily and weekly quantum coding challenges with live leaderboards"
        breadcrumbs={[{ label: 'Challenge Arena' }]}
        icon={<Trophy className="w-6 h-6" style={{ color: '#A78BFA' }} />}
      />

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl p-7 mb-8"
        style={{ background: 'linear-gradient(135deg, rgba(19,19,43,0.9), rgba(30,15,60,0.9))', border: '1px solid rgba(109,40,217,0.3)' }}>
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Contest #42
            </div>
            <h2 className="text-2xl font-black" style={{ color: '#F1F5F9' }}>Quantum Algorithm Showdown</h2>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>Solve quantum challenges, climb the leaderboard, earn massive XP</p>
          </div>
          <div className="flex items-center gap-6 p-4 rounded-2xl flex-shrink-0"
            style={{ background: 'rgba(13,13,31,0.6)', border: '1px solid #1E1E3F' }}>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(148,163,184,0.4)' }}>Time Left</p>
              <p className="text-2xl font-black tabular-nums" style={{ color: '#06B6D4' }}>{fmt(timeLeft)}</p>
            </div>
            <div className="w-px h-10" style={{ background: '#1E1E3F' }} />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(148,163,184,0.4)' }}>Participants</p>
              <p className="text-2xl font-black flex items-center gap-2" style={{ color: '#F1F5F9' }}>
                <Users className="w-5 h-5" style={{ color: '#A78BFA' }} />1,204
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Challenges grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-black" style={{ color: '#F1F5F9' }}>Available Challenges</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CHALLENGES.map((ch, i) => {
              const ds = DIFF_STYLES[ch.difficulty] ?? DIFF_STYLES.Easy;
              return (
                <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveChallenge(ch)}
                  className="p-5 rounded-2xl cursor-pointer flex flex-col group h-full transition-all"
                  style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ds.border; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                      style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}>
                      {ch.difficulty}
                    </span>
                    <Trophy className="w-4 h-4 opacity-20" style={{ color: ds.color }} />
                  </div>
                  <h3 className="font-bold mb-2 text-sm" style={{ color: '#F1F5F9' }}>{ch.title}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: 'rgba(148,163,184,0.5)' }}>{ch.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid rgba(30,30,63,0.6)' }}>
                    <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'rgba(148,163,184,0.4)' }}>
                      <Clock className="w-3.5 h-3.5" />{ch.timeLimit}
                    </span>
                    <span className="text-xs font-black" style={{ color: '#10B981' }}>+{ch.xp} XP</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <h2 className="font-black" style={{ color: '#F1F5F9' }}>Top Hackers</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
            {LEADERBOARD.map((u, i) => (
              <div key={u.rank} className="flex items-center gap-3 px-4 py-3.5 transition-colors"
                style={{ borderBottom: i < LEADERBOARD.length - 1 ? '1px solid rgba(30,30,63,0.6)' : 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(109,40,217,0.05)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span className="w-6 text-center font-black text-sm" style={{ color: RANK_COLORS[Math.min(i, 3)] }}>#{u.rank}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(6,182,212,0.3))' }}>
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: '#F1F5F9' }}>{u.name}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(148,163,184,0.4)' }}>{u.solved} solved</p>
                </div>
                <span className="text-xs font-black" style={{ color: '#06B6D4' }}>{u.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
