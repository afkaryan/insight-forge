import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Sparkles,
  Bookmark,
  Clock
} from 'lucide-react';

const JobCard = ({ job, onSave, isSaving, isNew }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRelativeTime = (dateString) => {
    if (!dateString) return { text: 'Date Unknown', isHot: false };
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return { text: 'Just now', isHot: true };
    if (diffInHours < 24) return { text: `${diffInHours}h ago`, isHot: true };
    if (diffInDays === 1) return { text: 'Yesterday', isHot: false };
    return { text: `${diffInDays}d ago`, isHot: false };
  };

  const relativeTime = getRelativeTime(job.postedDate);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-blue-500/10 border-blue-500/20';
    if (score >= 40) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      className="glass-card p-1 relative group hover:border-blue-500/30 transition-all duration-300 mb-8"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[33px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
      <div className="p-8 bg-slate-900/40 rounded-[30px] relative overflow-hidden">
        {isNew && (
          <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500/10 border-b border-l border-emerald-500/20 rounded-bl-2xl">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400 animate-pulse">New Signal</span>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          {/* Node Identity */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center shadow-inner group-hover:border-blue-500/20 transition-colors">
                <Briefcase size={24} className="text-blue-500/60" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight leading-tight mb-2">
                  {job.jobTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                  <span className="text-slate-300 font-bold">{job.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {job.location}</span>
                  <span className={`flex items-center gap-1.5 ${relativeTime.isHot ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <Clock size={12} className={relativeTime.isHot ? 'animate-pulse' : ''} /> {relativeTime.text}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {job.matchedSkills?.slice(0, 4).map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={10} /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Telemetry Actions */}
          <div className="flex flex-col items-center lg:items-end gap-6 min-w-[240px]">
            <div className="text-center lg:text-right w-full">
              <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                <Sparkles size={16} className="text-blue-500" />
                <span className={`text-4xl font-black tracking-tighter ${getScoreColor(job.matchScore)}`}>
                  {job.matchScore || 0}<span className="text-lg ml-0.5 text-slate-500">%</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.matchScore || 0}%` }}
                  className={`h-full ${job.matchScore >= 80 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-blue-500'}`}
                />
              </div>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mt-3">Match Compatibility</p>
            </div>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={(e) => { e.stopPropagation(); onSave(job); }}
                disabled={isSaving}
                className={`p-3.5 rounded-xl border transition-all active:scale-95 flex-1 flex items-center justify-center ${
                  job.isSaved 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                    : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {isSaving ? <RefreshCcw size={18} className="animate-spin" /> : <Bookmark size={18} fill={job.isSaved ? "currentColor" : "none"} />}
              </button>
              <a 
                href={job.jobUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-3.5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 flex-[2] justify-center"
              >
                Target <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Expandable Section Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 w-full flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-all py-4 border-t border-white/5 group-hover:border-blue-500/20"
        >
          {isExpanded ? (
            <>Decompile Insights <ChevronUp size={14} /></>
          ) : (
            <>Explore Delta Logic <ChevronDown size={14} /></>
          )}
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10">
                  <h4 className="flex items-center gap-3 text-emerald-400 font-black text-[9px] uppercase tracking-[0.3em] mb-4">
                    Signal Strengths
                  </h4>
                  <ul className="space-y-3">
                    {job?.matchedSkills?.slice(0, 3).map((skill, i) => (
                      <li key={i} className="text-slate-400 text-xs font-medium flex items-start gap-4">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                        Expertise in <span className="text-white font-bold">{skill}</span> provides optimal node compatibility.
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-rose-500/[0.02] border border-rose-500/10">
                  <h4 className="flex items-center gap-3 text-rose-400 font-black text-[9px] uppercase tracking-[0.3em] mb-4">
                    Capability Gaps
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job?.missingSkills?.length > 0 ? job?.missingSkills?.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white/5 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider border border-white/5">{skill}</span>
                    )) : <span className="text-slate-600 text-xs italic font-medium">None detected. System parity achieved.</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(JobCard);
