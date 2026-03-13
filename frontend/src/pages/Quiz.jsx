import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, CheckCircle, XCircle, ChevronRight, RotateCcw, Award, BookOpen, Clock, Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Quiz = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [quizComplete, setQuizComplete] = useState(false);

    const categories = [
        { id: 'java', title: 'Java Core', icon: '☕', questions: 20, difficulty: 'Medium', color: '#f59e0b', gradient: 'from-amber-400 to-orange-600' },
        { id: 'react', title: 'React JS', icon: '⚛️', questions: 15, difficulty: 'Hard', color: '#0ea5e9', gradient: 'from-sky-400 to-blue-600' },
        { id: 'ds', title: 'DS & Algo', icon: '📊', questions: 25, difficulty: 'Medium', color: '#8b5cf6', gradient: 'from-purple-400 to-indigo-600' },
        { id: 'sql', title: 'SQL & DB', icon: '🗄️', questions: 10, difficulty: 'Easy', color: '#10b981', gradient: 'from-emerald-400 to-teal-600' },
        { id: 'sys', title: 'System Design', icon: '🏗️', questions: 12, difficulty: 'Hard', color: '#6366f1', gradient: 'from-indigo-400 to-blue-700' },
        { id: 'os', title: 'OS Basics', icon: '💻', questions: 15, difficulty: 'Medium', color: '#64748b', gradient: 'from-slate-400 to-slate-700' },
    ];

    const [questions, setQuestions] = useState([
        {
            question: "Which of the following is NOT a feature of Java?",
            options: [
                "Object-Oriented",
                "Explicit pointer manipulation",
                "Portable and Architecture-neutral",
                "Garbage Collected"
            ],
            correct: 1,
            explanation: "Java does not support explicit pointers for security and simplicity. Memory management is handled automatically by the Garbage Collector."
        },
        {
            question: "What is the primary purpose of the 'useEffect' hook in React?",
            options: [
                "To manage local state",
                "To speed up rendering",
                "To perform side effects",
                "To handle routing logic"
            ],
            correct: 2,
            explanation: "The useEffect Hook allows you to perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM."
        }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (activeTab === 'active' && timeLeft > 0 && !showExplanation) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && activeTab === 'active') {
            handleAnswerSelect(-1);
        }
        return () => clearInterval(timer);
    }, [activeTab, timeLeft, showExplanation]);

    const startQuiz = async (cat) => {
        setSelectedCategory(cat);
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(30);
        setQuizComplete(false);
        setLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/quiz/generate',
                { category: cat.title, difficulty: cat.difficulty },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            if (data && data.length > 0) {
                setQuestions(data);
            }
        } catch (error) {
            console.error(error);
            // using fallback questions
        } finally {
            setLoading(false);
            setActiveTab('active');
        }
    };

    const handleAnswerSelect = (index) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
        setShowExplanation(true);
        if (index === questions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setTimeLeft(30);
        } else {
            setActiveTab('result');
            setQuizComplete(true);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-48 animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-slate-100 dark:border-white/5 pb-16">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 text-primary-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} />
                        <span>Intelligence Assessment Active</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white leading-none">
                        Adversarial <span className="gradient-text">Arena</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg tracking-tight">Test your structural integrity across technical dimensions.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setActiveTab('browse')} className="px-8 py-4 bg-slate-50 dark:bg-dark-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:scale-105 active:scale-95 transition-all">
                        Reset Simulator
                    </button>
                    <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        Live Analytics
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'browse' && (
                    <motion.div
                        key="browse"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                whileHover={{ y: -10, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-card p-12 group cursor-pointer relative overflow-hidden flex flex-col items-center text-center bg-white/5 backdrop-blur-3xl border-white/5 shadow-3xl transition-all duration-500"
                                onClick={loading ? null : () => startQuiz(cat)}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${cat.gradient}`} />
                                <div className={`absolute top-0 left-0 w-2 h-0 group-hover:h-full transition-all duration-700 bg-gradient-to-b ${cat.gradient}`} />

                                <div className="w-32 h-32 rounded-[2.5rem] mb-10 bg-slate-50 dark:bg-dark-900 group-hover:bg-transparent group-hover:shadow-2xl flex items-center justify-center transition-all duration-700 relative z-10 shadow-inner">
                                    <span className="text-6xl drop-shadow-2xl group-hover:scale-125 transition-transform duration-700">{cat.icon}</span>
                                </div>

                                <h3 className="text-3xl font-black mb-4 tracking-tighter relative z-10 text-slate-800 dark:text-white uppercase tracking-widest leading-none bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r transition-all group-hover:from-white group-hover:to-white/50">{cat.title}</h3>

                                <div className="flex items-center gap-6 mb-12 relative z-10">
                                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
                                        <BookOpen size={16} className="opacity-50" /> {cat.questions} Quests
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl border-2 transition-all ${cat.difficulty === 'Easy' ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                                        cat.difficulty === 'Medium' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                                            'text-red-500 border-red-500/20 bg-red-500/5'
                                        }`}>
                                        {cat.difficulty}
                                    </span>
                                </div>
                                <div className="w-full h-px bg-slate-100 dark:bg-white/5 mb-10 relative z-10" />
                                <button onClick={() => startQuiz(cat)} disabled={loading} className="w-full py-5 rounded-2xl bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:bg-white dark:group-hover:bg-white group-hover:text-black dark:group-hover:text-black group-hover:shadow-2xl transition-all relative z-10 active:scale-95 leading-none">
                                    {loading && selectedCategory?.id === cat.id ? 'Generating...' : 'Initialize Round'}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'active' && (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <div className="flex justify-between items-center bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-3xl">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Tactical Coordinate</span>
                                <div className="flex items-end gap-3 leading-none">
                                    <span className="text-6xl font-black text-primary-600 tracking-tighter">{currentQuestion + 1}</span>
                                    <span className="text-3xl font-black text-slate-300 dark:text-slate-800 mb-1">/</span>
                                    <span className="text-3xl font-black text-slate-400 dark:text-dark-600 mb-1">{questions.length}</span>
                                </div>
                            </div>
                            <div className={`p-8 rounded-[2.5rem] flex flex-col items-center gap-2 border-2 transition-all duration-700 ${timeLeft < 10 ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)] bg-red-500/5' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-dark-950'}`}>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Stability Time</span>
                                <div className={`flex items-center gap-3 font-black text-4xl tabular-nums ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
                                    <Timer size={32} />
                                    <span>{timeLeft}s</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-16 rounded-[4rem] border-white/5 shadow-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                            <h2 className="text-4xl md:text-5xl font-black mb-16 leading-none tracking-tight text-slate-900 dark:text-white relative z-10">
                                {questions[currentQuestion].question}
                            </h2>

                            <div className="space-y-6 mb-16 relative z-10">
                                {questions[currentQuestion].options.map((opt, i) => {
                                    let styleClass = "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-dark-950 text-slate-600 dark:text-slate-400 hover:border-primary-500 hover:bg-white dark:hover:bg-dark-800 shadow-sm";
                                    if (showExplanation) {
                                        if (i === questions[currentQuestion].correct) styleClass = "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 shadow-[0_20px_50px_rgba(34,197,94,0.1)] scale-[1.02] active:scale-100 transition-all";
                                        else if (i === selectedAnswer) styleClass = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 shadow-[0_20px_50px_rgba(239,68,68,0.1)] grayscale-0";
                                        else styleClass = "opacity-20 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-dark-950 grayscale pointer-events-none transition-all";
                                    } else if (selectedAnswer === i) {
                                        styleClass = "border-primary-500 bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-white shadow-2xl scale-[1.01] transition-all";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={showExplanation}
                                            onClick={() => handleAnswerSelect(i)}
                                            className={`w-full p-8 text-left rounded-[2rem] border-2 transition-all flex items-center justify-between group active:scale-[0.98] ${styleClass}`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all border-2 ${selectedAnswer === i ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-dark-800 border-slate-100 dark:border-white/5 group-hover:scale-110 shadow-inner text-slate-400'}`}>
                                                    {String.fromCharCode(65 + i)}
                                                </span>
                                                <span className="font-black text-xl tracking-tight leading-none mb-1">{opt}</span>
                                            </div>
                                            {showExplanation && (
                                                <div className="animate-in fade-in zoom-in duration-300">
                                                    {i === questions[currentQuestion].correct ? <CheckCircle size={32} className="text-green-500" /> : i === selectedAnswer ? <XCircle size={32} className="text-red-500" /> : null}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {showExplanation && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-10 border-t border-slate-100 dark:border-white/5 pt-16"
                                    >
                                        <div className="p-10 bg-primary-600/5 rounded-[3rem] border border-primary-600/10 relative overflow-hidden group/expl">
                                            <div className="absolute top-0 left-0 w-2 h-full bg-primary-600/20" />
                                            <div className="flex items-center gap-3 mb-6">
                                                <Sparkles className="text-primary-600" size={20} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Contextual Inversion Analysis</span>
                                            </div>
                                            <p className="text-2xl font-bold text-slate-700 dark:text-slate-200 leading-relaxed italic tracking-tight">
                                                "{questions[currentQuestion].explanation}"
                                            </p>
                                        </div>
                                        <button
                                            onClick={nextQuestion}
                                            className="w-full bg-primary-600 hover:bg-primary-500 text-white py-8 rounded-[2rem] flex items-center justify-center gap-6 text-xl font-black uppercase tracking-[0.2em] shadow-3xl shadow-primary-500/30 group active:scale-95 transition-all"
                                        >
                                            <span>{currentQuestion === questions.length - 1 ? 'Exfiltrate Final Metric' : 'Synchronize Next Tier'}</span>
                                            <ChevronRight size={28} className="group-hover:translate-x-3 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="glass-card p-24 text-center rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-3xl">
                            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-600 via-accent-neon to-indigo-600" />
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]" />

                            <div className="w-48 h-48 bg-gradient-to-tr from-primary-600 via-accent-purple to-indigo-600 rounded-[3.5rem] flex items-center justify-center mx-auto mb-12 shadow-[0_40px_80px_-15px_rgba(79,70,229,0.5)] border border-white/20 transform hover:scale-110 hover:rotate-6 transition-all duration-1000 group">
                                <Award size={100} className="text-white group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <h2 className="text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-none">Deconstruction <br /> Successful</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-2xl tracking-tight mb-20 max-w-xl mx-auto">Neural integration completed for <span className="text-primary-600">{selectedCategory?.title}</span> vector cluster.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                                <div className="p-12 bg-white dark:bg-dark-900/50 rounded-[3.5rem] border border-slate-100 dark:border-white/10 shadow-inner group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-8xl font-black text-primary-600 mb-4 relative z-10 tracking-tighter leading-none">{Math.round((score / questions.length) * 100)}<span className="text-4xl opacity-50">%</span></div>
                                    <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] relative z-10">Neural Accuracy</div>
                                    <div className="mt-8 h-2 w-32 bg-slate-100 dark:bg-dark-800 rounded-full mx-auto relative z-10 overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round((score / questions.length) * 100)}%` }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-primary-600" />
                                    </div>
                                </div>
                                <div className="p-12 bg-white dark:bg-dark-900/50 rounded-[3.5rem] border border-slate-100 dark:border-white/10 shadow-inner group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-8xl font-black text-accent-purple mb-4 relative z-10 tracking-tighter leading-none">{score}<span className="text-4xl text-slate-300 dark:text-slate-700 font-black">/{questions.length}</span></div>
                                    <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] relative z-10">Vector Hits</div>
                                    <div className="mt-8 flex justify-center gap-1 relative z-10">
                                        {[...Array(questions.length)].map((_, i) => (
                                            <div key={i} className={`w-3 h-3 rounded-full ${i < score ? 'bg-accent-purple' : 'bg-slate-200 dark:bg-slate-800'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <button onClick={() => setActiveTab('browse')} className="flex-1 py-6 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 font-black text-xs uppercase tracking-[0.4em] rounded-[1.8rem] transition-all border border-slate-100 dark:border-white/5 active:scale-95">
                                    <RotateCcw size={18} className="mx-auto mb-2 opacity-50" />
                                    Recall Round
                                </button>
                                <button onClick={() => setActiveTab('browse')} className="flex-1 py-6 bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[1.8rem] shadow-3xl shadow-primary-600/30 active:scale-95 transition-all">
                                    <ArrowRight size={18} className="mx-auto mb-2 opacity-50" />
                                    Continue Mission
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
