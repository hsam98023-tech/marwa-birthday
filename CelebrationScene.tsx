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
    // إرسال الرسالة إلى Supabase لضمان الخصوصية
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
      // تأثير الاحتفال
      confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: ['#EAB308', '#FFFFFF']
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }
    setIsSending(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center min-h-screen w-full px-6 py-20 text-center bg-transparent overflow-x-hidden"
    >
      <div className="max-w-2xl w-full space-y-10 relative">
        <header>
          <h2 className="text-gold-500 font-serif text-xl tracking-[0.3em] uppercase mb-4 italic">Happy Birthday</h2>
          <h1 className="text-7xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">Marwa</h1>
        </header>

        {/* رسائل التهنئة من الصورة + الجملة الجديدة */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 text-slate-200 font-serif italic text-lg leading-relaxed border-b border-gold-500/10 pb-8 px-4"
        >
          <p>عيد ميلاد سعيد، نتمنى لك سنة مليئة نجاح وسعادة.</p>
          <p>أتمنى لك لحظات هادئة، ضحك صادق، وذكريات جميلة.</p>
          <p>كل عام وأنت بخير، ودمت محاطة بالطمأنينة والفرح.</p>
          {/* الجملة الإضافية التي طلبتها */}
          <p className="text-gold-500 font-bold not-italic mt-4 text-xl tracking-wide">
            "نصيب قلبي الحلو من هالحياة أنك فيه."
          </p>
        </motion.div>

        <div className="py-6 border-b border-gold-500/10 backdrop-blur-sm">
          <TimeSinceCounter />
        </div>

        {/* مشغل الموسيقى بروابط Catbox المباشرة */}
        <div className="w-full">
           <Playlist />
        </div>

        {/* صندوق إرسال الأمنيات السري */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl text-left mt-10">
          <h3 className="text-gold-500 font-serif text-center text-lg mb-6 tracking-widest uppercase">Leave a Secret Wish ✨</h3>
          <form onSubmit={handleSendWish} className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-gold-500/50 transition-all" 
            />
            <textarea 
              placeholder="Write your heart out..." 
              value={wish} 
              onChange={(e) => setWish(e.target.value)} 
              rows={3} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-gold-500/50 resize-none transition-all" 
            />
            <button 
              disabled={isSending} 
              type="submit" 
              className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-4 rounded-xl uppercase tracking-widest text-xs active:scale-95 transition-all shadow-lg shadow-gold-900/20"
            >
              {isSending ? 'Sending...' : 'Send Wish'}
            </button>
          </form>
          {showSuccess && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-4 text-gold-500 text-center text-sm font-medium animate-pulse"
            >
              Sent to the stars! 🌟
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CelebrationScene;
