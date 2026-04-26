import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Briefcase, FileText, Send, Activity } from 'lucide-react';

const ActivityFeed = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
        case 'upload': return <FileText size={16} className="text-emerald-400" />;
        case 'application': return <Send size={16} className="text-blue-400" />;
        case 'job': return <Briefcase size={16} className="text-purple-400" />;
        default: return <Clock size={16} className="text-slate-500" />;
    }
  };

  const getDotColor = (type) => {
    switch (type) {
        case 'upload': return 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
        case 'application': return 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
        case 'job': return 'bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]';
        default: return 'bg-slate-500';
    }
  };

  return (
    <div className="glass-card p-12 rounded-[48px] h-full flex flex-col border-white/5 relative group">
      <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none scale-125">
        <Activity size={160} />
      </div>

      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h3 className="text-white text-lg font-black tracking-tight flex items-center gap-3">
            <Clock size={24} className="text-emerald-500" />
            Activity Stream
          </h3>
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mt-1.5 ml-9">Event Ledger Sync</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
           <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Real-time</span>
        </div>
      </div>
      
      <div className="relative flex-1 z-10 premium-scroll overflow-y-auto">
        {/* Timeline Line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-[2px] bg-white/[0.03]" />
        
        <div className="space-y-12 pl-14">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group/item"
            >
              <div className={`absolute -left-[45.5px] top-1.5 w-3 h-3 rounded-full ring-8 ring-[#0a0f1c] ${getDotColor(activity.type)} transition-all duration-500 group-hover/item:scale-150 group-hover/item:shadow-[0_0_20px_rgba(255,255,255,0.2)]`} />
              
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2.5">
                    <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5 shadow-inner">
                      {getIcon(activity.type)}
                    </div>
                    <span className="text-white text-[15px] font-black tracking-tight leading-tight">{activity.title}</span>
                  </div>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed tracking-wide pl-12">{activity.description}</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 shrink-0 mt-2 bg-white/[0.02] px-2 py-1 rounded-md border border-white/5">{activity.time}</span>
              </div>
            </motion.div>
          ))}
          
          {activities.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 ml-[-48px]">
              <div className="w-20 h-20 bg-white/[0.02] rounded-[32px] flex items-center justify-center mb-8 border border-white/5 glow-emerald">
                <Clock size={40} className="text-slate-700" />
              </div>
              <p className="text-white text-sm font-black uppercase tracking-[0.2em]">Stream Idle</p>
              <p className="text-slate-600 text-[11px] font-bold uppercase tracking-widest mt-2 leading-relaxed">System awaiting deployment<br/>sequence initialization.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActivityFeed);
