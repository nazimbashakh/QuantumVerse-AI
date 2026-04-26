'use client';
import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, FlaskConical, Cpu, Bot, Beaker, Briefcase,
  Users, LayoutList, Settings, BookMarked, Atom, Calendar,
  BarChart3, Newspaper, Trophy
} from 'lucide-react';

const navSections = [
  {
    title: 'Learn',
    items: [
      { label: 'Dashboard',        href: '/dashboard',   icon: Home },
      { label: 'Curriculum',       href: '/curriculum',  icon: BookOpen },
      { label: 'Practicals Lab',   href: '/practicals',  icon: FlaskConical },
      { label: 'Circuit Simulator', href: '/simulator',  icon: Cpu },
      { label: 'QuantumBot AI',    href: '/quantumbot',  icon: Bot },
    ],
  },
  {
    title: 'Explore',
    items: [
      { label: 'Glossary',         href: '/glossary',    icon: BookMarked },
      { label: 'Research Lab',     href: '/research',    icon: Beaker },
      { label: 'Challenge Arena',  href: '/challenges',  icon: Trophy },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'Career Hub',       href: '/career',      icon: Briefcase },
      { label: 'Community',        href: '/community',   icon: Users },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings',         href: '/settings',    icon: Settings },
    ],
  },
];

const SidebarItem = memo(function SidebarItem({ item, isActive }: { item: typeof navSections[0]['items'][0], isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
        isActive
          ? 'text-[#F1F5F9]'
          : 'text-[#94A3B8] hover:text-[#F1F5F9]'
      }`}
      style={isActive ? {
        background: 'rgba(109, 40, 217, 0.15)',
        border: '1px solid rgba(109, 40, 217, 0.3)',
      } : {
        background: 'transparent',
        border: '1px solid transparent',
      }}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
          style={{ background: 'linear-gradient(to bottom, #A78BFA, #06B6D4)' }} />
      )}
      <item.icon
        className={`w-[18px] h-[18px] transition-colors ${
          isActive ? 'text-[#A78BFA]' : 'text-[#94A3B8] group-hover:text-[#A78BFA]'
        }`}
      />
      <span>{item.label}</span>
    </Link>
  );
});

const Sidebar = memo(function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 flex flex-col z-50 ${className}`}
      style={{
        background: '#12122A',
        borderRight: '1px solid #1E1E3F',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="p-6 flex-shrink-0" style={{ borderBottom: '1px solid #1E1E3F' }}>
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6D28D9, #06B6D4)' }}
          >
            <Atom className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[#F1F5F9] font-black text-sm tracking-wide block leading-none">QUANTUM</span>
            <span className="text-xs font-black tracking-widest"
              style={{ background: 'linear-gradient(to right, #A78BFA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >VERSE AI</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 dash-scroll">
        {navSections.map((section) => (
          <div key={section.title}>
            <span
              className="px-4 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block"
              style={{ color: 'rgba(148, 163, 184, 0.4)' }}
            >
              {section.title}
            </span>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return <SidebarItem key={item.href} item={item} isActive={isActive} />;
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer status */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid #1E1E3F' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-bold" style={{ color: '#10B981' }}>All Systems Online</span>
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;
