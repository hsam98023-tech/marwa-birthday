import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Playlist from './Playlist';
import TimeSinceCounter from './TimeSinceCounter';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient'; 

const CelebrationScene: React.FC = () => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [submittedWishes, setSubmittedWishes] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);

  // جلب الرسائل من الداتا بيز عند تحميل الصفحة
  useEffect(() => {
    const fetchWishes = async () => {
      // تعديل اسم الجدول ليطابق Supabase
      const { data, error } = await supabase
        .from('Marwa happy birthday') 
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setSubmittedWishes(data);
      if (error) console.error("Error fetching wishes:", error.message);
    };
    fetchWishes();
  }, []);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setIsSending(true);
    // تعديل أسماء الأعمدة لتطابق Supabase: sender_name و Message
    const { data, error } = await supabase
      .from('Marwa happy birthday')
      .insert([{ 
        sender_name: name || 'Anonymous', 
        Message: wish 
      }])
      .select();

    if (!error && data) {
      setSubmittedWishes([data[0], ...submittedWishes]);
      setWish('');
      setName('');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
      console.error("Error sending wish:", error?.message);
    }
    setIsSending(false);
  };

  return (
    <motion.div className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center bg-transparent">
      <div className="max-w-2xl w-full space-y-12">
        <header>
          <h2 className="text-gold-500 font-serif text-xl tracking-[0.3em] uppercase mb-4 italic">Happy Birthday</h2>
          <h1 className="text-7xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">Marwa</h1>
        </header>

        <div className="py-8 border-y border-gold-500/20 backdrop-blur-sm">
          <TimeSinceCounter />
        </div>

        {/* خانة الرسائل بستايل Glassmorphism المعزز */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] text-left transition-all hover:border-gold-500/30"
        >
          <h3 className="text-gold-500 font-serif text-center text-xl mb-8 tracking-widest uppercase">Leave a Wish ✨</h3>
          <form onSubmit={handleSendWish} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all placeholder:text-slate-500"
            />
            <textarea
              placeholder="Write a heartfelt message for Marwa..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-slate-500"
            />
            <button
              disabled={isSending}
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {isSending ? 'Sending to Database...' : 'Send Wish'}
            </button>
          </form>
        </motion.div>

        {/* عرض الرسائل المكتوبة (Feed) مع مطابقة متغيرات الداتا بيز */}
        <div className="space-y-6 text-left max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
          <AnimatePresence>
            {submittedWishes.map((w, i) => (
              <motion.div
                key={w.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border-l-4 border-gold-500 shadow-lg"
              >
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">
                  {w.sender_name || 'Anonymous'}
                </p>
                <p className="text-slate-200 font-serif italic text-lg leading-relaxed">
                  "{w.Message}"
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 pt-10 border-t border-gold-500/10">
          <p className="text-[10px] text-slate-500 tracking-[0.5em] uppercase mb-8">Birthday Soundtrack</p>
          <Playlist />
        </div>
      </div>
    </motion.div>
  );
};

export default CelebrationScene;
