'use client';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Gate definitions for the circuit
const GATES = [
  { label: 'H', qubit: 0, x: 20, color: '#7C3AED' },
  { label: 'X', qubit: 1, x: 35, color: '#D946EF' },
  { label: 'CNOT', qubit: 0, x: 50, color: '#06B6D4', target: 1 },
  { label: 'Z', qubit: 0, x: 65, color: '#10B981' },
  { label: 'H', qubit: 1, x: 80, color: '#7C3AED' },
];

// Probability result bars
const PROB_RESULTS = [
  { label: '|00⟩', value: 0.25 },
  { label: '|01⟩', value: 0.50 },
  { label: '|10⟩', value: 0.10 },
  { label: '|11⟩', value: 0.15 },
];

export default function SimulatorTeaser() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeGateIndex, setActiveGateIndex] = useState(-1);
  const [showHistogram, setShowHistogram] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;
    const runSequence = async () => {
      while (isMounted) {
        setShowHistogram(false);
        setActiveGateIndex(-1);
        await delay(800);

        // Light up gates one by one
        for (let i = 0; i < GATES.length; i++) {
          if (!isMounted) return;
          setActiveGateIndex(i);
          await delay(700);
        }

        if (!isMounted) return;
        // Show histogram
        setShowHistogram(true);
        await delay(3500);

        // Reset and loop
        setCycleKey(k => k + 1);
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Quantum Circuit <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-cyan to-quantum-purple">Simulator</span>
        </h2>
        <p className="text-quantum-text-body text-lg max-w-2xl mx-auto">
          Build, run, and measure multi-qubit circuits. Watch gates activate in sequence and observe probability distributions in real time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 1, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl glass-panel relative overflow-hidden rounded-2xl border border-quantum-cyan/20 shadow-glow-cyan"
      >
        {/* Dot matrix background */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.5) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-stretch" key={cycleKey}>
          {/* Circuit Diagram */}
          <div className="flex-1 flex flex-col justify-center min-h-[250px]">
            {/* Top label row */}
            <div className="text-xs font-mono text-quantum-text-body/50 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse" />
              CIRCUIT — 2 qubits, {GATES.length} gates
            </div>

            {/* Qubit lines */}
            {[0, 1].map(qubit => (
              <div key={qubit} className="relative flex items-center h-16 md:h-20">
                {/* Label */}
                <span className="w-12 shrink-0 text-sm font-mono font-bold text-quantum-cyan">
                  |q{qubit}⟩
                </span>

                {/* Wire */}
                <div className="relative flex-1 h-[2px] bg-white/15 mx-2">
                  {/* Signal pulse traveling the wire */}
                  <motion.div
                    className="absolute top-[-3px] w-2 h-2 rounded-full bg-quantum-cyan shadow-[0_0_10px_#06B6D4]"
                    animate={{
                      left: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Gate boxes on this wire */}
                  {GATES.filter(g => g.qubit === qubit).map((gate, gi) => {
                    const gateGlobalIndex = GATES.indexOf(gate);
                    const isActive = activeGateIndex >= gateGlobalIndex;
                    const isCurrentlyLit = activeGateIndex === gateGlobalIndex;

                    return (
                      <motion.div
                        key={gi}
                        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{ left: `${gate.x}%`, transform: 'translate(-50%, -50%)' }}
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{
                          opacity: isActive ? 1 : 0.3,
                          scale: isCurrentlyLit ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-mono font-black text-sm md:text-base border-2 transition-all duration-300"
                          style={{
                            borderColor: isActive ? gate.color : 'rgba(255,255,255,0.1)',
                            backgroundColor: isActive ? `${gate.color}20` : 'rgba(0,0,0,0.3)',
                            color: isActive ? '#F8FAFC' : 'rgba(255,255,255,0.3)',
                            boxShadow: isCurrentlyLit ? `0 0 25px ${gate.color}80` : 'none',
                          }}
                        >
                          {gate.label === 'CNOT' ? '●' : gate.label}
                        </div>

                        {/* CNOT vertical connector line */}
                        {gate.label === 'CNOT' && (
                          <motion.div
                            className="absolute top-full w-[2px] h-16 md:h-20"
                            style={{ backgroundColor: isActive ? gate.color : 'rgba(255,255,255,0.1)' }}
                            animate={{ opacity: isActive ? 1 : 0.2 }}
                          />
                        )}
                      </motion.div>
                    );
                  })}

                  {/* CNOT target (⊕) on qubit 1 */}
                  {qubit === 1 && GATES.filter(g => g.label === 'CNOT').map((gate, ci) => {
                    const gateGlobalIndex = GATES.indexOf(gate);
                    const isActive = activeGateIndex >= gateGlobalIndex;
                    const isCurrentlyLit = activeGateIndex === gateGlobalIndex;

                    return (
                      <motion.div
                        key={`cnot-target-${ci}`}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `${gate.x}%`, transform: 'translate(-50%, -50%)' }}
                        animate={{
                          opacity: isActive ? 1 : 0.3,
                          scale: isCurrentlyLit ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-mono font-black text-lg border-2 transition-all duration-300"
                          style={{
                            borderColor: isActive ? gate.color : 'rgba(255,255,255,0.1)',
                            backgroundColor: isActive ? `${gate.color}15` : 'rgba(0,0,0,0.3)',
                            color: isActive ? '#F8FAFC' : 'rgba(255,255,255,0.3)',
                            boxShadow: isCurrentlyLit ? `0 0 25px ${gate.color}80` : 'none',
                          }}
                        >
                          ⊕
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Measurement icon */}
                <div className="w-10 shrink-0 flex justify-center">
                  <motion.div
                    className="w-8 h-8 md:w-10 md:h-10 rounded border border-white/10 flex items-center justify-center text-quantum-text-body/40 font-mono text-xs"
                    animate={{
                      borderColor: showHistogram ? '#06B6D4' : 'rgba(255,255,255,0.1)',
                      color: showHistogram ? '#06B6D4' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    M
                  </motion.div>
                </div>
              </div>
            ))}

            {/* Status line */}
            <div className="mt-4 text-xs font-mono text-quantum-text-body/50 flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: showHistogram ? '#10B981' : activeGateIndex >= 0 ? '#D946EF' : '#94A3B8',
                }}
              />
              {showHistogram ? '✓ Measurement complete — 1024 shots' : activeGateIndex >= 0 ? `Executing gate ${activeGateIndex + 1}/${GATES.length}...` : 'Initializing circuit...'}
            </div>
          </div>

          {/* Probability Histogram */}
          <div className="lg:w-[280px] flex flex-col justify-center">
            <div className="text-xs font-mono text-quantum-text-body/50 mb-4">
              PROBABILITY DISTRIBUTION
            </div>
            <div className="flex items-end gap-3 h-[160px]">
              {PROB_RESULTS.map((result, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    className="w-full rounded-t-md relative overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{
                      height: showHistogram ? `${result.value * 100}%` : '0%',
                    }}
                    transition={{
                      duration: 0.8,
                      delay: showHistogram ? i * 0.1 : 0,
                      ease: 'easeOut',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-quantum-purple to-quantum-cyan opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-quantum-purple to-quantum-cyan opacity-40 blur-sm" />
                  </motion.div>
                  <motion.span
                    className="text-[10px] md:text-xs font-mono font-bold"
                    animate={{
                      color: showHistogram ? '#F8FAFC' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {result.label}
                  </motion.span>
                  <motion.span
                    className="text-[10px] font-mono"
                    animate={{
                      opacity: showHistogram ? 1 : 0,
                      color: '#06B6D4',
                    }}
                    transition={{ delay: showHistogram ? 0.8 + i * 0.1 : 0 }}
                  >
                    {(result.value * 100).toFixed(0)}%
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
