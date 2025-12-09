import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Code2 } from 'lucide-react';

const LOG_SEQUENCE = [
  { text: "> Initializing Forge Engine v2.1.0...", color: "text-blue-400", delay: 100 },
  { text: "> Connecting to Postman API...", color: "text-gray-300", delay: 600 },
  { text: "> Fetching Collection: 'E-Commerce-V2'...", color: "text-purple-400", delay: 1200 },
  { text: "> Parsing 24 endpoints...", color: "text-gray-300", delay: 1600 },
  { text: "> Validating Schemas (Pydantic mode)...", color: "text-yellow-400", delay: 2000 },
  { text: "> Generating FastMCP definitions...", color: "text-green-400", delay: 2800 },
  { text: "> Optimizing Python typings...", color: "text-gray-300", delay: 3500 },
  { text: "> Dockerizing application...", color: "text-blue-300", delay: 4200 },
  { text: "> Pushing to Cloud Run...", color: "text-purple-300", delay: 5000 },
  { text: "> DEPLOYMENT SUCCESSFUL", color: "text-green-500 font-bold", delay: 6000 },
  { text: "> Server active at https://api.forge.mcp.dev", color: "text-white underline cursor-pointer", delay: 6100 },
];

const ForgeTerminal: React.FC = () => {
  const [logs, setLogs] = useState<{text: string, color: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setLogs([]);
    
    let currentTime = 0;
    
    LOG_SEQUENCE.forEach((log) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, log.delay);
      currentTime = Math.max(currentTime, log.delay);
    });

    setTimeout(() => {
      setIsGenerating(false);
    }, currentTime + 1000);
  };

  useEffect(() => {
    // Auto start once on intersection could be cool, but manual for now
    // startGeneration(); 
  }, []);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-b border-white/5">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]" />
       
       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
             
             {/* Left: Content */}
             <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                   <Cpu className="w-3 h-3" />
                   The Engine
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                    Watch the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Magic Happen.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Our proprietary generation engine doesn't just copy-paste. It intelligently reconstructs your API logic into high-performance Python code, ready for LLM consumption.
                </p>
                
                <button 
                    onClick={!isGenerating ? startGeneration : undefined}
                    disabled={isGenerating}
                    className={`group px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 ${isGenerating ? 'bg-gray-800 cursor-not-allowed opacity-80' : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60'}`}
                >
                    <span className="flex items-center gap-2">
                        {isGenerating ? 'Forging...' : 'Run Simulation'}
                        <Zap className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : 'group-hover:fill-current'}`} />
                    </span>
                </button>
             </div>

             {/* Right: Terminal Visual */}
             <div className="lg:w-1/2 w-full">
                <div className="relative rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl shadow-purple-900/20 ring-1 ring-white/5">
                   {/* Terminal Header */}
                   <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                         <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                         <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                         <Code2 className="w-3 h-3" />
                         forge-cli — v2.1.0
                      </div>
                   </div>

                   {/* Terminal Body */}
                   <div className="p-6 h-[400px] overflow-y-auto font-mono text-sm relative">
                      {!isGenerating && logs.length === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                             <div className="text-center">
                                <p className="mb-2">Click 'Run Simulation' to start</p>
                                <div className="w-2 h-4 bg-purple-500 animate-pulse mx-auto" />
                             </div>
                          </div>
                      )}
                      
                      <div className="space-y-2">
                          <AnimatePresence>
                             {logs.map((log, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={log.color}
                                >
                                    {log.text}
                                </motion.div>
                             ))}
                          </AnimatePresence>
                          {isGenerating && (
                              <div className="w-2 h-4 bg-purple-500 animate-pulse mt-2" />
                          )}
                      </div>
                   </div>
                   
                   {/* Glow effect */}
                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default ForgeTerminal;