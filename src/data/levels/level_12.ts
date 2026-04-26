import { Topic, QuizQuestion } from '../types';

export const LEVEL_12_TOPICS: Topic[] = [
  {
    id: "L12-T1",
    levelId: 12,
    name: "The Quantum Software Stack",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T1", name: "What is Quantum Computing" }] },
      whatYouWillLearn: [
        "How Python code becomes physical microwave pulses.",
        "The layers of the stack from User to QPU.",
        "The role of the Transpiler and Optimizer.",
        "Resource management in a shared QPU environment."
      ],
      introduction: "Quantum software is a 'Full Stack' discipline. It begins with high-level languages like Python and specialized SDKs like IBM's Qiskit or Google's Cirq. This code doesn't just 'run' on a processor; it undergoes a complex series of transformations. It is compiled into an Intermediate Representation (like OpenQASM), then optimized by a transpiler to fit a specific chip's physical layout, and finally converted into physical 'Pulses' (microwave or laser) that interact with the qubits. Understanding this stack is critical for writing code that actually survives the noisy reality of today's hardware.",
      whyItMatters: "Most quantum code fails not because the math is wrong, but because it doesn't account for 'Hardware constraints'. If you don't understand the stack, you can't optimize your code for the limited connectivity and gate speeds of a real QPU.",
      keyConcepts: [
        {
          heading: "SDK Layer",
          description: "High-level libraries (Qiskit, Cirq, PennyLane) where users define circuits using abstract gates like H, CNOT, and measurement."
        },
        {
          heading: "Transpilation Layer",
          description: "The 'Heavy Lifter'. It maps your abstract circuit to a specific device's topology. If you use a gate the chip doesn't natively support, the transpiler must decompose it into supported ones, often adding noise."
        },
        {
          heading: "Control Layer",
          description: "The hardware level where binary instructions are turned into analog signals by FPGAs and microwave generators."
        }
      ],
      mathematics: "$$ \\mathcal{C}_{optimized} = \\text{Transpile}(\\mathcal{C}_{abstract}, \\text{Backend}) $$\\nOptimization involves minimizing the 'Depth' of the circuit and the count of 'Two-Qubit Gates' (the most error-prone operations).",
      analogy: "The quantum stack is like a translation service. You speak English (Qiskit), a translator turns it into Shorthand (QASM), and a technician turns that shorthand into Morse Code (Pulses) to communicate with a distant lighthouse (The Qubit).",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import transpile\\n# Mapping a circuit to a specific IBM backend topology\\nqc_on_hw = transpile(qc, backend=ibm_kyoto, optimization_level=3)",
        cirq: "import cirq\\n# Cirq use 'Service' objects to manage the stack connection to Google QPUs."
      },
      realWorldApplications: [
        { title: "Cloud Quantum Computing", explanation: "Amazon Braket and Microsoft Azure rely on these stacks to let users in one country run code on hardware in another without worrying about pulse-level details." }
      ],
      commonMistakes: [
        { mistake: "Thinking you can use any gate on any chip.", correction: "Every chip has a 'Native Gate Set'. If you use a T-gate on a chip that only supports X, Y, and Z, the stack has to 'simulate' it, which can be 10x more noisy." }
      ],
      summary: [
        "Hierarchy from Python SDKs down to physical microwave pulses.",
        "Transpilers optimize circuits for specific hardware layouts.",
        "Native gates are the 'alphabet' of the specific QPU.",
        "Cloud layers manage user access and job queuing."
      ],
      quiz: {
        topicId: "L12-T1",
        questions: [
          {
            question: "What is the primary job of the Transpiler in the quantum stack?",
            options: ["To cool the hardware.", "To map and optimize an abstract circuit for a specific chip's physical constraints.", "To generate random numbers.", "To print the final results."],
            correctIndex: 1,
            explanation: "Transpilers ensure that your high-level logic can actually execute on a specific chip's unique grid and gate set."
          }
        ]
      }
    }
  },
  {
    id: "L12-T2",
    levelId: 12,
    name: "OpenQASM",
    type: "code",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T1", name: "The X Gate" }] },
      whatYouWillLearn: [
        "The assembly language of quantum computing.",
        "Writing raw quantum assembly strings.",
        "Register declaration and gate calls in QASM.",
        "Interoperability between Qiskit, Cirq, and hardware."
      ],
      introduction: "OpenQASM (Open Quantum Assembly Language) is the industry-standard 'Machine Code' for quantum computers. Just as classical computers have x86 or ARM assembly, quantum computers use QASM to describe the sequence of gates. Whether you write in Qiskit or Cirq, your code is eventually flattened into a QASM string before being sent to the hardware. QASM 3.0 even allows for classical logic (if/else) to run directly on the quantum controller.",
      whyItMatters: "Learning QASM allows you to see the true structure of your circuit without the 'bloat' of Python. It is the cleanest way to debug exactly what the hardware is being asked to do.",
      keyConcepts: [
        {
          heading: "Registers",
          description: "In QASM, you must explicitly define 'qreg' (quantum registers) and 'creg' (classical registers for measurement storage)."
        },
        {
          heading: "Gate Inclusion",
          description: "Standard libraries like 'qelib1.inc' are included to define common gates like H, X, and CNOT."
        },
        {
          heading: "QASM 3.0",
          description: "The new standard that supports 'Real-time Classical Control', allowing for mid-circuit measurement and feedback logic."
        }
      ],
      mathematics: "$$ \\text{gate } h \\ q[0]; \\quad \\text{gate } cx \\ q[0], q[1]; $$\\nThis syntax represents the application of a Hadamard gate followed by a Controlled-NOT gate in assembly format.",
      analogy: "If Qiskit is like a blueprint for a house, QASM is the specific itemized list of wood, nails, and bricks the builder needs to order to make the blueprint real.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc = QuantumCircuit.from_qasm_str('OPENQASM 2.0; include \"qelib1.inc\"; qreg q[2]; h q[0]; cx q[0], q[1];')",
        cirq: "import cirq.contrib.qasm as qasm\\n# Cirq can export circuits to OpenQASM files easily for cross-platform use."
      },
      realWorldApplications: [
        { title: "Quantum Standards", explanation: "OpenQASM ensures that code written today is 'future-proof' and can be run on different hardware backends as they emerge." }
      ],
      commonMistakes: [
        { mistake: "Thinking QASM is a full-purpose programming language like Python.", correction: "It is an assembly language. While QASM 3.0 is powerful, it is designed for circuit definition, not for building websites or training AI." }
      ],
      summary: [
        "Universal assembly language for quantum processors.",
        "Text-based format for circuit description.",
        "QASM 3.0 adds support for classical control flow.",
        "Standardized way to move circuits between different software tools."
      ],
      quiz: {
        topicId: "L12-T2",
        questions: [
          {
            question: "What does 'qreg' stand for in an OpenQASM file?",
            options: ["Quantum Register.", "Quick Registration.", "Quality Regulation.", "Queue Region."],
            correctIndex: 0,
            explanation: "'qreg' defines the group of qubits that will be used in the circuit."
          }
        ]
      }
    }
  },
  {
    id: "L12-T3",
    levelId: 12,
    name: "Pulse-Level Control",
    type: "code",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L12-T1", name: "The Quantum Software Stack" }] },
      whatYouWillLearn: [
        "Bypassing gate abstractions to control raw hardware.",
        "Calibrating microwave pulses for better fidelity.",
        "Understanding Gaussian, Drag, and Square pulses.",
        "Measuring Rabi Oscillations and Ramsey Fringes."
      ],
      introduction: "To a physicist, a 'Gate' is just a microwave pulse of a specific duration, frequency, and shape. Pulse-level control allows expert users to bypass the programmer's 'Gate' abstraction and manually define the physical signals sent to the chip. This is the 'Expert Mode' of quantum programming, where you can squeeze maximum performance out of a noisy chip by compensating for its specific physical flaws.",
      whyItMatters: "Standard gates are 'one-size-fits-all'. Pulse programming allows you to custom-fit the gates to your specific qubits, often achieving significant improvements in fidelity for tasks like Error Correction or specialized state preparation.",
      keyConcepts: [
        {
          heading: "Qiskit Pulse (Schedules)",
          description: "IBM's framework for defining individual microwave envelopes. You can stack pulses in time and across different channels (Drive, Measure, Control)."
        },
        {
          heading: "Pulse Envelopes",
          description: "Common shapes include Gaussian (smooth onset) and DRAG (Derivative Removal by Adiabatic Gate), which helps prevent leaking into higher energy states."
        },
        {
          heading: "Calibration",
          description: "The process of finding the exact 'Amplitude' and 'Duration' required to flip a qubit's state perfectly by 180 degrees (a $\\pi$-pulse)."
        }
      ],
      mathematics: "$$ s(t) = A(t) \\cos(\\omega t + \\phi) $$\\nA pulse is defined by its Amplitude $A(t)$, its Frequency $\\omega$, and its Phase $\\phi$. Tuning these three parameters is the core of pulse control.",
      analogy: "Gate programming is like playing a song on a piano. Pulse programming is like tuning the individual strings and adjusting the weight of the hammers inside the piano to make the song sound perfect.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import pulse\\nwith pulse.build(name='pi_pulse') as pi_sched:\\n    pulse.play(pulse.library.Gaussian(duration=160, amp=0.1, sigma=40), pulse.drive_channel(0))",
        cirq: "# Cirq's FSimGate represents the physical interaction parameters between two qubits."
      },
      realWorldApplications: [
        { title: "Hardware R&D", explanation: "Scientists use pulse control to discover new, more efficient gates that haven't been standardized in SDKs yet." }
      ],
      commonMistakes: [
        { mistake: "Thinking you need to use pulses for every project.", correction: "Pulse programming is only for low-level research. For 99% of applications, the default gates provided by IBM or Google are already perfectly calibrated." }
      ],
      summary: [
        "Direct control over the shape of microwave or laser signals.",
        "Allows for custom gate definition and hardware calibration.",
        "Essential for achieving the highest possible gate fidelities.",
        "Exposes the true physical nature of quantum computing."
      ],
      quiz: {
        topicId: "L12-T3",
        questions: [
          {
            question: "What is a 'pi-pulse' in the context of pulse-level control?",
            options: ["A pulse that tastes like pie.", "A pulse that rotates a qubit state by exactly 180 degrees (flipping it).", "A pulse that lasts 3.14 seconds.", "A pulse that deletes a qubit."],
            correctIndex: 1,
            explanation: "A pi-pulse ($\\\\pi$ radians) is the physical signal that implements a perfect bit-flip (X gate)."
          }
        ]
      }
    }
  },
  {
    id: "L12-T4",
    levelId: 12,
    name: "Circuit Optimization",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L12-T1", name: "The Quantum Software Stack" }] },
      whatYouWillLearn: [
        "Gate cancellation and commutation rules.",
        "Mapping circuits to restricted hardware topologies.",
        "Reducing the count of expensive Two-Qubit gates.",
        "Peephole vs Global optimization techniques."
      ],
      introduction: "Between your perfect mathematical circuit and the noisy physical hardware sits the Optimizer. Quantum circuits can be simplified by identifying gates that cancel each other out (like two X gates in a row) or by rearranging gates to minimize 'SWAP' operations. Since SWAP gates are slow and noisy, removing even one can significantly increase your success rate.",
      whyItMatters: "Every gate you remove from a circuit increases the final result's accuracy. In the current NISQ era, optimization isn't just about speed; it's a requirement for getting any meaningful data at all.",
      keyConcepts: [
        {
          heading: "Commutation",
          description: "Identifying gates that can 'swap positions' in a circuit without changing the logic, allowing them to be combined or cancelled with other gates."
        },
        {
          heading: "Topology Mapping",
          description: "If Qubit A needs to talk to Qubit C, but they aren't physically connected on the chip, the optimizer must insert SWAP gates to move the data. A good optimizer finds the shortest path."
        },
        {
          heading: "Depth Reduction",
          description: "Parallelizing gates so the circuit finishes faster, before decoherence (noise) kills the quantum state."
        }
      ],
      mathematics: "$$ [U_1, U_2] = U_1 U_2 - U_2 U_1 = 0 $$\\nIf the commutator is zero, the gates commute and can be reordered freely for optimization purposes.",
      analogy: "Circuit optimization is like editing a long, rambling paragraph into a short, punchy sentence that conveys the exact same meaning but is much easier to read.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "from qiskit import transpile\\n# Level 3 optimization aggressively looks for patterns to delete gates.\\noptimized_qc = transpile(qc, backend=real_chip, optimization_level=3)",
        cirq: "# Cirq's 'MapTitle' and 'PointOptimizer' passes automate gate reduction."
      },
      realWorldApplications: [
        { title: "Algorithm Efficiency", explanation: "Companies like Riverlane and Unitary Fund build specialized optimizers that make circuits run 10x better on the same hardware." }
      ],
      commonMistakes: [
        { mistake: "Assuming manual optimization is always better.", correction: "Modern compilers like TKET are often much better at finding hidden mathematical simplifications in 100-qubit circuits than humans." }
      ],
      summary: [
        "Optimization reduces gate count and circuit depth.",
        "Minimizes the probability of errors occurring during execution.",
        "Crucial for mapping logic to physical chip connections.",
        "A standard, automated part of the quantum software development lifecycle."
      ],
      quiz: {
        topicId: "L12-T4",
        questions: [
          {
            question: "Why are SWAP gates avoided in circuit optimization?",
            options: ["They are too colorful.", "They are expensive in terms of time and error rate.", "They are only for simulators.", "They make the circuit too small."],
            correctIndex: 1,
            explanation: "Each SWAP gate consists of three CNOT gates, making it a major source of noise in physical hardware."
          }
        ]
      }
    }
  },
  {
    id: "L12-T5",
    levelId: 12,
    name: "Hybrid Classical-Quantum Algorithms",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L12-T1", name: "The Quantum Software Stack" }] },
      whatYouWillLearn: [
        "The variational principle in modern computing.",
        "How classical optimizers drive quantum circuits.",
        "Parameter updates and the feedback loop mechanism.",
        "The roadmap to 'Near-term Quantum Advantage'."
      ],
      introduction: "We don't use quantum computers alone. Most modern algorithms are 'Hybrid'. We run a small circuit with adjustable 'parameters' on a quantum chip, send the result to a classical computer, and then the classical computer uses calculus to calculate better parameters for the next run. This loop repeats until the solution is found. This allows us to use today's noisy chips to solve real problems.",
      whyItMatters: "This is the 'Secret Sauce' of the NISQ era. By delegating the 'logic' and 'optimization' to classical computers and only using quantum for the 'hard' part (the state space), we can bypass many hardware limitations.",
      keyConcepts: [
        {
          heading: "The Variational Loop",
          description: "An iterative process where a classical optimizer (like COBYLA or SPSA) 'tunes' a quantum circuit like an instrument."
        },
        {
          heading: "Cost Function",
          description: "A mathematical value we want to minimize (like the energy of a molecule). The quantum computer calculates the energy, and the classical computer tries to find the settings that make it lower."
        },
        {
          heading: "VQE and QAOA",
          description: "The two most famous hybrid algorithms, used for chemistry simulation and logistics optimization respectively."
        }
      ],
      mathematics: "$$ \\min_{\\theta} E(\\theta) = \\min_{\\theta} \\langle \\psi(\\theta) | H | \\psi(\\theta) \\rangle $$\\nThis is the core equation of the Variational Quantum Eigensolver (VQE), seeking the minimum energy $E$ by tuning parameters $\\theta$.",
      analogy: "A hybrid algorithm is like a Chef (Classical) and an Oven (Quantum). The Oven handles the complex chemistry of baking, but the Chef monitors the results and adjusts the temperature and timing until the bread is perfect.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit_algorithms import VQE\\nfrom qiskit_algorithms.optimizers import SPSA\\n# VQE uses a classical SPSA optimizer to tune a quantum ansatz.",
        cirq: "# Cirq-Opt is a library specifically for variational hybrid loops."
      },
      realWorldApplications: [
        { title: "Quantum Chemistry", explanation: "VQE is used by pharmaceutical companies to simulate the behavior of new drug molecules on quantum hardware." },
        { title: "Portfolio Optimization", explanation: "Banks use hybrid QAOA algorithms to find the most profitable and least risky mix of stocks." }
      ],
      commonMistakes: [
        { mistake: "Thinking the quantum chip holds all the logic.", correction: "The quantum chip is just a 'co-processor', similar to a GPU in a classical gaming PC. The classical CPU is still the 'brain' of the operation." }
      ],
      summary: [
        "Quantum + Classical loops are the standard for current hardware.",
        "Iterative parameter tuning overcomes some noise issues.",
        "Basis for the most promising near-term algorithms like VQE and QAOA.",
        "Combines the strengths of both classical and quantum worlds."
      ],
      quiz: {
        topicId: "L12-T5",
        questions: [
          {
            question: "In a hybrid algorithm, which computer handles the 'Optimization' part of the loop?",
            options: ["The Quantum Computer.", "The Classical Computer.", "The Cloud Server.", "None of the above."],
            correctIndex: 1,
            explanation: "The classical computer uses standard algorithms to calculate the next set of parameters based on the quantum computer's output."
          }
        ]
      }
    }
  }
];

export const LEVEL_12_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L12-T1": {
    questions: [
      {
        question: "What is the primary role of the Transpiler in the quantum software stack?",
        options: ["To cool the hardware.", "To translate and optimize a circuit for a specific chip's hardware constraints.", "To generate random numbers.", "To print the final results."],
        correctIndex: 1,
        explanation: "Transpilers take a generic circuit and rework it to use only the physical connections and gates available on the target QPU."
      }
    ]
  },
  "L12-T2": {
    questions: [
      {
        question: "Which version of OpenQASM introduced support for real-time classical control flow?",
        options: ["1.0", "2.0", "3.0", "4.0"],
        correctIndex: 2,
        explanation: "OpenQASM 3.0 was a major update that added classical logic like if-statements to the assembly language."
      }
    ]
  }
};
