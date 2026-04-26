import { Topic, QuizQuestion } from '../types';

export const LEVEL_11_TOPICS: Topic[] = [
  {
    id: "L11-T1",
    levelId: 11,
    name: "Quantum Sensing Principles",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L9-T1", name: "Quantum Noise and Decoherence" }] },
      whatYouWillLearn: [
        "The fundamental limits of classical sensing.",
        "Precision, Accuracy, and Sensitivity differences.",
        "How superposition makes sensors 'hyper-aware' to fields.",
        "Standard Quantum Limit (SQL) vs Heisenberg Limit."
      ],
      introduction: "Quantum Sensing is arguably the most immediate and commercially viable application of quantum technology. In quantum computing, we try to shield qubits from noise. In quantum sensing, we use that extreme sensitivity to noise (magnetic fields, gravity, temperature) to measure the environment with unprecedented precision. If a qubit is sensitive to a magnetic field, it is a world-class magnetometer.",
      whyItMatters: "Classical sensors are hitting a physical brick wall. Quantum sensors allow us to see things previously invisible: magnetic signals from individual neurons in the brain or tiny underground mineral deposits.",
      keyConcepts: [
        {
          heading: "Standard Quantum Limit (SQL)",
          description: "Classical sensors improve precision by averaging multiple measurements. They are limited by 'shot noise' which scales as $1/\\sqrt{N}$, where $N$ is the number of particles."
        },
        {
          heading: "Heisenberg Limit",
          description: "By using entangled states, quantum sensors can achieve a precision that scales as $1/N$. This is an exponential improvement over classical shot noise."
        }
      ],
      mathematics: "$$ \\Delta \\theta \\ge \\frac{1}{\\sqrt{N}} \\quad (\\text{SQL}) \\quad \\Delta \\theta \\ge \\frac{1}{N} \\quad (\\text{Heisenberg}) $$",
      analogy: "A classical sensor is like using a thick magic marker to draw a line. A quantum sensor is like using a laser-focused needle. You can see details that the marker simply smears over.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# Simulating a Ramsey sensing sequence\nqc = QuantumCircuit(1)\nqc.h(0)\nqc.p(0.1, 0) # Phase shift caused by an external field\nqc.h(0)\nprint('Phase-sensitive circuit built.')",
        cirq: "import cirq\nq = cirq.GridQubit(0,0)\n# Sensing simulation\nc = cirq.Circuit(cirq.H(q), cirq.ZPowGate(exponent=0.1)(q), cirq.H(q))"
      },
      realWorldApplications: [
        { title: "Mineral Exploration", explanation: "Detecting tiny gravitational anomalies that signal the presence of gold or oil deep beneath the Earth's crust." }
      ],
      commonMistakes: [
        { mistake: "Thinking sensing requires a full quantum computer.", correction: "A quantum sensor can be a single qubit or a single atom; it doesn't need a 50-qubit processor." }
      ],
      summary: [
        "Uses quantum sensitivity to measure physical properties.",
        "Entanglement allows sensors to reach the Heisenberg Limit ($1/N$).",
        "Interferometry is the core mechanism for detection.",
        "Commercial applications include navigation and mining."
      ],
      quiz: {
        topicId: "L11-T1",
        questions: [
          {
            question: "How does entanglement improve a quantum sensor's precision compared to classical sensors?",
            options: ["It makes the sensor faster.", "It changes the scaling from $1/sqrt(N)$ to $1/N$.", "It allows the sensor to work without power.", "It makes the sensor smaller."],
            correctIndex: 1,
            explanation: "The Heisenberg Limit ($1/N$) is a fundamental quantum improvement in how precision scales with the number of measurement particles."
          },
          {
            question: "In quantum sensing, what is 'noise' in a quantum computer used for?",
            options: ["It is deleted.", "It is used as the signal to be measured (e.g., a magnetic field).", "It powers the battery.", "It is ignored."],
            correctIndex: 1,
            explanation: "Quantum sensors turn the 'weakness' of qubits (their sensitivity to the environment) into a 'strength' (their ability to measure the environment)."
          },
          {
            question: "Which limit defines the best possible precision for independent (non-entangled) particles?",
            options: ["Heisenberg Limit.", "Standard Quantum Limit (SQL).", "Speed of Light.", "Planck Length."],
            correctIndex: 1,
            explanation: "SQL is the limit for independent particles; entanglement is required to surpass it and reach the Heisenberg limit."
          }
        ]
      }
    }
  },
  {
    id: "L11-T2",
    levelId: 11,
    name: "Magnetometry",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T5", name: "NV Centers in Diamond" }] },
      whatYouWillLearn: [
        "The physics of SQUIDs vs Atomic Magnetometers.",
        "Using NV centers for nanoscale magnetic imaging.",
        "Measuring biological signals (MEG and MCG).",
        "Magnetic flux quantization."
      ],
      introduction: "Quantum magnetometers are the most sensitive magnetic field detectors ever built. A SQUID (Superconducting Quantum Interference Device) can detect magnetic fields millions of times weaker than the Earth's magnetic field. This allows us to read the tiny magnetic fields produced by firing neurons in the brain.",
      whyItMatters: "In medicine, this enables non-invasive brain mapping. In industry, it allows for detecting micro-cracks in aircraft wings or finding hidden submarines.",
      keyConcepts: [
        {
          heading: "SQUID",
          description: "A superconducting loop with two Josephson Junctions. As magnetic flux passes through, it forces the phase to shift, creating a measurable voltage change."
        },
        {
          heading: "OPM (Optically Pumped Magnetometers)",
          description: "Sensors that use a gas of atoms. Lasers align the atomic spins, and a magnetic field causes them to rotate, which is detected by another laser."
        }
      ],
      mathematics: "$$ \\Phi_0 = \\frac{h}{2e} \\approx 2.07 \\times 10^{-15} \\text{ Wb} $$",
      analogy: "A classical magnetometer is like a compass that tells you where North is. A quantum magnetometer is like being able to hear the magnetic 'whisper' of a single ant from across a football stadium.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# Simulating SQUID voltage modulation.", cirq: "# Modeling spin-precession in a magnetic field." },
      realWorldApplications: [
        { title: "MEG (Brain Mapping)", explanation: "Mapping the brain's magnetic activity to locate the source of epileptic seizures." }
      ],
      commonMistakes: [
        { mistake: "Assuming SQUIDs work at room temperature.", correction: "SQUIDs require liquid helium cooling (4K). For room temp, we use OPMs or NV centers." }
      ],
      summary: [
        "Detects fields millions of times weaker than the Earth's.",
        "SQUIDs are the gold standard for sensitivity.",
        "OPMs allow for wearable brain-imaging helmets.",
        "NV centers provide magnetic imaging at the molecular scale."
      ],
      quiz: {
        topicId: "L11-T2",
        questions: [
          {
            question: "What is a SQUID primarily used for?",
            options: ["To cook food.", "To detect ultra-weak magnetic fields.", "To speed up the internet.", "To cool down the computer."],
            correctIndex: 1,
            explanation: "SQUIDs (Superconducting Quantum Interference Devices) are the most sensitive magnetometers available."
          },
          {
            question: "What does 'OPM' stand for in quantum sensing?",
            options: ["Optical Power Meter.", "Optically Pumped Magnetometer.", "Operating Phase Module.", "Over-Pressure Mechanism."],
            correctIndex: 1,
            explanation: "OPMs use lasers and gas atoms to measure magnetic fields and are becoming popular for wearable brain sensors."
          },
          {
            question: "Which phenomenon is the basis for a SQUID's operation?",
            options: ["Quantum Tunneling.", "Superconducting Interference and Flux Quantization.", "Nuclear Fusion.", "Laser Diffraction."],
            correctIndex: 1,
            explanation: "The interference of superconducting wavefunctions across two junctions is what gives the SQUID its precision."
          }
        ]
      }
    }
  },
  {
    id: "L11-T3",
    levelId: 11,
    name: "Atomic Clocks",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T2", name: "Trapped Ion Qubits" }] },
      whatYouWillLearn: [
        "Defining the 'Second' via atomic transitions.",
        "Caesium Beam vs Optical Lattice Clocks.",
        "The role of the 'Quantum Pendulum'.",
        "Testing Relativity and Time Dilation."
      ],
      introduction: "Atomic clocks are the most accurate machines ever built. A 'second' is formally defined as exactly 9,192,631,770 vibrations of a Caesium-133 atom. Modern optical clocks are so precise that if they had started ticking at the Big Bang, they would be off by less than one second today.",
      whyItMatters: "Without atomic clocks, there is no GPS. Your phone calculates position by measuring the time it takes for signals to travel from satellites. A mistake of just one billionth of a second leads to a position error of 30cm.",
      keyConcepts: [
        {
          heading: "Hyperfine Transition",
          description: "When an electron in an atom flips its spin, it emits a photon of a very specific frequency. This frequency is a constant of nature and acts as the 'pendulum'."
        },
        {
          heading: "Optical Lattice Clocks",
          description: "These clocks trap thousands of atoms in a grid of laser light (a lattice), allowing for higher frequencies and greater stability."
        }
      ],
      mathematics: "$$ \\Delta f / f \\approx 10^{-18} \\quad (\\text{Fractional Instability}) $$",
      analogy: "A regular clock is like a person walking. An atomic clock is like a perfectly steady heartbeat that never, ever changes its rhythm for billions of years.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# Modeling the 'Ramsey Fringe' used to lock a clock's oscillator.", cirq: "# Simulating transition probability of an atom." },
      realWorldApplications: [
        { title: "GPS Navigation", explanation: "Relies entirely on the precision of satellite atomic clocks." }
      ],
      commonMistakes: [
        { mistake: "Thinking atomic clocks are radioactive.", correction: "They use non-radioactive atoms like Caesium or Strontium." }
      ],
      summary: [
        "World's time standard is based on quantum atomic transitions.",
        "Optical lattice clocks are the next generation of precision.",
        "GPS relies on satellite atomic clocks.",
        "Used to test Relativity (Time Dilation)."
      ],
      quiz: {
        topicId: "L11-T3",
        questions: [
          {
            question: "Why is an atomic clock more accurate than a grandfather clock?",
            options: ["It is larger.", "It uses the consistent vibrations of atoms (a constant of nature) rather than a mechanical pendulum.", "It uses batteries.", "It is made of gold."],
            correctIndex: 1,
            explanation: "Atomic transitions are fundamental constants of the universe, making them much more reliable than any mechanical system."
          },
          {
            question: "How many vibrations of a Caesium-133 atom define one second?",
            options: ["Exactly 100.", "Exactly 9,192,631,770.", "Exactly 1,000,000.", "It changes every day."],
            correctIndex: 1,
            explanation: "This specific number is the international standard for defining the SI second."
          },
          {
            question: "What is 'Relativistic Geodesy'?",
            options: ["A type of space travel.", "Using atomic clocks to measure gravity/altitude because time moves slower near mass.", "A new way to build watches.", "A branch of biology."],
            correctIndex: 1,
            explanation: "High-precision clocks tick differently based on their altitude (gravity), allowing us to measure the Earth's shape with time."
          }
        ]
      }
    }
  },
  {
    id: "L11-T4",
    levelId: 11,
    name: "Quantum Imaging",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L6-T1", name: "What is Entanglement" }] },
      whatYouWillLearn: [
        "Ghost Imaging: Seeing with light that never touched the object.",
        "Quantum-enhanced resolution beyond the Rayleigh Limit.",
        "Squeezed light for sub-shot-noise imaging.",
        "Biomedical imaging with fragile samples."
      ],
      introduction: "Quantum imaging allows us to see the 'impossible'. By using entangled pairs of photons, we can perform 'Ghost Imaging'. One photon hits the object, and its partner (which never touched the object) goes to a camera. By looking at the partner, we can reconstruct a perfect image.",
      whyItMatters: "It allows for imaging in complete darkness or inside human tissue with clarity that classical optics cannot reach. It's the ultimate 'night vision'.",
      keyConcepts: [
        {
          heading: "Sub-Shot-Noise Imaging",
          description: "Using 'Squeezed Light' to reduce the grainy noise (shot noise) that appears in classical photos."
        },
        {
          heading: "Super-Resolution",
          description: "Beating the Rayleigh diffraction limit—the physical law that says cameras can't see anything smaller than the wavelength of light they use."
        }
      ],
      mathematics: "$$ I_{ghost} \\propto \\langle I_1 I_2 \\rangle - \\langle I_1 \\rangle \\langle I_2 \\rangle $$",
      analogy: "Ghost imaging is like drawing a person's portrait by only looking at their shadow and knowing exactly how their shadow relates to their body.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# Modeling photon correlation statistics.", cirq: "# Simulating multi-photon interference patterns." },
      realWorldApplications: [
        { title: "Biological Imaging", explanation: "Seeing delicate living cells without destroying them with bright light." }
      ],
      commonMistakes: [
        { mistake: "Thinking it's 'ghosts'.", correction: "It's a nickname for the non-local nature of the image reconstruction." }
      ],
      summary: [
        "Uses entangled photons to see without direct light.",
        "Beats classical resolution limits.",
        "Allows imaging of delicate biological samples."
      ],
      quiz: {
        topicId: "L11-T4",
        questions: [
          {
            question: "In Ghost Imaging, does the light hitting the camera have to touch the object being photographed?",
            options: ["Yes, always.", "No, it uses entangled partners to reconstruct the image indirectly.", "Only if it is daytime.", "Only if using a digital camera."],
            correctIndex: 1,
            explanation: "Ghost imaging uses the non-local correlation between entangled photons to see objects."
          },
          {
            question: "What is 'Squeezed Light' used for in imaging?",
            options: ["To make the camera smaller.", "To reduce quantum noise below the standard shot-noise limit.", "To change the color of the image.", "To save battery."],
            correctIndex: 1,
            explanation: "Squeezing 'hides' noise in one variable to make another variable (like intensity) ultra-precise."
          },
          {
            question: "What limit does Quantum Imaging aim to surpass?",
            options: ["The speed of light.", "The Rayleigh diffraction limit.", "The sound barrier.", "The memory limit."],
            correctIndex: 1,
            explanation: "Classical optics are limited by wavelength; quantum imaging uses entanglement to see smaller details."
          }
        ]
      }
    }
  },
  {
    id: "L11-T5",
    levelId: 11,
    name: "Gravimetry",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L11-T1", name: "Quantum Sensing Principles" }] },
      whatYouWillLearn: [
        "Atom Interferometry for gravity sensing.",
        "Measuring the Earth's density from space.",
        "Detecting underground tunnels and cavities.",
        "Monitoring volcanic activity."
      ],
      introduction: "Quantum Gravimeters use atoms as tiny, floating weights to measure gravity. By dropping atoms in a vacuum and hitting them with lasers (Atom Interferometry), we can measure gravity ($g$) to 10 decimal places. This is sensitive enough to detect a hollow pipe buried 50 feet underground.",
      whyItMatters: "Gravimeters are used for finding oil, monitoring volcanic activity, and mapping the movement of ground water. They give us 'X-ray vision' for the Earth's interior.",
      keyConcepts: [
        {
          heading: "Atom Interferometry",
          description: "The atom acts as a wave. We split the wave, let one part 'fall' slightly further, and then recombine them. The shift is a perfect measure of gravity."
        },
        {
          heading: "Geodesy",
          description: "Mapping the 'lumpiness' of Earth's gravity based on how much rock or water is beneath you."
        }
      ],
      mathematics: "$$ \\Delta \\phi = k \\cdot g \\cdot T^2 $$",
      analogy: "A quantum gravimeter is like a scale so sensitive it can tell if you are holding a single extra grain of sand while standing on it.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# Modeling phase shifts in gravitational potentials.", cirq: "# Simulating Mach-Zehnder interferometry." },
      realWorldApplications: [
        { title: "Archaeology", explanation: "Finding hidden chambers in pyramids without digging." }
      ],
      commonMistakes: [
        { mistake: "Assuming it measures 'weight'.", correction: "It measures the local acceleration of gravity, independent of the sensor's mass." }
      ],
      summary: [
        "Measures gravity with extreme precision.",
        "Uses atom interferometry.",
        "Maps underground density.",
        "Used for mining and climate science."
      ],
      quiz: {
        topicId: "L11-T5",
        questions: [
          {
            question: "How does a quantum gravimeter 'see' underground tunnels?",
            options: ["By sending sound waves.", "By measuring tiny drops in gravity caused by the lack of rock/density in the tunnel.", "Using a camera.", "By measuring ground temperature."],
            correctIndex: 1,
            explanation: "Tunnels have less mass than solid rock, leading to a tiny dip in the local gravitational field."
          },
          {
            question: "What is the primary mechanism inside a quantum gravimeter?",
            options: ["A spring scale.", "Atom Interferometry.", "A GPS chip.", "A nuclear reactor."],
            correctIndex: 1,
            explanation: "Atoms are treated as waves that interfere with each other; gravity shifts those waves."
          },
          {
            question: "Which of these is a real-world use for a gravimeter?",
            options: ["Measuring the speed of a car.", "Monitoring volcanic magma movement.", "Checking the weather.", "Recording music."],
            correctIndex: 1,
            explanation: "Magma moving underground changes the local density, which a gravimeter can detect before an eruption."
          }
        ]
      }
    }
  },
  {
    id: "L11-T6",
    levelId: 11,
    name: "Quantum Key Distribution (QKD)",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L5-T5", name: "No-Cloning Theorem" }] },
      whatYouWillLearn: [
        "The fundamental logic of QKD.",
        "Why eavesdropping is physically impossible to hide.",
        "The difference between QKD and standard encryption.",
        "Alice, Bob, and the eavesdropper (Eve)."
      ],
      introduction: "Quantum Key Distribution (QKD) is the first 'hack-proof' communication method. Unlike classical encryption (which relies on hard math), QKD relies on the laws of physics. If an eavesdropper tries to intercept a quantum key, the act of looking at the qubits changes them (Measurement collapse), and Alice and Bob will immediately know they are being watched.",
      whyItMatters: "Standard encryption will be broken by Shor's algorithm. QKD provides 'Information-Theoretic Security', meaning even a computer from the year 3000 cannot break it.",
      keyConcepts: [
        {
          heading: "No-Cloning Theorem",
          description: "An eavesdropper cannot copy a quantum state without destroying the original, making 'silent' intercept impossible."
        },
        {
          heading: "Key Exchange",
          description: "QKD doesn't send the secret message; it sends a random 'key' used to unlock the message. The message itself is then sent classically."
        }
      ],
      mathematics: "$$ P(\\text{detection}) = 1 - (3/4)^n $$",
      analogy: "It's like sending a secret code inside a bubble. If anyone tries to read the code, the bubble pops, leaving a clear sign that someone touched it.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: { qiskit: "# Simulating the Alice-Bob quantum channel.", cirq: "# Modeling qubit transmission and measurement bases." },
      realWorldApplications: [
        { title: "Bank Security", explanation: "Financial institutions use QKD to protect multi-billion dollar transfers between data centers." }
      ],
      commonMistakes: [
        { mistake: "Thinking QKD sends the whole message quantumly.", correction: "QKD only sends the encryption key; the message is sent using standard fiber optics." }
      ],
      summary: [
        "Provides unhackable encryption keys.",
        "Based on the laws of physics, not math.",
        "Detects eavesdropping via wave function collapse.",
        "The foundation of the secure Quantum Internet."
      ],
      quiz: {
        topicId: "L11-T6",
        questions: [
          {
            question: "Why is QKD considered 'unhackable'?",
            options: ["The math is too hard.", "The laws of physics ensure that any eavesdropping changes the state and is detected.", "It is too fast to catch.", "It uses no wires."],
            correctIndex: 1,
            explanation: "Measurement collapse means you cannot 'quietly' observe a quantum signal."
          },
          {
            question: "What is sent during a QKD session?",
            options: ["The actual message.", "A random string of bits to be used as an encryption key.", "A photo of Alice.", "Nothing."],
            correctIndex: 1,
            explanation: "QKD is about securely sharing a secret key, which is then used for classical encryption (like AES)."
          },
          {
            question: "Who is 'Eve' in the context of QKD?",
            options: ["Alice's sister.", "The eavesdropper trying to intercept the key.", "A quantum gate.", "The name of the computer."],
            correctIndex: 1,
            explanation: "Eve stands for 'Eavesdropper' in cryptography literature."
          }
        ]
      }
    }
  },
  {
    id: "L11-T7",
    levelId: 11,
    name: "BB84 Protocol",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L11-T6", name: "Quantum Key Distribution (QKD)" }] },
      whatYouWillLearn: [
        "The mechanics of the BB84 protocol (1984).",
        "Rectilinear vs Diagonal measurement bases.",
        "Sifting the key and Error Rate calculation.",
        "Privacy amplification and information reconciliation."
      ],
      introduction: "BB84 is the most famous QKD protocol, developed by Bennett and Brassard. Alice sends qubits in one of four states (using two different bases). Bob measures them in a random basis. Afterward, they compare which bases they used. The bits where they used the same basis form the 'Sifted Key'.",
      whyItMatters: "BB84 is the baseline for nearly all commercial QKD systems today. It is the practical implementation of the theoretical 'unhackability' of quantum communication.",
      keyConcepts: [
        {
          heading: "Two Bases",
          description: "Alice uses the Rectilinear ($|0\\rangle, |1\\rangle$) and Diagonal ($|+\\rangle, |-\\rangle$) bases. Bob must guess which one she used for each bit."
        },
        {
          heading: "QBER (Quantum Bit Error Rate)",
          description: "Alice and Bob check a small sample of their key. If the error rate is too high, they know Eve was listening and they throw the key away."
        }
      ],
      mathematics: "$$ \\text{Basis Match Probability} = 0.5 $$",
      analogy: "It's like Alice sending Bob a series of letters through polarized sunglasses. If Bob wears the same sunglasses (basis), he sees the letter clearly. If he wears the wrong ones, he gets a random result.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit, execute, Aer\n# BB84 Alice stage\nqc = QuantumCircuit(1, 1)\nqc.h(0) # Sending a '+' state\n# Bob measures in X basis\nqc.h(0); qc.measure(0, 0)\nprint('BB84 single bit simulation.')",
        cirq: "# BB84 basis switching logic in Cirq."
      },
      realWorldApplications: [
        { title: "Micius Satellite", explanation: "The first satellite to perform BB84 QKD from space to Earth over thousands of kilometers." }
      ],
      commonMistakes: [
        { mistake: "Thinking they share the whole key over the phone.", correction: "They only share the BASES they used, not the actual bit values." }
      ],
      summary: [
        "The first and most widely used QKD protocol.",
        "Uses two non-orthogonal measurement bases.",
        "Detects eavesdropping by measuring the Error Rate.",
        "Requires a classical authenticated channel for basis comparison."
      ],
      quiz: {
        topicId: "L11-T7",
        questions: [
          {
            question: "In BB84, what happens if Bob measures in the WRONG basis?",
            options: ["He gets the correct answer anyway.", "He gets a 100% random result (50/50 chance of 0 or 1).", "The qubit explodes.", "The computer turns off."],
            correctIndex: 1,
            explanation: "Measuring a '+' state in the 0/1 basis yields a random result, which is why Bob only keeps bits where his basis matched Alice's."
          },
          {
            question: "What is 'Sifting' in BB84?",
            options: ["Cleaning the qubits.", "The process of Alice and Bob discarding bits where they used different bases.", "Looking for a virus.", "Encrypting the data."],
            correctIndex: 1,
            explanation: "Sifting ensures that only the bits with high correlation are used for the secret key."
          },
          {
            question: "If Eve listens to the channel, what happens to the Error Rate (QBER)?",
            options: ["It goes down.", "It stays the same.", "It increases noticeably (typically to 25% for intercepted bits).", "It becomes zero."],
            correctIndex: 2,
            explanation: "Eve's measurements introduce noise that Alice and Bob can detect by comparing a sample of their bits."
          }
        ]
      }
    }
  },
  {
    id: "L11-T8",
    levelId: 11,
    name: "The Quantum Internet",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L6-T5", name: "Entanglement Swapping" }] },
      whatYouWillLearn: [
        "The concept of Entanglement as a resource.",
        "Quantum Repeaters: Overcoming fiber optic loss.",
        "Distributed Quantum Computing.",
        "Blind Quantum Computing: Hiding your code from the cloud provider."
      ],
      introduction: "The Quantum Internet isn't about faster Netflix; it's about connecting quantum computers together. Because qubits cannot be copied (No-Cloning), we cannot use standard signal boosters. Instead, we use 'Quantum Repeaters' that use entanglement swapping to 'teleport' information across long distances.",
      whyItMatters: "A single quantum computer is powerful, but a network of them is unstoppable. It allows for perfectly secure voting, ultra-precise telescope arrays, and 'Blind Computing' where you can run code on a cloud server without the server ever knowing what your code is.",
      keyConcepts: [
        {
          heading: "Quantum Repeaters",
          description: "Since we can't 'amplify' a qubit, we create entanglement between point A and B, then B and C, and 'swap' it to create entanglement between A and C."
        },
        {
          heading: "Blind Quantum Computing",
          description: "A protocol that allows a user with a simple quantum terminal to run a calculation on a powerful quantum server while keeping both the data and the algorithm secret from the server owner."
        }
      ],
      mathematics: "$$ F_{net} = F_1 \\times F_2 \\quad (\\text{Fidelity of concatenated links}) $$",
      analogy: "The classical internet is like sending letters. The quantum internet is like creating a 'wormhole' of entanglement between two cities so information can be teleported instantly.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: { qiskit: "# Modeling a multi-node entanglement distribution network.", cirq: "# Simulating a quantum repeater chain." },
      realWorldApplications: [
        { title: "Delft University (QuTech)", explanation: "The team building the first multi-node quantum network in the Netherlands." }
      ],
      commonMistakes: [
        { mistake: "Thinking it replaces the classical internet.", correction: "It will exist alongside the classical internet, used only for tasks that require quantum security or distributed processing." }
      ],
      summary: [
        "Connects quantum devices via entanglement.",
        "Uses repeaters to overcome signal loss in fiber optics.",
        "Enables Blind Computing and ultra-secure communication.",
        "Foundation for a global quantum cloud."
      ],
      quiz: {
        topicId: "L11-T8",
        questions: [
          {
            question: "Why do we need 'Quantum Repeaters' instead of standard amplifiers?",
            options: ["They are cheaper.", "The No-Cloning theorem makes it impossible to 'amplify' a quantum signal without destroying it.", "Standard amplifiers are too fast.", "Repeaters use less power."],
            correctIndex: 1,
            explanation: "You can't copy a qubit to boost it, so you have to use entanglement to extend its range."
          },
          {
            question: "What is 'Blind Quantum Computing'?",
            options: ["Computing without a screen.", "A way to run a quantum algorithm on a server without the server knowing the algorithm or the data.", "A computer for the visually impaired.", "A computer that cannot see noise."],
            correctIndex: 1,
            explanation: "It is a privacy-preserving protocol unique to quantum information science."
          },
          {
            question: "What is the primary 'resource' being distributed in a quantum network?",
            options: ["Electricity.", "Entanglement.", "Classical bits.", "Heat."],
            correctIndex: 1,
            explanation: "Entanglement is the 'fuel' that allows for teleportation and secure communication across the network."
          }
        ]
      }
    }
  }
];

export const LEVEL_11_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
