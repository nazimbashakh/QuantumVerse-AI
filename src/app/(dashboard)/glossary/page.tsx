'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Atom, X } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

const GLOSSARY: GlossaryTerm[] = [
  { term: 'Qubit', definition: 'The fundamental unit of quantum information, analogous to a classical bit but capable of existing in a superposition of |0⟩ and |1⟩ states simultaneously. Represented as |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.', category: 'Fundamentals', relatedTerms: ['Superposition', 'Bloch Sphere'] },
  { term: 'Superposition', definition: 'A quantum mechanical principle where a qubit can exist in a combination of multiple states simultaneously until measured. This is the basis for quantum parallelism.', category: 'Fundamentals', relatedTerms: ['Qubit', 'Measurement'] },
  { term: 'Entanglement', definition: 'A quantum phenomenon where two or more qubits become correlated such that the quantum state of each qubit cannot be described independently. Measuring one instantly determines the state of the other regardless of distance.', category: 'Fundamentals', relatedTerms: ['Bell State', 'EPR Paradox'] },
  { term: 'Hadamard Gate', definition: 'A single-qubit gate that creates an equal superposition from a basis state. Maps |0⟩ → (|0⟩+|1⟩)/√2 and |1⟩ → (|0⟩-|1⟩)/√2. Represented by the matrix H = (1/√2)[[1,1],[1,-1]].', category: 'Gates', relatedTerms: ['Superposition', 'Quantum Gate'] },
  { term: 'CNOT Gate', definition: 'A two-qubit gate (Controlled-NOT) that flips the target qubit if and only if the control qubit is |1⟩. It is the key gate for creating entanglement and is universal for quantum computing when combined with single-qubit gates.', category: 'Gates', relatedTerms: ['Entanglement', 'Universal Gate Set'] },
  { term: 'Pauli-X Gate', definition: 'A single-qubit gate equivalent to a classical NOT gate. Rotates the qubit state by π radians around the X-axis of the Bloch sphere. Maps |0⟩ → |1⟩ and |1⟩ → |0⟩.', category: 'Gates', relatedTerms: ['Pauli-Y Gate', 'Pauli-Z Gate'] },
  { term: 'Pauli-Y Gate', definition: 'A single-qubit gate that performs a π rotation around the Y-axis of the Bloch sphere. Maps |0⟩ → i|1⟩ and |1⟩ → -i|0⟩.', category: 'Gates', relatedTerms: ['Pauli-X Gate', 'Pauli-Z Gate'] },
  { term: 'Pauli-Z Gate', definition: 'A single-qubit gate that performs a π rotation around the Z-axis of the Bloch sphere (phase flip). Leaves |0⟩ unchanged and maps |1⟩ → -|1⟩.', category: 'Gates', relatedTerms: ['Pauli-X Gate', 'Phase Gate'] },
  { term: 'T Gate', definition: 'A single-qubit gate that applies a π/4 phase shift. Critical for achieving universal quantum computation. T = diag(1, e^(iπ/4)).', category: 'Gates', relatedTerms: ['S Gate', 'Universal Gate Set'] },
  { term: 'S Gate', definition: 'A single-qubit gate that applies a π/2 phase shift. Equivalent to √Z. S = diag(1, i).', category: 'Gates', relatedTerms: ['T Gate', 'Pauli-Z Gate'] },
  { term: 'Toffoli Gate', definition: 'A three-qubit gate (CCNOT) that flips the target qubit only when both control qubits are |1⟩. Universal for classical reversible computation.', category: 'Gates', relatedTerms: ['CNOT Gate', 'Fredkin Gate'] },
  { term: 'SWAP Gate', definition: 'A two-qubit gate that exchanges the states of two qubits. Can be decomposed into three CNOT gates.', category: 'Gates', relatedTerms: ['CNOT Gate', 'Fredkin Gate'] },
  { term: 'Bloch Sphere', definition: 'A geometric representation of the state space of a single qubit. Pure states are represented as points on the surface of a unit sphere. The north and south poles correspond to |0⟩ and |1⟩ respectively.', category: 'Fundamentals', relatedTerms: ['Qubit', 'Superposition'] },
  { term: 'Bell State', definition: 'Any of four maximally entangled two-qubit states: |Φ+⟩ = (|00⟩+|11⟩)/√2, |Φ-⟩ = (|00⟩-|11⟩)/√2, |Ψ+⟩ = (|01⟩+|10⟩)/√2, |Ψ-⟩ = (|01⟩-|10⟩)/√2.', category: 'Fundamentals', relatedTerms: ['Entanglement', 'EPR Paradox'] },
  { term: 'Quantum Teleportation', definition: 'A protocol for transmitting the quantum state of a qubit from one location to another using shared entanglement and classical communication. Requires one Bell pair and two classical bits.', category: 'Protocols', relatedTerms: ['Entanglement', 'Bell State'] },
  { term: 'Quantum Fourier Transform', definition: 'The quantum analog of the discrete Fourier transform. Maps computational basis states to frequency basis states. Key subroutine in Shor\'s algorithm and quantum phase estimation.', category: 'Algorithms', relatedTerms: ['Shor\'s Algorithm', 'Phase Estimation'] },
  { term: 'Shor\'s Algorithm', definition: 'A quantum algorithm for integer factorization that runs in polynomial time, providing exponential speedup over known classical algorithms. Threatens RSA-based cryptography.', category: 'Algorithms', relatedTerms: ['QFT', 'Period Finding'] },
  { term: 'Grover\'s Algorithm', definition: 'A quantum search algorithm that finds a marked item in an unstructured database of N items using O(√N) queries, providing a quadratic speedup over classical linear search.', category: 'Algorithms', relatedTerms: ['Amplitude Amplification', 'Oracle'] },
  { term: 'VQE', definition: 'Variational Quantum Eigensolver — a hybrid quantum-classical algorithm for finding the ground state energy of a molecular Hamiltonian. Uses parameterized quantum circuits optimized by a classical optimizer.', category: 'Algorithms', relatedTerms: ['Variational Circuit', 'QAOA'] },
  { term: 'QAOA', definition: 'Quantum Approximate Optimization Algorithm — a hybrid algorithm for combinatorial optimization problems. Alternates between cost and mixer Hamiltonians with tunable parameters.', category: 'Algorithms', relatedTerms: ['VQE', 'MaxCut'] },
  { term: 'Decoherence', definition: 'The loss of quantum coherence when a quantum system interacts with its environment, causing the system to behave classically. The primary obstacle to building large-scale quantum computers.', category: 'Hardware', relatedTerms: ['T1 Time', 'T2 Time', 'Noise'] },
  { term: 'T1 Time', definition: 'The relaxation time — how long it takes for a qubit to decay from |1⟩ to |0⟩ due to energy dissipation. Also called longitudinal relaxation time.', category: 'Hardware', relatedTerms: ['T2 Time', 'Decoherence'] },
  { term: 'T2 Time', definition: 'The dephasing time — how long a qubit maintains its phase coherence. Always T2 ≤ 2T1. Also called transverse relaxation time.', category: 'Hardware', relatedTerms: ['T1 Time', 'Decoherence'] },
  { term: 'Quantum Error Correction', definition: 'Techniques to protect quantum information from errors due to decoherence and noise. Encodes a logical qubit across multiple physical qubits without violating the no-cloning theorem.', category: 'Error Correction', relatedTerms: ['Surface Code', 'Logical Qubit'] },
  { term: 'Surface Code', definition: 'A topological quantum error-correcting code arranged on a 2D lattice. Known for having a high error threshold (~1%) and being compatible with nearest-neighbor qubit connectivity.', category: 'Error Correction', relatedTerms: ['QEC', 'Logical Qubit'] },
  { term: 'Logical Qubit', definition: 'A qubit encoded across multiple physical qubits using quantum error correction. Logical qubits are fault-tolerant and can perform reliable quantum computation.', category: 'Error Correction', relatedTerms: ['Physical Qubit', 'Surface Code'] },
  { term: 'No-Cloning Theorem', definition: 'A fundamental theorem stating that it is impossible to create an identical copy of an unknown arbitrary quantum state. This is a direct consequence of the linearity of quantum mechanics.', category: 'Theory', relatedTerms: ['Quantum Teleportation', 'QEC'] },
  { term: 'Measurement', definition: 'The process of extracting classical information from a quantum system. Measurement causes the quantum state to collapse to one of the eigenstates of the measurement operator, with probability determined by Born\'s rule.', category: 'Fundamentals', relatedTerms: ['Born Rule', 'Wave Function Collapse'] },
  { term: 'Born Rule', definition: 'The rule that gives the probability of obtaining a particular measurement outcome. For state |ψ⟩ = α|0⟩ + β|1⟩, the probability of measuring |0⟩ is |α|² and |1⟩ is |β|².', category: 'Theory', relatedTerms: ['Measurement', 'Probability Amplitude'] },
  { term: 'Probability Amplitude', definition: 'A complex number whose squared modulus gives the probability of a quantum state. Unlike classical probabilities, amplitudes can interfere constructively or destructively.', category: 'Theory', relatedTerms: ['Born Rule', 'Interference'] },
  { term: 'Quantum Interference', definition: 'The phenomenon where probability amplitudes of different quantum paths add together (constructive) or cancel out (destructive), forming the basis of quantum speedup.', category: 'Theory', relatedTerms: ['Probability Amplitude', 'Grover\'s Algorithm'] },
  { term: 'Density Matrix', definition: 'A matrix representation of a quantum state that can describe both pure and mixed states. ρ = |ψ⟩⟨ψ| for pure states, and ρ = Σᵢ pᵢ|ψᵢ⟩⟨ψᵢ| for mixed states.', category: 'Theory', relatedTerms: ['Pure State', 'Mixed State'] },
  { term: 'Fidelity', definition: 'A measure of the closeness of two quantum states. For pure states |ψ⟩ and |φ⟩, fidelity F = |⟨ψ|φ⟩|². Ranges from 0 (orthogonal) to 1 (identical).', category: 'Theory', relatedTerms: ['Density Matrix', 'Gate Fidelity'] },
  { term: 'Quantum Supremacy', definition: 'The demonstration that a quantum computer can perform a specific computational task that is infeasible for any classical computer in a reasonable time. First claimed by Google in 2019.', category: 'Milestones', relatedTerms: ['Random Circuit Sampling', 'Sycamore'] },
  { term: 'NISQ', definition: 'Noisy Intermediate-Scale Quantum — the current era of quantum computing with 50-1000+ qubits that are not error-corrected. VQE and QAOA are designed for NISQ devices.', category: 'Hardware', relatedTerms: ['Decoherence', 'VQE'] },
  { term: 'Quantum Volume', definition: 'A metric for measuring the capability of a quantum computer, accounting for qubit count, error rates, connectivity, and circuit depth. Proposed by IBM.', category: 'Hardware', relatedTerms: ['NISQ', 'Gate Fidelity'] },
  { term: 'Superdense Coding', definition: 'A quantum communication protocol that allows sending 2 classical bits using only 1 qubit, by utilizing a pre-shared entangled pair.', category: 'Protocols', relatedTerms: ['Entanglement', 'Quantum Teleportation'] },
  { term: 'BB84 Protocol', definition: 'The first quantum key distribution protocol, invented by Bennett and Brassard in 1984. Uses the no-cloning theorem to detect eavesdropping with information-theoretic security.', category: 'Cryptography', relatedTerms: ['QKD', 'No-Cloning Theorem'] },
  { term: 'Post-Quantum Cryptography', definition: 'Cryptographic algorithms designed to be secure against attacks by both classical and quantum computers. NIST standardized CRYSTALS-Kyber and CRYSTALS-Dilithium in 2024.', category: 'Cryptography', relatedTerms: ['Shor\'s Algorithm', 'Lattice Cryptography'] },
  { term: 'Quantum Machine Learning', definition: 'The intersection of quantum computing and machine learning. Includes quantum neural networks, quantum kernel methods, and quantum data encoding strategies.', category: 'Applications', relatedTerms: ['VQE', 'QAOA'] },
  { term: 'Quantum Annealing', definition: 'A metaheuristic for finding the global minimum of a cost function by exploiting quantum tunneling. Used by D-Wave systems for optimization problems.', category: 'Hardware', relatedTerms: ['Optimization', 'D-Wave'] },
  { term: 'Hilbert Space', definition: 'The mathematical space in which quantum states live. For an n-qubit system, the Hilbert space has 2ⁿ dimensions, each corresponding to a computational basis state.', category: 'Mathematics', relatedTerms: ['Qubit', 'Tensor Product'] },
  { term: 'Tensor Product', definition: 'The mathematical operation used to combine quantum systems. The state space of two qubits is the tensor product of their individual spaces: ℋ = ℋ₁ ⊗ ℋ₂.', category: 'Mathematics', relatedTerms: ['Hilbert Space', 'Composite System'] },
  { term: 'Unitary Matrix', definition: 'A matrix U where U†U = I (identity). All quantum gates must be unitary to preserve the normalization of quantum states. Unitary operations are reversible.', category: 'Mathematics', relatedTerms: ['Quantum Gate', 'Reversibility'] },
  { term: 'Eigenvalue', definition: 'A scalar λ such that A|v⟩ = λ|v⟩ for operator A and state |v⟩. Measurement outcomes are eigenvalues of the measurement operator, and the system collapses to the corresponding eigenstate.', category: 'Mathematics', relatedTerms: ['Eigenstate', 'Observable'] },
  { term: 'Dirac Notation', definition: 'The standard notation in quantum mechanics. |ψ⟩ (ket) represents a column vector, ⟨ψ| (bra) represents a row vector (conjugate transpose), and ⟨φ|ψ⟩ is the inner product.', category: 'Mathematics', relatedTerms: ['Hilbert Space', 'Inner Product'] },
  { term: 'Oracle', definition: 'A black-box function in quantum algorithms that marks or evaluates solutions. Grover\'s and Deutsch-Jozsa algorithms use oracles to encode the problem.', category: 'Algorithms', relatedTerms: ['Grover\'s Algorithm', 'Deutsch-Jozsa'] },
  { term: 'Amplitude Amplification', definition: 'A generalization of Grover\'s search. Increases the probability of measuring the target state by reflecting about the mean amplitude. Provides quadratic speedup.', category: 'Algorithms', relatedTerms: ['Grover\'s Algorithm', 'Quantum Walk'] },
  { term: 'Quantum Phase Estimation', definition: 'An algorithm to estimate the eigenvalue (phase) of a unitary operator. Key subroutine of Shor\'s algorithm and many chemistry simulations.', category: 'Algorithms', relatedTerms: ['QFT', 'Shor\'s Algorithm'] },
  { term: 'Quantum Walk', definition: 'The quantum analog of a classical random walk. Quantum walks spread quadratically faster than classical walks and are the basis for some quantum algorithms.', category: 'Algorithms', relatedTerms: ['Amplitude Amplification', 'Graph Algorithms'] },
  { term: 'Stabilizer Formalism', definition: 'A framework for efficiently describing and simulating a class of quantum states (stabilizer states) and operations (Clifford gates). The basis of many error correction codes.', category: 'Error Correction', relatedTerms: ['Clifford Gates', 'Gottesman-Knill'] },
  { term: 'Clifford Gates', definition: 'The set of gates that map Pauli operators to Pauli operators under conjugation. Includes H, S, and CNOT. Circuits using only Clifford gates can be efficiently simulated classically.', category: 'Gates', relatedTerms: ['Stabilizer Formalism', 'T Gate'] },
  { term: 'Gate Synthesis', definition: 'The process of decomposing an arbitrary unitary operation into a sequence of gates from a universal gate set. The Solovay-Kitaev theorem guarantees efficient approximation.', category: 'Compilation', relatedTerms: ['Universal Gate Set', 'Circuit Depth'] },
  { term: 'Circuit Depth', definition: 'The number of time steps (layers of parallel gates) in a quantum circuit. Shallower circuits are preferred in NISQ devices to minimize decoherence effects.', category: 'Compilation', relatedTerms: ['NISQ', 'Gate Synthesis'] },
  { term: 'Transpilation', definition: 'The process of converting an abstract quantum circuit into one that respects the hardware constraints (connectivity, native gate set) of a specific quantum processor.', category: 'Compilation', relatedTerms: ['Circuit Depth', 'Qiskit'] },
  { term: 'Qiskit', definition: 'An open-source quantum computing framework by IBM. Provides tools for circuit creation, simulation, and execution on real quantum hardware via IBM Quantum Experience.', category: 'Frameworks', relatedTerms: ['IBM Quantum', 'Transpilation'] },
  { term: 'Cirq', definition: 'An open-source quantum computing framework by Google, designed for creating, editing, and running quantum circuits. Optimized for Google\'s quantum processors.', category: 'Frameworks', relatedTerms: ['Google Quantum AI', 'TensorFlow Quantum'] },
  { term: 'PennyLane', definition: 'A cross-platform Python library for differentiable quantum programming. Integrates quantum circuits with machine learning libraries like PyTorch and TensorFlow.', category: 'Frameworks', relatedTerms: ['QML', 'Xanadu'] },
  { term: 'Quantum Channel', definition: 'A mathematical description of how quantum states evolve in the presence of noise. Includes depolarizing, amplitude damping, and phase damping channels.', category: 'Theory', relatedTerms: ['Decoherence', 'Kraus Operators'] },
  { term: 'Entanglement Entropy', definition: 'A measure of entanglement for pure states, quantified by the von Neumann entropy of the reduced density matrix. S = -Tr(ρ log ρ).', category: 'Theory', relatedTerms: ['Entanglement', 'Density Matrix'] },
  { term: 'Quantum Advantage', definition: 'A scenario where a quantum computer solves a practical problem faster or more efficiently than the best known classical algorithm. Distinguished from quantum supremacy which may involve artificial tasks.', category: 'Milestones', relatedTerms: ['Quantum Supremacy', 'NISQ'] },
  { term: 'Variational Circuit', definition: 'A parameterized quantum circuit whose parameters are optimized by a classical optimizer. The core component of variational quantum algorithms like VQE and QAOA.', category: 'Algorithms', relatedTerms: ['VQE', 'QAOA'] },
  { term: 'Quantum Simulation', definition: 'Using a controllable quantum system to simulate another quantum system. Feynman\'s original motivation for quantum computing. Applications include chemistry and materials science.', category: 'Applications', relatedTerms: ['VQE', 'Hamiltonian'] },
  { term: 'Hamiltonian', definition: 'An operator representing the total energy of a quantum system. The time evolution of a quantum state is governed by the Schrödinger equation: iℏ∂|ψ⟩/∂t = H|ψ⟩.', category: 'Theory', relatedTerms: ['Schrödinger Equation', 'Eigenvalue'] },
  { term: 'Adiabatic Quantum Computing', definition: 'A model of quantum computing based on the adiabatic theorem. The system is initialized in the ground state of a simple Hamiltonian and slowly evolved to encode the solution.', category: 'Models', relatedTerms: ['Quantum Annealing', 'Hamiltonian'] },
  { term: 'Topological Quantum Computing', definition: 'A theoretical approach using topological properties (anyons, braiding) for fault-tolerant computation. Information is encoded in global topological features, making it inherently robust against local errors.', category: 'Models', relatedTerms: ['Majorana Fermion', 'Anyon'] },
  { term: 'Trapped Ion', definition: 'A leading quantum computing technology using individual ions confined by electromagnetic fields as qubits. Offers high gate fidelity and long coherence times. Used by IonQ and Quantinuum.', category: 'Hardware', relatedTerms: ['Superconducting Qubit', 'Gate Fidelity'] },
  { term: 'Superconducting Qubit', definition: 'The most common qubit type, using superconducting circuits at millikelvin temperatures. Types include transmon, flux, and charge qubits. Used by IBM, Google, and Rigetti.', category: 'Hardware', relatedTerms: ['Trapped Ion', 'Transmon'] },
  { term: 'Photonic Qubit', definition: 'Qubits encoded in photons (particles of light). Advantages include room-temperature operation and natural compatibility with communication. Used by Xanadu and PsiQuantum.', category: 'Hardware', relatedTerms: ['Linear Optics', 'Boson Sampling'] },
  { term: 'Quantum Repeater', definition: 'A device for extending the range of quantum communication. Uses entanglement swapping and purification to overcome photon loss in optical fibers.', category: 'Communication', relatedTerms: ['QKD', 'Entanglement Swapping'] },
  { term: 'Quantum Internet', definition: 'A network of quantum computers connected by quantum channels for tasks like distributed quantum computing, secure communication, and sensing.', category: 'Communication', relatedTerms: ['QKD', 'Quantum Repeater'] },
  { term: 'Deutsch-Jozsa Algorithm', definition: 'The first algorithm demonstrating exponential quantum speedup. Determines if a function is constant or balanced using a single query, vs. 2^(n-1)+1 queries classically.', category: 'Algorithms', relatedTerms: ['Oracle', 'Bernstein-Vazirani'] },
  { term: 'Bernstein-Vazirani Algorithm', definition: 'A quantum algorithm that finds a hidden binary string s by querying an oracle once, versus n queries classically. Demonstrates the power of quantum parallelism.', category: 'Algorithms', relatedTerms: ['Deutsch-Jozsa', 'Oracle'] },
  { term: 'Simon\'s Algorithm', definition: 'A quantum algorithm that solves Simon\'s problem exponentially faster than any classical algorithm. Inspired the development of Shor\'s algorithm.', category: 'Algorithms', relatedTerms: ['Shor\'s Algorithm', 'Period Finding'] },
  { term: 'EPR Paradox', definition: 'A thought experiment by Einstein, Podolsky, and Rosen (1935) questioning whether quantum mechanics is complete. Led to the concept of entanglement and Bell\'s theorem.', category: 'Theory', relatedTerms: ['Entanglement', 'Bell\'s Theorem'] },
  { term: 'Bell\'s Theorem', definition: 'Proves that no local hidden variable theory can reproduce all predictions of quantum mechanics. Bell inequality violations demonstrate that entanglement correlations exceed classical limits.', category: 'Theory', relatedTerms: ['EPR Paradox', 'CHSH Inequality'] },
  { term: 'Quantum Sensing', definition: 'Using quantum systems to measure physical quantities with precision beyond classical limits. Applications include gravitometry, magnetometry, and medical imaging.', category: 'Applications', relatedTerms: ['Quantum Metrology', 'Heisenberg Limit'] },
  { term: 'Quantum Chemistry', definition: 'The application of quantum computing to simulate chemical systems. Can calculate molecular energies, reaction pathways, and material properties beyond classical computational limits.', category: 'Applications', relatedTerms: ['VQE', 'Molecular Simulation'] },
  { term: 'Quantum Finance', definition: 'Applications of quantum computing in finance including portfolio optimization, option pricing, risk analysis, and fraud detection using quantum algorithms.', category: 'Applications', relatedTerms: ['QAOA', 'Monte Carlo'] },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const categories = useMemo(() => ['all', ...Array.from(new Set(GLOSSARY.map(g => g.category))).sort()], []);

  const filtered = useMemo(() => {
    return GLOSSARY.filter(g => {
      const matchesSearch = search === '' || g.term.toLowerCase().includes(search.toLowerCase()) || g.definition.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedCategory]);

  const letters = useMemo(() => {
    const unique = Array.from(new Set(filtered.map(g => g.term[0].toUpperCase())));
    return unique.sort();
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <BackButton href="/dashboard" label="Back to Dashboard" />
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white flex items-center gap-3"><BookOpen className="w-8 h-8 text-quantum-cyan" /> Quantum Glossary</h1>
        <p className="text-quantum-text-body/60">{GLOSSARY.length} terms across {categories.length - 1} categories</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quantum-text-body/30" />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-quantum-text-body/30 outline-none focus:border-quantum-cyan/40 transition-colors font-medium"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-quantum-cyan text-white' : 'bg-white/5 text-quantum-text-body/40 hover:bg-white/10 border border-white/5'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-8">
        {letters.map(letter => (
          <div key={letter}>
            <h2 className="text-3xl font-black text-quantum-purple mb-4 border-b border-white/5 pb-2">{letter}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {filtered.filter(g => g.term[0].toUpperCase() === letter).map((term) => (
                <button
                  key={term.term}
                  onClick={() => setSelectedTerm(term)}
                  className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-quantum-cyan/20 transition-all text-left group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-quantum-cyan transition-colors">{term.term}</h3>
                      <span className="text-[10px] font-bold text-quantum-text-body/30 uppercase tracking-widest">{term.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-quantum-text-body/20 group-hover:text-quantum-cyan transition-colors" />
                  </div>
                  <p className="text-sm text-quantum-text-body/50 mt-2 line-clamp-2">{term.definition}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTerm(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-quantum-cyan uppercase tracking-widest">{selectedTerm.category}</span>
                  <h2 className="text-2xl font-black text-white mt-1">{selectedTerm.term}</h2>
                </div>
                <button onClick={() => setSelectedTerm(null)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"><X className="w-4 h-4 text-white/60" /></button>
              </div>
              <p className="text-quantum-text-body/80 leading-relaxed">{selectedTerm.definition}</p>
              {selectedTerm.relatedTerms && (
                <div>
                  <h4 className="text-xs font-bold text-quantum-text-body/30 uppercase tracking-widest mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map(rt => (
                      <button key={rt} onClick={() => { const found = GLOSSARY.find(g => g.term === rt); if (found) setSelectedTerm(found); }} className="px-3 py-1.5 rounded-lg bg-quantum-purple/10 border border-quantum-purple/20 text-xs font-bold text-quantum-purple hover:bg-quantum-purple/20 transition-colors">
                        {rt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
