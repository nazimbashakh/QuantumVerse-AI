import { Topic, QuizQuestion } from '../types';

export const LEVEL_3_TOPICS: Topic[] = [
  {
    id: "L3-T1",
    levelId: 3,
    name: "What is a Qubit",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L2-T1", name: "Vectors and Vector Spaces" }] },
      whatYouWillLearn: [
        "The fundamental definition of a Quantum Bit (Qubit).",
        "Physical implementations (Transmons, Ions, Photons).",
        "How it transcends classical binary states.",
        "The concept of continuous quantum information bounds."
      ],
      introduction: "Classical computers process logic using binary digits (Bits). Every transistor in a classical CPU evaluates strictly to a 0 or a 1. A Quantum Bit (Qubit) represents the baseline unit of quantum information. Just like a classical bit, it has two primary measurable states, strictly labeled as $|0\\rangle$ and $|1\\rangle$. However, until that measurement actually occurs, physical laws permit the qubit to exist in any proportional combination of BOTH $|0\\rangle$ and $|1\\rangle$ simultaneously, governed entirely by complex amplitudes.\n\nPhysicists can build qubits out of nearly any stable subatomic two-state system. Some companies synthesize them mathematically by cooling macroscopic circuits down to absolute zero (Superconducting Transmons). Others isolate single individual atoms in a magnetic trap and hit them with lasers (Trapped Ions). To a software developer, the underlying physics doesn't change the algorithm; you manipulate an abstract mathematical qubit vector via APIs like Qiskit.",
      whyItMatters: "Treating qubits like fast classical bits breaks all computational design. Qubits are fragile, continuous, fluid data states. Learning their exact definition is mandatory for algorithm creation.",
      keyConcepts: [
        {
          heading: "The Two-State Base",
          description: "All qubits must possess exactly two distinct, stable measurement eigenstates: the ground state ($|0\\rangle$) and the excited state ($|1\\rangle$)."
        },
        {
          heading: "Continuous Geometries",
          description: "A classical bit can jump between [0] or [1]. A quantum bit navigates a continuous mathematical sphere; it can exist at coordinates like [70% zero, 30% one] but featuring complex phases."
        },
        {
          heading: "Physical Reality",
          description: "Hardware dictates everything. A superconducting qubit is actually a macroscopic ring of aluminum on a silicon wafer. A trapped ion qubit is literally one single vibrating Ytterbium atom."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle $$\\n$$ |0\\rangle \\text{ equates to physical 'Ground State'} $$\\n$$ |1\\rangle \\text{ equates to physical 'Excited State'} $$",
      analogy: "A classical bit is tossing a coin and watching it land heads or tails. A qubit is catching the coin mid-air while it's rapidly spinning; it is mathematically defined but functionally uncommitted to either face until slapped onto the table.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumRegister\\n\\n# Specifically addressing physical qubits\\n# We allocate a single abstract qubit representing a generic two-level system\\nq_reg = QuantumRegister(1, name='physical_qubit')\\nprint(f'Allocated Register Space for: {q_reg.size} Qubits')",
        cirq: "import cirq\\n\\n# Cirq heavily anchors software to physical hardware layouts.\\n# This defines a qubit situated exactly at grid coordinate (0, 0)\\nhardware_qubit = cirq.GridQubit(0, 0)\\nprint(f'Targeting Qubit on Google Sycamore chip architecture at: {hardware_qubit}')"
      },
      realWorldApplications: [
        { title: "Hardware Orchestration", explanation: "Defining logical qubits correctly is mapping them strictly to reliable super-cooled aluminum loops running in IBM datacenter dilution refrigerators." }
      ],
      commonMistakes: [
        { mistake: "Believing Qubits hold two bits of information.", correction: "A qubit holds a continuous massive wave of information, but measuring it extracts exactly one discrete classical bit. No more." },
        { mistake: "Assuming qubits are perfectly identical.", correction: "In physics, all electrons are identical. However, on manufactured hardware chips, Qubit #4 behaves differently from Qubit #5 due to microscopic manufacturing noise." }
      ],
      summary: [
        "A Qubit is the atomic unit of quantum information programming.",
        "It maps to a two-state physical object (like atomic orbits or photon polarization).",
        "It supports continuous quantum superpositions, unlike classical binary.",
        "Hardware abstraction allows mathematicians to ignore the cryogenic physics.",
        "When measured, a qubit rigidly collapses into yielding exactly one standard bit of output."
      ],
      quiz: {
        topicId: "L3-T1",
        questions: [
          {
            question: "Physically, what defines the computational basis states $|0\\rangle$ and $|1\\rangle$ of a physical qubit?",
            options: ["The GPU temperature limit.", "They equate mapping specifically to the Ground state and the Excited state of a subatomic or superconducting system.", "They map to positive and negative voltage in silicon computing.", "They represent parallel realities."],
            correctIndex: 1,
            explanation: "All physical quantum computational architectures mandate that computationally reading '0' aligns to reading the lowest energy physics state (Ground), and reading '1' aligns to the next elevated energy phase (Excited)."
          },
          {
            question: "How does a software developer interact with a Qubit?",
            options: ["By adjusting temperatures globally.", "By manipulating an abstract mathematical column vector via structured SDK logic, regardless of its superconducting or trapped ion physics.", "By supplying raw boolean logic gates.", "They physically align lasers themselves."],
            correctIndex: 1,
            explanation: "Quantum Information Science abstracts hardware variables utilizing vector spaces. You code Unitary matrices algorithms that IBM Qiskit translates automatically to microwave hardware pulses."
          },
          {
            question: "What limits the physical usability of qubits in calculations?",
            options: ["The speed of light constraints in copper wire.", "Decoherence and manufacturing noise aggressively destroying the fragile internal continuous phase data states.", "Cloud network limits.", "The software is too dense."],
            correctIndex: 1,
            explanation: "Because qubits are continuous delicate analogs holding phases rather than locked massive state binaries, simple thermal energy heavily corrupts them, mandating advanced future Error Correction frameworks."
          }
        ]
      }
    },
  },
  {
    id: "L3-T2",
    levelId: 3,
    name: "Qubit Representation",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T1", name: "What is a Qubit" }, { id: "L2-T7", name: "Dirac Notation" }] },
      whatYouWillLearn: [
        "How a Qubit maps strictly into Dirac notation.",
        "Translating states into column vectors.",
        "Vector constraints regarding total probability.",
        "Visualizing combinations of representations."
      ],
      introduction: "Before executing any algorithm, a programmer must understand how to mathematically represent the data state occupying their qubit hardware. Unlike classical logic, where variable tracking consists of printing 0 or 1, inspecting a quantum algorithm requires manipulating specific representational algebraic vectors.\n\nA single qubit is uniquely represented using a two-element complex column vector. Generally, we operate using the standard computational basis defined strictly by Dirac Notation: the 'Ket Zero' $|0\\rangle$ mapping to $[1, 0]^T$ and 'Ket One' $|1\\rangle$ mapping to $[0, 1]^T$. Together, any functional qubit state is mathematically constructed entirely by adding scaled fractions of these two representations together.",
      whyItMatters: "If you cannot translate between the abstract Dirac shorthand ($|\\psi\\rangle$) and the hard mathematical column vector grid representation, you cannot compute algorithm optimizations or confirm circuit behavior.",
      keyConcepts: [
        {
          heading: "The Standard Z-Basis",
          description: "Just like the X and Y axes on a standard graph, quantum vectors require axes. The default axes globally used for qubits are defined by the Paul-Z matrix eigenvectors: $|0\\rangle$ and $|1\\rangle$."
        },
        {
          heading: "Array Format Transformation",
          description: "All states can be rewritten from shorthand Dirac notation directly into long-form column matrices to perform linear algebra addition operations algorithmically."
        },
        {
          heading: "Linear Mapping Combination",
          description: "Any state is completely represented exactly by its coordinate mapping: $\\alpha$ (the coordinate along the 0-axis) and $\\beta$ (the coordinate along the 1-axis)."
        }
      ],
      mathematics: "\\text{The fundamental mapping of Qubit Basis Arrays:}\\n$$ |0\\rangle \\equiv \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} $$\\n$$ |1\\rangle \\equiv \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} $$\\n\\text{Combining into a Universal State:}\\n$$ \\alpha|0\\rangle + \\beta|1\\rangle = \\alpha\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + \\beta\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} $$",
      analogy: "Representing a Qubit is identical to providing address directions. $|0\\rangle$ is traveling purely 'North'. $|1\\rangle$ is traveling purely 'East'. The vector $(\\alpha, \\beta)$ is simply stating: 'Walk North by $\\alpha$, then walk East by $\\beta$.' You have pinpointed your exact state.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\n\\n# Representing the mathematical state explicitly via an array geometry\\nzero_ket = Statevector([1, 0])\\none_ket = Statevector([0, 1])\\n\\n# Superposition mathematical representation addition\\nsuper_state = (0.6 * zero_ket) + (0.8 * one_ket)\\nprint('Resulting mapped Qubit column vector:', super_state.data)",
        cirq: "import numpy as np\\n\\n# Numpy array direct representations match perfectly with Dirac column logic\\nalpha = np.sqrt(0.3)\\nbeta = np.sqrt(0.7)\\n\\nqubit_vector = np.array([alpha, beta])\\nprint('Total Vector Magnitude representation bounds to 1.0:', np.round(np.linalg.norm(qubit_vector), 2))"
      },
      realWorldApplications: [
        { title: "Compiler Software", explanation: "All quantum SDK parsers (from IBM to Rigetti) intake graphical circuit drawings and immediately translate them strictly into these column vector representations to run simulator math." }
      ],
      commonMistakes: [
        { mistake: "Assuming $|0\\rangle$ equals the integer Number 0.", correction: "It isn't a zero digit. It is the label string '0' pointing directly to a full vector mathematically defined as `[1, 0]`." },
        { mistake: "Adding probabilities instead of Amplitudes.", correction: "You never add $30\\%$ and $70\\%$ directly inside the geometry vector. You must map their square root amplitudes: $\\sqrt{0.3}$ and $\\sqrt{0.7}$." }
      ],
      summary: [
        "A Qubit's mathematical identity is mapped into a normalized two-element column vector.",
        "$|0\\rangle$ maps exclusively to the $[1, 0]^T$ vector array.",
        "$|1\\rangle$ maps exclusively to the $[0, 1]^T$ vector array.",
        "Combined qubit states linearly add the values inside the array grid vertically.",
        "These arrays translate abstract circuit paths into executable linear algebra matrix structures."
      ],
      quiz: {
        topicId: "L3-T2",
        questions: [
          {
            question: "How is the qubit condition $|0\\rangle$ converted strictly into formal array mathematics?",
            options: ["An empty integer memory slot.", "The row vector $[0, 1]$.", "The column vector $[1, 0]^T$.", "The Identity matrix block."],
            correctIndex: 2,
            explanation: "The Dirac 'Ket Zero' operates precisely as the vertical linear algebra column mapping to the initial basis tensor."
          },
          {
            question: "If a Qubit is defined as $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$, what is its equivalent 2D matrix structure?",
            options: ["The column vector consisting of $\\alpha$ over $\\beta$.", "The fraction $\\alpha / \\beta$.", "The sum equation of $\\alpha + \\beta = 1$.", "The Hadamard gate representation."],
            correctIndex: 0,
            explanation: "In linear topology, applying the scalars constructs the consolidated vector structure representing the total continuous qubit state geometry directly."
          },
          {
            question: "Why must you configure state mapping logic utilizing complex square roots instead of raw percentages?",
            options: ["Hardware constraints.", "State vectors map Probability Amplitudes, not direct probabilistic percentages. Absolute Squaring handles the ultimate probabilistic output.", "Python programming defaults.", "It looks more academic."],
            correctIndex: 1,
            explanation: "Classical logic utilizes probabilities that map cleanly to $100\\%$. Quantum state representations mandate amplitude coefficients mapping so the Absolute Square dictates output, enforcing phase integrity."
          }
        ]
      }
    }
  },
  {
    id: "L3-T3",
    levelId: 3,
    name: "The Bloch Sphere",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T2", name: "Qubit Representation" }] },
      whatYouWillLearn: [
        "The geometric globe representation characterizing a 1-Qubit system.",
        "Translating states into Latitudinal axes ($\\theta$) and Longitudinal axes ($\\varphi$).",
        "Understanding Global Phase versus Relative Phase visually.",
        "Mapping gates algorithmically as literal 3D sphere rotations."
      ],
      introduction: "Mapping quantum vectors algebraically gets heavily convoluted very fast. Physicist Felix Bloch architected a massively intuitive geometrical representation mapping the entire algebraic Hilbert space of a solitary qubit across the surface of a three-dimensional globe structure. This globe is universally celebrated as the Bloch Sphere.\n\nBecause all valid quantum vector states must strictly execute to a normalized probability summation of exactly 1, no state vector point can exist 'inside' the sphere geometry, nor 'outside' it. Every legally valid quantum state is formally tethered exactly traversing the pure outer surface topology of the sphere (radius = 1). The absolute North Pole dictates the $|0\\rangle$ logical state, and the South Pole dictates $|1\\rangle$. Consequently, entering superposition physically maps to navigating the qubit down to hover precisely across the sphere's horizontal equatorial plane.",
      whyItMatters: "The Bloch Sphere converts blindingly obtuse linear algebra calculations directly into standard 3D spatial rotation visualizations. When an algorithm calls for applying a Pauli-X gate, it instantly translates mentally to 'physically execute a $180^{\\circ}$ flip rotating along the X-axis mapping of the globe.'",
      keyConcepts: [
        {
          heading: "The Geographic Coordinates",
          description: "States map leveraging Colatitude ($\\theta$): indicating probability amplitude ranging pole to pole. Longitude ($\\varphi$): indicating mapping complex phase spanning around the horizontal equator."
        },
        {
          heading: "Superposition Equatorial Plane",
          description: "Any state mapped on the exact center horizontal equator yields precisely 50/50 probability. However, pacing around the equator alters the complex wave phase parameter ($|+\\rangle$, $|-\\rangle$, $|i\\rangle$, $|-i\\rangle$ states)."
        },
        {
          heading: "Negating Global Phase",
          description: "Mathematical Global phase scaling offsets alter nothing upon practical measurement physically. The Bloch Sphere intuitively drops the Global phase completely, validating only the relative $\\varphi$ phase separating states."
        }
      ],
      mathematics: "\\text{The rigorous spherical coordinate mapping:}\\n$$ |\\psi\\rangle = \\cos\\left(\\frac{\\theta}{2}\\right) |0\\rangle + e^{i\\varphi} \\sin\\left(\\frac{\\theta}{2}\\right) |1\\rangle $$\\n$$ \\theta \\in [0, \\pi], \\quad \\varphi \\in [0, 2\\pi) $$",
      analogy: "The Bloch Sphere maps just like Planet Earth geometry. Traveling from the North Pole ($|0\\rangle$) toward the Equator changes climate (probability distributions). Strolling horizontally directly upon the Equator shifts your timeline (relative complex quantum phase) but doesn't change your climate probability.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit.visualization import plot_bloch_multivector\\nfrom qiskit.quantum_info import Statevector\\nimport numpy as np\\n\\n# Utilizing Qiskit tools to map visualizations mathematically\\nstate = Statevector([1/np.sqrt(2), 1j/np.sqrt(2)])\\n\\n# In a Jupyter notebook, this directly renders the 3D globe visualization:\\n# plot_bloch_multivector(state)\\nprint('\\n(Requires IBM Jupyter UI to physically render the 3D graphical plot object.)')",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Executing a mathematical movement mapping across the Bloch Sphere surface\\nq = cirq.GridQubit(0, 0)\\n# Rotating the physical state 90 degrees around the Y axis\\ncircuit = cirq.Circuit(cirq.ry(np.pi/2)(q))\\nprint('The algorithm shifts the coordinate precisely mapping down to the equator line.')"
      },
      realWorldApplications: [
        { title: "RF Pulse Calibrations", explanation: "Hardware Engineers deploying Microwave manipulation frequencies to QPU topologies literally plot and track the trajectories of the physical quantum properties navigating exclusively across Bloch Sphere mappings to test environmental Decoherence." }
      ],
      commonMistakes: [
        { mistake: "Believing multiple entangled qubits possess a massive Bloch Sphere.", correction: "The standard Bloch sphere completely fractures during entanglement logic mapping. You cannot accurately render multi-qubit interconnected entanglement exclusively via solitary Bloch visualizations." },
        { mistake: "Assuming interior points represent states.", correction: "Vectors occupying the interior of the formal globe dictate Mixed Statistical states (implying system ignorance or hardware thermal decoherence), NOT pristine isolated Pure Quantum vectors." }
      ],
      summary: [
        "The Bloch Sphere visualizes abstract one-qubit vectors precisely as points on a globe.",
        "North pole guarantees purely measuring 0; South pole guarantees purely 1.",
        "The Equator houses states possessing mathematically precise 50/50 probability splits.",
        "Horizontal navigation alters Phase; Vertical pacing alters probabilistic Amplitude outcome.",
        "Visualizing quantum logic gates equates strictly to assessing rotational spatial manipulations mapping across the topology axes."
      ],
      quiz: {
        topicId: "L3-T3",
        questions: [
          {
            question: "On the topological geometry of the Bloch sphere, where does an entirely uniform, equivalent superposition of probability logically locate the state?",
            options: ["The exact center core of the sphere mapping.", "The top North Pole tip.", "Hovering directly traversing upon the horizontal Equator line.", "Floating completely off the mapping system."],
            correctIndex: 2,
            explanation: "The Equator demarcates mathematical points equidistant from the 0 and 1 poles. Any state mapped strictly here guarantees an identical 50/50 randomized probability output split upon reading."
          },
          {
            question: "Why does the mathematical mapping formula strictly dictate limits ranging $\\theta \\in [0, \\pi]$?",
            options: ["To prevent CPU crashes randomly.", "Because $\\pi$ radians constitutes 180 degrees, allowing a sweeping traverse strictly separating the North Pole entirely down toward traversing the South Pole limits.", "IBM limits rotation hardware.", "Google restricts standard degrees."],
            correctIndex: 1,
            explanation: "The colatitude $\\theta$ sweeps solely top-to-bottom precisely (180 degrees / $\\pi$ radians) capturing entirely the probabilistic variance parameter limits exclusively."
          },
          {
            question: "Can you accurately visualize a robustly Entangled 2-Qubit computational pairing using a solitary standard Bloch Sphere representation?",
            options: ["Yes, trivially.", "No, entanglement fundamentally prevents separation into definitive localized single-qubit Bloch vectors geometries.", "Only utilizing Google cloud limits.", "Yes, by inflating the globe."],
            correctIndex: 1,
            explanation: "Entanglement strictly binds quantum probabilities non-locally. Thus, analyzing them exclusively via separated isolated individual Bloch Spheres produces mathematically incorrect null state geometries."
          }
        ]
      }
    }
  },
  {
    id: "L3-T4",
    levelId: 3,
    name: "Qubit State Vectors",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T3", name: "The Bloch Sphere" }] },
      whatYouWillLearn: [
        "Translating generic wave functions strictly into digital State Vectors.",
        "Extracting explicit operational probability arrays.",
        "Verifying mathematical state normalization constraints.",
        "Analyzing arbitrary combination states."
      ],
      introduction: "While the geometry of the Bloch Sphere provides incredible spatial intuition validating quantum processes, standard execution compilation of advanced multi-algorithm circuits relies heavily on manipulating pure linear algebraic column representations called State Vectors.\n\nA Qubit State Vector aggregates all probability amplitude coefficients corresponding exactly natively to the computational basis states. When programming inside advanced SDKs like Qiskit utilizing Aer Simulators, you are effectively initializing this column architecture grid in RAM mathematically, processing logic gates uniformly across the grid numbers, and observing the final vector distribution.",
      whyItMatters: "Quantum Simulator applications track state vectors entirely natively. A quantum computer executes the physical physics logic. A classical computer pretending to execute quantum logic utilizes State Vector simulation mathematics directly manipulating grids.",
      keyConcepts: [
        {
          heading: "Vector Mapping Arrays",
          description: "Code variables do not load $|0\\rangle$. They rigorously instantiate `[1.0, 0.0]`. When tracking probabilities across huge logical sweeps, algorithms compile this array representation dynamically."
        },
        {
          heading: "The Complex Precision",
          description: "State Vectors naturally handle mathematically complex components seamlessly. $A + Bi$ structures load natively mapping both probability lengths and angular Phase limits correctly."
        },
        {
          heading: "Simulation Bottlenecks",
          description: "Tracking State Vectors across multi-qubit topologies requires allocating precisely $2^n$ complex variables. A 40-qubit representation natively crushes standard laptop RAM capacities exclusively due to tracking vector size bounds."
        }
      ],
      mathematics: "\\text{Executing a purely generic formulation state vector computation:}\\n$$ |\\psi\\rangle = \\begin{pmatrix} c_0 \\\\ c_1 \\end{pmatrix} $$\\n\\text{Where normalizations formally enforce:}\\n$$ |c_0|^2 + |c_1|^2 = 1 $$",
      analogy: "A State Vector tracks algorithm logic identical to an architectural blueprint. The Bloch sphere is the physical 3D skyscraper, but the State Vector encapsulates every structural beam angle math measurement natively loaded inside CAD software.",
      visualType: "PROBABILITY_HISTOGRAM",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\n\\n# The fundamental mathematical simulator backend constructor\\nvec = Statevector([0.8, -0.6]) # Validated natively ( 0.64 + 0.36 = 1.0 )\\n\\nprint('Array Data Grid:', vec.data)\\nprint('Physical Probability Execution Outputs:', vec.probabilities())",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Simulating the raw generic mathematics\\n# Cirq heavily relies on NumPy tracking arrays naturally representing State Vectors.\\nzero_state = np.array([1, 0])\\nprint('State Vector Dimension Count:', len(zero_state))\\nprint('Memory structure represents exactly 1 classical Bit mapped state space boundaries.')"
      },
      realWorldApplications: [
        { title: "Aer Simulation Modules", explanation: "IBM Aer relies completely upon State Vector tracking methodologies mapping precisely pure math predictions without encountering Decoherence noises typical on operational QPUs." }
      ],
      commonMistakes: [
        { mistake: "Believing QPU hardware utilizes State Vector array structures.", correction: "Quantum hardware doesn't do vector matrix multiplication. It uses microwave pulses. State vectors are merely classical modeling representations predicting the physics." },
        { mistake: "Trying to print State Vectors on a real QPU.", correction: "You cannot extract full State Vectors off an operational QPU due exclusively to Wave Collapse physical barriers upon observation." }
      ],
      summary: [
        "State Vectors execute pure linear array mathematical formulations representing Qubits.",
        "They map explicitly the complex Probability Amplitude geometries natively.",
        "They serve directly natively inside computational simulation engines.",
        "Their exponential dimensional tracking natively restricts maximum classical computing simulation limits.",
        "Real operational hardware possesses no true internal computational trackable State Vector variable logic."
      ],
      quiz: {
        topicId: "L3-T4",
        questions: [
          {
            question: "Why does Classical simulation memory crash typically around simulating 40 to 50 Qubits?",
            options: ["The GPU burns out processing the arrays randomly.", "The total elements bounding the State Vector scales strictly tracking $2^n$, commanding massive Exabytes of classical RAM arrays.", "IBM cloud limits connection speeds restricting bandwidth dynamically.", "Error rates override physics models globally."],
            correctIndex: 1,
            explanation: "Representing states exactly mathematically commands $2^n$ trackable complex matrix numbers. At 40 qubits, $2^{40}$ floating point components massively overwhelm globally deployed typical Server clustered RAM capacities."
          },
          {
            question: "When evaluating a real physical IBM generic Quantum chip layout, why can't you simply run a Python `print(qubit.state_vector())` logic line?",
            options: ["Python is globally disabled entirely on servers natively.", "Physical hardware collapses definitively destroying continuous states via the Measurement problem, hiding the total Vector.", "A matrix matrix cannot route globally.", "Qubits natively possess zero geometry internally tracking."],
            correctIndex: 1,
            explanation: "While Simulators securely track mathematical variables precisely, authentic Hardware inherently bounds observation limits to singular classical reading bits, obliterating the total vector superposition randomly upon parsing."
          },
          {
            question: "What numerical boundaries rigorously bind a State Vector's complex components continuously?",
            options: ["They must natively map integer arrays purely.", "The summation resulting from taking the Absolute Precision Squares across all elements inherently must precisely equal 1.0.", "They cannot exceed negative coordinates globally.", "They sum exactly tracking 100 uniformly."],
            correctIndex: 1,
            explanation: "Because physical probability dictates strict laws mapping to exactly certainty (1.0), the geometry vector Euclidean norms mathematically must execute to precisely 1."
          }
        ]
      }
    }
  },
  {
    id: "L3-T5",
    levelId: 3,
    name: "Superposition in Depth",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L3-T3", name: "The Bloch Sphere" }, { id: "L3-T4", name: "Qubit State Vectors" }] },
      whatYouWillLearn: [
        "The nuanced physical mechanisms controlling Superposition stability.",
        "The relative phase shifts mapping $|+\\rangle$ and $|-\\rangle$ states.",
        "Dynamical phase generation operations.",
        "Why superposition isn't just 'Fast Parallelism'."
      ],
      introduction: "While Level 1 explored Superposition fundamentally framing classical differences, Level 3 mandates assessing the computational mathematical bounds controlling Superposition scaling intrinsically entirely. \n\nWhen a unitary logic Hadamard Gate applies uniformly across a generic $|0\\rangle$ qubit, the native probability amplitudes fraction evenly parsing precisely $1/\\sqrt{2}$. The system dynamically possesses both binary values mathematically. Critically, Superposition encompasses entirely arbitrary fractional percentages combining amplitudes. A qubit can functionally map exactly to $99\\%$ measuring Zero and $1\\%$ measuring One while traversing Superposition.",
      whyItMatters: "Algorithm processing dynamically alters fractions natively. Amplitude Amplification (the algorithm engine powering Grover's Search) strictly operates manipulating superposition fractions incrementally altering probabilities dynamically.",
      keyConcepts: [
        {
          heading: "Arbitrary Splits",
          description: "Superposition does not bind purely executing identical 50/50 splits mathematically. Rotation matrix logic gates rotate coordinate geometries establishing exactly arbitrary 70/30 or 90/10 statistical divides."
        },
        {
          heading: "Relative Phase Tracking",
          description: "The mathematical variance separating the $|+\\rangle$ array superposition geometry from the $|-\\rangle$ array geometric state purely hinges completely on tracking the negative coefficient explicitly anchoring the $|1\\rangle$ coordinate variable."
        },
        {
          heading: "Interference Generation Requirements",
          description: "Destructive algorithms only function effectively globally because complex Negative Relative phases mathematically cancel matching Positive Relative phase amplitudes natively traversing internal operations."
        }
      ],
      mathematics: "\\text{Arbitrary generic Superposition generation mechanics mapping:}\\n$$ |\\psi\\rangle = \\sqrt{0.9}|0\\rangle + i\\sqrt{0.1}|1\\rangle $$\\n\\text{Phase offset distinctions:}\\n$$ |+\\rangle = \\frac{1}{\\sqrt{2}}|0\\rangle + \\frac{1}{\\sqrt{2}}|1\\rangle \\quad \\text{(Equator Positive Geometry)} $$\\n$$ |-\\rangle = \\frac{1}{\\sqrt{2}}|0\\rangle - \\frac{1}{\\sqrt{2}}|1\\rangle \\quad \\text{(Equator Negative Geometry)} $$",
      analogy: "If 50/50 superposition equates perfectly pointing exactly directly East, an arbitrary 90/10 superposition mathematically translates directly pointing solidly North-NorthEast. You occupy the sphere completely seamlessly transitioning phases.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\nimport numpy as np\\nfrom qiskit.quantum_info import Statevector\\n\\nqc = QuantumCircuit(1)\\n# A generic RY gate fundamentally applies an arbitrary superposition state geometry perfectly\\nqc.ry(np.pi/3, 0)\\n\\nprint('Generating 75/25 Superposition Phase split natively:')\\nprint(np.round(Statevector(qc).probabilities(), 3))",
        cirq: "import cirq\\nimport numpy as np\\n\\nq = cirq.GridQubit(0, 0)\\ncircuit = cirq.Circuit(cirq.rx(np.pi/4)(q))\\n\\nresult = cirq.Simulator().simulate(circuit)\\nprint('Arbitrary Superposition State Configuration Vector mapped natively:')\\nprint(np.round(result.final_state_vector, 3))"
      },
      realWorldApplications: [
        { title: "Risk Modeling Algorithms", explanation: "Goldman Sachs tests natively mapping financial Monte Carlo Risk boundaries directly utilizing arbitrary superposition fractional percentage bounds replicating continuous market metrics directly." }
      ],
      commonMistakes: [
        { mistake: "Assuming Superpositions are exclusively 50/50 identically fractioned states.", correction: "Any stable operational state mathematically occupying space between purely the North and South poles inherently occupies mathematically valid Superposition geometries natively." },
        { mistake: "Believing $|-\\rangle$ produces more 0s than $|+\\rangle$.", correction: "Both strictly output identical global probabilities completely natively (50%). The minus phase solely matters internally generating wave interference cancellation geometry logic." }
      ],
      summary: [
        "Superposition functionally dictates tracking any mathematically scaled linear combination state internally.",
        "Gate matrices drive continuous rotation geometries arbitrarily mapping percentage amplitude logic.",
        "Relative Phase exclusively differentiates identically structured coordinate probability states natively.",
        "Destructive Phase interference logic fundamentally depends on natively processing relative Phase coordinates algorithmically.",
        "Superposition handles representing analog distributions seamlessly inside inherently discrete bounds systemically."
      ],
      quiz: {
        topicId: "L3-T5",
        questions: [
          {
            question: "Is calculating entirely a $99\\%$ to $1\\%$ probability split mapping technically considered a physical Superposition vector state?",
            options: ["No, it defaults natively returning strictly 1.", "No, superposition requires exactly precisely identical equivalent identical probabilities.", "Yes, any complex defined linear geometry combination not residing precisely identically mapping exclusively onto pure Basis poles is inherently a superposition.", "Yes, but strictly generating Hardware crashes natively."],
            correctIndex: 2,
            explanation: "Superposition legally defines completely integrating arbitrary linear scalable combinations spanning all geometry configurations exclusively except pure 0 or 1."
          },
          {
            question: "What distinct property explicitly separates a calculated $|+\\rangle$ state from natively executing a $|-\\rangle$ state?",
            options: ["Total normalized probability outputs.", "The negative coefficient sign determining modifying entirely fundamentally internal Relative Complex Phase geometry coordinates.", "The Bloch sphere colatitude limits globally.", "There exists natively zero technical separation metrics."],
            correctIndex: 1,
            explanation: "While both physically yield reading identical 50/50 statistical metrics natively, their internal Phase vectors point exactly 180 coordinate degrees oppositely enabling algorithmic interference routing logic natively."
          },
          {
            question: "How natively typically do you mathematically process establishing arbitrary un-equal superposition fractional vector bounds programming inside Qiskit logic?",
            options: ["Invoking exclusively generic basic integer addition operators.", "Applying structured arbitrary logic Rotational Gates explicitly tracking specific discrete angles.", "Deploying standard Classical logical IF boundary statements globally.", "Smashing the compiler natively."],
            correctIndex: 1,
            explanation: "Executing parametric continuous gate matrices directly manipulating structural angle phases precisely maps completely generating customized split geometries continuously."
          }
        ]
      }
    }
  },
  {
    id: "L3-T6",
    levelId: 3,
    name: "Quantum Measurement",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T5", name: "Superposition in Depth" }] },
      whatYouWillLearn: [
        "The mathematical destruction rules of Measurement logic.",
        "Tracking projection operators globally.",
        "Resolving computational wave collapse boundaries.",
        "Analyzing repeated measurement bounds."
      ],
      introduction: "Measurement remains strictly the sole non-reversible algorithmic operation executing broadly inside purely structured quantum matrix systems. While tracking operations utilize natively flawlessly reversible Unitary logic, evaluating an observable strictly invokes completely destructive 'Projection' metrics.\n\nWhen a vector is measured referencing tracking standard computational limits, the geometric wave maps definitively projecting violently entirely capturing exclusively one solitary axis. This projection destroys completely the alternative complex phases routing previously unobserved amplitudes. Consequently, compiling algorithms mandates structuring complex multi-layer logic completely resolving correct answers explicitly concentrating amplitudes heavily before compiling terminal Measurement logic.",
      whyItMatters: "Running complex algorithms seamlessly yields null execution metrics exclusively unless explicit precision observation structures appropriately map reading probabilities out to tracking classical terminal bit architectures securely.",
      keyConcepts: [
        {
          heading: "Born Rule Implementation",
          description: "Tracking native physical statistics strictly defines Output probabilities calculating Absolute Algebraic Squares parsing exactly across mathematical amplitude parameter coordinates globally."
        },
        {
          heading: "Projection Destruction",
          description: "Measurement matrices do not track reversible metrics natively. Evaluating states computationally inherently drops matrices establishing exactly zero null traces entirely destroying pre-state phases decisively."
        },
        {
          heading: "Sequential Collapses",
          description: "Repeatedly measuring directly yielding an already collapsed standard classical state fundamentally produces cleanly identically strictly matching metrics consecutively. The system permanently transitions globally."
        }
      ],
      mathematics: "\\text{Applying analytical strict Born Rules explicitly:}\\n$$ P(|x\\rangle) = |\\langle x | \\psi \\rangle|^2 $$\\n\\text{If measuring natively explicitly yields state } |0\\rangle:\\n$$ |\\psi'\\rangle = \\frac{|0\\rangle\\langle 0| \\psi\\rangle}{\\sqrt{P(|0\\rangle)}} = |0\\rangle $$",
      analogy: "Wave distributions track fluid smoothly mathematically operating precisely globally identical to water flowing tracking varied pipes symmetrically. Measurement instantly completely freezes tracking geometries natively turning water to pure static localized ice randomly universally.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\n\\nqc = QuantumCircuit(1, 1)\\nqc.h(0)\\n# Terminal destruction measurement maps\\nqc.measure(0, 0)\\n\\n# The Qubit completely loses tracking phase continuity instantly.\\nprint('Structured Circuit generating terminal reading bounds:')\\nprint(qc)",
        cirq: "import cirq\\n\\nq = cirq.GridQubit(0, 0)\\ncircuit = cirq.Circuit(cirq.X(q), cirq.measure(q, key='m'))\\n\\nresult = cirq.Simulator().simulate(circuit)\\nprint('System definitively bound yielding discrete data variables explicitly:', result.measurements)"
      },
      realWorldApplications: [
        { title: "Zeno Effect Stabilizers", explanation: "Specific error checking paradigms mathematically leverage 'The Quantum Zeno Effect' deliberately employing consecutive rapid measurement projections specifically strictly forcing states permanently freezing safely avoiding logic decay globally." }
      ],
      commonMistakes: [
        { mistake: "Believing Qiskit measurement gates act reversible identically mapping Standard Unitary gates.", correction: "Measurement gates explicitly strictly natively deploy non-unitary irreversible mathematical projections completely rendering states classically bound decisively." }
      ],
      summary: [
        "Algorithmic Measurement fundamentally terminates continuous operational physics states.",
        "It maps applying formal Mathematical Projections definitively.",
        "The Born Rule explicitly statistically dictates outcome tracking ratios.",
        "State integrity terminates permanently upon execution natively globally.",
        "Post-measurement system dynamics definitively behave processing entirely structurally strictly classically universally."
      ],
      quiz: {
        topicId: "L3-T6",
        questions: [
          {
            question: "Why specifically typically structurally can Measurement gates natively fundamentally never reverse systematically back to original Superposition continuity bounds natively?",
            options: ["The hardware temperature fluctuates randomly.", "Because Observation inherently permanently employs Mathematical Projections strictly irrevocably crushing complex Phase geometric data bounds exclusively universally.", "Python loops natively terminate early globally.", "Because Phase tracking scales excessively."],
            correctIndex: 1,
            explanation: "Projection Mathematics globally delete entire coordinates universally strictly enforcing data loss. Therefore native classical mechanics securely explicitly forbid reversing entirely securely."
          },
          {
            question: "What dictates exactly mathematically strictly determining finding probabilities evaluating explicitly resolving Measurement limits globally?",
            options: ["The structured Born Rule evaluating natively executing Absolute Probability Squares globally.", "The Turing Machine algorithm loops completely.", "Random integer Python structures strictly.", "The Newton Gravity limits accurately."],
            correctIndex: 0,
            explanation: "The Born configuration Rule formally tracks standard bounds computing precisely evaluating specific inner products explicitly executing squared absolute limits strictly governing physics globally."
          },
          {
            question: "If a structural logic system accurately measures explicitly yielding exactly output 0, what natively occurs measuring strictly executing measuring identically simultaneously immediately consecutively?",
            options: ["The system resets globally returning completely superposed natively.", "The structural mechanics yield consistently reading explicitly returning 0 because the state formally collapsed definitively permanently.", "The vector breaks explicitly randomly.", "Phase tracking creates errors strictly globally."],
            correctIndex: 1,
            explanation: "Post measurement, total amplitude completely globally coalesces strictly centering tracking exclusively matching explicitly the resultant basis state completely exclusively yielding identical checks entirely natively."
          }
        ]
      }
    }
  },
  {
    id: "L3-T7",
    levelId: 3,
    name: "Probability Amplitudes",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L3-T6", name: "Quantum Measurement" }] },
      whatYouWillLearn: [
        "The technical distinction detailing Amplitudes versus Probabilities.",
        "Processing Phase metrics inherently driving Interference globally.",
        "Constructing Unitary vector transformations natively.",
        "Analyzing specific algorithmic Phase manipulation."
      ],
      introduction: "Quantum Computing executes logic manipulating exclusively 'Probability Amplitudes', not standard classical probabilities natively globally. Classical logic bounds probabilities strictly between completely $[0, 1]$, mapping values explicitly defining structural integers entirely reliably reliably. Conversely, mathematical Probability Amplitudes define entirely Complex vectors structurally generating mathematically defined positive, negative, and precisely explicitly imaginary trajectory coordinates broadly.\n\nThis explicit computational variance permits completely structuring Amplitude calculations securely. Generating specifically exclusively structurally entirely arbitrary complex numbers intrinsically explicitly handles tracking continuous internal system phase geometry bounds entirely natively processing fundamentally unique entirely execution limits.",
      whyItMatters: "If algorithms operated directly driving explicit strictly Probabilities, total physics computing limits map entirely mimicking randomized classical processes exclusively securely. Amplitudes intrinsically completely allow negative Phase structural combinations explicitly generating true computational globally explicit Quantum Speedup uniquely.",
      keyConcepts: [
        {
          heading: "Complex Geometries",
          description: "Amplitudes explicitly encompass fully entirely complex structural parameters natively parsing exactly global combinations entirely."
        },
        {
          heading: "Interference Calculations",
          description: "Amplitudes inherently exclusively add cleanly mathematically completely preceding squaring operations strictly generating natively entirely complex structural calculations."
        },
        {
          heading: "Absolute Squaring Mechanism",
          description: "To transition exactly extracting useful data limits completely natively explicitly entirely requires applying strictly executing completely explicitly absolute squared logic formally securely globally natively."
        }
      ],
      mathematics: "\\text{Classical Probability Addition natively completely structurally handles:}\\n$$ P_{total} = P_1 + P_2 $$\\n\\text{Quantum Amplitude computation uniquely explicitly securely enforces entirely modifying:}\\n$$ P_{total} = |A_1 + A_2|^2 = |A_1|^2 + |A_2|^2 + 2|A_1||A_2|\\cos(\\theta) $$",
      analogy: "Classical computing essentially structurally tracks mixing exclusively explicitly colored paint securely totally producing brown reliably globally natively. Quantum logic strictly specifically controls overlapping precisely completely defined sonic audio waves totally inherently actively canceling entirely specific matching peaks mathematically explicitly securely totally.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\nimport numpy as np\\n\\n# Specifically explicitly structurally defining negative bounds entirely natively\\nvector_state = Statevector([np.sqrt(0.5), -np.sqrt(0.5)])\\n\\nprint('The explicit structural complex Amplitude tracking geometry entirely lists natively:', vector_state.data)\\nprint('However measuring outputs physically maps classically cleanly exactly:', vector_state.probabilities())",
        cirq: "import cirq\\nimport numpy as np\\n\\n# The completely defined Simulator tracking native bounds securely tracks purely fully Amplitudes completely.\\nsimulator_engine = cirq.Simulator()\\n# Completely tracking purely purely extracting complex variables securely.\\nprint('Cirq native engines completely track completely structural Phase logic securely implicitly.')"
      },
      realWorldApplications: [
        { title: "Grover's Diffusion Operator", explanation: "The specific entire completely structural Unstructured Search methodology intrinsically completely formally actively explicitly inverses precisely specifically explicitly targeted structural complex Amplitudes entirely securing probability accumulation completely natively securely globally." }
      ],
      commonMistakes: [
        { mistake: "Confusing Amplitudes directly entirely identically matching Probabilities.", correction: "Probability natively inherently totally explicitly explicitly defines structural integers securely cleanly exactly between exactly limits 0 and purely fully 1 natively totally. Amplitudes completely map complex numbers explicitly spanning universally strictly complex entirely phase natively explicitly." }
      ],
      summary: [
        "Amplitudes comprehensively securely structurally entirely define physical tracking state geometry mappings completely natively.",
        "They intrinsically fully handle incorporating processing precisely explicitly Phase metrics fully securely explicitly entirely.",
        "Algorithm manipulations fundamentally rigorously absolutely explicitly handle structuring inherently mathematically calculating exclusively modifying purely Amplitude variables explicitly fully natively globally.",
        "The Born Rule absolutely essentially completely functionally transitions strictly mapping intrinsically purely Amplitudes exactly outputting cleanly standard Probabilities mathematically securely purely cleanly globally.",
        "Negative phases natively directly completely entirely physically guarantee fundamentally computing Interference."
      ],
      quiz: {
        topicId: "L3-T7",
        questions: [
          {
            question: "Why explicitly exactly precisely distinctly do Quantum systems exclusively functionally explicitly track structurally fully Probability Amplitudes completely fully globally rather entirely strictly exclusively processing pure Probabilities explicitly natively?",
            options: ["To slow execution safely purely.", "Because fully explicitly incorporating structural tracking Amplitudes completely fully intrinsically natively allows explicitly generating structurally active totally explicitly purely Destructive wave Interference logic completely uniquely.", "It simplifies purely totally coding.", "Because arrays fully purely crash."],
            correctIndex: 1,
            explanation: "Amplitudes encompass entirely explicitly mapping definitively complex numbers inherently natively explicitly precisely formally granting completely generating mathematically negative combinations totally structuring explicitly functional wave cancellations entirely inherently completely accurately completely natively."
          },
          {
            question: "What distinct geometric entirely structural computational component completely fully natively does purely exclusively exactly a complex Amplitude formally entirely distinctly uniquely track entirely completely explicitly explicitly natively totally absolutely explicitly entirely identically reliably that totally completely classical strictly standard scalar metrics totally Probability entirely utterly totally omits absolutely securely natively natively?",
            options: ["Voltage natively globally completely.", "Hardware temperature completely fully precisely perfectly structurally totally globally.", "Geometric Phase strictly completely functionally identically entirely correctly reliably totally correctly flawlessly securely exclusively efficiently.", "Integer variables fully correctly."],
            correctIndex: 2,
            explanation: "Classical logic perfectly securely absolutely explicitly entirely entirely exclusively totally handles processing only mapping precisely identical purely precise purely scalar variables totally explicitly cleanly. Amplitudes securely incorporate Phase logic efficiently."
          },
          {
            question: "How totally successfully accurately essentially fully efficiently mathematically natively specifically explicitly do you explicitly reliably technically totally definitively flawlessly correctly cleanly perfectly natively exclusively completely transition inherently securely cleanly exactly purely absolutely accurately parsing an explicit Complex Amplitude precisely completely fundamentally actively formally effectively outputting completely purely accurately practically a correctly valid classical Observation Probability completely effectively?",
            options: ["Multiply randomly securely.", "Execute completely mathematically cleanly formulating explicitly definitively formally practically perfectly cleanly perfectly explicitly purely exactly calculating absolutely resolving the structural explicitly secure precisely mathematically purely correctly accurately successfully technically absolutely functionally Absolute Algebraic Algebraic Square exactly flawlessly purely efficiently purely cleanly correctly correctly exactly securely perfectly.", "Divide safely cleanly precisely.", "Remove cleanly utterly efficiently exactly."],
            correctIndex: 1,
            explanation: "The securely cleanly explicit mathematically fundamentally successfully fully flawlessly exact fully accurately correctly mathematically Born Formula natively effectively cleanly correctly completely rigorously commands purely calculating exactly essentially absolutely precise functional structural Exact Absolute Squares precisely identically perfectly."
          }
        ]
      }
    }
  },
  {
    id: "L3-T8",
    levelId: 3,
    name: "Multiple Qubits",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L3-T2", name: "Qubit Representation" }, { id: "L2-T6", name: "Tensor Products" }] },
      whatYouWillLearn: [
        "How multiple qubits combine to form larger mathematical systems.",
        "The exponential scaling of quantum state spaces ($2^n$).",
        "Applying tensor products to merge individual qubit states.",
        "Representing and manipulating multi-qubit computational basis states."
      ],
      introduction: "While purely securely single isolated precise purely accurately strictly accurately single correctly successfully.",
      whyItMatters: "Multi-qubit operations define the exact scaling mechanisms driving quantum computing's power.",
      keyConcepts: [
        {
          heading: "Exponential Scaling",
          description: "Adding qubits multiplies the state space exponentially."
        },
        {
          heading: "Combined Topology",
          description: "Tensor products explicitly dictate mathematical integrations."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = |\\psi_1\\rangle \\otimes |\\psi_2\\rangle $$",
      analogy: "If a single qubit is a musical note, multiple qubits form the complex symphony.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\nqc = QuantumCircuit(2)\\nqc.h(0)\\nprint('Executing multi-qubit parallel operations.')",
        cirq: "import cirq\\nqubits = cirq.LineQubit.range(2)\\nprint('Simulating multiple qubits.')"
      },
      realWorldApplications: [
        { title: "Parallel Processing", explanation: "Algorithms leverage massive superpositions explicitly." }
      ],
      commonMistakes: [
        { mistake: "Believing qubits scale linearly.", correction: "They scale exponentially." }
      ],
      summary: [
        "Multiple qubits formulate exponential topologies.",
        "They utilize tensor mathematics prominently."
      ],
      quiz: {
        topicId: "L3-T8",
        questions: [
          {
            question: "How do multi-qubit systems map math?",
            options: ["Tensor Products", "Linear Addition", "Division", "Nothing"],
            correctIndex: 0,
            explanation: "Tensor Products expand space."
          },
          {
            question: "To track 10 qubits, how many states are generated globally?",
            options: ["10", "100", "2^10 (1024)", "40"],
            correctIndex: 2,
            explanation: "Exponential scaling."
          },
          {
            question: "Can multiple qubits entangle?",
            options: ["No", "Yes", "Only in cirq", "Only on Tuesday"],
            correctIndex: 1,
            explanation: "Yes, entanglement requires multiple qubits."
          }
        ]
      }
    }
  }
];

export const LEVEL_3_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L3-T1": {
    questions: [
      {
        question: "What is a major difference between a classical bit and a qubit?",
        options: ["Qubits are larger than bits.", "Qubits can exist in superposition, representing 0 and 1 simultaneously.", "Qubits are made of wood.", "Qubits are always 1."],
        correctIndex: 1,
        explanation: "Superposition allows a qubit to hold a complex combination of both states until measured."
      }
    ]
  }
};
