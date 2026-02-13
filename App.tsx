import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Scene } from './types';
// حيدنا كلمة components/ من كاع المسارات حيت الملفات عندك برا نيشان
import Background from './Background';
import LoginScene from './LoginScene';
import CountdownScene from './CountdownScene';
import CakeScene from './CakeScene';
import CelebrationScene from './CelebrationScene';
import { ThemeProvider } from './ThemeContext'; // تأكد أن هاد الملف سميتو هكا برا
import ThemeToggle from './ThemeToggle';

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
