import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Antigravity Intelligence Critical Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card p-14 rounded-[48px] max-w-xl border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/[0.02] -z-10" />
            
            <div className="w-20 h-20 bg-white/[0.03] rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/5 glow-blue shadow-inner">
               <AlertTriangle size={36} className="text-slate-400" />
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight mb-4">Something went wrong</h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 max-w-sm mx-auto">
              An unexpected interruption occurred. Please reinitialize the interface or return to the previous view.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-3 px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                <RefreshCw size={16} /> Retry
              </button>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-3 px-10 py-4 bg-white/[0.03] text-white hover:bg-white/[0.08] font-black text-xs uppercase tracking-widest rounded-2xl border border-white/5 transition-all active:scale-95"
              >
                <Home size={16} /> Go Back
              </button>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/[0.03] flex items-center justify-center gap-3 opacity-20">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               <span className="text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Resilience Mode Active</span>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
