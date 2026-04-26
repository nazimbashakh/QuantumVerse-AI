'use client';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Download, LogOut, Moon, Sun, Monitor, Globe, Lock, Zap } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className="w-12 h-6 rounded-full relative transition-all flex-shrink-0"
      style={{ background: on ? '#6D28D9' : 'rgba(30,30,63,0.8)', border: `1px solid ${on ? '#7C3AED' : '#1E1E3F'}` }}
    >
      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"
        style={{ left: on ? '26px' : '2px', boxShadow: on ? '0 0 8px rgba(109,40,217,0.6)' : 'none' }} />
    </button>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl space-y-5" style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F' }}>
      <h2 className="font-black flex items-center gap-2" style={{ color: '#F1F5F9' }}>
        {icon}{title}
      </h2>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [notifs, setNotifs] = useState({ email: true, push: true, weekly: false, streak: true });
  const [appearance, setAppearance] = useState<'dark' | 'light' | 'system'>('dark');

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Manage your account, preferences, and notification settings"
        breadcrumbs={[{ label: 'Settings' }]}
        icon={<SettingsIcon className="w-6 h-6" style={{ color: '#94A3B8' }} />}
      />

      <div className="space-y-5">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <SectionCard title="Profile" icon={<User className="w-5 h-5" style={{ color: '#06B6D4' }} />}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6D28D9, #06B6D4)', boxShadow: '0 0 20px rgba(109,40,217,0.4)' }}>
                {(session?.user?.name ?? 'Q').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold" style={{ color: '#F1F5F9' }}>{session?.user?.name ?? 'Quantum User'}</p>
                <p className="text-sm" style={{ color: 'rgba(148,163,184,0.5)' }}>{session?.user?.email ?? 'user@quantumverse.ai'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                  Free Plan
                </span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: 'Full Name', type: 'text', defaultValue: session?.user?.name ?? 'Quantum Learner' },
                { label: 'Email Address', type: 'email', defaultValue: session?.user?.email ?? 'user@quantumverse.ai' },
                { label: 'Country', type: 'text', defaultValue: 'India' },
                { label: 'Username', type: 'text', defaultValue: 'quantum_explorer' },
              ].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.4)' }}>{f.label}</label>
                  <input type={f.type} defaultValue={f.defaultValue}
                    className="w-full px-4 py-2.5 text-sm dash-input" />
                </div>
              ))}
            </div>
            <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6D28D9, #7C3AED)' }}>
              Save Profile
            </button>
          </SectionCard>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <SectionCard title="Appearance" icon={<Moon className="w-5 h-5" style={{ color: '#A78BFA' }} />}>
            <div className="flex gap-3">
              {([
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'system', icon: Monitor, label: 'System' },
              ] as const).map(m => (
                <button key={m.id} onClick={() => setAppearance(m.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={appearance === m.id ? {
                    background: 'linear-gradient(135deg, #6D28D9, #7C3AED)',
                    color: '#fff', boxShadow: '0 0 20px rgba(109,40,217,0.4)',
                  } : {
                    background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F', color: 'rgba(148,163,184,0.4)',
                  }}>
                  <m.icon className="w-4 h-4" />{m.label}
                </button>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <SectionCard title="Notifications" icon={<Bell className="w-5 h-5" style={{ color: '#F59E0B' }} />}>
            {[
              { key: 'email', label: 'Email notifications', desc: 'Receive course updates and announcements' },
              { key: 'push', label: 'Push notifications', desc: 'Browser push for challenges and replies' },
              { key: 'weekly', label: 'Weekly digest', desc: 'Weekly progress summary email every Monday' },
              { key: 'streak', label: 'Streak reminders', desc: 'Daily reminder to maintain your learning streak' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(30,30,63,0.6)' }}>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#F1F5F9' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>{item.desc}</p>
                </div>
                <Toggle
                  on={notifs[item.key as keyof typeof notifs]}
                  onToggle={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof notifs] }))}
                />
              </div>
            ))}
          </SectionCard>
        </motion.div>

        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <div className="p-6 rounded-2xl space-y-4" style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid rgba(109,40,217,0.3)' }}>
            <h2 className="font-black flex items-center gap-2" style={{ color: '#F1F5F9' }}>
              <Zap className="w-5 h-5" style={{ color: '#A78BFA' }} />Subscription
            </h2>
            <div className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)' }}>
              <div>
                <p className="font-bold" style={{ color: '#F1F5F9' }}>Free Plan</p>
                <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>Access to all 15 levels — QuantumVerse AI is free forever</p>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                Active
              </span>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectionCard title="Danger Zone" icon={<Shield className="w-5 h-5" style={{ color: '#EF4444' }} />}>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'rgba(19,19,43,0.85)', border: '1px solid #1E1E3F', color: 'rgba(148,163,184,0.5)' }}>
                <Download className="w-4 h-4" />Export Data
              </button>
              <button onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                <LogOut className="w-4 h-4" />Sign Out
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                <Shield className="w-4 h-4" />Delete Account
              </button>
            </div>
          </SectionCard>
        </motion.div>
      </div>
    </div>
  );
}
