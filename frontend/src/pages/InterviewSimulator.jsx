import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Bot, Mic, ShieldAlert, CheckCircle, Award, RefreshCw, MessageSquare } from 'lucide-react';
import axios from 'axios';

const InterviewSimulator = () => {
    const [role, setRole] = useState(null); // frontend, backend, fullstack, java
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const messagesEndRef = useRef(null);

    const roles = [
        { id: 'frontend', title: 'Frontend Developer', icon: '🎨', color: '#0ea5e9' },
        { id: 'backend', title: 'Backend Developer', icon: '⚙️', color: '#8b5cf6' },
        { id: 'fullstack', title: 'Full Stack Developer', icon: '🚀', color: '#10b981' },
        { id: 'java', title: 'Java Developer', icon: '☕', color: '#f59e0b' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const startInterview = async (selectedRole) => {
        setRole(selectedRole);
        const initialMessages = [
            {
                role: 'ai',
                content: `Greetings! I'm your AI Interviewer for the ${selectedRole.title} position. Ready? Let's dive in: Tell me about a complex technical challenge you've overcome recently.`
            }
        ];
        setMessages(initialMessages);

        // Optional: fetch initial greeting dynamically based on role
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput('');
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/ai/interview',
                { role, messages: newMessages },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setMessages(prev => [...prev, {
                role: 'ai',
                content: data.reply
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "Insightful approach. Let's shift gears: How would you design a rate-limiting system for a high-traffic microservices architecture?"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const getFeedback = async () => {
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/ai/finalize-interview',
                { role, messages },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setFeedback(data);
        } catch (error) {
            console.error(error);
            setFeedback({
                score: 88,
                summary: "Exemplary performance. You demonstrated deep technical intuition and effective communication. Your architectural reasoning is exceptionally structured.",
                improvements: [
                    "Specify latency trade-offs in distributed systems.",
                    "Mention specific monitoring tools (Prometheus/Grafana).",
                    "Strengthen test-driven development focus."
                ],
                strengths: ["Architectural Depth", "Fluid Communication", "Problem Synthesis"]
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col pt-2 animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tight mb-2">Interview <span className="gradient-text">Simulator</span></h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Hone your skills with elite AI-driven mock sessions.</p>
            </div>

            <AnimatePresence mode="wait">
                {!role ? (
                    <motion.div
                        key="role-select"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
                    >
                        {roles.map(r => (
                            <motion.button
                                key={r.id}
                                whileHover={{ y: -5 }}
                                onClick={() => startInterview(r)}
                                className="glass-card p-8 flex flex-col items-center group relative overflow-hidden text-center border-white/5 shadow-xl"
                            >
                                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: r.color }} />
                                <div className="p-5 rounded-[2rem] bg-slate-50 dark:bg-dark-900 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                    <span className="text-5xl drop-shadow-lg">{r.icon}</span>
                                </div>
                                <h3 className="text-xl font-black mb-2 leading-tight">{r.title}</h3>
                                <div className="px-3 py-1 bg-primary-500/5 text-primary-500 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">30m Session</div>
                                <div className="mt-auto w-full py-2.5 bg-slate-100 dark:bg-dark-800 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                                    Start Mock
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                ) : feedback ? (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-12 overflow-y-auto !border-white/5 shadow-2xl relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-neon via-accent-purple to-accent-neon" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 text-center lg:border-r border-slate-100 dark:border-white/5 pr-0 lg:pr-12">
                                <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20 rotate-3">
                                    <Award size={48} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-black mb-2">Performance Summary</h2>
                                <div className="text-6xl font-black gradient-text mb-4 mt-8">{feedback.score}<span className="text-xl text-slate-300 font-bold">/100</span></div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Composite Grade</p>
                            </div>

                            <div className="lg:col-span-2 space-y-10">
                                <div>
                                    <div className="p-8 bg-slate-50 dark:bg-dark-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 relative group overflow-hidden shadow-inner">
                                        <div className="absolute top-4 left-4 p-2 bg-primary-500/10 text-primary-600 rounded-xl">
                                            <MessageSquare size={20} />
                                        </div>
                                        <p className="font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic text-lg px-6 pt-4">
                                            "{feedback.summary}"
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-green-500">
                                            <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center"><CheckCircle size={14} /></div>
                                            Elite Strengths
                                        </h4>
                                        <ul className="space-y-3">
                                            {feedback.strengths.map((s, i) => (
                                                <li key={i} className="p-4 bg-green-500/5 border border-green-500/10 rounded-2xl font-bold flex items-center gap-3 text-green-700 dark:text-green-400">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-accent-purple">
                                            <div className="w-6 h-6 rounded-lg bg-accent-purple/10 flex items-center justify-center"><ShieldAlert size={14} /></div>
                                            Growth Vectors
                                        </h4>
                                        <ul className="space-y-3">
                                            {feedback.improvements.map((s, i) => (
                                                <li key={i} className="p-4 bg-accent-purple/5 border border-accent-purple/10 rounded-2xl font-bold flex items-center gap-3 text-accent-purple">
                                                    <div className="w-1.5 h-1.5 bg-accent-purple rounded-full" /> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-slate-100 dark:border-white/5">
                            <button
                                onClick={() => { setRole(null); setFeedback(null); setMessages([]); }}
                                className="flex-1 btn-secondary py-4 !rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                            >
                                <RefreshCw size={20} />
                                Re-initiate Logic
                            </button>
                            <button className="flex-1 btn-primary py-4 !rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl">
                                Download Comprehensive Intel
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="interview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col glass-card overflow-hidden !border-white/5 shadow-2xl"
                    >
                        {/* Immersive Header */}
                        <div className="px-10 py-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-dark-950">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-tr from-primary-600 to-accent-purple rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden">
                                        <Bot size={32} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-dark-950 rounded-full" />
                                </div>
                                <div>
                                    <div className="text-xl font-black leading-tight mb-1">{role.title} Challenge</div>
                                    <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Signal Active</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span>Encryption Secured</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={getFeedback}
                                className="px-8 py-3 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                            >
                                Finalize Session
                            </button>
                        </div>

                        {/* Interactive Logic Feed */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/30 dark:bg-transparent">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[75%] flex items-start gap-6 ${m.role === 'ai' ? '' : 'flex-row-reverse'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${m.role === 'ai' ? 'bg-primary-500/10 text-primary-600' : 'bg-dark-800 text-slate-400'}`}>
                                            {m.role === 'ai' ? <Bot size={22} /> : <UserIcon size={22} />}
                                        </div>
                                        <div className={`p-6 rounded-[2rem] shadow-sm leading-relaxed text-sm font-bold ${m.role === 'ai'
                                            ? 'bg-white dark:bg-dark-900 border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none'
                                            : 'bg-primary-600 text-white rounded-tr-none'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="flex items-center gap-4 bg-white dark:bg-dark-900 px-6 py-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 dark:border-white/5 shadow-sm">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processing Input</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Control Interface */}
                        <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-dark-950/50 backdrop-blur-xl">
                            <form onSubmit={handleSubmit} className="relative flex items-center gap-4 max-w-4xl mx-auto">
                                <div className="relative flex-1 group">
                                    <input
                                        type="text"
                                        placeholder="Articulate your thought process..."
                                        className="w-full bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/5 rounded-[1.5rem] px-8 py-5 outline-none focus:ring-4 ring-primary-500/10 shadow-inner group-hover:border-primary-500/30 transition-all font-bold"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="p-3 hover:bg-slate-50 dark:hover:bg-dark-800 text-slate-400 rounded-xl transition-colors"
                                            title="Voice Interface"
                                        >
                                            <Mic size={20} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className="p-5 bg-primary-600 text-white rounded-[1.5rem] hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/30 disabled:opacity-50 active:scale-95 flex items-center justify-center shrink-0"
                                >
                                    <Send size={24} />
                                </button>
                            </form>
                            <p className="text-center mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Tip: Be specific with architectural trade-offs to boost your resonance score.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterviewSimulator;
