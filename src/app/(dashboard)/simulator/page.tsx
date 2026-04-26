'use client';

import dynamic from 'next/dynamic';
import SimulatorSkeleton from '@/components/simulator/SimulatorSkeleton';
import PageHeader from '@/components/ui/PageHeader';
import { Cpu } from 'lucide-react';

const CircuitSimulator = dynamic(() => import('@/components/simulator/CircuitSimulator'), {
  loading: () => <SimulatorSkeleton />,
  ssr: false,
});

export default function SimulatorPage() {
  return (
    <div>
      <PageHeader
        title="Circuit Simulator"
        subtitle="Drag-and-drop quantum gate composer with real-time simulation"
        breadcrumbs={[{ label: 'Circuit Simulator' }]}
        icon={<Cpu className="w-6 h-6" style={{ color: '#06B6D4' }} />}
      />
      <CircuitSimulator />
    </div>
  );
}
