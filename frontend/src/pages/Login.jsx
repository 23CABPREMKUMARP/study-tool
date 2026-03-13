import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Github, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px] animate-float [animation-delay:2s]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-10 border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 animate-mesh" />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600/10 mb-6 shadow-inner">
                            <LogIn size={32} className="text-primary-600" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your path to engineering mastery.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold mb-8 flex items-center gap-3"
                        >
                            <span className="w-1 h-8 bg-red-500 rounded-full" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Intel</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                    placeholder="yourname@sector.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Phrase</label>
                                <Link to="#" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Forgot Access?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary !py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="font-black uppercase tracking-widest text-sm">Initiate Session</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="bg-white dark:bg-dark-950 px-4 text-slate-400">Gateway</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <button className="btn-secondary !py-3 bg-white dark:!bg-dark-950 flex items-center justify-center gap-3 active:scale-95">
                            <Github size={20} />
                            <span className="font-bold text-xs">Edge</span>
                        </button>
                        <button className="btn-secondary !py-3 bg-white dark:!bg-dark-950 flex items-center justify-center gap-3 active:scale-95">
                            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-black text-xs">G</span>
                            </div>
                            <span className="font-bold text-xs">Core</span>
                        </button>
                    </div>

                    <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        New Recruit?{' '}
                        <Link to="/signup" className="text-primary-600 border-b-2 border-primary-600/0 hover:border-primary-600 transition-all ml-1">Establish Creds</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
