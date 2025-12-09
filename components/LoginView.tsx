import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Loader2 } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0118] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="absolute top-6 left-6 z-20">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors font-medium"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#110c1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-8 z-10 relative"
      >
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 mb-4 shadow-lg shadow-purple-500/30">
                <Zap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Forge</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to manage your MCP servers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="you@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="••••••••"
                />
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-gray-50 dark:bg-white/10" />
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-purple-600 hover:text-purple-500 font-medium transition-colors">Forgot password?</button>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing In...
                    </>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">
            Don't have an account? <button type="button" className="text-purple-600 hover:text-purple-500 font-bold ml-1 transition-colors">Create one</button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginView;