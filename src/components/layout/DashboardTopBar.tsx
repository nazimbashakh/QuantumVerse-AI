'use client';

import { Bell, Menu, Search, LogOut, User, ChevronRight } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardTopBar() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'Quantum User';
  const userEmail = session?.user?.email ?? '';

  return (
    <header
      className="h-16 px-6 flex items-center justify-between sticky top-0 z-40 flex-shrink-0"
      style={{
        background: 'rgba(18, 18, 42, 0.85)',
        borderBottom: '1px solid #1E1E3F',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-xl transition-colors" style={{ color: '#94A3B8' }}>
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex relative items-center">
          <Search className="w-4 h-4 absolute left-3 pointer-events-none" style={{ color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search quantum concepts..."
            className="dash-input pl-10 pr-4 py-2 text-sm w-64"
          />
        </div>
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-xl transition-all hover:bg-white/5" style={{ color: '#94A3B8' }}>
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-8" style={{ background: '#1E1E3F' }} />

        {/* User profile */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #6D28D9, #06B6D4)',
              boxShadow: '0 0 15px rgba(109, 40, 217, 0.4)',
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none mb-0.5" style={{ color: '#F1F5F9' }}>
              {userName.split(' ')[0]}
            </p>
            <p className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>
              {userEmail || 'Quantum Researcher'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="ml-1 p-2 rounded-xl transition-all hover:bg-white/5"
            style={{ color: '#94A3B8' }}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
