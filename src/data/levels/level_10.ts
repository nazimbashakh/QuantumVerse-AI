import { Topic, QuizQuestion } from '../types';

export const LEVEL_10_TOPICS: Topic[] = [
  {
    id: "L10-T1",
    levelId: 10,
    name: "Superconducting Qubits",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L9-T1", name: "Quantum Noise and Decoherence" }] },
      whatYouWillLearn: [
        "The physics of Josephson Junctions and the Josephson effect.",
        "Transmon Qubits: Design, LC circuits, and anharmonicity.",
        "How Cooper pairs create non-linear oscillators for state isolation.",
        "Industry implementation by IBM and Google."
      ],
      introduction: "Superconducting qubits are the current industry leaders in the race for scalable quantum hardware, championed by giants like IBM, Google, and Rigetti. These qubits are 'artificial atoms' constructed from superconducting electronic circuits. Unlike natural atoms, they are macroscopic and can be engineered using standard lithographic techniques on silicon chips. To maintain their quantum properties, they must be cooled to near absolute zero (around 15 millikelvin) in dilution refrigerators.",
      whyItMatters: "Superconducting qubits are built on existing semiconductor manufacturing foundations. Their solid-state nature allows for relatively fast gate speeds and easy integration with control electronics.",
      keyConcepts: [
        {
          heading: "The Josephson Junction",
          description: "At the heart of every superconducting qubit is the Josephson Junction (JJ)—two superconductors separated by a thin insulating barrier. The JJ acts as a non-linear inductor, introducing anharmonicity so we can isolate the $|0\\rangle$ and $|1\\rangle$ transition."
        },
        {
          heading: "Transmon Architecture",
          description: "The Transmon is the most common variant. By shunting the Josephson junction with a large capacitor, the qubit becomes significantly less sensitive to charge noise."
        },
        {
          heading: "Cooper Pairs",
          description: "Superconductivity is driven by Cooper pairs—electrons that overcome their mutual repulsion to form a single quantum state."
        }
      ],
      mathematics: "$$ H = 4E_C(\\hat{n} - n_g)^2 - E_J \\cos\\hat{\\phi} $$",
      analogy: "Imagine a pendulum where the first swing takes 1 second, but the next higher swing takes 1.5 seconds. This 'timing' difference allows you to push the pendulum to the first height without accidentally pushing it to the second.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit_ibm_runtime import QiskitRuntimeService\n# Accessing a real superconducting backend\nservice = QiskitRuntimeService()\n# backend = service.least_busy(simulator=False)\nprint('Targeting IBM Superconducting Hardware...')",
        cirq: "import cirq_google as cg\n# Google's Sycamore uses Xmon qubits\ndevice = cg.Sycamore\nprint(f'Device: {device}')"
      },
      realWorldApplications: [
        { title: "IBM Quantum System One", explanation: "The first integrated quantum computer for commercial use." },
        { title: "Google Quantum Supremacy", explanation: "Demonstrated in 2019 using the 53-qubit Sycamore processor." }
      ],
      commonMistakes: [
        { mistake: "Thinking they are 'room temperature' chips.", correction: "They only function at temperatures ~100x colder than deep space." }
      ],
      summary: [
        "Superconducting qubits use Josephson Junctions to create non-linear energy levels.",
        "The Transmon is the industry standard due to its resistance to charge noise.",
        "They are fabricated on silicon chips but operate at millikelvin temperatures."
      ],
      quiz: {
        topicId: "L10-T1",
        questions: [
          {
            question: "What is the primary role of the Josephson Junction in a superconducting qubit?",
            options: ["To cool the chip.", "To provide non-linearity (anharmonicity) to the energy levels.", "To act as a memory buffer.", "To convert light into electricity."],
            correctIndex: 1,
            explanation: "The JJ ensures that the energy levels are not equally spaced, allowing us to isolate just the 0 and 1 states."
          },
          {
            question: "Why must superconducting qubits be cooled to millikelvin temperatures?",
            options: ["To save electricity.", "To allow Cooper pairs to form and to minimize thermal decoherence.", "To make the chip glow.", "To prevent the software from crashing."],
            correctIndex: 1,
            explanation: "Superconductivity and quantum coherence are easily destroyed by thermal energy; the fridge removes this noise."
          },
          {
            question: "What is a 'Transmon' qubit?",
            options: ["A qubit that uses light.", "A superconducting qubit designed to be insensitive to charge noise.", "A classical bit.", "A type of battery."],
            correctIndex: 1,
            explanation: "The Transmon is a specific circuit design that improved the lifetime of superconducting qubits by making them less sensitive to electrical fluctuations."
          }
        ]
      }
    }
  },
  {
    id: "L10-T2",
    levelId: 10,
    name: "Trapped Ion Qubits",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L10-T1", name: "Superconducting Qubits" }] },
      whatYouWillLearn: [
        "The physics of the Paul Trap and RF confinement.",
        "Laser-based state preparation and readout.",
        "Mølmer-Sørensen gates for multi-qubit entanglement.",
        "All-to-all connectivity advantages."
      ],
      introduction: "Trapped Ion quantum computing uses individual atoms (usually Ytterbium or Calcium) as qubits. These atoms are ionized and then suspended in a vacuum chamber by electromagnetic fields. Unlike superconducting qubits, trapped ions are identical, natural quantum systems with exceptionally long coherence times.",
      whyItMatters: "Trapped ions offer the highest gate fidelities and allow for all-to-all connectivity, significantly reducing the overhead for complex algorithms.",
      keyConcepts: [
        {
          heading: "The Paul Trap",
          description: "Ions are held in place using a combination of static (DC) and oscillating (RF) electric fields, creating a 'potential well'."
        },
        {
          heading: "Laser Control",
          description: "Gates are performed by hitting the ions with precisely tuned laser pulses to change internal states or entangle them via motion."
        },
        {
          heading: "Phonon Mediated Interaction",
          description: "Ions in a trap interact through their collective vibrations (phonons), allowing direct entanglement between any two ions."
        }
      ],
      mathematics: "$$ H = \\sum_{i} \\frac{\\hbar \\omega_z}{2} \\sigma_z^i + \\sum_{k} \\hbar \\nu_k a_k^\\dagger a_k $$",
      analogy: "Imagine a row of beads on a string held by invisible tweezers. If you tap one bead, the whole string vibrates, allowing you to influence any other bead on the string.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# Qiskit can target IonQ backends\n# backend = service.get_backend('ionq_simulator')",
        cirq: "import cirq\n# Quantinuum (Honeywell) uses H-Series ion traps\n# print('Targeting Quantinuum H1-1 hardware')"
      },
      realWorldApplications: [
        { title: "IonQ & Quantinuum", explanation: "The leaders in commercializing trapped-ion quantum computers." }
      ],
      commonMistakes: [
        { mistake: "Thinking they are slow because they are 'atoms'.", correction: "While gate speeds are slower than superconducting, their high precision and connectivity often make the total calculation time comparable." }
      ],
      summary: [
        "Uses identical natural atoms suspended in vacuum.",
        "Controlled by lasers and microwave pulses.",
        "High coherence times and high gate fidelity.",
        "Allows for all-to-all qubit connectivity."
      ],
      quiz: {
        topicId: "L10-T2",
        questions: [
          {
            question: "How are ions held in place in a trapped-ion computer?",
            options: ["By glue.", "Using electromagnetic fields (Paul Traps).", "By cooling them into ice.", "Using mechanical tweezers."],
            correctIndex: 1,
            explanation: "Electric and magnetic fields create a 'potential well' that suspends the charged atoms in a vacuum."
          },
          {
            question: "What is a 'Phonon' in the context of trapped ions?",
            options: ["A light particle.", "A quantized unit of vibration used to entangle ions.", "A type of electron.", "A microwave signal."],
            correctIndex: 1,
            explanation: "Ions share a collective motion in the trap; we use these vibrational modes (phonons) to mediate gates between them."
          },
          {
            question: "What is a major advantage of trapped ions over superconducting qubits?",
            options: ["They are cheaper.", "All qubits are naturally identical and have longer coherence times.", "They don't need vacuum.", "They are made of silicon."],
            correctIndex: 1,
            explanation: "Because every ion of a specific element is identical by nature, they don't suffer from the manufacturing variations found in man-made chips."
          }
        ]
      }
    }
  },
  {
    id: "L10-T3",
    levelId: 10,
    name: "Photonics and Optical Qubits",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T1", name: "What is a Qubit" }] },
      whatYouWillLearn: [
        "Encoding qubits in photon polarization or path.",
        "The role of Beam Splitters and Phase Shifters.",
        "Linear Optical Quantum Computing (LOQC).",
        "The challenge of non-deterministic gates."
      ],
      introduction: "Photonic quantum computing uses particles of light (photons) as qubits. Photons are ideal for communication and don't require the extreme cooling of superconducting systems. However, because photons don't naturally interact with each other, creating multi-qubit gates (like CNOT) is incredibly difficult and often probabilistic.",
      whyItMatters: "Photonics is the foundation for the Quantum Internet. Companies like PsiQuantum are building silicon-photonic chips to create a million-qubit system that can operate at much higher temperatures than rivals.",
      keyConcepts: [
        {
          heading: "Polarization Encoding",
          description: "$|0\\rangle$ is horizontal polarization, $|1\\rangle$ is vertical. Superposition is a diagonal polarization."
        },
        {
          heading: "Measurement-Based QC",
          description: "Instead of applying gates, you create a massive 'cluster state' of entangled photons and then perform specific measurements to 'steer' the computation."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\alpha |H\\rangle + \\beta |V\\rangle $$",
      analogy: "It's like using different colored flashlights to send signals through a series of mirrors and filters. The computation is the result of how the light waves overlap and interfere.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# Photonic simulators like Xanadu's Strawberry Fields are common.",
        cirq: "# Photonics in Cirq often involves modeling interferometers."
      },
      realWorldApplications: [
        { title: "PsiQuantum & Xanadu", explanation: "Leaders in the photonic and continuous-variable quantum computing space." }
      ],
      commonMistakes: [
        { mistake: "Thinking all quantum computers need to be cold.", correction: "Photonic chips can often run at room temperature, though the detectors still require cooling." }
      ],
      summary: [
        "Uses light particles as qubits.",
        "Ideal for networking and long-distance coherence.",
        "Gates are often probabilistic (non-deterministic).",
        "Supports Measurement-Based Quantum Computing (MBQC)."
      ],
      quiz: {
        topicId: "L10-T3",
        questions: [
          {
            question: "What is a primary disadvantage of using photons as qubits?",
            options: ["They are too slow.", "They don't naturally interact with each other, making gates difficult.", "They are too heavy.", "They disappear too quickly."],
            correctIndex: 1,
            explanation: "Photons don't 'feel' each other. To make a gate, we have to use complex optics and 'hope' for the right measurement outcome."
          },
          {
            question: "How is information typically encoded in a photonic qubit?",
            options: ["Mass.", "Polarization or Path.", "Color only.", "Temperature."],
            correctIndex: 1,
            explanation: "Horizontal/Vertical polarization or the specific fiber-optic path the photon takes are the most common encodings."
          },
          {
            question: "Which company is a leader in silicon-photonic quantum computing?",
            options: ["IBM.", "Google.", "PsiQuantum.", "Intel."],
            correctIndex: 2,
            explanation: "PsiQuantum is well known for their approach to building a photonic quantum computer using standard silicon manufacturing."
          }
        ]
      }
    }
  },
  {
    id: "L10-T4",
    levelId: 10,
    name: "Neutral Atom Arrays",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T2", name: "Trapped Ion Qubits" }] },
      whatYouWillLearn: [
        "Optical Tweezers: Using light to move individual atoms.",
        "Rydberg States: Turning on 'Mega-Interactions'.",
        "Programmable geometries for 2D and 3D lattices.",
        "Analog vs Digital quantum simulation."
      ],
      introduction: "Neutral atom quantum computers, like those from QuEra and Pasqal, use lasers called 'Optical Tweezers' to hold hundreds of uncharged atoms in place. Unlike trapped ions, these atoms can be moved into any shape—a square grid, a circle, or even a 3D structure. They interact by being excited into 'Rydberg states', where they become huge and highly sensitive to their neighbors.",
      whyItMatters: "Neutral atoms are currently the most scalable way to reach 200-500 qubits. They are excellent for 'Analog Simulation', where the computer mimics the behavior of a physical system directly.",
      keyConcepts: [
        {
          heading: "Optical Tweezers",
          description: "Focused laser beams that trap atoms at their center. You can 'pick up' an atom and move it with light."
        },
        {
          heading: "Rydberg Blockade",
          description: "When an atom is excited to a high energy (Rydberg) state, it prevents its neighbors from being excited. This 'blockade' is the mechanism for creating gates."
        }
      ],
      mathematics: "$$ V_{vdw} = \\frac{C_6}{r^6} \\quad (\\text{van der Waals interaction}) $$",
      analogy: "Imagine a field of balloons. Normally they don't touch. But if you blow one up to be 1,000 times its normal size (Rydberg state), it pushes all its neighbors away.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# QuEra's Aquila device is available on AWS Braket.",
        cirq: "# Neutral atom simulation in Cirq often involves lattice geometry definitions."
      },
      realWorldApplications: [
        { title: "Optimization", explanation: "Solving 'Maximum Independent Set' problems by mapping them directly to atom positions." }
      ],
      commonMistakes: [
        { mistake: "Thinking they are the same as trapped ions.", correction: "Ions use electric charge; neutral atoms are uncharged and moved only by light." }
      ],
      summary: [
        "Uses uncharged atoms held by lasers.",
        "Highly scalable to hundreds of qubits.",
        "Flexible 2D and 3D geometries.",
        "Uses Rydberg states for gates."
      ],
      quiz: {
        topicId: "L10-T4",
        questions: [
          {
            question: "What tool is used to move neutral atoms into specific positions?",
            options: ["Mechanical pliers.", "Optical Tweezers (focused lasers).", "Magnets.", "Static electricity."],
            correctIndex: 1,
            explanation: "Optical tweezers use the force of light to hold and move individual neutral atoms."
          },
          {
            question: "What is the 'Rydberg Blockade'?",
            options: ["A firewall.", "A phenomenon where an excited atom prevents its neighbors from exciting.", "A cooling technique.", "A type of measurement."],
            correctIndex: 1,
            explanation: "The blockade is the fundamental 'logic' of neutral atom systems, allowing one atom to control the state of its neighbors."
          },
          {
            question: "Neutral atom systems are particularly good at which type of task?",
            options: ["Word processing.", "Analog Simulation of physical systems.", "Storing files.", "Mining Bitcoin."],
            correctIndex: 1,
            explanation: "Their ability to arrange atoms in physical lattices makes them perfect for simulating condensed matter physics."
          }
        ]
      }
    }
  },
  {
    id: "L10-T5",
    levelId: 10,
    name: "Topological Qubits",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L9-T5", name: "Surface Codes" }] },
      whatYouWillLearn: [
        "The concept of Anyons and non-abelian braids.",
        "Majorana Zero Modes: Qubits in two places at once.",
        "Intrinsic error protection via topology.",
        "Microsoft's approach to hardware."
      ],
      introduction: "Topological quantum computing is the 'Holy Grail' of hardware. Instead of trying to shield a fragile qubit, you create a qubit that is mathematically 'immune' to local noise. By 'braiding' particles called anyons around each other, the information is stored in the global shape of the path, not the particle itself. Microsoft is the primary pioneer of this high-risk, high-reward approach.",
      whyItMatters: "If successful, a topological qubit would be 1,000x more stable than a superconducting one, potentially eliminating the need for complex error correction codes.",
      keyConcepts: [
        {
          heading: "The Knot Analogy",
          description: "If you have a knot in a string, you can shake the string (noise), but the knot stays. To get rid of the knot, you have to untie it (computation)."
        },
        {
          heading: "Majorana Fermions",
          description: "Quasi-particles that are their own anti-particle. A single qubit is 'split' across two ends of a nanowire, making it impossible to destroy the state by hitting just one end."
        }
      ],
      mathematics: "$$ \\gamma_i = \\gamma_i^\\dagger, \\quad \\{ \\gamma_i, \\gamma_j \\} = 2\\delta_{ij} $$",
      analogy: "It's like storing a secret by writing half of it on one piece of paper and the other half on a paper in another city. A thief (noise) can steal one paper, but they still don't know the secret.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# Topological simulators are highly specialized research tools.",
        cirq: "# Modeling Majorana modes requires specialized Hamiltonian builders."
      },
      realWorldApplications: [
        { title: "Microsoft Azure Quantum", explanation: "Microsoft's roadmap is built entirely on the success of Majorana-based topological qubits." }
      ],
      commonMistakes: [
        { mistake: "Thinking they exist already.", correction: "Topological qubits are still in the early experimental stage; no one has yet built a fully functioning multi-qubit topological computer." }
      ],
      summary: [
        "Information is stored in the global topology (shape).",
        "Immune to local environmental noise.",
        "Uses Majorana Zero Modes in nanowires.",
        "High complexity but massive potential for stability."
      ],
      quiz: {
        topicId: "L10-T5",
        questions: [
          {
            question: "What is the main advantage of a topological qubit?",
            options: ["It is cheaper to build.", "It is inherently protected from local noise by its mathematical shape.", "It runs at room temperature.", "It uses no power."],
            correctIndex: 1,
            explanation: "Topology means the state depends on the global configuration, so a 'nudge' from noise in one spot doesn't change the answer."
          },
          {
            question: "Which company is the primary developer of topological quantum hardware?",
            options: ["IBM.", "Google.", "Microsoft.", "Rigetti."],
            correctIndex: 2,
            explanation: "Microsoft has invested heavily in Majorana-based topological quantum computing research."
          },
          {
            question: "What are 'Anyons'?",
            options: ["A type of onion.", "Quasi-particles that exist in 2D and can be used for braiding computation.", "Basic electrons.", "Particles that only move in 3D."],
            correctIndex: 1,
            explanation: "Anyons are the 'braidable' elements that store topological information in their paths."
          }
        ]
      }
    }
  },
  {
    id: "L10-T6",
    levelId: 10,
    name: "Spin Qubits in Silicon",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T1", name: "What is a Qubit" }] },
      whatYouWillLearn: [
        "Quantum Dots: Artificial atoms in silicon.",
        "Using electron spin as the computational state.",
        "Leveraging the $1,000,000,000,000 semiconductor industry.",
        "The challenge of qubit-to-qubit distance."
      ],
      introduction: "Spin qubits use the spin of an electron (up or down) trapped inside a silicon chip. This is the 'Intel' approach. Since the world already knows how to put billions of transistors on silicon, the goal is to use those same factories to build quantum chips. These 'Quantum Dots' act like small traps for individual electrons.",
      whyItMatters: "Scalability. If we can make spin qubits work, we could potentially manufacture millions of them on a single wafer using existing industrial processes.",
      keyConcepts: [
        {
          heading: "Quantum Dots",
          description: "Microscopic regions in a semiconductor where electrons are confined. By changing the voltage on nearby gates, we can trap exactly one electron."
        },
        {
          heading: "Isotopic Purification",
          description: "Silicon-28 is 'quiet' for qubits, while Silicon-29 is 'noisy'. Industry must use purified silicon to make the qubits last longer."
        }
      ],
      mathematics: "$$ \\vec{\\mu} = \\gamma \\vec{S} \\quad (\\text{Magnetic Moment and Spin}) $$",
      analogy: "It's like a tiny marble (electron) in a bowl (quantum dot). The way the marble is spinning (up or down) is the 0 or 1.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# Qiskit can model spin-lattice systems using the Ising model.",
        cirq: "# Intel's 'Horse Ridge' controller is designed for silicon spin qubits."
      },
      realWorldApplications: [
        { title: "Intel & Diraq", explanation: "Primary researchers focused on silicon-spin scalability." }
      ],
      commonMistakes: [
        { mistake: "Thinking they are the same as classical transistors.", correction: "A transistor is a switch for billions of electrons; a quantum dot is a trap for exactly ONE." }
      ],
      summary: [
        "Uses electron spin in silicon semiconductors.",
        "High potential for mass manufacturing.",
        "Very small footprint compared to other architectures.",
        "Requires highly purified silicon-28."
      ],
      quiz: {
        topicId: "L10-T6",
        questions: [
          {
            question: "Why is Silicon an attractive material for quantum computing?",
            options: ["It is cheap.", "We can leverage the existing multi-billion dollar semiconductor manufacturing industry.", "It is naturally superconducting.", "It is transparent."],
            correctIndex: 1,
            explanation: "The goal is to use the same 'fabs' that make laptop CPUs to make quantum CPUs."
          },
          {
            question: "What is a 'Quantum Dot'?",
            options: ["A pixel on a screen.", "A tiny region where an electron is trapped and its spin can be manipulated.", "A type of internet connection.", "A cooling fan."],
            correctIndex: 1,
            explanation: "Quantum dots act as 'artificial atoms' on a silicon chip to hold electron qubits."
          },
          {
            question: "Which company is a major proponent of silicon spin qubits?",
            options: ["IBM.", "Intel.", "Rigetti.", "IonQ."],
            correctIndex: 1,
            explanation: "Intel is leveraging its decades of silicon expertise to build spin-qubit hardware."
          }
        ]
      }
    }
  },
  {
    id: "L10-T7",
    levelId: 10,
    name: "NV Centers in Diamond",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T1", name: "What is a Qubit" }] },
      whatYouWillLearn: [
        "Nitrogen-Vacancy (NV) defects in diamond lattice.",
        "Room temperature quantum states.",
        "Optical readout of spin states.",
        "Applications in quantum sensing and memory."
      ],
      introduction: "Diamond quantum computing uses 'defects' in the crystal lattice. If you replace a carbon atom with nitrogen and leave a hole (vacancy) next to it, you create an 'NV Center'. This center has an electron spin that can be controlled by microwaves and read by a laser—even at room temperature!",
      whyItMatters: "NV centers are the world's best quantum sensors. They are also used for 'Quantum Memory' because they are extremely stable compared to other qubits.",
      keyConcepts: [
        {
          heading: "Room Temperature Operation",
          description: "While most quantum computers need -273 Celsius, NV centers can maintain their quantum state at room temperature for short periods."
        },
        {
          heading: "The Diamond Lattice",
          description: "The rigid structure of diamond protects the qubit from the 'noise' of the outside world, acting as a natural shield."
        }
      ],
      mathematics: "$$ D(S_z^2 - 2/3) + g\\mu_B B S_z \\quad (\\text{NV Hamiltonian}) $$",
      analogy: "It's like a tiny compass needle trapped inside a indestructible diamond cage. The cage protects the needle so well that it can keep pointing the right way even if you shake it.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# NV centers are used as 'spin-ensemble' sensors.", cirq: "# Modeling ODMR (Optically Detected Magnetic Resonance)." },
      realWorldApplications: [
        { title: "Quantum Sensing", explanation: "Measuring magnetic fields inside a single living cell without killing it." }
      ],
      commonMistakes: [
        { mistake: "Thinking we build computers out of jewelry diamonds.", correction: "We use synthetic, ultra-pure lab-grown diamonds with specific controlled impurities." }
      ],
      summary: [
        "Uses defects in diamond crystals as qubits.",
        "Can operate at room temperature.",
        "Best architecture for quantum sensing.",
        "Used as a bridge between light and matter (Quantum Memory)."
      ],
      quiz: {
        topicId: "L10-T7",
        questions: [
          {
            question: "What is a major unique advantage of NV centers in diamond?",
            options: ["They are shiny.", "They can maintain quantum states at room temperature.", "They are very heavy.", "They cost no money."],
            correctIndex: 1,
            explanation: "Diamond's rigid structure protects the qubit defect from thermal noise better than most other materials."
          },
          {
            question: "How do you 'read' the state of an NV center qubit?",
            options: ["By touching it.", "By looking at the intensity of light it emits under a laser (ODMR).", "Using a thermometer.", "By weighing it."],
            correctIndex: 1,
            explanation: "NV centers change how they glow based on their spin state, allowing for optical readout."
          },
          {
            question: "What does 'NV' stand for?",
            options: ["No Vacancy.", "Nitrogen-Vacancy.", "New Variable.", "Neon-Voltage."],
            correctIndex: 1,
            explanation: "It refers to a Nitrogen atom replacing a Carbon atom next to a Vacancy (hole) in the lattice."
          }
        ]
      }
    }
  },
  {
    id: "L10-T8",
    levelId: 10,
    name: "Cryogenics and the Control Stack",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-1", name: "Superconducting Qubits" }] },
      whatYouWillLearn: [
        "The Dilution Refrigerator: Reaching 10 millikelvin.",
        "Microwave cabling and noise shielding.",
        "FPGAs and Real-time controllers.",
        "The Full Stack: From Python to physical pulses."
      ],
      introduction: "A quantum computer is 1% chip and 99% infrastructure. The 'chandelier' you see in photos is a Dilution Refrigerator—a massive cooling system. On top of that, a complex software stack must translate your Python code into precisely timed pulses that hit the chip at exactly the right nanosecond.",
      whyItMatters: "Building the 'fridge' and the 'control electronics' is just as difficult as building the qubit. If the electronics aren't precise, the qubit will 'dephase' and the calculation will fail.",
      keyConcepts: [
        {
          heading: "The Dilution Refrigerator",
          description: "Uses a mixture of Helium-3 and Helium-4 to reach temperatures colder than deep space (0.01 Kelvin)."
        },
        {
          heading: "FPGA Control",
          description: "Field Programmable Gate Arrays are used to generate the high-speed microwave pulses needed to flip qubits in nanoseconds."
        }
      ],
      mathematics: "$$ P_{cool} \\propto T^2 $$",
      analogy: "The fridge is like the engine, radiator, and exhaust system of a car. The quantum chip is just the spark plug. One cannot work without the other.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import pulse\n# Exploring the pulse-level control of a real backend\n# print(backend.defaults().instruction_schedule_map)",
        cirq: "# Modeling pulse envelopes in Cirq."
      },
      realWorldApplications: [
        { title: "Bluefors", explanation: "The world leader in manufacturing the dilution refrigerators used by IBM and Google." }
      ],
      commonMistakes: [
        { mistake: "Thinking the computer is just the golden chandelier.", correction: "The chandelier is the fridge; the actual computer chip is a tiny square at the very bottom." }
      ],
      summary: [
        "Extreme cooling (millikelvin) is needed for superconducting qubits.",
        "Dilution refrigerators use Helium isotopes for cooling power.",
        "Control stacks translate code into microwave/laser pulses.",
        "Shielding from light and magnetic noise is critical."
      ],
      quiz: {
        topicId: "L10-T8",
        questions: [
          {
            question: "What is the primary cooling agent in a dilution refrigerator?",
            options: ["Liquid Nitrogen.", "Helium-3 and Helium-4 isotopes.", "Ice water.", "Compressed air."],
            correctIndex: 1,
            explanation: "The unique properties of the mixture of Helium-3 and Helium-4 are required to reach temperatures below 1 Kelvin."
          },
          {
            question: "Why can't we use standard room-temperature wires to connect to a quantum chip?",
            options: ["They are too ugly.", "They would carry too much heat, destroying the superconducting state.", "They are too thick.", "They would melt."],
            correctIndex: 1,
            explanation: "Cabling must be carefully designed with attenuators to prevent thermal noise (heat) from leaking down to the cold chip."
          },
          {
            question: "What device is typically used to generate the fast microwave pulses for gates?",
            options: ["A standard laptop.", "An FPGA (Field Programmable Gate Array).", "A radio tower.", "A battery."],
            correctIndex: 1,
            explanation: "FPGAs allow for the ultra-precise, nanosecond-scale timing required to control quantum states."
          }
        ]
      }
    }
  }
];

export const LEVEL_10_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
