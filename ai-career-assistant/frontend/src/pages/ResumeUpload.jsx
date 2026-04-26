import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
    setParsedData(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Neural scan requires a PDF document source.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await api.post('/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Source file successfully integrated and indexed.');
      setParsedData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Signal interruption during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-max pb-32"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 pt-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-px bg-blue-500/50" />
             <span className="text-[9px] font-black uppercase tracking-[0.6em] text-blue-500">Intelligence Node</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-black text-white tracking-tight leading-[0.95]">
            Skill <span className="gradient-text italic font-black">Synchronization</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
             Upload your performance vectors to synchronize your capabilities with the <span className="text-white italic">global intelligence market</span>.
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-7 glass-card p-10 rounded-[40px] border-white/5"
        >
          <form onSubmit={handleUpload} className="space-y-10">
            <div 
              className="border-2 border-dashed border-white/5 rounded-[32px] p-20 text-center hover:bg-white/[0.02] hover:border-blue-500/30 transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => document.getElementById('file-upload').click()}
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-2xl">
                  <UploadCloud size={36} className="text-slate-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Initialize Vector Scan</h3>
                <p className="text-slate-500 text-sm font-medium">Drag-and-drop performance PDF or browse secure storage</p>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
              </div>
            </div>

            <AnimatePresence>
              {file && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <FileText size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold truncate max-w-[200px]">{file.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(2)} MB • READY</div>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-emerald-500" />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-xs font-bold uppercase tracking-wider">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            
            {message && (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 size={16} /> {message}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || uploading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                !file || uploading 
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                  : 'bg-white text-black hover:bg-slate-200 active:scale-[0.98]'
              }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Processing Vectors...
                </span>
              ) : 'Execute Synchronization'}
            </button>
          </form>
        </motion.div>

        <div className="col-span-12 lg:col-span-5 space-y-10">
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card p-8 rounded-[40px] border-white/5 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <BrainCircuit size={100} />
             </div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
               <div className="p-2 bg-indigo-500/10 rounded-xl">
                 <Sparkles size={20} className="text-indigo-400" />
               </div>
               AI Parsing Engine
             </h3>
             <ul className="space-y-4">
               {[
                 'Automated entity extraction using regex patterns',
                 'Intelligence mapping across 20+ technologies',
                 'Market relevance scoring in real-time',
                 'Skill gap delta calculation'
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-400">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                   {item}
                 </li>
               ))}
             </ul>
          </motion.div>

          <AnimatePresence>
            {parsedData && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-[40px] border-white/5 bg-emerald-500/[0.02]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black tracking-tight text-white uppercase text-xs tracking-[0.2em]">Synchronization Result</h3>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Success</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Extracted Capability Profile</div>
                  <div className="flex flex-wrap gap-3">
                    {parsedData?.skills?.map((skill, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 text-blue-400 border border-white/10 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeUpload;
