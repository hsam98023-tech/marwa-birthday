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
    // إرسال البيانات للسيرفر (Supabase)
    const { error } = await supabase
      .from('Marwa happy birthday')
      .insert([{ 
        sender_name: name || 'Anonymous', 
        Message: wish 
      }]);

    if (!error) {
      setWish('');
      setName('');
      setShowSuccess(true);
      // تأثير الكونفيتي اللي كيعجبك
      confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: ['#EAB308', '#FFFFFF', '#6366F1']
      });
      
      // إخفاء رسالة النجاح بعد 5 ثواني
      setTimeout(() => setShowSuccess(false), 5000);
    }
    setIsSending(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center bg-transparent"
    >
      <div className="max-w-2xl w-full space-y-12">
        <header>
          <h2 className="text-gold-500 font-serif text-xl tracking-[0.3em] uppercase mb-4 italic tracking-widest">Happy Birthday</h2>
          <h1 className="text-7xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">Marwa</h1>
        </header>

        {/* عداد الوقت الأنيق */}
        <div className="py-8 border-y border-gold-500/20 backdrop-blur-sm">
          <TimeSinceCounter />
        </div>

        {/* فورم إرسال الأمنيات - الرسائل غاتمشي للسيرفر وماتطلعش هنا */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] text-left transition-all hover:border-gold-500/30"
        >
          <h3 className="text-gold-500 font-serif text-center text-xl mb-8 tracking-widest uppercase">Leave a Secret Wish ✨</h3>
          <form onSubmit={handleSendWish} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all"
            />
            <textarea
              placeholder="Write your heart out..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all resize-none"
            />
            <button
              disabled={isSending}
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Wish'}
            </button>
          </form>

          {showSuccess && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-4 text-gold-500 text-center text-sm font-medium"
            >
              Your wish has been sent to the stars! 🌟
            </motion.p>
          )}
        </motion.div>

        {/* مشغل الموسيقى */}
        <div className="mt-16 pt-10 border-t border-gold-500/10">
          <Playlist />
        </div>
      </div>
    </motion.div>
  );
};

export default CelebrationScene;
