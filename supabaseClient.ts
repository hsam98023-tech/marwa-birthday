import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Playlist from './Playlist';
import TimeSinceCounter from './TimeSinceCounter';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient'; // كيعيط للملف اللي فيه الساروت

const CelebrationScene: React.FC = () => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [submittedWishes, setSubmittedWishes] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);

  // 1. جلب الرسائل القديمة من Supabase أول ما يتحل الموقع
  useEffect(() => {
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setSubmittedWishes(data);
      if (error) console.error("Error fetching wishes:", error);
    };
    fetchWishes();
  }, []);

  // 2. دالة إرسال الرسالة
  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setIsSending(true);
    const { data, error } = await supabase
      .from('wishes')
      .insert([{ 
        name: name || 'Anonymous', 
        text: wish,
        created_at: new Date().toISOString()
      }])
      .select();

    if (!error && data) {
      setSubmittedWishes([data[0], ...submittedWishes]);
      setWish('');
      setName('');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EAB308', '#F43F5E', '#FFFFFF']
      });
    } else {
      console.error("Error sending wish:", error);
    }
    setIsSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center"
    >
      <div className="max-w-2xl w-full space-y-12">
        {/* Header Section */}
        <section>
          <h2 className="text-gold-500 font-serif text-xl tracking-[0.3em] uppercase mb-4 italic">Happy Birthday</h2>
          <h1 className="text-6xl md:text-8xl font-serif text-slate-800 dark:text-white leading-tight drop-shadow-2xl">Marwa</h1>
        </section>

        {/* Counter Section */}
        <div className="py-8 border-y border-gold-500/20">
          <TimeSinceCounter />
        </div>

        {/* الخانة المطلوبة: Leave a Wish */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl text-gold-500 italic font-bold">"</div>
          <h3 className="text-gold-500 font-serif text-center text-xl mb-8 tracking-widest uppercase">Leave a Wish</h3>
          
          <form onSubmit={handleSendWish} className="space-y-4 relative z-10">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold-500/50 transition-all placeholder:text-slate-500"
            />
            <textarea
              placeholder="Write a message for Marwa..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold-500/50 transition-all resize-none placeholder:text-slate-500"
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
              type="submit"
              className={`w-full ${isSending ? 'bg-slate-600' : 'bg-gold-600 hover:bg-gold-500'} text-black font-bold py-4 rounded-lg uppercase tracking-[0.2em] text-xs transition-all shadow-lg`}
            >
              {isSending ? 'Sending...' : 'Send Wish'}
            </motion.button>
          </form>
        </motion.div>

        {/* Feed: عرض الرسائل اللي كاينين فالداتا بيز */}
        <div className="space-y-6 text-left max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {submittedWishes.map((w) => (
              <motion.div
                key={w.id || Math.random()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 border-l-4 border-l-gold-500 group hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gold-500 text-sm font-bold tracking-wider">{w.name}</p>
                  <span className="text-[10px] text-slate-500 uppercase italic">Memories</span>
                </div>
                <p className="text-slate-200 font-serif italic text-lg leading-relaxed">"{w.text}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Soundtrack Section */}
        <div className="mt-12 pt-8 border-t border-gold-500/10">
          <p className="text-[10px] text-slate-500 tracking-[0.5em] uppercase mb-8">Birthday Soundtrack</p>
          <Playlist />
        </div>
      </div>
    </motion.div>
  );
};

export default CelebrationScene;
            
