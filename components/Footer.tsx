import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
           <span className="text-xl font-bold text-gray-900 dark:text-white">MCP<span className="opacity-50">Forge</span></span>
           <span className="text-xs text-gray-500 ml-2">© 2024</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
           <a href="#" className="hover:text-purple-500 transition-colors">Privacy</a>
           <a href="#" className="hover:text-purple-500 transition-colors">Terms</a>
           <a href="#" className="hover:text-purple-500 transition-colors">Twitter</a>
        </div>

        <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-400 transition-colors"
        >
            <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;