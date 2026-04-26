'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizSectionProps {
  questions: Question[];
  onComplete: () => void;
}

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentStep].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onComplete();
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel border border-quantum-purple/40 p-10 text-center rounded-3xl overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-purple/5 to-quantum-cyan/5 -z-10" />
        <div className="w-20 h-20 bg-gradient-to-tr from-quantum-purple to-quantum-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-purple">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-black text-white mb-2">Quiz Complete!</h3>
        <p className="text-quantum-text-body/60 mb-8 max-w-sm mx-auto">
          You scored <span className="text-quantum-cyan font-bold">{score}/{questions.length}</span>. 
          Your knowledge of this topic has been successfully validated.
        </p>
        <div className="text-sm font-bold text-quantum-green bg-quantum-green/10 py-3 px-6 rounded-xl inline-block border border-quantum-green/20">
          +50 XP Earned
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep) / questions.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-quantum-purple to-quantum-cyan"
        />
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-quantum-purple/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-quantum-purple" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-quantum-purple uppercase tracking-widest">Knowledge Check</span>
            <h3 className="text-lg font-bold text-white">Quiz Section</h3>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-mono font-bold text-quantum-text-body/40">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>

      <h4 className="text-xl font-bold text-white mb-8 leading-tight">
        {currentQuestion.question}
      </h4>

      <div className="grid gap-3 mb-6">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = isAnswered && idx === currentQuestion.correctIndex;
          const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctIndex;

          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              disabled={isAnswered}
              className={`
                group flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden
                ${isSelected && !isAnswered ? 'border-quantum-purple bg-quantum-purple/10 ring-1 ring-quantum-purple/20' : 
                  isCorrect ? 'border-quantum-green bg-quantum-green/10' :
                  isWrong ? 'border-red-500/50 bg-red-500/10' :
                  'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold shrink-0
                ${isSelected && !isAnswered ? 'border-quantum-purple bg-quantum-purple text-white shadow-glow-purple' :
                  isCorrect ? 'border-quantum-green bg-quantum-green text-white' :
                  isWrong ? 'border-red-500 bg-red-500 text-white' :
                  'border-white/10 text-white/20'}
              `}>
                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                 isWrong ? <XCircle className="w-3.5 h-3.5" /> : 
                 String.fromCharCode(65 + idx)}
              </div>
              <span className={`text-sm font-semibold ${isSelected || isCorrect ? 'text-white' : 'text-quantum-text-body/60'}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation after answer */}
      {isAnswered && currentQuestion.explanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 rounded-2xl bg-quantum-cyan/5 border border-quantum-cyan/20"
        >
          <p className="text-sm text-quantum-text-body/90 leading-relaxed">
            <strong className="text-quantum-cyan font-bold">Explanation:</strong> {currentQuestion.explanation}
          </p>
        </motion.div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`
            flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300
            ${isAnswered 
              ? 'bg-gradient-to-r from-quantum-purple to-quantum-cyan text-white shadow-glow-purple hover:scale-[1.02] active:scale-95' 
              : 'bg-white/5 text-white/20 cursor-not-allowed'}
          `}
        >
          {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
