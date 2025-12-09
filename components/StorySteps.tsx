import React from 'react';
import { motion } from 'framer-motion';
import { STEPS } from '../constants';

const StorySteps: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-6">
            <div className="mb-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">From Collection to Cloud</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A streamlined pipeline designed for developer efficiency. 
                    We handle the boilerplate, you focus on the logic.
                </p>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0 hidden md:block" />

                <div className="space-y-24">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Text Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="flex-1 md:text-right"
                            >
                                <div className={`flex flex-col ${index % 2 === 1 ? 'md:items-start md:text-left' : 'md:items-end'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                                            {step.id}
                                        </span>
                                        <h3 className="text-2xl font-bold">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Center Point */}
                            <div className="relative hidden md:flex items-center justify-center w-12">
                                <div className="w-4 h-4 rounded-full bg-purple-600 border-4 border-white dark:border-[#0a0118] z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                            </div>

                            {/* Code/Visual Card */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1 w-full"
                            >
                                <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl shadow-purple-900/10 group hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono">terminal</div>
                                    </div>
                                    <div className="p-6 overflow-x-auto">
                                        <pre className="font-mono text-sm text-gray-300">
                                            <code>
                                                {step.codeSnippet.split('\n').map((line, i) => (
                                                    <div key={i} className="flex">
                                                        <span className="text-gray-600 mr-4 select-none">{i + 1}</span>
                                                        <span className={line.startsWith('>') ? 'text-green-400' : line.startsWith('$') ? 'text-purple-400' : 'text-gray-300'}>
                                                            {line}
                                                        </span>
                                                    </div>
                                                ))}
                                            </code>
                                        </pre>
                                    </div>
                                    <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default StorySteps;