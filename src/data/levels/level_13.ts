import { Topic, QuizQuestion } from '../types';

export const LEVEL_13_TOPICS: Topic[] = [
  {
    id: "L13-T1",
    levelId: 13,
    name: "Quantum Feature Maps",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T6", name: "Tensor Products" }] },
      whatYouWillLearn: [
        "Encoding classical data into quantum states (State Preparation).",
        "Angle Encoding vs Amplitude Encoding trade-offs.",
        "How Feature Maps project data into high-dimensional Hilbert space.",
        "The concept of 'Quantum Embedding'."
      ],
      introduction: "Quantum Machine Learning (QML) begins with the challenge of 'Data Loading'. Since our raw data (images, price logs, sensor readings) is classical, we must map it into a quantum state. This is called a Feature Map. It is more than just data entry; it is about projecting classical points into the exponentially large Hilbert space, where their relationships can be analyzed in ways classical computers can't handle. A well-designed feature map ensures that hidden patterns in classical data become linearly separable in the quantum space.",
      whyItMatters: "The quality of a QML model depends entirely on its feature map. If the mapping is poor, the quantum computer sees only noise. If the mapping is clever, the quantum computer can find 'needles in haystacks' across massive datasets by leveraging the geometry of high-dimensional space.",
      keyConcepts: [
        {
          heading: "Angle Encoding",
          description: "Each feature in your dataset is mapped to the rotation angle ($\\\\theta$) of a single qubit gate (like $R_y$ or $R_z$). It is easy to implement but requires one physical qubit for every single data feature."
        },
        {
          heading: "Amplitude Encoding",
          description: "Data is stored directly in the probability amplitudes ($\\\\alpha, \\\\beta$) of the wave function. This is extremely efficient: a 10-qubit system can store $2^{10} = 1024$ classical features. However, preparing these states is physically complex."
        },
        {
          heading: "Basis Encoding",
          description: "Mapping classical bitstrings directly to quantum basis states ($|0110\\rangle$). This is used primarily in algorithms like Grover's but is less common in modern QML classifiers."
        }
      ],
      mathematics: "$$ |\\psi(x)\\rangle = \\cos(x)|0\\rangle + \\sin(x)|1\\rangle \\quad (\\text{Angle Encoding}) $$\\n$$ |\\psi(x)\\rangle = \\sum_{i=1}^{2^n} x_i |i\\rangle \\quad (\\text{Amplitude Encoding}) $$\\nAmplitude encoding allows a massive $2^n$ feature vector to be packed into only $n$ qubits.",
      analogy: "Angle encoding is like writing a number on a sticky note and sticking it on a qubit. Amplitude encoding is like hiding the number inside the vibration of a string. One takes up physical space; the other is built into the nature of the string's motion.",
      visualType: "BLOCH_SPHERE",
      codeImplementation: {
        qiskit: "from qiskit.circuit.library import ZZFeatureMap\\n# A standard feature map that correlates two features to capture non-linear relationships.\\nfeature_map = ZZFeatureMap(feature_dimension=2, reps=2, entanglement='linear')",
        cirq: "import cirq\\n# Implementing a custom angle-encoding circuit in Cirq\\nq = cirq.GridQubit(0, 0)\\ncircuit = cirq.Circuit(cirq.ry(0.5)(q))"
      },
      realWorldApplications: [
        { title: "Medical Diagnosis", explanation: "Mapping blood markers into quantum phases to detect early-stage cancers that classical statistical models might miss." }
      ],
      commonMistakes: [
        { mistake: "Assuming Amplitude encoding is always better.", correction: "While it uses fewer qubits, the 'Depth' of the circuit required to load the data can be so high that decoherence noise destroys the data before you can use it." }
      ],
      summary: [
        "Feature maps translate classical numbers into quantum state vectors.",
        "Angle encoding is simple; Amplitude encoding is exponentially compact.",
        "Projection into Hilbert space allows for complex pattern recognition.",
        "The foundation for all Quantum SVMs and Neural Networks."
      ],
      quiz: {
        topicId: "L13-T1",
        questions: [
          {
            question: "How many qubits are required to store 1024 features using Amplitude Encoding?",
            options: ["1024", "512", "10", "1"],
            correctIndex: 2,
            explanation: "Since $2^{10} = 1024$, you only need 10 qubits to store 1024 amplitudes."
          }
        ]
      }
    }
  },
  {
    id: "L13-T2",
    levelId: 13,
    name: "Variational Quantum Classifiers (VQC)",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L13-T1", name: "Quantum Feature Maps" }] },
      whatYouWillLearn: [
        "The architecture of a Variational Quantum Classifier.",
        "Parameterized Quantum Circuits (PQC) and the 'Ansatz'.",
        "Hybrid optimization loops using classical gradients.",
        "Handling the 'Barren Plateau' problem."
      ],
      introduction: "A Variational Quantum Classifier (VQC) is the quantum equivalent of a single-layer neural network. It consists of two parts: a fixed Feature Map (to load data) and a 'Parameterized' circuit called an Ansatz. The Ansatz has gates with adjustable rotation angles (the 'weights'). You run data through, measure the result, and use a classical optimizer to tune the angles. This cycle repeats until the classifier 'learns' the correct patterns in the data.",
      whyItMatters: "VQCs are the workhorse of the NISQ era. Because they use 'shallow' circuits, they can finish their calculations before noise kills the qubits. They are the first step toward practical 'Quantum AI'.",
      keyConcepts: [
        {
          heading: "Ansatz",
          description: "A template circuit that provides the 'learning capacity'. A good ansatz must be flexible enough to represent the data but not so complex that it becomes impossible to train."
        },
        {
          heading: "Classical Optimizer",
          description: "Algorithms like SPSA or COBYLA that sit on your CPU and 'steer' the quantum computer toward the best settings based on measurement results."
        },
        {
          heading: "Barren Plateaus",
          description: "A major hurdle in QML training where the 'gradient' becomes flat. The optimizer gets 'lost' in the massive Hilbert space and doesn't know which way to turn the knobs, stopping the learning process."
        }
      ],
      mathematics: "$$ \\min_{\\theta} \\mathcal{L}(\\theta) = \\sum_i (y_i - f(x_i; \\theta))^2 $$\\nThe goal is to minimize the loss function $\\mathcal{L}$ by adjusting the quantum parameters $\\theta$ using classical calculus.",
      analogy: "A VQC is like a soundboard in a recording studio. You have dozens of sliders (parameters). You play a sound (data), listen for feedback (loss), and adjust the sliders until the output is perfect.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit_machine_learning.algorithms import VQC\\nfrom qiskit_algorithms.optimizers import SPSA\\n# VQC integrates a feature map and an ansatz into a single trainable model.\\nvqc = VQC(feature_map=fm, ansatz=ansatz, optimizer=SPSA())",
        cirq: "import tensorflow_quantum as tfq\\n# Google's TFQ library allows you to treat a Cirq circuit as a Keras layer."
      },
      realWorldApplications: [
        { title: "Fraud Detection", explanation: "Training a VQC to recognize the subtle 'geometric' signature of fraudulent credit card transactions in a 50-dimensional space." }
      ],
      commonMistakes: [
        { mistake: "Thinking VQCs are always better than classical AI today.", correction: "Currently, classical neural nets are much faster for simple data. VQCs are expected to win on data with 'quantum-like' correlations that classical bits struggle to represent." }
      ],
      summary: [
        "Combines fixed data loading with trainable quantum gates.",
        "The 'Ansatz' acts as the trainable brain of the circuit.",
        "Classical optimizers handle the heavy math of learning.",
        "Barren plateaus are the primary bottleneck for scaling these models."
      ],
      quiz: {
        topicId: "L13-T2",
        questions: [
          {
            question: "What happens during a 'Barren Plateau' in QML training?",
            options: ["The computer freezes.", "The gradient becomes nearly zero, making it impossible for the optimizer to learn.", "The qubits melt.", "The accuracy reaches 100% instantly."],
            correctIndex: 1,
            explanation: "In large Hilbert spaces, the landscape often becomes so flat that the optimizer has no 'downhill' direction to follow."
          }
        ]
      }
    }
  },
  {
    id: "L13-T3",
    levelId: 13,
    name: "Quantum Neural Networks",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L13-T2", name: "Variational Quantum Classifiers (VQC)" }] },
      whatYouWillLearn: [
        "Quantum Convolutional Neural Networks (QCNN).",
        "Quantum Recurrent Neural Networks (QRNN).",
        "Layered architectures and weight sharing.",
        "Comparing classical neurons to quantum circuit nodes."
      ],
      introduction: "Quantum Neural Networks (QNNs) take the architecture of Deep Learning and translate it into the language of qubits. A QNN consists of multiple layers of entangled gates. Just as classical CNNs use 'filters' to find patterns in images, a QCNN uses 'quantum filters' to perform convolutions over entangled data, reducing the system's size while preserving critical information. This mimics human visual processing but operates under the laws of quantum superposition.",
      whyItMatters: "QNNs are designed to process 'Quantum Data' (signals directly from a quantum sensor or physics experiment) without ever converting them into classical numbers, preserving the full quantum advantage.",
      keyConcepts: [
        {
          heading: "Quantum Convolution",
          description: "Using entangling gates (like CNOT) to create 'pooling' and 'filtering' effects, allowing the network to recognize patterns across groups of qubits."
        },
        {
          heading: "Weight Sharing",
          description: "Applying the same quantum gate parameters to different parts of the circuit. This significantly reduces the 'parameter count', making the model easier to train and less prone to overfitting."
        },
        {
          heading: "Differentiable Programming",
          description: "Modern QNNs are built using frameworks that can calculate 'Quantum Gradients' (using the Parameter Shift Rule), allowing standard AI tools like PyTorch to 'train' a quantum chip."
        }
      ],
      mathematics: "$$ \\nabla_\\theta f(\\theta) = \\frac{1}{2}(f(\\theta + \\pi/2) - f(\\theta - \\pi/2)) $$\\nThis is the **Parameter Shift Rule**. It allows us to calculate the 'slope' (gradient) of a quantum circuit by running it twice with slightly shifted settings.",
      analogy: "A classical NN is like a brain. A QNN is like a brain where every neuron can be in multiple states at once and is instantly 'connected' to every other neuron through entanglement, allowing for massive collaborative computation.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit_machine_learning.neural_networks import EstimatorQNN\\n# Creating a QNN that calculates the expectation value of a measurement.",
        cirq: "import tensorflow_quantum as tfq\\n# Building a multi-layer QNN using TFQ's PQC layer."
      },
      realWorldApplications: [
        { title: "Materials Discovery", explanation: "Using a QCNN to predict the 'phase' (superconducting vs insulating) of a new material by analyzing its simulated quantum state." }
      ],
      commonMistakes: [
        { mistake: "Assuming more layers always means better performance.", correction: "In QML, even 2 or 3 'layers' of gates can be as powerful as thousands of classical layers because each layer operates in an exponentially large space." }
      ],
      summary: [
        "QNNs bring the power of Deep Learning to quantum hardware.",
        "QCNNs use quantum filtering to handle high-dimensional data.",
        "Parameter Shift Rule allows for training via standard backpropagation.",
        "Optimized for processing native quantum states and sensor data."
      ],
      quiz: {
        topicId: "L13-T3",
        questions: [
          {
            question: "How do we calculate the 'gradient' (slope) of a quantum circuit for training?",
            options: ["By guessing.", "Using the Parameter Shift Rule (running the circuit twice at different points).", "It is impossible.", "By measuring the temperature."],
            correctIndex: 1,
            explanation: "Since we cannot 'look' inside a quantum circuit without collapsing it, we use the math of the Parameter Shift Rule to calculate gradients externally."
          }
        ]
      }
    }
  },
  {
    id: "L13-T4",
    levelId: 13,
    name: "Quantum Kernels",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L13-T1", name: "Quantum Feature Maps" }] },
      whatYouWillLearn: [
        "The Kernel Trick in high-dimensional spaces.",
        "Quantum-enhanced Support Vector Machines (QSVM).",
        "Measuring similarity via the SWAP test and Fidelity.",
        "Why Kernels are the most likely path to Quantum Advantage in AI."
      ],
      introduction: "In classical machine learning, 'Kernels' are used to solve non-linear problems by mapping data to a higher dimension where a simple line can separate it. Quantum computers do this naturally. A Quantum Kernel measures the 'Similarity' between two quantum-encoded data points by checking their overlap (Fidelity) in the Hilbert space. This allows for classifying data that is so complex it looks like complete noise to a classical computer.",
      whyItMatters: "Quantum kernels are currently seen as more promising than QNNs for near-term advantage. They leverage the exponential state space directly without needing the difficult training loops of neural networks.",
      keyConcepts: [
        {
          heading: "Fidelity",
          description: "A measure of how much two quantum states 'overlap'. If states are identical, fidelity is 1. If they are orthogonal (distinct), it is 0."
        },
        {
          heading: "The SWAP Test",
          description: "A specialized quantum circuit that calculates the overlap between two states without needing to know what the states actually are. This is the 'Engine' of a Quantum Kernel."
        },
        {
          heading: "QSVM (Quantum SVM)",
          description: "A Support Vector Machine where the core 'similarity math' is handled by a quantum processor, while the 'classification' is handled classically."
        }
      ],
      mathematics: "$$ K(x, y) = |\\langle \\phi(x) | \\phi(y) \\rangle|^2 $$\\nThis is the Quantum Kernel function, representing the fidelity between two quantum-encoded vectors $x$ and $y$.",
      analogy: "A classical kernel is like looking at the shadows of two objects to guess if they are the same shape. A quantum kernel is like physically holding the two objects and seeing if they fit perfectly together.",
      visualType: "CIRCUIT_ANIMATOR",
      codeImplementation: { 
        qiskit: "from qiskit_machine_learning.kernels import FidelityQuantumKernel\\n# Calculating the similarity matrix for a training dataset.", 
        cirq: "import cirq\\n# Implementing a SWAP test circuit to compare two multi-qubit states." 
      },
      realWorldApplications: [{ title: "Credit Scoring", explanation: "Finding subtle, non-linear patterns of risk in thousands of correlated financial features that appear random to classical models." }],
      commonMistakes: [{ mistake: "Assuming QSVM is faster than classical SVM.", correction: "For simple data, classical is faster. QSVM is only 'better' when the data has hidden patterns that *require* the Hilbert space to become visible." }],
      summary: ["Measures similarity in the exponentially large Hilbert space.", "Powers the Quantum Support Vector Machine (QSVM).", "Uses the SWAP test to calculate state overlap (fidelity).", "The most mathematically rigorous path to near-term QML advantage."],
      quiz: {
        topicId: "L13-T4",
        questions: [
          {
            question: "What does a Quantum Kernel measure between two data points?",
            options: ["The distance in miles.", "The weight of the qubits.", "The overlap (fidelity) between their quantum-encoded states.", "The speed of the circuit."],
            correctIndex: 2,
            explanation: "Kernels are all about 'Similarity'. In quantum, similarity is defined as the overlap of the two state vectors."
          }
        ]
      }
    }
  },
  {
    id: "L13-T5",
    levelId: 13,
    name: "Quantum PCA",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L2-T5", name: "Eigenvalues and Eigenvectors" }] },
      whatYouWillLearn: [
        "Quantum Dimensionality Reduction.",
        "Density matrices and state representation of data.",
        "Using Quantum Phase Estimation (QPE) for PCA.",
        "Efficiency gains for massive datasets."
      ],
      introduction: "Principal Component Analysis (PCA) is a tool used to find the 'most important' features in a massive dataset. Quantum PCA (QPCA) can potentially perform this task exponentially faster. It treats the entire dataset as a quantum state (a density matrix) and uses Phase Estimation to reveal the 'Principal Components' (the eigenvectors) directly. This allows us to summarize a dataset with millions of features in a matter of seconds.",
      whyItMatters: "For datasets with billions of dimensions (like genomic data or global logistics), classical PCA becomes impossible due to the 'curse of dimensionality'. QPCA is one of the few algorithms that could solve these problems at scale.",
      keyConcepts: [
        {
          heading: "Density Matrix (Data)",
          description: "Representing a dataset as a giant quantum state $\\rho$, where the importance of each feature is tied to its 'eigenvalue'."
        },
        {
          heading: "Phase Estimation",
          description: "The core QPCA step that 'extracts' the eigenvalues of the data, telling us which features are the most significant."
        }
      ],
      mathematics: "$$ \\rho = \\sum_i p_i |v_i\\rangle \\langle v_i| $$\\nIn QPCA, we decompose the density matrix $\\rho$ to find the eigenvectors $v_i$ with the largest eigenvalues $p_i$.",
      analogy: "QPCA is like looking at a crowded, blurry photo and having a 'quantum filter' that instantly makes the most important faces clear while fading the background into the noise.",
      visualType: "MATH_DERIVATION",
      codeImplementation: { qiskit: "# Implementing iterative Phase Estimation to find the largest eigenvalue of a state.", cirq: "# Modeling density matrix evolution for high-dimensional data analysis." },
      realWorldApplications: [{ title: "Genomics", explanation: "Analyzing the most significant genetic markers across millions of patient records simultaneously to find disease correlations." }],
      commonMistakes: [{ mistake: "Assuming we can easily 'load' the data.", correction: "QPCA requires 'Quantum RAM' or a very efficient state preparation, which is a major hardware challenge today." }],
      summary: ["Quantum version of dimensionality reduction.", "Potential for exponential speedup on high-dimensional data.", "Relies on the same math as Shor's algorithm (Phase Estimation).", "Identifies the core structure of massive, complex datasets."],
      quiz: {
        topicId: "L13-T5",
        questions: [
          {
            question: "Which quantum algorithm is the 'engine' behind Quantum PCA?",
            options: ["Grover's Search.", "Quantum Phase Estimation (QPE).", "Bernstein-Vazirani.", "Shor's Algorithm."],
            correctIndex: 1,
            explanation: "QPE is used to find the eigenvalues (importance) of the data features in QPCA."
          }
        ]
      }
    }
  }
];

export const LEVEL_13_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L13-T1": {
    questions: [
      {
        question: "How many qubits are required to store 1024 features using Amplitude Encoding?",
        options: ["1024", "512", "10", "1"],
        correctIndex: 2,
        explanation: "Since $2^{10} = 1024$, you only need 10 qubits to store 1024 amplitudes."
      }
    ]
  },
  "L13-T2": {
    questions: [
      {
        question: "What is the primary role of the 'Ansatz' in a VQC?",
        options: ["To load data.", "To act as the trainable layer with adjustable parameters.", "To measure the qubits.", "To cool the chip."],
        correctIndex: 1,
        explanation: "The Ansatz is the template circuit that holds the 'weights' (angles) the model learns."
      }
    ]
  },
  "L13-T3": {
    questions: [
      {
        question: "What is 'Weight Sharing' in a QNN?",
        options: ["Using the same qubit for two tasks.", "Applying the same gate parameters to multiple parts of the circuit to simplify learning.", "Sharing a computer with a friend.", "Dividing the result by two."],
        correctIndex: 1,
        explanation: "Weight sharing reduces the number of parameters, making the QNN easier to train and more efficient."
      }
    ]
  }
};
