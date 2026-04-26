import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Sparkles, Mail, Lock, ShieldCheck, CheckCircle, Brain } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { login, error, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      setIsSuccess(true);
      const timer = setTimeout(() => navigate('/'), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate, isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);
    
    if (!email || !password) {
      setLocalError('Required credentials missing.');
      setIsLoading(false);
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      setLocalError('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] bg-gradient-to-br from-[#0d1117] to-[#020617] border border-white/5 rounded-[48px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group glow-blue"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-[22px] flex items-center justify-center shadow-2xl shadow-blue-600/30 mx-auto mb-10 cursor-pointer"
          >
            <Brain size={38} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-3">InsightForge <span className="text-blue-500">Systems</span></h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Enter your credentials to access the forge.</p>
        </div>
        
        <AnimatePresence mode="wait">
          {(localError || error) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-xs font-bold text-center mb-6 flex items-center justify-center gap-2 overflow-hidden"
            >
              <ShieldCheck size={14} /> {localError || error}
            </motion.div>
          )}

          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs font-bold text-center mb-6 flex items-center justify-center gap-2"
            >
              <CheckCircle size={14} /> Identity verified. Redirecting...
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label id="email-label" className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 peer-focus:text-blue-500 transition-colors pointer-events-none" />
              <input
                type="email"
                required
                aria-labelledby="email-label"
                className="peer block w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white font-medium"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          <div>
            <label id="password-label" className="block text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Secure Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 peer-focus:text-blue-500 transition-colors pointer-events-none" />
              <input
                type="password"
                required
                aria-labelledby="password-label"
                className="peer block w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                disabled={isLoading || isSuccess}
                className="w-4 h-4 rounded-md bg-slate-900 border-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 transition-all" 
              />
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full h-[54px] flex justify-center items-center gap-2 py-4 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl shadow-blue-600/20 text-sm font-black transition-all hover:scale-[1.01] hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed group/btn overflow-hidden relative"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : isSuccess ? (
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="animate-in fade-in zoom-in duration-300" /> Authorized
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Authenticate <LogIn size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-xs font-bold text-slate-500">
            Don't have an identity node yet?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-extrabold transition-colors">
              Initialize Account
            </Link>
          </p>
        </div>
      </motion.div>
      
      <div className="mt-8 flex gap-6 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
      </div>
    </div>
  );
};

export default Login;
