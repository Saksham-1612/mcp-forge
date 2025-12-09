import React from 'react';

interface CTAProps {
    onGetStarted?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  return (
    <section id="cta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-purple-900/10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto rounded-3xl bg-[#0a0118] border border-purple-500/30 p-12 md:p-20 text-center relative overflow-hidden group">
                
                {/* Background Grid that moves slightly on hover would be complex, simpler glow here */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
                    Ready to <span className="text-purple-400">Deploy</span>?
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
                    Join hundreds of developers converting their Postman Collections into robust MCP servers today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <button 
                        onClick={onGetStarted} 
                        className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:bg-purple-500 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                    >
                        Generate Server Now
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 active:scale-95">
                        View GitHub
                    </button>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>
        </div>
    </section>
  );
};

export default CTA;