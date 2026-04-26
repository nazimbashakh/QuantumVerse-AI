export interface Level {
  id: number;
  name: string;
  description: string;
  topicCount: number;
  isPremium: boolean;
}

export interface Prerequisites {
  topics: { id: string, name: string }[];
}

export interface CodeImplementation {
  qiskit: string;
  cirq: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicContent {
  prerequisites: Prerequisites;
  whatYouWillLearn: string[];
  introduction: string;
  whyItMatters: string;
  keyConcepts: { heading: string, description: string }[];
  mathematics: string;
  analogy: string;
  visualType: 'BLOCH_SPHERE' | 'CIRCUIT_ANIMATOR' | 'ENTANGLEMENT_VIZ' | 'ALGORITHM_WALKTHROUGH' | 'PROBABILITY_HISTOGRAM' | 'MATH_DERIVATION' | 'HARDWARE_DIAGRAM' | 'NETWORK_DIAGRAM';
  codeImplementation: CodeImplementation;
  realWorldApplications: { title: string, explanation: string }[];
  commonMistakes: { mistake: string, correction: string }[];
  summary: string[];
  quiz: QuizQuestion[] | { topicId: string, questions: QuizQuestion[] };
}

export interface Topic {
  id: string;
  levelId: number;
  name: string;
  type: 'theory' | 'math' | 'code';
  estimatedMinutes: number;
  content: TopicContent;
}
