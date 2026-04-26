'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <div className="mb-4">
      <Link 
        href={href} 
        className="group inline-flex items-center gap-2 text-quantum-text-body/60 hover:text-quantum-purple transition-all duration-300"
      >
        <div className="text-quantum-text-body/60 group-hover:text-quantum-purple transition-colors duration-300 group-hover:shadow-glow-purple">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold tracking-widest uppercase relative">
          {label}
          <motion.span 
            className="absolute left-0 -bottom-1 w-0 h-[2px] bg-quantum-purple group-hover:w-full transition-all duration-300 shadow-glow-purple"
          />
        </span>
      </Link>
    </div>
  );
}
