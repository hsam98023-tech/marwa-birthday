import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Playlist from './Playlist';
import TimeSinceCounter from './TimeSinceCounter';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient'; 

const CelebrationScene: React.FC = () => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setIsSending(true);
    const { error } = await supabase.from('Marwa happy birthday').insert([{ sender_name: name || 'Anonymous', Message: wish }]);
    if (!error) {
      setWish(''); setName(''); setShowSuccess(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setShowSuccess(false), 5000);
    }
    setIsSending(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center">
      <div className="max-w-2xl w-full space-y-8">
        <header>
          <h2 className="text-gold-500 font-serif text-xl tracking-widest uppercase mb-2">Happy Birthday</h2>
          <h1 className="text-7xl md:text-8xl font-serif text-white drop-shadow-2xl">Marwa</h1>
        </header>
        <div className="py-4 border-y border-gold-500/20"><TimeSinceCounter /></div>
        <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-left">
          <form onSubmit={handleSendWish} className="space-y-4">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-500/50" />
            <textarea placeholder="Write a wish..." value={wish} onChange={(e) => setWish(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold-500/50 resize-none" />
            <button disabled={isSending} type="submit" className="w-full bg-gold-600 text-black font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-transform active:scale-95">
              {isSending ? 'Sending...' : 'Send Wish'}
            </button>
          </form>
          {showSuccess && <p className="mt-4 text-gold-500 text-center text-sm">Sent to the stars! 🌟</p>}
        </div>
        <div className="mt-8"><Playlist /></div>
      </div>
    </motion.div>
  );
};
export default CelebrationScene;
