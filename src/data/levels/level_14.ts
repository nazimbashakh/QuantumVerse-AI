import { Topic, QuizQuestion } from '../types';

export const LEVEL_14_TOPICS: Topic[] = [
  {
    id: "L14-T1",
    levelId: 14,
    name: "The Threat of Shor's Algorithm",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L8-T7", name: "Shor's Algorithm" }] },
      whatYouWillLearn: [
        "Why RSA and Elliptic Curve (ECC) are mathematically vulnerable.",
        "The timeline for 'Y2Q' and the concept of 'Q-Day'.",
        "Economic and national security implications of broken encryption.",
        "The 'Harvest Now, Decrypt Later' (HNDL) strategy."
      ],
      introduction: "Digital security today relies on the difficulty of certain math problems, like factoring massive prime numbers in RSA or finding discrete logarithms in Elliptic Curve Cryptography. Shor's Algorithm proved that a mature quantum computer can solve these problems exponentially faster. This creates a massive threat: almost every bank transaction, password, and encrypted communication on the internet could be cracked by a sufficiently powerful quantum computer. This isn't just a future problem; hackers are currently 'Harvesting' encrypted data now, waiting for the day they have the hardware to decrypt it.",
      whyItMatters: "This is the most critical intersection of quantum physics and global society. We are currently in a race to re-secure the internet's foundation before 'Q-Day'—the point at which quantum computers make our current encryption obsolete.",
      keyConcepts: [
        {
          heading: "Harvest Now, Decrypt Later (HNDL)",
          description: "The strategy where state actors or criminal organizations steal and store encrypted data today, knowing they can use a quantum computer in 10-15 years to unlock it and reveal historical secrets."
        },
        {
          heading: "Y2Q / Q-Day",
          description: "Terms used to describe the deadline when quantum computers reach the 'cryptanalytically relevant' scale (thousands of logical qubits) needed to break RSA-2048."
        },
        {
          heading: "Asymmetric vs Symmetric Risk",
          description: "Asymmetric encryption (RSA/ECC) is completely broken. Symmetric encryption (AES-256) is only slightly weakened by Grover's algorithm, meaning it remains safe if key sizes are doubled."
        }
      ],
      mathematics: "$$ \\text{RSA Security: } O(\\exp(n^{1/3})) \\rightarrow \\text{Quantum Shor: } O(n^3) $$\\nShor's algorithm turns a problem that takes trillions of years for a supercomputer into one that a quantum computer could solve in hours.",
      analogy: "RSA is like a high-end physical safe. Every thief in the world is currently stealing the safes (harvesting data) because they know that in a few years, a magic key (quantum computer) will be invented that opens every single one of them instantly.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n# We can simulate Shor's logic for factoring very small numbers (like 15 or 21)\\n# to demonstrate the period-finding mechanism that breaks RSA.",
        cirq: "import cirq\\n# Benchmarking the gate depth required to implement modular exponentiation."
      },
      realWorldApplications: [
        { title: "National Intelligence", explanation: "Governments are currently identifying 'Secret for Life' data that must be protected with quantum-safe methods immediately." }
      ],
      commonMistakes: [
        { mistake: "Thinking AES is completely broken by quantum.", correction: "Grover's algorithm only provides a quadratic speedup for AES. Doubling the key size (using AES-256 instead of AES-128) provides sufficient protection." }
      ],
      summary: [
        "RSA and ECC are completely vulnerable to Shor's algorithm.",
        "HNDL strategy means the threat is relevant to today's data.",
        "Q-Day is the estimated point of cryptographic collapse.",
        "Encryption standards must be upgraded before hardware arrives."
      ],
      quiz: {
        topicId: "L14-T1",
        questions: [
          {
            question: "What is the 'Harvest Now, Decrypt Later' strategy?",
            options: ["A farming technique.", "Storing encrypted data today to decrypt it later with a quantum computer.", "A way to speed up quantum gates.", "A method for cooling qubits."],
            correctIndex: 1,
            explanation: "HNDL refers to stealing data now so it can be decrypted once Shor's algorithm is physically runnable on large hardware."
          }
        ]
      }
    }
  },
  {
    id: "L14-T2",
    levelId: 14,
    name: "Post-Quantum Cryptography (NIST)",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L14-T1", name: "The Threat of Shor's Algorithm" }] },
      whatYouWillLearn: [
        "What defines Post-Quantum Cryptography (PQC).",
        "Lattice-based cryptography and the Shortest Vector Problem.",
        "The NIST standardization process and timeline.",
        "Current standards: CRYSTALS-Kyber and Dilithium."
      ],
      introduction: "Post-Quantum Cryptography (PQC) consists of *classical* mathematical problems that are believed to be hard even for quantum computers. While quantum computers are great at factoring (Shor's), they have no known advantage in solving certain other problems, like finding shortcuts through high-dimensional grids (lattices). In 2022, NIST officially announced the first set of PQC standards, which are now being integrated into web browsers like Chrome and Safari to protect global traffic.",
      whyItMatters: "PQC is the 'Software Solution' to the quantum threat. It allows us to secure the internet using our existing laptops and servers without needing to build any quantum hardware ourselves.",
      keyConcepts: [
        {
          heading: "Lattice-Based Cryptography",
          description: "Encryption where the secret is hidden in a high-dimensional mathematical grid. Finding the secret is equivalent to finding the 'Shortest Vector' in the lattice— a problem that quantum computers struggle with."
        },
        {
          heading: "CRYSTALS-Kyber (ML-KEM)",
          description: "The primary standard for key encapsulation. It allows two people to share a secret key safely over a public channel, even if a quantum hacker is listening."
        },
        {
          heading: "Quantum-Resistance",
          description: "A property of an algorithm that remains secure even when attacked by a computer with perfect, large-scale quantum capabilities."
        }
      ],
      mathematics: "$$ \\min ||\\sum a_i v_i - t|| \\quad (\\text{Lattice Shortest Vector Problem}) $$\\nPQC relies on the geometric complexity of high-dimensional lattices rather than the number theory of prime factors.",
      analogy: "Shor's algorithm is like a master lock-picker who knows exactly how a standard tumbler lock works. PQC is like changing the lock to a design based on a 1,000-piece puzzle—no matter how fast the lock-picker's hands are, they still have to solve the puzzle piece by piece.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# Note: PQC is a classical algorithm! No quantum circuit is used.\\n# We use classical libraries like 'pqclean' to implement these standards.",
        cirq: "# Testing if quantum-walk algorithms can provide any speedup for lattice search."
      },
      realWorldApplications: [
        { title: "Google Chrome & Apple iMessage", explanation: "Both companies have already deployed Kyber/PQ3 protocols to protect user messages from future quantum decryption." }
      ],
      commonMistakes: [
        { mistake: "Thinking PQC is 'Quantum Cryptography'.", correction: "PQC is CLASSICAL math running on standard CPUs. It is merely *designed* to be safe against quantum attacks." }
      ],
      summary: [
        "PQC uses classical math that quantum computers cannot easily solve.",
        "Lattice-based math is the current foundation for these standards.",
        "NIST has standardized Kyber for keys and Dilithium for signatures.",
        "Currently being rolled out globally to secure the internet."
      ],
      quiz: {
        topicId: "L14-T2",
        questions: [
          {
            question: "Which mathematical structure is the basis for the most promising PQC algorithms?",
            options: ["Prime Factors.", "Elliptic Curves.", "Lattices (high-dimensional grids).", "Binary Trees."],
            correctIndex: 2,
            explanation: "Lattice-based problems are believed to be hard for both classical and quantum computers, making them ideal for PQC."
          }
        ]
      }
    }
  },
  {
    id: "L14-T3",
    levelId: 14,
    name: "BB84 Protocol",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L1-T6", name: "The Measurement Problem" }] },
      whatYouWillLearn: [
        "The first Quantum Key Distribution (QKD) protocol.",
        "Using photon polarization to encode random bits.",
        "Eavesdropper detection via measurement collapse.",
        "Sifting, Error Correction, and Privacy Amplification."
      ],
      introduction: "BB84 (proposed in 1984) is the 'Holy Grail' of secure communication. It allows Alice and Bob to share a secret key using single photons. Because of the No-Cloning Theorem and the Measurement Problem, if an eavesdropper (Eve) tries to 'read' the photons, she inevitably changes them. Alice and Bob can detect her presence just by measuring the error rate in their key. If someone is watching, the laws of physics will tell you.",
      whyItMatters: "Unlike PQC (which is based on the *assumption* that certain math is hard), BB84 is 'Provably Secure'. Its security is guaranteed by the laws of quantum mechanics. It is the ultimate unbreakable code.",
      keyConcepts: [
        {
          heading: "QKD (Quantum Key Distribution)",
          description: "Using quantum properties to share a RANDOM KEY, not the message itself. Once the key is shared, you use it for traditional encryption (like One-Time Pad)."
        },
        {
          heading: "No-Cloning Theorem",
          description: "The physics principle that says Eve cannot make a perfect copy of the photons to read later. She must measure them now, which leaves a mark."
        },
        {
          heading: "Sifting",
          description: "The classical step where Alice and Bob compare which 'basis' they used (without revealing the bits) to find where they were in sync."
        }
      ],
      mathematics: "$$ \\text{QBER (Quantum Bit Error Rate)} = \\frac{E}{N} $$\\nIf the QBER exceeds $\\approx 11\\%$, Alice and Bob must assume Eve is listening and discard the entire key.",
      analogy: "Imagine sending a secret through a hallway paved with wet paint. If an intruder walks through to read the secret, they leave footprints. If the paint is undisturbed, you know the hallway was private.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n# Simulating the BB84 base-switching and measurement flow between Alice and Bob.",
        cirq: "import cirq\\n# Modeling the statistics of an eavesdropping attack on a BB84 line."
      },
      realWorldApplications: [
        { title: "Financial Backbones", explanation: "Banks in Geneva and the EU use dedicated QKD fiber-optic lines to sync their servers with 100% security." }
      ],
      commonMistakes: [
        { mistake: "Thinking BB84 sends the actual email data.", correction: "It only sends a RANDOM string of numbers. Once both have the same string (the key), they use it to lock and unlock their actual emails classically." }
      ],
      summary: [
        "Quantum physics provides guaranteed security for key sharing.",
        "Eavesdropping is detected by measuring the error rate (QBER).",
        "Uses single-photon polarization as the information carrier.",
        "Provides 'Information-Theoretic Security', the highest possible level."
      ],
      quiz: {
        topicId: "L14-T3",
        questions: [
          {
            question: "Why can't a spy (Eve) copy the photons in a BB84 protocol?",
            options: ["She doesn't have enough memory.", "The No-Cloning Theorem makes it physically impossible to copy an unknown quantum state.", "It is too fast.", "She doesn't know the password."],
            correctIndex: 1,
            explanation: "The No-Cloning Theorem ensures that any attempt to copy or measure the secret state will introduce errors that Alice and Bob can detect."
          }
        ]
      }
    }
  },
  {
    id: "L14-T4",
    levelId: 14,
    name: "Ekert Protocol (E91)",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L6-T2", name: "Bell States" }, { id: "L14-T3", name: "BB84 Protocol" }] },
      whatYouWillLearn: [
        "Entanglement-based Quantum Key Distribution.",
        "Using Bell's Inequality to prove security.",
        "The concept of Device-Independent security.",
        "Detecting Eve via loss of entanglement (CHSH test)."
      ],
      introduction: "While BB84 uses single photons, the Ekert Protocol (E91) uses pairs of entangled photons. A source sends one photon to Alice and one to Bob. They perform measurements and then use Bell's Theorem to check their correlations. If a spy (Eve) tries to measure a photon or replace it, she destroys the entanglement. Alice and Bob will see that Bell's Inequality is no longer violated, revealing her presence immediately.",
      whyItMatters: "E91 provides 'Device-Independent' security. You don't even have to trust the company that built your hardware. As long as the Bell test passes, the laws of the universe guarantee that no one else has access to the information.",
      keyConcepts: [
        {
          heading: "Bell Test Security",
          description: "Using the statistical 'spooky action' of entanglement to verify that no third party has ever touched the photons."
        },
        {
          heading: "Entanglement Swapping",
          description: "The mechanism that allows E91 to be scaled across long-distance networks using quantum repeaters."
        }
      ],
      mathematics: "$$ S = |E(a, b) - E(a, b') + E(a', b) + E(a', b')| \\le 2 \\quad (\\text{Classical}) $$\\nIf $S > 2$, the key is quantum-secure. If $S \\le 2$, a spy may be interfering.",
      analogy: "BB84 is like checking the seal on a wax envelope. E91 is like having a telepathic link: if someone tries to listen in, the link itself vanishes instantly.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: { qiskit: "# Simulating a CHSH inequality test to verify the security of an E91 link.", cirq: "# Modeling Bell-state correlations for key generation." },
      realWorldApplications: [{ title: "Space-to-Ground QKD", explanation: "The Micius satellite used E91-style entanglement to share keys between China and Austria, thousands of miles apart." }],
      commonMistakes: [{ mistake: "Thinking entanglement sends data faster than light.", correction: "Entanglement provides security, but Alice and Bob still need to talk over a classical phone line (speed of light) to compare their test results." }],
      summary: ["Uses entangled photon pairs for key generation.", "Security is verified using Bell's Theorem.", "Allows for 'Device-Independent' trust.", "Highly resistant to sophisticated hardware attacks."],
      quiz: {
        topicId: "L14-T4",
        questions: [
          {
            question: "How does the E91 protocol detect an eavesdropper?",
            options: ["By checking if Bell's Inequality is violated.", "By weighing the photons.", "By looking for fingerprints.", "By using a camera."],
            correctIndex: 0,
            explanation: "If Eve interferes, the entanglement is destroyed, and the system's correlations will drop below the 'quantum' limit defined by Bell's Inequality."
          }
        ]
      }
    }
  },
  {
    id: "L14-T5",
    levelId: 14,
    name: "Quantum-Safe Networking",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L14-T2", name: "Post-Quantum Cryptography (NIST)" }] },
      whatYouWillLearn: [
        "Integrating PQC and QKD into existing networks.",
        "The role of Quantum Repeaters and Trusted Nodes.",
        "The layers of the future 'Quantum Internet'.",
        "Current real-world quantum testbeds (Chicago, Tokyo, Geneva)."
      ],
      introduction: "Quantum security doesn't happen in isolation; it must be integrated into our current fiber-optic internet. This is 'Quantum-Safe Networking'. It involves using PQC (software) for bulk data and QKD (hardware) for the most sensitive 'backbone' connections. Cities like Chicago, Tokyo, and London already have functioning quantum networks where labs and banks are testing the future of perfectly secure communication.",
      whyItMatters: "Building a global 'Quantum Internet' is the ultimate goal of the field. This would allow for perfectly private medical databases, unhackable voting systems, and distributed quantum computing where multiple labs link their QPUs together into one giant brain.",
      keyConcepts: [
        {
          heading: "Quantum Repeaters",
          description: "Devices that extend the range of quantum signals without measuring them. They use 'Entanglement Swapping' to bridge the gap between two distant cities."
        },
        {
          heading: "Trusted Nodes",
          description: "Current 'stop-gap' solution where quantum keys are briefly decrypted and re-encrypted at secure stations to travel long distances."
        },
        {
          heading: "QKD over Fiber",
          description: "Running single-photon signals through standard telecommunication fibers alongside regular internet traffic."
        }
      ],
      mathematics: "$$ R \\propto e^{-L/L_{att}} $$\\nWithout repeaters, the rate $R$ of secret keys drops exponentially with distance $L$ due to photons being absorbed by the glass fiber.",
      analogy: "Quantum networking is like adding a specialized 'armored truck' lane to the standard highway. You use it for the precious items (keys) and the regular highway for everything else.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: { qiskit: "# Simulating a 'Trusted Node' key transfer sequence.", cirq: "# Modeling quantum network protocol layers and packet loss." },
      realWorldApplications: [{ title: "The Chicago Quantum Exchange", explanation: "A 124-mile fiber network linking universities and national labs to test secure quantum data transfer." }],
      commonMistakes: [{ mistake: "Assuming we need all new wires for the whole world.", correction: "QKD can run on existing fiber-optic cables, though it requires specialized laser and detector hardware at each end of the line." }],
      summary: ["Hybrid PQC and QKD implementation is the current standard.", "Quantum repeaters are needed to scale beyond city-wide distances.", "Enables unhackable 'Information-Theoretic' security for critical infrastructure.", "The first step toward a global, distributed Quantum Internet."],
      quiz: {
        topicId: "L14-T5",
        questions: [
          {
            question: "Why can't we use standard 'amplifiers' for quantum networking?",
            options: ["They are too expensive.", "Measuring or amplifying a quantum state collapses/changes it, destroying the security.", "They don't have enough power.", "They only work for copper wires."],
            correctIndex: 1,
            explanation: "Quantum states cannot be amplified like classical signals because any attempt to 'copy' the signal violates the No-Cloning theorem."
          }
        ]
      }
    }
  }
];

export const LEVEL_14_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L14-T1": {
    questions: [
      {
        question: "Which cryptographic standard is most at risk from Shor's Algorithm?",
        options: ["AES-256", "SHA-256", "RSA", "One-Time Pad"],
        correctIndex: 2,
        explanation: "RSA's security is based on factoring, which Shor's algorithm solves efficiently."
      }
    ]
  },
  "L14-T2": {
    questions: [
      {
        question: "Is Post-Quantum Cryptography (PQC) a quantum hardware technology?",
        options: ["Yes, it requires a quantum computer to run.", "No, it is classical math designed to be safe from quantum computers.", "Yes, it uses entangled bits.", "No, it is a type of laser."],
        correctIndex: 1,
        explanation: "PQC is a software-based solution that runs on existing computers but uses math problems that quantum computers can't solve."
      }
    ]
  },
  "L14-T3": {
    questions: [
      {
        question: "What happens if an eavesdropper measures a photon in a BB84 QKD protocol?",
        options: ["The message is deleted.", "Errors are introduced into the key, alerting Alice and Bob to her presence.", "The photon speeds up.", "Nothing happens."],
        correctIndex: 1,
        explanation: "Measurement causes collapse and introduces random errors that are easily detectable by the legitimate parties."
      }
    ]
  }
};
