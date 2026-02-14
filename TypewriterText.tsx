import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const charTimeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 60); // السرعة ديال الكتابة
        return () => clearTimeout(charTimeout);
      }
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, delay]);

  return (
    <div className="font-serif text-xl md:text-2xl text-gold-500 italic min-h-[1.5em]">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-gold-500 ml-1 ml-1"
      >
        |
      </motion.span>
    </div>
  );
};

export default TypewriterText;
