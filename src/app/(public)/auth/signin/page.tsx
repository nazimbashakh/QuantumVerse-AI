'use client';

import Link from 'next/link';
import { Mail, Lock, Cpu } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      
      if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError(result?.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      
      {/* Brand Header */}
      <div className="text-center mb-10 space-y-4">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-quantum-purple quantum-glow shadow-glow-purple flex items-center justify-center group-hover:bg-quantum-cyan transition-colors duration-300">
            <span className="text-xl text-white font-bold">Q</span>
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-white">
            QUANTUM<span className="text-quantum-cyan">VERSE</span>
          </h1>
        </Link>
        <p className="text-quantum-text-body font-medium tracking-widest uppercase text-sm">
          Enter. Explore. Experiment. Evolve.
        </p>
      </div>

      {/* Auth Card */}
      <div className="glass-panel w-full max-w-md relative overflow-hidden flex flex-col pt-8 pb-10 px-8 border border-quantum-purple/40 shadow-glow-purple">
        <div className="text-center mb-8 space-y-2">
          <Cpu className="w-10 h-10 text-quantum-cyan mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white tracking-wide">Enter The Verse</h3>
          <p className="text-quantum-text-body text-sm">Welcome back, Quantum Engineer.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSignIn}>
          {error && <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-200 text-sm">{error}</div>}
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-quantum-text-body/60" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-quantum-purple focus:shadow-glow-purple transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-quantum-text-body/60" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-quantum-cyan focus:shadow-glow-cyan transition-all"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-quantum w-full flex justify-center py-3 disabled:opacity-50">
            {loading ? 'Initializing...' : 'Initialize Session'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-quantum-text-body">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-quantum-cyan hover:text-quantum-purple font-medium transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
