import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  LogOut, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Cpu,
  RefreshCw,
  Trash2,
  Power,
  Shield,
  Key,
  User
} from 'lucide-react';

interface DashboardViewProps {
  onBack: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'servers', icon: Server, label: 'Active Servers' },
    { id: 'activity', icon: Activity, label: 'Activity Logs' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Mock Data
  const [deployments, setDeployments] = useState([
    { id: 1, name: 'e-commerce-v2-api', status: 'running', region: 'us-east1', uptime: '24d 12h' },
    { id: 2, name: 'customer-data-pipeline', status: 'maintenance', region: 'eu-west3', uptime: '1d 4h' },
    { id: 3, name: 'legacy-auth-service', status: 'stopped', region: 'us-central1', uptime: '-' },
  ]);

  const [logs] = useState([
    { id: 1, time: '20:45:12', type: 'success', msg: 'GET /health - 200 OK' },
    { id: 2, time: '20:45:15', type: 'info', msg: 'Tool Call: "get_user_data"' },
    { id: 3, time: '20:45:15', type: 'info', msg: 'Executing SQL query...' },
    { id: 4, time: '20:45:16', type: 'info', msg: 'Response size: 1.2kb' },
    { id: 5, time: '20:46:01', type: 'success', msg: 'POST /v1/mcp/chat - 200 OK' },
    { id: 6, time: '20:46:05', type: 'warning', msg: 'Rate limit approaching (85%)' },
  ]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleServerStatus = (id: number) => {
    setDeployments(prev => prev.map(d => {
        if (d.id === id) {
            return {
                ...d,
                status: d.status === 'running' ? 'stopped' : 'running',
                uptime: d.status === 'running' ? '-' : '0m 1s'
            };
        }
        return d;
    }));
  };

  const OverviewContent = () => (
    <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: 'Total Requests', value: '2.4M', change: '+12.5%', icon: Activity, color: 'text-purple-500' },
                { label: 'Active Instances', value: deployments.filter(d => d.status === 'running').length.toString(), change: '+2', icon: Server, color: 'text-blue-500' },
                { label: 'Avg Latency', value: '45ms', change: '-12ms', icon: Cpu, color: 'text-green-500' },
            ].map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold">
                            {stat.change}
                        </span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Deployments List */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Recent Activity</h2>
                    <button className="text-purple-600 hover:text-purple-500 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-4">
                    {deployments.map((dep) => (
                        <div key={dep.id} className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${dep.status === 'running' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : dep.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                <div>
                                    <div className="font-semibold text-sm">{dep.name}</div>
                                    <div className="text-xs text-gray-500 flex gap-2">
                                        <span>{dep.region}</span>
                                        <span>•</span>
                                        <span>{dep.uptime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-white/10 font-mono text-gray-600 dark:text-gray-400">
                                    v2.1.0
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Terminal */}
            <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#050505] rounded-2xl border border-gray-800 p-4 flex flex-col font-mono text-xs overflow-hidden relative min-h-[300px]"
            >
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Terminal className="w-4 h-4" />
                        <span>Live Logs</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto text-gray-300 max-h-[300px] scrollbar-hide">
                    {logs.map((log, i) => (
                        <p key={i} className={log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : log.type === 'error' ? 'text-red-400' : 'text-gray-300'}>
                            <span className="opacity-50">[{log.time}]</span> {log.msg}
                        </p>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </motion.div>
        </div>
    </div>
  );

  const ServersContent = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Active Deployments</h2>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg shadow-purple-500/20">
                <Plus className="w-4 h-4" /> Deploy New Server
            </button>
        </div>

        <div className="grid gap-4">
            {deployments.map((dep) => (
                <motion.div 
                    layout
                    key={dep.id} 
                    className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                         <div className={`p-3 rounded-full ${dep.status === 'running' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'}`}>
                             <Server className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="text-lg font-bold">{dep.name}</h3>
                            <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {dep.status}</span>
                                <span>{dep.region}</span>
                                <span>{dep.uptime}</span>
                            </div>
                         </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => toggleServerStatus(dep.id)}
                            className={`p-2 rounded-lg border transition-colors ${dep.status === 'running' ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-green-200 text-green-500 hover:bg-green-50'}`}
                            title={dep.status === 'running' ? 'Stop Server' : 'Start Server'}
                        >
                            <Power className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 hover:text-red-500 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  );

  const ActivityContent = () => (
    <div className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
             <h3 className="font-bold">System Log Stream</h3>
             <div className="flex gap-2">
                 <button className="text-xs px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 transition-colors">All</button>
                 <button className="text-xs px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">Errors</button>
             </div>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-white/5">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="min-w-[80px] text-xs text-gray-500 font-mono">
                        20:4{i}:{10 + i}
                    </div>
                    <div className="flex-1 text-sm">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded mr-3 ${i % 3 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {i % 3 === 0 ? 'SUCCESS' : 'INFO'}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                            {i % 3 === 0 ? 'Successfully processed request to /api/v1/generate' : 'Worker node initialized new connection pool'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const SettingsContent = () => (
      <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" /> Profile Settings
              </h3>
              <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                          <input type="text" defaultValue="Alex" className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:border-purple-500" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                          <input type="text" defaultValue="Developer" className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:border-purple-500" />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <input type="email" defaultValue="alex@mcp-forge.dev" className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:border-purple-500" />
                  </div>
              </div>
          </div>

          <div className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Key className="w-5 h-5 text-yellow-500" /> API Access
              </h3>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Production API Key</label>
                      <div className="flex gap-2">
                          <input type="password" value="sk_live_51M..." readOnly className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none font-mono text-sm text-gray-500" />
                          <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Regenerate</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" /> Danger Zone
              </h3>
              <button className="px-4 py-2 border border-red-500/30 bg-red-500/5 text-red-600 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-colors w-full sm:w-auto">
                  Delete Account & All Data
              </button>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0118] flex font-sans text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 lg:w-64 border-r border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl flex flex-col justify-between py-6 z-20"
      >
        <div>
          <div className="px-6 mb-10 flex items-center gap-3 cursor-pointer" onClick={onBack}>
             <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <LayoutDashboard className="text-white w-5 h-5" />
             </div>
             <span className="text-xl font-bold tracking-tight hidden lg:block">
                MCP<span className="opacity-50">Forge</span>
             </span>
          </div>

          <nav className="px-3 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative ${
                  activeTab === item.id 
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium hidden lg:block">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-purple-600 rounded-r-full" 
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-3">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden lg:block">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
            <h1 className="text-xl font-semibold capitalize flex items-center gap-2">
                {activeTab}
                {isLoading && <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />}
            </h1>
            
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search deployments..." 
                        className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-purple-500 outline-none text-sm transition-all w-64 focus:ring-2 focus:ring-purple-500/20"
                    />
                </div>
                <button 
                    onClick={handleRefresh}
                    className="p-2 relative hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                    <Bell className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold leading-none">Alex Dev</div>
                        <div className="text-xs text-gray-500">Pro Plan</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-white dark:border-white/20 shadow-md" />
                </div>
            </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto h-full">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                >
                    {activeTab === 'overview' && <OverviewContent />}
                    {activeTab === 'servers' && <ServersContent />}
                    {activeTab === 'activity' && <ActivityContent />}
                    {activeTab === 'settings' && <SettingsContent />}
                </motion.div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardView;