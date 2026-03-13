import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
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
            const { data } = await axios.post('/api/auth/register', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Immersive Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-primary-600/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] bg-accent-purple/10 rounded-full blur-[100px] animate-float [animation-delay:1.5s]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg"
            >
                <div className="glass-card p-10 border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-purple animate-mesh" />

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 mb-6 shadow-inner">
                            <UserPlus size={32} className="text-accent-purple" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-2">Join the <span className="gradient-text">Elite</span></h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Synchronize your potential with thousands of engineers.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-4"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 text-sm"
                                        placeholder="Display Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Link</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 text-sm"
                                        placeholder="email@access.net"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Protocol</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    minLength="8"
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-dark-900 border border-slate-100 dark:border-white/5 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 text-sm"
                                    placeholder="Enter complex sequence"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Minimum 8 characters with entropy</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary !py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 active:scale-[0.98] transition-all bg-gradient-to-r from-primary-600 to-accent-purple"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="font-black uppercase tracking-widest text-sm">Initialize Onboarding</span>
                                    <UserPlus size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
                        <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            Authorized Already?{' '}
                            <Link to="/login" className="text-primary-600 border-b-2 border-primary-600/0 hover:border-primary-600 transition-all ml-1">Return to Grid</Link>
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">
                    By initializing, you agree to our Protocol of Conduct and Neural Privacy Standards.
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
