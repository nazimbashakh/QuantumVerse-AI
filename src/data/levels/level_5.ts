import { Topic, QuizQuestion } from '../types';

export const LEVEL_5_TOPICS: Topic[] = [
  {
    id: "L5-T1",
    levelId: 5,
    name: "Circuit Diagrams",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L4-T1", name: "Single Qubit Gates" }] },
      whatYouWillLearn: [
        "How to read quantum circuit notation.",
        "The meaning of horizontal lines (qubits) vs double lines (classical bits).",
        "Visualizing time progression from left to right.",
        "Common symbols for H, X, CNOT, and Measurement."
      ],
      introduction: "Quantum algorithms are visualized using circuit diagrams. Unlike electrical circuits that represent loops of current, quantum circuits represent a chronological timeline of operations. Time flows from left to right. Each horizontal line represents a single qubit, initialized at $|0\\rangle$. Boxes represent gates, and symbols connecting lines represent interactions.",
      whyItMatters: "Circuit diagrams are the 'Source Code' of quantum algorithms. Even when writing Python code in Qiskit, you are building a data structure that maps exactly to these visual diagrams.",
      keyConcepts: [
        {
          heading: "Qubit Wires",
          description: "Represented by single horizontal lines. Qubits are usually labeled $q_0, q_1, \\dots, q_n$."
        },
        {
          heading: "Classical Wires",
          description: "Represented by double lines. These hold the bits measured from the qubits."
        },
        {
          heading: "Time Progression",
          description: "Operations are executed sequentially from left to right. Vertical alignment means simultaneous execution."
        }
      ],
      mathematics: "\\text{Circuit } \\approx U_n \\dots U_2 U_1 |\\psi\\rangle",
      analogy: "A quantum circuit is like a musical score. Each line is an instrument (qubit), and the notes (gates) tell the musician exactly what to play over time.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure([0, 1], [0, 1])\nprint(qc.draw(output='text'))",
        cirq: "import cirq\nq = cirq.LineQubit.range(2)\nc = cirq.Circuit(cirq.H(q[0]), cirq.CNOT(q[0], q[1]), cirq.measure(*q))"
      },
      realWorldApplications: [
        { title: "Quantum Algorithm Design", explanation: "Designers use tools like the IBM Quantum Composer to prototype circuits before writing code." }
      ],
      commonMistakes: [
        { mistake: "Reading time from top to bottom.", correction: "In almost all quantum notations, time flows from left to right." }
      ],
      summary: [
        "Horizontal lines are qubits.",
        "Time flows left to right.",
        "Boxes are gates.",
        "Double lines are classical bits."
      ],
      quiz: {
        topicId: "L5-T1",
        questions: [
          {
            question: "In a quantum circuit diagram, what does a double horizontal line represent?",
            options: ["An entangled qubit", "A classical bit result", "A superconducting wire", "A ground state"],
            correctIndex: 1,
            explanation: "Double lines represent classical information, usually the results of a measurement."
          },
          {
            question: "How do you read the sequence of gate execution in a diagram?",
            options: ["Right to left", "Top to bottom", "Left to right", "Randomly"],
            correctIndex: 2,
            explanation: "Time flows left to right, meaning gates on the left are executed before gates on the right."
          },
          {
            question: "What is the default state of a qubit at the start of a circuit?",
            options: ["|1>", "|0>", "Random", "|+>"],
            correctIndex: 1,
            explanation: "Qubits are almost always initialized to the ground state |0>."
          }
        ]
      }
    }
  },
  {
    id: "L5-T2",
    levelId: 5,
    name: "Building Your First Circuit",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T1", name: "Circuit Diagrams" }] },
      whatYouWillLearn: [
        "The 3-stage lifecycle: Preparation, Evolution, and Measurement.",
        "How to initialize qubits in a specific state.",
        "Executing a complete circuit on a simulator.",
        "Interpreting count results (Histograms)."
      ],
      introduction: "Building a quantum circuit follows a standard structural pattern: 1) Preparation (Initialization), 2) Evolution (Gates), and 3) Measurement (Conversion to binary). This process is repeated hundreds of times (called 'shots') to build up a probability distribution.",
      whyItMatters: "Understanding the lifecycle is essential for debugging. Most errors occur in the preparation phase or by measuring too early.",
      keyConcepts: [
        {
          heading: "Initialization",
          description: "All qubits start at $|0\\rangle$ unless specifically changed with an X gate or other operations."
        },
        {
          heading: "Shots and Statistics",
          description: "Because quantum outcomes are probabilistic, we must run the circuit multiple times to see the true behavior of the wave function."
        }
      ],
      mathematics: "$$ \\text{Counts}(x) \\approx \\text{Shots} \\times |\\langle x | U | 0 \\rangle |^2 $$",
      analogy: "Building a circuit is like cooking. Preparation is getting ingredients, Evolution is the cooking process, and Measurement is tasting the food.",
      visualType: "PROBABILITY_HISTOGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit, execute, Aer\nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\n# Executing 1000 times\nresult = execute(qc, Aer.get_backend('qasm_simulator'), shots=1000).result()\nprint(result.get_counts())",
        cirq: "import cirq\nq = cirq.LineQubit(0)\nc = cirq.Circuit(cirq.H(q), cirq.measure(q, key='m'))\nsim = cirq.Simulator()\nres = sim.run(c, repetitions=1000)\nprint(res.histogram(key='m'))"
      },
      realWorldApplications: [
        { title: "Hardware Benchmarking", explanation: "Scientists run simple circuits to measure how accurately a real quantum chip matches the theoretical probability distribution." }
      ],
      commonMistakes: [
        { mistake: "Expecting the same result every time.", correction: "Measurement is random. You must look at the statistical distribution (histogram) over many shots." }
      ],
      summary: [
        "Preparation, Evolution, and Measurement are the 3 stages.",
        "Qubits are initialized to |0>.",
        "Run the circuit multiple times ('shots') to get statistics.",
        "Results are visualized as a histogram of bit-string counts."
      ],
      quiz: {
        topicId: "L5-T2",
        questions: [
          {
            question: "What are 'Shots' in a quantum calculation?",
            options: ["The number of qubits used.", "The number of times the same circuit is run to collect statistics.", "The speed of the computer.", "Small holes in the chip."],
            correctIndex: 1,
            explanation: "Because measurement is probabilistic, we repeat the circuit many times to find the probability of each outcome."
          },
          {
            question: "Why do we typically run 1024 or 4096 shots instead of just 1?",
            options: ["To save time.", "To overcome the randomness of measurement and see the underlying probability distribution.", "The computer requires it.", "To make the chip hot."],
            correctIndex: 1,
            explanation: "A single shot only gives you one bit; many shots reveal the 'shape' of the quantum state."
          },
          {
            question: "What is the final step in almost every quantum circuit?",
            options: ["Applying a Hadamard gate.", "Measurement.", "Initialization.", "Turning off the fridge."],
            correctIndex: 1,
            explanation: "Measurement converts the quantum information into classical data that humans can read."
          }
        ]
      }
    }
  },
  {
    id: "L5-T3",
    levelId: 5,
    name: "The CNOT Gate",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T1", name: "Circuit Diagrams" }] },
      whatYouWillLearn: [
        "The Controlled-NOT (CNOT) gate logic.",
        "The role of the Control Qubit and Target Qubit.",
        "The CNOT matrix and Truth Table.",
        "How CNOT creates entanglement."
      ],
      introduction: "The CNOT (Controlled-NOT) gate is the most important two-qubit gate. It works like this: 'IF the control qubit is 1, THEN flip the target qubit'. If the control is 0, nothing happens. This simple logic is the foundation for almost all quantum multi-qubit operations and is the primary tool for creating entanglement.",
      whyItMatters: "Single-qubit gates are not enough for universal computing. CNOT allows qubits to interact, enabling the complex 'links' that provide quantum speedup.",
      keyConcepts: [
        {
          heading: "Control and Target",
          description: "Control qubit ($q_c$): Determines if the operation happens. Target qubit ($q_t$): The qubit being flipped."
        },
        {
          heading: "Entanglement Generation",
          description: "If you apply a CNOT where the control is in a superposition, the control and target become entangled."
        }
      ],
      mathematics: "$$ CNOT = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix} $$",
      analogy: "It's like a buddy system: 'I will only jump if you jump'. If you are in a state of 'maybe jumping', then your buddy is now in a state of 'maybe jumping' tied specifically to you.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc.cx(0, 1) # Control 0, Target 1",
        cirq: "cirq.CNOT(q0, q1)"
      },
      realWorldApplications: [
        { title: "Bell State Creation", explanation: "A Hadamard followed by a CNOT creates a maximally entangled state." }
      ],
      commonMistakes: [
        { mistake: "Assuming CNOT changes the control qubit.", correction: "In the computational basis, CNOT only changes the target qubit. The control qubit stays exactly as it was." }
      ],
      summary: [
        "CNOT flips the target if the control is |1>.",
        "It is a 2-qubit gate.",
        "It is the primary tool for creating entanglement.",
        "It is its own inverse."
      ],
      quiz: {
        topicId: "L5-T3",
        questions: [
          {
            question: "In a CNOT gate, what happens if the control qubit is in the |0> state?",
            options: ["The target qubit flips.", "Nothing happens to the target qubit.", "Both qubits are deleted.", "The target qubit becomes random."],
            correctIndex: 1,
            explanation: "The 'IF' condition is not met, so no flip occurs."
          },
          {
            question: "How is a CNOT gate represented in a circuit diagram?",
            options: ["A square box labeled 'C'.", "A small circle (control) connected by a line to a large plus-circle (target).", "A double line.", "A triangle."],
            correctIndex: 1,
            explanation: "The dot represents the control condition, and the plus represents the NOT (X) operation."
          },
          {
            question: "What is the state of two qubits after a CNOT if the control is in superposition (|+>)?",
            options: ["Independent.", "Entangled.", "Always zero.", "Classical."],
            correctIndex: 1,
            explanation: "A CNOT 'copies' the uncertainty of the control into the target, creating a unified quantum link (entanglement)."
          }
        ]
      }
    }
  },
  {
    id: "L5-T4",
    levelId: 5,
    name: "Controlled-Z and Swap Gates",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T3", name: "The CNOT Gate" }] },
      whatYouWillLearn: [
        "The CZ (Controlled-Z) gate and its symmetry.",
        "The SWAP gate: exchanging states between qubits.",
        "Building a SWAP from three CNOTs.",
        "Native gates in hardware (e.g., Google Sycamore)."
      ],
      introduction: "While CNOT flips bits, the Controlled-Z (CZ) gate flips the phase. If both qubits are $|1\\rangle$, the system gets a negative sign. Interestingly, CZ is perfectly symmetric—there is no 'control' or 'target'. The SWAP gate is another vital tool, allowing us to move quantum information from one physical qubit to another across a chip.",
      whyItMatters: "On a real chip, qubits can usually only interact with their neighbors. To make Qubit 1 and Qubit 10 talk, we have to SWAP their information across the intermediate qubits until they are next to each other.",
      keyConcepts: [
        {
          heading: "CZ Symmetry",
          description: "CZ(q0, q1) is identical to CZ(q1, q0). It only flips the phase of the $|11\\rangle$ state."
        },
        {
          heading: "The 3-CNOT Swap",
          description: "You can implement a SWAP gate by performing three CNOTs in alternating directions."
        }
      ],
      mathematics: "$$ SWAP = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} $$",
      analogy: "SWAP is like two people in a hallway trading their suitcases. CZ is like a secret agreement where the world only changes if both people are in the room.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc.cz(0, 1)\nqc.swap(0, 1)",
        cirq: "cirq.CZ(q0, q1), cirq.SWAP(q0, q1)"
      },
      realWorldApplications: [
        { title: "Qubit Mapping", explanation: "Compilers use SWAP gates to move qubits into position on a 2D hardware grid so they can interact." }
      ],
      commonMistakes: [
        { mistake: "Thinking SWAP creates new information.", correction: "SWAP only moves existing states; it doesn't create superposition or entanglement by itself." }
      ],
      summary: [
        "CZ flips the phase if both qubits are |1>.",
        "CZ is symmetric.",
        "SWAP exchanges the states of two qubits.",
        "SWAP is essential for routing info on a chip."
      ],
      quiz: {
        topicId: "L5-T4",
        questions: [
          {
            question: "Which of these gates is perfectly symmetric?",
            options: ["CNOT", "CZ", "Hadamard", "T-gate"],
            correctIndex: 1,
            explanation: "In a CZ gate, both qubits act as control and target simultaneously; only the |11> state is affected."
          },
          {
            question: "How many CNOT gates are required to build a single SWAP gate?",
            options: ["1", "2", "3", "4"],
            correctIndex: 2,
            explanation: "Three CNOTs in a row (e.g., CX(0,1), CX(1,0), CX(0,1)) will perfectly swap two qubits."
          },
          {
            question: "What is the primary use of the SWAP gate in real hardware?",
            options: ["To delete data.", "To move quantum information across the chip so distant qubits can interact.", "To cool the processor.", "To make the circuit look cleaner."],
            correctIndex: 1,
            explanation: "Most chips have limited connectivity; SWAPs allow information to 'travel' to where it is needed."
          }
        ]
      }
    }
  },
  {
    id: "L5-T5",
    levelId: 5,
    name: "Multi-Qubit Interference",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T3", name: "The CNOT Gate" }] },
      whatYouWillLearn: [
        "How 2-qubit waves interfere with each other.",
        "Constructive and destructive interference in circuits.",
        "Visualizing probability amplitudes for 2-qubit systems.",
        "The role of relative phase in multi-qubit logic."
      ],
      introduction: "Interference isn't just for single qubits. In a multi-qubit system, the wave functions of different qubits can reinforce or cancel each other out. This is the secret to quantum speedup: we design circuits so that incorrect answers interfere destructively (cancel out) and the correct answer interferes constructively (gets louder).",
      whyItMatters: "Every quantum algorithm (Shor's, Grover's) works by orchestrating interference. If you don't understand how phases interact across multiple qubits, you can't design algorithms.",
      keyConcepts: [
        {
          heading: "Phase Cancellation",
          description: "If two paths to the same result have opposite phases ($+$ and $-$), they cancel out, and the probability of that result becomes zero."
        }
      ],
      mathematics: "$$ \\psi_{total} = \\sum A_i e^{i\\phi_i} |i\\rangle $$",
      analogy: "It's like noise-canceling headphones. The headphones create a 'negative' sound wave that perfectly cancels the outside noise, leaving only silence (or your music).",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# We can create interference by combining H and CZ gates\nqc.h([0,1]); qc.cz(0,1); qc.h([0,1])",
        cirq: "# Multi-qubit interference patterns in Cirq."
      },
      realWorldApplications: [
        { title: "Grover's Algorithm", explanation: "Uses interference to 'amplify' the probability of the correct answer in a database." }
      ],
      commonMistakes: [
        { mistake: "Thinking interference is just 'random chance'.", correction: "Interference is deterministic. If you run the same circuit, the waves will always cancel the same way until you measure." }
      ],
      summary: [
        "Multi-qubit states are complex waves.",
        "Phases can add up (constructive) or cancel (destructive).",
        "Interference is used to hide wrong answers and highlight right ones."
      ],
      quiz: {
        topicId: "L5-T5",
        questions: [
          {
            question: "What happens during 'Destructive Interference' in a quantum circuit?",
            options: ["The computer crashes.", "The probability amplitudes for a certain outcome cancel out, making it less likely to be measured.", "The qubits get hot.", "The entanglement breaks."],
            correctIndex: 1,
            explanation: "Destructive interference occurs when phases are opposite, reducing the chance of an outcome."
          },
          {
            question: "What is the primary goal of interference in a quantum algorithm?",
            options: ["To create randomness.", "To ensure that only the correct solution has a high probability of being measured.", "To slow down the processor.", "To save memory."],
            correctIndex: 1,
            explanation: "We use wave mechanics to 'guide' the system toward the correct answer."
          },
          {
            question: "Which mathematical property governs interference?",
            options: ["Addition of complex amplitudes.", "Subtraction of integers.", "Division by zero.", "Random guessing."],
            correctIndex: 0,
            explanation: "Quantum states are summed as complex numbers (amplitudes); the phase determines if they add or subtract."
          }
        ]
      }
    }
  },
  {
    id: "L5-T6",
    levelId: 5,
    name: "Toffoli and Fredkin Gates",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L5-T3", name: "The CNOT Gate" }] },
      whatYouWillLearn: [
        "The 3-qubit Toffoli Gate (CCNOT).",
        "Reversible classical logic using Toffoli.",
        "The Fredkin Gate (Controlled-SWAP).",
        "Why 3-qubit gates are harder for hardware."
      ],
      introduction: "The Toffoli gate is a 3-qubit gate that flips the third qubit only if the first TWO qubits are $|1\\rangle$. It is a 'Controlled-Controlled-NOT'. The Toffoli is special because it is a universal gate for classical logic—you can build any standard computer using only Toffoli gates. The Fredkin gate is a 'Controlled-SWAP', exchanging two qubits only if a control is 1.",
      whyItMatters: "Toffoli gates are the workhorses of 'Quantum Arithmetic'. We use them to build adders, multipliers, and other standard logic components inside a quantum circuit.",
      keyConcepts: [
        {
          heading: "Reversibility",
          description: "All quantum gates must be reversible. Toffoli is the reversible version of the classical AND gate."
        },
        {
          heading: "Decomposition",
          description: "A 3-qubit Toffoli is usually implemented as a sequence of many 2-qubit CNOTs and single-qubit T-gates on real hardware."
        }
      ],
      mathematics: "$$ |a, b, c\\rangle \\rightarrow |a, b, c \\oplus (a \\cdot b)\\rangle $$",
      analogy: "A Toffoli gate is like a safety deposit box that requires TWO keys to open. If only one key is present, the box (target) stays locked.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc.ccx(0, 1, 2) # Toffoli\nqc.cswap(0, 1, 2) # Fredkin",
        cirq: "cirq.CCX(q0, q1, q2), cirq.CSWAP(q0, q1, q2)"
      },
      realWorldApplications: [
        { title: "Shor's Algorithm", explanation: "Uses thousands of Toffoli gates to perform modular exponentiation." }
      ],
      commonMistakes: [
        { mistake: "Thinking Toffoli is 'native' on all chips.", correction: "Most superconducting chips only support 1 and 2-qubit gates natively. Toffoli must be broken down by the compiler." }
      ],
      summary: [
        "Toffoli (CCNOT) flips a bit if two controls are 1.",
        "Fredkin (CSWAP) swaps two bits if a control is 1.",
        "Universal for classical reversible computation.",
        "Essential for building quantum arithmetic."
      ],
      quiz: {
        topicId: "L5-T6",
        questions: [
          {
            question: "How many qubits are involved in a standard Toffoli gate?",
            options: ["1", "2", "3", "4"],
            correctIndex: 2,
            explanation: "Toffoli is a 3-qubit gate (two controls, one target)."
          },
          {
            question: "The Toffoli gate is the reversible quantum equivalent of which classical gate?",
            options: ["NOT", "AND", "OR", "XOR"],
            correctIndex: 1,
            explanation: "It acts like an AND gate: the target is flipped only if Control A AND Control B are 1."
          },
          {
            question: "What does a Fredkin gate do?",
            options: ["Flips three qubits.", "Swaps two qubits based on the state of a third control qubit.", "Deletes a qubit.", "Measures the system."],
            correctIndex: 1,
            explanation: "Fredkin is a Controlled-SWAP gate."
          }
        ]
      }
    }
  },
  {
    id: "L5-T7",
    levelId: 5,
    name: "Oracle Concepts",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T6", name: "Toffoli and Fredkin Gates" }] },
      whatYouWillLearn: [
        "The definition of a Quantum Oracle (Black Box).",
        "Phase Oracles vs Bit Oracles.",
        "Marking a 'correct' answer in a superposition.",
        "The concept of Query Complexity."
      ],
      introduction: "A Quantum Oracle is like a search engine's database. It is a 'black box' circuit that recognizes the solution to a problem. When we run a search algorithm like Grover's, we don't know where the answer is, but the Oracle can 'mark' it with a negative sign (phase flip) so our interference logic can find it.",
      whyItMatters: "Oracles allow us to separate the 'database' from the 'search logic'. We can study how many times we need to 'query' the oracle to find an answer, which is how we measure quantum speedup.",
      keyConcepts: [
        {
          heading: "Phase Kickback",
          description: "A technique where an Oracle flips the phase of a qubit instead of its bit-value, which is essential for interference."
        }
      ],
      mathematics: "$$ |x\\rangle \\rightarrow (-1)^{f(x)} |x\\rangle $$",
      analogy: "An oracle is like a teacher who won't tell you the answer, but will nod their head if you guess correctly. The quantum computer guesses all answers simultaneously, and the teacher 'nods' at the right one.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# An oracle that marks the state |11>\noracle = QuantumCircuit(2)\noracle.cz(0, 1)\nprint(oracle)",
        cirq: "# Phase oracle for Grover's in Cirq."
      },
      realWorldApplications: [
        { title: "Database Search", explanation: "Grover's algorithm uses an Oracle to find an item in an unsorted list in $\\sqrt{N}$ steps." }
      ],
      commonMistakes: [
        { mistake: "Thinking the Oracle 'knows' the answer.", correction: "The Oracle is just a circuit that implements a rule. It doesn't 'think'; it just transforms the wave function." }
      ],
      summary: [
        "Oracles are 'Black Boxes' that mark solutions.",
        "They use phase flips to signal a match.",
        "Quantum algorithms try to minimize the number of 'queries' to the Oracle."
      ],
      quiz: {
        topicId: "L5-T7",
        questions: [
          {
            question: "What is the primary role of an Oracle in algorithms like Grover's?",
            options: ["To print the answer.", "To 'mark' the correct state with a phase shift.", "To cool the qubits.", "To add numbers."],
            correctIndex: 1,
            explanation: "The oracle recognizes the solution and flags it for the rest of the algorithm to find."
          },
          {
            question: "What is 'Phase Kickback'?",
            options: ["The computer pushing the user.", "A technique where the result of an operation is stored in the phase of the qubit.", "A type of error.", "A cooling mechanism."],
            correctIndex: 1,
            explanation: "Phase kickback is a fundamental trick for making function outputs usable for interference."
          },
          {
            question: "In quantum query complexity, what are we trying to minimize?",
            options: ["The size of the computer.", "The number of times we must ask the Oracle for information.", "The number of users.", "The cost of the electricity."],
            correctIndex: 1,
            explanation: "The 'speed' of a quantum algorithm is often measured by how few queries it needs to solve a problem."
          }
        ]
      }
    }
  },
  {
    id: "L5-T8",
    levelId: 5,
    name: "Measuring the Whole System",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T2", name: "Building Your First Circuit" }] },
      whatYouWillLearn: [
        "Global Measurement vs Local Measurement.",
        "Interpreting multi-qubit bitstrings (e.g., '101').",
        "The relationship between the number of qubits and state space size.",
        "Statistical confidence in results."
      ],
      introduction: "When we measure a multi-qubit system, we get a string of bits (like '011'). With $n$ qubits, there are $2^n$ possible outcomes. Measuring the system collapses the entire multi-qubit wave function into just one of these possibilities. By analyzing which bitstrings appear most often, we can reconstruct the final state of the quantum calculation.",
      whyItMatters: "As we add more qubits, the 'search space' grows exponentially. Measurement is the bottleneck where we extract the final answer from this massive space.",
      keyConcepts: [
        {
          heading: "State Space",
          description: "10 qubits have 1,024 possible answers. 50 qubits have over 1 quadrillion. A quantum computer 'lives' in this massive space until it is measured."
        },
        {
          heading: "Bit Order",
          description: "In Qiskit, the rightmost bit is Qubit 0 (Little Endian). In Cirq, it varies. Always check your bit ordering!"
        }
      ],
      mathematics: "$$ P(x_1 x_2 \dots x_n) = |\\langle x_1 x_2 \dots x_n | \\psi \\rangle |^2 $$",
      analogy: "It's like a choir of 100 people. While they are singing, you hear a complex chord. When you point a microphone at one person, you only hear their specific note.",
      visualType: "PROBABILITY_HISTOGRAM",
      codeImplementation: {
        qiskit: "qc.measure_all()\n# Result will be a dictionary like {'00': 512, '11': 512}",
        cirq: "results = sim.run(c, repetitions=1024)\nprint(results.counts())"
      },
      realWorldApplications: [
        { title: "Quantum Sampling", explanation: "Generating complex probability distributions that are hard for classical computers to simulate." }
      ],
      commonMistakes: [
        { mistake: "Reading the bits in the wrong order.", correction: "Is the first bit Qubit 0 or Qubit N? Different libraries use different conventions; always verify with a simple test circuit." }
      ],
      summary: [
        "Measurement collapses the multi-qubit state into a single bitstring.",
        "A system of $n$ qubits has $2^n$ possible measurement outcomes.",
        "Bit ordering (Endianness) is a common source of bugs."
      ],
      quiz: {
        topicId: "L5-T8",
        questions: [
          {
            question: "How many possible measurement outcomes are there for a 4-qubit system?",
            options: ["4", "8", "16", "32"],
            correctIndex: 2,
            explanation: "2 to the power of 4 is 16."
          },
          {
            question: "What is 'Little Endian' bit ordering?",
            options: ["The largest bit is on the left.", "The smallest (Qubit 0) is on the right.", "Bits are sorted by size.", "Bits are random."],
            correctIndex: 1,
            explanation: "Little Endian means the '0' qubit is at the end of the string (rightmost)."
          },
          {
            question: "What happens if you only measure one qubit in a 10-qubit entangled system?",
            options: ["The whole system collapses.", "Only that one qubit collapses; the others stay quantum but their state changes based on the result.", "Nothing happens.", "The computer shuts down."],
            correctIndex: 1,
            explanation: "Partial measurement is a powerful tool; it collapses the measured qubit and 'projects' the rest of the system into a new state."
          }
        ]
      }
    }
  }
];

export const LEVEL_5_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
