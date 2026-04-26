import React from 'react';
import { motion } from 'framer-motion';

const JobCardSkeleton = () => {
  return (
    <div className="glass-card rounded-[48px] overflow-hidden border-white/5 bg-white/[0.01] mb-8 p-10 relative">
      {/* Shimmer Effect */}
      <motion.div 
        initial={{ x: '-150%' }}
        animate={{ x: '150%' }}
        transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-12"
      />

      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
            <div className="flex-1">
              <div className="h-8 w-1/2 bg-white/5 rounded-lg animate-pulse mb-3" />
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end justify-between min-w-[220px] gap-8">
          <div className="w-full">
            <div className="h-10 w-24 bg-white/5 rounded-lg animate-pulse mb-3 ml-auto" />
            <div className="h-2 w-full bg-slate-900 rounded-full border border-white/5" />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="h-12 w-32 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-12 w-28 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 h-10 w-1/3 mx-auto bg-white/5 rounded-lg animate-pulse" />
    </div>
  );
};

export default JobCardSkeleton;
