import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Sparkles, Mail, Lock, User, ShieldCheck, CheckCircle, Brain } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { register, error, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Security handshake failed: Passwords mismatch.');
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-lg p-14 rounded-[48px] bg-gradient-to-br from-[#0d1117] to-[#020617] border-white/5 relative overflow-hidden glow-purple"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <UserPlus size={120} />
        </div>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-700 rounded-[22px] flex items-center justify-center shadow-2xl shadow-indigo-600/30 mx-auto mb-10 group-hover:scale-105 transition-all duration-500">
            <Brain size={38} className="text-white" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Initialize <span className="text-indigo-400">Forge</span> Node</h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Join the autonomous career intelligence network.</p>
        </div>
        
        {(localError || error) && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-xs font-bold text-center mb-6 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={14} /> {localError || error}
          </motion.div>
        )}

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Full Legal Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Universal ID (Email)</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Secret PK</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Confirm Secret</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-white"
                  placeholder="••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-5 px-4 bg-white text-black rounded-2xl shadow-xl shadow-white/5 text-sm font-black uppercase tracking-widest transition-all hover:bg-slate-200 active:scale-[0.98] mt-10"
          >
            Authorized Join
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-bold text-slate-500">
          Already verified?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-2">
            Secure Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
