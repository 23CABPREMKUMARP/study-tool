import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusCircle,
    Map,
    ChevronRight,
    Calendar,
    Target,
    CheckCircle2,
    Circle,
    Download,
    Share2,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import axios from 'axios';

const RoadmapGenerator = () => {
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!goal.trim()) return;

        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/ai/roadmap',
                { goal },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setRoadmap(data);
        } catch (err) {
            console.error(err);
            // Demo fallback
            setRoadmap({
                title: `Mastery Path: ${goal}`,
                duration: "~42 Days of Deep Study",
                milestones: [
                    {
                        week: "PHASE 01",
                        topic: "The Core Blueprint",
                        description: "Establish defensive coding patterns and primary syntax architectures.",
                        items: ["Architectural Patterns (MVC/Microservices)", "Advanced Data Marshalling", "Concurrency & Parallelism", "Memory Optimization"]
                    },
                    {
                        week: "PHASE 02",
                        topic: "System Resiliency",
                        description: "Build logic that withstands high-entropy environments and peak loads.",
                        items: ["Distributed Consensus (Raft/Paxos)", "Event-Driven Orchestration", "Zero-Trust Security Models", "Rate Limiting & Throttling"]
                    },
                    {
                        week: "PHASE 03",
                        topic: "Data Sovereignty",
                        description: "Engineered persistence layers with optimized read/write performance.",
                        items: ["Schema Sharding Strategies", "Indexing Depth Analysis", "Polyglot Persistence", "ACID vs BASE trade-offs"]
                    },
                    {
                        week: "PHASE 04",
                        topic: "The Deployment Grid",
                        description: "Automated scaling and resilient infrastructure orchestration.",
                        items: ["Blue/Green Deployment Logic", "Observability (Tracing/Metrics)", "Kubernetes Mesh Networking", "Chaos Engineering Basics"]
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-24 animate-in fade-in duration-700">
            <div className="mb-16">
                <h1 className="text-4xl font-black tracking-tight mb-4 flex items-center gap-4">
                    Neural <span className="gradient-text">Roadmap</span> Builder
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">
                    Define your technical objective and let our AI generate an optimized vector for your career growth.
                </p>
            </div>

            {/* Premium Input Section */}
            <div className="glass-card p-10 mb-16 relative overflow-hidden border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-primary-500">
                    <Sparkles size={120} />
                </div>

                <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-500 z-10">
                            <Target size={24} />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-16 pr-12 py-6 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-[2rem] outline-none transition-all text-xl font-bold shadow-inner placeholder:text-slate-300 dark:placeholder:text-slate-800"
                            placeholder="e.g. Lead Engineer at a FinTech Unicorn"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Active</span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary !rounded-[2rem] px-12 py-6 flex items-center justify-center gap-3 whitespace-nowrap shadow-xl shadow-primary-500/30 active:scale-95 transition-all text-sm font-black uppercase tracking-widest"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <PlusCircle size={22} />
                                Synthesize Path
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 flex flex-wrap gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 py-2">Quick Presets:</span>
                    {['Senior Full-Stack', 'Cloud Architect', 'Security Analyst'].map(t => (
                        <button
                            key={t}
                            onClick={() => setGoal(t)}
                            className="px-5 py-2.5 bg-white dark:bg-dark-800 border border-slate-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-500 hover:border-primary-500/30 transition-all shadow-sm active:scale-90"
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {roadmap ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 glass-card bg-slate-50/50 dark:bg-dark-900/50 border-white/5">
                            <div className="flex items-center gap-8">
                                <div className="bg-gradient-to-tr from-primary-600 to-accent-purple p-5 rounded-[2.5rem] shadow-xl rotate-3">
                                    <Map className="text-white" size={40} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black mb-2">{roadmap.title}</h2>
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-black/20 rounded-lg text-primary-500"><Calendar size={14} /> {roadmap.duration}</span>
                                        <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-black/20 rounded-lg text-accent-purple"><CheckCircle2 size={14} /> Comprehensive </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-4 glass-card !rounded-2xl hover:bg-white transition-all shadow-sm text-slate-400 hover:text-primary-600"><Download size={22} /></button>
                                <button className="p-4 glass-card !rounded-2xl hover:bg-white transition-all shadow-sm text-slate-400 hover:text-accent-purple"><Share2 size={22} /></button>
                            </div>
                        </div>

                        {/* Immersive Vertical Timeline */}
                        <div className="relative ml-4 md:ml-0 md:flex md:flex-col md:items-center">
                            {/* Central Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-600 via-accent-purple to-slate-200 dark:to-dark-800 md:-ml-0.5 rounded-full" />

                            <div className="space-y-24 relative w-full">
                                {roadmap.milestones.map((milestone, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`flex flex-col md:flex-row items-center gap-12 w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Connector Circle */}
                                        <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white dark:bg-dark-950 border-4 border-primary-600 rounded-full md:-ml-6 flex items-center justify-center z-10 shadow-2xl">
                                            <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse" />
                                        </div>

                                        {/* Content Area */}
                                        <div className={`w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] ml-20 md:ml-0`}>
                                            <div className="glass-card p-10 border-white/5 shadow-2xl hover:border-primary-500/20 transition-all group relative overflow-hidden bg-white/80 dark:bg-dark-900/80">
                                                <div className="absolute -right-8 -top-8 p-12 bg-slate-50 dark:bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700">
                                                    <Sparkles size={32} className="text-primary-500" />
                                                </div>

                                                <div className="flex items-center justify-between mb-8">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 px-4 py-2 bg-primary-500/5 rounded-xl border border-primary-500/10">
                                                        {milestone.week}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-black mb-4 tracking-tight">{milestone.topic}</h3>
                                                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-8 leading-relaxed">
                                                    {milestone.description}
                                                </p>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {milestone.items.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-black/20 rounded-2xl border border-transparent hover:border-primary-500/10 transition-colors">
                                                            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50" />
                                                            <span>{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end">
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-primary-600 flex items-center gap-3 hover:translate-x-2 transition-transform">
                                                        Access Intel Modules <ArrowRight size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Empty Space for the other side on desktop */}
                                        <div className="hidden md:block md:w-[calc(50%-4rem)]" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-12 bg-gradient-to-br from-primary-600 to-accent-purple text-white border-none text-center shadow-3xl shadow-primary-600/20 mt-20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <h3 className="text-4xl font-black mb-6 tracking-tight">Deployment Ready? 🚀</h3>
                            <p className="max-w-xl mx-auto mb-10 text-lg font-medium opacity-90 leading-relaxed">
                                This vector is now synchronized with your profile. Your progress across modules will dynamically refine this roadmap.
                            </p>
                            <button className="bg-white text-primary-600 px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl active:scale-95">
                                Lock Roadmap to Identity
                            </button>
                        </div>
                    </motion.div>
                ) : !loading && (
                    <div className="text-center py-24 opacity-60">
                        <div className="w-32 h-32 bg-slate-100 dark:bg-dark-900 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-inner rotate-3">
                            <Map size={60} className="text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Awaiting Objective Input</h3>
                        <p className="text-slate-400 font-medium">Your localized learning vector will manifest here.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoadmapGenerator;
