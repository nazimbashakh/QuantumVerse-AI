'use client';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Globe, TrendingUp, UserPlus, Plus, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

const LEADERBOARD = [
  { rank: 1, name: 'Arjun Mehta', country: '🇮🇳', xp: 12500, level: 12, badge: '👑' },
  { rank: 2, name: 'Sarah Chen', country: '🇺🇸', xp: 11200, level: 11, badge: '💎' },
  { rank: 3, name: 'Yuki Tanaka', country: '🇯🇵', xp: 10800, level: 11, badge: '🥇' },
  { rank: 4, name: 'Hans Mueller', country: '🇩🇪', xp: 9600, level: 10, badge: '🥈' },
  { rank: 5, name: 'Priya Sharma', country: '🇮🇳', xp: 9100, level: 10, badge: '🥉' },
  { rank: 6, name: 'James Wilson', country: '🇬🇧', xp: 8700, level: 9, badge: '' },
  { rank: 7, name: 'Li Wei', country: '🇨🇳', xp: 8200, level: 9, badge: '' },
  { rank: 8, name: 'Maria Garcia', country: '🇪🇸', xp: 7800, level: 8, badge: '' },
  { rank: 9, name: 'Ahmed Hassan', country: '🇪🇬', xp: 7500, level: 8, badge: '' },
  { rank: 10, name: 'Kim Soo-jin', country: '🇰🇷', xp: 7200, level: 7, badge: '' },
];

const FORUM_POSTS = [
  { title: 'How does the Quantum Fourier Transform actually work intuitively?', author: 'Sarah Chen', replies: 24, likes: 67, tag: 'Algorithms', time: '2h ago', tagColor: '#06B6D4' },
  { title: 'My journey from classical ML to Quantum ML — tips for beginners', author: 'Arjun Mehta', replies: 31, likes: 124, tag: 'QML', time: '5h ago', tagColor: '#A78BFA' },
  { title: 'Debugging tip: Common Qiskit transpiler errors and how to fix them', author: 'Hans Mueller', replies: 18, likes: 89, tag: 'Qiskit', time: '1d ago', tagColor: '#10B981' },
  { title: 'Surface codes explained with actual pictures', author: 'Yuki Tanaka', replies: 42, likes: 156, tag: 'Error Correction', time: '2d ago', tagColor: '#F59E0B' },
  { title: 'Has anyone tried running VQE on real IBM hardware? Results thread.', author: 'James Wilson', replies: 15, likes: 45, tag: 'Hardware', time: '3d ago', tagColor: '#EF4444' },
];

const MENTORS = [
  { name: 'Dr. Priya Natarajan', title: 'Quantum Research Lead', org: 'IISc Bangalore', specialty: 'Quantum Algorithms', available: true },
  { name: 'Prof. David Miller', title: 'Associate Professor', org: 'MIT', specialty: 'Quantum Error Correction', available: false },
  { name: 'Dr. Lin Zhao', title: 'Sr. Quantum Engineer', org: 'IBM Quantum', specialty: 'Qiskit Development', available: true },
];

const RANK_COLORS = ['#F59E0B', '#94A3B8', '#B45309', 'rgba(148,163,184,0.3)'];

export default function CommunityPage() {
  const [tab, setTab] = useState<'leaderboard' | 'forum' | 'mentors'>('leaderboard');

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Community"
        subtitle="Global leaderboard, discussion forum, and expert mentorship program"
        breadcrumbs={[{ label: 'Community' }]}
        icon={<Users className="w-6 h-6" style={{ color: '#A78BFA' }} />}
      />

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl mb-6 w-fit" style={{ background: 'rgba(18,18,42,0.8)', border: '1px solid #1E1E3F' }}>
        {[
          { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
          { id: 'forum', label: 'Forum', icon: MessageSquare },
          { id: 'mentors', label: 'Mentors', icon: UserPlus },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={tab === t.id ? {
              background: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
              color: '#fff', boxShadow: '0 0 20px rgba(109,40,217,0.4)',
            } : { color: 'rgba(148,163,184,0.5)' }}
          >
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {tab === 'leaderboard' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
          <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid #1E1E3F' }}>
            <Globe className="w-5 h-5" style={{ color: '#06B6D4' }} />
            <h3 className="font-black" style={{ color: '#F1F5F9' }}>Global Leaderboard</h3>
          </div>
          <div>
            {LEADERBOARD.map((user, i) => (
              <div key={user.rank}
                className="flex items-center gap-4 px-6 py-4 transition-colors"
                style={{
                  borderBottom: i < LEADERBOARD.length - 1 ? '1px solid rgba(30,30,63,0.6)' : 'none',
                  background: i < 3 ? 'rgba(109,40,217,0.04)' : 'transparent',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(109,40,217,0.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i < 3 ? 'rgba(109,40,217,0.04)' : 'transparent'}
              >
                <span className="w-8 text-center text-lg font-black" style={{ color: RANK_COLORS[Math.min(i, 3)] }}>
                  {user.rank}
                </span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(6,182,212,0.3))', border: '1px solid rgba(30,30,63,0.8)' }}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm flex items-center gap-2" style={{ color: '#F1F5F9' }}>
                    {user.name} {user.badge && <span>{user.badge}</span>}
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>{user.country} · Level {user.level}</p>
                </div>
                <span className="font-black text-sm" style={{ color: '#06B6D4' }}>{user.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forum */}
      {tab === 'forum' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6D28D9, #7C3AED)' }}>
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
          {FORUM_POSTS.map((post, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl transition-all cursor-pointer"
              style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1E1E3F'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                    style={{ background: `${post.tagColor}18`, border: `1px solid ${post.tagColor}35`, color: post.tagColor }}>
                    {post.tag}
                  </span>
                  <h3 className="text-sm font-bold leading-snug" style={{ color: '#F1F5F9' }}>{post.title}</h3>
                  <p className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>by {post.author} · {post.time}</p>
                </div>
                <div className="flex flex-col gap-2 text-xs font-bold text-right flex-shrink-0" style={{ color: 'rgba(148,163,184,0.4)' }}>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{post.replies}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{post.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mentors */}
      {tab === 'mentors' && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MENTORS.map((mentor, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl text-center space-y-4"
              style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(6,182,212,0.3))', border: '1px solid rgba(30,30,63,0.8)' }}>
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: '#F1F5F9' }}>{mentor.name}</h3>
                <p className="text-sm" style={{ color: 'rgba(148,163,184,0.5)' }}>{mentor.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.3)' }}>{mentor.org}</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06B6D4' }}>
                {mentor.specialty}
              </span>
              <button disabled={!mentor.available}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all"
                style={mentor.available ? {
                  background: 'linear-gradient(135deg, #6D28D9, #7C3AED)', color: '#fff',
                } : { background: 'rgba(30,30,63,0.5)', color: 'rgba(148,163,184,0.3)', cursor: 'not-allowed' }}>
                {mentor.available ? 'Request Session' : 'Currently Unavailable'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
