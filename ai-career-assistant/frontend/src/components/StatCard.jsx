import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title = 'Telemetry Node', value = 0, icon: Icon, isPrimary = false }) => {
  if (!Icon) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`glass-card p-12 relative overflow-hidden group transition-all duration-700
        ${isPrimary 
          ? 'bg-white/[0.04] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]' 
          : 'bg-white/[0.015] border-white/5 shadow-none hover:bg-white/[0.03]'}`}
    >
      {/* Subtle Border Glow (Primary Only) */}
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      )}

      <div className="flex justify-between items-start relative z-10 mb-14">
        <div className={`p-4.5 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors group-hover:border-white/10`}>
          <Icon size={26} className={isPrimary ? 'text-blue-500/60' : 'text-slate-600 group-hover:text-white/60 transition-colors'} />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className={`text-[11px] font-bold tracking-[0.4em] uppercase mb-6 ${isPrimary ? 'text-white/60' : 'text-slate-500/50'}`}>{title}</h3>
        <p className={`text-7xl font-black tracking-tighter text-white leading-none`}>
          {typeof value === 'number' && value < 10 ? `0${value}` : value}
        </p>
      </div>
      
    </motion.div>
  );
};

export default React.memo(StatCard);
