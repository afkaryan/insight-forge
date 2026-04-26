import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Send, 
  Trophy, 
  Bookmark, 
  Plus, 
  Briefcase, 
  ArrowUpRight, 
  Activity,
  Sparkles,
  Zap,
  Bell
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import api from '../services/api';

// Components
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import InsightsPanel from '../components/InsightsPanel';
import ActivityFeed from '../components/ActivityFeed';
import AlertSystem from '../components/AlertSystem';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([
    { id: 1, priority: 'red', title: 'Action Required', message: 'Application deadline approaching for Google Cloud Architect.', time: '12m ago' },
    { id: 2, priority: 'yellow', title: 'Low Match Warning', message: 'Your match score for Netflix Engineering is below 40%.', time: '1h ago' },
    { id: 3, priority: 'green', title: 'Success', message: 'New high match job found (>85%) at Vercel.', time: '3h ago' },
  ]);

  const handleClearAlert = React.useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats(data);
      } catch (err) {
        console.error('Error fetching analytics', err);
        setError('Market telemetry failed to synchronize. Please verify network connectivity.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Memoized Analytics Data
  const applicationTrends = React.useMemo(() => [
    { name: 'Week 1', value: 8 },
    { name: 'Week 2', value: 15 },
    { name: 'Week 3', value: 22 },
    { name: 'Week 4', value: 38 },
  ], []);

  const scoreDistribution = React.useMemo(() => [
    { name: '40-60', value: 3 },
    { name: '60-80', value: 12 },
    { name: '80-90', value: 18 },
    { name: '90-100', value: 7 },
  ], []);

  const skillDistribution = React.useMemo(() => [
    { name: 'Frontend', value: 45, color: '#3b82f6' },
    { name: 'Backend', value: 25, color: '#8b5cf6' },
    { name: 'Design', value: 20, color: '#10b981' },
    { name: 'DevOps', value: 10, color: '#f59e0b' },
  ], []);

  const mockInsights = React.useMemo(() => [
    {
      type: 'match',
      title: 'Vector Parity Shift',
      description: 'Your match score improved by 18% this week due to recent project integrations.'
    },
    {
      type: 'skill',
      title: 'Market Demand Spike',
      description: 'High demand for Backend roles detected in your profile sector [Node.js, Go].'
    },
    {
      type: 'missing',
      title: 'Critical Parity Gap',
      description: 'Missing critical skills for tier-1 roles: System Design and React.'
    },
    {
      type: 'alert',
      title: 'Strategic Pivot',
      description: 'Focusing on Scalability and Cloud Architect certifications could yield a 30% salary delta.'
    }
  ], []);

  const mockActivities = React.useMemo(() => [
    { type: 'application', title: 'Applied to Stripe', description: 'Software Engineer - Platform Team', time: '2h ago' },
    { type: 'upload', title: 'Resume Updated', description: 'Main_Resume_V4.pdf uploaded', time: '5h ago' },
    { type: 'job', title: 'New Match', description: 'Found a job matching 88% of your skills', time: '1d ago' },
  ], []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 0.5], scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500"
      >
        Synchronizing Neural Forge...
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="w-20 h-20 bg-rose-500/10 rounded-[32px] border border-rose-500/20 flex items-center justify-center mb-8">
        <Activity size={40} className="text-rose-500" />
      </div>
      <h2 className="text-3xl font-black text-white tracking-tight mb-4 uppercase">Telemetry Sync Failure</h2>
      <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed mb-10">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
      >
        Retry Synchronization
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container-max pb-32"
    >
      {/* High-Density Balanced Hero Bifurcation */}
      <header className="mb-20 pt-10 relative">
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Command Hub (Left Column) */}
          <div className="col-span-12 lg:col-span-6 relative lg:pt-2">
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.6em]">
                  Forge Intelligence Active
                </span>
              </motion.div>
              
              <h1 className="text-6xl xl:text-7xl font-black tracking-tight text-white leading-[0.95] mb-6">
                Command, <br />
                <span className="gradient-text">{(user?.name || 'User').split(' ')[0]}</span>.
              </h1>
              
              <p className="text-slate-400 text-lg xl:text-xl font-medium max-w-xl leading-relaxed mb-10">
                Strategic telemetry is synchronized. System performance at <span className="text-white font-bold">peak parity</span>. 
                Deploying neural Forge assets for accelerated career trajectory.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <Link to="/upload" className="btn-primary">
                  Forge Assets <Sparkles size={14} className="text-blue-600" />
                </Link>
                <Link to="/jobs" className="btn-secondary">
                  Market Hub
                </Link>
              </div>
            </div>
          </div>

          {/* Intelligence Matrix (Right Column - Mini Dashboard) */}
          <div className="col-span-12 lg:col-span-6 hidden lg:block lg:-mt-4">
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-10 relative overflow-hidden group border-white/10 shadow-2xl hover:border-white/20 transition-all duration-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-xl tracking-tight">Growth Intelligence</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Neural Velocity Stream</p>
                  </div>
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl shadow-inner group-hover:border-blue-500/20 transition-colors">
                    <Activity size={18} className="text-blue-500/80" />
                  </div>
                </div>

                {/* Mini Line Chart */}
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: '01', val: 40 }, { name: '02', val: 32 }, { name: '03', val: 45 }, 
                      { name: '04', val: 38 }, { name: '05', val: 65 }, { name: '06', val: 55 },
                      { name: '07', val: 85 }, { name: '08', val: 78 }, { name: '09', val: 95 }
                    ]}>
                      <defs>
                        <linearGradient id="miniArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#3b82f6" 
                        strokeWidth={2.5} 
                        fill="url(#miniArea)" 
                        animationDuration={2500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Tactical KPI Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group/stat hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-500">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Match</p>
                    <p className="text-white font-bold text-lg mt-1 group-hover/stat:text-blue-400 transition-colors">98.4<span className="text-[10px] text-slate-500 ml-0.5">%</span></p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group/stat hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-500">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Signals</p>
                    <p className="text-white font-bold text-lg mt-1 group-hover/stat:text-blue-400 transition-colors">1.2k</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group/stat hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-500">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Parity</p>
                    <p className="text-white font-bold text-lg mt-1 group-hover/stat:text-blue-400 transition-colors">88<span className="text-[10px] text-slate-500 ml-0.5">%</span></p>
                  </div>
                </div>

                {/* AI Strategic Insights */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 group/insight hover:translate-x-1 transition-transform duration-500">
                    <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10 group-hover/insight:bg-emerald-500/10 transition-colors">
                      <Sparkles size={14} className="text-emerald-500/60" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-[11px] font-bold">Neural Correlation: <span className="text-emerald-500/60 font-black tracking-tight ml-1">82% Match</span></p>
                      <p className="text-slate-500 text-[9px] font-medium tracking-tight mt-0.5 uppercase">Backend Logic Specialized Roles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group/insight hover:translate-x-1 transition-transform duration-500">
                    <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 group-hover/insight:bg-blue-500/10 transition-colors">
                      <Zap size={14} className="text-blue-500/60" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-[11px] font-bold">Market Demand: <span className="text-blue-400/60 font-black tracking-tight ml-1">System Design</span></p>
                      <p className="text-slate-500 text-[9px] font-medium tracking-tight mt-0.5 uppercase">Sector Acceleration Skill Point</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/insight hover:translate-x-1 transition-transform duration-500">
                    <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/10 group-hover/insight:bg-purple-500/10 transition-colors">
                      <Bell size={14} className="text-purple-500/60" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-[11px] font-bold">Signal Alert: <span className="text-purple-400/60 font-black tracking-tight ml-1">3 New High-Match</span></p>
                      <p className="text-slate-500 text-[9px] font-medium tracking-tight mt-0.5 uppercase">Detected in Global Pulse</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localized Bottom Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000" />
            </motion.div>
          </div>
        </div>
      </header>

      <div className="h-px w-full bg-white/[0.04] mb-32" />

      <div className="grid grid-cols-12 gap-12">
        {/* KPI Section */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 relative group">
          {/* Dimensional Anchor Glow */}
          <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <StatCard title="Active Signals" value={stats?.totalApplications || 0} icon={Send} isPrimary={true} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Intelligence Nodes" value={stats?.statusCounts?.interviewing || 0} icon={Users} color="purple" />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Nodes Secured" value={stats?.statusCounts?.offer || 0} icon={Trophy} color="emerald" />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard title="Watchlist Delta" value={stats?.statusCounts?.saved || 0} icon={Bookmark} color="blue" />
        </div>

        {/* Analytics Section Header */}
        <div className="col-span-12 mb-8 mt-24">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">System Analytics</h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>

        {/* Primary Data Row */}
        <div className="col-span-12 lg:col-span-8">
          <ChartCard title="Strategic Growth" type="line" data={applicationTrends} color="#3b82f6" />
        </div>
        
        <div className="col-span-12 lg:col-span-4">
          <AlertSystem alerts={alerts} onClearAlert={handleClearAlert} />
        </div>

        {/* Secondary Intelligence Row */}
        <div className="col-span-12 lg:col-span-4">
          <InsightsPanel insights={mockInsights} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <motion.div 
            className="glass-card p-10 bg-gradient-to-br from-[#0d1117] to-[#020617] border-white/5 relative overflow-hidden group flex flex-col xl:flex-row items-center justify-between gap-16"
          >
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
              <Sparkles size={240} className="text-blue-400" />
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Activity size={32} className="text-blue-500" />
                <h3 className="text-4xl font-black text-white tracking-tight">Market Intelligence IQ</h3>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                Your profile vector is currently processing against <span className="text-white italic">4.2M global data nodes</span>. Current performance parity: <span className="text-blue-400 font-black">TOP 5.2%</span> globally.
              </p>
              
              <div className="mt-12 flex gap-8">
                <div className="px-8 py-4 bg-white/[0.02] rounded-3xl border border-white/5 flex flex-col">
                  <span className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.3em] mb-2">Sector Baseline</span>
                  <span className="text-2xl font-black text-slate-400">62%</span>
                </div>
                <div className="px-8 py-4 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex flex-col">
                  <span className="text-[11px] text-blue-500/60 font-bold uppercase tracking-[0.3em] mb-2">Vector Delta</span>
                  <span className="text-2xl font-black text-blue-400">+{((stats?.averageMatchScore || 75) - 62).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <svg className="w-56 h-56 transform -rotate-90 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <circle cx="112" cy="112" r="96" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/[0.02]" />
                <motion.circle
                  cx="112" cy="112" r="96" stroke="currentColor" strokeWidth="16" fill="transparent"
                  strokeDasharray={603}
                  initial={{ strokeDashoffset: 603 }}
                  animate={{ strokeDashoffset: 603 - (603 * (stats?.averageMatchScore || 75)) / 100 }}
                  className="text-blue-500"
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-white tracking-tighter">{stats?.averageMatchScore || 75}%</span>
                <span className="text-[11px] text-slate-600 font-black uppercase tracking-[0.2em] mt-2">Pulse Rate</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tertiary Intelligence Row */}
        <div className="col-span-12 lg:col-span-4">
          <ChartCard title="Sector Saturation" type="pie" data={skillDistribution} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ChartCard title="Delta Distribution" type="bar" data={scoreDistribution} color="#8b5cf6" />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ActivityFeed activities={mockActivities} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
