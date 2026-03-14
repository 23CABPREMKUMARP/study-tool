import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Save, Trash2, CheckCircle, ChevronRight, HelpCircle, Code as CodeIcon, RefreshCw, Layers, Copy, Star } from 'lucide-react';
import axios from 'axios';

const CodingPractice = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Write your solution here\n\nfunction solve(s) {\n    // Implement your logic\n    return s.reverse();\n}');
    const [problem, setProblem] = useState({
        title: "Reverse String",
        difficulty: "Easy",
        category: "Algorithms",
        description: "Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
        examples: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
        ],
        constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character."],
        hints: ["Try using a two-pointer approach.", "Do it in-place to save space."]
    });

    const [output, setOutput] = useState('');
    const [activeTab, setActiveTab] = useState('description');
    const [isRunning, setIsRunning] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateNewProblem = async () => {
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/practice/generate',
                { topic: 'Algorithms', difficulty: 'Medium', language },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setProblem(data);
            setCode(data.initialCode || '// Write your solution here\n');
            setOutput('');
            setActiveTab('description');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRun = async () => {
        setIsRunning(true);
        setOutput('');
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await axios.post('/api/practice/run',
                { code, language, problem },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setOutput(data.output);
            if (data.status === 'success') {
                // Potential to update user score or status here
            }
        } catch (error) {
            console.error(error);
            const serverMessage = error.response?.data?.message;
            setOutput(`Execution Error: ${serverMessage || 'Network failure between Arena and Neural Core.'}\n\nPlease verify your connection or retry in 60 seconds.`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col pt-2 animate-in fade-in duration-500">
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent-neon/10 rounded-2xl text-accent-neon shadow-lg shadow-accent-neon/5">
                        <CodeIcon size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-black tracking-tight">{problem.title}</h1>
                            <span className="status-badge bg-green-500/10 text-green-500 border-green-500/20">Solved</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span className="text-green-500">{problem.difficulty}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span>{problem.category}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> 4.9</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center bg-slate-100 dark:bg-dark-900 rounded-xl p-1 border border-slate-200 dark:border-white/5">
                        {['javascript', 'python', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${language === lang
                                    ? 'bg-white dark:bg-dark-800 text-primary-600 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {lang === 'javascript' ? 'JS' : lang}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleRun} disabled={isRunning || loading} className="btn-primary py-2 px-8">
                        {isRunning ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play size={18} />}
                        <span>Run Code</span>
                    </button>
                    <button onClick={generateNewProblem} disabled={loading} className="btn-secondary py-2 px-6 flex items-center gap-2">
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <RefreshCw size={16} />}
                        <span>New Challenge</span>
                    </button>
                    <button className="btn-secondary py-2 px-8 !bg-green-500 !text-white !border-transparent hover:!bg-green-600 shadow-lg shadow-green-500/20">
                        Submit
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden">
                {/* Side A: Problem Logic */}
                <div className="xl:w-[450px] flex flex-col glass-card overflow-hidden !border-white/5">
                    <div className="flex bg-slate-50 dark:bg-dark-950 p-1 m-2 rounded-xl border border-slate-200 dark:border-white/5">
                        {['description', 'hints', 'solutions'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${activeTab === tab
                                    ? 'bg-white dark:bg-dark-800 text-primary-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {activeTab === 'description' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Problem Description</h3>
                                    <p className="text-lg font-bold leading-relaxed text-slate-700 dark:text-slate-300">{problem.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Test Cases</h3>
                                    {problem.examples.map((ex, i) => (
                                        <div key={i} className="bg-slate-100 dark:bg-dark-900/50 p-6 rounded-3xl mb-4 border border-slate-200 dark:border-white/5 font-mono text-sm group">
                                            <div className="flex justify-between mb-3">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Example {i + 1}</span>
                                                <Copy size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex gap-4">
                                                    <span className="text-primary-500 font-bold shrink-0 w-12">Input:</span>
                                                    <span className="text-slate-800 dark:text-slate-200 break-all">{ex.input}</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="text-accent-purple font-bold shrink-0 w-12">Output:</span>
                                                    <span className="text-slate-800 dark:text-slate-200 break-all">{ex.output}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Constraints</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {problem.constraints.map((c, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-white/5 rounded-xl text-xs font-bold font-mono">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'hints' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                                {problem.hints.map((hint, i) => (
                                    <div key={i} className="glass-card !bg-amber-500/5 !border-amber-500/10 p-6 rounded-3xl">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                                                <HelpCircle size={20} />
                                            </div>
                                            <p className="font-bold text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                                                {hint}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'solutions' && (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-primary-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary-500">
                                    <Layers size={32} />
                                </div>
                                <h4 className="text-xl font-black mb-2">Locked Feature</h4>
                                <p className="text-slate-400 font-bold max-w-[200px] mx-auto mb-8">Official solutions are unlocked after submission.</p>
                                <button className="btn-secondary py-2.5 px-6">View Discussion</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Side B: Code & Results */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    <div className="flex-1 glass-card overflow-hidden !border-white/5 relative group">
                        <div className="absolute top-6 right-8 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setCode('')} className="p-2.5 bg-dark-800/80 text-slate-400 hover:text-red-500 rounded-xl transition-all" title="Clear Code">
                                <Trash2 size={18} />
                            </button>
                            <button className="p-2.5 bg-dark-800/80 text-slate-400 hover:text-accent-neon rounded-xl transition-all" title="Save Progress">
                                <Save size={18} />
                            </button>
                        </div>
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={setCode}
                            options={{
                                fontSize: 15,
                                fontFamily: 'Fira Code',
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 30, bottom: 30 },
                                lineNumbersMinChars: 4,
                                cursorSmoothCaretAnimation: 'on',
                                smoothScrolling: true,
                                renderLineHighlight: 'all',
                                roundedSelection: true,
                                scrollbar: {
                                    vertical: 'hidden',
                                    horizontal: 'hidden'
                                }
                            }}
                        />
                    </div>

                    <div className="h-[250px] glass-card flex flex-col !border-white/5 overflow-hidden">
                        <div className="px-8 py-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-dark-950">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Terminal Output</span>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-8 font-mono text-sm overflow-y-auto bg-dark-950 custom-scrollbar">
                            {isRunning ? (
                                <div className="flex items-center gap-3 text-slate-500">
                                    <div className="w-4 h-4 border-2 border-slate-600 border-t-accent-neon rounded-full animate-spin" />
                                    <span>Executing test cases...</span>
                                </div>
                            ) : output ? (
                                <div className="whitespace-pre-wrap text-green-400/90 leading-loose">{output}</div>
                            ) : (
                                <div className="text-slate-600 italic select-none">Ready for execution. Click 'Run Code' to validate your solution.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingPractice;
