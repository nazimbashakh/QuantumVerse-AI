'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, Copy, RotateCcw, Zap, BookOpen, Code2, Lightbulb, X, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const SUGGESTED_PROMPTS = [
  { icon: BookOpen, text: "Explain quantum superposition", color: 'text-quantum-cyan' },
  { icon: Code2, text: "Write a Qiskit circuit", color: 'text-quantum-green' },
  { icon: Lightbulb, text: "Grover vs Shor?", color: 'text-quantum-purple' },
  { icon: Zap, text: "Quantum error correction?", color: 'text-quantum-accent' },
];

const AI_RESPONSES: Record<string, string> = {
  "superposition": "## Quantum Superposition\nA classical bit is either `0` or `1`. A qubit in superposition is **both** `|0⟩` and `|1⟩` simultaneously. Mathematically: `|ψ⟩ = α|0⟩ + β|1⟩`.",
  "bell": "## Bell State in Qiskit\nA Bell state is quantum entanglement:\n```python\nfrom qiskit import QuantumCircuit\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()\n```\nThey always measure identical states!",
  "grover": "## Grover vs Shor\n- **Grover**: Searches an unsorted database in O(√N).\n- **Shor**: Factors integers exponentially faster, threatening RSA.",
  "error": "## Error Correction (QEC)\nQuantum states are fragile. We encode 1 logical qubit across multiple physical qubits to protect against X (bit-flip) and Z (phase-flip) errors without collapsing the state."
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('superposition') || lower.includes("like i'm 5") || lower.includes('explain')) return AI_RESPONSES.superposition;
  if (lower.includes('bell') || lower.includes('qiskit') || lower.includes('circuit')) return AI_RESPONSES.bell;
  if (lower.includes('grover') || lower.includes('shor') || lower.includes('difference')) return AI_RESPONSES.grover;
  if (lower.includes('error') || lower.includes('correction') || lower.includes('decoherence')) return AI_RESPONSES.error;
  return `That's a great question about **${input}**! In quantum systems, manipulating Hilbert space through unitary transformations is key. Would you like me to dive deeper into the math or code?`;
}

export default function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Load from localstorage on mount
    const saved = localStorage.getItem('quantumVerseBotHistory');
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    }

    const handleToggle = () => setIsOpen(v => !v);
    const handleOpen = () => setIsOpen(true);
    
    window.addEventListener('toggle-bot', handleToggle);
    window.addEventListener('open-bot', handleOpen);
    
    return () => {
      window.removeEventListener('toggle-bot', handleToggle);
      window.removeEventListener('open-bot', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('quantumVerseBotHistory', JSON.stringify(messages));
    } else {
      localStorage.removeItem('quantumVerseBotHistory');
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(messageText);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-tr from-quantum-purple to-quantum-cyan text-white shadow-glow-purple hover:scale-110 active:scale-95 transition-transform z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-full max-w-sm sm:max-w-md h-[600px] max-h-[85vh] glass-panel border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden bg-quantum-black/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shadow-glow-purple shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-black text-white flex items-center gap-2">QuantumBot <Sparkles className="w-4 h-4 text-quantum-cyan" /></h2>
                <p className="text-[10px] text-quantum-text-body/60 font-bold uppercase tracking-wider">AI Tutor - Online</p>
              </div>
              <button onClick={() => setMessages([])} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-quantum-text-body/50 hover:text-white" title="Clear History">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-quantum-text-body/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <Bot className="w-12 h-12 text-quantum-purple mb-2" />
                  <p className="text-sm font-bold text-white">How can I help you learn?</p>
                  <div className="grid grid-cols-1 gap-2 w-full mt-4">
                    {SUGGESTED_PROMPTS.map((p, i) => (
                      <button key={i} onClick={() => handleSend(p.text)} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-colors text-left text-xs">
                        <p.icon className={`w-4 h-4 ${p.color}`} />
                        <span className="text-quantum-text-body/80">{p.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-3 h-3 text-white" /></div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-quantum-purple/30 border border-quantum-purple/20 text-white rounded-tr-sm' : 'bg-white/5 border border-white/5 text-quantum-text-body/90 rounded-tl-sm'}`}>
                    <div className="prose prose-invert prose-sm whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-3 h-3 text-white" /></div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-quantum-purple rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-quantum-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-quantum-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 pr-1 focus-within:border-quantum-purple/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-white px-2 py-1 placeholder-quantum-text-body/30 outline-none resize-none text-sm"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-lg bg-gradient-to-r from-quantum-purple to-quantum-cyan text-white shadow-glow-purple disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
