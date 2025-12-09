import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySteps from './components/StorySteps';
import LivePreview from './components/LivePreview';
import Features from './components/Features';
import ForgeTerminal from './components/ForgeTerminal';
import CTA from './components/CTA';
import Footer from './components/Footer';
import DashboardView from './components/DashboardView';
import LoginView from './components/LoginView';
import { Theme } from './types';

const App: React.FC = () => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
    }
    return Theme.DARK;
  });

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
        navigateToDashboard();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentView('login');
    }
  };

  const navigateToDashboard = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('dashboard');
  };

  const navigateToLanding = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('landing');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigateToDashboard();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateToLanding();
  };

  if (currentView === 'dashboard') {
    return (
      <DashboardView onBack={handleLogout} />
    );
  }

  if (currentView === 'login') {
      return (
          <LoginView onLoginSuccess={handleLoginSuccess} onBack={navigateToLanding} />
      );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
        theme === Theme.DARK ? 'bg-[#0a0118] text-white' : 'bg-white text-gray-900'
    }`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} onGetStarted={handleGetStarted} />
      
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <StorySteps />
        <LivePreview />
        <Features />
        <ForgeTerminal />
        <CTA onGetStarted={handleGetStarted} />
      </main>

      <Footer />
    </div>
  );
};

export default App;