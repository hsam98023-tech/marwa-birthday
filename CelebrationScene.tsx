import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Playlist from './Playlist';
import TimeSinceCounter from './TimeSinceCounter';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient'; 

// هادو هما الكلمات اللي غيبقاو يطلعوا فالبلايص الخاوية
const floatingTexts = ["Happy Birthday! 🎂", "Marwa ✨", "Best Wishes 🎉", "Queen 👑", "26 Years 🌟"];

const CelebrationScene: React.FC = () => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // هاد التأثير هو اللي كيرجع الرسائل الاحتفالية
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#EAB308']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EAB308']
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setIsSending(true);
    const { error } = await supabase.from('Marwa happy birthday').insert([{ sender_name: name || 'Anonymous', Message: wish }]);
    if (!error) {
      setWish(''); setName(''); setShowSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setShowSuccess(false), 5000);
    }
    setIsSending(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center bg-transparent overflow-hidden">
      
      {/* كلمات طايرة فخلفية الموقع بلا ما تتقلو */}
      {floatingTexts.map((text, i) => (
        <motion.span
          key={i}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          className="absolute text-gold-500/20 font-serif pointer-events-none whitespace-nowrap"
          style={{ left: `${10 + i * 20}%`, fontSize: `${1 + Math.random()}rem` }}
        >
          {text}
        </motion.span>
      ))}

      <div className="max-w-2xl w-full space-y-10 relative z-20">
        <header>
          <motion.h2 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="text-gold-500 font-serif text-xl tracking-[0.3em] uppercase mb-4 italic">Happy Birthday</motion.h2>
          <h1 className="text-7xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">Marwa</h1>
        </header>

        <div className="py-6 border-y border-gold-500/20 backdrop-blur-sm">
          <TimeSinceCounter />
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl text-left">
          <h3 className="text-gold-500 font-serif text-center text-lg mb-6 tracking-widest uppercase">Secret Wish ✨</h3>
          <form onSubmit={handleSendWish} className="space-y-4">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-gold-500/50" />
            <textarea placeholder="Write something..." value={wish} onChange={(e) => setWish(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-gold-500/50 resize-none" />
            <button disabled={isSending} type="submit" className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-4 rounded-xl uppercase tracking-widest text-xs active:scale-95 transition-all">
              {isSending ? 'Sending...' : 'Send Wish'}
            </button>
          </form>
          {showSuccess && <p className="mt-4 text-gold-500 text-center text-sm font-medium animate-bounce">Sent! 🌟</p>}
        </div>

        <div className="mt-10">
          <Playlist />
        </div>
      </div>
    </motion.div>
  );
};

export default CelebrationScene;
