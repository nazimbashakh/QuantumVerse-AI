'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, Copy, RotateCcw, Zap, BookOpen, Code2, Lightbulb } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Removed static mock AI responses

export default function QuantumBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const SUGGESTED_PROMPTS = [
    { icon: BookOpen, text: "Explain quantum superposition like I'm 5", color: 'text-quantum-cyan' },
    { icon: Code2, text: "Write a Qiskit circuit for Bell state", color: 'text-quantum-green' },
    { icon: Lightbulb, text: "What is the difference between Grover's and Shor's algorithm?", color: 'text-quantum-purple' },
    { icon: Zap, text: "How does quantum error correction work?", color: 'text-quantum-accent' },
  ];

  useEffect(() => {
    // Fetch initial chat history
    fetch('/api/bot/history')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setMessages(data.map((m: any) => ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
            timestamp: new Date(m.createdAt)
          })));
        }
      })
      .catch(console.error);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!res.ok) throw new Error('API Error');

      setIsTyping(false);

      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: '', timestamp: new Date() }]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') break;
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, content: m.content + data.text } : m));
              }
            } catch (e) {
              // Ignore partial JSON
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto flex flex-col h-full bg-quantum-dark/50 rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-6 p-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-8 py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-quantum-purple/20 to-quantum-cyan/20 border border-white/10 flex items-center justify-center">
              <Bot className="w-12 h-12 text-quantum-purple" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">How can I help you learn quantum?</h2>
              <p className="text-quantum-text-body/60 max-w-md">Ask me anything about quantum computing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-left group"
                >
                  <prompt.icon className={`w-5 h-5 ${prompt.color} shrink-0 mt-0.5`} />
                  <span className="text-sm text-quantum-text-body/70 group-hover:text-white transition-colors">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-5 ${
              msg.role === 'user' 
                ? 'bg-quantum-purple/20 border border-quantum-purple/20 text-white' 
                : 'bg-white/[0.03] border border-white/5 text-quantum-text-body/90'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-white/60" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-quantum-purple to-quantum-cyan flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-quantum-purple rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-quantum-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-quantum-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-white/[0.01]">
        <div className="flex gap-3 items-end">
          <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-4 focus-within:border-quantum-purple/40 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about quantum computing..."
              rows={1}
              className="w-full bg-transparent text-white placeholder-quantum-text-body/30 outline-none resize-none text-sm font-medium"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-4 rounded-2xl bg-gradient-to-r from-quantum-purple to-quantum-cyan text-white shadow-glow-purple hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
