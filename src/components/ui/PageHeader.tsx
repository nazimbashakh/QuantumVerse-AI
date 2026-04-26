'use client';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumbs, action, icon }: PageHeaderProps) {
  const defaultCrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    ...(breadcrumbs ?? [{ label: title }]),
  ];

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 mb-4 flex-wrap">
        {defaultCrumbs.map((crumb, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(148,163,184,0.3)' }} />
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-xs font-medium transition-colors hover:text-[#A78BFA] flex items-center gap-1"
                style={{ color: 'rgba(148,163,184,0.6)' }}
              >
                {i === 0 && <Home className="w-3 h-3" />}
                {crumb.label}
              </Link>
            ) : (
              <span className="text-xs font-semibold" style={{ color: '#A78BFA' }}>
                {crumb.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {icon && (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(109,40,217,0.2), rgba(6,182,212,0.2))',
                border: '1px solid rgba(109,40,217,0.3)',
              }}
            >
              {icon}
            </div>
          )}
          <div>
            <h1
              className="text-3xl lg:text-4xl font-black tracking-tight leading-tight"
              style={{ color: '#F1F5F9' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm font-medium" style={{ color: '#94A3B8' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      {/* Decorative separator */}
      <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, #6D28D9, rgba(6,182,212,0.4), transparent)' }} />
    </div>
  );
}
