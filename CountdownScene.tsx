import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeSinceCounter from './TimeSinceCounter'; // حيدنا /components/

interface CountdownSceneProps {
  onComplete: () => void;
}

const CountdownScene: React.FC<CountdownSceneProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full"
    >
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-8xl md:text-9xl font-serif text-gold-500"
          >
            {count}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-6xl font-serif text-center text-slate-800 dark:text-gold-300 px-6"
          >
            Something special is waiting for you...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CountdownScene;
