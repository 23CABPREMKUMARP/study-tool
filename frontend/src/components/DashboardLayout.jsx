import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Brain,
    Code,
    Layers,
    MessageSquare,
    FileText,
    Map,
    User,
    ChevronLeft,
    Menu,
    Sparkles
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, collapsed }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to}>
            <div className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}>
                <Icon size={22} className={isActive ? 'text-accent-neon' : ''} />
                {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                {!collapsed && isActive && (
                    <motion.div
                        layoutId="activeSidebar"
                        className="absolute left-0 w-1 h-6 bg-accent-neon rounded-r-full"
                    />
                )}
            </div>
        </Link>
    );
};

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/practice', icon: Code, label: 'Coding Arena' },
        { to: '/quiz', icon: Layers, label: 'Quizzes' },
        { to: '/interview', icon: MessageSquare, label: 'Mock Interview' },
        { to: '/resume', icon: FileText, label: 'Resume Analyzer' },
        { to: '/roadmap', icon: Map, label: 'Roadmap' },
        { to: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-dark-950 transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full z-40 bg-white dark:bg-dark-900 border-r border-slate-200 dark:border-white/5 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-6 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-tr from-accent-neon to-accent-purple p-2 rounded-xl shadow-lg shadow-primary-500/20">
                                <Sparkles className="text-white w-6 h-6" />
                            </div>
                            {!collapsed && (
                                <span className="text-xl font-black gradient-text tracking-tighter">
                                    InterPrep
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item) => (
                            <SidebarLink
                                key={item.to}
                                {...item}
                                collapsed={collapsed}
                            />
                        ))}
                    </nav>

                    {/* Collapse Toggle */}
                    <div className="p-4 border-t border-slate-100 dark:border-white/5">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
                        >
                            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} p-8`}>
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
