import { Level, Topic, QuizQuestion } from './types';
import { ALL_TOPICS, ALL_QUIZZES } from './levels';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Quantum Foundations",
    description: "What is Quantum Computing, Classical vs Quantum Computing, History of Quantum Computing, Quantum Mechanics Basics, Wave Particle Duality, The Measurement Problem, Quantum vs Classical Bits, Superposition Introduction.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 2,
    name: "Linear Algebra for Quantum",
    description: "Vectors and Vector Spaces, Matrices and Matrix Operations, Complex Numbers in Quantum, Inner Products and Norms, Eigenvalues and Eigenvectors, Tensor Products, Dirac Notation, Hilbert Spaces.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 3,
    name: "Qubit Mechanics",
    description: "What is a Qubit, Qubit Representation, The Bloch Sphere, Qubit State Vectors, Superposition in Depth, Quantum Measurement, Probability Amplitudes, Multiple Qubits.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 4,
    name: "Quantum Gates",
    description: "Single Qubit Gates, Pauli X Y Z Gates, Hadamard Gate, Phase and T Gates, Rotation Gates, Multi Qubit Gates, CNOT Gate, Toffoli Gate.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 5,
    name: "Quantum Circuits",
    description: "Circuit Diagrams, Building Your First Circuit, Circuit Depth and Width, Universal Gate Sets, Reversible Computation, Circuit Optimization, Quantum Parallelism, Interference in Circuits.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 6,
    name: "Entanglement",
    description: "What is Entanglement, Bell States, EPR Paradox, Entanglement Swapping, Quantum Teleportation, Superdense Coding, Entanglement Measures, Multipartite Entanglement.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 7,
    name: "Quantum Algorithms",
    description: "Algorithm Design Principles, Deutsch Algorithm, Deutsch Jozsa Algorithm, Bernstein Vazirani Algorithm, Simons Algorithm, Quantum Fourier Transform, Phase Estimation, Amplitude Amplification, HHL Algorithm, Advanced Quantum Walks.",
    topicCount: 10,
    isPremium: false
  },
  {
    id: 8,
    name: "Quantum Complexity",
    description: "Complexity Classes, BQP and QMA, Quantum Speedup, Oracle Problems, Query Complexity, Grovers Algorithm, Shors Algorithm, Quantum Walks, Advanced Algorithms, Quantum Signal Processing, Quantum Singular Value Transformation.",
    topicCount: 11,
    isPremium: false
  },
  {
    id: 9,
    name: "Error Correction",
    description: "Quantum Noise and Decoherence, Classical Error Correction, Quantum Error Correction Basics, Bit Flip Code, Phase Flip Code, Shor Code, Stabilizer Codes, Fault Tolerant Quantum Computing, Open Quantum Systems, Lindblad Master Equation, Quantum Channels.",
    topicCount: 11,
    isPremium: false
  },
  {
    id: 10,
    name: "Physical Implementation",
    description: "Superconducting Qubits, Trapped Ion Qubits, Photonic Quantum Computing, Topological Qubits, NV Centers in Diamond, Neutral Atom Qubits, Quantum Hardware Comparison, Cryogenics and Dilution Refrigerators, Control Electronics and Software Stack.",
    topicCount: 8,
    isPremium: false
  },
  {
    id: 11,
    name: "Quantum Sensing & Metrology",
    description: "Quantum Sensing Principles, Magnetometry, Atomic Clocks, Quantum Imaging, Gravimetry, Quantum Radar, Distributed Sensing, Sensing in Biology.",
    topicCount: 5,
    isPremium: false
  },
  {
    id: 12,
    name: "Quantum Software & Programming",
    description: "The Quantum Software Stack, OpenQASM, Pulse-Level Control, Quantum Compilation, Circuit Optimization, Hybrid Classical-Quantum Algorithms, Verification & Benchmarking, Resource Estimation.",
    topicCount: 5,
    isPremium: false
  },
  {
    id: 13,
    name: "Quantum Machine Learning",
    description: "Linear Algebra Review for QML, Quantum Feature Maps, Variational Quantum Classifiers (VQC), Quantum Neural Networks, Quantum Kernels, Quantum PCA, Quantum GANs, Deployment and Future of QML.",
    topicCount: 5,
    isPremium: false
  },
  {
    id: 14,
    name: "Quantum Cryptography & Security",
    description: "Classical Cryptography, The Threat of Shors Algorithm, Post-Quantum Cryptography (NIST), Quantum Key Distribution (QKD), BB84 Protocol, Ekert Protocol, Device-Independent QKD, Quantum-Safe Networking.",
    topicCount: 5,
    isPremium: false
  },
  {
    id: 15,
    name: "Quantum Cloud Platforms",
    description: "IBM Quantum, Google Quantum AI, Amazon Braket, Azure Quantum, IonQ and Rigetti, Xanadu and Photonics, PennyLane and Frameworks, The Future Roadmap.",
    topicCount: 5,
    isPremium: false
  }
];

export const TOPICS: Record<number, Topic[]> = ALL_TOPICS;

export const QUIZ_DATA: Record<string, { questions: QuizQuestion[] }> = ALL_QUIZZES;
