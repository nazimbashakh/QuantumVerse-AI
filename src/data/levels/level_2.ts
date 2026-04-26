import { Topic, QuizQuestion } from '../types';

export const LEVEL_2_TOPICS: Topic[] = [
  {
    id: "L2-T1",
    levelId: 2,
    name: "Vectors and Vector Spaces",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T4", name: "Quantum Mechanics Basics" }] },
      whatYouWillLearn: [
        "The definition of a vector in a mathematical space.",
        "How quantum states map to vector mathematics.",
        "Basis vectors and linear independence.",
        "Vector addition and scalar multiplication."
      ],
      introduction: "At the heart of quantum computing lies linear algebra. You cannot understand quantum algorithms without understanding how to manipulate vectors in a space. In classical computer science, data structures are typically arrays, lists or trees. In quantum mechanics, the fundamental data structure is a vector inhabiting a complex mathematical space.\n\nA vector is simply a mathematical object that has 'length' and 'direction'. In quantum computing, these vectors are called 'state vectors'. When a quantum state is observed or operated upon, we are essentially performing geometric transformations on these vectors within a Vector Space. Specifically, the state of any isolated physical quantum system is represented completely by a state vector moving inside an abstract Vector Space.",
      whyItMatters: "Every single state of a qubit is a vector. Every multi-qubit system is a larger vector. If you cannot do vector addition, you cannot understand how states interfere or enter superposition.",
      keyConcepts: [
        {
          heading: "State Vectors",
          description: "A quantum state is represented mathematically by a column vector containing complex numbers. For a single qubit, this vector has two elements representing the probability amplitudes of measuring 0 or 1."
        },
        {
          heading: "Basis Vectors",
          description: "Basis vectors act as the 'axes' of the vector space. In quantum computing, the standard computational basis vectors are $|0\\rangle$ (the x-axis equivalent) and $|1\\rangle$ (the y-axis equivalent). Any qubit state can be created by a linear combination of these bases."
        },
        {
          heading: "Linear Independence",
          description: "Two vectors are linearly independent if one cannot be written as a scalar multiple of the other. Our measurement bases ($|0\\rangle$ and $|1\\rangle$) are independent and orthogonal."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} $$\\n\\nBasis vectors definition:\\n$$ |0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\quad |1\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} $$\\n\\nLinear combination (Superposition):\\n$$ |\\psi\\rangle = \\alpha \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + \\beta \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\alpha|0\\rangle + \\beta|1\\rangle $$",
      analogy: "A vector in a vector space is like an exact GPS coordinate on an empty map. The basis vectors are simply defining 'North/South' and 'East/West'. Every location (quantum state) is just a combination of moving a certain amount North and a certain amount East.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "import numpy as np\\nfrom qiskit.quantum_info import Statevector\\n\\n# Define a state vector mathematically\\n# Represents an equal superposition\\nvector = [1/np.sqrt(2), 1/np.sqrt(2)]\\nstate = Statevector(vector)\\n\\nprint('Mathematical Vector:', state.data)\\nprint('Is valid quantum state?', state.is_valid())",
        cirq: "import cirq\\nimport numpy as np\\n\\n# In Cirq, state vectors are primarily tracked in the simulator\\nsimulator = cirq.Simulator()\\nq = cirq.GridQubit(0, 0)\\ncircuit = cirq.Circuit(cirq.X(q))\\n\\n# Get the final state vector mathematically\\nresult = simulator.simulate(circuit)\\nprint('Vector Representation:', np.round(result.final_state_vector, 3))"
      },
      realWorldApplications: [
        { title: "Machine Learning (Classical & Quantum)", explanation: "State vectors are mathematically identical to tensors and arrays used in neural networks. QML replaces classical weight vectors with quantum state vectors." }
      ],
      commonMistakes: [
        { mistake: "Assuming vectors require 3D physical space.", correction: "Vector spaces in quantum mechanics are abstract mathematical spaces (Hilbert spaces) that do not map to physical spatial directions." },
        { mistake: "Treating vectors like simple lists.", correction: "A quantum state vector represents probability amplitudes; its Euclidean norm (length) MUST always be 1." }
      ],
      summary: [
        "Quantum states are mathematical vectors.",
        "They live in abstract Vector Spaces.",
        "The standard measurement states ($|0\\rangle$ and $|1\\rangle$) form the orthogonal basis vectors.",
        "All superpositions are simply linear combinations of these basis vectors.",
        "Programming a quantum computer is essentially multiplying these vectors by matrices."
      ],
      quiz: {
        topicId: "L2-T1",
        questions: [
          {
            question: "What do the basis vectors $|0\\rangle$ and $|1\\rangle$ represent mathematically?",
            options: ["Matrices", "Linearly independent column vectors representing fundamental computational states.", "Complex scalars.", "Probability distributions."],
            correctIndex: 1,
            explanation: "The basis states represent linearly independent column vectors: (1,0) and (0,1). Any other quantum state can be constructed by combining them."
          },
          {
            question: "Why must a valid quantum state vector have a length of exactly 1?",
            options: ["To fit inside the QPU.", "Because probabilities must sum to 100%.", "Because it is reversible.", "Because computers operate in binary."],
            correctIndex: 1,
            explanation: "The length (norm) of the vector dictates total probability. A physical system always exists SOMEWHERE, so total probability is precisely 1."
          },
          {
            question: "How is a superposition formed using vectors?",
            options: ["By deleting a vector.", "By multiplying two vectors together.", "By creating a linear combination of basis vectors via scalar multiplication and vector addition.", "By normalizing a matrix."],
            correctIndex: 2,
            explanation: "A superposition like $|psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ is mathematically derived strictly using linear combinations (adding scaled vectors)."
          }
        ]
      }
    }
  },
  {
    id: "L2-T2",
    levelId: 2,
    name: "Matrices and Matrix Operations",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L2-T1", name: "Vectors and Vector Spaces" }] },
      whatYouWillLearn: [
        "The definition and role of Matrices.",
        "Matrix multiplication mechanics.",
        "How quantum gates are just unitary matrices.",
        "The concept of the Identity Matrix."
      ],
      introduction: "If vectors are the 'nouns' of quantum computing (representing data states), then matrices are the 'verbs' (representing operations or gates). In classical systems, operations are logical (AND, OR, NOT). In quantum computing, every single algorithmic step is governed entirely by linear matrix transformations.\n\nA matrix is a rectangular array of complex numbers. When a quantum gate is applied to a qubit, mathematically, the system multiplies the gate's matrix by the qubit's state vector to produce a new state vector. Because these systems are reversible, quantum computing enforces a strict rule: all gate matrices must be 'Unitary.' Understanding how to manually multiply a 2x2 matrix by a 2x1 vector is the absolute baseline for understanding how quantum logic gates work at a low level.",
      whyItMatters: "You cannot design new quantum algorithms (like VQE or QAOA) without manipulating the matrices that define them. Compiling a circuit fundamentally consists of analyzing matrix multiplication.",
      keyConcepts: [
        {
          heading: "Matrix-Vector Multiplication",
          description: "When a quantum gate acts on a qubit, it is a $2 \\times 2$ matrix evaluating against a $2 \\times 1$ column vector, resulting in a transformed $2 \\times 1$ output vector."
        },
        {
          heading: "Unitary Matrices",
          description: "A matrix $U$ is unitary if multiplying it by its complex conjugate transpose yields the Identity matrix ($U^{\\dagger}U = I$). This mathematical property guarantees the gate is physically reversible and preserves vector normalization."
        },
        {
          heading: "The Identity Matrix",
          description: "The matrix equivalent of the number 1. Multiplying any vector by the Identity matrix returns the exact same vector. It is the mathematical representation of doing absolutely nothing to the qubit."
        }
      ],
      mathematics: "\\text{Matrix-Vector Multiplication:}\\n$$ \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix} $$\\n\\n\\text{Application of the Pauli-X Matrix (The Quantum NOT Gate):}\\n$$ X|0\\rangle = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 0(1)+1(0) \\\\ 1(1)+0(0) \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = |1\\rangle $$",
      analogy: "If a vector is a coordinate on a graph, a matrix is the instruction manual for how to move that coordinate. 'Rotate 90 degrees left' or 'Flip across the Y axis' are instructions written purely in matrix form.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Operator\\nimport numpy as np\\n\\n# Defining a Quantum Gate Matrix (Pauli-X)\\nx_matrix = np.array([[0, 1], [1, 0]])\\n\\n# Create Qiskit Operator\\nquantum_gate = Operator(x_matrix)\\n\\n# Verify if the matrix is unitary (valid for QC)\\nprint('Is the matrix Unitary?', quantum_gate.is_unitary())",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Cirq allows direct inspection of the unitary matrices underlying its gates\\ngate = cirq.H\\nmatrix = cirq.unitary(gate)\\nprint('The Mathematical Matrix for the Hadamard Gate is:\\n', np.round(matrix, 3))"
      },
      realWorldApplications: [
        { title: "Computer Graphics", explanation: "The exact same matrix math used to rotate 3D models in video games is used to rotate the complex state vectors of a qubit on the Bloch sphere." },
        { title: "Quantum Compilation", explanation: "Quantum compilers like TKET or Qiskit Transpiler optimize code by multiplying sequential gate matrices together into a single master matrix, reducing hardware noise." }
      ],
      commonMistakes: [
        { mistake: "Assuming matrix multiplication is commutative.", correction: "In algebra, $A \\times B = B \\times A$. In matrix math, $AB \\neq BA$. The order of quantum gates radically changes the output." },
        { mistake: "Believing non-reversible operations can be matrices.", correction: "They can be, but they are physically invalid as quantum gates. All quantum gates MUST be unitary matrices." }
      ],
      summary: [
        "Matrices represent quantum gates.",
        "Applying a gate means executing matrix-vector multiplication.",
        "Matrix multiplication is strictly non-commutative (Order matters).",
        "Quantum hardware requires all matrices to be Unitary (reversible).",
        "The Identity matrix represents preserving the state flawlessly."
      ],
      quiz: {
        topicId: "L2-T2",
        questions: [
          {
            question: "Mathematically, what happens when you apply a quantum gate to a qubit?",
            options: ["The vector is divided by the matrix.", "You add the matrix to the vector.", "You perform matrix-vector multiplication.", "You collapse the wave function."],
            correctIndex: 2,
            explanation: "Gate execution is mathematically defined purely as the multiplication of a unitary matrix against a state vector."
          },
          {
            question: "Why does the order of quantum gates matter in a circuit?",
            options: ["Because matrix multiplication is non-commutative ($AB \\neq BA$).", "Because hardware overheats.", "Because vectors expire over time.", "Because the Born rule demands order."],
            correctIndex: 0,
            explanation: "In linear algebra, changing the order of matrix multiplication changes the final matrix. Therefore, applying Gate A then Gate B is completely different from Gate B then Gate A."
          },
          {
            question: "What is the defining requirement for a matrix to act as a valid quantum logic gate?",
            options: ["It must be full of real numbers.", "It must be unitary ($U^{\\dagger}U = I$).", "It must be a diagonal matrix.", "It must equal zero."],
            correctIndex: 1,
            explanation: "Quantum mechanics dictates that physical system evolution must preserve probability (norm-preserving) and be reversible, which is only mathematically true for Unitary matrices."
          }
        ]
      }
    }
  },
  {
    id: "L2-T3",
    levelId: 2,
    name: "Complex Numbers in Quantum",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T7", name: "Quantum vs Classical Bits" }] },
      whatYouWillLearn: [
        "Why complex numbers are required in quantum mechanics.",
        "The concept of $i$ (the imaginary unit).",
        "How a complex plane dictates amplitude and phase.",
        "Complex conjugates and magnitude squaring."
      ],
      introduction: "If you only use real numbers (like $0.5$ or -$0.8$), you can describe classical probability and standard classical mechanics perfectly. However, the universe at the quantum scale explicitly operates using Complex Numbers. A complex number combines a real number with an imaginary number (rooted in $i = \\sqrt{-1}$).\\n\\nEvery probability amplitude in a state vector is actually a complex number. Why? Because waves have both a size (amplitude) and a position in their cycle (phase). A real number can only hold amplitude. A complex number intrinsically encodes both amplitude and phase in a 2D plane. Without complex numbers, destructive interference—the engine of quantum algorithms—would be mathematically impossible to express.",
      whyItMatters: "When programming quantum algorithms (like Grover's), manipulating the 'phase' of the complex number allows you to make probabilities negative, forcing them to cancel out (interfere) with other probabilities. Understanding the difference between $|0\\rangle + |1\\rangle$ and $|0\\rangle + i|1\\rangle$ is absolutely foundational.",
      keyConcepts: [
        {
          heading: "The Imaginary Unit ($i$)",
          description: "$i$ is defined as the square root of -1. A complex number takes the standard form $z = a + bi$, where $a$ is the real part and $b$ is the imaginary part."
        },
        {
          heading: "Polar Representation",
          description: "Complex numbers are often better represented in polar coordinates for quantum mechanics: $z = re^{i\\theta}$. Here, $r$ defines the actual probability amplitude magnitude, and $\\theta$ defines the phase."
        },
        {
          heading: "Complex Conjugate",
          description: "To find the conjugate of a complex number ($z^*$), you flip the sign of the imaginary part ($a - bi$). Multiplying a complex number by its conjugate gives you a real number representing the exact physical probability measurement."
        }
      ],
      mathematics: "$$ i = \\sqrt{-1} $$\\n\\n\\text{Complex Number: } z = a + bi = re^{i\\theta} $$\\n\\n\\text{Probability Calculation (Born Rule requires complex absolute square):}\\n$$ P = |z|^2 = z \\cdot z^* = (a + bi)(a - bi) = a^2 + b^2 $$",
      analogy: "A real number is a distance on a highway (magnitude). A complex number is a distance on a highway AND the direction your steering wheel is turned (phase). You cannot describe orbital paths or wave cycles without both.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\nimport numpy as np\\n\\n# The complex number 'i' is represented as '1j' in Python\\nstate = Statevector([1/np.sqrt(2), 1j/np.sqrt(2)])\\n\\nprint('State amplitudes with complex phase:', state.data)\\nprint('Measure probabilities (which yield simple real numbers):', state.probabilities())",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Modifying the phase of a quantum state using the T gate\\n# The T gate applies an imaginary phase of e^(i pi / 4)\\nq = cirq.GridQubit(0,0)\\ncircuit = cirq.Circuit(cirq.H(q), cirq.T(q))\\n\\n# Analyzing the complex output\\nsim = cirq.Simulator()\\nresult = sim.simulate(circuit)\\nprint('Complex State Vector:\\n', np.round(result.final_state_vector, 3))"
      },
      realWorldApplications: [
        { title: "Electrical Engineering", explanation: "Alternating Current (AC) circuits are modeled entirely using the same complex number formulas to evaluate impedance and voltage phase shifts." }
      ],
      commonMistakes: [
        { mistake: "Thinking imaginary numbers aren't 'real' physics.", correction: "Despite the terrible historical naming, imaginary numbers are physically observable in quantum systems and electromagnetic wave phases." },
        { mistake: "Squaring without the complex conjugate.", correction: "Squaring a complex number like you square a real number yields an imaginary result. You MUST multiply by the complex conjugate to get a real probability." }
      ],
      summary: [
        "Quantum mechanics innately requires Complex Numbers ($a+bi$).",
        "They encode both probability amplitude (size) and interference relative Phase (angle).",
        "The imaginary unit $i$ is defined as the square root of -1.",
        "Measurements always yield Real numbers because we multiply by the complex conjugate.",
        "Phase allows the mathematical mechanism of destructive interference."
      ],
      quiz: {
        topicId: "L2-T3",
        questions: [
          {
            question: "Why are complex numbers necessary for quantum state vectors?",
            options: ["To make the physics harder.", "They allow the mathematical expression of both magnitude (probability) and wave-like Phase.", "They prevent hacking.", "Only complex numbers can be squared."],
            correctIndex: 1,
            explanation: "Complex numbers provide a two-dimensional mathematical field (a plane) that naturally maps to the amplitude and phase of subatomic waves."
          },
          {
            question: "How do you calculate the actual physical probability from a complex amplitude $z = a + bi$?",
            options: ["Square the real part.", "Drop the imaginary part.", "Multiply it by its complex conjugate: $z \\cdot z^* = a^2 + b^2$.", "Divide by $i$."],
            correctIndex: 2,
            explanation: "The Born Rule requires taking the absolute square, which mathematically means multiplying the complex number by its complex conjugate to yield a real-numbered probability."
          },
          {
            question: "What does the $e^{i\\theta}$ term represent in polar notation?",
            options: ["The probability to measure 1.", "The relative phase of the wave.", "The decoherence limit.", "The temperature of the qubit."],
            correctIndex: 1,
            explanation: "In polar representation ($re^{i\\theta}$), $r$ calculates probability magnitude whereas $e^{i\\theta}$ sets the phase angle for wave interference."
          }
        ]
      }
    }
  },
  {
    id: "L2-T4",
    levelId: 2,
    name: "Inner Products and Norms",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T2", name: "Matrices and Matrix Operations" }] },
      whatYouWillLearn: [
        "What an inner product (dot product) is in Hilbert space.",
        "How to calculate the Euclidean Norm (length) of a vector.",
        "The concept of vector orthogonality.",
        "How the inner product computes transition probabilities."
      ],
      introduction: "In classical geometry, if you want to know how closely aligned two arrows are, you calculate their dot product. In quantum algebraic geometry (Hilbert Space), we use the complex equivalent: the Inner Product.\n\nAn Inner Product takes two state vectors and compresses them into a single complex scalar. This single number tells you the relationship between the two vectors. If the inner product is 0, the two quantum states are perfectly distinct ('Orthogonal'). If the inner product is 1, they are the exact same state. Furthermore, the inner product is the mathematical mechanism used to calculate the 'Norm' (the geometric length) of the vector, which quantum mechanics strictly demands must always equal 1.",
      whyItMatters: "Every time you want to evaluate the probability of a quantum algorithm transitioning from state $|\\psi\\rangle$ to state $|\\phi\\rangle$, you calculate the square of their inner product. It is the core prediction engine of quantum mathematics.",
      keyConcepts: [
        {
          heading: "The Conjugate Transpose",
          description: "Because our vectors use complex numbers, computing an inner product requires taking the conjugate transpose of the first vector (flipping it to a row vector and flipping the signs of its complex numbers)."
        },
        {
          heading: "The Norm",
          description: "The Norm is the inner product of a vector with itself, essentially measuring its exact geometrical length. For quantum physics to have valid probabilities, this norm must equal exactly 1."
        },
        {
          heading: "Orthogonality",
          description: "If two quantum states have an inner product of precisely zero, they share absolutely zero overlap. They are perfectly distinguishable upon measurement (like $|0\\rangle$ and $|1\\rangle$)."
        }
      ],
      mathematics: "\\text{Conjugate Transpose Representation:}\\n$$ |\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} \\implies \\langle\\psi| = \\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix} $$\\n\\n\\text{Inner Product Calculation:}\\n$$ \\langle \\phi | \\psi \\rangle = \\phi_1^* \\psi_1 + \\phi_2^* \\psi_2 $$\\n\\n\\text{Vector Norm (Must Equal 1):}\\n$$ ||\\psi|| = \\sqrt{\\langle\\psi|\\psi\\rangle} = \\sqrt{|\\alpha|^2 + |\\beta|^2} = 1 $$",
      analogy: "An inner product is like asking a detective 'How similar are these two suspect profiles?'. A score of 1 means it's the same suspect. A score of 0 means they have entirely different alibis (Orthogonal).",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\nimport numpy as np\\n\\n# Define two basis states\\nstate0 = Statevector([1, 0])\\nstate1 = Statevector([0, 1])\\n\\n# Calculate Inner Product\\n# We expect 0 because |0> and |1> are orthogonal.\\ninner_prod = state0.inner(state1)\\nprint('Inner Product of |0> and |1>:', inner_prod)",
        cirq: "import numpy as np\\n\\n# Classical implementation of absolute norm tracking\\nvector = np.array([1/np.sqrt(2), 1j/np.sqrt(2)])\\n\\n# Calculating the Norm manually (Inner product of vector with itself)\\nnorm = np.sqrt(np.vdot(vector, vector))\\nprint('The strict magnitude (Norm) of the quantum state is:', np.round(np.real(norm), 3))"
      },
      realWorldApplications: [
        { title: "Machine Learning (Cosine Similarity)", explanation: "The exact math of inner products is how search engines and LLM embeddings determine if two words or images are similar." }
      ],
      commonMistakes: [
        { mistake: "Forgetting the complex conjugate.", correction: "In standard vector math, dot product is commutative $A \\cdot B = B \\cdot A$. In complex Hilbert space, due to conjugation, $\\langle \\phi|\\psi \\rangle = \\langle \\psi|\\phi \\rangle^*$. You must conjugate!" }
      ],
      summary: [
        "The Inner Product measures the overlap between two quantum states.",
        "It requires applying a conjugate transpose to the first vector.",
        "If the inner product is 0, the states are orthogonal (perfectly distinguishable).",
        "The Norm (length) is calculated by the square root of the inner product with itself.",
        "Valid quantum states strictly enforce a mathematical Norm of 1."
      ],
      quiz: {
        topicId: "L2-T4",
        questions: [
          {
            question: "What does it mathematically mean if the inner product of two states is 0?",
            options: ["The states are identically matched.", "The states are completely invalid.", "The states are orthogonal and perfectly distinguishable.", "The system collapsed."],
            correctIndex: 2,
            explanation: "An inner product of 0 implies zero overlap (orthogonality), meaning the two states are distinctly measurable from each other, like $|0\\rangle$ and $|1\\rangle$."
          },
          {
            question: "Why must you take the 'conjugate transpose' for quantum inner products?",
            options: ["To conform to classical binary.", "Because vectors are real numbers.", "Because quantum vectors involve complex numbers, and conjugation ensures real, positive output norms.", "To randomize the phase."],
            correctIndex: 2,
            explanation: "Without complex conjugation, the inner product of a complex vector with itself could yield a negative or imaginary number, breaking probability equations."
          },
          {
            question: "What must the Norm of isolated quantum probability vectors always equal?",
            options: ["0", "1", "Infinity", "$\pi$"],
            correctIndex: 1,
            explanation: "The norm represents the geometric length and maps to total physical probability. The sum of all probabilities must equal 100%, or 1."
          }
        ]
      }
    }
  },
  {
    id: "L2-T5",
    levelId: 2,
    name: "Eigenvalues and Eigenvectors",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L2-T2", name: "Matrices and Matrix Operations" }] },
      whatYouWillLearn: [
        "The definition of Eigenvectors and Eigenvalues.",
        "Their importance in defining observable measurements.",
        "How the Schrödinger Equation is essentially an eigenvalue problem.",
        "Determinants and matrix diagonalization."
      ],
      introduction: "Usually, when you multiply a matrix by a vector, the vector changes both in length and changes direction (it gets knocked off its axis). However, for every square matrix, there exists a specific set of 'special' vectors that, when multiplied by the matrix, do NOT change direction. They only stretch or shrink. \\n\\nThese special vectors are called **Eigenvectors** ('Eigen' meaning 'inherent' or 'characteristic' in German). The amount they stretch or shrink is the **Eigenvalue**.\\n\\nIn quantum computing, this isn't just an abstract math puzzle. When we 'measure' a quantum state for an observable (like Energy or Spin), the matrix representing that measurement will FORCE the system to collapse perfectly into one of its Eigenvectors. The physical value read on the computer screen will be exactly the corresponding Eigenvalue.",
      whyItMatters: "Quantum measurement physics is strictly governed by Eigen geometry. Algorithms like the Quantum Phase Estimation (QPE) are specifically designed to calculate Eigenvalues, leading directly to Shor's integer factorization algorithm.",
      keyConcepts: [
        {
          heading: "The Eigen Equation",
          description: "Mathematically, the relationship is $A|v\\rangle = \\lambda|v\\rangle$, where $A$ is the matrix, $|v\\rangle$ is the eigenvector, and $\\lambda$ is the scalar eigenvalue."
        },
        {
          heading: "Measurement Collapse",
          description: "When you observe a superposition, the quantum system must resolve to an eigenstate of the measurement matrix (observable). The classical bit you record is tied to its eigenvalue."
        },
        {
          heading: "Hermitian Matrices",
          description: "In QC, all observables must be Hermitian matrices (matrices equal to their own conjugate transpose). Why? Because Hermitian matrices mathematically guarantee that all their eigenvalues are Real Numbers, and you can only physically measure real values."
        }
      ],
      mathematics: "\\text{The core Eigen equation:}\\n$$ A |v\\rangle = \\lambda |v\\rangle $$\\n\\text{For the Pauli-Z matrix:}\\n$$ Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} $$\\n\\text{The standard basis vectors are its eigenvectors:}\\n$$ Z|0\\rangle = 1|0\\rangle \\quad (\\lambda = 1) $$\\n$$ Z|1\\rangle = -1|1\\rangle \\quad (\\lambda = -1) $$",
      analogy: "Imagine an inflatable rubber sheet with an arrow drawn on it. If you stretch the sheet diagonally, most arrows twist to point in a new direction. But an arrow drawn directly along the path of the stretch only gets longer, it doesn't change direction. That arrow is an Eigenvector.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "import numpy as np\\nfrom qiskit.quantum_info import Pauli\\n\\n# The Pauli Z matrix\\nz_matrix = Pauli('Z').to_matrix()\\n\\n# The numpy library calculates eigen geometry natively\\neigenvalues, eigenvectors = np.linalg.eig(z_matrix)\\n\\nprint('Eigenvalues of Z:', eigenvalues)\\nprint('Eigenvectors of Z:\\n', eigenvectors)",
        cirq: "import cirq\\nimport numpy as np\\n\\n# Cirq has specific tools for phase estimation (finding eigenvalues)\\n# The Pauli-X gate has eigenvalues of +1 and -1\\nx_mat = cirq.unitary(cirq.X)\\nvals, vecs = np.linalg.eig(x_mat)\\n\\nprint('Eigenvalues of Pauli X:', np.round(vals))"
      },
      realWorldApplications: [
        { title: "Quantum Chemistry", explanation: "Finding the ground-state energy of a molecule is exactly equivalent to finding the lowest Eigenvalue of its Hamiltonian matrix. VQE algorithms are built entirely for this." }
      ],
      commonMistakes: [
        { mistake: "Assuming any vector can be an eigenvector.", correction: "Eigenvectors are unique to their specific matrices. A matrix like Pauli X generally has only 2 defined eigenvectors." },
        { mistake: "Believing eigenvalues can be complex numbers in measurement.", correction: "While state amplitudes are complex, observable eigenvalues MUST be real numbers (since they translate to physical readouts)." }
      ],
      summary: [
        "Eigenvectors do not change direction when multiplied by a matrix.",
        "Eigenvalues describe how much the eigenvector scales.",
        "Measurement functionally collapses the qubit into an Eigenstate of the measurement operator.",
        "Hermitian matrices guarantee real-numbered Eigenvalues for physical measurement.",
        "Phase Estimation algorithms leverage this math for computational advantage."
      ],
      quiz: {
        topicId: "L2-T5",
        questions: [
          {
            question: "What defines an Eigenvector under mathematical transformation?",
            options: ["It collapses to zero.", "It changes its phase radically.", "It only scales in magnitude without changing direction in vector space.", "It becomes orthogonal to itself."],
            correctIndex: 2,
            explanation: "The defining characteristic equation $Ax = \\lambda x$ shows that the vector $x$ outputs exactly its original direction, merely scaled by the number $\\lambda$."
          },
          {
            question: "Why do quantum observables have to be Hermitian matrices?",
            options: ["To save simulation memory.", "Because they guarantee that their Eigenvalues are Real numbers, which is mandatory for physical, readable measurements.", "To prevent negative probabilities.", "To ensure the matrix is diagonal."],
            correctIndex: 1,
            explanation: "You cannot physically measure an 'imaginary' voltage or distance. Hermitian matrices inherently possess exclusively real-numbered eigenvalues."
          },
          {
            question: "When applying the Pauli Z measurement to a qubit, what states represent the eigenvectors?",
            options: ["$|+\\rangle$ and $|-\\rangle$", "$|0\\rangle$ and $|1\\rangle$", "$|i\\rangle$ and $|-i\\rangle$", "Identity"],
            correctIndex: 1,
            explanation: "The computational basis states $|0\\rangle$ and $|1\\rangle$ natively return eigenvalues of 1 and -1 when operated on by the Z matrix."
          }
        ]
      }
    }
  },
  {
    id: "L2-T6",
    levelId: 2,
    name: "Tensor Products",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T2", name: "Matrices and Matrix Operations" }] },
      whatYouWillLearn: [
        "How multiple qubits form a joint state space.",
        "The Kronecker Product (Tensor Product).",
        "The mathematical root of exponential state space growth ($2^n$).",
        "Writing multidimensional gates."
      ],
      introduction: "Thus far, math concepts have mostly focused on single isolated qubits. However, a quantum computer with one qubit is useless. To model systems containing 2, 3, or 50 qubits, we require a mathematical operation that joins disparate vector spaces into one massive, combined space. Because standard matrix multiplication does not achieve this, we use the Tensor Product (often represented operationally as the Kronecker Product).\\n\\nIf Qubit A is a $2 \\times 1$ vector, and Qubit B is a $2 \\times 1$ vector, their Tensor Product merges them into a $4 \\times 1$ combined state vector representing all combinations ($00, 01, 10, 11$). Applying it to matrices works the same: combining single qubit gates into multi-qubit parallel operations creates massive algorithmic matrices. The Tensor Product is the exact mathematical proof for why quantum memory scales exponentially.",
      whyItMatters: "Without tensor products, a multi-qubit system would just be linear additions. Because tensor products multiply tensor dimensions, adding 10 qubits expands the vector size to $2^{10}$ (1,024). This is the source of the quantum capacity explosion.",
      keyConcepts: [
        {
          heading: "The Kronecker Calculation",
          description: "To take the tensor product of two vectors, you systematically multiply every element of the first vector by every element of the second vector, generating a new exponentially larger entity."
        },
        {
          heading: "Combined State Mapping",
          description: "When applying logic like 'Hadamard on Qubit 0 AND Identity on Qubit 1', you calculate the tensor product of the H matrix and the I matrix, producing a $4 \\times 4$ system matrix."
        },
        {
          heading: "Factorizability",
          description: "If a massive $4 \\times 1$ combined vector can be factored back down cleanly into two separate $2 \\times 1$ vectors, it is unentangled. If the math refuses to factor nicely, the tensor product has formed an Entangled State."
        }
      ],
      mathematics: "\\text{Vector Tensor Product:} \\n$$ \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} \\otimes \\begin{pmatrix} y_1 \\\\ y_2 \\end{pmatrix} = \\begin{pmatrix} x_1 y_1 \\\\ x_1 y_2 \\\\ x_2 y_1 \\\\ x_2 y_2 \\end{pmatrix} $$\\n\\text{Example: Creating state } |01\\rangle:\\n$$ |0\\rangle \\otimes |1\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\otimes \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix} $$",
      analogy: "If standard multiplication is finding the area of a square, a tensor product is constructing a multidimensional hypercube. Every new piece of data forces the entire geometry to expand into entirely new dimensions of complexity.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\n\\n# 1. Define two single qubits\\nqubit_A = Statevector.from_label('0')\\nqubit_B = Statevector.from_label('1')\\n\\n# 2. Tensor them together geometrically\\nsystem_AB = qubit_A.tensor(qubit_B)\\n\\nprint('Joined State Vector Size:', len(system_AB.data))\\nprint('Combined Array:', system_AB.data)",
        cirq: "import numpy as np\\n\\n# Demonstrating the Kronecker product natively in Python logic\\nvector_0 = np.array([1, 0])\\nvector_1 = np.array([0, 1])\\n\\n# The tensor product merges them exponentially\\njoint_system = np.kron(vector_0, vector_1)\\nprint('4D Combined State Vector:', joint_system)"
      },
      realWorldApplications: [
        { title: "Simulated Chemistry", explanation: "Simulating a carbon atom requires taking the tensor product of the wave functions of all its electrons, rapidly demonstrating why classical memory crashes on molecular simulation." }
      ],
      commonMistakes: [
        { mistake: "Confusing matrix multiplication with tensor products.", correction: "In standard matrix multiplication, a 2x2 times a 2x2 stays a 2x2. A tensor product of a 2x2 and a 2x2 expands into a massive 4x4 matrix." }
      ],
      summary: [
        "Tensor products combine separate quantum identities into one joint mathematical space.",
        "The resulting vectors scale exponentially as $2^n$.",
        "It applies to both Vectors (state combinations) and Matrices (gate combinations).",
        "States that cannot be reverse-factored apart are flagged as Entangled.",
        "It is the driving mathematical reason why quantum simulation crushes conventional servers."
      ],
      quiz: {
        topicId: "L2-T6",
        questions: [
          {
            question: "How many elements does the state vector of a 3-qubit system possess, resulting from tensor products?",
            options: ["3 elements", "6 elements", "8 elements ($2^3$)", "9 elements"],
            correctIndex: 2,
            explanation: "Because tensor products multiply dimensions, merging three $2 \\times 1$ vectors yields a massive $8 \\times 1$ vector."
          },
          {
            question: "What physical computational property does the tensor product mathematically prove?",
            options: ["The stability of measurement.", "Error correction fidelity.", "Exponential scaling of the multi-qubit state space.", "Energy loss in gates."],
            correctIndex: 2,
            explanation: "The tensor math explicitly demonstrates that adding linear hardware components expands computational state capability exponentially."
          },
          {
            question: "If a joint multiparticle tensor vector cannot be algebraically separated back into individual vectors, what does that indicate?",
            options: ["A math error occurred.", "The state is currently Entangled.", "The qubits are in ground states.", "The measurement failed."],
            correctIndex: 1,
            explanation: "Inseparability of the tensor product polynomial is the exact, formal mathematical definition of Quantum Entanglement."
          }
        ]
      }
    }
  },
  {
    id: "L2-T7",
    levelId: 2,
    name: "Dirac Notation",
    type: "math",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L2-T4", name: "Inner Products and Norms" }] },
      whatYouWillLearn: [
        "The Ket $|\\psi\\rangle$ representing column vectors.",
        "The Bra $\\langle\\psi|$ representing conjugate row vectors.",
        "The Bra-Ket $\\langle \\phi | \\psi \\rangle$ representing inner products.",
        "Why this typography replaced traditional linear algebra."
      ],
      introduction: "In 1939, physicist Paul Dirac formalized a notation system that allowed scientists to express massive, complex algebraic quantum operations compactly and legibly. This notation is so ubiquitous today that essentially all quantum computing text, SDK code comments, and physics research are authored in it. It is known as Bra-Ket notation.\n\nTraditional linear algebra notation requires drawing out bulky brackets and grids of numbers for column and row vectors. Dirac condensed this mapping. A column vector (a quantum state) is wrapped in an angle-bracket: $|\\psi\\rangle$, forming a 'Ket'. The conjugate row vector is mirrored: $\\langle\\psi|$, forming a 'Bra'. When brought together, they formulate a 'Bracket' $\\langle \\phi | \\psi \\rangle$, calculating the inner product immediately.",
      whyItMatters: "If you read IBM Qiskit documentation or a paper on QAOA, you will see $|00\\rangle - |11\\rangle$. If you don't fluently read Dirac notation, you cannot read quantum computational equations.",
      keyConcepts: [
        {
          heading: "The Ket $|\\cdot\\rangle$",
          description: "Represents a physical state. $|0\\rangle$ is shorthand for the basis column vector $(1, 0)^{T}$."
        },
        {
          heading: "The Bra $\\langle\\cdot|$",
          description: "Represents the complex conjugate transpose mappings. $\\langle 1|$ is the row vector $(0, 1)$."
        },
        {
          heading: "The Bra-Ket (Inner Product)",
          description: "Combining them as $\\langle 0 | 0 \\rangle$ yields 1, acting natively as the mathematical inner product."
        },
        {
          heading: "The Ket-Bra (Outer Product)",
          description: "Combining them outwards as $|0\\rangle\\langle 0|$ creates a density matrix acting as a topological projection operator."
        }
      ],
      mathematics: "\\text{Ket (Column vector):}\\n$$ |\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} $$\\n\\text{Bra (Conjugate Row vector):}\\n$$ \\langle\\psi| = \\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix} $$\\n\\text{Bra-Ket (Scalar Inner Product):}\\n$$ \\langle \\phi|\\psi \\rangle = \\alpha_{\\phi}^* \\alpha_{\\psi} + \\beta_{\\phi}^* \\beta_{\\psi} $$",
      analogy: "Dirac notation is like mathematical stenography or shorthand. Writing out the full $8 \\times 8$ identity grid equations takes pages of paper; Dirac notation compresses it into a clean, syntactic sentence ($|\\psi\\rangle \\langle\\psi|$).",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "from qiskit.quantum_info import Statevector\\n\\n# The Qiskit Statevector API natively understands Dirac string inputs\\n# Generating the Ket: |101>\nstate_ket = Statevector.from_label('101')\\n\\nprint('Ket mathematical extraction:', state_ket.data)",
        cirq: "import cirq\\n\\n# Printing out a default Cirq dirac state representation\\nq0 = cirq.LineQubit(0)\\ncircuit = cirq.Circuit(cirq.X(q0))\\nresult = cirq.Simulator().simulate(circuit)\\n\\n# The console output natively defaults to Dirac strings.\\nprint(result.dirac_notation())"
      },
      realWorldApplications: [
        { title: "Academic Computation", explanation: "Because algorithms possess huge parallel vector states, Dirac notation ensures cryptographic and informational papers remain publishable and communicable." }
      ],
      commonMistakes: [
        { mistake: "Reading $|0\\rangle$ as 'The number zero'.", correction: "It is NOT the scalar value 0. It is a full physical object representing the column vector $(1, 0)^{T}$. The scalar $0$ would collapse the vector entirely." },
        { mistake: "Confusing Inner and Outer products.", correction: "$\\langle Bra | Ket \\rangle$ yields a single number. $| Ket \\rangle \\langle Bra |$ yields a massive full matrix." }
      ],
      summary: [
        "Dirac introduced Bra-Ket notation to streamline dense quantum algebra.",
        "Kets ($|\\psi\\rangle$) signify column vectors for states.",
        "Bras ($\\langle\\psi|$) signify row vectors for mathematical conjugates.",
        "Combining them inwards constructs the Inner Product scalar.",
        "It is universally utilized across all QC frameworks and academic papers."
      ],
      quiz: {
        topicId: "L2-T7",
        questions: [
          {
            question: "What does the symbol $|1\\rangle$ literally translate to in matrix algebra?",
            options: ["The scalar number 1.", "A 2D matrix.", "A column vector $\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$.", "A row vector $\\begin{pmatrix} 1 & 0 \\end{pmatrix}$."],
            correctIndex: 2,
            explanation: "The Ket $|1\\rangle$ is shorthand strictly defining the primary independent column vector occupying the second basis position."
          },
          {
            question: "What mathematical operation does the syntax $\\langle \\phi | \\psi \\rangle$ perform?",
            options: ["The Outer Product (producing a matrix).", "The Inner Product (producing a scalar probability number).", "Tensor Products.", "Matrix Inversion."],
            correctIndex: 1,
            explanation: "The Bra-Ket configuration multiplies a row vector against a column vector, mathematically serving as the inner product."
          },
          {
            question: "Why do we use Dirac Notation instead of standard mathematical array graphics?",
            options: ["It runs faster on CPUs.", "It provides massive visual simplification for scaling dimensional logic.", "It is required to load Qiskit modules.", "Einstein mandated it."],
            correctIndex: 1,
            explanation: "When dealing with multi-qubit states, writing out massive $32 \\times 32$ matrices is impossible. Dirac notation maintains theoretical readability."
          }
        ]
      }
    }
  },
  {
    id: "L2-T8",
    levelId: 2,
    name: "Hilbert Spaces",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T4", name: "Inner Products and Norms" }, { id: "L2-T6", name: "Tensor Products" }] },
      whatYouWillLearn: [
        "The formalized definition of a Hilbert Space.",
        "Why quantum state vectors only reside in this specific mathematical topology.",
        "Completeness and inner product limitations.",
        "How it aggregates all Level 2 mathematical primitives."
      ],
      introduction: "Thus far, we have covered all the fundamental mathematical tools of quantum computing: complex numbers, vectors, matrices, inner products, and tensor expansions. The final mathematical capstone is recognizing the specific geographic 'universe' these elements live inside. It is called a Hilbert Space.\n\nNamed after David Hilbert, a Hilbert Space is an abstract vector space possessing an inner product that allows length and angle to be strictly measured. Furthermore, it possesses the property of being geometrically 'complete'—meaning there are no mathematical gaps or missing limit points within the space. Postulate 1 of quantum mechanics decrees formally that for any isolated physical subatomic system, its possible states are fundamentally mapped as unit vectors within a complex Hilbert Space.",
      whyItMatters: "If vectors existed in random non-Hilbert spaces, the calculation of angles (probability geometry) would be mathematically impossible or unstable. The Hilbert Space guarantees that no matter how complex the algorithms get, calculation logic holds together perfectly.",
      keyConcepts: [
        {
          heading: "The Complex Vector Field",
          description: "A Hilbert space for quantum applications must be based on a field of complex numbers (allowing continuous phase modifications)."
        },
        {
          heading: "Inner Product Topology",
          description: "A Hilbert space must possess a defined inner product topology, ensuring the ability to calculate normalization lengths directly (Born Rule viability)."
        },
        {
          heading: "Dimensionality Structure",
          description: "While computational algorithms occupy finite-dimensional Hilbert Spaces (e.g., a 2-qubit system lives in a $4D$ Hilbert space $\\mathbb{C}^4$), native quantum physics problems (like modeling free electrons) can require infinite-dimensional Hilbert spaces."
        }
      ],
      mathematics: "\\text{The fundamental framework definition:}\\n\\mathcal{H} \\cong \\mathbb{C}^{2^n} \\n\\text{For an } n\\text{-qubit processor, the computational space is precisely equal to an } 2^n \\text{-dimensional complex Hilbert Space.}",
      analogy: "If classic Euclidian geometry (x, y, z graphs) is the playground where physics like gravity and trajectory live, Hilbert space is the invisible, multi-dimensional geometric playground where probability waves and subatomic mechanics live.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\\nimport numpy as np\\n\\n# The circuit operates across a finite-dimensional Hilbert Space.\\n# A 4-qubit circuit creates a 2^4 = 16-Dimensional Hilbert space.\\nqc = QuantumCircuit(4)\\n\\ndimension = 2 ** qc.num_qubits\\nprint(f'This algorithm runs entirely inside a {dimension}-Dimensional Complex Hilbert Space.')",
        cirq: "import cirq\\n\\n# As you add more qubits, the underlying Hilbert space expands exponentially via Tensor merging.\\nqubits = [cirq.GridQubit(0, i) for i in range(5)]\\nhilbert_dim = 2 ** len(qubits)\\nprint(f'Constructing topological space of dim: {hilbert_dim}')"
      },
      realWorldApplications: [
        { title: "Functional Analysis", explanation: "Hilbert spaces form the backbone of functional analysis used in partial differential equations addressing acoustic flow and heat gradients." }
      ],
      commonMistakes: [
        { mistake: "Believing a Hilbert space is a physical location.", correction: "You cannot travel to or 'see' a Hilbert space. It is a strictly mathematical abstraction utilized to organize operational physics logic." }
      ],
      summary: [
        "A Hilbert Space is an abstract mathematical concept merging vector geography with inner products.",
        "It acts as the strict topological boundaries for quantum probability physics.",
        "It is fundamentally required to be defined over Complex numbers in quantum mechanics.",
        "Finite Hilbert spaces ($\\mathbb{C}^{2^n}$) house the state operations of QC circuits.",
        "Its structure formally secures the mathematics making quantum physics computable."
      ],
      quiz: {
        topicId: "L2-T8",
        questions: [
          {
            question: "Why is a Hilbert space preferred over standard Euclidean vector spaces in quantum computing?",
            options: ["It requires less GPU memory.", "It inherently supports an inner product mapped over Complex numbers allowing probability phases and completeness.", "It was patented by IBM.", "It removes matrix math requirements."],
            correctIndex: 1,
            explanation: "Hilbert spaces mandate inner products yielding complete topologies over complex fields—mathematical traits perfectly suited to modeling probability amplitudes and phases."
          },
          {
            question: "How many dimensions reside in the Hilbert space spanning an algorithm running on 5 Qubits?",
            options: ["5", "10", "25", "32"],
            correctIndex: 3,
            explanation: "The Hilbert space dimensions explicitly dictate computational scale limits ($2^n$). $2^5$ equals an abstract 32-dimensional complex geometrical space."
          },
          {
            question: "Is the mathematical construct of the Hilbert space unique exclusively to quantum computing?",
            options: ["Yes, it was uniquely invented for algorithms.", "No, it is a broad mathematical topology used in various forms of functional analysis and physics.", "Yes, David Hilbert programmed the first quantum chip.", "No, it is used strictly for classical binary logic memory."],
            correctIndex: 1,
            explanation: "Hilbert formalized this geometric logic far before quantum processors evolved, establishing it widely in functional mathematical analysis relating to differential equations."
          }
        ]
      }
    }
  }
];

export const LEVEL_2_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L2-T1": {
    questions: [
      {
        question: "What do the basis vectors |0> and |1> represent mathematically?",
        options: ["Matrices", "Linearly independent column vectors representing fundamental computational states.", "Complex scalars.", "Probability distributions."],
        correctIndex: 1,
        explanation: "The basis states represent linearly independent column vectors: (1,0) and (0,1). Any other quantum state can be constructed by combining them."
      }
    ]
  },
  "L2-T2": {
    questions: [
      {
        question: "Mathematically, what happens when you apply a quantum gate to a qubit?",
        options: ["The vector is divided by the matrix.", "You add the matrix to the vector.", "You perform matrix-vector multiplication.", "You collapse the wave function."],
        correctIndex: 2,
        explanation: "Gate execution is mathematically defined purely as the multiplication of a unitary matrix against a state vector."
      }
    ]
  }
};
