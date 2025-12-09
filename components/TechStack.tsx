import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section className="py-20 overflow-hidden bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Powered by Modern Tech</h3>
            <p className="text-gray-400 text-sm">Built on the shoulders of giants.</p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
                {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <div 
                        key={`${tech}-${i}`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-purple-200 font-semibold text-sm hover:bg-purple-500/20 hover:scale-110 transition-all cursor-default shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    >
                        {tech}
                    </div>
                ))}
            </div>
            
             <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 py-4">
                {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <div 
                        key={`${tech}-dup-${i}`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-purple-200 font-semibold text-sm hover:bg-purple-500/20 hover:scale-110 transition-all cursor-default shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    >
                        {tech}
                    </div>
                ))}
            </div>
        </div>

        <style>{`
            .animate-marquee {
                animation: marquee 25s linear infinite;
            }
            .animate-marquee2 {
                animation: marquee2 25s linear infinite;
            }
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-100%); }
            }
            @keyframes marquee2 {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0%); }
            }
        `}</style>
    </section>
  );
};

export default TechStack;
