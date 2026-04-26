import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, X, Clock } from 'lucide-react';

const AlertCard = ({ alert, onClear }) => {
  const getColors = (priority) => {
    switch (priority) {
      case 'red': return {
        base: 'border-rose-500/10 bg-rose-500/5 text-rose-500/70',
        accent: 'bg-rose-500/40',
        glow: 'shadow-none'
      };
      case 'yellow': return {
        base: 'border-amber-500/10 bg-amber-500/5 text-amber-500/70',
        accent: 'bg-amber-500/40',
        glow: 'shadow-none'
      };
      case 'green': return {
        base: 'border-emerald-500/10 bg-emerald-500/5 text-emerald-500/70',
        accent: 'bg-emerald-500/40',
        glow: 'shadow-none'
      };
      default: return {
        base: 'border-blue-500/10 bg-blue-500/5 text-blue-500/70',
        accent: 'bg-blue-500/40',
        glow: 'shadow-none'
      };
    }
  };

  const getIcon = (priority) => {
    switch (priority) {
      case 'red': return <AlertTriangle size={18} />;
      case 'yellow': return <Clock size={18} />;
      case 'green': return <CheckCircle size={18} />;
      default: return <Info size={18} />;
    }
  };

  const colors = getColors(alert.priority);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-6 rounded-3xl border ${colors.base} bg-white/[0.02] relative group flex gap-5 items-start hover:bg-white/[0.04] transition-all duration-500`}
    >
      <div className="mt-1 p-3 bg-white/[0.03] rounded-2xl border border-white/5 shrink-0">
        {getIcon(alert.priority)}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h4 className="text-[14px] font-bold leading-tight text-white tracking-tight">{alert.title}</h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{alert.message}</p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{alert.time}</span>
        </div>
      </div>
      
      <button 
        onClick={() => onClear(alert.id)}
        className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-white/5 rounded-lg"
      >
        <X size={14} className="text-slate-600" />
      </button>
    </motion.div>
  );
};

const AlertSystem = ({ alerts = [], onClearAlert }) => {
  return (
    <div className="glass-card p-10 h-full flex flex-col overflow-hidden border-white/5 group relative">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h3 className="text-white text-lg font-bold tracking-tight">Active Alerts</h3>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mt-2">Signal Sentry Pulse</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 premium-scroll relative z-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onClear={onClearAlert} />
          ))}
          
          {alerts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              <CheckCircle size={32} className="text-slate-700 mb-4" />
              <p className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.4em]">All Systems Nominal</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {alerts.length > 0 && (
        <button 
          className="mt-8 pt-6 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-all flex items-center justify-center gap-2"
          onClick={() => alerts.forEach(a => onClearAlert(a.id))}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default React.memo(AlertSystem);
