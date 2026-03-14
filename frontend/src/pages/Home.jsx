import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Code, Rocket, Target, Sparkles, MoveRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="glass-card p-6 flex flex-col items-center text-center group hover:scale-[1.03] transition-all"
    >
        <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-2xl mb-4 group-hover:rotate-12 transition-transform">
            <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-primary-600">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
);

const Home = () => {
    return (
        <div className="space-y-32 pb-32 animate-in fade-in duration-1000">
            {/* Immersive Hero Engine */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden rounded-[4rem] shadow-3xl bg-slate-900 mx-4 mt-8">
                {/* Dynamic Mesh Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-dark-950 to-accent-purple/50 animate-mesh" />
                    <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-primary-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/10 rounded-full blur-[100px] animate-float" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-10 px-6 max-w-5xl"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-3xl text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 border border-white/10 shadow-2xl">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Neural Evolution v4.0 Active</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black mb-10 text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                        Ascend Your <br />
                        <span className="gradient-text !from-primary-400 !to-white">Career Vector</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300/80 mb-14 font-medium leading-relaxed tracking-tight">
                        Deconstruct complex technical barriers with AI-driven roadmaps, real-time adversarial simulation,
                        and quantum-speed knowledge integration.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Link to="/signup" className="btn-primary !py-5 !px-12 rounded-2xl flex items-center gap-4 group text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary-500/20 active:scale-95 transition-all">
                            Initialize Sync
                            <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                        <Link to="/login" className="!py-5 !px-12 rounded-2xl flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white border border-white/10 backdrop-blur-md hover:bg-white/5 transition-all active:scale-95">
                            View Intel Demo
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Elements Animation */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Scroll to Deconstruct</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* Tactical Features Modular Grid */}
            <section className="max-w-7xl mx-auto px-8">
                <div className="mb-20 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-500 mb-4">Tactical Modalities</h2>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Engineered for <span className="gradient-text">Elite Intelligence</span></h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <FeatureCard
                        icon={Code}
                        title="Training Arena"
                        description="Real-time coding challenges processed through our adversarial simulation logic."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Target}
                        title="Growth Vectors"
                        description="Personalized developmental paths mapped across the global engineering landscape."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Rocket}
                        title="Round Simulation"
                        description="Immersive adversarial rounds with ML-driven performance audits and feedback."
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Quantum Core Metrics */}
            <section className="max-w-7xl mx-auto px-8">
                <div className="glass-card p-16 overflow-hidden relative border-white/5 shadow-3xl bg-slate-50/50 dark:bg-dark-900/50">
                    <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[100%] bg-primary-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[100%] bg-accent-purple-500/10 rounded-full blur-[100px]" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
                        <div className="space-y-2">
                            <div className="text-5xl font-black gradient-text tracking-tighter">10K+</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Knowledge Vectors</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-black gradient-text tracking-tighter">500+</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Roadmaps</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-black gradient-text tracking-tighter">98%</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Integration Success</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-black gradient-text tracking-tighter">4.9/5</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Conversion Tier */}
            <section className="max-w-4xl mx-auto px-8 text-center pb-20">
                <div className="p-1 gap-2 rounded-[2.5rem] bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 p-px shadow-3xl">
                    <div className="bg-white dark:bg-dark-950 p-16 rounded-[2.5rem] space-y-10">
                        <h3 className="text-5xl font-black tracking-tighter leading-tight">Ready to Manifest Your <br /> <span className="gradient-text">Top-Tier Node?</span></h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-lg mx-auto">
                            Stop preparing. Start integrating. Join the elite cluster of developers already training on InterPrepAI.
                        </p>
                        <Link to="/signup" className="btn-primary !py-6 !px-16 rounded-2xl inline-flex items-center gap-4 group text-xs font-black uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all">
                            Initialize Protocol
                            <Rocket className="w-6 h-6 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-700" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
