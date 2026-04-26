'use client';
import { motion } from 'framer-motion';
import { Cpu, Rotate3D, Activity, Network, Circle } from 'lucide-react';

interface VisualizerProps {
  type?: string;
}

export default function Visualizer({ type }: VisualizerProps) {
  const visualType = (type || '').toLowerCase();

  // Determine the primary icon and color scheme based on the type
  let icon = <Activity className="w-8 h-8 text-quantum-cyan" />;
  let gradient = 'from-quantum-purple/10 to-quantum-cyan/10';
  let label = 'Interactive Mode';
  let glowColor = 'shadow-glow-cyan';

  if (visualType.includes('circuit') || visualType.includes('gate') || visualType.includes('algorithm') || visualType.includes('grover') || visualType.includes('shor') || visualType.includes('qft') || visualType.includes('vqe')) {
    icon = <Cpu className="w-8 h-8 text-[#A78BFA]" />;
    gradient = 'from-[#6D28D9]/20 to-[#A78BFA]/10';
    label = 'Circuit Topology';
    glowColor = 'shadow-glow-purple';
  } else if (visualType.includes('bloch') || visualType.includes('sphere') || visualType.includes('state') || visualType.includes('superposition') || visualType.includes('measurement') || visualType.includes('observable') || visualType.includes('spin')) {
    icon = <Rotate3D className="w-8 h-8 text-[#06B6D4]" />;
    gradient = 'from-[#06B6D4]/20 to-[#3B82F6]/10';
    label = 'Quantum State Evolution';
    glowColor = 'shadow-glow-cyan';
  } else if (visualType.includes('interference') || visualType.includes('wave') || visualType.includes('phase') || visualType.includes('amplitude') || visualType.includes('fourier') || visualType.includes('dynamics')) {
    icon = <Activity className="w-8 h-8 text-[#10B981]" />;
    gradient = 'from-[#10B981]/20 to-[#059669]/10';
    label = 'Wave Interference';
    glowColor = 'shadow-glow-green';
  } else if (visualType.includes('entanglement') || visualType.includes('network') || visualType.includes('teleportation') || visualType.includes('qkd') || visualType.includes('cryptography') || visualType.includes('bell') || visualType.includes('error') || visualType.includes('correction') || visualType.includes('hardware')) {
    icon = <Network className="w-8 h-8 text-[#F59E0B]" />;
    gradient = 'from-[#F59E0B]/20 to-[#B45309]/10';
    label = 'Entanglement & Topology';
    glowColor = 'shadow-glow-amber';
  } else {
    icon = <Circle className="w-8 h-8 text-quantum-cyan" />;
    label = 'Interactive Framework';
  }

  return (
    <div className={`w-full h-64 bg-gradient-to-tr ${gradient} border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden group hover:border-white/20 transition-colors`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      {/* Dynamic Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {(visualType.includes('circuit') || visualType.includes('gate') || visualType.includes('algorithm') || visualType.includes('grover') || visualType.includes('shor') || visualType.includes('qft') || visualType.includes('vqe') || (!visualType.includes('bloch') && !visualType.includes('interference') && !visualType.includes('entanglement') && !visualType.includes('sphere') && !visualType.includes('wave') && !visualType.includes('network') && !visualType.includes('state') && !visualType.includes('superposition') && !visualType.includes('measurement') && !visualType.includes('observable') && !visualType.includes('spin') && !visualType.includes('phase') && !visualType.includes('amplitude') && !visualType.includes('fourier') && !visualType.includes('dynamics') && !visualType.includes('teleportation') && !visualType.includes('qkd') && !visualType.includes('cryptography') && !visualType.includes('bell') && !visualType.includes('error') && !visualType.includes('correction') && !visualType.includes('hardware'))) && (
          <div className="flex gap-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="w-32 h-32 border-2 border-dashed border-[#A78BFA] rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="w-24 h-24 border-2 border-dashed border-[#6D28D9] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
        {(visualType.includes('bloch') || visualType.includes('sphere') || visualType.includes('state') || visualType.includes('superposition') || visualType.includes('measurement') || visualType.includes('observable') || visualType.includes('spin')) && (
          <motion.div 
            animate={{ rotateX: 360, rotateY: 360 }} 
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-40 h-40 border border-[#06B6D4] rounded-full relative"
          >
            <div className="absolute inset-0 border border-[#3B82F6] rounded-full rotate-45" />
            <div className="absolute inset-0 border border-white/20 rounded-full rotate-90" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#06B6D4] rounded-full shadow-[0_0_10px_#06B6D4]" style={{ transform: 'translate3d(30px, -30px, 20px)' }} />
          </motion.div>
        )}
        {(visualType.includes('interference') || visualType.includes('wave') || visualType.includes('phase') || visualType.includes('amplitude') || visualType.includes('fourier') || visualType.includes('dynamics')) && (
          <div className="flex gap-2 items-center">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['20px', '80px', '20px'] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                className="w-2 bg-[#10B981] rounded-full opacity-50"
              />
            ))}
          </div>
        )}
        {(visualType.includes('entanglement') || visualType.includes('network') || visualType.includes('teleportation') || visualType.includes('qkd') || visualType.includes('cryptography') || visualType.includes('bell') || visualType.includes('error') || visualType.includes('correction') || visualType.includes('hardware')) && (
          <div className="relative w-40 h-40">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-0 left-1/2 w-4 h-4 bg-[#F59E0B] rounded-full shadow-[0_0_10px_#F59E0B]" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute bottom-0 left-0 w-4 h-4 bg-[#F59E0B] rounded-full shadow-[0_0_10px_#F59E0B]" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute bottom-0 right-0 w-4 h-4 bg-[#F59E0B] rounded-full shadow-[0_0_10px_#F59E0B]" />
            <svg className="absolute inset-0 w-full h-full stroke-[#F59E0B]/30 stroke-2">
              <line x1="50%" y1="0" x2="0" y2="100%" />
              <line x1="50%" y1="0" x2="100%" y2="100%" />
              <line x1="0" y1="100%" x2="100%" y2="100%" />
            </svg>
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-md ${glowColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <span className="text-white font-black uppercase tracking-widest text-sm drop-shadow-md">
          {label}
        </span>
      </div>
    </div>
  );
}
