import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    PlusCircle,
    CheckCircle,
    Clock,
    BookOpen,
    ArrowRight,
    Zap,
    Star,
    ChevronRight,
    Sparkles,
    Target,
    Rocket
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Mon', score: 40 },
    { name: 'Tue', score: 30 },
    { name: 'Wed', score: 65 },
    { name: 'Thu', score: 45 },
    { name: 'Fri', score: 85 },
    { name: 'Sat', score: 70 },
    { name: 'Sun', score: 90 },
];

const StatCard = ({ icon: Icon, label, value, color, description, trend }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 relative overflow-hidden group border-white/5 shadow-2xl bg-white/5 backdrop-blur-3xl"
    >
        <div className="absolute top-[-20%] right-[-10%] opacity-5 group-hover:scale-125 transition-all duration-700">
            <Icon size={120} style={{ color }} />
        </div>
        <div className="flex flex-col gap-8 relative z-10">
            <div className={`p-4 rounded-2xl w-fit shadow-inner bg-slate-100 dark:bg-dark-900 border border-white/5`}>
                <Icon className="w-8 h-8" style={{ color }} />
            </div>
            <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 truncate">{label}</div>
                <div className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter tabular-nums">{value}</div>
            </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6 relative z-10">
            <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${trend >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{description}</span>
            </div>
            <ArrowRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
    </motion.div>
);

const ActivityItem = ({ title, time, type }) => (
    <div className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-white/5 rounded-3xl transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-white/5 shadow-sm hover:shadow-xl">
        <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl shadow-lg ${type === 'quiz' ? 'bg-primary-500/10 text-primary-500' : 'bg-accent-purple/10 text-accent-purple'}`}>
                {type === 'quiz' ? <Zap size={22} /> : <BookOpen size={22} />}
            </div>
            <div>
                <div className="font-black text-slate-700 dark:text-slate-200 tracking-tight text-lg mb-1">{title}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary-500 transition-colors">{time}</div>
            </div>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 dark:bg-dark-950 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4">
            <ChevronRight size={16} />
        </div>
    </div>
);

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'User' };

    return (
        <div className="space-y-16 pb-24 animate-in fade-in duration-1000">
            {/* Header / Intro Tier */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-100 dark:border-white/5 pb-16">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 text-primary-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} />
                        <span>Intelligence Matrix Active</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white leading-none">
                        Neural Feed: <span className="gradient-text">{user.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg tracking-tight">System deconstruction complete. 84% core integration reached.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white dark:bg-dark-900 border border-slate-100 dark:border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Sync Data
                    </button>
                    <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
                        Enter Arena
                        <Zap size={16} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={CheckCircle} label="Neural Quests" value="24" color="#38bdf8" trend={12} description="Velocity" />
                <StatCard icon={Clock} label="Focus Inversion" value="15.5h" color="#8b5cf6" trend={5} description="Cycle Time" />
                <StatCard icon={Target} label="Concepts Mapped" value="12" color="#f43f5e" trend={20} description="Integration" />
                <StatCard icon={Star} label="Evolution Streak" value="7 Days" color="#eab308" trend={0} description="Continuity" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Visual Analytics Cluster */}
                <div className="xl:col-span-8 glass-card p-12 border-white/5 shadow-3xl overflow-hidden relative">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[80px]" />
                    <div className="relative z-10 flex items-center justify-between mb-16">
                        <div>
                            <h3 className="font-black text-2xl tracking-tighter mb-1">Growth Projection</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Knowledge Vector Analysis</p>
                        </div>
                        <div className="flex gap-2">
                            {['7D', '1M', '1Y'].map(t => (
                                <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === '7D' ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-dark-900 text-slate-500 hover:text-primary-600'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f010" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '16px' }}
                                    itemStyle={{ color: '#38bdf8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tactical Side Cluster */}
                <div className="xl:col-span-4 space-y-10">
                    <div className="glass-card p-10 border-white/5 shadow-3xl">
                        <h3 className="font-black text-2xl tracking-tighter mb-8">Neural Stream</h3>
                        <div className="space-y-2">
                            <ActivityItem title="Adversarial Audit: Java" time="2 hours ago" type="quiz" />
                            <ActivityItem title="Vector Map: OOP" time="5 hours ago" type="ai" />
                            <ActivityItem title="Logic Arena: SQL" time="Yesterday" type="quiz" />
                        </div>
                        <button className="w-full mt-10 p-5 rounded-2xl border-2 border-dashed border-slate-100 dark:border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-500/5 transition-all">
                            Historical Archives
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-primary-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden group shadow-[0_35px_60px_-15px_rgba(79,70,229,0.3)] border border-white/10">
                        <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
                            <Rocket size={240} />
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
                            <PlusCircle size={12} />
                            <span>Neural Upgrade Available</span>
                        </div>
                        <h4 className="text-4xl font-black mb-4 relative z-10 leading-none tracking-tighter">Manifest <br /> Elite Status</h4>
                        <p className="text-indigo-200/80 text-sm mb-10 relative z-10 font-medium leading-relaxed max-w-[200px]">
                            Ascend beyond baseline training with unlimited adversarial rounds.
                        </p>
                        <button className="w-full bg-white text-primary-950 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] relative z-10 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            Initialize Protocol
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
