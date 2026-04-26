'use client';
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 pb-32">
      
      {/* Background Animated Quantum Wave Interference (Pure CSS/SVG) */}
      <div className="absolute inset-0 z-0 opacity-50 flex items-center justify-center overflow-hidden pointer-events-none">
        <svg className="absolute w-[150%] h-[150%] opacity-40 mix-blend-screen" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Multiple sine waves creating interference patterns */}
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={`wave-${i}`}
              stroke={`url(#quantumGrad${i % 2})`}
              strokeWidth={i === 0 ? 3 : 1}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.6 + (i * 0.1),
                d: [
                  `M 0 ${400 + i * 40} Q ${300 - i * 50} ${200 + i * 100} 600 ${400 + i * 10} T 1200 ${400 - i * 30}`,
                  `M 0 ${400 + i * 40} Q ${300 + i * 20} ${600 - i * 80} 600 ${400 - i * 20} T 1200 ${400 + i * 50}`,
                  `M 0 ${400 + i * 40} Q ${300 - i * 50} ${200 + i * 100} 600 ${400 + i * 10} T 1200 ${400 - i * 30}`
                ]
              }}
              transition={{ 
                pathLength: { duration: 3, delay: i * 0.2 },
                opacity: { duration: 3, delay: i * 0.2 },
                d: { duration: 15 + i * 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="filter drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            />
          ))}
          {/* Circuit Geometry Nodes */}
          {[...Array(8)].map((_, i) => (
             <motion.circle
               key={`node-${i}`}
               cx={150 + i * 130}
               cy={300 + (i % 3) * 100}
               r="3"
               fill="#06B6D4"
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: [0, 1, 0.2, 1], scale: [0, 1.5, 1] }}
               transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
               className="filter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
             />
          ))}
          <defs>
            <linearGradient id="quantumGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="quantumGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="50%" stopColor="#D946EF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto mt-12 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="inline-block mb-10"
        >
          <div className="relative glass-panel px-6 py-2 rounded-full overflow-hidden group border-quantum-purple/30">
            <div className="absolute inset-0 bg-gradient-to-r from-quantum-purple/10 to-quantum-cyan/10 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-quantum-cyan to-quantum-purple font-bold tracking-[0.2em] uppercase">
              The Architecture of Tomorrow
            </span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Master The<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-quantum-text-heading to-quantum-text-body/50">
            Quantum World.
          </span>
        </motion.h1>

        {/* The large bold gradient tagline */}
        <motion.div 
          className="my-10 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">Enter. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-cyan to-quantum-accent">Explore. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent to-quantum-purple">Experiment. </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-quantum-cyan via-quantum-purple to-white">Evolve.</span>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-quantum-text-body font-medium max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Build. Simulate. Explore the future of quantum intelligence.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link href="/curriculum" className="btn-quantum w-full sm:w-auto text-lg px-10 py-5">
            <span>Initialize Environment <ChevronRight className="w-5 h-5"/></span>
          </Link>
          <button className="glass-panel-interactive flex items-center gap-4 px-10 py-5 rounded-xl text-lg font-bold w-full sm:w-auto text-white group">
            <div className="w-8 h-8 rounded-full bg-quantum-cyan/20 flex items-center justify-center group-hover:bg-quantum-cyan group-hover:shadow-[0_0_15px_#06B6D4] transition-all duration-300">
              <Zap className="w-4 h-4 text-quantum-cyan group-hover:text-black transition-colors" />
            </div>
            Analyze Architecture
          </button>
        </motion.div>
      </div>
    </section>
  );
}
