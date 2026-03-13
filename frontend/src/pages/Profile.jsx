import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Settings,
    Bookmark,
    History,
    Shield,
    Bell,
    CreditCard,
    LogOut,
    ChevronRight,
    Camera,
    Mail,
    Edit2
} from 'lucide-react';

const ProfileTab = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-5 px-8 py-5 rounded-2xl transition-all relative group overflow-hidden ${active
            ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/20'
            : 'hover:bg-slate-50 dark:hover:bg-dark-900 border border-transparent hover:border-slate-100 dark:hover:border-white/5 text-slate-500 dark:text-slate-400 font-bold'
            }`}
    >
        <div className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:translate-x-1'}`}>
            <Icon size={20} />
        </div>
        <span className="text-sm uppercase tracking-widest font-black">{label}</span>
        {active && (
            <motion.div
                layoutId="activeTabGlow"
                className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]"
            />
        )}
    </button>
);

const Profile = () => {
    const [activeTab, setActiveTab] = useState('account');
    const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Dev Maverick', email: 'maverick@sector7.dev' };

    return (
        <div className="max-w-7xl mx-auto pb-24 animate-in fade-in duration-1000">
            <div className="flex flex-col lg:flex-row gap-12 mt-12 items-start">

                {/* Vertical Sidebar Command Center */}
                <div className="lg:w-[380px] space-y-10 shrink-0">
                    {/* Immersive Profile Identity */}
                    <div className="glass-card p-10 text-center relative overflow-hidden group border-white/5 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-600 via-accent-purple to-primary-600 animate-mesh opacity-90" />

                        <div className="relative z-10 pt-4">
                            <div className="relative inline-block">
                                <div className="w-36 h-36 rounded-[2.5rem] border-8 border-white dark:border-dark-950 bg-slate-900 overflow-hidden mx-auto shadow-3xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-dark-950 to-slate-800">
                                        <User className="w-1/2 h-1/2 text-primary-500" />
                                    </div>
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-4 bg-white dark:bg-dark-800 text-primary-600 rounded-2xl shadow-2xl hover:scale-110 transition-all border border-slate-100 dark:border-white/5 active:scale-90">
                                    <Camera size={18} />
                                </button>
                            </div>

                            <h2 className="text-3xl font-black mt-8 tracking-tighter">{user.name}</h2>
                            <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                                <Mail size={12} className="text-primary-500" /> {user.email}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <span className="px-5 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-500 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl shadow-inner">
                                    Neural Tier: Elite
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* High-Fi Navigation Hub */}
                    <div className="glass-card p-4 space-y-3 border-white/5 shadow-xl bg-slate-50/50 dark:bg-dark-900/50">
                        <ProfileTab icon={User} label="Identity Core" active={activeTab === 'account'} onClick={() => setActiveTab('account')} />
                        <ProfileTab icon={Bookmark} label="Archived Intel" active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
                        <ProfileTab icon={History} label="Quantum Logs" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                        <ProfileTab icon={Bell} label="Comms Feed" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                        <ProfileTab icon={CreditCard} label="Resource Tier" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                        <ProfileTab icon={Shield} label="Security Matrix" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />

                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                            <button className="w-full flex items-center gap-5 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-red-500 hover:bg-red-500/5 transition-all group">
                                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Terminate Session</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dynamically Loaded Viewport */}
                <div className="flex-1 w-full min-h-[800px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="glass-card p-12 h-full border-white/5 shadow-3xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <Settings size={200} className="animate-spin-slow" />
                            </div>

                            {activeTab === 'account' && (
                                <div className="space-y-12 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black tracking-tight mb-2">General Profile</h3>
                                            <p className="text-slate-400 font-medium text-sm">Synchronize your personal identity across the grid.</p>
                                        </div>
                                        <button className="px-6 py-3 bg-primary-600/10 text-primary-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-primary-600/5">
                                            <Edit2 size={16} /> Update Record
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Assigned Name</label>
                                            <div className="p-5 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-white/5 font-black text-slate-700 dark:text-slate-200 shadow-inner group-hover:border-primary-500/20 transition-colors">
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="space-y-3 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Neural ID (Email)</label>
                                            <div className="p-5 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-white/5 font-black text-slate-700 dark:text-slate-200 shadow-inner group-hover:border-primary-500/20 transition-colors">
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className="space-y-3 group md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Geographic Node</label>
                                            <div className="p-5 bg-slate-50 dark:bg-dark-950 rounded-2xl border border-slate-100 dark:border-white/5 font-black text-slate-700 dark:text-slate-200 shadow-inner group-hover:border-primary-500/20 transition-colors">
                                                Sector 7, Neo-Metropolis (Remote Protocol)
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-12 border-t border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
                                                <Target size={20} />
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight">Technical Vectors</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {['System Architecture', 'Neural Networks', 'Distributed State', 'React Forge', 'Kernel Logic'].map(tag => (
                                                <span key={tag} className="px-6 py-3 bg-white dark:bg-dark-800 border-2 border-slate-100 dark:border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:border-primary-500/30 hover:text-primary-500 cursor-pointer transition-all shadow-sm active:scale-90">
                                                    {tag}
                                                </span>
                                            ))}
                                            <button className="px-6 py-3 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:border-primary-500 hover:text-primary-500 transition-all active:scale-95">
                                                + Inject New Vector
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'saved' && (
                                <div className="space-y-10 relative z-10">
                                    <div className="mb-10">
                                        <h3 className="text-3xl font-black tracking-tight mb-2">Archived Intel</h3>
                                        <p className="text-slate-400 font-medium text-sm">Critical concepts saved for deep neural integration.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            "Atomic State Transitions in Concurrent Systems",
                                            "Bypassing Garbage Collection Thrashing",
                                            "Edge Computing Latency Optimization Patterns",
                                            "Heuristic Analysis of Large Language Models"
                                        ].map((q, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group p-8 bg-slate-50 dark:bg-dark-950/80 border border-slate-100 dark:border-white/5 rounded-[2rem] flex items-center justify-between hover:border-primary-500/20 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-white dark:bg-dark-900 rounded-2xl flex items-center justify-center text-primary-500 shadow-xl border border-slate-50 dark:border-white/5 group-hover:scale-110 transition-transform">
                                                        <Bookmark size={24} className="fill-current" />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-slate-700 dark:text-slate-200 text-lg tracking-tight block transition-colors group-hover:text-primary-500">{q}</span>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 bg-primary-500/5 px-3 py-1 rounded-lg">High Importance</span>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1">Saved 4h ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white dark:bg-dark-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                    <ChevronRight className="text-primary-500" size={24} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab !== 'account' && activeTab !== 'saved' && (
                                <div className="h-full flex flex-col items-center justify-center p-20 text-center relative z-10">
                                    <div className="w-32 h-32 bg-slate-50 dark:bg-dark-950 rounded-[3rem] flex items-center justify-center mb-10 shadow-inner">
                                        <Settings size={60} className="text-slate-300 animate-spin-slow" />
                                    </div>
                                    <h4 className="text-3xl font-black mb-4 tracking-tight">Access Protocol Pending</h4>
                                    <p className="max-w-sm text-slate-400 font-medium leading-relaxed">
                                        This module is currently being calibrated for your profile tier. Deployment scheduled for next cycle.
                                    </p>
                                    <button className="mt-10 px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-600/20 active:scale-95 transition-all">
                                        Request Early Access
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Profile;
