import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownSceneProps {
  onComplete: () => void;
}

export const CountdownScene: React.FC<CountdownSceneProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-9xl md:text-[12rem] font-serif text-gold-300 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]"
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};