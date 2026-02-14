import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeMessage = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // كيعلم الموقع بلي الترحيب سالا
    }, 3000); // كيبان لمدة 3 ثواني
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
        >
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl text-center backdrop-blur-md">
            <motion.h2 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-gold-500 font-serif text-3xl tracking-widest uppercase"
            >
              Welcome, Marwa
            </motion.h2>
            <div className="mt-4 h-[1px] w-12 bg-gold-500/50 mx-auto" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
