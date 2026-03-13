import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Book, Lightbulb, Code as CodeIcon, AlertCircle, Copy, Share2, ArrowRight, Star, Brain } from 'lucide-react';
import axios from 'axios';

const ResponseSection = ({ icon: Icon, title, content, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="mb-12 last:mb-0 relative group"
    >
        <div className="flex items-center gap-5 mb-6">
            <div className="p-4 rounded-[1.2rem] shadow-2xl transition-transform group-hover:rotate-6 bg-slate-100 dark:bg-dark-900 border border-white/5" style={{ color }}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-1">{title}</h4>
                <div className="h-0.5 w-12 bg-gradient-to-r from-current to-transparent" style={{ color }} />
            </div>
        </div>

        <div className="glass-card p-10 text-slate-700 dark:text-slate-200 leading-relaxed border-white/5 shadow-3xl bg-white/5 backdrop-blur-3xl overflow-hidden relative group-hover:border-primary-500/20 transition-all">
            <div className="absolute top-[-20%] right-[-10%] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Icon size={200} style={{ color }} />
            </div>
            {typeof content === 'string' ? (
                <p className="text-xl font-bold tracking-tight whitespace-pre-wrap leading-relaxed relative z-10">{content}</p>
            ) : (
                <div className="relative z-10">{content}</div>
            )}
        </div>
    </motion.div>
);

const AIExplainer = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const currentQuery = query;
        setQuery('');
        setHistory(prev => [...prev, { role: 'user', content: currentQuery }]);
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/ai/explain',
                { question: currentQuery },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            setHistory(prev => [...prev, { role: 'ai', content: data }]);
        } catch (err) {
            console.error(err);
            // Enhanced fallback for better demo experience
            const fallbackData = {
                definition: "Neural Sync Failed: Signal latency detected.",
                explanation: "Your request reached the neural buffer, but the AI core return was interrupted. Ensure your GEMINI_API_KEY is active in the environment manifest.",
                analogy: "Like a transmission lost in a solar flare—data exists, but the link is broken.",
                code: "// Connection Error Log\nsystem.log('Check .env for GEMINI_API_KEY');\nif (!apiKey) throw new Error('Neural Core Offline');",
                tip: "Always verify your environment synchronization before high-stakes deconstruction.",
                mistakes: "Assuming local buffers cover cloud-based neural nodes.",
                followUp: ["How to configure API keys?", "Check network status?", "Retry synchronization?"]
            };
            setHistory(prev => [...prev, { role: 'ai', content: fallbackData }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-48 animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-slate-100 dark:border-white/5 pb-16">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 text-primary-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} />
                        <span>Advanced Knowledge Extraction Mode</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white leading-none">
                        Neural <span className="gradient-text">Explainer</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg tracking-tight">Deconstruct any technical concept with AI-level precision.</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 bg-slate-50 dark:bg-dark-900 rounded-2xl text-slate-500 hover:text-primary-600 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5 shadow-sm">
                        <Share2 size={24} />
                    </button>
                    <button onClick={() => setHistory([])} className="p-4 bg-slate-50 dark:bg-dark-900 rounded-2xl text-slate-500 hover:text-red-500 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5 shadow-sm">
                        <ArrowRight size={24} className="rotate-180" />
                    </button>
                </div>
            </div>

            {/* Chat History Tier */}
            <div className="space-y-24 mb-24 min-h-[50vh]">
                {history.map((msg, idx) => (
                    <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {msg.role === 'user' ? (
                            <div className="flex justify-end pr-4">
                                <div className="bg-gradient-to-tr from-primary-600 to-indigo-700 text-white px-10 py-6 rounded-[2.5rem] rounded-tr-none shadow-3xl max-w-[80%] font-black text-xl tracking-tight leading-relaxed active:scale-95 transition-transform">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-4 px-1 border-b border-white/20 pb-2">Query Injected</div>
                                    {msg.content}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                <div className="flex gap-10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-primary-600 via-accent-purple to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] border border-white/20 animate-pulse-slow">
                                        <Sparkles size={32} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-12 border-b border-slate-100 dark:border-white/5 pb-8">
                                            <div>
                                                <h3 className="font-black text-3xl tracking-tighter">Deconstruction Result</h3>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Model: Gemini-Pro-Neural-4.0</span>
                                            </div>
                                            <div className="flex gap-4">
                                                <button className="p-4 bg-slate-50 dark:bg-dark-900 rounded-2xl text-slate-400 hover:text-primary-600 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5 shadow-sm"><Copy size={20} /></button>
                                            </div>
                                        </div>

                                        <ResponseSection icon={Book} title="Neural Definition" content={msg.content.definition} color="#3b82f6" delay={0.1} />
                                        <ResponseSection icon={Sparkles} title="Integration Logic" content={msg.content.explanation} color="#8b5cf6" delay={0.2} />
                                        <ResponseSection icon={AlertCircle} title="Concept Analogy" content={msg.content.analogy} color="#f59e0b" delay={0.3} />

                                        <ResponseSection
                                            icon={CodeIcon}
                                            title="Implementation Manifest"
                                            color="#10b981"
                                            delay={0.4}
                                            content={
                                                <div className="relative group overflow-hidden rounded-[2rem] shadow-3xl">
                                                    <div className="absolute top-0 left-0 right-0 h-8 bg-dark-950 flex items-center gap-2 px-6 border-b border-white/5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-4">Vector_Source_Manifest.java</span>
                                                    </div>
                                                    <pre className="!bg-dark-950 !p-12 !pt-16 font-mono text-base border border-white/5 overflow-x-auto">
                                                        <code className="text-primary-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">{msg.content.code}</code>
                                                    </pre>
                                                </div>
                                            }
                                        />

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16"
                                        >
                                            <div className="p-10 bg-green-500/5 rounded-[2.5rem] border border-green-500/10 hover:bg-green-500/10 transition-colors shadow-sm">
                                                <h4 className="font-black text-green-500 mb-6 flex items-center gap-3 uppercase tracking-[0.3em] text-[10px]">
                                                    <Star size={16} /> Adversarial Edge
                                                </h4>
                                                <p className="text-lg font-bold text-green-700/80 dark:text-green-400/80 leading-relaxed italic">"{msg.content.tip}"</p>
                                            </div>
                                            <div className="p-10 bg-red-500/5 rounded-[2.5rem] border border-red-500/10 hover:bg-red-500/10 transition-colors shadow-sm">
                                                <h4 className="font-black text-red-500 mb-6 flex items-center gap-3 uppercase tracking-[0.3em] text-[10px]">
                                                    <AlertCircle size={16} /> Signal Corruption
                                                </h4>
                                                <p className="text-lg font-bold text-red-700/80 dark:text-red-400/80 leading-relaxed italic">"{msg.content.mistakes}"</p>
                                            </div>
                                        </motion.div>

                                        {msg.content.followUp && (
                                            <div className="mt-20 bg-slate-50/50 dark:bg-dark-900/50 border border-slate-100 dark:border-white/5 p-12 rounded-[3.5rem] shadow-inner">
                                                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-10 text-center">Synchronize Next Vector</h4>
                                                <div className="flex flex-wrap justify-center gap-6">
                                                    {msg.content.followUp.map((q, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setQuery(q)}
                                                            className="px-10 py-5 bg-white dark:bg-dark-950 hover:bg-primary-600 hover:text-white font-black text-xs uppercase tracking-widest rounded-3xl transition-all shadow-2xl border border-slate-100 dark:border-white/5 active:scale-95 group flex items-center gap-4"
                                                        >
                                                            {q}
                                                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-10 animate-pulse px-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-white/5" />
                        <div className="flex-1 space-y-8 pt-4">
                            <div className="h-6 bg-slate-50 dark:bg-dark-900 rounded-full w-1/4" />
                            <div className="h-64 bg-slate-50 dark:bg-dark-900 rounded-[3rem] w-full" />
                        </div>
                    </div>
                )}

                {history.length === 0 && (
                    <div className="text-center py-48">
                        <div className="w-32 h-32 bg-slate-100 dark:bg-dark-900 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-3xl border border-white/5">
                            <Brain size={64} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <h3 className="text-4xl font-black mb-4 tracking-tighter">Awaiting Signal Inversion</h3>
                        <p className="font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">Initialize query to begin deconstruction</p>
                    </div>
                )}
            </div>

            {/* Futuristic Command Bar */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-[100]">
                <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-primary-600/30 via-accent-purple/30 to-primary-600/30 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                    <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-dark-950/80 rounded-[2.3rem] p-4 flex gap-4 border border-white/10 shadow-inner group focus-within:ring-2 ring-primary-500/20 transition-all">
                        <input
                            type="text"
                            className="flex-1 bg-transparent px-8 py-5 outline-none font-black text-xl tracking-tight text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-medium"
                            placeholder="Inject technical query... e.g. Deconstruct Redis Architecture"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-600 hover:bg-primary-500 text-white rounded-[1.8rem] px-12 flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={24} />
                                    <span className="font-black text-xs uppercase tracking-widest hidden sm:inline">Exfiltrate</span>
                                </>
                            )}
                        </button>
                    </form>
                    <div className="mt-4 flex justify-center gap-12 text-[8px] font-black uppercase tracking-[0.4em] text-slate-500/50">
                        <span className="flex items-center gap-2"><Sparkles size={8} /> Neural Active</span>
                        <span className="flex items-center gap-2"><Book size={8} /> Logic Sync Ready</span>
                        <span className="flex items-center gap-2"><CodeIcon size={8} /> Manifest Terminal Enabled</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIExplainer;
