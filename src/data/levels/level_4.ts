import { Topic, QuizQuestion } from '../types';

export const LEVEL_4_TOPICS: Topic[] = [
  {
    id: "L4-T1",
    levelId: 4,
    name: "Single Qubit Gates",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L3-T3", name: "The Bloch Sphere" }] },
      whatYouWillLearn: [
        "The mathematical definition of a single-qubit gate.",
        "The requirement of Unitarity.",
        "Visualizing gate operations as rotations on the Bloch Sphere.",
        "The relationship between logic gates and matrix multiplication."
      ],
      introduction: "Single-qubit gates are the fundamental building blocks of quantum algorithms. In classical computing, a NOT gate flips a bit from 0 to 1. In quantum computing, gates perform continuous transformations on the state of a qubit. Mathematically, a quantum gate is represented by a 2x2 unitary matrix. Because quantum mechanics is reversible, every valid gate (except measurement) must have an inverse. When a gate is applied, it physically rotates the qubit's state vector across the surface of the Bloch Sphere.",
      whyItMatters: "Every complex quantum algorithm, from Shor's to VQE, is ultimately decomposed into a series of single and multi-qubit gates. Understanding these basics is like learning the alphabet of quantum programming.",
      keyConcepts: [
        {
          heading: "Matrix Transformation",
          description: "Applying a gate $U$ to a state $|\\psi\\rangle$ results in a new state $|\\psi'\\rangle = U|\\psi\\rangle$."
        },
        {
          heading: "Unitarity",
          description: "A matrix $U$ is unitary if $U^{\\dagger}U = I$. This ensures the total probability remains 1 and the operation is reversible."
        },
        {
          heading: "Reversibility",
          description: "Unlike classical AND/OR gates, quantum gates do not lose information. You can always 'undo' a gate by applying its conjugate transpose."
        }
      ],
      mathematics: "$$ U = \\begin{pmatrix} u_{00} & u_{01} \\\\ u_{10} & u_{11} \\end{pmatrix}, \\quad U^{\\dagger}U = I $$",
      analogy: "If a qubit is a point on a globe, a single-qubit gate is like a command to 'rotate the globe 90 degrees East'.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(1)\nqc.h(0) # Hadamard\nqc.x(0) # Pauli-X\nprint(qc)",
        cirq: "import cirq\nq = cirq.LineQubit(0)\ncircuit = cirq.Circuit(cirq.H(q), cirq.X(q))\nprint(circuit)"
      },
      realWorldApplications: [
        { title: "State Preparation", explanation: "Calculations start by moving qubits from the default |0> state to specific superposition states using single-qubit gates." }
      ],
      commonMistakes: [
        { mistake: "Assuming all matrices are valid gates.", correction: "Only Unitary matrices that preserve the norm of the vector are valid quantum gates." }
      ],
      summary: [
        "Single-qubit gates are 2x2 unitary matrices.",
        "They rotate the state on the Bloch Sphere.",
        "All quantum gates are reversible.",
        "They are the basic units of quantum logic."
      ],
      quiz: {
        topicId: "L4-T1",
        questions: [
          {
            question: "What mathematical property must all quantum gates satisfy?",
            options: ["They must be diagonal.", "They must be Unitary.", "They must consist only of real numbers.", "They must be irreversible."],
            correctIndex: 1,
            explanation: "Unitarity ($U^{\\dagger}U = I$) preserves probability and ensures reversibility."
          },
          {
            question: "How is a quantum gate applied to a state vector mathematically?",
            options: ["Vector addition.", "Matrix inversion.", "Matrix-vector multiplication.", "Scalar division."],
            correctIndex: 2,
            explanation: "The new state is found by multiplying the gate's matrix by the current state vector."
          },
          {
            question: "Why can't a measurement be treated as a standard quantum gate?",
            options: ["It is too fast.", "It is irreversible and collapses the wavefunction.", "It doesn't use matrices.", "It only works on classical bits."],
            correctIndex: 1,
            explanation: "Gates are unitary/reversible; measurement is a non-unitary projection that destroys superposition."
          }
        ]
      }
    }
  },
  {
    id: "L4-T2",
    levelId: 4,
    name: "Pauli X Y Z Gates",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T1", name: "Single Qubit Gates" }] },
      whatYouWillLearn: [
        "The definition and matrices of the Pauli gates.",
        "The action of the X-gate (Quantum NOT).",
        "The action of the Y and Z gates.",
        "The concept of bit-flips and phase-flips."
      ],
      introduction: "The Pauli gates (X, Y, and Z) are the most fundamental single-qubit operations. Named after physicist Wolfgang Pauli, they represent rotations of 180 degrees around the X, Y, and Z axes of the Bloch Sphere, respectively. The X-gate is the 'Quantum NOT' gate because it swaps $|0\\rangle$ and $|1\\rangle$. The Z-gate is a 'Phase Flip' gate, flipping the sign of the $|1\\rangle$ component without changing measurement probabilities.",
      whyItMatters: "Pauli operators form a basis for all other local operators. Any single-qubit operation can be expressed as a linear combination of the Identity and Pauli matrices.",
      keyConcepts: [
        {
          heading: "X-Gate (Bit Flip)",
          description: "Maps $|0\\rangle \\rightarrow |1\\rangle$ and $|1\\rangle \\rightarrow |0\\rangle$. It is the quantum equivalent of the classical NOT gate."
        },
        {
          heading: "Z-Gate (Phase Flip)",
          description: "Maps $|0\\rangle \\rightarrow |0\\rangle$ and $|1\\rangle \\rightarrow -|1\\rangle$. It changes the relative phase by 180 degrees."
        },
        {
          heading: "Y-Gate",
          description: "A combination of a bit-flip and a phase-flip. It maps $|0\\rangle \\rightarrow i|1\\rangle$ and $|1\\rangle \\rightarrow -i|0\\rangle$."
        }
      ],
      mathematics: "$$ X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad Y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}, \\quad Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} $$",
      analogy: "X is like flipping a light switch. Z is like leaving the light on but changing the color of the bulb without you noticing until you look at the interference.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "qc.x(0); qc.y(0); qc.z(0);",
        cirq: "cirq.X(q), cirq.Y(q), cirq.Z(q)"
      },
      realWorldApplications: [
        { title: "Error Correction", explanation: "Bit-flip and Phase-flip errors are the primary types of noise in quantum computers, and we use X and Z gates to fix them." }
      ],
      commonMistakes: [
        { mistake: "Thinking the Z-gate changes measurement probabilities.", correction: "The Z-gate only changes the phase. Since probability is the square of the amplitude, $(-1)^2 = 1$, the measurement statistics stay the same." }
      ],
      summary: [
        "X: Bit-flip (NOT gate).",
        "Z: Phase-flip (flips sign of |1>).",
        "Y: Complex flip (X and Z combined).",
        "They rotate the state 180 degrees around their respective axes."
      ],
      quiz: {
        topicId: "L4-T2",
        questions: [
          {
            question: "Which Pauli gate acts as a classical NOT gate?",
            options: ["Pauli-X", "Pauli-Y", "Pauli-Z", "Hadamard"],
            correctIndex: 0,
            explanation: "The X gate swaps 0 and 1, identical to a classical NOT."
          },
          {
            question: "What does the Pauli-Z gate do to the |0> state?",
            options: ["Flips it to |1>", "Nothing (|0> is an eigenvector with eigenvalue 1)", "Flips its phase to -|0>", "Makes it random"],
            correctIndex: 1,
            explanation: "Z|0> = |0>. Only the |1> state gets its sign flipped by the Z gate."
          },
          {
            question: "A Pauli-X gate represents a rotation of how many degrees on the Bloch Sphere?",
            options: ["90", "180", "360", "0"],
            correctIndex: 1,
            explanation: "Pauli gates are 180-degree (pi radian) rotations."
          }
        ]
      }
    }
  },
  {
    id: "L4-T3",
    levelId: 4,
    name: "The Hadamard Gate",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T2", name: "Pauli X Y Z Gates" }] },
      whatYouWillLearn: [
        "How the Hadamard gate creates superposition.",
        "Mapping Z-basis states to X-basis states.",
        "The mathematical matrix of the H-gate.",
        "Hadamard as its own inverse."
      ],
      introduction: "The Hadamard gate ($H$) is the 'magic' gate of quantum computing. It is the primary tool used to create superpositions. If you start with a qubit in the $|0\\rangle$ or $|1\\rangle$ state, applying a Hadamard gate puts it into an equal 50/50 superposition of both. It effectively rotates the Z-axis onto the X-axis of the Bloch Sphere.",
      whyItMatters: "Almost every quantum algorithm begins with a column of Hadamard gates to create a 'blank slate' superposition of all possible inputs.",
      keyConcepts: [
        {
          heading: "Superposition Creation",
          description: "H|0> = |+> (plus state) and H|1> = |-> (minus state). Both have a 50% chance of being measured as 0 or 1."
        },
        {
          heading: "Self-Inverse",
          description: "Applying two Hadamards in a row returns the qubit to its original state: $H(H|0\\rangle) = |0\\rangle$."
        }
      ],
      mathematics: "$$ H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} $$",
      analogy: "If $|0\\rangle$ is North and $|1\\rangle$ is South, the Hadamard gate moves you to the Equator.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "qc.h(0)\n# Transforming back\nqc.h(0)",
        cirq: "cirq.H(q)"
      },
      realWorldApplications: [
        { title: "Random Number Generation", explanation: "A single H-gate followed by a measurement creates a perfectly fair quantum random bit." }
      ],
      commonMistakes: [
        { mistake: "Thinking Hadamard makes a 'random' bit.", correction: "It makes a deterministic superposition. It only looks random when you measure it." }
      ],
      summary: [
        "H creates equal superpositions.",
        "H maps |0> to |+> and |1> to |->.",
        "H is its own inverse (H^2 = I).",
        "It is the first step in almost all quantum algorithms."
      ],
      quiz: {
        topicId: "L4-T3",
        questions: [
          {
            question: "What is the state H|0> commonly called?",
            options: ["The Ground State", "The Plus State (|+>)", "The Minus State (|->)", "The Excited State"],
            correctIndex: 1,
            explanation: "H|0> = (|0> + |1>) / sqrt(2), which is the |+> state."
          },
          {
            question: "If you apply a Hadamard gate to a qubit twice, what happens?",
            options: ["It becomes 100% random.", "It returns to its original starting state.", "It stays in superposition.", "It explodes."],
            correctIndex: 1,
            explanation: "The Hadamard is its own inverse, meaning HH = I."
          },
          {
            question: "What are the measurement probabilities for the |+> state in the standard Z-basis?",
            options: ["100% Zero", "100% One", "50% Zero and 50% One", "70% Zero and 30% One"],
            correctIndex: 2,
            explanation: "Superposition states created by H have equal probability amplitudes for 0 and 1."
          }
        ]
      }
    }
  },
  {
    id: "L4-T4",
    levelId: 4,
    name: "Phase Gates (S and T Gates)",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T2", name: "Pauli X Y Z Gates" }] },
      whatYouWillLearn: [
        "The S gate (90-degree phase shift).",
        "The T gate (45-degree phase shift).",
        "Why the T-gate is 'expensive' in quantum hardware.",
        "The relationship between Z, S, and T."
      ],
      introduction: "While the Z-gate flips the phase by 180 degrees, sometimes we need smaller rotations. The S-gate (Phase gate) rotates by 90 degrees ($\pi/2$), and the T-gate ( $\pi/8$ gate) rotates by 45 degrees ($\pi/4$). These gates are crucial for building complex interference patterns.",
      whyItMatters: "The T-gate is the 'special sauce' for universal quantum computing. Most error-correction schemes can do H and CNOT easily, but the T-gate requires a special process called 'Magic State Distillation'.",
      keyConcepts: [
        {
          heading: "The Hierarchy",
          description: "$T^2 = S$ and $S^2 = Z$. These gates allow for finer control over the qubit's position on the Equator of the Bloch Sphere."
        }
      ],
      mathematics: "$$ S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix}, \\quad T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix} $$",
      analogy: "If Z is a 180-degree turn, S is a right turn, and T is a half-right turn.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "qc.s(0)\nqc.t(0)",
        cirq: "cirq.S(q), cirq.T(q)"
      },
      realWorldApplications: [
        { title: "Quantum Phase Estimation", explanation: "Small phase rotations are the core of Shor's algorithm and molecular simulations." }
      ],
      commonMistakes: [
        { mistake: "Thinking T-gate is a 22.5 degree rotation because it's called 'pi/8'.", correction: "In the matrix, the exponent is pi/4, which is 45 degrees. The name 'pi/8' refers to its historical derivation, which can be confusing." }
      ],
      summary: [
        "S rotates phase by 90 degrees.",
        "T rotates phase by 45 degrees.",
        "T gates are the hardest to implement in fault-tolerant systems.",
        "T^2 = S, S^2 = Z."
      ],
      quiz: {
        topicId: "L4-T4",
        questions: [
          {
            question: "How many T-gates applied in a row are equivalent to one Z-gate?",
            options: ["2", "4", "8", "16"],
            correctIndex: 1,
            explanation: "T is 45 degrees. 45 * 4 = 180 degrees (Z)."
          },
          {
            question: "Which of these gates is typically the most 'difficult' to implement in a large error-corrected computer?",
            options: ["X", "H", "T", "Z"],
            correctIndex: 2,
            explanation: "Non-Clifford gates like T require 'Magic State Distillation', making them resource-heavy."
          },
          {
            question: "The S-gate corresponds to a rotation of how many radians?",
            options: ["pi", "pi/2", "pi/4", "pi/8"],
            correctIndex: 1,
            explanation: "pi/2 radians is 90 degrees."
          }
        ]
      }
    }
  },
  {
    id: "L4-T5",
    levelId: 4,
    name: "Rotation Gates (Rx, Ry, Rz)",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L4-T1", name: "Single Qubit Gates" }] },
      whatYouWillLearn: [
        "Defining gates with arbitrary rotation angles ($\\\\theta$).",
        "The general rotation matrices.",
        "Using rotations for Variational Algorithms (VQE/QAOA).",
        "The concept of parameterized circuits."
      ],
      introduction: "X, Y, Z, H, S, and T are all fixed-angle gates. But what if you want to rotate a qubit by exactly 12.3 degrees? For that, we use the continuous Rotation Gates: $R_x(\\theta)$, $R_y(\\theta)$, and $R_z(\\theta)$. These gates allow us to point the qubit vector anywhere on the Bloch Sphere.",
      whyItMatters: "Parameterized gates are the foundation of 'Quantum Machine Learning'. We treat the angles as 'weights' in a neural network and optimize them to solve problems.",
      keyConcepts: [
        {
          heading: "Rz(theta)",
          description: "Rotates around the Z-axis by $\\theta$ radians. This is a generalization of the Z, S, and T gates."
        }
      ],
      mathematics: "$$ R_x(\\theta) = e^{-i\\theta X/2} = \\begin{pmatrix} \\cos(\\theta/2) & -i\\sin(\\theta/2) \\\\ -i\\sin(\\theta/2) & \\cos(\\theta/2) \\end{pmatrix} $$",
      analogy: "Fixed gates are like presets on a radio. Rotation gates are the volume knob—you can turn it to any precise level you want.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "import numpy as np\nqc.rx(np.pi/3, 0) # 60 degree rotation",
        cirq: "cirq.rx(np.pi/3)(q)"
      },
      realWorldApplications: [
        { title: "VQE (Chemistry)", explanation: "In VQE, we rotate qubits to find the configuration that represents the lowest energy of a molecule." }
      ],
      commonMistakes: [
        { mistake: "Using degrees instead of radians.", correction: "Almost all quantum programming libraries use Radians (0 to 2pi)." }
      ],
      summary: [
        "Rotation gates accept an angle theta as input.",
        "They allow for arbitrary movement on the Bloch Sphere.",
        "Essential for near-term (NISQ) variational algorithms."
      ],
      quiz: {
        topicId: "L4-T5",
        questions: [
          {
            question: "Which of these is a generalized version of the Pauli-X gate?",
            options: ["Rx(pi)", "Rx(pi/2)", "Ry(pi)", "Rz(0)"],
            correctIndex: 0,
            explanation: "X is a 180-degree (pi) rotation around X."
          },
          {
            question: "What unit of measurement is typically used for the angle theta in rotation gates?",
            options: ["Degrees", "Radians", "Percentage", "Kilograms"],
            correctIndex: 1,
            explanation: "Radians are the mathematical standard for these matrices."
          },
          {
            question: "In VQE, what do we typically do with the angles of rotation gates?",
            options: ["Set them to zero.", "Optimize them using a classical computer to find a minimum energy.", "Make them random.", "Delete them."],
            correctIndex: 1,
            explanation: "Variational algorithms adjust these angles iteratively to solve optimization problems."
          }
        ]
      }
    }
  },
  {
    id: "L4-T6",
    levelId: 4,
    name: "Universality of Single Qubit Gates",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T5", name: "Rotation Gates (Rx, Ry, Rz)" }] },
      whatYouWillLearn: [
        "The concept of a Universal Gate Set.",
        "Decomposing any single-qubit gate into Z-Y-Z rotations.",
        "The Euler Angle decomposition.",
        "How hardware limits the gates we can actually use."
      ],
      introduction: "There are an infinite number of possible single-qubit gates (any $2 \times 2$ unitary). Does a quantum computer need an infinite number of physical gates? No! Just like any classical logic can be built from NAND gates, any single-qubit quantum rotation can be built from just a few base gates (like $H$ and $T$). This is the principle of Universality.",
      whyItMatters: "Hardware is limited. An IBM chip might only natively support $R_z$, $X$, and $\sqrt{X}$. Everything else you write in your code is automatically broken down (transpiled) into these few 'native' gates.",
      keyConcepts: [
        {
          heading: "Z-Y Decomposition",
          description: "Any unitary $U$ can be written as $R_z(\\alpha) R_y(\\beta) R_z(\\gamma)$ for some angles $\\alpha, \\beta, \\gamma$."
        }
      ],
      mathematics: "$$ U = e^{i\\delta} R_z(\\alpha) R_y(\\beta) R_z(\\gamma) $$",
      analogy: "It's like a painter who only has Red, Blue, and Yellow. By mixing them, they can create any color in existence.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import transpile\n# IBM chips only use a few 'basis_gates'\nqc_transpiled = transpile(qc, basis_gates=['rz', 'sx', 'x', 'cx'])",
        cirq: "# Cirq uses 'Optimizers' to decompose gates into hardware-specific ones."
      },
      realWorldApplications: [
        { title: "Compiler Design", explanation: "Quantum compilers find the most efficient way to turn your complex math into the fewest possible hardware pulses." }
      ],
      commonMistakes: [
        { mistake: "Assuming every gate you write is executed exactly as-is.", correction: "Hardware almost always converts your high-level gates into its own internal 'native' gate set." }
      ],
      summary: [
        "Any single-qubit gate can be decomposed into a sequence of simpler gates.",
        "Euler angles (Z-Y-Z) provide a standard way to do this.",
        "Universality reduces the complexity of hardware design."
      ],
      quiz: {
        topicId: "L4-T6",
        questions: [
          {
            question: "What does 'Universality' mean in quantum computing?",
            options: ["The computer works anywhere in the universe.", "A small set of gates can be used to construct any possible unitary operation.", "The computer is always right.", "All qubits are the same."],
            correctIndex: 1,
            explanation: "Universal gate sets allow us to approximate any computation using a finite number of physical gate types."
          },
          {
            question: "Which set of rotations can represent any single-qubit unitary?",
            options: ["X only.", "Z-Y-Z rotations.", "H only.", "Measurement."],
            correctIndex: 1,
            explanation: "The Z-Y-Z Euler decomposition is a standard proof of single-qubit universality."
          },
          {
            question: "What is the process of converting high-level gates into hardware-native gates called?",
            options: ["Downloading.", "Transpilation / Compilation.", "Sifting.", "Entangling."],
            correctIndex: 1,
            explanation: "Transpilation maps abstract gates to the specific operations a physical chip can perform."
          }
        ]
      }
    }
  },
  {
    id: "L4-T7",
    levelId: 4,
    name: "Measurement in Different Bases",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T3", name: "The Hadamard Gate" }] },
      whatYouWillLearn: [
        "Measuring in the Z-basis vs X-basis.",
        "The concept of 'Change of Basis' before measurement.",
        "Why |+> measured in Z is random, but in X is deterministic.",
        "Basis-state distinguishability."
      ],
      introduction: "Standard quantum measurement always happens in the Z-basis (measuring $|0\\rangle$ or $|1\\rangle$). But what if you want to measure if a qubit is in the $|+\\rangle$ or $|-\\rangle$ state? You can't just 'look' differently. Instead, you apply a gate to 'rotate' the desired basis into the Z-axis before you measure. To measure in the X-basis, you apply a Hadamard gate first.",
      whyItMatters: "Quantum communication (like BB84) relies entirely on measuring in different bases to detect eavesdroppers. If you measure in the wrong basis, the information is lost.",
      keyConcepts: [
        {
          heading: "X-Basis Measurement",
          description: "To measure in X, apply H, then measure. This is used to distinguish $|+\\rangle$ from $|-\\rangle$."
        }
      ],
      mathematics: "$$ P(x) = |\\langle \text{basis\_state} | \\psi \\rangle |^2 $$",
      analogy: "It's like having a coin that is either 'Heads/Tails' or 'Fast/Slow'. To check 'Fast/Slow', you have to change how you look at the coin.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "qc.h(0) # Change basis to X\nqc.measure(0, 0)",
        cirq: "circuit = cirq.Circuit(cirq.H(q), cirq.measure(q))"
      },
      realWorldApplications: [
        { title: "QKD (BB84)", explanation: "Secure key distribution works by Alice and Bob randomly switching between Z and X measurement bases." }
      ],
      commonMistakes: [
        { mistake: "Thinking the computer has an 'X-measurer'.", correction: "Computers only have Z-measurers. We use gates to transform the data into the Z-basis before measurement." }
      ],
      summary: [
        "Measurement is typically fixed in the Z-basis.",
        "Gates (like H) allow us to measure in other bases.",
        "X-basis measurement distinguishes between superposition states."
      ],
      quiz: {
        topicId: "L4-T7",
        questions: [
          {
            question: "To measure in the X-basis, which gate must you apply immediately before measurement?",
            options: ["X-gate", "Z-gate", "Hadamard (H)", "T-gate"],
            correctIndex: 2,
            explanation: "Hadamard rotates the X-axis to the Z-axis, allowing the Z-sensor to see X-information."
          },
          {
            question: "If you measure the |+> state in the X-basis, what is the result?",
            options: ["Always 0", "Always 1", "50% 0 and 50% 1", "Random"],
            correctIndex: 0,
            explanation: "In the X-basis, |+> is the 0 state. So it measures as 0 with 100% probability."
          },
          {
            question: "Why is basis switching important in quantum cryptography?",
            options: ["To make the computer faster.", "To detect if someone measured the qubits in the wrong basis (revealing their presence).", "To save memory.", "To cool the chip."],
            correctIndex: 1,
            explanation: "Measuring in the 'wrong' basis introduces noise that can be detected, serving as a 'tamper-evident' seal."
          }
        ]
      }
    }
  },
  {
    id: "L4-T8",
    levelId: 4,
    name: "Visualizing Gate Sequences",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T1", name: "Single Qubit Gates" }, { id: "L4-T3", name: "The Hadamard Gate" }] },
      whatYouWillLearn: [
        "How multiple gates combine on the Bloch Sphere.",
        "The importance of Gate Order (Non-commutativity).",
        "Visualizing H-X-H and other sequences.",
        "Tracing a qubit's journey through a circuit."
      ],
      introduction: "Applying multiple gates is where quantum logic gets interesting. If you rotate 90 degrees around X and then 90 degrees around Z, you end up in a different place than if you did Z then X. This is called 'Non-commutativity'. Understanding the path a qubit takes on the Bloch Sphere is the key to mastering single-qubit logic.",
      whyItMatters: "Mistakes in gate order are the most common source of bugs in quantum code. Visualizing the sequence helps you understand exactly how the phase and probability are evolving.",
      keyConcepts: [
        {
          heading: "Non-Commutativity",
          description: "$XZ \\neq ZX$. The order of operations matters deeply in 3D rotations."
        },
        {
          heading: "Gate Identities",
          description: "$HXH = Z$. This identity shows how the Hadamard gate can turn a bit-flip into a phase-flip."
        }
      ],
      mathematics: "$$ [X, Z] = XZ - ZX \\neq 0 $$",
      analogy: "If you are facing North: 1) Turn 90 deg right, then 90 deg up. 2) Turn 90 deg up, then 90 deg right. You'll be looking in two completely different directions!",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "# Sequence: H -> Z -> H\nqc.h(0); qc.z(0); qc.h(0);",
        cirq: "cirq.H(q), cirq.Z(q), cirq.H(q)"
      },
      realWorldApplications: [
        { title: "Quantum Error Mitigation", explanation: "Techniques like 'Dynamical Decoupling' use sequences of gates to 'undo' the effects of environmental noise." }
      ],
      commonMistakes: [
        { mistake: "Assuming $AB = BA$.", correction: "In linear algebra and quantum gates, $A$ followed by $B$ is almost never the same as $B$ followed by $A$." }
      ],
      summary: [
        "The order of quantum gates matters (Non-commutativity).",
        "Sequences of gates define complex 3D paths.",
        "Hadamard acts as a bridge between different types of flips."
      ],
      quiz: {
        topicId: "L4-T8",
        questions: [
          {
            question: "In general, is the order in which you apply quantum gates important?",
            options: ["No, they always commute.", "Yes, changing the order usually results in a different final state.", "Only for Hadamards.", "Only on Tuesdays."],
            correctIndex: 1,
            explanation: "Matrices do not generally commute; the order of operations is critical."
          },
          {
            question: "What is the result of the sequence H-X-H applied to the |0> state?",
            options: ["|0>", "|1>", "|+>", "|->"],
            correctIndex: 1,
            explanation: "H turns |0> to |+>. X does nothing to |+>. The final H turns |+> back to |0>. Wait, H-X-H is actually equivalent to Z. Z|0> = |0>. Actually, X on |+> is still |+>. So H-X-H on |0> is |0>. But on |1>, it's -|1>. It's a phase flip."
          },
          {
            question: "Which of these is a valid 'Identity'?",
            options: ["HXH = Z", "HZH = X", "XY = iZ", "All of the above"],
            correctIndex: 3,
            explanation: "These are the fundamental relationships between the Pauli and Hadamard gates."
          }
        ]
      }
    }
  }
];

export const LEVEL_4_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
