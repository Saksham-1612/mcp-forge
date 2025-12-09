import React, { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, Zap } from 'lucide-react';
import { Theme } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onGetStarted?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-[#0a0118]/70 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-purple-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            MCP<span className="opacity-50">Forge</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Preview'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label="Toggle Theme"
          >
             {theme === Theme.DARK ? (
                <Moon className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
             ) : (
                <Sun className="w-5 h-5 text-orange-500 group-hover:rotate-90 transition-transform" />
             )}
          </button>

          <div className="hidden md:block">
            <button 
                onClick={onGetStarted}
                className="px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#0a0118]/95 backdrop-blur-xl border-b border-purple-500/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
               {['Features', 'How it Works', 'Preview'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-lg font-medium text-gray-800 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
               <button 
                onClick={() => {
                    setMobileMenuOpen(false);
                    onGetStarted?.();
                }}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/40 active:scale-95 transition-transform"
               >
                    Get Started
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;