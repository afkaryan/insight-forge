import React from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

const ChartCard = ({ title, type = 'area', data, dataKey = 'value', categoryKey = 'name', color = '#64748b' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f1218]/95 border border-white/5 p-6 rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-4">{label}</p>
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full glow-blue" style={{ backgroundColor: color }} />
             <p className="text-white text-2xl font-black tracking-tighter leading-none">{payload[0].value}</p>
          </div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">Node Delta Synced</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`colorValue-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff03" />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={4}
              fillOpacity={1} 
              fill={`url(#colorValue-${title.replace(/\s+/g, '')})`} 
              animationDuration={2500}
              animationEasing="cubic-bezier(0.16, 1, 0.3, 1)"
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff03" />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.01)' }} />
            <Bar dataKey={dataKey} radius={[12, 12, 0, 0]} barSize={44} animationDuration={2000}>
              {(data || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color || color} fillOpacity={1} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'line':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff03" />
            <XAxis 
              dataKey={categoryKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={5}
              fill="transparent"
              animationDuration={2500}
              animationEasing="cubic-bezier(0.16, 1, 0.3, 1)"
            />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data || []}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={115}
              paddingAngle={12}
              stroke="none"
              dataKey={dataKey}
              animationDuration={1800}
            >
              {(data || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color || color} fillOpacity={1} />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-card p-10 h-[450px] flex flex-col relative overflow-hidden group border-white/5 hover:border-white/10"
    >
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mt-3">{type.toUpperCase()} ANALYSIS</p>
        </div>
      </div>
      <div className="flex-1 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default React.memo(ChartCard);
