import React from 'react';
import { FEATURES } from '../constants';
import * as LucideIcons from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
       {/* Background decoration */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

       <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need</h2>
            <p className="text-gray-500 text-lg">Built for speed, reliability, and developer happiness.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {FEATURES.map((feature, idx) => {
                // Dynamic icon rendering
                const IconComponent = (LucideIcons as any)[feature.icon];

                return (
                    <div 
                        key={feature.id}
                        className="group relative p-8 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
                    >
                        {/* Hover Gradient Border Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-300 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            {IconComponent && <IconComponent className="w-6 h-6" />}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                );
             })}
          </div>
       </div>
    </section>
  );
};

export default Features;
