import Link from 'next/link';
import { Cpu } from 'lucide-react';

export default function PublicTopBar() {
  return (
    <header className="h-24 border-b border-white/5 bg-background/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-purple to-quantum-cyan quantum-glow shadow-glow-purple flex items-center justify-center group-hover:scale-105 transition-all duration-300">
          <span className="text-sm text-white font-extrabold tracking-widest">QV</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase">
            QUANTUMVERSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">AI</span>
          </h1>
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-quantum-text-body uppercase mt-0.5 opacity-80">
            Enter. Explore. Experiment. Evolve.
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Link 
          href="/auth/signin" 
          className="hidden sm:block px-6 py-2.5 rounded-xl border border-white/10 text-quantum-heading text-sm font-bold hover:border-quantum-purple hover:shadow-glow-purple hover:bg-quantum-purple/10 transition-all duration-300"
        >
          Login
        </Link>
        <Link 
          href="/auth/signup" 
          className="btn-quantum px-8 py-2.5 text-sm font-bold shadow-glow-purple"
        >
          <span>Sign Up</span>
        </Link>
      </div>
    </header>
  );
}
