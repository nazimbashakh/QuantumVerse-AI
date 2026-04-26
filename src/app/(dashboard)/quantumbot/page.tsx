'use client';

import PageHeader from '@/components/ui/PageHeader';
import QuantumBot from '@/components/bot/QuantumBot';
import { Bot } from 'lucide-react';

export default function QuantumBotPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="shrink-0 mb-6">
        <PageHeader
          title="QuantumBot AI"
          subtitle="Your personal 24/7 AI tutor for quantum computing and physics"
          breadcrumbs={[{ label: 'QuantumBot' }]}
          icon={<Bot className="w-6 h-6" style={{ color: '#06B6D4' }} />}
        />
      </div>
      
      <div className="flex-1 min-h-0">
        <QuantumBot />
      </div>
    </div>
  );
}
