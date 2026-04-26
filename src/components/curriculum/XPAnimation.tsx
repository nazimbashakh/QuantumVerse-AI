'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface XPAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export default function XPAnimation({ show, onComplete }: XPAnimationProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -80, scale: 1.2 }}
          exit={{ opacity: 0, y: -120, scale: 1.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed z-50 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-tr from-quantum-purple to-quantum-cyan px-6 py-2 rounded-full shadow-glow-purple border border-white/20">
              <span className="text-2xl font-black text-white drop-shadow-md">
                +50 XP
              </span>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-xs font-bold text-quantum-cyan uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/5"
            >
              Mastery Increased
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
