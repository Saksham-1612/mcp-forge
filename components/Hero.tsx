import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
    onGetStarted?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left Blob */}
        <motion.div 
            animate={{ 
                x: [0, 50, -20, 0],
                y: [0, 30, 0, 0],
                scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut" 
            }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 dark:bg-purple-600/30 rounded-full blur-[120px]" 
        />
        
        {/* Bottom Right Blob */}
        <motion.div 
            animate={{ 
                x: [0, -50, 20, 0],
                y: [0, -50, 20, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
            className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[100px]" 
        />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
            style={{ y: y1, opacity }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            v2.0 Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
          >
            Build & Deploy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 animate-gradient-x">
              MCP Servers
            </span>
            <br />
            from Postman.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8"
          >
            Turn your API collections into AI-ready Model Context Protocol servers. 
            Validation, code generation, and deployment in one unified workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
                onClick={onGetStarted} 
                className="px-8 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
                Start Building <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="px-8 py-4 rounded-2xl border border-gray-200 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-100 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 active:scale-95">
              Read Documentation
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Mockup Visual */}
        <motion.div 
            style={{ y: y2, opacity }}
            className="relative hidden lg:block"
        >
          <div className="relative w-full max-w-[600px] aspect-[4/3] perspective-1000 group">
            {/* Main Card */}
            <motion.div 
                initial={{ rotateY: -10, rotateX: 10, scale: 0.9, opacity: 0 }}
                animate={{ rotateY: -5, rotateX: 5, scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute inset-0 bg-gray-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0"
            >
              {/* Header */}
              <div className="h-10 bg-gray-800 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-4 px-3 py-1 bg-black/40 rounded text-xs text-gray-400 font-mono">mcp-server-dashboard</div>
              </div>
              
              {/* Content Grid */}
              <div className="p-6 grid grid-cols-3 gap-4">
                 <div className="col-span-2 space-y-4">
                    <div className="h-32 bg-gray-800/50 rounded-lg border border-white/5 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 animate-pulse" />
                        <div className="flex gap-2 mb-2">
                           <Terminal className="w-4 h-4 text-purple-400" />
                           <span className="text-xs text-purple-400">Server Logs</span>
                        </div>
                        <div className="space-y-1 font-mono text-[10px] text-gray-400">
                           <p>> Initializing FastMCP...</p>
                           <p>> Loaded 12 tools from collection</p>
                           <p className="text-green-400">> Server Ready on :8080</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-24 bg-gray-800/50 rounded-lg border border-white/5 animate-pulse" />
                       <div className="h-24 bg-gray-800/50 rounded-lg border border-white/5" />
                    </div>
                 </div>
                 <div className="col-span-1 space-y-4">
                    <div className="h-full bg-indigo-900/10 rounded-lg border border-indigo-500/20 p-3">
                        <div className="w-full h-2 bg-indigo-500/20 rounded mb-2" />
                        <div className="w-2/3 h-2 bg-indigo-500/20 rounded mb-4" />
                        <div className="space-y-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="w-full h-2 bg-white/5 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
              </div>

              {/* Reflective Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Element */}
            <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-10 top-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-20"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                     <div className="text-sm font-bold text-white">Status: Active</div>
                     <div className="text-xs text-gray-400">Latency: 24ms</div>
                  </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;