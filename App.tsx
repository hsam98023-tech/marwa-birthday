import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene } from './types';
import { Background } from './components/Background';
import { LoginScene } from './components/LoginScene';
import { CountdownScene } from './components/CountdownScene';
import { CakeScene } from './components/CakeScene';
import { CelebrationScene } from './components/CelebrationScene';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const [scene, setScene] = useState<Scene>(Scene.LOGIN);

  const renderScene = () => {
    switch (scene) {
      case Scene.LOGIN:
        return <LoginScene onSuccess={() => setScene(Scene.COUNTDOWN)} />;
      case Scene.COUNTDOWN:
        return <CountdownScene onComplete={() => setScene(Scene.CAKE)} />;
      case Scene.CAKE:
        return <CakeScene onComplete={() => setScene(Scene.CELEBRATION)} />;
      case Scene.CELEBRATION:
        return <CelebrationScene />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-gold-500/30 selection:text-gold-200 transition-colors duration-500 ease-in-out bg-soft-rose dark:bg-navy-deep text-plum dark:text-slate-100">
      <Background />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      <ThemeToggle />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;