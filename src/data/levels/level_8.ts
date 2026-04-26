import { Topic } from '../types';

export const LEVEL_8_TOPICS: Topic[] = [
  {
    id: "L8-T1",
    levelId: 8,
    name: "Complexity Classes",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L7-T1", name: "Algorithm Design Principles" }] },
      whatYouWillLearn: [
        "The mathematical classification of problems based on computational resources.",
        "Definitions of P, NP, and BPP in classical computer science.",
        "Where Quantum Computing sits: The BQP class.",
        "The hierarchy of complexity: P vs BQP vs NP."
      ],
      introduction: "Computational Complexity Theory is the study of how much 'effort' (time and memory) is required to solve a problem as it grows in size. In classical computing, we have two primary 'easy' classes: **P** (Polynomial time) for deterministic tasks and **BPP** for tasks that use randomness. However, quantum mechanics introduces a new class: **BQP** (Bounded-error Quantum Polynomial time).\n\nBQP represents the set of problems that a quantum computer can solve efficiently with a small probability of error. The core goal of quantum computing is to prove that BQP is strictly larger than P. This would mean there are problems—like factoring large numbers or simulating molecules—that are 'Impossible' for your laptop but 'Easy' for a quantum processor. Understanding these boundaries is essential for knowing when to use a quantum computer and when to stick with classical hardware.",
      whyItMatters: "The entire economic and scientific value of quantum computing depends on the fact that BQP > P. If BQP were equal to P, then any quantum algorithm could be simulated efficiently on a standard computer, rendering quantum hardware unnecessary.",
      keyConcepts: [
        {
          heading: "P (Polynomial)",
          description: "Problems solvable by a classical computer in time $O(n^k)$. Examples: Multiplication, Sorting, Shortest Path."
        },
        {
          heading: "NP (Nondeterministic Polynomial)",
          description: "Problems where a solution is hard to *find* but easy to *verify*. Examples: Sudoku, Protein Folding, RSA Factoring."
        },
        {
          heading: "BQP (Quantum Polynomial)",
          description: "The quantum equivalent of P. It is proven that P $\subseteq$ BQP. The big question is whether BQP can solve all NP problems (most researchers believe the answer is NO)."
        }
      ],
      mathematics: "$$ \\text{P} \\subseteq \\text{BPP} \\subseteq \\text{BQP} \\subseteq \\text{PSPACE} $$\\nComplexity is measured in terms of the number of gates $$ G(n) $$ needed for an input of size $n$.",
      analogy: "Complexity classes are like weight classes in boxing. A heavyweight (BQP) can lift weights that a lightweight (P) cannot. But even a heavyweight has limits; there are boulders (NP-Complete problems) that are likely too heavy for any computer to lift efficiently.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# Complexity is a theoretical metric. We analyze it by counting gates:\nfrom qiskit import QuantumCircuit\nqc = QuantumCircuit(3)\n# O(n) complexity circuit (Linear)\nfor i in range(3): qc.h(i)\nprint(f'Gate count: {qc.size()}, Depth: {qc.depth()}')",
        cirq: "import cirq\n# Cirq.Circuit.depth() is used to estimate time complexity on hardware."
      },
      realWorldApplications: [
        { title: "Cybersecurity Planning", explanation: "Governments transition to 'Post-Quantum' encryption by identifying which classical problems are inside the BQP 'danger zone'." }
      ],
      commonMistakes: [
        { mistake: "Thinking quantum computers can solve NP-Complete problems instantly.", correction: "There is no proof that BQP includes NP-Complete problems like the Traveling Salesman. Most evidence suggests these are still hard for quantum computers." },
        { mistake: "Assuming P and BQP are completely different.", correction: "Everything a classical computer can do, a quantum computer can also do (P is a subset of BQP)." }
      ],
      summary: [
        "P: Easy for classical; BQP: Easy for quantum.",
        "Quantum advantage relies on BQP being larger than P.",
        "BQP is contained within the class of 'Memory-Limited' classical problems (PSPACE).",
        "Quantum computers are not 'Universal Solvers' for all hard problems.",
        "Most NP-Complete problems remain hard even with quantum logic."
      ],
      quiz: {
        topicId: "L8-T1",
        questions: [
          {
            question: "Which complexity class represents problems that a quantum computer can solve efficiently?",
            options: ["P", "NP", "BQP", "BPP"],
            correctIndex: 2,
            explanation: "BQP (Bounded-error Quantum Polynomial time) is the class of problems solvable in polynomial time by a quantum computer."
          },
          {
            question: "Is it currently proven that BQP can solve all NP-Complete problems?",
            options: ["Yes, quantum computers are infinitely fast.", "No, most scientists believe BQP does not contain NP-Complete problems.", "Only for small numbers.", "Yes, but only on weekends."],
            correctIndex: 1,
            explanation: "While quantum computers are fast for some NP problems (like Factoring), they are not expected to solve all NP-Complete problems (like the Traveling Salesman) efficiently."
          },
          {
            question: "How does P relate to BQP mathematically?",
            options: ["P = BQP", "BQP is a subset of P", "P is a subset of BQP", "They are completely unrelated"],
            correctIndex: 2,
            explanation: "Since a quantum computer can simulate any classical computer, all problems in P are also in BQP."
          }
        ]
      }
    }
  },
  {
    id: "L8-T2",
    levelId: 8,
    name: "BQP and QMA",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L8-T1", name: "Complexity Classes" }] },
      whatYouWillLearn: [
        "The definition of QMA: Quantum Merlin-Arthur.",
        "Comparing classical verification (NP) to quantum verification (QMA).",
        "Why finding ground state energies is a QMA-complete problem.",
        "The power of 'Quantum Witnesses'."
      ],
      introduction: "BQP describes what a quantum computer can *find* on its own. **QMA** (Quantum Merlin-Arthur) describes what a quantum computer can *check*. In this mathematical 'game', an all-powerful wizard (Merlin) provides a 'Quantum Witness' (an entangled state) as proof of a solution. The quantum verifier (Arthur) then performs a series of gates on this state to check if the solution is correct.\n\nQMA is the quantum analog of NP. While BQP is the class we use for building algorithms, QMA is the class we use to understand the fundamental physics of the universe. Problems like 'Is the lowest energy of this atom less than X?' are QMA-complete, meaning they are likely too hard for even a quantum computer to solve, but we can verify the answer if someone gives us the right quantum state.",
      whyItMatters: "Limits of Simulation. QMA tells us that some natural systems are so complex that not even a quantum computer can 'solve' them from scratch. This defines the ultimate boundary of what humans can ever compute.",
      keyConcepts: [
        {
          heading: "Arthur (The Verifier)",
          description: "A standard quantum computer with BQP capabilities. He is skeptical and must check Merlin's work."
        },
        {
          heading: "Merlin (The Prover)",
          description: "An all-powerful source that can create any quantum state (even ones that are impossible to compute) to serve as a 'witness' for the proof."
        },
        {
          heading: "QMA-Complete",
          description: "The hardest problems in the QMA class. These are typically related to the 'Local Hamiltonian Problem' (finding ground state energies)."
        }
      ],
      mathematics: "$$ \\text{NP} \\subseteq \\text{QMA} \\subseteq \\text{PP} $$\\nA QMA proof consists of a quantum state $$ |\\psi\\rangle $$ and a verification circuit $$ V $$.",
      analogy: "BQP is like being able to solve a complex puzzle yourself. QMA is like being able to check if someone else's solved puzzle is correct. Sometimes it's easier to check a solution (like a password) than it is to find it.",
      visualType: "MATH_DERIVATION",
      codeImplementation: {
        qiskit: "# We can implement a simple verification circuit (Arthur)\nfrom qiskit import QuantumCircuit\nArthur = QuantumCircuit(1)\n# Merlin provides a state |1>\nArthur.measure(0, 0)\n# Arthur verifies if it was |1>",
        cirq: "# Variational Quantum Eigensolvers (VQE) are heuristic attempts to solve QMA-hard problems."
      },
      realWorldApplications: [
        { title: "Quantum Chemistry", explanation: "Determining if a specific molecular configuration is the absolute 'ground state' or just a local minimum." }
      ],
      commonMistakes: [
        { mistake: "Thinking a quantum computer can find any ground state.", correction: "No. Finding a ground state of a general local Hamiltonian is QMA-complete, meaning it's likely hard for quantum computers too. We usually use 'approximate' methods (heuristics)." }
      ],
      summary: [
        "QMA is the 'Quantum NP'.",
        "It involves a powerful prover (Merlin) and a quantum verifier (Arthur).",
        "Arthur can check complex quantum proofs in polynomial time.",
        "The Local Hamiltonian Problem is the 'hardest' problem in QMA.",
        "QMA helps define the limits of quantum chemistry and physics."
      ],
      quiz: {
        topicId: "L8-T2",
        questions: [
          {
            question: "Which class is the quantum equivalent of the classical NP class?",
            options: ["BQP", "QMA", "BPP", "P"],
            correctIndex: 1,
            explanation: "QMA (Quantum Merlin-Arthur) is the class where solutions can be verified efficiently by a quantum computer."
          },
          {
            question: "Who is 'Arthur' in the Merlin-Arthur complexity model?",
            options: ["The person who built the computer.", "A probabilistic classical computer.", "A BQP-capable quantum computer that verifies the proof.", "The user who buys the computer."],
            correctIndex: 2,
            explanation: "Arthur represents the verifier who uses a quantum computer to check the proof provided by Merlin."
          },
          {
            question: "What is the most famous QMA-complete problem?",
            options: ["Factoring numbers.", "Searching a database.", "The Local Hamiltonian Problem (Finding ground state energies).", "Playing Chess."],
            correctIndex: 2,
            explanation: "Finding the ground state energy of a local Hamiltonian is the benchmark problem for QMA-completeness."
          }
        ]
      }
    }
  },
  {
    id: "L8-T3",
    levelId: 8,
    name: "Quantum Speedup",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L8-T1", name: "Complexity Classes" }] },
      whatYouWillLearn: [
        "The different tiers of speedup: Linear, Polynomial, and Exponential.",
        "Distinguishing between 'Proven' and 'Heuristic' advantage.",
        "The impact of hardware noise on theoretical speedup.",
        "Case studies: Grover vs Shor."
      ],
      introduction: "Not all quantum advantages are created equal. In the world of quantum engineering, we categorize speedups based on their scaling. A **Linear speedup** (2x faster) is often not worth the cost of a million-dollar quantum freezer. A **Polynomial speedup** (e.g., $n^2$ faster) is very significant for large data. But the **Exponential speedup** ($2^n$ vs $n^k$) is the 'holy grail' that makes the impossible trivial.\n\nDemonstrating this speedup in the real world is known as 'Quantum Supremacy' or 'Quantum Advantage'. It requires finding a problem where the quantum algorithm's runtime grows so slowly that it leaves the world's fastest supercomputer in the dust as soon as the input size exceeds a certain threshold.",
      whyItMatters: "Economic ROI. If you are a bank or a lab, you need to know if a quantum computer will solve your problem in seconds (Exponential) or just a little faster than your GPU (Polynomial). This determines your investment strategy.",
      keyConcepts: [
        {
          heading: "Polynomial Speedup (Quadratic)",
          description: "Classical: $O(N)$, Quantum: $O(\\sqrt{N})$. Found in Grover's algorithm. Significant for big data, but doesn't break encryption."
        },
        {
          heading: "Exponential Speedup",
          description: "Classical: $O(2^n)$, Quantum: $O(n^k)$. Found in Shor's algorithm and Chemistry. This is what makes quantum computing revolutionary."
        },
        {
          heading: "Amdahl's Law (Quantum)",
          description: "Even if your quantum processor is infinitely fast, your total runtime is limited by the 'slow' classical parts of your code (loading data, reading results)."
        }
      ],
      mathematics: "$$ \\text{Speedup Factor } S = \\frac{\\text{Classical Time}}{\\text{Quantum Time}} = \\frac{2^n}{n^3} \\text{ (for Shor's)} $$",
      analogy: "Polynomial speedup is like upgrading from a horse to a car. Exponential speedup is like upgrading from a horse to a Star Trek transporter. One is an improvement; the other is a complete shift in reality.",
      visualType: "PROBABILITY_HISTOGRAM",
      codeImplementation: {
        qiskit: "import time\n# Timing a quantum simulator vs classical python loop\nstart = time.time()\n# [Run Quantum Code]\nprint(f'Runtime: {time.time() - start}s')",
        cirq: "# Benchmarking 'Cross-Entropy Benchmarking' (XEB) used in Google's supremacy paper."
      },
      realWorldApplications: [
        { title: "RSA Migration", explanation: "Knowing that Shor's algorithm provides exponential speedup is why we are currently rewriting the security of the entire global financial system." }
      ],
      commonMistakes: [
        { mistake: "Assuming quantum is faster for everything.", correction: "Quantum computers have slow 'clock speeds' compared to your CPU. They are only faster for problems where the *algorithm* scales better, not because the *hardware* is faster." }
      ],
      summary: [
        "Exponential speedup is the primary goal of the field.",
        "Polynomial speedup (Grover) is useful but less revolutionary.",
        "Quantum advantage is a function of problem size (scaling).",
        "Hardware overhead (noise) can cancel out theoretical speedup for small problems.",
        "Shor's algorithm is the most famous example of exponential separation."
      ],
      quiz: {
        topicId: "L8-T3",
        questions: [
          {
            question: "Which type of speedup is required to make a problem that takes a billion years classical solvable in minutes quantumly?",
            options: ["Linear.", "Quadratic.", "Exponential.", "None."],
            correctIndex: 2,
            explanation: "Only exponential speedup can bridge the gap between geological timescales and human timescales as the input size grows."
          },
          {
            question: "What is 'Quantum Supremacy'?",
            options: ["The point where quantum computers can think like humans.", "The point where a quantum computer solves a problem impossible for any classical supercomputer.", "A brand of quantum hardware.", "A new type of qubit."],
            correctIndex: 1,
            explanation: "Quantum supremacy refers to the first experimental demonstration of a task where a quantum processor outperforms the best classical alternatives."
          },
          {
            question: "True or False: A quantum computer is faster than a classical computer at simple addition.",
            options: ["True.", "False (Classical CPUs are much faster at simple arithmetic)."],
            correctIndex: 1,
            explanation: "Classical processors have much higher clock speeds and lower error rates for basic operations like adding two numbers."
          }
        ]
      }
    }
  },
  {
    id: "L8-T4",
    levelId: 8,
    name: "Oracle Problems",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L7-T1", name: "Algorithm Design Principles" }] },
      whatYouWillLearn: [
        "The 'Oracle Model' of computation.",
        "Why we use Black Boxes to prove mathematical advantage.",
        "Query Complexity vs Gate Complexity.",
        "The difference between Boolean and Phase Oracles."
      ],
      introduction: "In quantum complexity, an **Oracle** is a 'black box' function. We don't care how the box is built; we only care how many times we have to 'ask it a question' (query it) to find a solution. This model allows researchers to prove that quantum computers are fundamentally better without worrying about specific hardware limitations.\n\nMost quantum speedups are proven in the 'Oracle Model'. For example, Grover's algorithm proves that you only need $\sqrt{N}$ queries to an oracle to find a result, whereas a classical computer MUST use $N$ queries. By focusing on the 'cost of information' rather than the 'cost of gates', we can build a rock-solid mathematical foundation for quantum advantage.",
      whyItMatters: "Proving Superiority. Oracles provide a clean 'playground' where we can prove that no possible classical algorithm can ever match a quantum one, regardless of how fast classical computers become in the future.",
      keyConcepts: [
        {
          heading: "Black-Box Model",
          description: "A model where the internal logic of a function is hidden. You only have access to its inputs and outputs."
        },
        {
          heading: "Boolean Oracle",
          description: "Maps $|x, y\rangle$ to $|x, y \oplus f(x)\rangle$. This is the standard way to implement a classical function on a quantum computer."
        },
        {
          heading: "Phase Oracle",
          description: "Maps $|x\rangle$ to $(-1)^{f(x)}|x\rangle$. This is the 'Quantum-Native' way to mark an answer using interference."
        }
      ],
      mathematics: "$$ O_f |x\\rangle |y\\rangle = |x\\rangle |y \\oplus f(x)\\rangle \\quad \\text{(Boolean Oracle)} $$\\n$$ U_f |x\\rangle = (-1)^{f(x)} |x\\rangle \\quad \\text{(Phase Oracle)} $$",
      analogy: "An Oracle is like a locked safe with a digital keypad. You can't see the gears inside (the logic), but you can try codes (inputs) and see if the light turns green (output). Oracle complexity counts how many 'button presses' you need to open the safe.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit.circuit.library import PhaseOracle\n# Creating an oracle from a logical expression\noracle = PhaseOracle('A & B & ~C')\nqc = QuantumCircuit(3)\nqc.append(oracle, [0, 1, 2])\nprint('Phase Oracle Created.')",
        cirq: "import cirq\n# Custom Gates in Cirq are used to represent black-box oracles."
      },
      realWorldApplications: [
        { title: "Database Search", explanation: "Treating an un-indexed dataset as an oracle to find specific patterns without pre-processing." }
      ],
      commonMistakes: [
        { mistake: "Thinking an oracle is a 'real' physical device.", correction: "In a real program, the 'oracle' is just a subroutine you wrote. We call it an oracle when we want to analyze how many times that subroutine is called." }
      ],
      summary: [
        "Oracles are black-box functions used to analyze complexity.",
        "We measure efficiency by counting 'queries' (calls to the box).",
        "Phase oracles are more efficient for quantum interference than Boolean ones.",
        "Oracle proofs provide the mathematical evidence for quantum advantage.",
        "Quantum computers can 'see' through oracles with fewer queries than classical ones."
      ],
      quiz: {
        topicId: "L8-T4",
        questions: [
          {
            question: "In complexity theory, what is an 'Oracle'?",
            options: ["A wise person.", "A black-box function where we only count the number of calls.", "A type of quantum processor.", "A classical database."],
            correctIndex: 1,
            explanation: "An oracle is a mathematical abstraction of a function where we measure efficiency based on the number of queries made to it."
          },
          {
            question: "Which type of oracle is typically used to 'mark' a state with a negative sign for interference?",
            options: ["Boolean Oracle.", "Phase Oracle.", "Measurement Oracle.", "Classical Oracle."],
            correctIndex: 1,
            explanation: "A Phase Oracle applies a $(-1)$ phase to the target states, which is essential for quantum algorithms like Grover's."
          },
          {
            question: "What is 'Query Complexity'?",
            options: ["How many qubits a program uses.", "The number of gates in a circuit.", "The number of times an algorithm must call an oracle to solve a problem.", "The length of the code."],
            correctIndex: 2,
            explanation: "Query complexity specifically counts the 'calls' to a function or oracle, ignoring the cost of the gates inside the call."
          }
        ]
      }
    }
  },
  {
    id: "L8-T5",
    levelId: 8,
    name: "Query Complexity",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L8-T4", name: "Oracle Problems" }] },
      whatYouWillLearn: [
        "The mathematical study of lower bounds for quantum search.",
        "The Adversary Method vs the Polynomial Method.",
        "Why $O(\sqrt{N})$ is the absolute limit for unstructured search.",
        "Comparing classical $O(N)$ query limits to quantum ones."
      ],
      introduction: "Query complexity is the rigorous mathematical study of the 'speed limits' of the universe. It asks: 'What is the absolute minimum number of questions needed to solve this problem, no matter how clever the algorithm is?' \n\nFor example, we have proven that searching an unstructured database takes at least $\sqrt{N}$ quantum queries. This means no one will ever find a quantum algorithm that searches faster than Grover's. This field uses advanced tools like the **Polynomial Method** (treating circuits as large polynomials) and the **Adversary Method** (imagining an opponent who changes the oracle's data to confuse you) to find these hard limits.",
      whyItMatters: "Avoiding Dead Ends. Query complexity prevents scientists from wasting decades trying to find 'Magic' algorithms that are mathematically impossible. It defines the 'Ultimate Performance' possible with quantum logic.",
      keyConcepts: [
        {
          heading: "Lower Bounds",
          description: "The mathematical proof that a problem *cannot* be solved in fewer than $K$ steps. $K = \sqrt{N}$ is the lower bound for search."
        },
        {
          heading: "Polynomial Method",
          description: "A technique where we prove that since a quantum circuit of $T$ queries can be represented by a polynomial of degree $2T$, and that polynomial needs a certain degree to match the problem, $T$ must be at least $X$."
        },
        {
          heading: "Adversary Method",
          description: "A method that measures how much 'information' a single query can extract. Since a query only gives a small amount of info, you need at least $T$ queries to solve the puzzle."
        }
      ],
      mathematics: "$$ Q(f) \\geq \\Omega(\\sqrt{N}) \\text{ for unstructured search.} $$\\nQuantum query complexity is often denoted as $$ Q(f) $$.",
      analogy: "Query complexity is like the speed of light for computers. No matter how powerful your engine is, you can't go faster than light. Query complexity proves that no matter how clever your gates are, you can't find a needle in a haystack faster than the 'square root' speed limit.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "# We can test query complexity by counting oracle calls in a loop\nfor i in range(int(np.sqrt(N))):\n    qc.append(oracle, qubits)\n    qc.append(diffuser, qubits)",
        cirq: "# Complexity analysis of 'Parity' and 'Majority' functions is a common task in Cirq research."
      },
      realWorldApplications: [
        { title: "Algorithm Efficiency", explanation: "Informing developers exactly how much speedup they can expect when migrating a database to a quantum cloud." }
      ],
      commonMistakes: [
        { mistake: "Confusing Query Complexity with Runtime.", correction: "Query complexity only counts the number of calls to a specific function. A low query complexity might still have a slow runtime if the gates *between* the queries are very complex." }
      ],
      summary: [
        "Query complexity defines the absolute mathematical limits of algorithms.",
        "Polynomial and Adversary methods are the primary tools for proof.",
        "Grover's search is proven to be 'Optimal' (cannot be beat).",
        "Linear speedup is common, but 'Exponential' query separation is rare.",
        "It provides the 'Speed Limit' for the quantum era."
      ],
      quiz: {
        topicId: "L8-T5",
        questions: [
          {
            question: "What is the proven lower bound for searching an unstructured list of N items using a quantum computer?",
            options: ["$O(1)$", "$O(\log N)$", "$O(\sqrt{N})$", "$O(N)$"],
            correctIndex: 2,
            explanation: "It is mathematically proven that no quantum algorithm can search an unstructured list in fewer than $\sqrt{N}$ queries."
          },
          {
            question: "Which mathematical method treats a quantum circuit as a high-degree polynomial to prove complexity limits?",
            options: ["The Adversary Method.", "The Polynomial Method.", "The HHL Method.", "The Phase Method."],
            correctIndex: 1,
            explanation: "The Polynomial Method is a core tool in quantum complexity that maps the action of gates to the degree of a polynomial."
          },
          {
            question: "What does a 'Lower Bound' represent?",
            options: ["The easiest way to solve a problem.", "The minimum possible resource cost to solve a problem, proven mathematically.", "The worst possible computer.", "A type of quantum error."],
            correctIndex: 1,
            explanation: "A lower bound is a mathematical proof that no algorithm can ever perform better than a certain limit."
          }
        ]
      }
    }
  },
  {
    id: "L8-T6",
    levelId: 8,
    name: "Hidden Subgroup Problem",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L7-T5", name: "Simons Algorithm" }] },
       whatYouWillLearn: [
        "The unifying framework for many quantum algorithms.",
        "Finding subgroups of a group $G$ using a hiding function.",
        "How Deutsch-Jozsa, Simon's, and Shor's are all 'HSP' problems.",
        "The Abelian vs Non-Abelian HSP divide."
      ],
      introduction: "The Hidden Subgroup Problem (HSP) is the 'Grand Unified Theory' of quantum algorithms. It turns out that almost every famous quantum speedup—from Deutsch-Jozsa to Shor's Factoring—is actually just a special case of the HSP.\n\nThe problem is this: You have a group $G$ (like integers or bitstrings) and a function $f$ that is 'constant' on the members of a hidden subgroup $H$. Your goal is to find $H$. Quantum computers are spectacularly good at solving this for 'Abelian' (ordered) groups. This is why we can break RSA but struggle to break other types of codes. If we can solve the 'Non-Abelian' HSP, we could potentially solve the Graph Isomorphism problem and change the face of computer science.",
      whyItMatters: "Unlocking Shor's. Shor's algorithm is just the HSP solved for the group of integers modulo $N$. Understanding the HSP allows you to see the underlying pattern behind all quantum speedups.",
      keyConcepts: [
        {
          heading: "Group Theory Foundation",
          description: "Algorithms are mapped to abstract mathematical structures called Groups. Speedup occurs when the quantum state can 'vibrate' along the symmetry of the group."
        },
        {
          heading: "Abelian HSP",
          description: "Groups like addition and multiplication. Solvable in polynomial time using the Quantum Fourier Transform."
        },
        {
          heading: "Non-Abelian HSP",
          description: "Complex groups like permutations. Currently a major research frontier; if solved, it would lead to even more 'Supremacy' results."
        }
      ],
      mathematics: "$$ f(x) = f(y) \\iff x - y \\in H \\quad \\text{(where } H \\text{ is the hidden subgroup)} $$",
      analogy: "Imagine a giant building with a repeating architectural pattern (the subgroup). A classical architect has to measure every brick to find the pattern. A quantum architect uses a 'Fourier prism' (QFT) that causes the entire building to project a single shadow that perfectly reveals the hidden blueprint.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit_algorithms import Simon\n# Simon's is the simplest case of HSP on bitstrings.\nprint('HSP-Abelian Framework Ready.')",
        cirq: "import cirq\n# Research into Non-Abelian HSP using 'Graph' representations in Cirq."
      },
      realWorldApplications: [
        { title: "Cryptography Design", explanation: "Post-Quantum Cryptography (PQC) like 'Lattice-based' encryption is designed specifically to be hard for HSP solvers." }
      ],
      commonMistakes: [
        { mistake: "Thinking HSP is a single algorithm.", correction: "It is a PROBLEM CLASS. Many different algorithms (Shor, Simon, etc.) are just specific ways to solve different versions of the HSP." }
      ],
      summary: [
        "HSP is the mathematical framework for most quantum speedups.",
        "Shor's and Simon's are specific examples of the Abelian HSP.",
        "Quantum computers solve Abelian HSP exponentially faster than classical ones.",
        "Non-Abelian HSP remains one of the great unsolved challenges of the field.",
        "It relies heavily on the Quantum Fourier Transform to reveal symmetries."
      ],
      quiz: {
        topicId: "L8-T6",
        questions: [
          {
            question: "Which of the following algorithms is a special case of the Hidden Subgroup Problem?",
            options: ["Grover's Search.", "Shor's Factoring Algorithm.", "Teleportation.", "Error Correction."],
            correctIndex: 1,
            explanation: "Shor's algorithm solves the HSP for the group of integers under modular multiplication."
          },
          {
            question: "For which type of mathematical groups can quantum computers solve the HSP efficiently?",
            options: ["Abelian (Commutative) groups.", "Non-Abelian groups.", "Infinite groups.", "No groups."],
            correctIndex: 0,
            explanation: "Quantum computers have a proven exponential speedup for the Abelian HSP using the QFT."
          },
          {
            question: "What is the 'Hiding Function' in the HSP model?",
            options: ["A function that deletes data.", "A function that is constant on each 'coset' of the hidden subgroup.", "A function that creates noise.", "A type of quantum gate."],
            correctIndex: 1,
            explanation: "The function $f$ 'hides' the subgroup by giving the same output for any two inputs that differ by an element of the subgroup."
          }
        ]
      }
    }
  },
  {
    id: "L8-T7",
    levelId: 8,
    name: "Hamiltonian Simulation",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L2-T2", name: "State Vectors and Bra-Ket" }] },
      whatYouWillLearn: [
        "Feynman's original vision: Using quantum to simulate quantum.",
        "The Schrodinger equation in matrix form.",
        "Trotterization: Breaking time evolution into discrete gates.",
        "Why classical computers fail at simulating many-body physics."
      ],
      introduction: "In 1982, Richard Feynman proposed the idea of a quantum computer specifically because classical computers were 'just not good enough' at simulating nature. Nature is quantum, and if you want to simulate a quantum system (like an atom or a drug molecule), you need a computer that speaks the same language.\n\n**Hamiltonian Simulation** is the process of mapping a physical system's energy (its Hamiltonian $H$) onto the qubits of a processor and 'evolving' them through time. Because the complexity of a quantum state grows exponentially with the number of particles, a quantum computer is the only tool that can accurately predict how new materials will behave before we build them in a lab.",
      whyItMatters: "The Real ROI. Most experts believe the first $100 Billion industry for quantum computing will be in 'Quantum Simulation' for chemistry, battery design, and material science.",
      keyConcepts: [
        {
          heading: "Time Evolution Operator",
          description: "The math that moves a state forward in time: $U(t) = e^{-iHt}$. Calculating this for large $H$ is the core task."
        },
        {
          heading: "Trotter-Suzuki Decomposition",
          description: "A method to approximate $e^{-i(A+B)t}$ by alternating between $e^{-iAt}$ and $e^{-iBt}$ in small steps. This turns physics into a circuit of gates."
        },
        {
          heading: "Many-Body Problem",
          description: "Simulating 50 electrons classically requires petabytes of RAM; a quantum computer does it with 50 qubits."
        }
      ],
      mathematics: "$$ i \\hbar \\frac{d}{dt} |\\psi(t)\\rangle = H |\\psi(t)\\rangle \\implies |\\psi(t)\\rangle = e^{-iHt/\\hbar} |\\psi(0)\\rangle $$",
      analogy: "Simulating a molecule on a classical computer is like trying to describe a symphony using only text messages. Simulating it on a quantum computer is like having the actual orchestra play the music. You are using the same 'physical medium' to represent the data.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit.circuit.library import PauliEvolutionGate\nfrom qiskit.quantum_info import SparsePauliOp\n# Defining a Hamiltonian (Energy function)\nH = SparsePauliOp(['ZZ', 'XX'], [1.0, 0.5])\nevo = PauliEvolutionGate(H, time=1.0)\nqc = QuantumCircuit(2)\nqc.append(evo, [0, 1])\nprint('Hamiltonian Evolution Circuit Created.')",
        cirq: "import cirq\n# Cirq.TrotterizedEvolution for physics simulations."
      },
      realWorldApplications: [
        { title: "Nitrogen Fixation", explanation: "Simulating the FeMoco molecule to find a more efficient way to make fertilizer, which currently consumes 2% of global energy." },
        { title: "Superconductivity", explanation: "Simulating the 'Hubbard Model' to find materials that conduct electricity with zero loss at room temperature." }
      ],
      commonMistakes: [
        { mistake: "Assuming simulation is just 'running code'.", correction: "Quantum simulation is an analog-like process where the qubits literally 'become' the system you are studying. It is fundamentally different from a digital simulation." }
      ],
      summary: [
        "Feynman's 'Original Purpose' for quantum computers.",
        "Exponentially more efficient at simulating many-body physics than classical machines.",
        "Uses Trotterization to turn continuous time into discrete gates.",
        "Essential for chemistry, materials science, and drug discovery.",
        "The Hamiltonian represents the total energy of the system being studied."
      ],
      quiz: {
        topicId: "L8-T7",
        questions: [
          {
            question: "Who originally proposed quantum computing as a tool for simulating nature?",
            options: ["Bill Gates.", "Richard Feynman.", "Alan Turing.", "Albert Einstein."],
            correctIndex: 1,
            explanation: "Richard Feynman's 1982 talk is widely cited as the birth of the idea of using quantum systems to simulate other quantum systems."
          },
          {
            question: "What is 'Trotterization'?",
            options: ["A way to speed up the internet.", "A method for approximating complex time-evolution by breaking it into small, alternating gate steps.", "A type of qubit cooling.", "A measurement technique."],
            correctIndex: 1,
            explanation: "Trotterization allows us to simulate Hamiltonians that contain non-commuting terms by alternating small slices of time."
          },
          {
            question: "Why is a classical computer bad at simulating 100 entangled electrons?",
            options: ["It runs out of electricity.", "The number of parameters needed to describe the state grows exponentially ($2^{100}$), which is more than any classical memory can hold.", "Electrons are too small for silicon.", "Classical computers can't do math with complex numbers."],
            correctIndex: 1,
            explanation: "The 'State Explosion' problem means that adding just one electron doubles the memory required, leading to an impossible $2^n$ scaling for classical hardware."
          }
        ]
      }
    }
  },
  {
    id: "L8-T8",
    levelId: 8,
    name: "The Solovay-Kitaev Theorem",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L5-T4", name: "Universal Gate Sets" }] },
      whatYouWillLearn: [
        "The proof that a small set of gates can approximate any calculation.",
        "How to build any 'Custom' rotation from a fixed 'Universal' set.",
        "Logarithmic efficiency in gate approximation.",
        "Why this theorem makes quantum hardware feasible."
      ],
      introduction: "Imagine you want to build a house, but your hardware store only sells three specific brick shapes. Can you still build *any* house design? The **Solovay-Kitaev Theorem** is the mathematical 'Yes' to that question for quantum computers. It proves that any possible unitary transformation (any gate you can imagine) can be approximated to arbitrary precision using only a small, fixed set of universal gates (like {H, T, CNOT}).\n\nThis is a critical bridge between theory and engineering. It means we don't need to build a new machine for every new algorithm. We only need to master 3 or 4 physical operations, and the Solovay-Kitaev algorithm will tell us exactly how to 'mash' those gates together to simulate any other operation we need.",
      whyItMatters: "Hardware Standardization. We don't need to build a 'Square Root of X' gate or a '1.23-degree Rotation' gate. We just build the standard set, and the compiler handles the rest.",
      keyConcepts: [
        {
          heading: "Approximation Error ($\epsilon$)",
          description: "We can never be 'perfect' with a finite gate set, but we can get as close as we want. The theorem tells us how many gates we need to reach a specific error limit."
        },
        {
          heading: "Polylogarithmic Scaling",
          description: "The number of gates needed grows as $\log(1/\epsilon)$. This is incredibly efficient; to get twice as precise, you only need a few more gates, not millions more."
        },
        {
          heading: "The Standard Set {H, S, T, CX}",
          description: "This is the most common universal set. The T-gate is the 'secret ingredient' that allows us to reach any point on the Bloch sphere."
        }
      ],
      mathematics: "$$ \\text{Number of gates } N \\approx O(\\log^c(1/\\epsilon)) $$\\nWhere $c$ is a small constant (usually around 2-4).",
      analogy: "It's like using only the colors Red, Blue, and Yellow to create every possible shade of the rainbow. By mixing them in specific amounts (sequences), you can get close enough to 'Purple' that the human eye (the measurement) can't tell the difference.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import transpile\n# Qiskit uses Solovay-Kitaev-style logic in its 'transpiler' passes\n# to break down custom rotations into hardware-native gates.\nprint('Standardized Transpilation Pass Active.')",
        cirq: "import cirq\n# Cirq.decompose() is the tool for applying this theorem to circuits."
      },
      realWorldApplications: [
        { title: "Compiler Design", explanation: "Writing software that automatically optimizes high-level algorithms into the specific 'bricks' supported by IBM or Google's chips." }
      ],
      commonMistakes: [
        { mistake: "Thinking you can perfectly replicate a gate.", correction: "You can't. It is always an approximation. However, the theorem guarantees we can make the error smaller than the noise of the universe, making it 'effectively' perfect." }
      ],
      summary: [
        "Proves that a finite set of gates is 'Universal'.",
        "Allows hardware designers to focus on 3-4 high-quality gates.",
        "Approximation error scales very efficiently (logarithmically).",
        "The 'T-gate' is usually the bottleneck for these approximations.",
        "Connects abstract math rotations to real-world hardware bricks."
      ],
      quiz: {
        topicId: "L8-T8",
        questions: [
          {
            question: "What does the Solovay-Kitaev Theorem prove?",
            options: ["That quantum computers will never work.", "That any unitary gate can be efficiently approximated by a small set of universal gates.", "That prime numbers are infinite.", "That electricity is better than light."],
            correctIndex: 1,
            explanation: "It is the fundamental theorem that allows us to build universal quantum computers from a discrete set of basic gates."
          },
          {
            question: "How does the number of gates grow as you demand more precision ($\epsilon$)?",
            options: ["Linearly.", "Exponentially.", "Polylogarithmically ($O(\log(1/\epsilon))$).", "It doesn't grow."],
            correctIndex: 2,
            explanation: "The efficiency of the theorem comes from its logarithmic scaling; you only need slightly more gates to get significantly higher precision."
          },
          {
            question: "Which of the following is NOT part of a standard universal gate set?",
            options: ["Hadamard (H).", "T-gate.", "CNOT.", "The 'Print' gate."],
            correctIndex: 3,
            explanation: "H, T, and CNOT are standard universal building blocks. 'Print' is a classical software command, not a quantum unitary operation."
          }
        ]
      }
    }
  }
];

export const LEVEL_8_QUIZZES = {}; // Kept for legacy compatibility
