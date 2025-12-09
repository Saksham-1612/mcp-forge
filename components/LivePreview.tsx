import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Box, Database, Server, Settings } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'logs', label: 'Live Logs', icon: Database },
  { id: 'tools', label: 'Tools', icon: Box },
];

const LivePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section id="preview" className="py-24 bg-gray-50 dark:bg-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="lg:w-1/3">
                <h2 className="text-4xl font-bold mb-6">Your Personal Command Center</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Once deployed, every MCP server comes with a built-in dashboard. 
                    Inspect tool definitions, watch real-time request logs, and debug LLM interactions visually.
                </p>
                <div className="space-y-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all border outline-none ${
                                activeTab === tab.id
                                    ? 'bg-white dark:bg-white/10 border-purple-500 shadow-lg shadow-purple-500/10 scale-[1.02]'
                                    : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <span className={`font-medium ${activeTab === tab.id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="lg:w-2/3 w-full">
                <div className="relative aspect-video bg-gray-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                    {/* Fake Browser Chrome */}
                    <div className="h-10 bg-gray-800 flex items-center px-4 gap-4 border-b border-white/5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 bg-gray-900 rounded-md py-1 px-3 text-xs text-gray-500 font-mono text-center">
                            dashboard.mcp-gen.dev/server/v1
                        </div>
                    </div>

                    {/* Window Content */}
                    <div className="flex-1 p-6 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {activeTab === 'dashboard' && (
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        <div className="col-span-2 grid grid-cols-3 gap-4">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                                                    <div className="text-xs text-gray-400 mb-1">Total Requests</div>
                                                    <div className="text-2xl font-bold text-white">2,4{i}0</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Server className="w-4 h-4 text-purple-400" />
                                                <span className="text-sm font-semibold text-gray-200">System Status</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-xs text-gray-400">
                                                    <span>CPU Usage</span>
                                                    <span>12%</span>
                                                </div>
                                                <div className="w-full h-1 bg-gray-700 rounded-full">
                                                    <div className="w-[12%] h-full bg-green-500 rounded-full" />
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400">
                                                    <span>Memory</span>
                                                    <span>45%</span>
                                                </div>
                                                <div className="w-full h-1 bg-gray-700 rounded-full">
                                                    <div className="w-[45%] h-full bg-purple-500 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5 relative overflow-hidden">
                                            <div className="text-sm font-semibold text-gray-200 mb-2">Active Tools</div>
                                            <div className="space-y-2">
                                                {['get_weather', 'search_db', 'summarize'].map(t => (
                                                    <div key={t} className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900/50 p-2 rounded">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        {t}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'logs' && (
                                    <div className="bg-black/50 rounded-lg p-4 h-full border border-white/5 font-mono text-xs overflow-y-auto">
                                        <div className="space-y-2">
                                            <div className="text-gray-500">[2023-10-27 10:00:01] INFO: Server started on port 8080</div>
                                            <div className="text-blue-400">[2023-10-27 10:00:05] POST /mcp/v1/call - 200 OK</div>
                                            <div className="text-gray-300 pl-4">{`{ "tool": "get_user", "args": { "id": "123" } }`}</div>
                                            <div className="text-green-400 pl-4">{`> Result: { "name": "Alice", "role": "admin" }`}</div>
                                            <div className="text-blue-400">[2023-10-27 10:00:12] POST /mcp/v1/call - 200 OK</div>
                                            <div className="text-gray-300 pl-4">{`{ "tool": "search_products", "args": { "q": "laptop" } }`}</div>
                                            <div className="w-1 h-4 bg-gray-500 animate-pulse mt-2" />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'tools' && (
                                    <div className="space-y-3 h-full overflow-y-auto pr-2">
                                        {[1,2,3].map((i) => (
                                            <div key={i} className="bg-gray-800/30 border border-white/5 p-3 rounded-lg flex items-center justify-between group hover:bg-gray-800/60 transition-colors">
                                                <div>
                                                    <div className="text-sm font-semibold text-purple-300">get_customer_data_v{i}</div>
                                                    <div className="text-[10px] text-gray-500">Retrieves customer info by ID and region</div>
                                                </div>
                                                <Settings className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                            </div>
                                        ))}
                                        <button className="w-full py-2 border border-dashed border-gray-600 rounded text-xs text-gray-500 hover:border-purple-500 hover:text-purple-400 hover:bg-white/5 transition-colors">
                                            + Add New Tool Definition
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default LivePreview;