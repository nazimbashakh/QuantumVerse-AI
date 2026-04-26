import { Topic } from '../types';

export const LEVEL_9_TOPICS: Topic[] = [
  {
    id: "L9-T1",
    levelId: 9,
    name: "Quantum Noise and Decoherence",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T1", name: "What is a Qubit" }] },
      whatYouWillLearn: [
        "The physical origins of quantum errors (X and Z flips).",
        "The difference between T1 (Relaxation) and T2 (Dephasing) time.",
        "The mechanism of Decoherence: Interaction with the environment.",
        "Why quantum errors are continuous rather than binary."
      ],
      introduction: "Quantum states are arguably the most fragile physical objects in existence. Unlike classical bits, which require significant voltage to change state, a qubit can be corrupted by a single stray photon, a tiny vibration, or even the background cosmic radiation. This interference is collectively known as **Noise**. \n\nThe process where a quantum system loses its 'quantumness' (its superposition and entanglement) and becomes classical due to interaction with the external world is called **Decoherence**. It is the single biggest technical challenge to building a large-scale quantum computer. If the 'noise' kills the information before your algorithm finishes its calculation, the results will be completely random and useless.",
      whyItMatters: "The Survival Limit. Decoherence effectively puts a 'timer' on every quantum calculation. If your code takes longer than the T2 time of the hardware, it cannot be run without some form of error correction.",
      keyConcepts: [
        {
          heading: "T1: Relaxation Time",
          description: "The time it takes for a qubit in the high-energy $|1\\rangle$ state to spontaneously decay back to the $|0\\rangle$ state. Think of it as 'Energy Leakage'."
        },
        {
          heading: "T2: Dephasing Time",
          description: "The time it takes for the relative phase between $|0\\rangle$ and $|1\\rangle$ to become randomized. This is usually much faster than T1 and is the primary source of error in gates."
        },
        {
          heading: "The Bloch Sphere Drift",
          description: "Classical errors are binary (0 becomes 1). Quantum errors are continuous: a qubit might rotate by 0.0001 degrees away from its intended position, making it impossible to fix with simple classical logic."
        }
      ],
      mathematics: "$$ |\\psi(t)\\rangle = \\alpha |0\\rangle + \\beta e^{-t/T_2} e^{i\\phi(t)} |1\\rangle $$\\nThis equation shows the exponential decay of phase coherence over time.",
      analogy: "Superposition is like a delicate ice sculpture. Noise is the warm sun. Decoherence is the sculpture melting into a puddle—all the intricate detail is lost, and you are left with nothing but a pile of classical water.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit_aer.noise import NoiseModel, thermal_relaxation_error\n# Simulating a qubit with 50 microsecond T1/T2 times\nt1 = 50e3; t2 = 70e3; time_exp = 35e3\nerror = thermal_relaxation_error(t1, t2, time_exp)\nprint('Noise Model for T1/T2 Decay Initialized.')",
        cirq: "import cirq\n# Cirq.DepolarizingChannel is a common way to simulate general noise."
      },
      realWorldApplications: [
        { title: "Dilution Refrigerators", explanation: "Hardware companies build multi-million dollar cooling systems to reach 0.01 Kelvin, just to slow down the rate of decoherence." }
      ],
      commonMistakes: [
        { mistake: "Thinking cold alone fixes everything.", correction: "Even at near absolute zero, qubits still experience noise from magnetic fields, control electronics, and their own substrate materials." }
      ],
      summary: [
        "Qubits are extremely fragile and subject to environmental noise.",
        "Decoherence is the loss of quantum information over time.",
        "T1 is energy relaxation; T2 is phase randomization.",
        "Quantum errors are continuous (rotations), not just binary flips.",
        "Noise limits the 'Depth' of circuits we can run on current hardware."
      ],
      quiz: {
        topicId: "L9-T1",
        questions: [
          {
            question: "Which time constant represents the 'relaxation' from state |1> back to the ground state |0>?",
            options: ["T1.", "T2.", "T_total.", "Clock speed."],
            correctIndex: 0,
            explanation: "T1 is the longitudinal relaxation time, representing the loss of energy from the qubit to the environment."
          },
          {
            question: "What happens during 'Dephasing' (T2)?",
            options: ["The qubit explodes.", "The relative phase between 0 and 1 becomes random, destroying the superposition.", "The qubit becomes perfectly entangled.", "The computer turns into a classical computer."],
            correctIndex: 1,
            explanation: "Dephasing is the loss of the specific phase relationship that defines a superposition, effectively 'melting' the quantum state into a classical probability."
          },
          {
            question: "Why are quantum errors harder to fix than classical errors?",
            options: ["They are too fast.", "They are continuous rotations rather than just 0-to-1 flips.", "They require more power.", "There is no math for them."],
            correctIndex: 1,
            explanation: "Because a qubit can error by any arbitrary angle on the Bloch sphere, simple 'if bit flipped' logic doesn't work."
          }
        ]
      }
    }
  },
  {
    id: "L9-T2",
    levelId: 9,
    name: "Classical Error Correction",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [] },
      whatYouWillLearn: [
        "The concept of Redundancy as a defense against noise.",
        "The 3-bit Repetition Code (Majority Vote).",
        "Understanding Hamming Distance and Error Detection.",
        "Why classical logic cannot be directly applied to qubits."
      ],
      introduction: "Before we solve quantum errors, we must master how classical computers handle them. In your phone, hard drive, and space probes, errors happen constantly due to heat or cosmic rays. The most basic solution is **Redundancy**. Instead of sending a single '1', you send '111'. \n\nIf one bit flips due to noise and the receiver gets '101', they can take a **Majority Vote** (two '1's vs one '0') and correctly guess that the original message was '1'. This is called a Repetition Code. While this seems simple, it provides the foundation for the more complex 'Syndrome Measurements' we use in quantum space. However, as we will see, the No-Cloning Theorem prevents us from simply 'shouting the same qubit three times.'",
      whyItMatters: "Engineering Continuity. Classical error correction is the reason the digital world is reliable. Quantum error correction is the 'translation' of these principles into the language of Hilbert Space.",
      keyConcepts: [
        {
          heading: "Logical vs Physical Bit",
          description: "The 'Logical' bit is the information (1). The 'Physical' bits are the actual hardware units (111) used to protect that information."
        },
        {
          heading: "Majority Voting",
          description: "A simple algorithm that corrects $k$ errors using $2k+1$ bits."
        },
        {
          heading: "Check Bits (Parity)",
          description: "Extra bits that don't hold data but tell you if a group of bits has an error."
        }
      ],
      mathematics: "$$ P_{\\text{error, logic}} = 3p^2 - 2p^3 $$\\nWhere $p$ is the probability of a single physical bit flipping. If $p < 0.5$, the logical bit is more reliable than the physical one.",
      analogy: "If you want to make sure your friend hears a word correctly in a loud stadium, you shout it three times. Even if they miss one word, they can piece together the meaning from the other two.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# We can simulate a 3-bit repetition code using qubits restricted to X-gates\nqc = QuantumCircuit(3)\nqc.x(0); qc.x(1); qc.x(2) # Logical '1'\n# Simulated flip on bit 1\nqc.x(1)\nprint('Classical Redundancy Simulation on Qubits Ready.')",
        cirq: "import cirq\n# Classical parity checking logic in Cirq."
      },
      realWorldApplications: [
        { title: "ECC RAM", explanation: "High-performance servers use Error Correcting Code (ECC) memory to prevent 'bit-flips' that could crash a financial transaction or a flight system." }
      ],
      commonMistakes: [
        { mistake: "Assuming quantum computers can just 'copy' qubits.", correction: "The No-Cloning Theorem proves you cannot make '111' from a single unknown qubit $|\psi\rangle$. We must use entanglement instead of copying." }
      ],
      summary: [
        "Redundancy is the primary defense against noise.",
        "Repetition codes use 'Majority Voting' to fix single errors.",
        "Error correction improves reliability only if the physical error rate is below a certain 'threshold'.",
        "Provides the conceptual blueprint for Quantum Error Correction (QEC).",
        "Syndrome measurements allow us to find errors without reading data."
      ],
      quiz: {
        topicId: "L9-T2",
        questions: [
          {
            question: "In a 3-bit repetition code, if you receive '010', what is the most likely original logical bit?",
            options: ["1", "0", "Both.", "Neither."],
            correctIndex: 1,
            explanation: "Majority voting: two '0's and one '1' means '0' is the most likely original value."
          },
          {
            question: "What is a 'Logical Bit'?",
            options: ["A bit that makes sense.", "The actual data value being protected by multiple physical bits.", "A bit that never errors.", "A type of software."],
            correctIndex: 1,
            explanation: "The logical bit is the 'ideal' information we want to store, whereas physical bits are the real-world units that are subject to noise."
          },
          {
            question: "Why can't we use simple classical repetition codes for quantum states?",
            options: ["They are too slow.", "The No-Cloning Theorem prevents us from copying an unknown quantum state.", "Quantum bits don't flip.", "Batteries won't allow it."],
            correctIndex: 1,
            explanation: "Because we cannot copy $|\psi\rangle$, we cannot simply produce $|\psi\rangle |\psi\rangle |\psi\rangle$ to take a majority vote."
          }
        ]
      }
    }
  },
  {
    id: "L9-T3",
    levelId: 9,
    name: "Quantum Error Correction Basics",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L9-T2", name: "Classical Error Correction" }, { id: "L3-T6", name: "No-Cloning Theorem" }] },
      whatYouWillLearn: [
        "The 3 unique barriers to QEC (No-Cloning, Continuity, Measurement).",
        "The concept of Encoding a logical qubit into an entangled physical state.",
        "How to measure 'Error Syndromes' without collapsing the state.",
        "The Threshold Theorem: The goal of hardware engineering."
      ],
      introduction: "Quantum Error Correction (QEC) is a mathematical miracle. It has to solve three problems that don't exist in classical computing: 1) **No-Cloning**: We can't copy the data. 2) **Continuity**: Errors are small rotations, not just flips. 3) **Collapse**: Measuring the qubit to see if it has an error destroys the information we are trying to save.\n\nWe solve this by using **Entanglement**. Instead of copying a qubit, we 'smear' its information across several physical qubits using CNOT gates. We then measure auxiliary 'Ancilla' qubits that are entangled with the data. These ancillas tell us the 'Error Syndrome' (e.g., 'Qubit 2 has flipped') without ever revealing whether the data was a 0 or a 1. This allows us to fix the error while keeping the quantum superposition perfectly intact.",
      whyItMatters: "The Fault-Tolerant Era. Every major quantum computer today (IBM, Google, Microsoft) is now focused on 'Logical Qubits'. We are transitioning from the NISQ era (noisy) to the Fault-Tolerant era (error-corrected).",
      keyConcepts: [
        {
          heading: "Logical Qubit Encoding",
          description: "Representing $|0\\rangle_L$ as a complex entangled state like $|000\\rangle$ and $|1\\rangle_L$ as $|111\\rangle$."
        },
        {
          heading: "Syndrome Measurement",
          description: "A technique that extracts information about the ERROR but zero information about the DATA. It's like feeling the shape of a box without looking inside."
        },
        {
          heading: "The Accuracy Threshold",
          description: "If your hardware noise is below a certain 'threshold' (usually ~0.1%), adding more qubits makes the computer *better*. If you're above it, more qubits just add more noise."
        }
      ],
      mathematics: "$$ |\\psi\\rangle_L = \\alpha |000\\rangle + \\beta |111\\rangle $$\\nThis state is protected against a single X-flip but is still vulnerable to Z-flips.",
      analogy: "Imagine three people tied together with invisible string (entanglement). If one person trips (an error), the others 'feel' the tug on the string. They can pull the person back up without ever asking the person what they were thinking (the data).",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc = QuantumCircuit(5, 2) # 3 data, 2 ancilla\n# Encoding logic...\nqc.cx(0, 1); qc.cx(0, 2)\nprint('Logical Qubit Encoding Circuit ready.')",
        cirq: "import cirq\n# Demonstrating error syndrome extraction using ancilla qubits."
      },
      realWorldApplications: [
        { title: "Commercial Roadmap", explanation: "Google's 2023 milestone showed for the first time that increasing the size of a surface code reduced the overall error rate, proving QEC works in practice." }
      ],
      commonMistakes: [
        { mistake: "Thinking you measure the data qubits to find errors.", correction: "No. You measure the *Ancilla* qubits. If you measure the data, you collapse the wave function and the calculation is over." }
      ],
      summary: [
        "QEC overcomes No-Cloning, Continuity, and Measurement collapse.",
        "Logical qubits are encoded into multi-qubit entangled states.",
        "Syndromes are measured via ancillas to keep data secret.",
        "The Threshold Theorem defines when QEC becomes useful.",
        "It is the only path to building a truly useful, large-scale quantum computer."
      ],
      quiz: {
        topicId: "L9-T3",
        questions: [
          {
            question: "How do we find out where an error occurred without measuring the data qubits?",
            options: ["We guess.", "By measuring 'Ancilla' qubits that are entangled with the data.", "By cooling the computer.", "By waiting for the result."],
            correctIndex: 1,
            explanation: "Ancilla qubits extract the 'syndrome' (the error pattern) while leaving the data qubits in superposition."
          },
          {
            question: "What is a 'Logical Qubit'?",
            options: ["A qubit that thinks for itself.", "An abstract unit of info protected by several physical qubits.", "A bit in a classical computer.", "A qubit with no phase."],
            correctIndex: 1,
            explanation: "A logical qubit is the 'clean' information that is distributed across many 'noisy' physical qubits for protection."
          },
          {
            question: "What is the 'Threshold Theorem'?",
            options: ["A rule about room temperature.", "A mathematical proof that error correction works if individual gate noise is below a certain level.", "A limit on how many qubits you can buy.", "A law about light speed."],
            correctIndex: 1,
            explanation: "The threshold theorem states that if physical error rates are low enough, we can achieve arbitrarily low logical error rates by adding more qubits."
          }
        ]
      }
    }
  },
  {
    id: "L9-T4",
    levelId: 9,
    name: "Bit Flip Code",
    type: "code",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L9-T3", name: "Quantum Error Correction Basics" }] },
      whatYouWillLearn: [
        "The implementation of the 3-qubit Bit Flip code.",
        "Detecting and correcting a single X-error.",
        "Using CNOT gates for parity checking.",
        "Mathematical proof of success in bit-flip environments."
      ],
      introduction: "The Bit Flip code is the quantum version of the 3-bit repetition code. We encode one logical qubit $|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$ into three physical qubits. The encoded state becomes $|\psi\rangle_L = \alpha |000\rangle + \beta |111\rangle$. \n\nIf one of the qubits flips (an X-error), the state changes (e.g., to $|010\rangle$ or $|101\rangle$). By performing two parity checks—comparing qubit 1 with 2, and qubit 2 with 3—we can identify exactly which qubit flipped and apply an X-gate to 'un-flip' it. This restores the original logical state perfectly, as long as no more than one qubit flipped at the same time.",
      whyItMatters: "Proof of Concept. This was the first code ever developed (by Peter Shor) to prove that quantum states could survive noise. It is the 'Hello World' of error correction.",
      keyConcepts: [
        {
          heading: "Encoding Circuit",
          description: "Two CNOT gates are used to entangle a single input qubit with two 'blank' $|0\\rangle$ qubits."
        },
        {
          heading: "The Syndrome Table",
          description: "A 2-bit result (00, 01, 10, 11) that acts as a 'map' to the error. 00 means no error; 01 means qubit 3 flipped, etc."
        }
      ],
      mathematics: "$$ |0\\rangle \\rightarrow |000\\rangle, \\quad |1\\rangle \\rightarrow |111\\rangle $$\\nSyndrome bits: $$ s_1 = q_1 \\oplus q_2, \\quad s_2 = q_2 \\oplus q_3 $$",
      analogy: "Three students are holding hands and walking in a straight line. If the student in the middle gets pushed to the left, the students on either side feel the pull. By comparing their positions, they can deduce that the middle student was the one pushed.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc = QuantumCircuit(5, 2)\n# 1. Encode\nqc.cx(0, 1); qc.cx(0, 2)\n# 2. Simulate Error on Q1\nqc.x(1)\n# 3. Syndrome Measurement (using ancillas 3 and 4)\nqc.cx(0, 3); qc.cx(1, 3)\nqc.cx(1, 4); qc.cx(2, 4)\nqc.measure([3, 4], [0, 1])\nprint('3-Qubit Bit Flip Code with Syndrome Extraction.')",
        cirq: "import cirq\n# Implementing the 3-qubit bit flip syndrome circuit in Cirq."
      },
      realWorldApplications: [
        { title: "Space-Based Comms", explanation: "Simulating how bit-flip codes protect quantum satellite signals from being corrupted by high-energy particles in the Van Allen belt." }
      ],
      commonMistakes: [
        { mistake: "Thinking it fixes phase errors.", correction: "This code is 'blind' to phase flips (Z-errors). A phase flip on a bit-flip code destroys the logic just as easily as no code at all." }
      ],
      summary: [
        "Fixes a single X-error (bit flip) across 3 physical qubits.",
        "Uses 2 ancilla qubits to detect the error location.",
        "Requires $p < 0.5$ to be effective.",
        "Is vulnerable to Z-errors (phase flips).",
        "Demonstrates the use of 'Parity' in Hilbert space."
      ],
      quiz: {
        topicId: "L9-T4",
        questions: [
          {
            question: "In the 3-qubit bit flip code, if the parity checks show that Qubit 1 matches Qubit 2, but Qubit 2 DOES NOT match Qubit 3, which qubit is likely at fault?",
            options: ["Qubit 1.", "Qubit 2.", "Qubit 3.", "None."],
            correctIndex: 2,
            explanation: "If 1=2 but 2!=3, then 3 is the 'odd one out' and is the source of the error."
          },
          {
            question: "How many CNOT gates are needed to ENCODE one qubit into the 3-qubit bit flip code?",
            options: ["1", "2", "3", "4"],
            correctIndex: 1,
            explanation: "Two CNOTs are needed: one to link qubit 0 to 1, and another to link 0 to 2."
          },
          {
            question: "Can the Bit Flip code fix a state where two qubits flipped simultaneously?",
            options: ["Yes, always.", "No, it only corrects single-qubit errors.", "Only if they flipped in the same direction.", "Yes, but only on simulators."],
            correctIndex: 1,
            explanation: "Like a classical 3-bit code, the 3-qubit quantum bit flip code can only correctly identify and fix a single error."
          }
        ]
      }
    }
  },
  {
    id: "L9-T5",
    levelId: 9,
    name: "Phase Flip Code",
    type: "code",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L9-T4", name: "Bit Flip Code" }] },
      whatYouWillLearn: [
        "Detecting and correcting Z-errors (Phase Flips).",
        "The use of the Hadamard Basis ($|+\\rangle, |-\\rangle$) for error protection.",
        "Comparing the circuit structure of Bit-Flip vs Phase-Flip codes.",
        "Why phase errors are the 'invisible' threat in quantum systems."
      ],
      introduction: "A **Phase Flip** (Z-error) is a uniquely quantum error. It doesn't change a 0 to a 1; it changes a $(|0\rangle + |1\rangle)$ to a $(|0\rangle - |1\rangle)$. This is invisible to standard bit-checks but fatal to the interference needed for algorithms.\n\nThe Phase Flip code solves this by rotating the qubits into the **Hadamard Basis** (the X-basis) before encoding. By treating $|+\rangle$ and $|-\rangle$ as our 'new' 0 and 1, we turn phase flips into bit flips in the rotated space. We then use the same redundancy logic as the bit-flip code. This allows us to detect and fix Z-errors without looking at the data.",
      whyItMatters: "Comprehensive Protection. Real hardware suffers from both types of noise. The Phase Flip code provides the second half of the puzzle needed for complete protection.",
      keyConcepts: [
        {
          heading: "The X-Basis",
          description: "Protecting information in the $|+\\rangle$ and $|-\\rangle$ states instead of the $|0\\rangle$ and $|1\\rangle$ states."
        },
        {
          heading: "Basis Rotation",
          description: "Using Hadamard gates (H) to 'wrap' the bit-flip code so it works on phases."
        }
      ],
      mathematics: "$$ |0\\rangle_L = |+++\\rangle, \\quad |1\\rangle_L = |---\\rangle $$",
      analogy: "Imagine you are sending a letter but you're worried about the 'ink' fading (phase). You decide to write the letter in a secret code that only uses the *spacing* between letters. Now, if the ink fades, the spacing remains intact, and the message survives.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc = QuantumCircuit(5, 2)\n# 1. Encode with Basis Rotation\nqc.h([0,1,2])\nqc.cx(0, 1); qc.cx(0, 2)\n# 2. Simulate Z-error on Q1\nqc.z(1)\n# 3. Detection (Syndrome) in X-basis\nqc.h([0,1,2])\n# ... same parity logic as bit-flip ...\nprint('3-Qubit Phase Flip Code Ready.')",
        cirq: "import cirq\n# Phase-flip syndrome extraction using H-basis parity in Cirq."
      },
      realWorldApplications: [
        { title: "Superconducting Qubits", explanation: "Phase noise is often the dominant error in transmon qubits; these codes are vital for extending their effective lifespan." }
      ],
      commonMistakes: [
        { mistake: "Thinking Z-errors are less important than X-errors.", correction: "Actually, Z-errors are often more frequent in physical hardware and are harder to visualize, making them a more dangerous threat to algorithms." }
      ],
      summary: [
        "Protects against a single Z-error (phase flip).",
        "Encodes logical qubits in the Hadamard Basis ($|+\\rangle, |-\\rangle$).",
        "Effectively turns phase flips into bit flips for detection.",
        "Is vulnerable to X-errors (bit flips).",
        "Uses 3 physical and 2 ancilla qubits."
      ],
      quiz: {
        topicId: "L9-T5",
        questions: [
          {
            question: "What is the logical '0' state in a 3-qubit Phase Flip code?",
            options: ["$|000\\rangle$", "$|111\\rangle$", "$|+++\\rangle$", "$|---\\rangle$"],
            correctIndex: 2,
            explanation: "The Phase Flip code uses the $|+\rangle$ basis for redundancy."
          },
          {
            question: "Which gate is used to rotate a qubit from the Z-basis to the X-basis for phase protection?",
            options: ["X-gate.", "CNOT.", "Hadamard (H).", "T-gate."],
            correctIndex: 2,
            explanation: "The Hadamard gate is the standard tool for switching between the computational (Z) and transversal (X) bases."
          },
          {
            question: "True or False: The Phase Flip code can fix a state that suffered a bit-flip (X-error).",
            options: ["True.", "False (It only fixes phase errors; bit flips will destroy the code)."],
            correctIndex: 1,
            explanation: "Just as the Bit Flip code is blind to Phase errors, the Phase Flip code is vulnerable to Bit errors. We need a 'combined' code to fix both."
          }
        ]
      }
    }
  },
  {
    id: "L9-T6",
    levelId: 9,
    name: "The Shor Code",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L9-T4", name: "Bit Flip Code" }, { id: "L9-T5", name: "Phase Flip Code" }] },
      whatYouWillLearn: [
        "The first 9-qubit code that corrects any single-qubit error.",
        "Concatenation: Nesting the bit-flip code inside the phase-flip code.",
        "The power of universal protection ($X, Y, \\text{ and } Z$).",
        "Calculating the overhead of the Shor Code."
      ],
      introduction: "The Shor Code (1995) was the 'Big Bang' of quantum error correction. Peter Shor realized that if you 'nested' the 3-qubit bit-flip code inside a 3-qubit phase-flip code, you could create a 9-qubit system that protects against EVERY type of single-qubit error.\n\nSpecifically, it protects against bit flips (X), phase flips (Z), and even their combination (Y-errors). Because any arbitrary quantum error can be written as a combination of X and Z, the Shor code proved that we can achieve perfectly clean quantum computation in a messy, noisy world. It was the proof that the 'Quantum Dream' was physically possible.",
      whyItMatters: "Universality. The Shor Code was the first to show that we don't need a different fix for every type of noise. We can fix anything with a single, structured code.",
      keyConcepts: [
        {
          heading: "Concatenation",
          description: "Using one code to 'protect' the qubits of another code. This creates a hierarchy of safety."
        },
        {
          heading: "9-to-1 Mapping",
          description: "It takes 9 physical qubits to hold just 1 logical qubit of data. This high overhead is the price of total safety."
        }
      ],
      mathematics: "$$ |0\\rangle_L = \\frac{(|000\\rangle+|111\\rangle)(|000\\rangle+|111\\rangle)(|000\\rangle+|111\\rangle)}{2\\sqrt{2}} $$",
      analogy: "Imagine three groups of three people. Within each small group, they make sure no one trips (bit-flip). Then, the groups as a whole make sure they are all walking in the same direction (phase-flip). It's a double-layered defense system.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "qc = QuantumCircuit(9)\n# Shor code encoding involves 9 data qubits and multiple ancillas.\n# It is the standard test for large-scale circuit construction.\nprint('Shor 9-Qubit Code Framework.')",
        cirq: "import cirq\n# Implementing the full Shor 9-qubit encoding and syndrome logic."
      },
      realWorldApplications: [
        { title: "Fault Tolerant Research", explanation: "While the Shor code is rarely used in hardware today (it's too 'heavy'), all modern codes are the direct descendants of Shor's nesting logic." }
      ],
      commonMistakes: [
        { mistake: "Assuming 9 qubits is too many.", correction: "In 1995, 9 qubits seemed like an impossible number. Today, we have chips with hundreds of qubits, making Shor-style protection finally reachable." }
      ],
      summary: [
        "Corrects any arbitrary single-qubit error (X, Y, or Z).",
        "Nests (concatenates) bit-flip and phase-flip logic.",
        "Requires 9 physical qubits for 1 logical qubit.",
        "Proven to be 'Universal' for single-error protection.",
        "The historical foundation of all modern Fault Tolerance."
      ],
      quiz: {
        topicId: "L9-T6",
        questions: [
          {
            question: "How many physical qubits are needed for a single logical qubit in the original Shor code?",
            options: ["3", "5", "7", "9"],
            correctIndex: 3,
            explanation: "The Shor code uses a 3x3 nesting structure, requiring 9 physical qubits total."
          },
          {
            question: "What types of errors can the Shor code fix?",
            options: ["Bit-flips only.", "Phase-flips only.", "Any single-qubit error (X, Y, or Z).", "It only fixes temperature."],
            correctIndex: 2,
            explanation: "The Shor code is universal; because any error is a combination of X and Z, fixing both fixes everything."
          },
          {
            question: "What is 'Concatenation' in the context of the Shor code?",
            options: ["Adding more qubits.", "Nesting one error-correction code inside another.", "Measuring the result.", "Deleting the noise."],
            correctIndex: 1,
            explanation: "Concatenation is the technique of using a second code to protect the already-encoded qubits of a first code."
          }
        ]
      }
    }
  },
  {
    id: "L9-T7",
    levelId: 9,
    name: "Stabilizer Formalism",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L2-T3", name: "Matrices and Operators" }] },
      whatYouWillLearn: [
        "The shorthand language for Error Correction (The Stabilizer Group).",
        "Using Pauli Operators (X, Y, Z, I) to describe states.",
        "The concept of 'Stabilizing' a state (eigenvalues of 1).",
        "How to quickly calculate syndromes using stabilizer algebra."
      ],
      introduction: "Writing out the full wavefunctions for 9 qubits (with $2^9 = 512$ terms) is a nightmare for engineers. We need a better 'shorthand'. This is the **Stabilizer Formalism**.\n\nInstead of saying 'The state is $(|00\rangle + |11\rangle)/\sqrt{2}$', we say 'The state is stabilized by $ZZ$ and $XX$'. A stabilizer is an operator that leaves the state unchanged ($S|\psi\rangle = |\psi\rangle$). If an error occurs, the state is no longer stabilized, and the stabilizer measurement will return $-1$ instead of $+1$. This allows us to describe complex error-correcting codes using simple strings of letters (like $XZZXI$) rather than massive matrices.",
      whyItMatters: "Engineering Efficiency. All modern codes (Surface Code, Steane Code) are designed using Stabilizer math. It's the 'algebra' of the quantum computer scientist.",
      keyConcepts: [
        {
          heading: "Stabilizer Group",
          description: "A set of Pauli operators that all 'agree' on the state of the logical qubit."
        },
        {
          heading: "Pauli Strings",
          description: "Representing operators as simple strings: e.g., $X_1 Z_2 Z_3 X_4$."
        },
        {
          heading: "Syndrome from Eigenvalues",
          description: "Measuring a stabilizer returns $+1$ if no error happened and $-1$ if an error flipped the state. This is the ultimate 'Error Alarm'."
        }
      ],
      mathematics: "$$ S |\\psi\\rangle = +1 |\\psi\\rangle \\implies \\text{No Error} $$\\n$$ S (X |\\psi\\rangle) = -1 (X |\\psi\\rangle) \\implies \\text{Error Detected} $$",
      analogy: "A stabilizer is like a security guard who knows exactly what the vault is supposed to look like. Every hour, the guard checks the vault. If everything matches (eigenvalue +1), the guard stays quiet. If something is moved (eigenvalue -1), the guard rings the alarm.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Pauli, StabilizerState\n# Defining a state via stabilizers instead of vectors\ns = StabilizerState(Pauli('ZZ'))\nprint(f'Is |00> stabilized by ZZ? {s.probabilities_dict()}')",
        cirq: "import cirq\n# Cirq.StabilizerStateChamber for efficient simulation of large codes."
      },
      realWorldApplications: [
        { title: "Code Discovery", explanation: "Researchers use stabilizer algebra to 'search' for new codes that use fewer qubits or offer better protection." }
      ],
      commonMistakes: [
        { mistake: "Confusing stabilizers with the state vector.", correction: "A stabilizer is an OPERATOR. The state is what is *acted upon*. The stabilizer defines the 'rules' the state must follow." }
      ],
      summary: [
        "Shorthand language for describing quantum states and codes.",
        "Uses Pauli strings to define the 'Safe Zone' for qubits.",
        "Errors are detected by looking for $-1$ eigenvalues.",
        "Allows for the design of extremely large codes (hundreds of qubits).",
        "The standard language of modern quantum information theory."
      ],
      quiz: {
        topicId: "L9-T7",
        questions: [
          {
            question: "In stabilizer formalism, what eigenvalue indicates that the state is safe and error-free?",
            options: ["0", "+1", "-1", "Infinite"],
            correctIndex: 1,
            explanation: "A stabilizer operator $S$ is defined such that $S|\psi\rangle = +1|\psi\rangle$ for the protected state."
          },
          {
            question: "Which operators are used to build the stabilizer strings?",
            options: ["Hadamard gates.", "Pauli Operators (X, Y, Z, I).", "Rotation gates.", "Measurement gates."],
            correctIndex: 1,
            explanation: "Stabilizers are built from the Pauli group, which form a convenient basis for describing errors."
          },
          {
            question: "Why do we use stabilizers instead of full state vectors for large codes?",
            options: ["Stabilizers are more colorful.", "State vectors grow exponentially ($2^n$), making them impossible to write down for many qubits.", "Stabilizers use less electricity.", "State vectors are illegal."],
            correctIndex: 1,
            explanation: "Symmetry-based descriptions (stabilizers) are much more compact and efficient for analyzing multi-qubit systems."
          }
        ]
      }
    }
  },
  {
    id: "L9-T8",
    levelId: 9,
    name: "Surface Code",
    type: "theory",
    estimatedMinutes: 30,
    content: {
      prerequisites: { topics: [{ id: "L9-T7", name: "Stabilizer Formalism" }] },
      whatYouWillLearn: [
        "The state-of-the-art code used by Google, IBM, and Rigetti.",
        "Grid-based error correction (The Toric Code).",
        "Topological protection: Error 'chains' and 'loops'.",
        "Why the Surface Code is the winner of the QEC race."
      ],
      introduction: "The **Surface Code** is the current champion of quantum error correction. Almost every major hardware player is designing their chips specifically to run this code. Unlike Shor's code, which requires every qubit to 'talk' to many others, the Surface Code only requires qubits to talk to their nearest neighbors on a 2D grid.\n\nIn a Surface Code, we arrange qubits like a checkerboard. Half the squares check for bit-flips, and the other half check for phase-flips. Errors are visualized as 'strings' on this surface. As long as the strings don't connect across the whole board, we can find and 'cancel' the errors. It is **Topological**, meaning the information is protected by the 'shape' of the system rather than the state of any single qubit.",
      whyItMatters: "The Path to Scaling. The Surface Code has a very high 'Threshold' (~1%), meaning it can handle relatively noisy hardware. This is why it is the baseline for all 'Million Qubit' roadmap designs.",
      keyConcepts: [
        {
          heading: "Nearest-Neighbor Connectivity",
          description: "Perfect for physical chips where you can only wire qubits to their immediate neighbors."
        },
        {
          heading: "Topological Protection",
          description: "Information is stored in 'non-local' properties. A single-point error cannot destroy the data any more than a single loose thread can destroy a whole sweater."
        },
        {
          heading: "The Syndrome Grid",
          description: "Measuring the 'plaquettes' (squares) of the grid gives us a real-time 'weather map' of noise on the chip."
        }
      ],
      mathematics: "$$ H = -\\sum_{v} A_v - \\sum_{p} B_p $$\\nWhere $A_v$ are vertex operators and $B_p$ are plaquette operators in the Toric Code.",
      analogy: "A Surface Code is like a giant chainmail armor. Each individual link (qubit) might be weak, but the way they are woven together makes the whole sheet impenetrable. A single broken link (error) doesn't break the armor; it just creates a 'pin' that the repair system can easily see and fix.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit_qec.codes import SurfaceCode\n# Modern Qiskit-QEC library provides specialized tools for surface code analysis.\nprint('Surface Code Grid Initialized.')",
        cirq: "import cirq\n# Google's Sycamore chip is specifically optimized for the 'Surface-17' and 'Surface-49' codes."
      },
      realWorldApplications: [
        { title: "Universal Quantum Computer", explanation: "The 'end-game' for the industry is a 2D grid of millions of qubits running a massive surface code, creating a perfectly stable 'Logical Qubit' environment." }
      ],
      commonMistakes: [
        { mistake: "Thinking it uses fewer qubits.", correction: "Actually, it uses MORE. To get a high-quality logical qubit, you might need 1,000 physical qubits in a surface code. The advantage is that those qubits only need to talk to their neighbors, which is easier to build." }
      ],
      summary: [
        "The leading error-correction strategy for 2D hardware.",
        "Uses nearest-neighbor connectivity on a grid.",
        "Provides topological protection for quantum data.",
        "Has a high error threshold (~1%), making it hardware-friendly.",
        "Is the foundation for all modern industry roadmaps to 1,000,000 qubits."
      ],
      quiz: {
        topicId: "L9-T8",
        questions: [
          {
            question: "How are qubits arranged in a Surface Code?",
            options: ["In a straight line.", "In a 3D cube.", "On a 2D checkerboard grid.", "In a random pile."],
            correctIndex: 2,
            explanation: "The surface code uses a 2D grid where 'Data' qubits and 'Measure' qubits are interleaved like squares on a board."
          },
          {
            question: "What is the main advantage of the Surface Code over other codes like Shor's?",
            options: ["It uses no electricity.", "It only requires qubits to interact with their nearest neighbors.", "It is faster than light.", "It only needs one qubit."],
            correctIndex: 1,
            explanation: "Nearest-neighbor connectivity is much easier to implement on a physical silicon or superconducting chip."
          },
          {
            question: "What does 'Topological' protection mean in this context?",
            options: ["The computer is on a map.", "The information is stored in the global shape/structure of the grid, making it immune to local errors.", "The qubits are made of metal.", "The errors are measured in degrees."],
            correctIndex: 1,
            explanation: "Topological protection means that you need a 'global' chain of errors to fail, making a single local error easy to identify and discard."
          }
        ]
      }
    }
  }
];

export const LEVEL_9_QUIZZES = {};
