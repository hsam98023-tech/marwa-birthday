import React from 'react';
import { motion } from 'framer-motion';
// العناوين الجديدة بلا مجلد components
import Playlist from './Playlist';
import TimeSinceCounter from './TimeSinceCounter';

const CelebrationScene: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-8 max-w-2xl"
      >
        <h2 className="text-gold-500 font-serif text-2xl tracking-[0.3em] uppercase">Happy Birthday</h2>
        <h1 className="text-6xl md:text-8xl font-serif text-slate-800 dark:text-white leading-tight">Marwa</h1>
        
        <div className="py-10 border-y border-gold-500/20">
          <p className="text-slate-600 dark:text-slate-400 font-light text-lg italic mb-6">
            "Counting every beautiful second since you arrived..."
          </p>
          <TimeSinceCounter />
        </div>

        <div className="mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-500 tracking-widest uppercase mb-6">Your Birthday Soundtrack</p>
          <Playlist />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CelebrationScene;
