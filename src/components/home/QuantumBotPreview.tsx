'use client';
import { useState, useEffect, useRef } from 'react';
import { Bot, User, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const MOCK_MESSAGES = [
  { role: 'user', content: 'What is quantum superposition?' },
  { role: 'bot', content: 'Imagine a coin spinning in the air — while spinning, it isn\'t just heads or tails. It exists as a probability of both simultaneously.\n\nIn quantum mechanics, a qubit exists in a linear combination of states |0⟩ and |1⟩ until observed:\n\n|ψ⟩ = α|0⟩ + β|1⟩\n\nWhere α and β are complex probability amplitudes satisfying |α|² + |β|² = 1.\n\nWant to see how we create this using a Hadamard (H) gate?' },
  { role: 'user', content: 'Yes, show me the Hadamard gate.' },
  { role: 'bot', content: 'The Hadamard gate transforms basis states into equal superpositions:\n\nH|0⟩ = (|0⟩ + |1⟩) / √2\nH|1⟩ = (|0⟩ − |1⟩) / √2\n\nIn matrix form:\n\nH = (1/√2) × [[1, 1], [1, -1]]\n\nIn Qiskit:\nqc = QuantumCircuit(1)\nqc.h(0)\nqc.measure_all()' },
];

export default function QuantumBotPreview() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentBotMsg, setCurrentBotMsg] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let isMounted = true;

    const runDemo = async () => {
      setMessages([]);
      await delay(800);

      for (let i = 0; i < MOCK_MESSAGES.length; i++) {
        if (!isMounted) return;
        const msg = MOCK_MESSAGES[i];

        if (msg.role === 'user') {
          setMessages(prev => [...prev, msg]);
          setIsTyping(true);
          await delay(1200);
        } else {
          setIsTyping(false);
          // Typewriter effect for bot
          setCurrentBotMsg(i);
          const fullText = msg.content;
          for (let c = 0; c <= fullText.length; c += 3) {
            if (!isMounted) return;
            setDisplayedText(fullText.slice(0, c));
            await delay(15);
          }
          setDisplayedText(fullText);
          setMessages(prev => [...prev, { ...msg, content: fullText }]);
          setDisplayedText('');
          await delay(1500);
        }
      }
    };

    runDemo();
    return () => { isMounted = false; };
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left side — Info */}
        <motion.div
          className="lg:w-5/12 space-y-6"
          initial={{ opacity: 1, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full border-quantum-purple/30">
            <Sparkles className="w-4 h-4 text-quantum-accent" />
            <span className="text-xs font-bold tracking-widest uppercase text-quantum-accent">AI-Powered</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            QuantumBot{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-purple to-quantum-cyan">
              AI Tutor
            </span>
          </h2>
          <p className="text-quantum-text-body text-lg leading-relaxed">
            Your personal quantum computing tutor covering all 115 curriculum topics. It generates valid Qiskit code on demand, clarifies complex mathematics with visual derivations, and creates personalized recovery plans for tricky concepts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="btn-quantum">
              <span>Try QuantumBot Free</span>
            </button>
            <div className="flex items-center gap-3 text-sm text-quantum-text-body/60">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-quantum-purple to-quantum-cyan border-2 border-background" />
                ))}
              </div>
              <span>2,400+ active learners</span>
            </div>
          </div>
        </motion.div>

        {/* Right side — Chat Preview */}
        <motion.div
          className="lg:w-7/12 w-full"
          initial={{ opacity: 1, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-panel p-1 rounded-2xl border border-quantum-purple/20 shadow-glow-purple relative max-w-lg mx-auto lg:max-w-none">
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-quantum-text-body/40">quantumbot — session_042</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-quantum-green animate-pulse" />
            </div>
            
            {/* Chat body */}
            <div className="p-5 space-y-5 min-h-[380px] max-h-[420px] overflow-y-auto scrollbar-thin">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={`msg-${i}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br from-quantum-purple to-quantum-violet flex items-center justify-center shadow-glow-purple">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-quantum-purple/20 text-white rounded-tr-sm border border-quantum-purple/30'
                        : 'bg-white/5 text-quantum-text-heading rounded-tl-sm border border-white/5'
                    }`}>
                      <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg shrink-0 bg-white/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-quantum-text-body" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typewriter for current bot message */}
                {displayedText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br from-quantum-purple to-quantum-violet flex items-center justify-center shadow-glow-purple">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 text-sm leading-relaxed text-quantum-text-heading max-w-[85%]">
                      <pre className="whitespace-pre-wrap font-sans text-sm">{displayedText}<span className="animate-pulse text-quantum-cyan">▊</span></pre>
                    </div>
                  </motion.div>
                )}

                {isTyping && !displayedText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 pl-11"
                  >
                    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                      <motion.span className="w-2 h-2 rounded-full bg-quantum-purple" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
                      <motion.span className="w-2 h-2 rounded-full bg-quantum-purple" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
                      <motion.span className="w-2 h-2 rounded-full bg-quantum-purple" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-5 pb-4 pt-2 border-t border-white/5">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                <span className="flex-1 text-sm text-quantum-text-body/30 font-mono">Ask about quantum computing...</span>
                <Send className="w-4 h-4 text-quantum-purple/50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
