import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const START_DATE = new Date('2008-02-18T00:00:00');

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden h-14 md:h-24 min-w-[3.5rem] md:min-w-[6rem] px-2 flex justify-center items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-700/50 shadow-lg transition-colors duration-500 group hover:border-gold-400/50">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
            className="absolute text-xl md:text-4xl font-serif font-bold text-plum dark:text-gold-400 group-hover:text-gold-500 dark:group-hover:text-gold-300 transition-colors"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-plum/60 dark:text-slate-500 font-medium">
        {label}
      </span>
    </div>
  );
};

export const TimeSinceCounter: React.FC = () => {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col items-center space-y-6 py-4"
    >
      <div className="flex gap-3 md:gap-6">
        <TimeUnit value={time.days} label="Days" />
        <TimeUnit value={time.hours} label="Hours" />
        <TimeUnit value={time.minutes} label="Minutes" />
        <TimeUnit value={time.seconds} label="Seconds" />
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center"
      >
        <span className="text-sm font-serif italic text-plum/70 dark:text-gold-200/60 tracking-wider">
          Since the world became brighter ✨
        </span>
      </motion.div>
    </motion.div>
  );
};