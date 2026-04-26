'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, Trash2, Download, RotateCcw, Plus, Copy, ChevronDown, Zap, BarChart3 } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

interface GateInfo {
  id: string;
  name: string;
  symbol: string;
  color: string;
  qubits: number;
  description: string;
}

const GATE_LIBRARY: GateInfo[] = [
  { id: 'h', name: 'Hadamard', symbol: 'H', color: '#06B6D4', qubits: 1, description: 'Creates equal superposition' },
  { id: 'x', name: 'Pauli-X', symbol: 'X', color: '#EF4444', qubits: 1, description: 'Bit flip (NOT gate)' },
  { id: 'y', name: 'Pauli-Y', symbol: 'Y', color: '#F59E0B', qubits: 1, description: 'Bit and phase flip' },
  { id: 'z', name: 'Pauli-Z', symbol: 'Z', color: '#10B981', qubits: 1, description: 'Phase flip' },
  { id: 's', name: 'S Gate', symbol: 'S', color: '#8B5CF6', qubits: 1, description: 'π/2 phase gate' },
  { id: 't', name: 'T Gate', symbol: 'T', color: '#EC4899', qubits: 1, description: 'π/4 phase gate' },
  { id: 'rx', name: 'Rx', symbol: 'Rx', color: '#F97316', qubits: 1, description: 'X-axis rotation' },
  { id: 'ry', name: 'Ry', symbol: 'Ry', color: '#14B8A6', qubits: 1, description: 'Y-axis rotation' },
  { id: 'rz', name: 'Rz', symbol: 'Rz', color: '#6366F1', qubits: 1, description: 'Z-axis rotation' },
  { id: 'cx', name: 'CNOT', symbol: 'CX', color: '#7C3AED', qubits: 2, description: 'Controlled NOT' },
  { id: 'cz', name: 'CZ', symbol: 'CZ', color: '#0EA5E9', qubits: 2, description: 'Controlled Z' },
  { id: 'swap', name: 'SWAP', symbol: 'SW', color: '#D946EF', qubits: 2, description: 'Swap two qubits' },
  { id: 'ccx', name: 'Toffoli', symbol: 'CCX', color: '#F43F5E', qubits: 3, description: 'Controlled-Controlled NOT' },
  { id: 'm', name: 'Measure', symbol: 'M', color: '#94A3B8', qubits: 1, description: 'Measurement in Z basis' },
];

interface PlacedGate { gateId: string; qubit: number; step: number; }

const TEMPLATES = [
  { name: 'Bell State', gates: [{ gateId: 'h', qubit: 0, step: 0 }, { gateId: 'cx', qubit: 0, step: 1 }, { gateId: 'm', qubit: 0, step: 2 }, { gateId: 'm', qubit: 1, step: 2 }] },
  { name: 'GHZ State', gates: [{ gateId: 'h', qubit: 0, step: 0 }, { gateId: 'cx', qubit: 0, step: 1 }, { gateId: 'cx', qubit: 0, step: 2 }] },
  { name: 'Superposition', gates: [{ gateId: 'h', qubit: 0, step: 0 }, { gateId: 'h', qubit: 1, step: 0 }, { gateId: 'm', qubit: 0, step: 1 }, { gateId: 'm', qubit: 1, step: 1 }] },
];

export default function CircuitSimulator() {
  const [numQubits, setNumQubits] = useState(3);
  const [placedGates, setPlacedGates] = useState<PlacedGate[]>([]);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'circuit' | 'results'>('circuit');

  const maxSteps = 10;

  const handleCellClick = (qubit: number, step: number) => {
    if (!selectedGate) return;
    const existing = placedGates.findIndex(g => g.qubit === qubit && g.step === step);
    if (existing >= 0) {
      setPlacedGates(prev => prev.filter((_, i) => i !== existing));
    } else {
      setPlacedGates(prev => [...prev, { gateId: selectedGate, qubit, step }]);
    }
  };

  const runSimulation = async () => {
    setIsRunning(true);
    
    let code = `
import json
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(${numQubits})
`;
    const sorted = [...placedGates].sort((a, b) => a.step - b.step);
    sorted.forEach(g => {
      const gate = GATE_LIBRARY.find(gl => gl.id === g.gateId);
      if (!gate) return;
      if (g.gateId === 'h') code += `qc.h(${g.qubit})\n`;
      else if (g.gateId === 'x') code += `qc.x(${g.qubit})\n`;
      else if (g.gateId === 'y') code += `qc.y(${g.qubit})\n`;
      else if (g.gateId === 'z') code += `qc.z(${g.qubit})\n`;
      else if (g.gateId === 's') code += `qc.s(${g.qubit})\n`;
      else if (g.gateId === 't') code += `qc.t(${g.qubit})\n`;
      else if (g.gateId === 'cx') code += `qc.cx(${g.qubit}, ${(g.qubit + 1) % numQubits})\n`;
      else if (g.gateId === 'm') code += `qc.measure_all()\n`;
    });

    // Add simulation execution logic
    code += `
sim = AerSimulator()
result = sim.run(qc, shots=1024).result()
counts = result.get_counts()
print(json.dumps(counts))
`;

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'python' }),
      });

      const data = await res.json();
      
      let parsedSuccessfully = false;
      if (data.output) {
        try {
          // Extract only the JSON dictionary using regex
          const jsonMatch = data.output.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedCounts = JSON.parse(jsonMatch[0]);
            setResults(parsedCounts);
            parsedSuccessfully = true;
          }
        } catch (e) {
          console.error("Failed to parse output:", data.output);
        }
      }
      
      if (!parsedSuccessfully) {
        if (data.error) {
           console.error("Execution error:", data.error);
        }
        setResults({});
      }
    } catch (error) {
      console.error(error);
      setResults({});
    } finally {
      setIsRunning(false);
      setActiveTab('results');
    }
  };

  const exportQiskit = () => {
    let code = `from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(${numQubits})\n`;
    const sorted = [...placedGates].sort((a, b) => a.step - b.step);
    sorted.forEach(g => {
      const gate = GATE_LIBRARY.find(gl => gl.id === g.gateId);
      if (!gate) return;
      if (g.gateId === 'h') code += `qc.h(${g.qubit})\n`;
      else if (g.gateId === 'x') code += `qc.x(${g.qubit})\n`;
      else if (g.gateId === 'y') code += `qc.y(${g.qubit})\n`;
      else if (g.gateId === 'z') code += `qc.z(${g.qubit})\n`;
      else if (g.gateId === 's') code += `qc.s(${g.qubit})\n`;
      else if (g.gateId === 't') code += `qc.t(${g.qubit})\n`;
      else if (g.gateId === 'cx') code += `qc.cx(${g.qubit}, ${(g.qubit + 1) % numQubits})\n`;
      else if (g.gateId === 'm') code += `qc.measure_all()\n`;
    });
    navigator.clipboard.writeText(code);
  };

  const maxCount = results ? Math.max(...Object.values(results)) : 0;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-quantum-cyan" /> Quantum Circuit Simulator
          </h1>
          <p className="text-sm text-quantum-text-body/60">Build, simulate, and export quantum circuits</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setPlacedGates([]); setResults(null); }} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-quantum-text-body/60 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Clear
          </button>
          <button onClick={exportQiskit} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-quantum-text-body/60 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
            <Copy className="w-4 h-4" /> Export Qiskit
          </button>
          <button onClick={runSimulation} disabled={isRunning || placedGates.length === 0} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-quantum-purple to-quantum-cyan text-white font-black text-sm hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 disabled:hover:scale-100 flex items-center gap-2 shadow-glow-purple">
            {isRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Simulating...' : 'Run Circuit'}
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Gate Library */}
        <div className="xl:w-64 shrink-0">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-4 sticky top-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Gate Library</h3>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-quantum-text-body/30 uppercase tracking-widest">Templates</span>
              {TEMPLATES.map((t, i) => (
                <button key={i} onClick={() => { setPlacedGates(t.gates); setResults(null); }} className="w-full text-left px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-medium text-quantum-text-body/60 hover:bg-white/5 hover:text-white transition-all">
                  {t.name}
                </button>
              ))}
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              <span className="text-[10px] font-bold text-quantum-text-body/30 uppercase tracking-widest">Single Qubit</span>
              <div className="grid grid-cols-3 gap-1.5">
                {GATE_LIBRARY.filter(g => g.qubits === 1).map(gate => (
                  <button
                    key={gate.id}
                    onClick={() => setSelectedGate(selectedGate === gate.id ? null : gate.id)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      selectedGate === gate.id 
                        ? 'ring-2 ring-quantum-cyan bg-quantum-cyan/10' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center font-mono font-black text-sm" style={{ backgroundColor: gate.color + '20', color: gate.color }}>
                      {gate.symbol}
                    </div>
                    <span className="text-[9px] text-quantum-text-body/40 mt-1 block">{gate.name}</span>
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-bold text-quantum-text-body/30 uppercase tracking-widest pt-2 block">Multi Qubit</span>
              <div className="grid grid-cols-3 gap-1.5">
                {GATE_LIBRARY.filter(g => g.qubits > 1).map(gate => (
                  <button
                    key={gate.id}
                    onClick={() => setSelectedGate(selectedGate === gate.id ? null : gate.id)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      selectedGate === gate.id 
                        ? 'ring-2 ring-quantum-cyan bg-quantum-cyan/10' 
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    <div className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center font-mono font-black text-xs" style={{ backgroundColor: gate.color + '20', color: gate.color }}>
                      {gate.symbol}
                    </div>
                    <span className="text-[9px] text-quantum-text-body/40 mt-1 block">{gate.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-quantum-text-body/30 uppercase tracking-widest">Qubits</span>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => { setNumQubits(n); setPlacedGates([]); setResults(null); }} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${numQubits === n ? 'bg-quantum-purple text-white' : 'bg-white/5 text-quantum-text-body/40 hover:bg-white/10'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Circuit + Results */}
        <div className="flex-1 space-y-6">
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            <button onClick={() => setActiveTab('circuit')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'circuit' ? 'bg-quantum-purple text-white' : 'text-quantum-text-body/40 hover:text-white'}`}>
              Circuit
            </button>
            <button onClick={() => setActiveTab('results')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'results' ? 'bg-quantum-purple text-white' : 'text-quantum-text-body/40 hover:text-white'}`}>
              Results {results && '✓'}
            </button>
          </div>

          {activeTab === 'circuit' ? (
            <div className="glass-panel p-6 rounded-2xl border border-white/5 overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="flex ml-16 mb-2">
                  {Array.from({ length: maxSteps }).map((_, step) => (
                    <div key={step} className="w-16 text-center text-[10px] font-mono text-quantum-text-body/20">
                      t{step}
                    </div>
                  ))}
                </div>
                {Array.from({ length: numQubits }).map((_, qubit) => (
                  <div key={qubit} className="flex items-center group">
                    <div className="w-16 text-sm font-mono font-bold text-quantum-text-body/40 shrink-0">
                      q[{qubit}]
                    </div>
                    <div className="flex relative">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
                      {Array.from({ length: maxSteps }).map((_, step) => {
                        const gate = placedGates.find(g => g.qubit === qubit && g.step === step);
                        const gateInfo = gate ? GATE_LIBRARY.find(g => g.id === gate.gateId) : null;
                        return (
                          <button
                            key={step}
                            onClick={() => handleCellClick(qubit, step)}
                            className={`w-16 h-16 flex items-center justify-center relative z-10 transition-all ${
                              selectedGate ? 'cursor-crosshair hover:bg-quantum-cyan/10 rounded-lg' : ''
                            }`}
                          >
                            {gateInfo ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-sm border shadow-lg"
                                style={{ 
                                  backgroundColor: gateInfo.color + '20', 
                                  color: gateInfo.color,
                                  borderColor: gateInfo.color + '40'
                                }}
                              >
                                {gateInfo.symbol}
                              </motion.div>
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-quantum-cyan" /> Measurement Results (1024 shots)
              </h3>
              {results ? (
                <div className="space-y-3">
                  {Object.entries(results).sort((a, b) => b[1] - a[1]).map(([state, count]) => (
                    <div key={state} className="flex items-center gap-4">
                      <span className="w-20 font-mono text-sm font-bold text-white">|{state}⟩</span>
                      <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(count / maxCount) * 100}%` }} className="h-full bg-gradient-to-r from-quantum-purple to-quantum-cyan rounded-lg" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-white/80">
                          {count} ({((count / 1024) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-quantum-text-body/30">
                  <BarChart3 className="w-12 h-12 mb-4" />
                  <p className="font-bold">Run the circuit to see results</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
