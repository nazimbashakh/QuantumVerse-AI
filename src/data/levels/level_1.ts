import { Topic, QuizQuestion } from '../types';

export const LEVEL_1_TOPICS: Topic[] = [
  {
    id: "L1-T1",
    levelId: 1,
    name: "What is Quantum Computing",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [] },
      whatYouWillLearn: [
        "The fundamental definition of quantum computing.",
        "How quantum mechanics differentiates this field from classical binary processing.",
        "The concept of harnessing subatomic physics for computation.",
        "The broad scope of problems quantum computers map to."
      ],
      introduction: "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers. While traditional computers operate using classical physics and represent data in discrete states of 0s and 1s, quantum computers manipulate subatomic particles (like electrons or photons) to represent multidimensional computational spaces.\n\nThe field emerged in the early 1980s when physicist Richard Feynman famously noted that classical computers cannot simulate quantum physics efficiently. He proposed building a computer based on quantum mechanical elements. By using phenomena like superposition and entanglement, quantum computing transitions from being just a theoretical novelty in physics to a functional engineering discipline capable of mapping exponentially large problems onto physical hardware.",
      whyItMatters: "Quantum computing matters because it addresses limitations inherent in classical architecture (Moore's Law). Organizations like IBM, Google, and national security agencies invest billions into it because a mature quantum computer could theoretically break RSA encryption via Shor's Algorithm and revolutionize drug discovery by efficiently simulating complex molecular structures.",
      keyConcepts: [
        {
          heading: "The Paradigm Shift",
          description: "Classical computing is deterministic; an input of A always produces B. Quantum computing is probabilistic. It processes vast probability amplitudes simultaneously and requires careful orchestration of constructive interference to reveal the correct answer upon measurement."
        },
        {
          heading: "State Manipulation",
          description: "Instead of logic gates built from transistors, quantum computing uses microwave pulses or lasers to physically rotate the state of an atom or photon, creating new mathematical distributions without permanently collapsing them."
        },
        {
          heading: "Complexity Theory Boundaries",
          description: "Quantum computing introduces a new complexity class: BQP (Bounded-error Quantum Polynomial time). This comprises problems solvable efficiently on a quantum computer, proving that the universe computes differently than Turing machines assumed."
        },
        {
          heading: "Hardware Abstractions",
          description: "At the highest level, you do not need to know the physics to write quantum algorithms. Quantum Information Science provides a mathematical abstraction (Hilbert spaces and unitary matrices) that shields the programmer from cryogenic hardware nuances."
        }
      ],
      mathematics: "$$ |\\psi\\rangle \\in \\mathcal{H} $$\\nEvery quantum state is a unit vector within a complex Hilbert space $\\mathcal{H}$.\\n$$ U^{\\dagger}U = I $$\\nAll quantum operations (gates) must be unitary, meaning they are perfectly reversible.",
      analogy: "Imagine an orchestra where a classical computer plays one note after another linearly to find a specific melody. A quantum computer plays all possible melodies at once, using acoustic interference to mute the wrong chords and amplify the exact target melody.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit, transpile\\nfrom qiskit_aer import AerSimulator\\n\\n# 1. Initialize a generic 1-qubit quantum circuit\\nqc = QuantumCircuit(1, 1)\\n\\n# 2. Add an Identity gate (doing nothing, demonstrating state preservation)\\nqc.id(0)\\n\\n# 3. Measure the qubit onto a classical bit\\nqc.measure(0, 0)\\n\\n# 4. Simulate the result\\nsimulator = AerSimulator()\\njob = simulator.run(transpile(qc, simulator), shots=10)\\nresult = job.result().get_counts()\\nprint(f'Classical Output measured from Quantum hardware space: {result}')",
        cirq: "import cirq\\n\\n# 1. Instantiate a quantum bit\\nqubit = cirq.GridQubit(0, 0)\\n\\n# 2. Create a generic quantum circuit\\ncircuit = cirq.Circuit()\\n\\n# 3. Add an identity operation and measure\\ncircuit.append(cirq.I(qubit))\\ncircuit.append(cirq.measure(qubit, key='m'))\\n\\n# 4. Run classical simulation of the quantum state\\nsimulator = cirq.Simulator()\\nresult = simulator.run(circuit, repetitions=10)\\nprint(f'Measurements: {result.histogram(key=\"m\")}')"
      },
      realWorldApplications: [
        { title: "Financial Modeling", explanation: "JPMorgan Chase is researching quantum frameworks to evaluate complex derivatives and portfolio optimization faster than Monte Carlo simulations." },
        { title: "Pharmaceuticals", explanation: "Companies like Biogen explore quantum computing to map complex protein folding without resource-heavy classical approximations." },
        { title: "Climate Change", explanation: "Simulating better catalysts for carbon capture relies on modeling electron interactions, a native task for quantum systems." }
      ],
      commonMistakes: [
        { mistake: "Believing quantum computers are just 'faster classical computers'.", correction: "They do not speed up web browsing or download speeds; they solve specific math problems using completely different physics." },
        { mistake: "Thinking a quantum computer tries all answers at once and picks the right one.", correction: "It modifies probability amplitudes, interfering wrong answers destructively and right answers constructively." },
        { mistake: "Assuming quantum states are stable.", correction: "Quantum information is incredibly fragile, leading to decoherence just from thermal noise." }
      ],
      summary: [
        "Quantum computing replaces classical bits with quantum states.",
        "It relies on the mathematical principles of complex Hilbert spaces.",
        "It excels at parallel probabilistic calculations, not sequential linear tasks.",
        "Real-world quantum hardware requires extreme isolation (cryogenics).",
        "It introduces the BQP complexity class."
      ],
      quiz: {
        topicId: "L1-T1",
        questions: [
          {
            question: "Why did Richard Feynman propose quantum computing?",
            options: ["To speed up internet routing.", "Because classical computers cannot efficiently simulate quantum mechanics.", "To replace silicon wafers due to scarcity.", "To build stronger classical GPUs."],
            correctIndex: 1,
            explanation: "Feynman famously observed that nature isn't classical, so simulating nature requires a computer governed by quantum mechanical rules."
          },
          {
            question: "Which of the following is true about quantum computing operations?",
            options: ["They are deterministic.", "They must be unitary and reversible.", "They rely solely on boolean algebra.", "They instantly break all passwords."],
            correctIndex: 1,
            explanation: "In order to preserve probability amplitudes, all quantum gate operations (except measurement) must be unitary and mathematically reversible."
          },
          {
            question: "What is the primary misconception about how quantum computers achieve speedup?",
            options: ["They rely on interference.", "They use Hilbert spaces.", "They try every single combination simultaneously to pick the correct answer.", "They use subatomic particles."],
            correctIndex: 2,
            explanation: "Quantum computers do not simply 'try all answers at once and pick the right one'. They use wave interference to amplify the probability of measuring the correct answer."
          }
        ]
      }
    }
  },
  {
    id: "L1-T2",
    levelId: 1,
    name: "Classical vs Quantum Computing",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T1", name: "What is Quantum Computing" }] },
      whatYouWillLearn: [
        "The architectural differences between classical Von Neumann and quantum architectures.",
        "Differences between deterministic logic and probabilistic amplitudes.",
        "Information encoding differences (Bits vs Qubits).",
        "The concept of exponential scaling in quantum state spaces."
      ],
      introduction: "At a fundamental level, the difference between classical and quantum computing lies in how information is encoded, processed, and retrieved. Classical computers utilize the Von Neumann architecture, processing binary digits (bits) through irreversible logic gates (like AND, OR). Everything is deterministic; if you provide the exact same input, you will always get the exact same output.\n\nConversely, quantum computers do not process bits sequentially. They process quantum bits (qubits) using unitary, reversible quantum gates. When you add a bit to a classical computer, you increase its state space linearly (by 1). When you add a qubit to a quantum computer, you double the number of states that can be represented simultaneously ($2^n$). However, extracting that information requires a probabilistic measurement, meaning quantum computing requires statistical repetition to guarantee success.",
      whyItMatters: "Understanding this disparity prevents engineers from trying to apply classical logic to quantum chips. A quantum computer will likely never run your operating system or render video games; it functions more like a specialized coprocessor (like a GPU), handed off to solve specific matrix operations or cryptographic algorithms.",
      keyConcepts: [
        {
          heading: "State Encoding",
          description: "A classical system of 3 bits can exist in exactly ONE of 8 states (e.g., `101`). A quantum system of 3 qubits exists in a linear combination of ALL 8 states simultaneously until measured."
        },
        {
          heading: "Gate Reversibility",
          description: "Classical gates like AND are irreversible because two input bits become one output bit (information is lost, generating heat via Landauer's principle). Quantum gates are unitary matrices; inputs can always be derived from outputs."
        },
        {
          heading: "Measurement Restraints",
          description: "You can read classical memory an infinite number of times without changing it. Reading quantum memory forces the superposition to collapse irreversibly into a single classical state."
        },
        {
          heading: "Scaling",
          description: "To simulate a 50-qubit system classically requires the memory equivalent of the world's largest supercomputer. To simulate a 300-qubit system requires more classical bits than there are atoms in the observable universe."
        }
      ],
      mathematics: "$$ \\text{Classical State: } s \\in \\{0, 1\\}^n $$\\n$$ \\text{Quantum State: } |\\psi\\rangle = \\sum_{x \\in \\{0,1\\}^n} \\alpha_x |x\\rangle $$\\n$$ \\sum_{x} |\\alpha_x|^2 = 1 $$\\nThis shows how a quantum state holds $2^n$ complex amplitudes $\\alpha_x$.",
      analogy: "A classical computer solving a maze acts like a single mouse walking through and hitting dead ends until it finds the exit. A quantum computer acts like water flooding the maze, exploring all paths simultaneously, and leaving a wet mark along the optimal route.",
      visualType: "PROBABILITY_HISTOGRAM",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n\\n# 1. Classical simulation comparison (Deterministic)\\nclassical_output = [0, 1, 0] # Simple array\\n\\n# 2. Quantum initialization (Probabilistic space)\\nqc = QuantumCircuit(3)\\n# The circuit can represent all 8 states (000 to 111) mathematically.\\nprint('Classical State space size:', len(classical_output))\\nprint('Quantum Amplitude vector size:', 2**qc.num_qubits)",
        cirq: "import cirq\\n\\n# Classical Bit approach\\nbit_val = 1\\n\\n# Quantum approach\\nq0 = cirq.GridQubit(0,0)\\ncircuit = cirq.Circuit()\\n# We do not assign '1' or '0' directly; we apply operations.\\ncircuit.append(cirq.X(q0))\\nprint('Classical bit:', bit_val)\\nprint('Quantum operator mapping:\\n', circuit)"
      },
      realWorldApplications: [
        { title: "Hybrid Computing", explanation: "AWS Bracket orchestrates tasks so classical servers handle database logic, while QPU hardware calculates the combinatorial optimization chunk." },
        { title: "Datacenter Architecture", explanation: "IBM's Quantum System Two bridges classical supercomputers directly to cryogenic quantum chips precisely because quantum excels only on specific probabilistic tasks." }
      ],
      commonMistakes: [
        { mistake: "Thinking quantum computers will replace classical computers.", correction: "They are coprocessors. You still need classical CPUs to compile quantum circuits and process the measurement outcomes." },
        { mistake: "Assuming a quantum computer gives 100% accurate results every time.", correction: "Quantum hardware is noisy and quantum algorithms are probabilistic, requiring multiple 'shots' (runs) to build a distribution." }
      ],
      summary: [
        "Classical uses deterministic, irreversible bits.",
        "Quantum uses probabilistic, reversible qubits.",
        "Quantum states scale exponentially ($2^n$) in computational capacity.",
        "Quantum memory is destroyed upon classical observation.",
        "Quantum computing is designed for hybrid interaction with classical logic."
      ],
      quiz: {
        topicId: "L1-T2",
        questions: [
          {
            question: "What happens to the computational space when you add one qubit to a quantum system?",
            options: ["It increases by 1.", "It doubles.", "It remains the same.", "It squares."],
            correctIndex: 1,
            explanation: "The state space is defined by $2^n$. Adding 1 qubit makes it $2^{n+1}$, which doubles the number of possible states the system can represent simultaneously."
          },
          {
            question: "Why can't you copy a quantum state like a classical file?",
            options: ["The hardware is too cold.", "The No-Cloning Theorem forbids creating identical independent copies of arbitrary quantum states.", "Classical logic gates prevent it.", "Interference nullifies the state."],
            correctIndex: 1,
            explanation: "The No-Cloning Theorem in quantum mechanics proves mathematically that it is impossible to perfectly duplicate an unknown quantum state."
          },
          {
            question: "Which of these best describes classical logic gates compared to quantum gates?",
            options: ["Classical gates are always reversible.", "Classical gates (like AND) lose information and are irreversible, while quantum gates are always unitary and reversible.", "Both are totally identical.", "Quantum gates are irreversible."],
            correctIndex: 1,
            explanation: "Quantum gates are unitary matrices ($U^{\\dagger}U = I$), meaning input states can be recovered from output states without energy loss. Standard classical gates destroy information."
          }
        ]
      }
    }
  },
  {
    id: "L1-T3",
    levelId: 1,
    name: "History of Quantum Computing",
    type: "theory",
    estimatedMinutes: 10,
    content: {
      prerequisites: { topics: [{ id: "L1-T1", name: "What is Quantum Computing" }] },
      whatYouWillLearn: [
        "The timeline of quantum computing discoveries.",
        "Key physicists and mathematicians who shaped the field.",
        "The theoretical physics milestones versus hardware milestones.",
        "Major algorithmic breakthroughs like Shor's and Grover's."
      ],
      introduction: "The history of quantum computing is a fascinating transition from theoretical physics objections into applied computer science. The seeds were sown in the early 20th century with the formulation of quantum mechanics by physicists like Max Planck, Albert Einstein, and Niels Bohr. However, using quantum mechanics specifically as a computational paradigm didn't formally emerge until the 1980s.\n\nIn 1980, Paul Benioff described the first quantum mechanical model of a computer. In 1981, at a legendary MIT conference, Richard Feynman proposed that simulating physics natively required a quantum computer. In 1985, David Deutsch formalized the concept of a Universal Quantum Turing Machine. The field evolved from pure academic abstraction to a global technology race in 1994 when Peter Shor published his polynomial-time algorithm for integer factorization, proving quantum computers could break modern cryptography.",
      whyItMatters: "Understanding the timeline gives context to why quantum computing is hard. It took decades of pure math before experimental physicists could reliably control single atoms, proving that quantum concepts weren't just math, but engineerable constructs.",
      keyConcepts: [
        {
          heading: "1920s: The Physics Foundation",
          description: "Schrödinger, Heisenberg, and Dirac laid the mathematical foundation of quantum mechanics, describing wave functions and matrix mechanics, but algorithms did not exist."
        },
        {
          heading: "1981: Feynman's Imperative",
          description: "Feynman argued that since nature is not classical, simulations of nature require a computer that operates strictly via quantum rules."
        },
        {
          heading: "1994: Shor's Algorithm",
          description: "Peter Shor at Bell Labs developed an algorithm to factor large prime numbers exponentially faster than classical computers, introducing the security threat that popularized the field."
        },
        {
          heading: "1996: Grover's Algorithm / QEC",
          description: "Lov Grover demonstrated a polynomial speedup for database searches. Concurrently, Shor and Steane invented Quantum Error Correction (QEC), proving quantum states could survive decoherence."
        },
        {
          heading: "2019: Quantum Supremacy",
          description: "Google's Sycamore processor claimed 'quantum supremacy', performing a specialized sampling task faster than the world's most powerful classical supercomputer."
        }
      ],
      mathematics: "\\text{Classical prime factorization takes } O\\left(e^{1.9 (\\log N)^{1/3} (\\log\\log N)^{2/3}}\\right) \\text{ time.}\\n\\text{Shor's Algorithm takes } O((\\log N)^3) \\text{ time.}\\nThis exponential disparity single-handedly funded the hardware race.",
      analogy: "The history is like aviation: quantum mechanics in the 1920s was aerodynamics theory. Feynman's 1981 proposal was the Wright Brothers' sketches. Google's 2019 supremacy was the first 12-second flight.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import __version__\\n\\n# The Qiskit SDK was released by IBM in 2017 to bring quantum to the public.\\nprint(f'Using Qiskit version that carries decades of legacy: {__version__}')",
        cirq: "import cirq\\n\\n# Google's Cirq was instrumental in formatting the 2019 Quantum Supremacy paper.\\nprint(f'Cirq framework loaded for execution.')"
      },
      realWorldApplications: [
        { title: "NIST PQC Standards", explanation: "Due to Shor's history making algorithm, NIST formally launched post-quantum cryptographic standards in 2022 to prepare the internet for quantum hacks." }
      ],
      commonMistakes: [
        { mistake: "Thinking Albert Einstein invented the quantum computer.", correction: "Einstein helped invent quantum physics, but he notoriously disliked quantum entanglement ('spooky action'). Paul Benioff and David Deutsch modeled the actual computers." },
        { mistake: "Believing quantum computers are fully realized now.", correction: "We are currently in the NISQ (Noisy Intermediate-Scale Quantum) era. Fault-tolerant (Shor-capable) quantum computers do not yet exist." }
      ],
      summary: [
        "1981: Feynman proposed the quantum computer.",
        "1985: Deutsch modeled the Universal Quantum Turing Machine.",
        "1994: Shor proved quantum could break RSA encryption.",
        "1996: Grover proved optimal unstructured search.",
        "2019: Google achieved narrow experimental Quantum Supremacy."
      ],
      quiz: {
        topicId: "L1-T3",
        questions: [
          {
            question: "Whose algorithm fundamentally jump-started massive global funding for quantum computing in 1994?",
            options: ["Albert Einstein", "Richard Feynman", "Peter Shor", "Lov Grover"],
            correctIndex: 2,
            explanation: "Peter Shor's factorization algorithm demonstrated that a quantum computer could theoretically break RSA cryptography, turning it into a national security interest."
          },
          {
            question: "What did Richard Feynman famously argue in 1981 regarding quantum simulation?",
            options: ["The internet should be decentralized.", "Simulating molecular physics natively requires a quantum computer.", "Superconducting qubits are highly scalable.", "Moore's Law will last forever."],
            correctIndex: 1,
            explanation: "Feynman famously said, 'Nature isn't classical... if you want to make a simulation of nature, you'd better make it quantum mechanical.'"
          },
          {
            question: "What era is the current state of quantum computing (as of the 2020s) classified as?",
            options: ["Fault-Tolerant Era", "The Golden Age", "NISQ Era", "Classical Era"],
            correctIndex: 2,
            explanation: "We are in the NISQ (Noisy Intermediate-Scale Quantum) era, meaning our qubits are noisy and we lack the volume for full error correction."
          }
        ]
      }
    }
  },
  {
    id: "L1-T4",
    levelId: 1,
    name: "Quantum Mechanics Basics",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L1-T2", name: "Classical vs Quantum Computing" }] },
      whatYouWillLearn: [
        "The mathematical postulates of Quantum Mechanics.",
        "The difference between operators and observables.",
        "Schrödinger's formulation of evolving systems.",
        "How physics correlates directly to computational operators."
      ],
      introduction: "Quantum mechanics is the mathematical framework that describes the universe at subatomic scales. In classical physics (Newtonian), you can precisely know both the position and momentum of a baseball. In quantum mechanics, systems are intrinsically uncertain and are described entirely by a 'Wave Function' or 'State Vector'.\\n\\nTo do quantum computing, you don't need a PhD in theoretical physics—you only need to grasp three core postulates. First, the state of any isolated physical system is represented by a vector in a complex Hilbert space. Second, the evolution of this system is described by a unitary transformation. Third, extracting information happens via measurement, which collapses the vector to a strict basis state according to the Born Rule.",
      whyItMatters: "Quantum computational frameworks like Qiskit perfectly replicate these postulates. The state vector is your data. Unitary transformations are your code. Measurement is your `print()` statement.",
      keyConcepts: [
        {
          heading: "State Vectors (Postulate 1)",
          description: "A quantum state is defined by a normalized vector in a complex vector space. The length of the vector squared must equal exactly 1, representing 100% total probability."
        },
        {
          heading: "Unitary Evolution (Postulate 2)",
          description: "Systems evolve predictably when isolated. The mathematical operator ($U$) governing this evolution preserves the length of the state vector, enforcing reversibility."
        },
        {
          heading: "Measurement (Postulate 3)",
          description: "When an observable is measured, the system abruptly projects onto one of the basis states. The probability of collapsing into a specific state is given by the squared magnitude of its complex amplitude (Born's rule)."
        },
        {
          heading: "Heisenberg Uncertainty",
          description: "Certain pairs of observables (like position and momentum) cannot be simultaneously measured to arbitrary precision. In computing, evaluating a qubit in the Z-basis creates total uncertainty in the X-basis."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle $$\\n$$ \\langle\\psi|\\psi\\rangle = 1 \\implies |\\alpha|^2 + |\\beta|^2 = 1 (\\text{Normalization}) $$\\n$$ |\\psi'\\rangle = U|\\psi\\rangle \\text{ where } U^{\\dagger}U = I (\\text{Evolution}) $$\\n$$ p(0) = |\\langle 0 | \\psi \\rangle |^2 = |\\alpha|^2 (\\text{Born Rule}) $$",
      analogy: "A state vector is a ship floating precisely at specific GPS coordinates. Unitary evolution is the sea currents shifting the ship predictably. Measurement is throwing an anchor down; the ship violently stops at exactly one discrete location, discarding the previous possibilities.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\n\\n# 1. Define a quantum state using complex mathematics\\n# Corresponding to |0>\nstate = Statevector([1, 0])\\nprint('Initial State:', state.data)\\n\\n# 2. Evolve state via Unitary matrix (Hadamard)\\nevolved_state = state.evolve([[0.707, 0.707], [0.707, -0.707]])\\n\\n# 3. View Probabilities (Born Rule)\\nprobs = evolved_state.probabilities()\\nprint(f'Probability of 0: {probs[0]}, Probability of 1: {probs[1]}')",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Demonstrating unitary evolution\\n# The H matrix\\nH = np.array([[1, 1], [1, -1]]) / np.sqrt(2)\\n\\n# Check if unitary: H * H_dagger = I\\nis_unitary = np.allclose(np.eye(2), H @ H.conj().T)\\nprint(f'Is Matrix Unitary (Reversible)? {is_unitary}')"
      },
      realWorldApplications: [
        { title: "NMR Spectroscopy", explanation: "Applying unitary evolution to magnetic spins is exactly how MRI machines image the human body." },
        { title: "Semiconductor Design", explanation: "Understanding quantum tunneling (a direct result of wavefunction mechanics) is required to build smaller transistors." }
      ],
      commonMistakes: [
        { mistake: "Believing normalization is optional.", correction: "If a state vector doesn't normalize to 1, probability math breaks. The universe demands probabilities sum to 100%." },
        { mistake: "Confusing physical states with code.", correction: "In QC, the code literally represents exact equations in quantum mechanics." }
      ],
      summary: [
        "Quantum computing is governed by mathematical postulates of physics.",
        "States are lengths of 1 in a complex Hilbert space.",
        "Evolution is always handled by unitary, reversible matrices.",
        "Measurement is irreversible and governed by the Born Rule.",
        "Complex amplitudes yield physical observable probabilities."
      ],
      quiz: {
        topicId: "L1-T4",
        questions: [
          {
            question: "What is the Born Rule used for in quantum mechanics?",
            options: ["Calculating the speed of light.", "Determining the probability of a measurement outcome.", "Ensuring matrices are unitary.", "Building classical physics gates."],
            correctIndex: 1,
            explanation: "The Born rule states that the probability of measuring a state is the absolute magnitude squared of its complex amplitude."
          },
          {
            question: "Why must quantum evolution operators be unitary?",
            options: ["Because they must generate heat.", "Because they must preserve total probability equal to 1.", "Because classical logic requires it.", "To prevent measurement."],
            correctIndex: 1,
            explanation: "A unitary operator preserves the mathematical length of the state vector. Without this, probabilities would exceed 100%, causing a physical paradox."
          },
          {
            question: "What does it mean for a state vector to be 'normalized'?",
            options: ["The imaginary components are zero.", "The sum of the squared amplitudes equals exactly 1.", "It fits inside a standard classical bit.", "The state is fully entangled."],
            correctIndex: 1,
            explanation: "Normalization guarantees that the sum of the probabilities of all possible outcomes is exactly 1 (or 100%)."
          }
        ]
      }
    }
  },
  {
    id: "L1-T5",
    levelId: 1,
    name: "Wave Particle Duality",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T4", name: "Quantum Mechanics Basics" }] },
      whatYouWillLearn: [
        "The Double-Slit experiment and its implications.",
        "How a single entity acts like both a particle and a wave.",
        "Constructive and destructive interference.",
        "How algorithms leverage wave logic."
      ],
      introduction: "Wave-Particle Duality is perhaps the most famous and baffling core principle of quantum mechanics. It asserts that all elementary particles (like photons and electrons) display characteristics of both discrete particles and continuous waves depending on how they are measured.\n\nThe iconic demonstration of this is the Double-Slit experiment. When scientists fire single electrons toward a barrier with two slits, the electrons create an interference pattern on the wall behind it—a behavior exclusive to waves. This implies the single electron passed through both slits simultaneously, interfered with its own probability wave, and then landed as a discrete particle on the wall. If a detector is placed to 'watch' which slit the electron goes through, the wave function collapses, and the interference pattern disappears.",
      whyItMatters: "Quantum algorithms literally engineer interference. Because computational paths take the form of waves, programmers can intentionally direct the 'crests' of correct answers to combine making them loud, and direct the 'troughs' of wrong answers to cancel each other out.",
      keyConcepts: [
        {
          heading: "The Wave Function",
          description: "Before measurement, an electron does not have a precise location. It exists as a wave function, mapping the probability amplitudes of where it *could* be."
        },
        {
          heading: "Constructive Interference",
          description: "When the peaks of two probability waves align, their amplitudes add together. In computing, we use gates to force the correct answer's computational paths to constructively interfere, guaranteeing a high probability of measurement."
        },
        {
          heading: "Destructive Interference",
          description: "When a peak aligns with a trough, they cancel each other out to zero. We engineer algorithms to destructively interfere the incorrect search paths, hiding them from the final output."
        },
        {
          heading: "The Observer Effect",
          description: "The act of acquiring information (measurement) forces the wave-like probability distribution to instantly become a localized particle. This is the collapse."
        }
      ],
      mathematics: "$$ \\psi(x,t) = Ae^{i(kx - \\omega t)} $$ \\nThis describes a plane wave. \\n$$ p(x) = |\\psi_1(x) + \\psi_2(x)|^2 $$\\n$$ = |\\psi_1|^2 + |\\psi_2|^2 + 2 |\\psi_1||\\psi_2|\\cos(\\theta) $$\\nThe extra cosine term is the mathematical signature of Quantum Interference.",
      analogy: "If you throw two rocks into a pond, the ripples intersecting generate spots of high waves and flat water. Classical computing throws rocks independently. Quantum computing calculates the exact timing to throw the rocks so the highest ripple hits exactly on your desired target.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\nfrom qiskit.quantum_info import Statevector\\n\\n# Demonstrating Interference computationally\\nqc = QuantumCircuit(1)\\n# State 0 represents a particle path. H gate turns it into a wave (superposition).\\nqc.h(0)\\nprint('After 1st H (Wave state):\\n', Statevector(qc).data)\\n\\n# Second H gate causes interference.\\n# The |1> state amplitudes cancel out entirely!\\nqc.h(0)\\nprint('After 2nd H (Interference returns it to particle/deterministic state):\\n', Statevector(qc).data)",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Simulating the math of interference\\namp_path1 = 1/np.sqrt(2)\\namp_path2 = -1/np.sqrt(2) # Out of phase\\n\\n# Destructive interference\\nfinal_amplitude = amp_path1 + amp_path2\\nprint(f'Interfered Amplitude: {final_amplitude}')"
      },
      realWorldApplications: [
        { title: "Electron Microscopy", explanation: "Utilizing the wave nature of electrons allows significantly higher resolution imaging than photon-based microscopes." },
        { title: "Grover's Algorithm", explanation: "Unstructured search achieves a 100M-to-10k speedup purely by destructively interfering wrong database entries until only the target remains." }
      ],
      commonMistakes: [
        { mistake: "Thinking the particle transforms physically.", correction: "It is the abstract 'probability distribution' that propagates like a wave, not the physical mass of the electron turning into a liquid." },
        { mistake: "Assuming photons are the only dual-nature things.", correction: "Matter (electrons, atoms, molecules) also exhibit wave interference mathematically." }
      ],
      summary: [
        "Entities exhibit both particle and wave behaviors.",
        "Wave interference allows probabilities to amplify or cancel.",
        "Quantum logic works directly by leveraging this constructive and destructive interference.",
        "Observation strips away the wave behavior permanently.",
        "The double-slit experiment proves single particles act as waves."
      ],
      quiz: {
        topicId: "L1-T5",
        questions: [
          {
            question: "In the Double-Slit experiment, what happens if detectors observe which slit the electron enters?",
            options: ["The interference pattern becomes clearer.", "The wave function collapses and the interference pattern disappears.", "The electron splits into two physical pieces.", "The electron stops moving."],
            correctIndex: 1,
            explanation: "Observation destroys the superposition, forcing the electron to behave purely as a classical particle, eliminating the interference pattern."
          },
          {
            question: "How do quantum algorithms utilize the wave nature of states?",
            options: ["By using sonar to ping state vectors.", "They engineer destructive interference to cancel out incorrect answers.", "They heat up the qubits to cause liquid waves.", "They convert bits into physical sound waves."],
            correctIndex: 1,
            explanation: "Algorithms manipulate phases to ensure wrong paths destructively interfere to zero, amplifying the probability of the right path."
          },
          {
            question: "Mathematically, what generates the interference in quantum probability?",
            options: ["The division of absolute values.", "The addition of complex amplitudes before squaring.", "The squaring of numbers before adding them.", "Random noise from hardware."],
            correctIndex: 1,
            explanation: "In quantum mechanics, you add the complex probability amplitudes $`|\\psi_1 + \\psi_2|^2`$ *before* taking the absolute square, yielding the interference cross-terms."
          }
        ]
      }
    }
  },
  {
    id: "L1-T6",
    levelId: 1,
    name: "The Measurement Problem",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T5", name: "Wave Particle Duality" }] },
      whatYouWillLearn: [
        "Why measurement is a fundamentally destructive act in QC.",
        "The concept of wave function collapse.",
        "The philosophical interpretations (Copenhagen vs Many Worlds).",
        "How deferred measurement is implemented in circuits."
      ],
      introduction: "The Measurement Problem is one of the deepest unresolved conceptual issues in quantum physics, and it has profound implications for how we program quantum computers. While unitary operators evolve quantum states smoothly, deterministically, and reversibly, the act of measurement breaks all these rules. Measurement abruptly forces a continuous superposition into a single discrete classical state, irreversibly destroying the complex superposition.\n\nWhy does a completely mathematically reversible system suddenly become irreversible just because macroscopic equipment interacts with it? This disconnect is the Measurement Problem. In software, this means you can only extract a fraction of the data processed. If your system holds $2^{50}$ states, measurement forcibly truncates that infinite-precision data down to exactly 50 classical bits. You only get to open the box once.",
      whyItMatters: "Programmers must defer `qc.measure()` calls until the very end of their quantum circuits. If you measure halfway through, you destroy the superposition and all quantum speedup is lost.",
      keyConcepts: [
        {
          heading: "Wave Function Collapse",
          description: "Mathematically, the system is projected onto an eigenstate corresponding to the measurement basis. All other amplitude paths are deleted."
        },
        {
          heading: "The Copenhagen Interpretation",
          description: "The historical consensus: the wave function isn't real, it's just a statistical tool that reflects our knowledge, and observation physically triggers a random actualization of one possibility."
        },
        {
          heading: "The Many-Worlds Interpretation",
          description: "An alternative view: collapse doesn't exist. Instead, the universe branches into separate parallel realities for every possible measurement outcome. The observer simply becomes entangled with the outcome."
        },
        {
          heading: "Deferred Measurement",
          description: "A computational principle proving that any measurement performed in the middle of a circuit can be pushed to the very end without changing the final probability distribution."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\sum_i c_i |\\phi_i\\rangle $$\\nUpon measuring the observable $A = \\sum_i a_i |\\phi_i\\rangle\\langle\\phi_i|$, the state collapses to $|\\phi_k\\rangle$ with probability $P_k = |c_k|^2$.\\n\\nPost-measurement, the state is strictly:\\n$$ |\\psi_{post}\\rangle = \\frac{P_k |\\psi\\rangle}{\\sqrt{\\langle \\psi | P_k | \\psi \\rangle}} = |\\phi_k\\rangle $$",
      analogy: "Superposition is watching a spinning coin. It is a blur of heads and tails. Measurement is slapping your hand down on it. The spin is forever destroyed, and you are left staring at a static 'Heads'.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0) # Superposition created\\n\\n# The moment we invoke measurement, the wave collapses\\nqc.measure(0, 0)\\n\\n# Any operations after this act strictly on a classical 0 or 1\\nqc.x(0) # This behaves completely classically now because superposition is gone.\\nprint('Circuit built with terminal measurement:\\n', qc)",
        cirq: "import cirq\\n\\nq = cirq.GridQubit(0, 0)\\ncircuit = cirq.Circuit(\\n    cirq.H(q),\\n    cirq.measure(q, key='m') # Measurement collapses state\\n)\\n# 100 simulations show the statistical projection\\nresults = cirq.Simulator().run(circuit, repetitions=100)\\nprint(results.histogram(key='m'))"
      },
      realWorldApplications: [
        { title: "Quantum Key Distribution (QKD)", explanation: "Measurement destructiveness is used as a security feature. If a hacker attempts to steal the quantum key, their measurement collapses the state, alerting the sender." }
      ],
      commonMistakes: [
        { mistake: "Believing you can read a quantum variable to check its value mid-code.", correction: "There is no `print()` debugging in quantum logic. Reading a qubit breaks the algorithm." },
        { mistake: "Assuming observation requires a human consciousness.", correction: "In physics, observation just means any macroscopic thermodynamic interaction, like a stray cosmic ray hitting the qubit." }
      ],
      summary: [
        "Measurement is irreversible and instantaneous.",
        "It projects continuous vector spaces onto discrete classical bits.",
        "You must wait to measure until the algorithm is fully finished interfering amplitudes.",
        "The philosophical 'why' is debated across multiple Interpretations.",
        "Measurement inherently deletes all unobserved probability branches."
      ],
      quiz: {
        topicId: "L1-T6",
        questions: [
          {
            question: "Why can't you insert a print statement to inspect a qubit halfway through a quantum algorithm?",
            options: ["The compiler doesn't support strings.", "The measurement collapses the superposition, turning it into a classical bit and ruining the quantum algorithmic math.", "It will crash the QPU.", "Qubits are invisible."],
            correctIndex: 1,
            explanation: "Measurement acts as a destructive projection. Any attempt to inspect the state forces internal collapse."
          },
          {
            question: "What does the Principle of Deferred Measurement state?",
            options: ["You should never measure anything.", "Intermediate measurements can always be moved to the end of the circuit without changing probability distributions.", "Measurements take infinite time.", "You can delay collapse indefinitely."],
            correctIndex: 1,
            explanation: "It is a formal proof that any intermediate measurement coupled with classical control logic can be replaced by purely quantum gates and measured only at the end."
          },
          {
            question: "Which interpretation involves the 'branching' of the universe?",
            options: ["Copenhagen", "Pilot Wave", "Many Worlds", "Hidden Variable"],
            correctIndex: 2,
            explanation: "The Many Worlds interpretation resolves the measurement problem by positing that no wave collapse occurs; instead, all possible outcomes physically manifest in separate realities."
          }
        ]
      }
    }
  },
  {
    id: "L1-T7",
    levelId: 1,
    name: "Quantum vs Classical Bits",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L1-T4", name: "Quantum Mechanics Basics" }] },
      whatYouWillLearn: [
        "The definition of a Qubit.",
        "How a Qubit spans a geometric sphere.",
        "The impact of continuous state spaces against discrete bit vectors.",
        "Why a single Qubit holds virtually infinite information (theoretically), but outputs only one bit."
      ],
      introduction: "Classical computers operate entirely in binary, storing information in bits that strictly lock to either completely 0 or completely 1. These physical implementations—whether transistors, magnetic disk polarities, or punch hole cards—are macroscopic and deterministic.\n\nA Quantum Bit (Qubit) completely transcends this dichotomy. Subatomic systems (like the polarization of a single photon or the ground/excited state of a transmon) represent the qubit. Crucially, a qubit can exist in a complex linear combination of *both* states. Rather than thinking of a qubit as a light switch (on/off), a qubit is better visualized as a point anywhere on the surface of an abstract 3D globe (The Bloch Sphere). The North pole is 0, the South pole is 1, but the qubit can exist anywhere in the oceans and continents in between.",
      whyItMatters: "Understanding the geometric expansion from a 1D discrete line ( classical bits ) to a 3D continuous sphere ( The Bloch Sphere ) is what allows quantum phase operations—the driving force behind all quantum software.",
      keyConcepts: [
        {
          heading: "Mathematical Dimensions",
          description: "Classical bit $n$: state space size is 1. Quantum bits $n$: state space size is $2^n$ continuous complex numbers."
        },
        {
          heading: "The Phase Component",
          description: "Unlike classical probabilities, an amplitude has a phase (driven by complex numbers). Phase is what distinguishes $|0\\rangle + |1\\rangle$ from $|0\\rangle - |1\\rangle$. Classical bits have no concept of phase."
        },
        {
          heading: "Infinite Capacity, Finite Extraction",
          description: "Holevo's bound teaches us a humbling fact: Although a single qubit exists continuously and requires an infinite number of decimal points to perfectly describe mathematically, it can only ever yield a maximum of 1 classical bit of information upon measurement."
        }
      ],
      mathematics: "$$ \\text{Classical Bit} \\in \\{0, 1\\} $$\\n$$ \\text{Qubit} = \\alpha |0\\rangle + \\beta |1\\rangle = \\cos(\\frac{\\theta}{2})|0\\rangle + e^{i\\phi}\\sin(\\frac{\\theta}{2})|1\\rangle $$\\nWhere $\\theta$ represents the colatitude and $\\phi$ represents the complex longitude on the Bloch sphere.",
      analogy: "A classical bit is a coin sitting flat on a table, strictly heads or tails. A qubit is an airplane navigating anywhere on the surface of the Earth. It has a continuous, measurable coordinate system.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit.visualization import plot_bloch_multivector\\nfrom qiskit.quantum_info import Statevector\\nimport numpy as np\\n\\n# Representing a qubit outside of binary logic\\n# Equator state (Superposition)\\nstate = Statevector([1/np.sqrt(2), 1j/np.sqrt(2)])\\nprint('Complex State:', state.data)\\n# plot_bloch_multivector(state) visualizes the 3D nature.",
        cirq: "import cirq\\nimport numpy as np\\n\\nq = cirq.LineQubit(0)\\n# Operations can rotate by infinitesimal continuous degrees, unlike classical AND/OR\\ntiny_rotation = cirq.rx(np.pi / 8)\\nprint('Continuous Gate:', tiny_rotation)"
      },
      realWorldApplications: [
        { title: "Analog Nature", explanation: "Because qubits exist in a continuous state space, they are incredible tools for simulating fundamentally continuous environments like molecular chemistry geometries." }
      ],
      commonMistakes: [
        { mistake: "Assuming a Qubit holds a lot of retrievable data.", correction: "A qubit theoretically holds infinite information in its phase/amplitude combination, but Holevo's bound proves you can only extract exactly 1 classical bit via measurement." }
      ],
      summary: [
        "Classical bits are 0 OR 1.",
        "Qubits are complex linear combinations spanning a continuous 3D sphere.",
        "Qubits contain a 'phase' attribute enabling interference.",
        "Measurement inherently clips the continuous Qubit down to a discrete Bit.",
        "Continuous quantum states allow for analog-esque hardware mappings of chemistry."
      ],
      quiz: {
        topicId: "L1-T7",
        questions: [
          {
            question: "How much classical information can you extract from measuring a single isolated qubit?",
            options: ["Infinite information.", "Zero information.", "Exactly one bit of information.", "Two bits due to superposition."],
            correctIndex: 2,
            explanation: "Holevo's bound asserts that despite the continuous mathematical nature of a qubit, measuring it collapses it down to exactly one discrete classical bit (0 or 1)."
          },
          {
            question: "What physical visualization maps all possible states of a single qubit?",
            options: ["The Mandelbrot Set", "The Turing Tape", "The Bloch Sphere", "The Feynman Diagram"],
            correctIndex: 2,
            explanation: "The Bloch Sphere is a geometric representation where poles represent binary states and the surface represents complex superposition states."
          },
          {
            question: "What property does a qubit have that a classical probability distribution does not?",
            options: ["It sums to 1", "Phase (Complex Numbers)", "It can be plotted", "It can be multiplied"],
            correctIndex: 1,
            explanation: "Classical probabilities are purely real, positive numbers. Qubits possess complex amplitudes featuring a Phase, allowing amplitudes to be negative and result in destructive interference."
          }
        ]
      }
    }
  },
  {
    id: "L1-T8",
    levelId: 1,
    name: "Superposition Introduction",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T7", name: "Quantum vs Classical Bits" }] },
      whatYouWillLearn: [
        "The definition and mechanism behind Superposition.",
        "The linear combination formulation.",
        "How creating a superposition unlocks the $2^n$ state space.",
        "The difference between classical parallel processing and quantum superposition."
      ],
      introduction: "Superposition is one of the pillars of quantum advantage. Fundamentally, superposition dictates that a quantum system can exist in a linear combination of multiple mutually exclusive states at the exact same time. When a qubit is placed in an equal superposition of $|0\\rangle$ and $|1\\rangle$, it is completely uncommitted to either identity until the wave function collapses upon measurement.\n\nWhile this might sound like a classical probability distribution (like a spinning coin where we just don't know the answer yet), superposition is completely different. The particle genuinely occupies both states physically, enabling interactions (interference) between the possibilities. The Hadamard gate is typically the gateway operation in circuits, used immediately on initialized qubits to cast them into a massive superposition map, unlocking the computational canvas.",
      whyItMatters: "Without superposition, a 50-qubit computer is just a terrible classical computer running 50 bits. Superposition is what forces a 50-qubit computer to simultaneously evaluate a state space of $1,125,899,906,842,624$ distinct possibilities in one execution cycle.",
      keyConcepts: [
        {
          heading: "Linear Combination",
          description: "A superposed state $|\\psi\\rangle$ is formed by adding scaled basis vectors together. Because the governing equations are linear, combining two valid states yields another valid state."
        },
        {
          heading: "The Plus and Minus States",
          description: "An equal superposition isn't just one type. $|+\\rangle$ is $|0\\rangle + |1\\rangle$ while $|-\\rangle$ is $|0\\rangle - |1\\rangle$. Classical measurements view them as identical 50/50 probabilities, but quantum operations distinguish them perfectly based on their relative phase."
        },
        {
          heading: "Not 'Trying Everything At Once'",
          description: "Superposition evaluates the function across the entire space globally, but it doesn't give you all the answers. It outputs one single string that must be guided by interference algorithms."
        }
      ],
      mathematics: "$$ |+\\rangle = \\frac{1}{\\sqrt{2}}|0\\rangle + \\frac{1}{\\sqrt{2}}|1\\rangle $$\\n$$ |-\\rangle = \\frac{1}{\\sqrt{2}}|0\\rangle - \\frac{1}{\\sqrt{2}}|1\\rangle $$\\nIn a 3-qubit system containing purely $|+\\rangle$ states:\\n$$ |\\psi\\rangle = |+\\rangle \\otimes |+\\rangle \\otimes |+\\rangle = \\frac{1}{\\sqrt{8}} (|000\\rangle + |001\\rangle + \\dots + |111\\rangle) $$",
      analogy: "Take a musical chord. A C-Major chord isn't a C note playing, stopping, then an E note playing. It is C, E, and G vibrating entirely simultaneously to structure a single complex sonic shape. Superposition is the computational chord.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(3)\\n# Applying H gate creates an equal superposition\\nqc.h([0,1,2])\\n\\n# The state now mathematically holds 8 equal probability paths.\\nprint('Circuit generating 8-state superposition:\\n', qc)",
        cirq: "import cirq\\n\\nqubits = cirq.LineQubit.range(3)\\ncircuit = cirq.Circuit(cirq.H.on_each(*qubits))\\nprint('Cirq generating 8-state superposition:\\n', circuit)"
      },
      realWorldApplications: [
        { title: "Parallel Evaluation", explanation: "Algorithms like Deutsch-Jozsa map a black-box function across a massive superposition to answer questions about the function globally with just a single query." }
      ],
      commonMistakes: [
        { mistake: "Thinking superposition is just classical ignorance.", correction: "A coin hidden under a cup is classically unknown to you, but geometrically defined. A qubit in superposition has NO defined geometry until the cup is removed." },
        { mistake: "Assuming measurement gives you 'all the answers'.", correction: "Measuring a superposed system collapses it into ONE random answer. Algorithm designers must interfere the waves before measuring to make the correct answer emerge." }
      ],
      summary: [
        "Superposition is existing in a linear combination of quantum basis states.",
        "It applies exponentially: $n$ superposed qubits cover $2^n$ basis combinations.",
        "The Hadamard gate creates ideal 50/50 superpositions.",
        "It forms the basis for quantum parallel processing evaluation.",
        "It features phases allowing distinct wave states like $|+\\rangle$ and $|-\\rangle$."
      ],
      quiz: {
        topicId: "L1-T8",
        questions: [
          {
            question: "What quantum gate is predominantly used to generate equal superpositions?",
            options: ["The X Gate", "The Hadamard (H) Gate", "The CNOT Gate", "The Measurement Gate"],
            correctIndex: 1,
            explanation: "The Hadamard Gate transforms deterministic states like $|0\\rangle$ into an equal probability linear combination of $|0\\rangle$ and $|1\\rangle$."
          },
          {
            question: "How many states can 10 qubits in full superposition represent mathematically simultaneously?",
            options: ["10", "20", "1,024 ($2^{10}$)", "1,000,000"],
            correctIndex: 2,
            explanation: "Quantum states scale as $2^n$. Therefore, 10 fully superposed qubits represent $2^{10} = 1024$ states at once in Hilbert space."
          },
          {
            question: "What is the difference between the $|+\\rangle$ state and the $|-\\rangle$ state?",
            options: ["$|+\\rangle$ yields more 1s when measured.", "There is no difference in probability, but they differ by a relative phase.", "$|-\\rangle$ violates normalization.", "$|+\\rangle$ is classical."],
            correctIndex: 1,
            explanation: "Both states possess an equal 50% probability of yielding 0 or 1, but they are physically orthogonal vectors differing by a negative phase sign on the $|1\\rangle$ amplitude."
          }
        ]
      }
    }
  }
];

export const LEVEL_1_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L1-T1": {
    questions: [
      {
        question: "Why did Richard Feynman propose quantum computing?",
        options: ["To speed up internet routing.", "Because classical computers cannot efficiently simulate quantum mechanics.", "To replace silicon wafers due to scarcity.", "To build stronger classical GPUs."],
        correctIndex: 1,
        explanation: "Feynman famously observed that nature isn't classical, so simulating nature requires a computer governed by quantum mechanical rules."
      }
    ]
  }
};
