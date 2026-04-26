import { Topic, QuizQuestion } from '../types';

export const LEVEL_15_TOPICS: Topic[] = [
  {
    id: "L15-T1",
    levelId: 15,
    name: "IBM Quantum",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L1-T1", name: "What is Quantum Computing" }] },
      whatYouWillLearn: [
        "The history of the 'IBM Q Experience'.",
        "Qiskit SDK: The world's most popular quantum software ecosystem.",
        "The IBM hardware roadmap: From Falcon to Condor and Heron.",
        "How to access real quantum hardware for free."
      ],
      introduction: "IBM is the undisputed leader in quantum ecosystem accessibility. In 2016, they were the first company in the world to put a quantum computer on the cloud for public use. Today, their 'IBM Quantum Platform' hosts a massive fleet of superconducting machines. Their software, Qiskit, has become the global industry standard for quantum development, used by thousands of researchers, developers, and Fortune 500 companies.",
      whyItMatters: "Almost every quantum developer starts with IBM because they offer a 'Free Tier'—allowing anyone with an internet connection to run actual quantum circuits on real processors in New York or Japan at zero cost.",
      keyConcepts: [
        {
          heading: "Qiskit Ecosystem",
          description: "A comprehensive open-source SDK that includes tools for circuit design, error mitigation, and specialized modules for chemistry, finance, and machine learning."
        },
        {
          heading: "IBM Quantum Composer",
          description: "A graphical, drag-and-drop tool that allows you to build circuits and see their results on the Bloch sphere without writing a single line of code."
        },
        {
          heading: "Qiskit Runtime",
          description: "A serverless architecture that allows classical and quantum code to run close together, reducing the time wasted sending data back and forth over the internet."
        }
      ],
      mathematics: "$$ \\text{Quantum Volume (QV)} \\times \\text{CLOPS} $$\\nIBM uses these two metrics to measure the power and speed of their cloud systems. QV measures quality; CLOPS measures how many circuit layers can be executed per second.",
      analogy: "If Quantum Computing is a new ocean, IBM is the company that built the first public docks and provided the most popular boats (Qiskit) for free, allowing anyone to start exploring.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "from qiskit_ibm_runtime import QiskitRuntimeService\\n# Accessing the world's largest fleet of real quantum hardware\\nservice = QiskitRuntimeService()\\nbackend = service.least_busy(simulator=False, operational=True)",
        cirq: "# While Google's SDK, Cirq circuits can be converted and run on IBM backends using Qiskit adapters."
      },
      realWorldApplications: [
        { title: "Academic Research", explanation: "Over 2,000 scientific papers have been published using data obtained from IBM's public quantum cloud." }
      ],
      commonMistakes: [
        { mistake: "Thinking the 'Free' tier hardware is the same as the 'Premium' tier.", correction: "Public users generally access older or smaller processors. Enterprise clients pay for priority access to 'Utility-Scale' systems like the 133-qubit Heron." }
      ],
      summary: [
        "IBM was the first to provide cloud quantum computing (2016).",
        "Makers of the industry-standard Qiskit SDK.",
        "Offers a large fleet of superconducting QPUs accessible via the web.",
        "A critical resource for students and professional researchers alike."
      ],
      quiz: {
        topicId: "L15-T1",
        questions: [
          {
            question: "Which company launched the first public quantum cloud platform?",
            options: ["Microsoft", "Google", "IBM", "Amazon"],
            correctIndex: 2,
            explanation: "IBM launched the 'IBM Q Experience' in May 2016, opening quantum computing to the public for the first time."
          }
        ]
      }
    }
  },
  {
    id: "L15-T2",
    levelId: 15,
    name: "Amazon Braket",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T7", name: "Hardware Comparison" }] },
      whatYouWillLearn: [
        "The 'Department Store' model of AWS Braket.",
        "Accessing IonQ, Rigetti, and QuEra through one portal.",
        "Using the Braket SDK for cross-hardware benchmarking.",
        "Hybrid Job management and cost estimation."
      ],
      introduction: "Amazon Braket is a different kind of cloud platform. Instead of building its own quantum hardware, Amazon acts as a 'Broker' or a department store. Through Braket, you can access nearly every *other* major company's technology. Using one single AWS account and one Python library, you can run your code on a superconducting chip (Rigetti), then an Ion Trap (IonQ), then a Neutral Atom processor (QuEra).",
      whyItMatters: "Braket is the best tool for scientific benchmarking. Since you aren't 'locked in' to one vendor, you can objectively compare which physical technology actually works best for your specific algorithm.",
      keyConcepts: [
        {
          heading: "Braket SDK",
          description: "An open-source library that provides a unified interface. You write the code once, and Braket handles the translation to different hardware backends."
        },
        {
          heading: "Quantum Hybrid Jobs",
          description: "A feature that manages the classical-quantum loop for you, ensuring your classical optimization code runs on high-speed AWS servers right next to the QPU."
        },
        {
          heading: "Direct QPU Access",
          description: "The ability to 'rent' an entire quantum computer for a 1-hour window to perform deep research without any other users in the queue."
        }
      ],
      mathematics: "$$ \\text{Cost} = \\text{Per-Task Fee} + (\\text{Shots} \\times \\text{Per-Shot Fee}) $$\\nAWS pricing is transparent but can add up. A typical small run might cost $1.00, while a massive experiment can cost hundreds.",
      analogy: "Amazon Braket is like a universal remote control. You don't care if the TV is a Sony, Samsung, or LG; the remote allows you to control everything through one single, familiar interface.",
      visualType: "NETWORK_DIAGRAM",
      codeImplementation: {
        qiskit: "# The 'qiskit-braket-provider' allows you to run standard Qiskit code on AWS hardware.",
        cirq: "import braket.circuits\\n# Braket supports Cirq-style circuit definitions natively."
      },
      realWorldApplications: [
        { title: "Enterprise Benchmarking", explanation: "Companies like BMW and Goldman Sachs use Braket to test their algorithms on multiple hardware types to find the best 'price-to-performance' ratio." }
      ],
      commonMistakes: [
        { mistake: "Assuming it is free like the IBM public tier.", correction: "Amazon Braket is a 'pay-as-you-go' service. While they offer some credits for students, real hardware runs usually incur a cost per task and per shot." }
      ],
      summary: [
        "Multi-hardware cloud portal integrated into AWS.",
        "Access to IonQ (Ions), Rigetti (Superconducting), and QuEra (Neutral Atoms).",
        "The best platform for hardware-agnostic benchmarking.",
        "Unified SDK simplifies cross-platform development."
      ],
      quiz: {
        topicId: "L15-T2",
        questions: [
          {
            question: "What is a major advantage of using Amazon Braket for quantum research?",
            options: ["It is the only way to use Qiskit.", "It provides access to many different hardware providers through a single portal.", "It is always free.", "It only runs on classical simulators."],
            correctIndex: 1,
            explanation: "Braket's multi-vendor approach allows you to compare different hardware technologies easily using one account."
          }
        ]
      }
    }
  },
  {
    id: "L15-T3",
    levelId: 15,
    name: "Google Quantum AI",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T1", name: "Superconducting Qubits" }] },
      whatYouWillLearn: [
        "The Sycamore processor and the milestone of Quantum Supremacy.",
        "Google's focus on Error Correction and Surface Codes.",
        "The Cirq SDK and TensorFlow Quantum.",
        "Accessing Google hardware via Google Cloud."
      ],
      introduction: "Google's Quantum AI team, based in Santa Barbara, is famous for achieving 'Quantum Supremacy' in 2019. Their hardware focuses on extremely high-fidelity superconducting qubits arranged in a unique 2D grid. Unlike IBM's focus on a massive fleet, Google focuses heavily on pushing the engineering limits of error correction. Their roadmap is centered on building the world's first 'error-corrected' quantum computer by the end of the decade.",
      whyItMatters: "Google's research into the 'Surface Code' is the global benchmark for the industry. If you want to understand how we will move from noisy prototypes to 'perfect' computers, you look at Google's technical papers.",
      keyConcepts: [
        {
          heading: "Sycamore Processor",
          description: "A 53-qubit chip that performed a calculation in 200 seconds that would have taken the world's best supercomputer 10,000 years."
        },
        {
          heading: "Cirq SDK",
          description: "Google's Python library, designed specifically for researchers who need 'low-level' control over every gate and timing on the hardware."
        },
        {
          heading: "TensorFlow Quantum",
          description: "A library that bridges Google's famous AI framework (TensorFlow) with quantum circuits, enabling the training of massive Hybrid AI models."
        }
      ],
      mathematics: "$$ \\text{XEB Fidelity} = 2^n \\langle P_{obs} \\rangle - 1 $$\\nGoogle uses Cross-Entropy Benchmarking (XEB) to prove their hardware is performing calculations that are too complex for any classical computer to fake.",
      analogy: "If IBM is the global bus system (accessible and widespread), Google is the Formula 1 team—focused on pure engineering records, absolute speed, and breaking boundaries.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# While primarily a Google ecosystem, tools like 'Qiskit-to-Cirq' allow for cross-compatibility.",
        cirq: "import cirq\\n# Defining the Sycamore grid layout for a hardware-aware circuit\\ndevice = cirq.google.Sycamore\\nprint(device.qubit_set())"
      },
      realWorldApplications: [
        { title: "Quantum Advantage", explanation: "Google's 2019 supremacy experiment proved that quantum computers have a fundamental 'speed limit' that is far beyond anything classical math can achieve." }
      ],
      commonMistakes: [
        { mistake: "Thinking you can log in for free as easily as IBM.", correction: "Google's hardware access is currently more restricted, primarily available to research partners and select enterprises through Google Cloud's 'Quantum Computing Service'." }
      ],
      summary: [
        "Makers of the Sycamore processor.",
        "Achieved the first demonstration of Quantum Supremacy (2019).",
        "Focused on high-fidelity gates and advanced error correction research.",
        "Integrates deeply with classical AI through TensorFlow Quantum."
      ],
      quiz: {
        topicId: "L15-T3",
        questions: [
          {
            question: "What is the name of Google's flagship 53-qubit quantum processor?",
            options: ["Falcon", "Sycamore", "Eagle", "Aspen"],
            correctIndex: 1,
            explanation: "Sycamore is the processor used by Google to demonstrate quantum supremacy."
          }
        ]
      }
    }
  },
  {
    id: "L15-T4",
    levelId: 15,
    name: "Azure Quantum",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L10-T4", name: "Topological Qubits" }] },
      whatYouWillLearn: [
        "Microsoft's Azure Quantum portal.",
        "The Q# (Q-Sharp) programming language.",
        "Topological hardware research and Majorana modes.",
        "The Quantum Resource Estimator."
      ],
      introduction: "Microsoft's Azure Quantum is the other major 'Department Store' in the cloud. However, Microsoft's most unique contribution is their bet on 'Topological Qubits'. While other companies build 'noisy' qubits today, Microsoft is trying to build a 'naturally quiet' qubit using topological physics. They believe this is the only way to eventually build a million-qubit machine that fits in a single room.",
      whyItMatters: "Azure Quantum provides world-class tools for 'Resource Estimation'. Even before we have a perfect quantum computer, Microsoft's tools can tell you exactly how many qubits you would need to solve a specific problem in chemistry or finance.",
      keyConcepts: [
        {
          heading: "Q# (Q-Sharp)",
          description: "A standalone, enterprise-grade programming language designed specifically for quantum algorithms. It handles the 'classical-quantum' interaction more efficiently than Python."
        },
        {
          heading: "Resource Estimator",
          description: "A tool that analyzes your quantum code and predicts the physical hardware, power, and time required to run it on a future, fault-tolerant machine."
        },
        {
          heading: "Quantinuum Access",
          description: "Azure is a primary portal for accessing Quantinuum's trapped-ion hardware, which currently holds the record for the highest Quantum Volume."
        }
      ],
      mathematics: "$$ \\text{T-Gate Count} \\propto \\text{Computational Complexity} $$\\nMicrosoft focuses on 'T-gate' optimization, as these gates are the most 'expensive' part of a future error-corrected quantum computer.",
      analogy: "Microsoft is like an architect. While others are building small log cabins (current QPUs), Microsoft is drawing the blueprints for a skyscraper and inventing the high-strength steel (topology) needed to build it.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# Azure Quantum supports Qiskit through a dedicated provider plugin.",
        cirq: "# Azure is highly interoperable, allowing users to submit jobs using many different SDKs."
      },
      realWorldApplications: [
        { title: "Green Chemistry", explanation: "Microsoft uses Azure Quantum to simulate catalysts that can remove carbon from the air or create more efficient fertilizers." }
      ],
      commonMistakes: [
        { mistake: "Thinking Q# is just a Python library.", correction: "Q# is a complete, typed programming language. While it can be called from Python, it is its own independent system designed for large-scale software engineering." }
      ],
      summary: [
        "Microsoft's enterprise cloud ecosystem for quantum.",
        "Home of the Q# programming language.",
        "Focus on Resource Estimation for future industrial-scale problems.",
        "Leading the long-term research into topological quantum hardware."
      ],
      quiz: {
        topicId: "L15-T4",
        questions: [
          {
            question: "What is the name of Microsoft's quantum-specific programming language?",
            options: ["Python", "Q-Sharp (Q#)", "C++", "Java"],
            correctIndex: 1,
            explanation: "Q# was built by Microsoft specifically for expressing quantum algorithms in an enterprise software environment."
          }
        ]
      }
    }
  },
  {
    id: "L15-T5",
    levelId: 15,
    name: "The Future Roadmap",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L9-T8", name: "Fault Tolerant QC" }] },
      whatYouWillLearn: [
        "The transition from NISQ to Quantum Utility and Fault Tolerance.",
        "Modular and Clustered quantum architectures.",
        "The impact of the 'Quantum Revolution' on humanity.",
        "How to build a career in the quantum industry."
      ],
      introduction: "The next 20 years of quantum computing are defined by the 'S-Curve'. We are moving away from noisy prototypes (the NISQ era) toward 'Quantum Utility'—where quantum computers actually outperform classical ones for real-world tasks. The ultimate goal is 'Fault Tolerance', where millions of qubits work together to solve humanity's hardest problems. We are currently at the '1970s microchip' era of this technology.",
      whyItMatters: "You are entering the field at a historic turning point. There is a massive global talent gap. Those who learn the math and the code now will be the engineers and scientists who lead the 'Quantum Revolution', just as the early internet pioneers defined our world today.",
      keyConcepts: [
        {
          heading: "Quantum Utility",
          description: "The phase where quantum computers can perform physics simulations that are beyond the reach of classical supercomputers, even if the quantum results still have some noise."
        },
        {
          heading: "Fault Tolerance",
          description: "The 'Holy Grail'. Using error correction (like Surface Codes) to run circuits for as long as we want without a single error, enabling Shor's algorithm for real."
        },
        {
          heading: "Distributed Quantum Computing",
          description: "The idea of linking many small quantum chips together via fiber optics to create one giant, modular quantum supercomputer."
        }
      ],
      mathematics: "$$ \\text{Logical Qubits} = \\frac{\\text{Physical Qubits}}{\\text{Error Correction Overhead}} $$\\nIn the future, we will need hundreds or thousands of physical qubits to create a single, 'perfect' logical qubit.",
      analogy: "The future roadmap is like the leap from 1950s vacuum tube computers to the modern internet. It won't happen overnight, but the trajectory is inevitable, and the impact will be universal.",
      visualType: "HARDWARE_DIAGRAM",
      codeImplementation: {
        qiskit: "# Learning 'Qiskit Primitives' (Sampler/Estimator) is the key to writing future-proof code today.",
        cirq: "# Cirq's roadmap is heavily focused on the path to the first logical qubit."
      },
      realWorldApplications: [
        { title: "Solving Humanity's Challenges", explanation: "Climate change, global hunger, and incurable diseases are all 'molecular' problems. A mature quantum computer is the only tool that can solve them at the source." }
      ],
      commonMistakes: [
        { mistake: "Thinking it is still 'just a theory'.", correction: "We have passed the theory phase. We are now in the 'Engineering and Scaling' phase. The question is no longer IF it will work, but WHEN it will be large enough." }
      ],
      summary: [
        "The industry is moving from NISQ to Fault Tolerant architectures.",
        "Modular scaling is the key to reaching millions of qubits.",
        "Quantum computing will define the next 50 years of information technology.",
        "Now is the best time in history to enter the quantum career field."
      ],
      quiz: {
        topicId: "L15-T5",
        questions: [
          {
            question: "What is 'Fault Tolerance' in quantum computing?",
            options: ["The ability to ignore mistakes.", "A state where errors are corrected faster than they occur, allowing for perfect calculations.", "A computer that never turns on.", "A way to make qubits louder."],
            correctIndex: 1,
            explanation: "Fault tolerance is the ultimate goal, where error correction makes the computer's output 100% reliable for any length of calculation."
          }
        ]
      }
    }
  }
];

export const LEVEL_15_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {
  "L15-T1": {
    questions: [
      {
        question: "Which company was the first to offer a public quantum computer on the cloud?",
        options: ["Microsoft", "Google", "IBM", "Amazon"],
        correctIndex: 2,
        explanation: "IBM launched the 'IBM Q Experience' (now IBM Quantum Platform) in May 2016."
      }
    ]
  },
  "L15-T2": {
    questions: [
      {
        question: "What is a major advantage of using Amazon Braket for quantum research?",
        options: ["It is the only way to use Qiskit.", "It provides access to many different hardware providers through a single portal.", "It is always free.", "It only runs on classical simulators."],
        correctIndex: 1,
        explanation: "Braket's multi-vendor approach allows you to compare different hardware technologies easily using one account."
      }
    ]
  },
  "L15-T3": {
    questions: [
      {
        question: "What is the name of Google's flagship 53-qubit quantum processor?",
        options: ["Falcon", "Sycamore", "Eagle", "Aspen"],
        correctIndex: 1,
        explanation: "Sycamore is the processor used by Google to demonstrate quantum supremacy."
      }
    ]
  },
  "L15-T4": {
    questions: [
      {
        question: "Which of the following is Microsoft's primary contribution to quantum software?",
        options: ["PyTorch", "Q# (Q-Sharp)", "TensorFlow", "React"],
        correctIndex: 1,
        explanation: "Q# is Microsoft's enterprise-grade language for quantum algorithm development."
      }
    ]
  }
};
