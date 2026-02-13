import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CakeSceneProps {
  onComplete: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ onComplete }) => {
  const [isBlown, setIsBlown] = useState(false);

  // Generate particles for the burst effect
  // We create them once to ensure stability during the animation
  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600, // Horizontal spread
    y: (Math.random() - 1.2) * 500, // Vertical spread (mostly upwards)
    scale: Math.random() * 0.8 + 0.2,
    rotation: Math.random() * 360,
    duration: Math.random() * 1.5 + 1.0,
    delay: Math.random() * 0.2
  }));

  const handleBlow = () => {
    setIsBlown(true);
    // Wait for animation to finish before transitioning
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 1.5 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    >
      <div className="relative mt-20">
        {/* Glow behind cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-[60px]" />

        {/* Cake Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Candles */}
          <div className="flex space-x-6 mb-[-10px] z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame */}
                <motion.div
                  animate={isBlown ? { 
                    opacity: 0, 
                    scale: 0,
                    y: -30,
                  } : { 
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.15, 1],
                    rotate: [-3, 3, -3],
                  }}
                  transition={isBlown ? { duration: 0.4, ease: "easeIn" } : {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-5 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px] shadow-[0_0_25px_rgba(250,204,21,0.8)]"
                />
                {/* Wick */}
                <div className="w-0.5 h-2 bg-slate-800/60" />
                {/* Candle Stick */}
                <div className="w-3 h-12 bg-gradient-to-b from-rose-50 to-rose-100 rounded-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="w-40 h-16 bg-gradient-to-r from-rose-200 to-rose-300 rounded-lg shadow-lg relative z-10 border-b-4 border-rose-100/30">
             <div className="absolute top-0 w-full h-full bg-white/10 rounded-lg" />
             <div className="absolute -bottom-1 w-full h-2 bg-black/10 blur-sm rounded-full" />
          </div>

          {/* Bottom Tier */}
          <div className="w-56 h-20 bg-gradient-to-r from-rose-300 to-rose-400 rounded-lg shadow-xl -mt-2 relative z-0 border-b-4 border-rose-200/30">
            <div className="absolute top-0 w-full h-full bg-black/5 rounded-lg" />
            <div className="absolute -bottom-1 w-full h-2 bg-black/20 blur-md rounded-full" />
          </div>

          {/* Plate */}
          <div className="w-72 h-3 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 shadow-2xl border-t border-slate-300 dark:border-slate-700 transition-colors duration-500" />

          {/* Particle Burst System */}
          {isBlown && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-50">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ 
                    x: p.x, 
                    y: p.y, 
                    opacity: 0, 
                    scale: p.scale,
                    rotate: p.rotation
                  }}
                  transition={{ 
                    duration: p.duration, 
                    ease: "easeOut",
                    delay: p.delay
                  }}
                  className="absolute top-0 left-1/2 w-2 h-2 bg-gold-300 rounded-full blur-[1px] shadow-[0_0_15px_rgba(250,204,21,0.9)]"
                />
              ))}
            </div>
          )}

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-20"
      >
        {!isBlown && (
          <button
            onClick={handleBlow}
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-60 group-hover:opacity-80 transition-opacity border border-gold-500/20 rounded-full backdrop-blur-md"></span>
            <span className="relative text-gold-300 font-serif tracking-widest text-lg group-hover:text-gold-200 transition-colors flex items-center gap-3">
              Blow Out 
              <motion.span 
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                🎂
              </motion.span>
            </span>
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(250,204,21,0.2)]"></div>
          </button>
        )}
      </motion.div>

    </motion.div>
  );
};