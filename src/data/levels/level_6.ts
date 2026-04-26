import { Topic, QuizQuestion } from '../types';

export const LEVEL_6_TOPICS: Topic[] = [
  {
    id: "L6-T1",
    levelId: 6,
    name: "What is Entanglement",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T8", name: "Multiple Qubits" }] },
      whatYouWillLearn: [
        "The physical definition of Entanglement as a non-separable state.",
        "The mathematical criteria for inseparability in Hilbert spaces.",
        "The concept of Non-Locality and the collapse of the wavefunction.",
        "Distinguishing between classical correlation and quantum entanglement."
      ],
      introduction: "Entanglement is the most counter-intuitive yet powerful resource in quantum information science. It describes a phenomenon where two or more quantum particles become linked in such a way that the quantum state of each particle cannot be described independently of the state of the others, even when separated by galactic distances. While classical correlations (like having two halves of a torn postcard) represent shared information from the past, quantum entanglement represents a unified, non-local physical identity.\n\nWhen two qubits are entangled, their individual identities effectively vanish, replaced by a single, joint state vector. This unified existence persists until a measurement is performed on one of the qubits, which instantly forces the entire system to resolve into a specific state, regardless of the distance between them. This 'Spooky Action at a Distance,' as Einstein famously called it, is not just a philosophical curiosity but the fundamental 'glue' that allows quantum computers to perform computations across exponentially large Hilbert spaces.",
      whyItMatters: "Entanglement is the 'Quantum Glue'. Without it, a quantum computer is just a collection of independent qubits, providing zero speedup over classical systems. It is the primary mechanism enabling algorithms like Shor's and protocols like Teleportation.",
      keyConcepts: [
        {
          heading: "Inseparability",
          description: "An entangled state $|\psi\rangle$ is one that cannot be written as a tensor product of individual states ($|a\rangle \otimes |b\rangle$). The information is not 'in' the qubits; it is 'in' the relationship between them."
        },
        {
          heading: "Non-Locality",
          description: "Measuring one qubit instantly determines the state of its entangled partner. This doesn't violate the speed of light for information transfer, but it does prove that the universe is not 'locally real' in the classical sense."
        },
        {
          heading: "Monogamy of Entanglement",
          description: "A qubit can be maximally entangled with only one other qubit. If Qubit A is perfectly entangled with B, it cannot be entangled at all with Qubit C. This property is crucial for secure quantum communication."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}} \\neq (\\alpha|0\\rangle + \\beta|1\\rangle) \\otimes (\\gamma|0\\rangle + \\delta|1\\rangle) $$\\n\\nFor a 2-qubit state $$ |\\psi\\rangle = a|00\\rangle + b|01\\rangle + c|10\\rangle + d|11\\rangle $$, the state is entangled if and only if:\\n$$ ad - bc \\neq 0 $$",
      analogy: "Imagine two magic books. When you open one to page 42 and see the word 'Apple', the other book—even if it's on Mars—automatically changes its page 42 to show the word 'Apple' at the exact same microsecond. They are two physical objects acting as a single logical unit.",
      visualType: "ENTANGLEMENT_VIZ",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\n\n# 1. Initialize a 2-qubit circuit\nqc = QuantumCircuit(2)\n\n# 2. Put qubit 0 into superposition\nqc.h(0)\n\n# 3. Entangle qubit 0 and 1 via CNOT\nqc.cx(0, 1)\n\n# 4. Observe the state (Probability of 00 and 11 will be 50/50, 01/10 will be 0)\nprint('Maximally Entangled State (Bell State) Created.')",
        cirq: "import cirq\n\n# Define two qubits\nq0, q1 = cirq.LineQubit.range(2)\n\n# Create entanglement\ncircuit = cirq.Circuit(\n    cirq.H(q0),\n    cirq.CNOT(q0, q1)\n)\n\nprint(f'Circuit:\\n{circuit}')"
      },
      realWorldApplications: [
        { title: "Quantum Cryptography", explanation: "The E91 protocol uses entanglement to detect eavesdropping. If a hacker tries to measure the qubits, the entanglement is disturbed, revealing their presence." },
        { title: "Distributed Computing", explanation: "Entangled qubits can act as 'shared memory' between different quantum processors, enabling parallel processing across distances." }
      ],
      commonMistakes: [
        { mistake: "Thinking entanglement can send information faster than light.", correction: "While the collapse is instantaneous, you cannot use it to send a message without a classical channel (No-Communication Theorem)." },
        { mistake: "Assuming entanglement is permanent.", correction: "Entanglement is extremely fragile. Environmental 'noise' (heat, radiation) causes decoherence, which breaks the link." }
      ],
      summary: [
        "Entangled states are inseparable and unified.",
        "The state vector describes the system as a whole, not individual parts.",
        "Entanglement allows for stronger-than-classical correlations.",
        "It is the foundation of quantum communication and advanced computing.",
        "Entanglement obeys the 'Monogamy' principle, limiting links."
      ],
      quiz: {
        topicId: "L6-T1",
        questions: [
          {
            question: "Mathematically, what is the defining characteristic of an entangled state?",
            options: ["It has only real numbers.", "It cannot be written as the tensor product of individual qubit states.", "It has a probability of 1.0 for all states.", "It requires at least 3 qubits."],
            correctIndex: 1,
            explanation: "Entanglement is synonymous with 'non-separability'. If a state cannot be factored into $|a\rangle \otimes |b\rangle$, it is entangled."
          },
          {
            question: "Why can't entanglement be used to send messages faster than the speed of light?",
            options: ["The distance is too great.", "Because you still need a classical channel to interpret the results (No-Communication Theorem).", "Because qubits are too slow.", "Because light is the maximum speed for everything."],
            correctIndex: 1,
            explanation: "Even though measurement collapse is instant, the outcome is random. To make sense of the outcome, Alice must tell Bob her result via classical means (which are limited by light speed)."
          },
          {
            question: "What is the 'Monogamy of Entanglement'?",
            options: ["Qubits can only be entangled for a short time.", "A qubit can be maximally entangled with only one other qubit at a time.", "Only superconducting qubits can entangle.", "Entanglement only works between identical particles."],
            correctIndex: 1,
            explanation: "Monogamy is a fundamental constraint in quantum mechanics that prevents a single qubit from sharing its maximum entanglement with multiple partners simultaneously."
          }
        ]
      }
    }
  },
  {
    id: "L6-T2",
    levelId: 6,
    name: "Bell States",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L6-T1", name: "What is Entanglement" }] },
      whatYouWillLearn: [
        "The definition of the four Maximally Entangled States (Bell Basis).",
        "How to generate each Bell state using H and CNOT gates.",
        "The physical significance of correlation vs anti-correlation.",
        "The difference between the Computational Basis and the Bell Basis."
      ],
      introduction: "Bell states, named after John Bell, are the four specific 2-qubit states that represent the absolute maximum amount of entanglement possible between two particles. These states form a complete orthonormal basis for the 4-dimensional 2-qubit Hilbert space. While the standard computational basis ($|00\rangle, |01\rangle, |10\rangle, |11\rangle$) describes independent bit configurations, the Bell Basis describes pure, maximal correlations.\n\nTwo of the states ($|\Phi^{\pm}\rangle$) represent perfect correlations (the qubits always match), while the other two ($|\Psi^{\pm}\rangle$) represent perfect anti-correlations (the qubits always differ). These states are the 'Golden Standard' for quantum communication protocols and are used as the primary resource for quantum teleportation and superdense coding.",
      whyItMatters: "Bell states are the 'primary colors' of entanglement. Every complex multi-qubit relationship can be understood as a combination of these four fundamental patterns.",
      keyConcepts: [
        {
          heading: "Phi States ($|\Phi^{\pm}\rangle$)",
          description: "Correlated states. If you measure one qubit as 0, the other is guaranteed to be 0. If 1, the other is 1. The $\pm$ refers to the relative phase between the $|00\rangle$ and $|111\rangle$ components."
        },
        {
          heading: "Psi States ($|\Psi^{\pm}\rangle$)",
          description: "Anti-correlated states. If you measure one qubit as 0, the other is guaranteed to be 1. These are used in protocols requiring 'opposite' outcomes."
        },
        {
          heading: "Bell Measurement",
          description: "A technique where you take two qubits and measure them in the Bell Basis rather than the Z-basis, revealing how they are entangled rather than what their individual values are."
        }
      ],
      mathematics: "$$ |\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}, \\quad |\\Phi^-\\rangle = \\frac{|00\\rangle - |11\\rangle}{\\sqrt{2}} $$\\n$$ |\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}}, \\quad |\\Psi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}} $$",
      analogy: "Imagine four different types of magic walkie-talkies. Type 1: whatever you say, the other repeats exactly. Type 2: same, but with a slight echo delay (phase). Type 3: whatever you say, the other says the opposite. Type 4: same, but with a slight delay. These are the four 'fixed settings' for two entangled qubits.",
      visualType: "ENTANGLEMENT_VIZ",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n\n# Generating |Phi+>\nqc_phi_plus = QuantumCircuit(2)\nqc_phi_plus.h(0)\nqc_phi_plus.cx(0, 1)\n\n# Generating |Psi->\nqc_psi_minus = QuantumCircuit(2)\nqc_psi_minus.x(1) # Start with |01>\nqc_psi_minus.h(0)\nqc_psi_minus.cx(0, 1)\nqc_psi_minus.z(0) # Adjust phase\nprint('Bell State Generation Circuits Ready.')",
        cirq: "import cirq\nq0, q1 = cirq.LineQubit.range(2)\n\n# Phi+ Circuit\nphi_plus = cirq.Circuit(cirq.H(q0), cirq.CNOT(q0, q1))\n\n# Psi- Circuit\npsi_minus = cirq.Circuit(\n    cirq.X(q0), # Start in |10>\n    cirq.H(q0),\n    cirq.CNOT(q0, q1)\n)"
      },
      realWorldApplications: [
        { title: "Teleportation", explanation: "A pre-shared |Phi+> state acts as the 'quantum bridge' that Alice and Bob use to move a qubit's state across distance." },
        { title: "Quantum Key Distribution (QKD)", explanation: "The Ekert91 protocol uses Bell pairs to generate a shared secret key that is physically impossible to intercept without detection." }
      ],
      commonMistakes: [
        { mistake: "Confusing |Phi> and |Psi>.", correction: "Phi states ($|00\rangle, |11\rangle$) are for same-value outcomes; Psi states ($|01\rangle, |10\rangle$) are for different-value outcomes." },
        { mistake: "Thinking H-CNOT always makes |Phi+>.", correction: "If you start with input |10> instead of |00>, H-CNOT will produce a different Bell state (|Phi->)." }
      ],
      summary: [
        "There are exactly four maximally entangled states for two qubits.",
        "They form the Bell Basis, a foundation for quantum communication.",
        "Phi states are correlated; Psi states are anti-correlated.",
        "H and CNOT gates are the building blocks to create these states.",
        "The relative phase ($\pm$) determines the interference behavior."
      ],
      quiz: {
        topicId: "L6-T2",
        questions: [
          {
            question: "Which Bell state represents a perfect anti-correlation with a positive phase?",
            options: ["$|\\Phi^+\\rangle$", "$|\\Phi^-\\rangle$", "$|\\Psi^+\\rangle$", "$|\\Psi^-\\rangle$"],
            correctIndex: 2,
            explanation: "$|\\Psi^+\\rangle = (|01\\rangle + |10\\rangle)/\sqrt{2}$ represents anti-correlation (0 vs 1) with a positive phase."
          },
          {
            question: "What is the result of measuring a qubit that is part of a $|\\Phi^+\\rangle$ state if the other qubit was already measured as '1'?",
            options: ["It is 0 with 100% certainty.", "It is 1 with 100% certainty.", "It is a 50/50 random chance.", "It is in a superposition of |0> and |1>."],
            correctIndex: 1,
            explanation: "In $|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\sqrt{2}$, if one qubit is 1, the other MUST be 1. Entanglement creates perfect correlation."
          },
          {
            question: "How many qubits are required to form a Bell State?",
            options: ["1", "2", "3", "4"],
            correctIndex: 1,
            explanation: "Bell states are specifically defined as the maximally entangled states for a 2-qubit system."
          }
        ]
      }
    }
  },
  {
    id: "L6-T3",
    levelId: 6,
    name: "EPR Paradox",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L6-T1", name: "What is Entanglement" }] },
      whatYouWillLearn: [
        "The history of the Einstein-Podolsky-Rosen (EPR) objection to quantum mechanics.",
        "The concepts of Locality and Realism (Local Realism).",
        "How Hidden Variable theories attempted to 'save' classical intuition.",
        "The difference between classical probability and quantum uncertainty."
      ],
      introduction: "In 1935, Albert Einstein, Boris Podolsky, and Nathan Rosen published a paper that challenged the completeness of quantum mechanics. They were deeply uncomfortable with the 'spooky' implications of entanglement and measurement. Their argument, known as the EPR Paradox, stated that if you could perfectly predict a particle's property (like its position or spin) by measuring its distant entangled partner, then that property must have been 'real' even before the measurement.\n\nEinstein famously believed that particles must have 'Local Hidden Variables'—pre-determined values set at the moment of their creation—similar to how two shoes in a box are pre-determined as 'Left' or 'Right'. He argued that quantum mechanics was merely a statistical approximation of a deeper, deterministic reality. This debate raged for decades until John Bell provided a mathematical way to test if Einstein was right.",
      whyItMatters: "The EPR Paradox isn't just a history lesson; it defines the boundary between classical and quantum logic. Solving it proved that the universe is fundamentally non-local and probabilistic.",
      keyConcepts: [
        {
          heading: "Local Realism",
          description: "The classical assumption that: 1) objects have definite properties regardless of observation (Realism), and 2) information cannot travel faster than light (Locality)."
        },
        {
          heading: "Hidden Variables",
          description: "The theory that quantum outcomes are not random, but are determined by 'hidden' properties we just haven't measured yet. Einstein was the lead advocate for this view."
        },
        {
          heading: "Incompleteness",
          description: "EPR argued that because quantum mechanics couldn't predict the 'real' hidden values, the theory must be 'incomplete' and waiting for a better replacement."
        }
      ],
      mathematics: "$$ \\text{Einstein's Hope: } P(A,B) = \\int \\rho(\\lambda) P(A|\\lambda) P(B|\\lambda) d\\lambda $$\\nThis equation represents the attempt to explain correlations via a shared hidden parameter $\\lambda$.",
      analogy: "Classical shoes: You put a left shoe in one box and a right shoe in another. If you open Alice's box and see 'Left', you know Bob has 'Right'. But the shoes were ALWAYS left and right. Quantum entanglement says the shoes were BOTH left and right until you opened the box, and the act of opening 'created' the reality for both boxes instantly.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# We can simulate the EPR thought experiment\n# By creating a Bell pair and measuring in different axes\nfrom qiskit import QuantumCircuit, execute, Aer\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\n# This state violates classical logic when measured in 'tilted' bases.",
        cirq: "import cirq\n# Cirq is often used to run 'Bell Inequality' tests on hardware.\nq0, q1 = cirq.LineQubit.range(2)\ncircuit = cirq.Circuit(cirq.H(q0), cirq.CNOT(q0, q1), cirq.measure(q0, q1))"
      },
      realWorldApplications: [
        { title: "Quantum Foundation Tests", explanation: "Modern physics relies on EPR-style experiments to verify that our hardware is truly 'Quantum' and not just simulating classical noise." }
      ],
      commonMistakes: [
        { mistake: "Thinking the EPR paradox is still a 'paradox'.", correction: "It was a paradox only as long as we lacked experimental proof. Since the 1970s, Bell tests have proven that Einstein's 'Hidden Variables' do not exist." },
        { mistake: "Assuming Einstein was 'stupid' for doubting QM.", correction: "Einstein was actually being a very rigorous physicist; he correctly identified the weirdest part of the theory and forced others to prove it mathematically." }
      ],
      summary: [
        "Einstein, Podolsky, and Rosen doubted quantum non-locality.",
        "They argued for 'Local Hidden Variables' (pre-determined reality).",
        "The EPR paper claimed quantum mechanics was an 'incomplete' theory.",
        "This led to the development of Bell's Theorem.",
        "The paradox is resolved: the universe is non-local and probabilistic."
      ],
      quiz: {
        topicId: "L6-T3",
        questions: [
          {
            question: "What did Einstein mean by 'Local Realism'?",
            options: ["Everything is relative to the observer.", "Objects have fixed properties, and no signal can travel faster than light.", "The universe is a computer simulation.", "Quantum gates are 100% efficient."],
            correctIndex: 1,
            explanation: "Local Realism is the combination of 'Locality' (speed of light limit) and 'Realism' (fixed properties independent of measurement)."
          },
          {
            question: "What was the 'Hidden Variable' theory attempting to explain?",
            options: ["Why qubits overheat.", "Why quantum measurement outcomes appear random but are actually pre-determined.", "How to build a better battery.", "The existence of parallel universes."],
            correctIndex: 1,
            explanation: "Hidden variable theories suggested that if we knew everything about a particle's 'hidden' state, we could predict its quantum outcome exactly."
          },
          {
            question: "In the context of the EPR paradox, what does the term 'Completeness' refer to?",
            options: ["A circuit with all possible gates.", "Whether a physical theory accounts for every element of physical reality.", "A qubit with 100% coherence.", "A successful software build."],
            correctIndex: 1,
            explanation: "EPR argued that a theory is only 'complete' if it can predict every 'real' property of a system. Since QM couldn't predict hidden variables, they called it incomplete."
          }
        ]
      }
    }
  },
  {
    id: "L6-T4",
    levelId: 6,
    name: "Entanglement Swapping",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L6-T2", name: "Bell States" }] },
      whatYouWillLearn: [
        "The mechanism for entangling two qubits that have never met.",
        "The role of intermediate 'Quantum Relays'.",
        "How Bell State Measurement (BSM) transfers entanglement.",
        "Applications in long-distance Quantum Networking."
      ],
      introduction: "Entanglement Swapping is one of the most remarkable protocols in quantum communication. It allows two qubits (let's say Alice's and Charlie's) to become entangled even if they have never been in the same room or interacted with each other. This is achieved by using an intermediate party, Bob, who acts as a bridge.\n\nIf Alice has a qubit entangled with Bob, and Charlie also has a qubit entangled with Bob, Bob can perform a special 'Bell State Measurement' on his two halves. This measurement 'swaps' the entanglement: Bob's qubits become entangled with each other and then collapse, while Alice's and Charlie's qubits—who were previously strangers—suddenly become perfectly entangled across the distance. Bob effectively 'relays' the quantum link from Alice to Charlie.",
      whyItMatters: "This is the backbone of the 'Quantum Internet'. Because quantum signals cannot be amplified without destroying their state (No-Cloning Theorem), we must use entanglement swapping to 'jump' links across long fiber-optic cables.",
      keyConcepts: [
        {
          heading: "Quantum Repeaters",
          description: "Classical repeaters boost signals. Quantum repeaters use entanglement swapping to extend the range of a quantum link without 'reading' the data."
        },
        {
          heading: "Bell State Measurement (BSM)",
          description: "The core operation Bob performs. It requires a CNOT and a Hadamard gate followed by measurement to project Bob's qubits into the Bell Basis."
        },
        {
          heading: "Non-Contact Entanglement",
          description: "Proves that entanglement is a property of the global wave function, not just a result of particles touching each other."
        }
      ],
      mathematics: "$$ |\\psi\\rangle_{A,B1} \\otimes |\\psi\\rangle_{B2,C} \\xrightarrow{\\text{BSM on } B1, B2} |\\psi\\rangle_{A,C} $$\\nBob's measurement in the basis $$ \\{|\\Phi^{\\pm}\\rangle, |\\Psi^{\\pm}\\rangle\\} $$ forces A and C into an entangled state.",
      analogy: "Alice and Bob are holding a taut rope. Bob and Charlie are also holding a taut rope. Bob ties his two ends together and steps away. Now Alice and Charlie are holding the same rope, even though they never met to tie it themselves.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(4, 2)\n# 1. Create two pairs: (0,1) and (2,3)\nqc.h([0, 2]); qc.cx(0, 1); qc.cx(2, 3)\n# 2. Bob performs BSM on 1 and 2\nqc.cx(1, 2); qc.h(1)\nqc.measure([1, 2], [0, 1])\n# 3. Now 0 and 3 are entangled!\nprint('Entanglement Swapping Protocol defined.')",
        cirq: "import cirq\nq_alice, q_bob1, q_bob2, q_charlie = cirq.LineQubit.range(4)\n# Setup and swap logic in Cirq follows the same gate sequence."
      },
      realWorldApplications: [
        { title: "Quantum Repeaters", explanation: "Enabling quantum communication across continents by placing 'swapping nodes' every 50km in the fiber network." },
        { title: "Secure Multi-party Computation", explanation: "Allowing different quantum computers to work together on a single problem without sharing their private data." }
      ],
      commonMistakes: [
        { mistake: "Assuming Bob stays entangled.", correction: "By performing the swap, Bob 'uses up' his entanglement. He is left with classical bits, while Alice and Charlie get the quantum link." },
        { mistake: "Thinking it's a 'copy' operation.", correction: "It is a transfer of relationship. No information is cloned; the link simply moves." }
      ],
      summary: [
        "Entanglement can be transferred without direct interaction.",
        "A third party (Bob) performs a Bell State Measurement.",
        "Alice and Charlie become entangled across the relay node.",
        "Essential for scaling the Quantum Internet.",
        "Demonstrates the fluid, non-local nature of quantum information."
      ],
      quiz: {
        topicId: "L6-T4",
        questions: [
          {
            question: "In entanglement swapping, do the two final entangled qubits (Alice and Charlie) ever need to interact directly?",
            options: ["Yes, they must touch at the start.", "No, the entanglement is transferred via an intermediate party's measurement.", "Only if they are superconducting qubits.", "Yes, they must be within 1 meter of each other."],
            correctIndex: 1,
            explanation: "The magic of swapping is that Alice and Charlie never interact; Bob performs a measurement on his qubits to link theirs."
          },
          {
            question: "What is the primary hardware application for entanglement swapping?",
            options: ["Making faster GPUs.", "Building Quantum Repeaters for long-distance networking.", "Cooling the dilution refrigerator.", "Storing classical files."],
            correctIndex: 1,
            explanation: "Because quantum states decay in fiber optics, we need repeaters that use 'swapping' to extend the range of the link."
          },
          {
            question: "What happens to the intermediate party (Bob) after the swap is complete?",
            options: ["He becomes a master qubit.", "His qubits are no longer entangled with Alice or Charlie.", "He can now read Alice's private thoughts.", "His computer shuts down."],
            correctIndex: 1,
            explanation: "Bob's qubits lose their entanglement with Alice and Charlie during the Bell State Measurement. He is left with 2 classical bits."
          }
        ]
      }
    }
  },
  {
    id: "L6-T5",
    levelId: 6,
    name: "Quantum Teleportation",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L6-T2", name: "Bell States" }] },
      whatYouWillLearn: [
        "The step-by-step protocol to move an unknown quantum state.",
        "The role of the 'Quantum Bridge' (Bell pair).",
        "Why classical communication is a mandatory bottleneck.",
        "Proof that matter doesn't move, only information (the state) does."
      ],
      introduction: "Quantum Teleportation is the process of moving the EXACT quantum state of a qubit from one location to another without the physical qubit itself traveling through space. It is the most famous application of entanglement and serves as the fundamental way to move data in a modular quantum computer.\n\nThe protocol requires Alice and Bob to share an entangled Bell pair ($|\Phi^+\rangle$) in advance. Alice takes her unknown state ($|\psi\rangle$) and performs a Bell State Measurement together with her half of the entangled pair. This measurement destroys her original state (consistent with the No-Cloning Theorem) and collapses Bob's distant qubit into a state that is 'almost' Alice's. Alice then sends two classical bits of results to Bob, who uses them to apply a final 'correction' gate (X or Z) to perfectly recover Alice's original state.",
      whyItMatters: "It is the only way to move quantum data. You cannot 'copy and paste' a qubit's state into a fiber optic cable; you must teleport the information across a pre-existing entanglement bridge.",
      keyConcepts: [
        {
          heading: "Information vs. Matter",
          description: "We are not moving the atom; we are moving the 'recipe' or the 'state' of the atom. The atom at Bob's end simply 'becomes' the atom that Alice had."
        },
        {
          heading: "The Classical Link",
          description: "Teleportation is not faster-than-light. Bob cannot 'use' the teleported state until he receives Alice's classical bits (sent via internet/radio) to know which correction gate to apply."
        },
        {
          heading: "No-Cloning Compliance",
          description: "Alice's original qubit is destroyed by her measurement. Thus, we have 'moved' the state, not duplicated it."
        }
      ],
      mathematics: "$$ |\\psi\\rangle \\otimes |\\Phi^+\\rangle_{AB} \\xrightarrow{\\text{Alice BSM}} \\text{Bob's state becomes } \\{I, X, Z, XZ\\}|\\psi\\rangle $$\\nAlice sends 2 bits ($b1, b2$). Bob applies $$ X^{b2}Z^{b1} $$ to finish.",
      analogy: "Imagine a 3D printer that requires a block of 'blank' clay at the destination. You scan the original object at Alice's house, which grinds the original into dust (measurement). You send the scan data to Bob, and the scanner uses Bob's 'blank' clay to perfectly reform the original object.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister\nqr = QuantumRegister(3)\ncr = ClassicalRegister(2)\nqc = QuantumCircuit(qr, cr)\n\n# 1. Setup Bell Pair (Q1, Q2)\nqc.h(1); qc.cx(1, 2)\n\n# 2. Alice's BSM (Q0 is state to move)\nqc.cx(0, 1); qc.h(0)\nqc.measure([0, 1], [0, 1])\n\n# 3. Bob's corrections\nqc.x(2).c_if(cr[1], 1)\nqc.z(2).c_if(cr[0], 1)\nprint('Teleportation Circuit Complete.')",
        cirq: "import cirq\nq0, q1, q2 = cirq.LineQubit.range(3)\n# Standard 3-qubit teleportation circuit construction in Cirq."
      },
      realWorldApplications: [
        { title: "Modular Architectures", explanation: "Large quantum computers will be made of many small chips connected by 'teleportation links' to move data between them." },
        { title: "Secure Satellite Comms", explanation: "China's Micius satellite has successfully teleported states from Earth to orbit, proving the feasibility of a global quantum network." }
      ],
      commonMistakes: [
        { mistake: "Thinking the qubit 'travels' like a particle.", correction: "The particle at Bob's end was already there. It simply takes on the mathematical 'identity' of Alice's particle." },
        { mistake: "Believing it works without classical bits.", correction: "Without the 2 classical bits, Bob has a 'garbled' state that looks completely random to him. He needs Alice's bits to 'unlock' the correct state." }
      ],
      summary: [
        "Teleportation moves states, not particles.",
        "Requires pre-shared entanglement and classical bits.",
        "Moves 1 qubit of info using 1 Bell pair and 2 classical bits.",
        "Respects the No-Cloning Theorem (destroys the original).",
        "Limited by the speed of light."
      ],
      quiz: {
        topicId: "L6-T5",
        questions: [
          {
            question: "Why is Alice's original qubit state destroyed during the teleportation process?",
            options: ["Hardware error.", "Because the No-Cloning Theorem forbids making a copy, so the 'move' must be destructive.", "Qubits are single-use only.", "The laser burns the atom."],
            correctIndex: 1,
            explanation: "In quantum mechanics, you cannot copy an unknown state. Teleportation works by transferring the state, which inherently destroys the original to satisfy the No-Cloning theorem."
          },
          {
            question: "What must Alice send to Bob over a classical channel to complete the teleportation?",
            options: ["The qubit itself.", "The mathematical state vector.", "Two classical bits of measurement results.", "The password for her computer."],
            correctIndex: 2,
            explanation: "Bob receives a 'garbled' version of the state instantly, but he needs Alice's 2 bits of measurement data to know how to 'rotate' it into the correct final state."
          },
          {
            question: "Does quantum teleportation allow for communication faster than the speed of light?",
            options: ["Yes, it's instant.", "No, because the classical bits Alice sends are limited by the speed of light.", "Only if you use fiber optics.", "Yes, but only for very small distances."],
            correctIndex: 1,
            explanation: "Even though the entanglement link is instant, the message (the state) is only usable once the classical bits arrive at Bob's location at the speed of light."
          }
        ]
      }
    }
  },
  {
    id: "L6-T6",
    levelId: 6,
    name: "Superdense Coding",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L6-T2", name: "Bell States" }] },
      whatYouWillLearn: [
        "The inverse protocol of teleportation.",
        "Sending 2 classical bits by physically moving only 1 qubit.",
        "The encoding of classical values into the Bell Basis.",
        "Theoretical efficiency gains in communication bandwidth."
      ],
      introduction: "Superdense Coding is the inverse of teleportation. While teleportation uses classical bits to move a quantum state, Superdense Coding uses a quantum state to move classical bits. It allows Alice to send Bob TWO classical bits of information by physically sending him only ONE qubit. \n\nThis 'impossible' bandwidth gain is only possible if Alice and Bob already share a maximally entangled Bell pair. Alice performs a specific operation (I, X, Z, or both) on her qubit to transform the joint entangled state into one of the four Bell states corresponding to '00', '01', '10', or '11'. She then sends her physical qubit to Bob. Bob now holds BOTH qubits of the pair and performs a Bell Measurement, revealing both of Alice's bits at once.",
      whyItMatters: "Superdense Coding proves that entanglement is a 'storage medium' for information. Even though we only sent one particle, we sent the information capacity of two particles because of the pre-loaded relationship between them.",
      keyConcepts: [
        {
          heading: "Bandwidth Doubling",
          description: "1 physical qubit = 2 classical bits. This is the maximum theoretical efficiency for a quantum channel."
        },
        {
          heading: "Encoding Gates",
          description: "Alice uses her local gates (X for bit-flip, Z for phase-flip) to 'set' the shared entanglement to the desired message without Bob ever touching his qubit."
        },
        {
          heading: "Protocol Security",
          description: "If an interceptor steals the qubit Alice sends, they get ZERO information, because they don't have Bob's half of the entanglement to compare it to."
        }
      ],
      mathematics: "$$ \\text{Alice wants to send } (b1, b2) \\in \\{0,1\\}^2. $$\\nShe applies $$ Z^{b1}X^{b2} $$ to her half of $$ |\\Phi^+\\rangle $$.",
      analogy: "Alice and Bob each have a magic glove. If Alice turns her glove upside down, Bob's glove instantly knows it's the 'upside down' state. If she also turns it inside out, it's the 'inside out' state. By sending just the glove, she sends 2 different 'labels' (bits) at once.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 2)\n# 1. Pre-shared entanglement\nqc.h(0); qc.cx(0, 1)\n# 2. Alice encodes '11'\nqc.x(0); qc.z(0)\n# 3. Bob decodes\nqc.cx(0, 1); qc.h(0)\nqc.measure([0, 1], [0, 1])\nprint('Superdense Coding Circuit defined.')",
        cirq: "import cirq\nq0, q1 = cirq.LineQubit.range(2)\n# Standard encoding and decoding sequence in Cirq."
      },
      realWorldApplications: [
        { title: "Deep Space Comms", explanation: "Reducing the number of physical photons needed to send data from Mars to Earth, where every gram of payload matters." },
        { title: "Quantum Bus", explanation: "High-speed internal communication between quantum processor cores." }
      ],
      commonMistakes: [
        { mistake: "Thinking 1 qubit natively holds 2 bits.", correction: "No, you still need 2 qubits total (one for Alice, one for Bob). The 'magic' is that you only had to *send* one of them to transmit the 2 bits." },
        { mistake: "Assuming it's secure against Bob.", correction: "Bob is the intended recipient; he gets the full 2 bits. It's only secure against 'Man-in-the-middle' attackers." }
      ],
      summary: [
        "Alice sends 2 classical bits using 1 qubit of travel.",
        "Requires pre-shared entanglement.",
        "Alice encodes using X and Z gates.",
        "Bob decodes using a Bell Measurement.",
        "Entanglement doubles the channel capacity."
      ],
      quiz: {
        topicId: "L6-T6",
        questions: [
          {
            question: "How many classical bits can Alice send to Bob using one physical qubit in Superdense Coding?",
            options: ["1", "2", "4", "Unlimited"],
            correctIndex: 1,
            explanation: "Superdense coding allows for 2 classical bits of information to be sent per physical qubit transferred."
          },
          {
            question: "What is required for Alice to start the Superdense Coding protocol?",
            options: ["A very fast internet connection.", "A pre-shared entangled Bell pair with Bob.", "A superconducting processor.", "A classical laser."],
            correctIndex: 1,
            explanation: "The protocol absolutely relies on Alice and Bob sharing a maximally entangled pair before the message is encoded."
          },
          {
            question: "If an attacker intercepts the single qubit Alice sends to Bob, how much information can they extract?",
            options: ["Both bits.", "Only one bit.", "Zero information (the qubit looks like random noise without Bob's half).", "The entire secret key."],
            correctIndex: 2,
            explanation: "Because the information is stored in the *entanglement* between the two qubits, stealing just one qubit reveals nothing about the joint state."
          }
        ]
      }
    }
  },
  {
    id: "L6-T7",
    levelId: 6,
    name: "Entanglement Measures",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T4", name: "Inner Products and Norms" }] },
      whatYouWillLearn: [
        "How to quantify the degree of entanglement mathematically.",
        "Reduced Density Matrices and the Partial Trace operation.",
        "Von Neumann Entropy as a measure of entanglement.",
        "The difference between Pure and Mixed states in entanglement."
      ],
      introduction: "Not all entanglement is the same. Some states are 'maximally entangled' (like Bell states), while others are only 'partially entangled'. To build reliable quantum hardware, we need mathematical tools to measure exactly how much entanglement we have. If noise or decoherence occurs, the 'strength' of the entanglement drops.\n\nThe primary way we measure this is by looking at a piece of the system and seeing how much 'uncertainty' it has. If two qubits are NOT entangled, measuring one tells you nothing about the other, and you have zero uncertainty about your own state. But if they ARE entangled, looking at only one qubit makes it appear 'blurry' or 'random' because its identity is tied up in the other particle. We measure this 'blurriness' using **Von Neumann Entropy**.",
      whyItMatters: "Characterizing noise. If you want to know if your quantum processor is working correctly, you measure the entanglement between qubits. If the measure is too low, your algorithm will fail.",
      keyConcepts: [
        {
          heading: "Partial Trace",
          description: "The mathematical operation of 'ignoring' one part of a multi-qubit system to see the state of the remaining part ($\rho_A = \text{Tr}_B(\rho_{AB})$)."
        },
        {
          heading: "Reduced Density Matrix",
          description: "The result of a partial trace. For entangled states, this matrix describes a 'Mixed State' (statistical uncertainty)."
        },
        {
          heading: "Von Neumann Entropy",
          description: "A value (0 to 1) that tells you the entanglement. 1 means maximally entangled (Bell State); 0 means not entangled at all (Product State)."
        }
      ],
      mathematics: "$$ S(\\rho) = -\\text{Tr}(\\rho \\log \\rho) $$\\nFor a state $$ |\\psi\\rangle $$, the entanglement is $$ S(\\rho_A) $$ where $$ \\rho_A $$ is the reduced density matrix of qubit A.",
      analogy: "Entanglement measure is like a 'signal strength' bar on your phone. If you have 5 bars (Entropy = 1), your qubits are perfectly linked. If you have 0 bars (Entropy = 0), they are just two lonely particles acting classically.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import entropy, partial_trace, Statevector\n\n# Create Bell State\npsi = Statevector([1/2**0.5, 0, 0, 1/2**0.5])\n# Get reduced state of qubit 0\nrho_0 = partial_trace(psi, [1])\n# Measure entropy (should be 1.0)\nprint(f'Entanglement Entropy: {entropy(rho_0)}')",
        cirq: "import cirq\n# Cirq.density_matrix and Cirq.entropy are used for similar characterization."
      },
      realWorldApplications: [
        { title: "Error Budgeting", explanation: "Engineers calculate how much entanglement is 'lost' in each gate to determine how many gates an algorithm can run before failing." },
        { title: "Material Science", explanation: "Physicists measure entanglement entropy in new materials to find 'topological phases' that could lead to better superconductors." }
      ],
      commonMistakes: [
        { mistake: "Thinking entropy is a bad thing.", correction: "In classical systems, entropy is usually noise. In quantum systems, high entanglement entropy in a subsystem is a sign of a high-quality global quantum state." },
        { mistake: "Assuming you can measure entropy in one shot.", correction: "Entropy is a statistical measure of the density matrix; it requires many measurements (Tomography) to calculate accurately." }
      ],
      summary: [
        "Entanglement strength can be calculated as a number between 0 and 1.",
        "Partial Trace is the math for 'zooming in' on one qubit.",
        "Reduced states of entangled systems are 'Mixed' (messy).",
        "Von Neumann Entropy quantifies this messiness as entanglement.",
        "Maximally entangled states have an Entropy of 1."
      ],
      quiz: {
        topicId: "L6-T7",
        questions: [
          {
            question: "What does a Von Neumann Entropy of 1.0 in a 2-qubit subsystem indicate?",
            options: ["The qubits are not entangled.", "The qubits are maximally entangled.", "The computer is overheating.", "The qubits are in the |0> state."],
            correctIndex: 1,
            explanation: "Entropy of 1 (in a 2-level system) means the subsystem is completely mixed, which is the signature of maximal entanglement with another system."
          },
          {
            question: "What mathematical operation is used to 'ignore' one qubit to see the state of its partner?",
            options: ["Tensor Product.", "Partial Trace.", "Matrix Inversion.", "Square Root."],
            correctIndex: 1,
            explanation: "The Partial Trace $(\text{Tr}_B)$ allows us to extract the 'Reduced Density Matrix' of one part of a larger quantum system."
          },
          {
            question: "In an un-entangled (product) state, what is the entanglement entropy of the individual qubits?",
            options: ["1", "0.5", "0", "-1"],
            correctIndex: 2,
            explanation: "If qubits are not entangled, they have zero uncertainty about their own individual states, resulting in 0 entropy."
          }
        ]
      }
    }
  },
  {
    id: "L6-T8",
    levelId: 6,
    name: "Multipartite Entanglement",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L6-T1", name: "What is Entanglement" }] },
      whatYouWillLearn: [
        "Entanglement structures for 3 or more qubits.",
        "GHZ States (Greenberger-Horne-Zeilinger) and their 'fragile' nature.",
        "W-States and their 'robust' nature.",
        "The difference between global and distributed entanglement."
      ],
      introduction: "As we move beyond two qubits, entanglement becomes significantly more complex and interesting. With three or more particles, there isn't just one way to be 'maximally entangled'. There are different 'classes' of entanglement that cannot be converted into each other.\n\nThe two most important 3-qubit states are **GHZ States** and **W-States**. A GHZ state is a 'team' where everyone is perfectly synchronized—if one person leaves, the whole team falls apart. A W-state is more like a 'mesh'—if one person leaves, the others stay partially linked. Understanding these multi-party relationships is the key to scaling quantum computers to thousands of qubits.",
      whyItMatters: "Error Correction. Modern error correction codes (like the Surface Code) use multipartite entanglement to store one single 'logical bit' of info across hundreds of 'physical qubits' to protect it from noise.",
      keyConcepts: [
        {
          heading: "GHZ States ($|GHZ\\rangle$)",
          description: "Global synchronization. If you measure one qubit in a GHZ state, all entanglement between the remaining qubits is instantly destroyed. It is powerful but fragile."
        },
        {
          heading: "W-States ($|W\\rangle$)",
          description: "Distributed robustness. If one qubit is measured or lost, the remaining qubits still share a high degree of entanglement. This is used in robust communication networks."
        },
        {
          heading: "Entanglement Scaling",
          description: "In large systems, entanglement is often 'Local' (only between neighbors) or 'Global' (across the whole chip), depending on the algorithm."
        }
      ],
      mathematics: "$$ |GHZ\\rangle = \\frac{|000\\rangle + |111\\rangle}{\\sqrt{2}} $$\\n$$ |W\\rangle = \\frac{|100\\rangle + |010\\rangle + |001\\rangle}{\\sqrt{3}} $$",
      analogy: "GHZ is like a circle of people holding hands; if one person lets go, the circle is broken. W-state is like a fishing net; if one strand breaks, the rest of the net still holds its shape.",
      visualType: "ENTANGLEMENT_VIZ",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n\n# Create 3-qubit GHZ state\nqc_ghz = QuantumCircuit(3)\nqc_ghz.h(0)\nqc_ghz.cx(0, 1)\nqc_ghz.cx(1, 2)\nprint('GHZ State Circuit Created.')",
        cirq: "import cirq\nq = cirq.LineQubit.range(3)\n# GHZ in Cirq\nghz = cirq.Circuit(cirq.H(q[0]), cirq.CNOT(q[0], q[1]), cirq.CNOT(q[1], q[2]))"
      },
      realWorldApplications: [
        { title: "Secret Sharing", explanation: "Distributing a secret code among 3 people such that all 3 must cooperate to read it (using GHZ states)." },
        { title: "Error Correction", explanation: "Creating 'Logical Qubits' that can survive the failure of individual physical components." }
      ],
      commonMistakes: [
        { mistake: "Assuming all 3-qubit entanglement is identical.", correction: "No, GHZ and W states are in different 'SLOCC' classes. You cannot transform one into the other using only local gates." },
        { mistake: "Thinking GHZ is always better.", correction: "GHZ is better for absolute synchronization, but W is better for robustness against qubit loss." }
      ],
      summary: [
        "Multipartite entanglement involves 3 or more qubits.",
        "GHZ states are maximally global but extremely fragile.",
        "W-states are distributed and robust to qubit loss.",
        "Different algorithms require different entanglement 'topologies'.",
        "Foundational for building large-scale, fault-tolerant quantum computers."
      ],
      quiz: {
        topicId: "L6-T8",
        questions: [
          {
            question: "What happens to the remaining qubits if you measure one qubit in a 3-qubit GHZ state?",
            options: ["They stay entangled.", "They become a W-state.", "Their entanglement is destroyed, and they become independent states.", "They turn into photons."],
            correctIndex: 2,
            explanation: "GHZ states are 'all-or-nothing'. Measuring one qubit collapses the entire shared state into independent computational basis states."
          },
          {
            question: "Which multipartite state is characterized by being 'robust' to the loss of a qubit?",
            options: ["GHZ State.", "W-State.", "Bell State.", "Identity State."],
            correctIndex: 1,
            explanation: "W-states are designed such that if you lose one particle, the remaining ones still share a significant amount of entanglement."
          },
          {
            question: "What is the mathematical form of a 3-qubit GHZ state?",
            options: ["$(|000\\rangle + |111\\rangle)/\\sqrt{2}$", "$(|100\\rangle + |010\\rangle + |001\\rangle)/\\sqrt{3}$", "$|000\\rangle$", "$|111\\rangle$"],
            correctIndex: 0,
            explanation: "The GHZ state is the equal superposition of 'all zero' and 'all one' states across $n$ qubits."
          }
        ]
      }
    }
  }
];

export const LEVEL_6_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
