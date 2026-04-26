import React from 'react';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[80vh] flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-xl">
        <div className="relative mb-12">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10"
          />
          <div className="w-24 h-24 bg-white/[0.02] rounded-[32px] border border-white/5 flex items-center justify-center mx-auto relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
             <Search size={40} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-white tracking-tight mb-4">404</h1>
        <p className="text-slate-500 text-xl font-black uppercase tracking-[0.3em] mb-8">Node Not Found</p>
        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
          The tactical intelligence node you are searching for does not exist in this sector. It may have been relocated or neutralized.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link 
            to="/"
            className="flex items-center justify-center gap-3 px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            <Home size={18} /> Return to Command
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-10 py-4 bg-white/[0.03] text-white hover:bg-white/[0.08] font-black text-xs uppercase tracking-widest rounded-2xl border border-white/5 transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> Previous Sector
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.03] flex items-center justify-center gap-3 opacity-20">
           <Sparkles size={14} className="text-slate-500" />
           <span className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Sector Boundary Intelligence V.2</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
