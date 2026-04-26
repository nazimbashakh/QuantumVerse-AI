'use client';
import { useState } from 'react';
import { Copy, Check, ChevronRight } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'python' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple regex-based syntax highlighting for Python/Qiskit keywords
  const highlightCode = (text: string) => {
    const keywords = ['import', 'from', 'as', 'def', 'return', 'if', 'else', 'for', 'in', 'while', 'print', 'with', 'try', 'except', 'pass', 'class'];
    const objects = ['QuantumCircuit', 'AerSimulator', 'Circuit', 'Simulator', 'LineQubit'];
    const methods = ['h', 'x', 'y', 'z', 'cx', 'measure', 'run', 'result', 'get_counts', 'draw', 'transpile', 'repetitions', 'histogram'];

    let highlighted = text
      .replace(/#.*$/gm, '<span class="text-quantum-text-body/30 italic">$&</span>') // comments
      .replace(/'[^']*'|"[^"]*"/g, '<span class="text-quantum-green">$&</span>'); // strings

    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-quantum-purple font-bold">${kw}</span>`);
    });

    objects.forEach(obj => {
      const regex = new RegExp(`\\b${obj}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-quantum-cyan">${obj}</span>`);
    });

    methods.forEach(method => {
      const regex = new RegExp(`\\.${method}\\b`, 'g');
      highlighted = highlighted.replace(regex, `.<span class="text-quantum-accent">${method}</span>`);
    });

    return highlighted;
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/5 bg-black/40">
      <div className="flex items-center justify-between px-5 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-quantum-purple/40" />
          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">{language} implementation</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-white/10 text-quantum-text-body/40 hover:text-white transition-all active:scale-95"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-quantum-green shadow-[0_0_10px_rgba(34,197,94,0.4)]" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <pre className="p-6 overflow-x-auto custom-scrollbar font-mono text-sm leading-relaxed text-quantum-text-body/80 bg-black/20">
        <code 
          className="block whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  );
}
