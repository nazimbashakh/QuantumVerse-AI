import HeroSection from '@/components/home/HeroSection';
import FeaturePillars from '@/components/home/FeaturePillars';
import SimulatorTeaser from '@/components/home/SimulatorTeaser';
import QuantumBotPreview from '@/components/home/QuantumBotPreview';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-x-hidden">
      <HeroSection />
      
      {/* Animated gradient divider */}
      <div className="relative h-px w-full max-w-4xl mx-auto my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-purple/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-cyan/30 to-transparent animate-pulse-slow" />
      </div>

      <FeaturePillars />

      <div className="relative h-px w-full max-w-3xl mx-auto my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-cyan/30 to-transparent" />
      </div>

      <SimulatorTeaser />

      <div className="relative h-px w-full max-w-3xl mx-auto my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quantum-purple/30 to-transparent" />
      </div>

      <QuantumBotPreview />
      
      {/* Final CTA Section */}
      <section className="py-32 px-4 text-center">
        <div className="max-w-3xl mx-auto glass-panel border border-quantum-purple/20 p-12 md:p-16 relative overflow-hidden group hover:border-quantum-purple/40 transition-all duration-500">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-quantum-purple/5 to-quantum-cyan/5 group-hover:from-quantum-purple/10 group-hover:to-quantum-cyan/10 transition-all duration-500" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-quantum-purple to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-black relative z-10 text-white tracking-tight mb-6">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">
              Evolve?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-quantum-text-body relative z-10 max-w-xl mx-auto leading-relaxed">
            Join the global community of quantum pioneers. The universe is waiting to be programmed.
          </p>
          <div className="mt-10 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-quantum text-lg px-12 py-5 shadow-glow-purple">
              <span>Enter the Quantum World</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-quantum-purple to-quantum-cyan flex items-center justify-center">
              <span className="text-[10px] font-black text-white tracking-wider">QV</span>
            </div>
            <span className="font-black tracking-widest text-white text-sm uppercase">
              QUANTUMVERSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">AI</span>
            </span>
          </div>
          <p className="text-quantum-text-body/40 text-sm font-mono">
            &copy; {new Date().getFullYear()} QUANTUMVERSE AI. The future is quantum.
          </p>
        </div>
      </footer>
    </div>
  );
}
