import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, GraduationCap, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const NavLink = ({ to, children, mobile }) => (
        <Link
            to={to}
            onClick={() => setIsOpen(false)}
            className={`${mobile
                ? 'block px-6 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-dark-900 transition-all font-black text-[10px] uppercase tracking-widest text-slate-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 relative group'
                }`}
        >
            {children}
            {!mobile && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
            )}
        </Link>
    );

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-[100] bg-white/60 dark:bg-dark-950/60 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 shadow-2xl shadow-black/5">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="bg-gradient-to-tr from-primary-600 via-primary-500 to-accent-purple p-3 rounded-[1.2rem] shadow-2xl shadow-primary-500/20 group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-700">
                            <GraduationCap className="text-white w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                                InterPrep<span className="text-primary-600">AI</span>
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1">Neural Labs v4</span>
                        </div>
                    </Link>

                    {/* Desktop Command Center */}
                    <div className="hidden lg:flex items-center gap-8">
                        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
                        <NavLink to="/ask-ai">Ask AI</NavLink>
                        <NavLink to="/practice">Coding Arena</NavLink>
                        <NavLink to="/quiz">Quizzes</NavLink>
                        <NavLink to="/interview">Mock Interview</NavLink>
                        <NavLink to="/roadmap">Roadmap</NavLink>
                        <NavLink to="/resume">Resume Analyzer</NavLink>

                        <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

                        <button
                            onClick={toggleDarkMode}
                            className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-900 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-dark-800 hover:text-primary-600 shadow-inner transition-all active:scale-90 border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-5">
                                <Link to="/profile" className="flex items-center gap-4 p-1.5 pr-6 rounded-2xl bg-slate-50 dark:bg-dark-900 hover:bg-white dark:hover:bg-dark-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5 group shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-105 transition-transform">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-[10px] uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</span>
                                    </div>
                                </Link>
                                <button onClick={logoutHandler} className="p-3 text-slate-400 hover:text-red-500 transition-all active:scale-90 bg-slate-50 dark:bg-dark-900 rounded-2xl border border-transparent hover:border-red-500/10">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary-600 transition-colors">Access</Link>
                                <Link to="/signup" className="btn-primary !py-3.5 !px-8 rounded-2xl shadow-xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest">Enroll Now</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Command Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button onClick={toggleDarkMode} className="p-3 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-dark-900 rounded-2xl shadow-inner">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 text-slate-500 dark:text-slate-400 bg-primary-600 text-white rounded-2xl shadow-xl active:scale-90 transition-all"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden pb-10 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 gap-2 pt-4">
                                {user && <NavLink to="/dashboard" mobile>Dashboard</NavLink>}
                                <NavLink to="/ask-ai" mobile>Ask AI</NavLink>
                                <NavLink to="/practice" mobile>Coding Arena</NavLink>
                                <NavLink to="/quiz" mobile>Quizzes</NavLink>
                                <NavLink to="/interview" mobile>Mock Interview</NavLink>
                                <NavLink to="/roadmap" mobile>Roadmap</NavLink>
                                <NavLink to="/resume" mobile>Resume Analyzer</NavLink>

                                <div className="py-6 px-6">
                                    <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />
                                </div>

                                {user ? (
                                    <div className="space-y-3 px-2">
                                        <NavLink to="/profile" mobile>Control Center</NavLink>
                                        <NavLink to="/dashboard" mobile>Metrics View</NavLink>
                                        <button
                                            onClick={logoutHandler}
                                            className="w-full flex items-center gap-5 px-6 py-4 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500/5 rounded-2xl transition-all"
                                        >
                                            <LogOut size={18} /> Terminate
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-6 px-4 pt-6">
                                        <Link to="/login" className="py-4 text-center font-black text-[10px] uppercase tracking-widest border border-slate-100 dark:border-white/5 rounded-2xl bg-white dark:bg-dark-900 shadow-sm">Auth</Link>
                                        <Link to="/signup" className="btn-primary py-4 text-center text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/10">Enroll</Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
