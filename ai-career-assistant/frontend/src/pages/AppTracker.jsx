import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpDown, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  MoreHorizontal,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  StickyNote
} from 'lucide-react';

const AppTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/applications');
      setApplications(data);
    } catch (err) {
      setError('System authentication required or network failure.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleNotesBlur = async (id, newNotes, currentNotes) => {
    if (newNotes === currentNotes) return;
    try {
       await api.put(`/applications/${id}`, { notes: newNotes });
       fetchApplications();
    } catch (err) {
       console.error('Notes update failed', err);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/export/applications', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'intelligence_report_export.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert('Export engine failed.');
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredApps = useMemo(() => {
    let filtered = (applications || [])?.filter(app => 
      (app?.jobTitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || 
       app?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())) &&
      (statusFilter === 'all' || app?.status === statusFilter)
    );

    if (sortConfig.key && filtered) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered || [];
  }, [applications, searchTerm, statusFilter, sortConfig]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'offer': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rejected': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'interviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'applied': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-700/30 text-slate-400 border-slate-700/50';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
       <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-8" />
       <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Synchronizing Intelligence Board...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="w-20 h-20 bg-rose-500/10 rounded-[32px] border border-rose-500/20 flex items-center justify-center mb-8">
        <AlertCircle size={40} className="text-rose-500" />
      </div>
      <h2 className="text-3xl font-black text-white tracking-tight mb-4 uppercase">Sync Protocol Interrupted</h2>
      <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed mb-10">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
      >
        Re-link Intelligence
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1680px] mx-auto pb-24 px-10"
    >
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 pt-10">
        <div>
           <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              Live Tracker Active
            </span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight">Application Board</h1>
          <p className="text-slate-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">Central hub for monitoring and optimizing your recruitment pipeline.</p>
        </div>
        <div className="flex items-center gap-6 w-full lg:w-auto">
          <button 
            onClick={handleExport}
            className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.03] text-white hover:bg-white/[0.08] font-black text-[11px] uppercase tracking-widest rounded-2xl border border-white/5 transition-all active:scale-95 group"
          >
            <Download size={20} className="text-slate-400 group-hover:text-white transition-colors" />
            Export Intelligence
          </button>
        </div>
      </header>

      {/* Control Bar */}
      <div className="glass-card mb-10 p-6 rounded-[28px] border-white/5 flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search company, position, or intelligence..."
            className="w-full pl-14 pr-6 py-4 bg-black/20 border border-white/5 rounded-2xl text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
             <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
             <select 
               className="w-full pl-11 pr-10 py-4 bg-black/20 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 appearance-none focus:outline-none focus:border-blue-500 uppercase tracking-widest cursor-pointer shadow-inner"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
             >
               <option value="all">ALL STAGES</option>
               <option value="saved">SAVED</option>
               <option value="applied">APPLIED</option>
               <option value="interviewing">INTERVIEWING</option>
               <option value="offer">OFFER RECEIVED</option>
               <option value="rejected">REJECTED</option>
             </select>
             <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card rounded-[48px] overflow-hidden border-white/5 relative shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-[#151921] border-b border-white/5 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-5 cursor-pointer group" onClick={() => requestSort('jobTitle')}>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                    Intelligence Object <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 cursor-pointer group" onClick={() => requestSort('matchScore')}>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                    Match Delta <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 cursor-pointer group" onClick={() => requestSort('appliedDate')}>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                    Timestamp <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Pipeline Status</div>
                </th>
                <th className="px-6 py-5 w-[300px]">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Field Notes</div>
                </th>
                <th className="px-6 py-5 text-right font-black uppercase tracking-[0.2em] text-slate-500 text-[10px]">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#0d1117]/30">
              <AnimatePresence mode="popLayout">
                {sortedAndFilteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <Briefcase size={48} className="mb-4" />
                        <p className="text-sm font-medium">No application records found for this query.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredApps.map((app) => (
                    <motion.tr 
                      key={app._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-blue-500/30 transition-all">
                             <Briefcase size={18} className="text-slate-400 group-hover:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{app.jobTitle}</div>
                            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5 capitalize">
                              {app.company} {app.location && <><span className="opacity-30">•</span> {app.location}</>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className={`text-sm font-black ${app.matchScore >= 80 ? 'text-emerald-400' : 'text-blue-400'}`}>
                             {app.matchScore || 0}%
                           </div>
                           <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${app.matchScore >= 80 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${app.matchScore}%` }} />
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                           <Clock size={12} />
                           {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                           <select
                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer appearance-none ${getStatusStyle(app.status)}`}
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                           >
                            <option value="saved">SAVED</option>
                            <option value="applied">APPLIED</option>
                            <option value="interviewing">INTERVIEWING</option>
                            <option value="offer">OFFER RECEVIED</option>
                            <option value="rejected">REJECTED</option>
                           </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative group/note">
                          <StickyNote size={14} className="absolute left-3 top-3 text-slate-500 opacity-30" />
                          <textarea
                            className="w-full text-[11px] pl-9 pr-3 py-2 bg-transparent border border-transparent rounded-xl focus:border-white/10 focus:bg-white/5 text-slate-400 resize-none hover:border-white/5 transition-all outline-none italic truncate focus:whitespace-normal focus:h-20"
                            rows="1"
                            placeholder="Add field observation..."
                            defaultValue={app.notes || ''}
                            onBlur={(e) => handleNotesBlur(app._id, e.target.value, app.notes || '')}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           {app.jobUrl && (
                             <a href={app.jobUrl} target="_blank" rel="noreferrer" className="p-2 bg-white/5 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors" title="External link">
                               <ExternalLink size={14} />
                             </a>
                           )}
                           <button className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg border border-blue-500/20 transition-all font-bold text-[10px] uppercase tracking-widest px-3">
                              AI Prep
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AppTracker;
