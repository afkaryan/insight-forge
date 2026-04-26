import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, AlertCircle, CheckCircle2, Zap, Sparkles, Trophy, Brain } from 'lucide-react';

const InsightsPanel = ({ insights = [] }) => {
  const highlightKeywords = (text) => {
    const keywords = [/(\d+%)/g, /System Design/g, /React/g, /Backend/g, /Frontend/g, /Scalability/g, /Cloud Architect/g];
    let highlightedText = text;
    keywords.forEach(keyword => {
      highlightedText = highlightedText.replace(keyword, (match) => `<span class="text-white font-black italic">${match}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'skill': return <Sparkles size={18} className="text-amber-400" />;
      case 'match': return <Trophy size={18} className="text-emerald-400" />;
      case 'missing': return <AlertCircle size={18} className="text-rose-400" />;
      case 'alert': return <Zap size={18} className="text-blue-400" />;
      default: return <Lightbulb size={18} className="text-blue-400" />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'skill': return 'bg-amber-500/10 border-amber-500/20';
      case 'match': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'missing': return 'bg-rose-500/10 border-rose-500/20';
      case 'alert': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  const getBadge = (type) => {
    switch (type) {
      case 'skill': return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400/10 text-amber-500 border border-amber-400/20 tracking-widest shadow-[0_0_10px_rgba(251,191,36,0.1)]">Sector Delta</span>;
      case 'match': return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.1)]">Vector Match</span>;
      case 'missing': return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-400/10 text-rose-400 border border-rose-400/20 tracking-widest shadow-[0_0_10px_rgba(251,113,133,0.1)]">Parity Gap</span>;
      case 'alert': return <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-400/10 text-blue-400 border border-blue-400/20 tracking-widest shadow-[0_0_10px_rgba(96,165,250,0.1)]">AI Strategy</span>;
      default: return null;
    }
  };

  return (
    <div className="glass-card p-10 h-full overflow-hidden flex flex-col relative group">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h3 className="text-white text-lg font-bold tracking-tight">AI Insights</h3>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mt-2">Neural Strategy Delta</p>
        </div>
      </div>
      
      <div className="space-y-4 overflow-y-auto pr-2 premium-scroll flex-1 relative z-10">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={`p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all`}
          >
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white text-[14px] font-bold tracking-tight">{insight.title}</p>
                </div>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  {highlightKeywords(insight.description)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {insights.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <p className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.4em]">Matrix Idle</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(InsightsPanel);
