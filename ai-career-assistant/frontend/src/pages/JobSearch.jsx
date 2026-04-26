import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, MapPin, Filter, AlertCircle, RefreshCcw, Activity, Globe, ArrowUpRight, Clock, Briefcase } from 'lucide-react';
import api from '../services/api';
import JobCard from '../components/JobCard';
import JobCardSkeleton from '../components/JobCardSkeleton';

const JobSearch = () => {
  const [keyword, setKeyword] = useState('developer');
  const [location, setLocation] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [debouncedLocation, setDebouncedLocation] = useState(location);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBackgroundRefreshing, setIsBackgroundRefreshing] = useState(false);
  const [error, setError] = useState('');
  
  const [isSavingId, setIsSavingId] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [seenJobIds, setSeenJobIds] = useState([]);

  // Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setDebouncedLocation(location);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, location]);

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get('/resumes');
        setResumes(data);
        if (data.length > 0) setSelectedResumeId(data[0]._id);
      } catch (err) {
        console.error('Signal failure in resume retrieval', err);
      }
    };
    fetchResumes();
  }, []);

  const handleSearch = useCallback(async (isBackground = false) => {
    if (!selectedResumeId) {
      if (!isBackground) setError('Select a resume to enable AI-powered matching.');
      return;
    }
    
    if (isBackground) setIsBackgroundRefreshing(true);
    else setLoading(true);
    
    setError('');
    
    try {
      const { data } = await api.get(`/jobs/search`, {
        params: { 
          keyword: debouncedKeyword, 
          location: debouncedLocation, 
          resumeId: selectedResumeId 
        }
      });
      
      const fetchedJobs = data?.data || [];
      
      // Dynamic Intelligence Ranking
      fetchedJobs.sort((a, b) => b.matchScore - a.matchScore);

      setJobs(fetchedJobs);
      setLastSync(new Date());

      // Update seen repository using functional update to avoid dependency
      const newIds = fetchedJobs.map(j => j.id);
      setSeenJobIds(prev => Array.from(new Set([...prev, ...newIds])));
      
    } catch (err) {
      console.error('Signal interruption during search:', err);
      if (!isBackground) setError('Market telemetry failed. Please verify capability source synchronization.');
    } finally {
      setLoading(false);
      setIsBackgroundRefreshing(false);
    }
  }, [selectedResumeId, debouncedKeyword, debouncedLocation]);

  // Memoized Job List with discovery status
  const processedJobs = React.useMemo(() => {
    return jobs.map(job => ({
      ...job,
      isNew: !seenJobIds.includes(job.id)
    }));
  }, [jobs, seenJobIds]);

  // Automated Real-Time Polling (60s)
  useEffect(() => {
    if (!selectedResumeId) return;
    const pollInterval = setInterval(() => handleSearch(true), 60000);
    return () => clearInterval(pollInterval);
  }, [handleSearch, selectedResumeId]);

  // Auto-search on debounce
  useEffect(() => {
    if (selectedResumeId) handleSearch(false);
  }, [debouncedKeyword, debouncedLocation, selectedResumeId]);

  const handleSaveJob = useCallback(async (job) => {
    setIsSavingId(job.id);
    try {
      await api.post('/applications', {
        resume: selectedResumeId,
        jobTitle: job.jobTitle,
        company: job.company,
        location: job.location,
        description: job.description,
        jobUrl: job.jobUrl,
        matchScore: job.matchScore,
        status: 'saved'
      });
    } catch (err) {
      console.error('Deployment storage failure', err);
    } finally {
      setIsSavingId(null);
    }
  }, [selectedResumeId]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-max pb-32"
    >
      {/* Header Corridor */}
      <header className="mb-20 pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-blue-500/50" />
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-blue-500">System Pulse</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-black text-white tracking-tight leading-[0.95]">
            Market <span className="gradient-text italic font-black">Intelligence</span> Hub
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            Analyzing <span className="text-white italic">4.2M global data nodes</span> to forge your strategic career vector.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 px-6 py-4 glass-card border-white/5 shadow-2xl">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Sync Frequency</span>
              <span className="text-[13px] font-bold text-white">60.0s Deployment Cycle</span>
            </div>
            <div className="w-px h-10 bg-white/10 mx-2" />
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${isBackgroundRefreshing ? 'bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Telemetry</span>
                <span className="text-[13px] font-bold text-white">{isBackgroundRefreshing ? 'Scanning...' : 'Idle'}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => handleSearch()}
            disabled={loading}
            className="w-14 h-14 flex items-center justify-center bg-white/[0.02] text-white hover:bg-white/[0.05] rounded-xl border border-white/5 transition-all group active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw size={20} className={`text-slate-500 group-hover:text-blue-400 transition-all ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Bifurcated Intelligence Layout */}
      <div className="grid grid-cols-12 gap-10">
        {/* Signal Column (Left) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <div className="glass-card p-1 relative overflow-hidden group border-white/10 shadow-2xl transition-all duration-700 hover:border-white/20">
            <div className="p-8 bg-slate-900/50 rounded-[40px]">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(false); }} className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative group/input">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Market keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[13px] font-bold text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-48 relative group/input">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Globe size={16} className="text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Geospatial focus..."
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[13px] font-bold text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || isBackgroundRefreshing}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                >
                  {(loading && !isBackgroundRefreshing) ? <RefreshCcw className="animate-spin" size={16} /> : 'Sync Markets'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-12 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {loading && jobs.length === 0 ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => <JobCardSkeleton key={i} />)}
                </div>
              ) : jobs?.length > 0 ? (
                <div className="space-y-12">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Parity Signals</h2>
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{jobs.length} Intelligence Points</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {processedJobs.map((job, i) => (
                      <JobCard 
                        key={job.id || i}
                        job={job} 
                        onSave={handleSaveJob} 
                        isSaving={isSavingId === job.id} 
                        isNew={job.isNew}
                      />
                    ))}
                  </div>
                </div>
              ) : !loading && jobs.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 rounded-[48px] border border-white/5 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group z-10"
                >
                  <div className="relative z-10 max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                      <Sparkles size={24} className="text-blue-500/60 animate-pulse" />
                    </div>
                    <h3 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-4">Zero Signals Active</h3>
                    <p className="text-slate-500 text-[13px] font-medium mb-10">Market telemetry is idle. Initiate a baseline scan to discover neural parity opportunities.</p>
                    <button 
                      onClick={() => handleSearch(false)}
                      className="px-10 py-4 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-xl"
                    >
                      Execute Tactical Scan
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Intelligence Aside (Right) */}
        <aside className="col-span-12 lg:col-span-4 space-y-10">
          <div className="glass-card p-1 relative group">
            <div className="p-8 bg-slate-900/40 rounded-[30px] space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Guidance</p>
                  <h3 className="text-white font-black text-xl tracking-tight">Market Intelligence</h3>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] border-b border-white/5 pb-2">High Demand Signals</p>
                <div className="flex flex-wrap gap-2">
                  {['Cloud Infrastructure', 'Neural Ops', 'TypeScript', 'System Design'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-500/10 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] border-b border-white/5 pb-2">Strategic Role Matrix</p>
                <div className="space-y-4">
                  {[
                    { role: 'Intelligence Architect', match: 96 },
                    { role: 'Performance Engineer', match: 92 },
                    { role: 'Cloud Strategist', match: 88 }
                  ].map(item => (
                    <div key={item.role} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-blue-500/5" style={{ width: `${item.match}%` }} />
                      <div className="relative z-10 flex justify-between items-center">
                        <p className="text-white font-bold text-xs">{item.role}</p>
                        <span className="text-blue-500 font-black text-[11px]">{item.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 glass-card border-white/5 group hover:bg-white/[0.04] transition-all relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.4em] mb-1">Signal Health</p>
                <p className="text-white font-black text-xl">PARITY_NOMINAL</p>
              </div>
              <Activity size={24} className="text-blue-500/40" />
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default JobSearch;
