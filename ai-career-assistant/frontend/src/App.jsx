import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Sparkles, LayoutDashboard, Brain, Globe, ListChecks, LogOut, ShieldCheck, Search } from 'lucide-react';
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ResumeUpload = React.lazy(() => import('./pages/ResumeUpload'));
const JobSearch = React.lazy(() => import('./pages/JobSearch'));
const AppTracker = React.lazy(() => import('./pages/AppTracker'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-12 h-12 border-2 border-blue-500/10 border-t-blue-500 rounded-full"
      />
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

const Navbar = React.memo(() => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.03] bg-[#0a0f1c]/80 backdrop-blur-3xl saturate-150">
      <div className="max-w-[1680px] mx-auto flex justify-between items-center px-10 py-5">
        <div className="flex items-center gap-14">
          <Link to="/" className="text-xl font-black tracking-tighter text-white flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Brain size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">InsightForge</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-500/60 mt-1">Intelligence Platform</span>
            </div>
          </Link>
          
          {user && (
            <div className="hidden xl:flex items-center gap-2">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <Link to="/upload" className="nav-link">
                Intelligence
              </Link>
              <Link to="/jobs" className="nav-link">
                Markets
              </Link>
              <Link to="/tracker" className="nav-link">
                Analysis
              </Link>
            </div>
          )}
        </div>

        <div className="flex gap-6 items-center">
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end hidden sm:flex text-right">
                <div className="flex items-center gap-3 px-4 py-1.5 bg-white/[0.02] rounded-xl border border-white/[0.05] shadow-inner">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[13px] font-bold text-white">{user.name}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-[8px] font-black uppercase tracking-[0.4em] text-slate-600">
                  <ShieldCheck size={10} className="text-blue-500/40" /> Enterprise Alpha
                </div>
              </div>
              <div className="w-px h-8 bg-white/[0.05]" />
              <button 
                onClick={logout}
                className="p-2.5 text-slate-600 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all border border-transparent hover:border-rose-500/10 active:scale-95"
                title="Terminate Session"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <Link to="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="btn-primary">Initiate Forge</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <React.Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500"
        >
          Initializing Intelligence
        </motion.div>
      </div>
    }>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobSearch /></ProtectedRoute>} />
            <Route path="/tracker" element={<ProtectedRoute><AppTracker /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </React.Suspense>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#020217] text-[#f1f5f9] flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            <main className="flex-grow container-max pt-24 pb-12">
              <AnimatedRoutes />
            </main>
            
            <footer className="py-20 border-t border-white/5 mt-auto bg-[#04040a]">
              <div className="container-max flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col items-center md:items-start gap-4">
                   <div className="text-xl font-black tracking-tighter text-white flex items-center gap-3 opacity-60">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Brain size={18} />
                      </div>
                      InsightForge
                   </div>
                   <p className="text-slate-500 text-[13px] font-medium max-w-sm text-center md:text-left leading-relaxed">Advanced autonomous career intelligence for the next generation of professional talent.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
                  <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Protocols</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Status</a>
                </div>
              </div>
              <div className="container-max mt-20 pt-10 border-t border-white/[0.03] text-center">
                 <p className="text-[9px] uppercase tracking-[0.5em] font-black text-slate-800">© 2026 INSIGHTFORGE SYSTEMS. ALL RIGHTS RESERVED.</p>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
