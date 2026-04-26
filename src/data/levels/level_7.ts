import { Topic, QuizQuestion } from '../types';

export const LEVEL_7_TOPICS: Topic[] = [
  {
    id: "L7-T1",
    levelId: 7,
    name: "Algorithm Design Principles",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L5-T8", name: "Interference in Circuits" }] },
      whatYouWillLearn: [
        "The fundamental three-stage structure of quantum algorithms.",
        "Understanding Quantum Parallelism vs. Classical Parallelism.",
        "The role of constructive and destructive interference in finding answers.",
        "The concept of 'marking' states via phase inversion."
      ],
      introduction: "Quantum algorithm design is not about 'trying all answers at once'—a common misconception. Instead, it is the art of wave orchestration. While a classical algorithm moves step-by-step toward a solution, a quantum algorithm initializes a massive superposition of all possible answers and then uses interference to cancel out the wrong ones. Most successful quantum algorithms follow a strict pattern: Initialization, Oracle (evaluation), and Interference (amplification).",
      whyItMatters: "Traditional logic (if/else) does not translate directly to quantum speedups. You must learn to think in terms of global properties of functions rather than individual evaluations.",
      keyConcepts: [
        {
          heading: "The Three-Stage Framework",
          description: "1. State Preparation: Creating a uniform superposition of all inputs. 2. Oracle: Flipping the phase of the 'correct' answer. 3. Interference: Using a 'Diffuser' to turn that phase difference into a measurable probability difference."
        },
        {
          heading: "Quantum Parallelism",
          description: "A single application of a quantum gate $U_f$ to a superposition of $N$ states calculates the value of $f(x)$ for all $N$ inputs simultaneously. However, you can only measure one result, making interference necessary to reveal useful information."
        },
        {
          heading: "BQP Complexity",
          description: "Quantum algorithms seek to move problems from exponential time to polynomial time (e.g., from NP to BQP), proving that some tasks are natively 'easy' for quantum logic but 'impossible' for classical logic."
        }
      ],
      mathematics: "$$ |\\psi\\rangle = \\frac{1}{\\sqrt{N}} \\sum_{x=0}^{N-1} |x\\rangle \\xrightarrow{U_f} \\frac{1}{\\sqrt{N}} \\sum_{x=0}^{N-1} (-1)^{f(x)} |x\\rangle $$",
      analogy: "Imagine a dark room full of thousands of tuning forks. A classical computer hits each fork one by one to find the one with the right pitch. A quantum computer hums at the right frequency, and the correct tuning fork starts vibrating through resonance while the others stay silent.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# Basic 'Skeleton' of a Quantum Algorithm\nqc = QuantumCircuit(3)\nqc.h([0, 1, 2]) # 1. Prepare Superposition\n# ... 2. Apply Oracle (Black Box) ...\n# ... 3. Apply Interference (Amplification) ...\nqc.h([0, 1, 2]) # 4. Return to computational basis\nprint(qc.draw())",
        cirq: "import cirq\nq = cirq.LineQubit.range(3)\ncircuit = cirq.Circuit(\n    cirq.H.on_each(*q), # Step 1: Parallelize\n    # Oracles and Diffusers go here\n)"
      },
      realWorldApplications: [
        { title: "Database Search", explanation: "Grover's algorithm uses these principles to find an entry in an unsorted list of $N$ items in $\\sqrt{N}$ steps." },
        { title: "Cryptography", explanation: "Shor's algorithm uses interference to find the period of a function, which reveals the factors of a large number." }
      ],
      commonMistakes: [
        { mistake: "Thinking you can 'read' all the parallel results.", correction: "Measurement collapses the state. You only ever get one answer. The 'magic' is making sure that answer is the right one with high probability." }
      ],
      summary: [
        "Quantum algorithms rely on wave interference, not just speed.",
        "Oracles are used to mark 'correct' solutions within a superposition.",
        "The goal is to amplify the probability of measuring the correct state.",
        "BQP is the class of problems solvable efficiently by these methods."
      ],
      quiz: {
        topicId: "L7-T1",
        questions: [
          {
            question: "What is the primary purpose of 'Interference' in a quantum algorithm?",
            options: ["To slow down the computer.", "To amplify the probability of the correct answer and cancel out wrong ones.", "To create a random result.", "To delete the qubits."],
            correctIndex: 1,
            explanation: "Interference is the mechanism that allows us to distinguish the 'marked' state from the noise of the incorrect ones."
          },
          {
            question: "Why can't we just use 'Quantum Parallelism' to see all values of f(x) at once?",
            options: ["The computer doesn't have enough memory.", "Measurement collapses the superposition into a single random state.", "It is illegal in physics.", "The data is too small."],
            correctIndex: 1,
            explanation: "While the computer calculates all values, measurement forces the system to choose one, losing the others. Interference is required to 'guide' that choice."
          },
          {
            question: "Which complexity class contains problems solvable efficiently on a quantum computer?",
            options: ["P", "NP", "BQP", "EXPTIME"],
            correctIndex: 2,
            explanation: "BQP (Bounded-error Quantum Polynomial time) is the class of problems with efficient quantum solutions."
          }
        ]
      }
    }
  },
  {
    id: "L7-T2",
    levelId: 7,
    name: "Deutsch Algorithm",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L7-T1", name: "Algorithm Design Principles" }] },
      whatYouWillLearn: [
        "The first mathematical proof of quantum speedup.",
        "Identifying global properties of a function (Constant vs. Balanced).",
        "The role of the auxiliary qubit (ancilla).",
        "Understanding Phase Kickback in its simplest form."
      ],
      introduction: "The Deutsch Algorithm (1985) is the 'Hello World' of quantum speedup. It solves a simple puzzle: Given a hidden function $f(x)$ that takes one bit and returns one bit, is the function 'Constant' (returns the same value for both 0 and 1) or 'Balanced' (returns different values)? A classical computer MUST check $f(0)$ and $f(1)$ (two queries). A quantum computer solves it in exactly ONE query.",
      whyItMatters: "While the problem itself is trivial, it was the first time we proved that quantum logic is fundamentally more efficient than classical logic. It paved the way for all modern algorithms.",
      keyConcepts: [
        {
          heading: "Constant vs. Balanced",
          description: "Constant: $f(0) = f(1)$ (both 0 or both 1). Balanced: $f(0) \\neq f(1)$ (one is 0, the other is 1)."
        },
        {
          heading: "Phase Kickback",
          description: "By preparing an auxiliary qubit in the $|-\\rangle$ state, the output of the function $f(x)$ is 'kicked back' as a phase $(-1)^{f(x)}$ onto the main qubit. This allows us to measure a global property without knowing the individual values."
        }
      ],
      mathematics: "$$ |\\psi_{final}\\rangle = \\pm |f(0) \\oplus f(1)\\rangle |-\\rangle $$ \nIf measured as 0, the function is Constant. If 1, it is Balanced.",
      analogy: "Imagine you have two boxes, and you want to know if they contain the same thing. Classically, you have to open both boxes. Quantumly, you can weigh them against each other on a scale; the scale tells you if they are equal or different without you ever seeing what is inside.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(2, 1)\nqc.x(1); qc.h([0, 1]) # Setup: |+> and |->\n# --- Oracle for f(x) = x (Balanced) ---\nqc.cx(0, 1)\n# -------------------------------------\nqc.h(0); qc.measure(0, 0)\nprint('Measurement 1 = Balanced, 0 = Constant')",
        cirq: "import cirq\nq0, q1 = cirq.LineQubit.range(2)\n# Deutsch Circuit in Cirq\nc = cirq.Circuit(cirq.X(q1), cirq.H(q0), cirq.H(q1), cirq.CNOT(q0, q1), cirq.H(q0))"
      },
      realWorldApplications: [
        { title: "Theoretical Foundation", explanation: "Proving that quantum information is not just 'faster' but 'differently powerful'." }
      ],
      commonMistakes: [
        { mistake: "Thinking it tells you the value of f(0).", correction: "Deutsch only tells you if f(0) equals f(1). It reveals a relationship, not the raw data." }
      ],
      summary: [
        "Solves a 2-query classical problem in 1 quantum query.",
        "Determines if a function is Constant or Balanced.",
        "Uses Phase Kickback to encode function results into qubit phases.",
        "The first proof of a separation between classical and quantum complexity."
      ],
      quiz: {
        topicId: "L7-T2",
        questions: [
          {
            question: "How many queries does a classical computer need to determine if f(x) is constant or balanced?",
            options: ["1", "2", "3", "Infinite"],
            correctIndex: 1,
            explanation: "A classical computer must evaluate f(0) and f(1) to compare them."
          },
          {
            question: "What is a 'Balanced' function in this context?",
            options: ["A function that always returns 1.", "A function that returns different values for 0 and 1.", "A function that has no output.", "A function that crashes."],
            correctIndex: 1,
            explanation: "A balanced function returns 0 for one input and 1 for the other."
          },
          {
            question: "Which quantum effect allows the function output to affect the main qubit's phase?",
            options: ["Entanglement.", "Phase Kickback.", "Decoherence.", "Superdense Coding."],
            correctIndex: 1,
            explanation: "Phase kickback is the mechanism where the state of a target qubit (usually |->) modifies the phase of the control qubit based on a function."
          }
        ]
      }
    }
  },
  {
    id: "L7-T3",
    levelId: 7,
    name: "Deutsch-Jozsa Algorithm",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L7-T2", name: "Deutsch Algorithm" }] },
      whatYouWillLearn: [
        "Scaling the Deutsch algorithm to $n$ qubits.",
        "Exponential speedup over deterministic classical algorithms.",
        "The structure of the $n$-qubit Hadamard transform.",
        "Oracle design for multi-variable functions."
      ],
      introduction: "The Deutsch-Jozsa algorithm generalizes Deutsch's logic to functions with $n$ input bits. It determines if a function is 'Constant' (returns the same value for all $2^n$ inputs) or 'Balanced' (returns 0 for half the inputs and 1 for the other half). Classically, you might need to check $2^{n-1} + 1$ inputs. Quantumly, you still only need ONE.",
      whyItMatters: "This was the first proof of an **exponential** speedup. For 100 qubits, a classical computer might need to check $2^{99}$ combinations, while a quantum computer needs just one query.",
      keyConcepts: [
        {
          heading: "The n-Qubit Superposition",
          description: "Applying a Hadamard gate to all $n$ qubits creates a uniform superposition of all $2^n$ possible inputs."
        },
        {
          heading: "Constructive vs. Destructive Interference",
          description: "If the function is constant, the interference is perfectly constructive for the $|00...0\\rangle$ state. If balanced, the interference is perfectly destructive, resulting in any state EXCEPT $|00...0\\rangle$."
        }
      ],
      mathematics: "$$ H^{\\otimes n} |0\\rangle^n = \\frac{1}{\\sqrt{2^n}} \\sum_{x=0}^{2^n-1} |x\\rangle $$",
      analogy: "Imagine a stadium with 1,000 doors. You want to know if all doors are locked (Constant) or if exactly 500 are locked (Balanced). A classical person has to check 501 doors. A quantum person 'shouts' into the stadium and listens to the echo; the echo pattern tells them the answer instantly.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# Deutsch-Jozsa for 3 qubits\nqc = QuantumCircuit(4, 3)\nqc.x(3); qc.h([0,1,2,3])\n# --- Oracle (e.g., Balanced) ---\nqc.cx(0, 3); qc.cx(1, 3)\n# ------------------------------\nqc.h([0,1,2]); qc.measure([0,1,2], [0,1,2])",
        cirq: "import cirq\nq = cirq.LineQubit.range(4)\nc = cirq.Circuit(cirq.X(q[3]), cirq.H.on_each(*q))\n# Add Oracle and H-gates here"
      },
      realWorldApplications: [
        { title: "Function Property Testing", explanation: "Used in theoretical computer science to test properties of large-scale Boolean functions." }
      ],
      commonMistakes: [
        { mistake: "Thinking it works for 'mostly balanced' functions.", correction: "The algorithm requires the function to be either perfectly constant or perfectly balanced. It is a 'promise' algorithm." }
      ],
      summary: [
        "Determines global properties of $n$-bit functions.",
        "Provides exponential speedup over classical deterministic search.",
        "Uses interference to distinguish between constant and balanced distributions.",
        "Requires only one query to the oracle."
      ],
      quiz: {
        topicId: "L7-T3",
        questions: [
          {
            question: "For n input bits, how many classical queries are needed in the worst case to be 100% sure if a function is constant or balanced?",
            options: ["1", "n", "2^(n-1) + 1", "2^n"],
            correctIndex: 2,
            explanation: "You could check half the inputs and still not know if the $(2^{n-1} + 1)$-th input flips the result."
          },
          {
            question: "What measurement result indicates that the function is Constant in Deutsch-Jozsa?",
            options: ["All ones.", "All zeros.", "A random string.", "The computer crashes."],
            correctIndex: 1,
            explanation: "If the function is constant, the Hadamard transform returns all qubits to the |0> state."
          },
          {
            question: "What 'promise' does the Deutsch-Jozsa algorithm rely on?",
            options: ["The computer is fast.", "The function is either constant or balanced.", "The user knows the answer.", "The oracle is small."],
            correctIndex: 1,
            explanation: "The algorithm is designed specifically for these two cases and may give incorrect results if the function is neither."
          }
        ]
      }
    }
  },
  {
    id: "L7-T4",
    levelId: 7,
    name: "Bernstein-Vazirani Algorithm",
    type: "theory",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L7-T3", name: "Deutsch-Jozsa Algorithm" }] },
      whatYouWillLearn: [
        "Finding a hidden bit-string (the 'Secret Number').",
        "How a single query extracts $n$ bits of information.",
        "The relationship between the Dot Product and Phase Kickback.",
        "Comparison with classical 'Guess the Number' games."
      ],
      introduction: "The Bernstein-Vazirani algorithm is a masterpiece of efficiency. Suppose there is a secret $n$-bit string $s$. You can ask an oracle to calculate the dot product $f(x) = x \\cdot s \\pmod 2$. Classically, to find the secret string $s$, you must ask $n$ questions (one for each bit). A quantum computer finds $s$ in ONE query.",
      whyItMatters: "It demonstrates that a quantum computer can extract structured information (a string) rather than just a single property (Constant/Balanced) much faster than classical logic allows.",
      keyConcepts: [
        {
          heading: "The Secret String",
          description: "The goal is to find the hidden vector $s$. Classically, you query $x = 001, 010, 100...$ to reveal bits one by one."
        },
        {
          heading: "Phase Oracle",
          description: "The oracle applies the dot product as a phase: $|x\\rangle \\rightarrow (-1)^{x \\cdot s} |x\\rangle$. When you apply the Hadamard transform to this phased superposition, the state literally collapses into the secret string $|s\\rangle$."
        }
      ],
      mathematics: "$$ |\\psi_{final}\\rangle = H^{\\otimes n} \\left( \\frac{1}{\\sqrt{2^n}} \\sum_{x} (-1)^{x \\cdot s} |x\\rangle \\right) = |s\\rangle $$",
      analogy: "Imagine a safe with a 10-digit code. A classical person has to test each digit individually. A quantum person hits the safe with a hammer, and the sound of the 'clink' instantly tells them all 10 digits at once.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\ns = '101' # Secret string\nqc = QuantumCircuit(4, 3)\nqc.x(3); qc.h([0,1,2,3])\n# --- Oracle for s=101 ---\nqc.cx(0, 3); qc.cx(2, 3)\n# -----------------------\nqc.h([0,1,2]); qc.measure([0,1,2], [0,1,2])",
        cirq: "import cirq\nq = cirq.LineQubit.range(4)\n# Bernstein-Vazirani in Cirq\nc = cirq.Circuit(cirq.X(q[3]), cirq.H.on_each(*q))\n# Add CNOTs for the secret string"
      },
      realWorldApplications: [
        { title: "Structured Search", explanation: "Finding patterns in large datasets where the pattern is represented by a linear relationship." }
      ],
      commonMistakes: [
        { mistake: "Thinking it finds any random password.", correction: "It only works if the password evaluation follows the dot-product structure. It is not a general-purpose password cracker." }
      ],
      summary: [
        "Finds a hidden $n$-bit string $s$ in 1 query.",
        "Classical logic requires $n$ queries.",
        "Uses phase kickback to store the bit-string in the phase of a superposition.",
        "The Hadamard transform maps phase-encoded strings back to computational basis strings."
      ],
      quiz: {
        topicId: "L7-T4",
        questions: [
          {
            question: "To find a secret 64-bit string using Bernstein-Vazirani, how many quantum queries are needed?",
            options: ["1", "8", "32", "64"],
            correctIndex: 0,
            explanation: "Regardless of the length of the string, the Bernstein-Vazirani algorithm requires only one quantum query."
          },
          {
            question: "What mathematical operation does the Bernstein-Vazirani oracle perform?",
            options: ["Addition.", "Multiplication.", "Bitwise Dot Product (modulo 2).", "Exponentiation."],
            correctIndex: 2,
            explanation: "The algorithm identifies the secret string used in a dot product operation."
          },
          {
            question: "How does the algorithm reveal the secret string to the user?",
            options: ["By printing it on a screen.", "The measurement of the qubits directly yields the secret string after the final Hadamard transform.", "By guessing until it works.", "It doesn't; it just says it exists."],
            correctIndex: 1,
            explanation: "The final Hadamard gates transform the phase-encoded secret into the physical state of the qubits."
          }
        ]
      }
    }
  },
  {
    id: "L7-T5",
    levelId: 7,
    name: "Simon's Algorithm",
    type: "theory",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L7-T4", name: "Bernstein-Vazirani Algorithm" }] },
      whatYouWillLearn: [
        "Finding a hidden period or 'mask' in a function.",
        "The first proof of exponential speedup over probabilistic classical algorithms.",
        "The concept of 'Periodic' functions in quantum spaces.",
        "The transition from pure quantum circuits to hybrid (Quantum + Linear Algebra)."
      ],
      introduction: "Simon's Algorithm (1994) was the direct inspiration for Shor's algorithm. It addresses a hidden period problem: given a function $f$ such that $f(x) = f(y)$ if and only if $x = y$ or $x = y \\oplus s$, find the secret 'mask' $s$. For a large $n$, a classical computer must check roughly $2^{n/2}$ values. A quantum computer finds it in roughly $O(n)$ queries.",
      whyItMatters: "This was the first time we proved that quantum computers are exponentially faster than **even the best** randomized classical algorithms (BPP). It broke the 'Extended Church-Turing Thesis'.",
      keyConcepts: [
        {
          heading: "The Hidden Mask",
          description: "The function 'repeats' every time you XOR the input with $s$. $s$ is the hidden structure we are trying to uncover."
        },
        {
          heading: "Hybrid Execution",
          description: "Unlike previous algorithms, Simon's doesn't give the answer $s$ directly. Instead, each run gives a vector $y$ such that $y \\cdot s = 0$. After $n$ runs, you solve a system of linear equations classically to find $s$."
        }
      ],
      mathematics: "$$ y \\cdot s \\equiv 0 \\pmod 2 $$ \nThis equation is the foundation of the 'Post-Processing' phase of Simon's algorithm.",
      analogy: "Imagine a dance floor where people only dance in identical pairs. You can't see who is who, but you can see their shadows. By watching a few movements, you can figure out the 'pattern' of who is paired with whom without checking every person.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# Simon's algorithm requires a multi-qubit oracle\n# that preserves the mask property.\nqc = QuantumCircuit(6, 3)\nqc.h([0,1,2])\n# ... Simon's Oracle ...\nqc.h([0,1,2]); qc.measure([0,1,2], [0,1,2])",
        cirq: "# Simon's oracle in Cirq using custom unitary mapping."
      },
      realWorldApplications: [
        { title: "Cryptanalysis", explanation: "Breaking certain symmetric-key cryptographic schemes that rely on the hardness of the hidden shift problem." }
      ],
      commonMistakes: [
        { mistake: "Thinking it gives 's' in one go.", correction: "You must run the quantum part several times ($n$ times) and then use a classical computer to solve the linear system." }
      ],
      summary: [
        "Finds a hidden XOR-mask $s$ in a periodic function.",
        "Exponentially faster than randomized classical algorithms.",
        "Inspired the development of Shor's period-finding algorithm.",
        "Requires classical post-processing (solving linear equations)."
      ],
      quiz: {
        topicId: "L7-T5",
        questions: [
          {
            question: "What problem does Simon's Algorithm solve?",
            options: ["Factoring.", "Finding a hidden XOR period (mask) in a function.", "Sorting a list.", "Simulating molecules."],
            correctIndex: 1,
            explanation: "Simon's algorithm is specifically designed to find the mask 's' where f(x) = f(x + s)."
          },
          {
            question: "How does the speedup of Simon's algorithm compare to classical randomized algorithms?",
            options: ["It is the same.", "It is quadratic (sqrt).", "It is exponential.", "It is slightly slower."],
            correctIndex: 2,
            explanation: "Classical randomized algorithms take $O(2^{n/2})$ steps, while Simon's takes $O(n)$ steps—an exponential gap."
          },
          {
            question: "What must you do after running the quantum circuit in Simon's Algorithm?",
            options: ["Nothing.", "Measure the result and solve a system of linear equations classically.", "Throw away the qubits.", "Reheat the computer."],
            correctIndex: 1,
            explanation: "The quantum part gives constraints on 's', but you need classical math to solve for 's' specifically."
          }
        ]
      }
    }
  },
  {
    id: "L7-T6",
    levelId: 7,
    name: "Phase Oracle Design",
    type: "math",
    estimatedMinutes: 20,
    content: {
      prerequisites: { topics: [{ id: "L4-T8", name: "Multi-Qubit Gates" }] },
      whatYouWillLearn: [
        "Defining a Boolean function as a Phase Oracle.",
        "The difference between Bit Oracles and Phase Oracles.",
        "Implementing Oracles using Z-gates and CNOTs.",
        "The importance of 'Working' vs. 'Clean' ancilla qubits."
      ],
      introduction: "Every algorithm we have studied relies on an 'Oracle'—a black box that knows the answer. But how do you actually build one? In quantum computing, an Oracle is just a circuit that implements a specific Boolean function. A 'Phase Oracle' is particularly useful because it 'marks' the target state by flipping its phase from $|x\\rangle$ to $-|x\\rangle$, which is the language interference understands.",
      whyItMatters: "Building a bad oracle can destroy your speedup. If your oracle is too slow (exponential depth), your algorithm is no longer efficient. Learning to build compact, efficient oracles is the key to quantum software engineering.",
      keyConcepts: [
        {
          heading: "Bit Oracle (U_f)",
          description: "Maps $|x, y\\rangle \\rightarrow |x, y \\oplus f(x)\\rangle$. It stores the answer in a separate qubit. This is the 'raw' form of an oracle."
        },
        {
          heading: "Phase Oracle (U_p)",
          description: "Maps $|x\\rangle \\rightarrow (-1)^{f(x)} |x\\rangle$. It stores the answer in the phase of the input itself. Most algorithms prefer this form."
        },
        {
          heading: "Phase Kickback Trick",
          description: "You can turn any Bit Oracle into a Phase Oracle by setting the target qubit to $|-\\rangle$."
        }
      ],
      mathematics: "$$ U_{\\text{phase}} |x\\rangle = \\begin{cases} -|x\\rangle & \\text{if } f(x)=1 \\\\ |x\\rangle & \\text{if } f(x)=0 \\end{cases} $$",
      analogy: "A Bit Oracle is like a teacher writing the answer on a separate piece of paper. A Phase Oracle is like the teacher putting a red checkmark directly on your test paper.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# A Phase Oracle that marks state '11'\noracle = QuantumCircuit(2)\noracle.cz(0, 1) # Control-Z flips the phase of |11>\nprint(oracle)",
        cirq: "import cirq\nq = cirq.LineQubit.range(2)\n# Phase oracle for |11> in Cirq\nc = cirq.Circuit(cirq.CZ(q[0], q[1]))"
      },
      realWorldApplications: [
        { title: "Query Complexity", explanation: "Minimizing the number of gates in an oracle is a primary research area for optimizing Grover search and QRAM." }
      ],
      commonMistakes: [
        { mistake: "Forgetting to uncompute.", correction: "If your oracle uses temporary qubits, you MUST return them to their original state, or you will break the interference due to residual entanglement." }
      ],
      summary: [
        "Oracles implement Boolean functions $f(x)$ on quantum states.",
        "Phase oracles flip the phase of the 'marked' input states.",
        "Phase Kickback converts bit oracles to phase oracles.",
        "Clean ancilla management is vital for maintaining coherence."
      ],
      quiz: {
        topicId: "L7-T6",
        questions: [
          {
            question: "What does a Phase Oracle do to the 'correct' state in a superposition?",
            options: ["Deletes it.", "Turns it into a 1.", "Multiplies its amplitude by -1 (flips the phase).", "Entangles it with the user."],
            correctIndex: 2,
            explanation: "The phase flip is the standard way to 'mark' a state without collapsing the superposition."
          },
          {
            question: "How can you turn a Bit Oracle into a Phase Oracle?",
            options: ["Add more qubits.", "Set the target qubit to the |-> state.", "Run the computer faster.", "Use a classical NOT gate."],
            correctIndex: 1,
            explanation: "Phase kickback from the |-> state naturally converts the bit-flip into a phase-flip on the input."
          },
          {
            question: "Why is 'Uncomputing' temporary qubits important in an Oracle?",
            options: ["To save electricity.", "To prevent residual entanglement from destroying interference.", "To make the circuit look better.", "It isn't important."],
            correctIndex: 1,
            explanation: "If temporary qubits are not uncomputed, the system remains 'entangled' with the internal logic, preventing the wave functions from interfering correctly."
          }
        ]
      }
    }
  },
  {
    id: "L7-T7",
    levelId: 7,
    name: "Quantum Arithmetic",
    type: "math",
    estimatedMinutes: 25,
    content: {
      prerequisites: { topics: [{ id: "L7-T6", name: "Phase Oracle Design" }] },
      whatYouWillLearn: [
        "Building a Quantum Full Adder.",
        "The Draper Adder: Addition in the Phase Domain.",
        "Why multiplication is harder than addition in quantum.",
        "Resource estimation: T-gate counts for arithmetic."
      ],
      introduction: "Quantum computers don't have hardcoded addition circuits like CPUs. We have to build them using gates. Quantum arithmetic is uniquely difficult because it must be **reversible**. You can't just do $1 + 1 = 2$ and throw away the inputs. You must keep enough information to go back from 2 to $1+1$. This usually involves extra qubits called 'ancillas'.",
      whyItMatters: "Most practical algorithms (like Shor's) spend 90% of their time doing modular arithmetic. If your addition circuit is slow, your entire algorithm fails.",
      keyConcepts: [
        {
          heading: "Reversible Addition",
          description: "Using CNOT and Toffoli (CCNOT) gates to perform addition without losing information. The 'Carry' bit must be carefully managed and eventually uncomputed."
        },
        {
          heading: "The Draper Adder",
          description: "A clever technique that uses the Quantum Fourier Transform (QFT) to add numbers by rotating phases. It requires no ancilla qubits but is sensitive to phase noise."
        }
      ],
      mathematics: "$$ |a, b\\rangle \\xrightarrow{\\text{ADD}} |a, a+b\\rangle $$ \nThis is the standard form of a reversible addition operation.",
      analogy: "Classical addition is like melting two candles together to make one big one. Quantum addition is like putting two Lego bricks together; you can always pull them apart to see the original pieces.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\n# A simple Half-Adder\nqc = QuantumCircuit(3)\nqc.ccx(0, 1, 2) # Carry bit\nqc.cx(0, 1)    # Sum bit\nprint(qc)",
        cirq: "# Addition in Cirq using CCZ and CNOT operations."
      },
      realWorldApplications: [
        { title: "Shor's Algorithm", explanation: "The core of Shor's is modular exponentiation, which is built entirely on quantum adders and multipliers." }
      ],
      commonMistakes: [
        { mistake: "Thinking you can use standard '+' in a quantum circuit.", correction: "You must use gates like CNOT and Toffoli to manually manage the bits and carries." }
      ],
      summary: [
        "Quantum arithmetic must be reversible (no loss of information).",
        "Adders are built using CNOT and Toffoli gates.",
        "Draper adders use the QFT for addition in the phase domain.",
        "Arithmetic circuits often require extra (ancilla) qubits for 'carry' storage."
      ],
      quiz: {
        topicId: "L7-T7",
        questions: [
          {
            question: "Why can't we use standard classical addition circuits in a quantum computer?",
            options: ["They are too slow.", "They are irreversible and destroy quantum information.", "They are made of silicon.", "They only work in base 10."],
            correctIndex: 1,
            explanation: "Classical adders 'lose' information (e.g., from 1+1=2, you can't tell if it was 1+1 or 0+2). Quantum logic must be perfectly reversible."
          },
          {
            question: "Which gate is primarily used to calculate the 'Carry' bit in a quantum adder?",
            options: ["Hadamard Gate.", "Toffoli Gate (CCNOT).", "Z-Gate.", "Identity Gate."],
            correctIndex: 1,
            explanation: "The Toffoli gate acts like an AND gate (if A and B are 1, then C=1), which is the logic needed for a carry bit."
          },
          {
            question: "What does the Draper Adder use to perform addition?",
            options: ["Lasers.", "The Quantum Fourier Transform (QFT) and phase rotations.", "Classical registers.", "A calculator."],
            correctIndex: 1,
            explanation: "Draper adders map numbers to phases and use the properties of the QFT to perform addition without extra qubits."
          }
        ]
      }
    }
  },
  {
    id: "L7-T8",
    levelId: 7,
    name: "The Uncompute Pattern",
    type: "theory",
    estimatedMinutes: 15,
    content: {
      prerequisites: { topics: [{ id: "L7-T6", name: "Phase Oracle Design" }] },
      whatYouWillLearn: [
        "The necessity of cleaning ancilla qubits.",
        "Garbage bits and their effect on interference.",
        "The 'Mirroring' technique for uncomputation.",
        "Designing modular quantum subroutines."
      ],
      introduction: "One of the most counter-intuitive parts of quantum programming is the need to 'do the work, then undo it.' When you perform a calculation using temporary (ancilla) qubits, those qubits become entangled with your answer. If you leave them entangled, you can no longer use the answer in interference patterns—the 'garbage' information in the ancillas acts like a measurement, killing the quantumness. To fix this, you must **Uncompute** the ancillas.",
      whyItMatters: "Uncomputation is the difference between an algorithm that works and one that gives random noise. It is a mandatory step in almost every non-trivial quantum circuit.",
      keyConcepts: [
        {
          heading: "Garbage Information",
          description: "Any extra information left in the environment or on other qubits that 'reveals' which path the computer took. This destroys superposition."
        },
        {
          heading: "Uncompute (The Mirror)",
          description: "To uncompute, you simply apply the inverse of all gates used in the calculation (except the one that stored the final answer). This 'untangles' the ancilla qubits so they can be reused."
        }
      ],
      mathematics: "$$ U_{\\text{compute}} |x, 0\\rangle \\rightarrow |x, f(x)\\rangle \\xrightarrow{\\text{Copy Answer}} |x, f(x), \\text{ans}\\rangle \\xrightarrow{U_{\\text{compute}}^{\\dagger}} |x, 0, \\text{ans}\\rangle $$",
      analogy: "It's like using a scratchpad to solve a math problem. If you hand in the scratchpad with the test, the teacher might see how you got the answer and find a mistake. You must erase the scratchpad so only the final answer remains.",
      visualType: "ALGORITHM_WALKTHROUGH",
      codeImplementation: {
        qiskit: "from qiskit import QuantumCircuit\nqc = QuantumCircuit(3)\n# --- Compute ---\nqc.ccx(0, 1, 2)\n# --- Store Result elsewhere ---\n# (e.g., using CX)\n# --- Uncompute ---\nqc.ccx(0, 1, 2) # Inverse of Toffoli is Toffoli",
        cirq: "# Mirroring gates in Cirq to clean up ancilla registers."
      },
      realWorldApplications: [
        { title: "Large Scale Integration", explanation: "Ensuring that different modules of a quantum algorithm (like a multiplier and a phase estimator) don't accidentally measure each other." }
      ],
      commonMistakes: [
        { mistake: "Thinking Uncompute is just 'Reset'.", correction: "You cannot 'Reset' a qubit mid-circuit because that is a measurement. You must use reversible gates to untangle it." }
      ],
      summary: [
        "Residual information in ancilla qubits destroys interference.",
        "Uncomputing 'untangles' the scratchpad from the solution.",
        "Uncomputation involves applying the inverse gates in reverse order.",
        "This pattern is essential for all complex, multi-stage quantum algorithms."
      ],
      quiz: {
        topicId: "L7-T8",
        questions: [
          {
            question: "Why can't we just 'Reset' an ancilla qubit to 0 instead of uncomputing it?",
            options: ["It takes too much power.", "Resetting is a measurement that collapses the entire system's superposition.", "Resetting is too slow.", "The command doesn't exist."],
            correctIndex: 1,
            explanation: "Resetting physically interacts with the qubit, which acts like a measurement and destroys the quantum coherence needed for the rest of the algorithm."
          },
          {
            question: "What is the 'Mirror' technique in uncomputation?",
            options: ["Putting a mirror in the computer.", "Applying the exact same gates again in the same order.", "Applying the inverse of the gates in reverse order.", "Flipping the bits."],
            correctIndex: 2,
            explanation: "To untangle the system, you must perfectly reverse the operations that created the entanglement."
          },
          {
            question: "What happens to the interference if you forget to uncompute?",
            options: ["It gets faster.", "It is destroyed, and the algorithm likely fails to give the correct answer.", "Nothing.", "The qubits turn into bits."],
            correctIndex: 1,
            explanation: "The 'garbage' information in the ancilla qubits acts as a record of the computation, which prevents the wave functions from interfering constructively/destructively."
          }
        ]
      }
    }
  }
];

export const LEVEL_7_QUIZZES: Record<string, { questions: QuizQuestion[] }> = {};
