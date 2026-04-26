'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Play, CheckCircle2, Lock, ChevronRight, Code2, Cpu, Star, Filter, Zap, BookOpen, Target, Lightbulb, BrainCircuit } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import dynamic from 'next/dynamic';

const RunnableEditor = dynamic(() => import('@/components/curriculum/RunnableEditor'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-black/40 rounded-xl flex items-center justify-center"><div className="w-6 h-6 border-2 border-quantum-cyan border-t-transparent rounded-full animate-spin" /></div>
});

interface Exercise {
  id: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  category: string;
  description: string;
  xp: number;
  theory: string;
  qiskitGuide: string;
  qiskitCode: string;
  cirqGuide: string;
  cirqCode: string;
  challenge: string;
}

const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "1. Quantum States & Single Qubit Gates",
    difficulty: "beginner",
    category: "Level 1: Foundations",
    description: "Explore the Bloch sphere, qubit initialization, and the fundamental Pauli operators (X, Y, Z) and Hadamard gate.",
    xp: 50,
    theory: "In classical computing, a bit is either 0 or 1. A quantum bit (qubit) can exist in a superposition of states |0⟩ and |1⟩, represented mathematically as |ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1. The Hadamard (H) gate creates an equal superposition, transitioning |0⟩ to |+⟩ = (|0⟩ + |1⟩)/√2. The Pauli-X gate acts as a quantum NOT, flipping |0⟩ to |1⟩. Pauli-Y and Z apply phase rotations around their respective axes on the Bloch sphere.",
    qiskitGuide: "In Qiskit, we use `QuantumCircuit` to define our operations. To apply a Pauli-X gate, use `qc.x(qubit_index)`. To apply a Hadamard gate, use `qc.h(qubit_index)`. Qiskit defaults all qubits to the |0⟩ state upon initialization. You map quantum bits to classical bits for measurement using `qc.measure(qubit, cbit)`.",
    qiskitCode: "from qiskit import QuantumCircuit\n\n# Create a circuit with 1 qubit and 1 classical bit\nqc = QuantumCircuit(1, 1)\n\n# Apply Pauli-X (NOT gate)\nqc.x(0)\n# Apply Hadamard\nqc.h(0)\n\n# Measure to see the probability distribution\nqc.measure(0, 0)\nprint(qc)",
    cirqGuide: "In Google Cirq, qubits are typically defined explicitly on a grid or line using `cirq.GridQubit` or `cirq.LineQubit`. You append operations (gates) to a `cirq.Circuit`. Single-qubit gates are applied via `cirq.X(qubit)` or `cirq.H(qubit)`. Measurements are appended using `cirq.measure(qubit, key='result')`.",
    cirqCode: "import cirq\n\n# Define a qubit\nq = cirq.LineQubit(0)\n\n# Create circuit\ncircuit = cirq.Circuit(\n    cirq.X(q),\n    cirq.H(q),\n    cirq.measure(q, key='m')\n)\n\nprint(circuit)",
    challenge: "Challenge: Add a Pauli-Z gate after the Hadamard gate. How does this change the probabilities when you measure? Why?"
  },
  {
    id: 2,
    title: "2. Multi-Qubit Gates & Entanglement",
    difficulty: "beginner",
    category: "Level 1: Foundations",
    description: "Learn how to use controlled operations to entangle qubits, forming the famous Bell states.",
    xp: 75,
    theory: "Entanglement is a purely quantum phenomenon where two or more qubits become correlated such that the state of one cannot be described independently of the other. The most famous example is the Bell State |Φ+⟩ = (|00⟩ + |11⟩)/√2. This is achieved by placing a control qubit in superposition (using H), and then applying a Controlled-NOT (CNOT) gate. If the control is |1⟩, the target flips; if it's a superposition, both qubits enter a joint superposition.",
    qiskitGuide: "In Qiskit, the CNOT gate is called via `qc.cx(control_qubit, target_qubit)`. To build a Bell state, apply `qc.h(0)` followed by `qc.cx(0, 1)`. Use `qc.measure_all()` to measure all qubits simultaneously.",
    qiskitCode: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)\n# Put qubit 0 in superposition\nqc.h(0)\n# Entangle qubit 1 with qubit 0\nqc.cx(0, 1)\n\nqc.measure_all()\nprint(qc)",
    cirqGuide: "Cirq uses `cirq.CNOT(control, target)`. You can define multiple qubits at once using `cirq.LineQubit.range(n)`. The pattern remains identical to Qiskit structurally.",
    cirqCode: "import cirq\n\n# Get two qubits\nq0, q1 = cirq.LineQubit.range(2)\n\ncircuit = cirq.Circuit(\n    cirq.H(q0),\n    cirq.CNOT(q0, q1),\n    cirq.measure(q0, q1, key='m')\n)\nprint(circuit)",
    challenge: "Challenge: Construct the |Ψ-⟩ Bell state: (|01⟩ - |10⟩)/√2. Hint: You'll need an X gate and a Z gate."
  },
  {
    id: 3,
    title: "3. Parameterized Circuits",
    difficulty: "intermediate",
    category: "Level 2: Advanced Circuits",
    description: "Build dynamic circuits with variable parameters, the foundation of Variational Quantum Algorithms (VQAs).",
    xp: 100,
    theory: "Modern quantum machine learning and variational algorithms (like VQE and QAOA) rely on Parameterized Quantum Circuits (PQCs) or 'Ansatz'. Instead of fixed gates like H or X, we use rotation gates like Rx(θ), Ry(θ), Rz(θ), where θ is a parameter that can be updated iteratively by a classical optimizer to minimize a cost function.",
    qiskitGuide: "Qiskit provides the `Parameter` class. You can define `theta = Parameter('θ')` and pass it to a gate: `qc.rx(theta, 0)`. Later, you bind the parameter using `qc.assign_parameters({theta: 3.14})`.",
    qiskitCode: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import Parameter\nimport numpy as np\n\n# Define parameter\ntheta = Parameter('θ')\n\nqc = QuantumCircuit(1)\n# Apply parameterized rotation\nqc.rx(theta, 0)\nqc.measure_all()\n\n# Bind the parameter to π/2\nbound_qc = qc.assign_parameters({theta: np.pi/2})\nprint(bound_qc)",
    cirqGuide: "In Cirq, `sympy.Symbol` is used to create parameters. You apply `cirq.rx(symbol)(qubit)`. Parameter resolution is typically done at run time using a `cirq.ParamResolver`.",
    cirqCode: "import cirq\nimport sympy\nimport numpy as np\n\nq = cirq.LineQubit(0)\ntheta = sympy.Symbol('theta')\n\ncircuit = cirq.Circuit(\n    cirq.rx(theta)(q),\n    cirq.measure(q, key='m')\n)\n\n# Resolve parameter\nresolver = cirq.ParamResolver({'theta': np.pi/2})\nresolved_circuit = cirq.resolve_parameters(circuit, resolver)\nprint(resolved_circuit)",
    challenge: "Challenge: Create a 2-qubit ansatz with a parameterized Ry rotation on both qubits, followed by a CNOT to entangle them."
  },
  {
    id: 4,
    title: "4. Quantum Teleportation",
    difficulty: "intermediate",
    category: "Level 3: Protocols",
    description: "Transmit an unknown quantum state from Alice to Bob using a shared Bell pair and classical communication.",
    xp: 150,
    theory: "Quantum Teleportation allows transferring quantum information over vast distances without sending the physical particle. Protocol: 1. Alice and Bob share an entangled Bell pair. 2. Alice performs a Bell measurement on her unknown qubit and her half of the pair. 3. She sends the two resulting classical bits to Bob. 4. Bob applies conditional X and Z operations to his half based on Alice's bits to reconstruct the exact original state.",
    qiskitGuide: "Teleportation requires conditional operations (`c_if` or `if_test`). We need 3 qubits (msg, alice, bob) and 2 classical bits to hold Alice's measurements. We use `with qc.if_test((cr, val)):` to conditionally apply Bob's corrections.",
    qiskitCode: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import QuantumRegister, ClassicalRegister\n\nqr = QuantumRegister(3)\ncrz = ClassicalRegister(1)\ncrx = ClassicalRegister(1)\nqc = QuantumCircuit(qr, crz, crx)\n\n# Create unknown state on q0\nqc.rx(1.2, 0)\n\n# Create shared Bell pair (q1, q2)\nqc.h(1)\nqc.cx(1, 2)\n\n# Alice's operations\nqc.cx(0, 1)\nqc.h(0)\nqc.measure(0, crz)\nqc.measure(1, crx)\n\n# Bob's operations\nwith qc.if_test((crx, 1)):\n    qc.x(2)\nwith qc.if_test((crz, 1)):\n    qc.z(2)\nprint(qc)",
    cirqGuide: "Cirq handles this seamlessly by mapping measurement keys to conditional logic using `gate.with_classical_controls('key')`.",
    cirqCode: "import cirq\n\nmsg, alice, bob = cirq.LineQubit.range(3)\ncircuit = cirq.Circuit(\n    cirq.rx(1.2)(msg),\n    cirq.H(alice),\n    cirq.CNOT(alice, bob),\n    cirq.CNOT(msg, alice),\n    cirq.H(msg),\n    cirq.measure(msg, key='z_bit'),\n    cirq.measure(alice, key='x_bit'),\n    cirq.X(bob).with_classical_controls('x_bit'),\n    cirq.Z(bob).with_classical_controls('z_bit')\n)\nprint(circuit)",
    challenge: "Challenge: Add an inverse Rx(1.2) operation on Bob's qubit at the very end to prove that the state was successfully teleported (it should always measure 0)."
  },
  {
    id: 5,
    title: "5. Superdense Coding",
    difficulty: "intermediate",
    category: "Level 3: Protocols",
    description: "Transmit two classical bits using a single entangled quantum bit.",
    xp: 150,
    theory: "Superdense coding is the inverse of teleportation. By sharing a single Bell pair, Alice can transmit two classical bits to Bob by applying a local quantum gate to her qubit and sending just that one qubit to Bob. Protocol: 1. Share Bell Pair. 2. If msg is '00', Alice applies I; '01' applies X; '10' applies Z; '11' applies XZ. 3. Bob receives Alice's qubit, applies CNOT and H, and measures.",
    qiskitGuide: "We initialize a 2-qubit circuit. Create the Bell state. Depending on the classical message (e.g. '10'), Alice applies the corresponding gate. Bob then decodes.",
    qiskitCode: "from qiskit import QuantumCircuit\n\nmessage = '10'\nqc = QuantumCircuit(2, 2)\n\n# 1. Share Bell Pair\nqc.h(0)\nqc.cx(0, 1)\n\n# 2. Alice encodes message '10' (Applies Z)\nif message[0] == '1':\n    qc.z(0)\nif message[1] == '1':\n    qc.x(0)\n    \n# 3. Bob decodes\nqc.cx(0, 1)\nqc.h(0)\nqc.measure([0,1], [0,1])\n\nprint(qc)",
    cirqGuide: "Cirq implements this identically. The logic of mapping the classical bitstring into Pauli operations on the first qubit is standard.",
    cirqCode: "import cirq\n\nmessage = '11'\nq0, q1 = cirq.LineQubit.range(2)\ncircuit = cirq.Circuit(\n    cirq.H(q0), cirq.CNOT(q0, q1)\n)\n\nif message[0] == '1': circuit.append(cirq.Z(q0))\nif message[1] == '1': circuit.append(cirq.X(q0))\n\ncircuit.append([cirq.CNOT(q0, q1), cirq.H(q0), cirq.measure(q0, q1, key='m')])\nprint(circuit)",
    challenge: "Challenge: Test all 4 possible messages ('00', '01', '10', '11') to ensure the decoding circuit works perfectly for all cases."
  },
  {
    id: 6,
    title: "6. Quantum Fourier Transform (QFT)",
    difficulty: "advanced",
    category: "Level 4: Algorithms",
    description: "Implement the QFT, the engine behind Shor's factoring algorithm and Quantum Phase Estimation.",
    xp: 200,
    theory: "The QFT translates quantum states from the computational basis into the Fourier basis. Mathematically, it applies a discrete Fourier transform to the amplitudes of the quantum state. It is composed of Hadamard gates and controlled-phase rotations. For an n-qubit system, it requires O(n²) gates, providing an exponential speedup over the classical FFT which takes O(n2ⁿ).",
    qiskitGuide: "In Qiskit, QFT involves applying a Hadamard to qubit j, followed by controlled phase rotations `qc.cp(angle, control, target)` from all qubits k > j. At the very end, the order of the qubits must be reversed using SWAP gates.",
    qiskitCode: "from qiskit import QuantumCircuit\nimport numpy as np\n\nn = 3\nqc = QuantumCircuit(n)\n\nfor j in range(n):\n    qc.h(j)\n    for k in range(j + 1, n):\n        angle = np.pi / (2 ** (k - j))\n        qc.cp(angle, k, j)\n\n# Swap qubits to match standard QFT ordering\nfor i in range(n // 2):\n    qc.swap(i, n - i - 1)\n    \nprint(qc)",
    cirqGuide: "Cirq provides a built-in `cirq.qft` function, but writing it manually helps understanding. We use `cirq.CZPowGate(exponent)` for the controlled phase shifts.",
    cirqCode: "import cirq\n\nn = 3\nqubits = cirq.LineQubit.range(n)\ncircuit = cirq.Circuit()\n\nfor i in range(n):\n    circuit.append(cirq.H(qubits[i]))\n    for j in range(i + 1, n):\n        circuit.append((cirq.CZ ** (1 / 2**(j-i)))(qubits[j], qubits[i]))\n\nfor i in range(n // 2):\n    circuit.append(cirq.SWAP(qubits[i], qubits[n-i-1]))\n\nprint(circuit)",
    challenge: "Challenge: Prepare the state |101⟩ before applying the QFT, and observe the specific phase factors attached to the superposition."
  },
  {
    id: 7,
    title: "7. Grover's Search Algorithm",
    difficulty: "advanced",
    category: "Level 4: Algorithms",
    description: "Search an unstructured database with quadratic speedup via Amplitude Amplification.",
    xp: 250,
    theory: "Grover's algorithm searches N items in O(√N) time. It consists of an Oracle and a Diffuser. The Oracle flips the phase (multiply by -1) of the target state. The Diffuser performs inversion about the average amplitude, amplifying the probability of the target state while shrinking the others. This process is repeated ≈ (π/4)√N times.",
    qiskitGuide: "For a simple 2-qubit search (N=4), the Oracle for |11⟩ is a single CZ gate. The Diffuser consists of applying H and X to all qubits, a multi-controlled Z (or CZ), and applying X and H again.",
    qiskitCode: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2)\n# 1. Initialization\nqc.h([0,1])\n\n# 2. Oracle for |11>\nqc.cz(0, 1)\n\n# 3. Diffuser\nqc.h([0,1])\nqc.x([0,1])\nqc.cz(0, 1)\nqc.x([0,1])\nqc.h([0,1])\n\nqc.measure_all()\nprint(qc)",
    cirqGuide: "In Cirq, the logic is identical. `cirq.H.on_each(*qubits)` is a convenient way to broadcast gates across multiple qubits.",
    cirqCode: "import cirq\n\nq = cirq.LineQubit.range(2)\ncircuit = cirq.Circuit(\n    cirq.H.on_each(*q),\n    # Oracle\n    cirq.CZ(q[0], q[1]),\n    # Diffuser\n    cirq.H.on_each(*q),\n    cirq.X.on_each(*q),\n    cirq.CZ(q[0], q[1]),\n    cirq.X.on_each(*q),\n    cirq.H.on_each(*q),\n    cirq.measure(*q, key='m')\n)\nprint(circuit)",
    challenge: "Challenge: Modify the Oracle to find the state |01⟩ instead. You will need to sandwich the CZ gate with Pauli-X gates on the appropriate qubit."
  },
  {
    id: 8,
    title: "8. Quantum Phase Estimation (QPE)",
    difficulty: "advanced",
    category: "Level 4: Algorithms",
    description: "Estimate the eigenvalue of a unitary operator, critical for quantum chemistry and Shor's algorithm.",
    xp: 250,
    theory: "QPE estimates the phase θ in U|ψ⟩ = e^(2πiθ)|ψ⟩. It requires two registers: a counting register of n qubits initialized in |+⟩, and a target register in eigenstate |ψ⟩. We apply controlled-U^(2^j) operations from the counting register to the target. Finally, we apply an inverse QFT to the counting register to read out the binary fractions of the phase.",
    qiskitGuide: "We use a T-gate as our unitary, which has phase e^(iπ/4), meaning θ = 1/8 (since 2π*1/8 = π/4). We need 3 counting qubits to exactly represent 1/8 (which is 0.001 in binary).",
    qiskitCode: "from qiskit import QuantumCircuit\nfrom qiskit.circuit.library import QFT\nimport numpy as np\n\nqc = QuantumCircuit(4, 3)\n# Target register in |1> (eigenstate of T gate)\nqc.x(3)\n# Counting register in superposition\nqc.h([0,1,2])\n\n# Apply controlled-U operations (C-T gate)\nrepetitions = 1\nfor counting_qubit in range(3):\n    for _ in range(repetitions):\n        qc.cp(np.pi/4, counting_qubit, 3) # Controlled-T\n    repetitions *= 2\n\n# Apply inverse QFT\nqc.append(QFT(3, inverse=True), [0,1,2])\nqc.measure([0,1,2], [0,1,2])\nprint(qc)",
    cirqGuide: "In Cirq, we manually apply the controlled phase gates. The Inverse QFT is constructed similarly to the QFT but with negative phase angles and reversed gate order.",
    cirqCode: "import cirq\nimport numpy as np\n\nq = cirq.LineQubit.range(4)\ncircuit = cirq.Circuit(\n    cirq.X(q[3]),\n    cirq.H.on_each(*q[0:3])\n)\n\nreps = 1\nfor i in range(3):\n    for _ in range(reps):\n        circuit.append((cirq.Z**0.25).controlled().on(q[i], q[3]))\n    reps *= 2\n\n# (Simplified) Add Inverse QFT manually or use cirq.qft with inverse=True if available\ncircuit.append(cirq.qft(*q[0:3], without_reverse=False)**-1)\ncircuit.append(cirq.measure(*q[0:3], key='m'))\nprint(circuit)",
    challenge: "Challenge: Change the target gate from a T-gate to an S-gate. What is the new expected binary readout phase?"
  },
  {
    id: 9,
    title: "9. Variational Quantum Eigensolver (VQE)",
    difficulty: "master",
    category: "Level 5: Hybrid Quantum-Classical",
    description: "Use a hybrid quantum-classical loop to find the ground state energy of a Hamiltonian.",
    xp: 300,
    theory: "VQE is the flagship algorithm for NISQ computers. It uses the variational principle: the expectation value of a Hamiltonian H for any parameterized state |ψ(θ)⟩ is always greater than or equal to the true ground state energy. The quantum computer evaluates ⟨ψ(θ)|H|ψ(θ)⟩, and a classical optimizer (like COBYLA or Adam) updates θ to minimize this value.",
    qiskitGuide: "While full VQE requires a classical optimizer loop, we can construct the 'Ansatz' evaluation circuit. Here we build an Ry-CX ansatz and prepare it for measuring the Z⊗Z observable.",
    qiskitCode: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import ParameterVector\n\n# Define 4 parameters for a 2-qubit ansatz\ntheta = ParameterVector('θ', 4)\nqc = QuantumCircuit(2)\n\n# Layer 1: Rotations\nqc.ry(theta[0], 0)\nqc.ry(theta[1], 1)\n# Entanglement\nqc.cx(0, 1)\n# Layer 2: Rotations\nqc.ry(theta[2], 0)\nqc.ry(theta[3], 1)\n\n# Ready to measure Z0*Z1\nprint(qc)",
    cirqGuide: "In Cirq, ansatz construction leverages `sympy`. The evaluation of observables is usually handled by `cirq.Simulator().simulate_expectation_values()`.",
    cirqCode: "import cirq\nimport sympy\n\nq = cirq.LineQubit.range(2)\nsyms = sympy.symbols('t0 t1 t2 t3')\n\ncircuit = cirq.Circuit(\n    cirq.ry(syms[0])(q[0]),\n    cirq.ry(syms[1])(q[1]),\n    cirq.CNOT(q[0], q[1]),\n    cirq.ry(syms[2])(q[0]),\n    cirq.ry(syms[3])(q[1])\n)\nprint(circuit)",
    challenge: "Challenge: Add a layer of Rz rotations after the Ry rotations to make the ansatz more expressive (Hardware Efficient Ansatz)."
  },
  {
    id: 10,
    title: "10. Quantum Approximate Optimization (QAOA)",
    difficulty: "master",
    category: "Level 5: Hybrid Quantum-Classical",
    description: "Solve combinatorial optimization problems (like MaxCut) using alternating operator ansatz.",
    xp: 300,
    theory: "QAOA solves problems like MaxCut by evolving a quantum state through alternating applications of a Cost Hamiltonian (encoding the problem graph) and a Mixer Hamiltonian (which explores the solution space). Like VQE, the parameters (γ for cost, β for mixer) are optimized classically.",
    qiskitGuide: "For a 2-node graph connected by an edge, the Cost Hamiltonian involves a ZZ interaction: CNOT, Rz(γ), CNOT. The Mixer Hamiltonian is simply Rx(β) on all qubits.",
    qiskitCode: "from qiskit import QuantumCircuit\nfrom qiskit.circuit import Parameter\n\ngamma = Parameter('γ')\nbeta = Parameter('β')\n\nqc = QuantumCircuit(2)\n# Initial superposition\nqc.h([0,1])\n\n# Cost Hamiltonian (ZZ interaction)\nqc.cx(0, 1)\nqc.rz(gamma, 1)\nqc.cx(0, 1)\n\n# Mixer Hamiltonian (X rotations)\nqc.rx(beta, 0)\nqc.rx(beta, 1)\n\nprint(qc)",
    cirqGuide: "Cirq implements the Cost operator directly using `cirq.ZZPowGate`, which is a powerful shortcut for defining interaction terms in QAOA.",
    cirqCode: "import cirq\nimport sympy\n\nq = cirq.LineQubit.range(2)\ngamma = sympy.Symbol('gamma')\nbeta = sympy.Symbol('beta')\n\ncircuit = cirq.Circuit(\n    cirq.H.on_each(*q),\n    # Cost operator\n    (cirq.ZZ**gamma)(q[0], q[1]),\n    # Mixer operator\n    cirq.rx(beta).on_each(*q)\n)\nprint(circuit)",
    challenge: "Challenge: Expand this circuit to 3 nodes connected in a triangle. You will need 3 Cost Hamiltonian ZZ interactions."
  },
  {
    id: 11,
    title: "11. Shor's Algorithm (Period Finding)",
    difficulty: "master",
    category: "Level 6: Breaking Cryptography",
    description: "Understand the core quantum subroutine that factorizes large numbers.",
    xp: 400,
    theory: "Shor's algorithm breaks RSA encryption by efficiently factoring large integers. The classical reduction turns factoring into finding the period 'r' of the function f(x) = a^x mod N. The quantum subroutine evaluates this function in superposition and uses QPE (Quantum Phase Estimation) to extract the period from the resulting phases. We implement a modular exponentiation oracle.",
    qiskitGuide: "Implementing a full modular exponentiation oracle is extremely complex. We represent a simplified version where the oracle applies a pre-compiled modular multiplier.",
    qiskitCode: "from qiskit import QuantumCircuit\n\n# 3 counting qubits, 2 target qubits\nqc = QuantumCircuit(5)\nqc.h([0,1,2])\nqc.x(4) # Target state |1>\n\n# Pseudo-Oracle: Controlled modular multiplication\n# (Simplified representation)\nqc.cswap(0, 3, 4)\nqc.cx(1, 3)\nqc.cx(2, 4)\n\n# QFT Dagger would go here\nprint(qc)",
    cirqGuide: "In Cirq, building modular arithmetic requires custom gate definitions. We simulate the high-level architecture of the registers.",
    cirqCode: "import cirq\n\ncount = cirq.LineQubit.range(3)\ntarget = cirq.LineQubit.range(3, 5)\ncircuit = cirq.Circuit(\n    cirq.H.on_each(*count),\n    cirq.X(target[1]),\n    # Pseudo-operations representing a^x mod N\n    cirq.CSWAP(count[0], target[0], target[1])\n)\nprint(circuit)",
    challenge: "Challenge: Read about 'Modular Exponentiation' circuits and attempt to build a simple multiplier by 2 modulo 3."
  },
  {
    id: 12,
    title: "12. Quantum Error Mitigation (Basic)",
    difficulty: "master",
    category: "Level 6: Noise & Hardware",
    description: "Implement a 3-qubit bit-flip code to protect a logical qubit from noise.",
    xp: 400,
    theory: "Current quantum computers are noisy (NISQ era). A bit-flip error can ruin a calculation. The simplest error correction code encodes 1 logical qubit into 3 physical qubits (|ψ⟩ → α|000⟩ + β|111⟩). If noise flips one of the qubits, we can use two ancilla qubits to perform 'syndrome measurement' without destroying the superposition. We then apply a classical correction based on the majority vote.",
    qiskitGuide: "Encode by entangling data qubit 0 with 1 and 2. Introduce an intentional error. Use ancillas (qubits 3,4) to parity-check the pairs (0,1) and (1,2) via CNOTs. Measure the ancillas to determine which qubit flipped.",
    qiskitCode: "from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(5, 2)\n# Encode logical |1> state into 3 qubits\nqc.x(0)\nqc.cx(0, 1)\nqc.cx(0, 2)\n\n# NOISE: Introduce a bit-flip on qubit 1\nqc.x(1)\n\n# Syndrome extraction to ancillas\nqc.cx(0, 3); qc.cx(1, 3)\nqc.cx(1, 4); qc.cx(2, 4)\n\n# Measure ancillas\nqc.measure([3,4], [0,1])\nprint(qc)",
    cirqGuide: "Cirq excels at modeling noise channels (like Depolarizing or Amplitude Damping). Here we manually insert the bit flip error.",
    cirqCode: "import cirq\n\ndata = cirq.LineQubit.range(3)\nanc = cirq.LineQubit.range(3, 5)\ncircuit = cirq.Circuit(\n    cirq.X(data[0]), cirq.CNOT(data[0], data[1]), cirq.CNOT(data[0], data[2]),\n    # Noise\n    cirq.X(data[1]),\n    # Syndrome\n    cirq.CNOT(data[0], anc[0]), cirq.CNOT(data[1], anc[0]),\n    cirq.CNOT(data[1], anc[1]), cirq.CNOT(data[2], anc[1]),\n    cirq.measure(*anc, key='syndrome')\n)\nprint(circuit)",
    challenge: "Challenge: Add classical IF statements (like in Teleportation) to automatically apply an X gate to correct the specific qubit that flipped based on the syndrome."
  }
];

const DIFFICULTY_COLORS = {
  beginner: { bg: 'bg-quantum-green/10', text: 'text-quantum-green', border: 'border-quantum-green/20' },
  intermediate: { bg: 'bg-quantum-cyan/10', text: 'text-quantum-cyan', border: 'border-quantum-cyan/20' },
  advanced: { bg: 'bg-quantum-purple/10', text: 'text-quantum-purple', border: 'border-quantum-purple/20' },
  master: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
};

export default function PracticalsPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'theory' | 'qiskit' | 'cirq' | 'challenge'>('theory');

  const categories = ['all', ...Array.from(new Set(EXERCISES.map(e => e.category)))];
  const filtered = filter === 'all' ? EXERCISES : EXERCISES.filter(e => e.category === filter);

  if (selectedExercise) {
    // Dynamic Guided Content
    const manualData = {
      theory: selectedExercise.theory,
      qiskit: selectedExercise.qiskitGuide,
      cirq: selectedExercise.cirqGuide,
      challenge: selectedExercise.challenge,
    };

    const TABS = [
      { id: 'theory', label: 'Theory', icon: Lightbulb },
      { id: 'qiskit', label: 'Qiskit Guide', icon: Code2 },
      { id: 'cirq', label: 'Cirq Guide', icon: Cpu },
      { id: 'challenge', label: 'Challenge', icon: Target },
    ] as const;

    const currentLanguage = activeTab === 'cirq' ? 'python' : 'python';
    const currentStarterCode = activeTab === 'cirq' ? selectedExercise.cirqCode : selectedExercise.qiskitCode;

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <button onClick={() => setSelectedExercise(null)} className="flex items-center gap-2 text-sm font-bold text-quantum-text-body/40 hover:text-white transition-colors">
          ← Back to lab selection
        </button>
        
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Guided Manual Panel */}
          <div className="xl:w-[500px] shrink-0 space-y-4 flex flex-col">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-quantum-black/40 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-quantum-cyan/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${DIFFICULTY_COLORS[selectedExercise.difficulty].bg} ${DIFFICULTY_COLORS[selectedExercise.difficulty].text} ${DIFFICULTY_COLORS[selectedExercise.difficulty].border} border`}>
                  {selectedExercise.difficulty}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-quantum-cyan bg-quantum-cyan/10 px-3 py-1 rounded-full border border-quantum-cyan/20">
                  <Zap className="w-3 h-3" /> {selectedExercise.xp} XP
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2 relative z-10 leading-tight">{selectedExercise.title}</h2>
              <p className="text-sm text-quantum-text-body/60 font-medium relative z-10 leading-relaxed">{selectedExercise.description}</p>
            </div>

            {/* Guided Tabs */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden flex-1 flex flex-col shadow-xl">
              <div className="flex overflow-x-auto border-b border-white/5 bg-white/[0.02] shrink-0">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 text-[11px] uppercase tracking-widest font-black transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? (tab.id === 'qiskit' ? 'bg-[#6929C4]/20 text-white border-b-2 border-[#6929C4]' :
                           tab.id === 'cirq' ? 'bg-[#F9AB00]/20 text-white border-b-2 border-[#F9AB00]' :
                           'bg-quantum-cyan/20 text-white border-b-2 border-quantum-cyan')
                        : 'text-quantum-text-body/50 hover:bg-white/5 hover:text-white border-b-2 border-transparent'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id && tab.id === 'qiskit' ? 'text-[#6929C4]' : activeTab === tab.id && tab.id === 'cirq' ? 'text-[#F9AB00]' : ''}`} /> 
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-8 flex-1 bg-quantum-black/40 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="prose prose-invert prose-sm"
                  >
                    <p className="text-quantum-text-body/90 leading-loose text-[15px] font-medium">{manualData[activeTab]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={() => {
                if (!completedExercises.includes(selectedExercise.id)) {
                  setCompletedExercises(prev => [...prev, selectedExercise.id]);
                }
                setSelectedExercise(null);
              }}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${completedExercises.includes(selectedExercise.id) ? 'bg-quantum-green/10 text-quantum-green border border-quantum-green/30' : 'bg-gradient-to-r from-quantum-green to-quantum-cyan text-white hover:scale-[1.02] active:scale-95 shadow-glow-cyan'}`}
            >
              <CheckCircle2 className="w-5 h-5" /> 
              {completedExercises.includes(selectedExercise.id) ? 'Lab Completed' : `Mark Lab Complete (+${selectedExercise.xp} XP)`}
            </button>
          </div>

          {/* Code Editor */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 min-h-[700px] bg-[#0A0A0A] flex flex-col shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 z-10 pointer-events-none">
                {activeTab === 'cirq' ? (
                   <span className="text-xs font-black uppercase tracking-widest text-[#F9AB00]/50 border border-[#F9AB00]/20 bg-[#F9AB00]/10 px-3 py-1 rounded-full">Cirq Environment</span>
                ) : (
                   <span className="text-xs font-black uppercase tracking-widest text-[#6929C4]/50 border border-[#6929C4]/20 bg-[#6929C4]/10 px-3 py-1 rounded-full">Qiskit Environment</span>
                )}
            </div>
            <RunnableEditor initialCode={currentStarterCode} language={currentLanguage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <BackButton href="/dashboard" label="Back to Dashboard" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-quantum-green relative top-1" />
            Practicals Laboratory
          </h1>
          <p className="text-quantum-text-body/60 max-w-2xl">Guided hands-on quantum computing exercises. Follow the step-by-step manuals to complete your builds and earn XP.</p>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white/5 px-4 py-3 rounded-xl border border-white/10 shrink-0">
          <span className="text-quantum-text-body/80 font-bold whitespace-nowrap">{completedExercises.length} / {EXERCISES.length} completed</span>
          <div className="w-32 h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-quantum-green to-quantum-cyan rounded-full transition-all duration-1000 relative" style={{ width: `${(completedExercises.length / EXERCISES.length) * 100}%` }}>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              filter === cat 
                ? 'bg-quantum-green text-quantum-black shadow-glow-green' 
                : 'bg-white/5 text-quantum-text-body/40 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((ex) => {
          const isComplete = completedExercises.includes(ex.id);
          return (
            <motion.button
              key={ex.id}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExercise(ex)}
              className={`glass-panel p-5 rounded-2xl border text-left transition-all flex flex-col h-[200px] ${
                isComplete ? 'border-quantum-green/30 bg-quantum-green/5' : 'border-white/5 hover:border-quantum-cyan/40 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-3 w-full">
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${DIFFICULTY_COLORS[ex.difficulty].bg} ${DIFFICULTY_COLORS[ex.difficulty].text} border ${DIFFICULTY_COLORS[ex.difficulty].border}`}>
                  {ex.difficulty}
                </span>
                {isComplete && <div className="w-6 h-6 rounded-full bg-quantum-green/20 flex items-center justify-center"><CheckCircle2 className="w-3.5 h-3.5 text-quantum-green" /></div>}
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-tight">{ex.title}</h3>
              <p className="text-xs text-quantum-text-body/50 mb-auto line-clamp-3">{ex.description}</p>
              
              <div className="flex items-center justify-between w-full pt-3 border-t border-white/5 mt-3">
                <span className="text-[9px] font-black text-quantum-text-body/30 uppercase tracking-widest">{ex.category}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-quantum-cyan"><Zap className="w-3 h-3 text-quantum-cyan" />{ex.xp} XP</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
