'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, Compass, Cpu, Rocket } from 'lucide-react';

const pillars = [
  {
    word: 'Enter',
    desc: 'Anyone can start. Master the math and physics through structured visualization without the academic barrier.',
    icon: BookOpen,
    gradient: 'from-quantum-purple to-quantum-cyan',
    glowColor: 'group-hover:shadow-glow-purple',
    borderColor: 'group-hover:border-quantum-purple/60',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    word: 'Explore',
    desc: 'Dive into interactive Bloch spheres and visualized quantum state vectors that react dynamically as you learn.',
    icon: Compass,
    gradient: 'from-quantum-cyan to-quantum-green',
    glowColor: 'group-hover:shadow-glow-cyan',
    borderColor: 'group-hover:border-quantum-cyan/60',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    word: 'Experiment',
    desc: 'Drag-and-drop live quantum circuits. Run algorithms, test gates, and observe probability distributions instantly.',
    icon: Cpu,
    gradient: 'from-quantum-accent to-quantum-purple',
    glowColor: 'group-hover:shadow-glow-accent',
    borderColor: 'group-hover:border-quantum-accent/60',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    word: 'Evolve',
    desc: 'Publish research, verify certificates, pass interview prep, and start your Quantum Engineering career.',
    icon: Rocket,
    gradient: 'from-quantum-violet to-quantum-cyan',
    glowColor: 'group-hover:shadow-glow-purple',
    borderColor: 'group-hover:border-quantum-violet/60',
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function FeaturePillars() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Four Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">Mastery</span>
        </h2>
        <p className="text-quantum-text-body text-lg max-w-2xl mx-auto">
          A structured pathway from absolute beginner to quantum engineer.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(220px,auto)]">
        {pillars.map((pillar, idx) => (
          <BentoCard key={idx} pillar={pillar} index={idx} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function BentoCard({ pillar, index, isInView }: { pillar: typeof pillars[0]; index: number; isInView: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 1, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      className={`${pillar.span} group relative glass-panel p-8 md:p-10 flex flex-col justify-between overflow-hidden cursor-default transition-all duration-500 ${pillar.borderColor} ${pillar.glowColor}`}
    >
      {/* Spotlight effect following mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Large gradient word */}
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${pillar.gradient} tracking-tighter leading-none`}>
          {pillar.word}
        </h3>
        
        <p className="text-quantum-text-body text-sm md:text-base leading-relaxed mt-auto max-w-md">
          {pillar.desc}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div className={`p-3 rounded-xl bg-white/5 border border-white/10 text-quantum-text-body group-hover:text-white transition-colors duration-300`}>
            <pillar.icon className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-quantum-text-body/60 group-hover:text-white/80 transition-colors">
            Phase {index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
