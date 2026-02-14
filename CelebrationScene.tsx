import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Playlist from './Playlist';
import confetti from 'canvas-confetti';
import { supabase } from './supabaseClient'; 

// استيراد المكونات الجديدة التي قمت بإنشائها
import ParticlesBackground from './ParticlesBackground';
import MemoryCounter from './MemoryCounter';
import WelcomeMessage from './WelcomeMessage';
import TypewriterText from './TypewriterText';

const CelebrationScene: React.FC = () => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setIsSending(true);
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
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* 1. الترحيب الأولي */}
      {!isWelcomeDone && <WelcomeMessage onComplete={() => setIsWelcomeDone(true)} />}

      {/* 2. الخلفية السينمائية */}
      <ParticlesBackground />

      {/* 3. المحتوى الرئيسي */}
      <AnimatePresence>
        {isWelcomeDone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 flex flex-col items-center w-full px-6 py-20 text-center"
          >
            <div className="max-w-2xl w-full space-y-12 relative">
              <header className="space-y-4">
                <motion.h2 
                  initial={{ letterSpacing: "0.1em", opacity: 0 }}
                  animate={{ letterSpacing: "0.3em", opacity: 1 }}
                  className="text-gold-500 font-serif text-xl uppercase italic"
                >
                  Happy Birthday
                </motion.h2>
                <h1 className="text-7xl md:text-9xl font-serif text-white leading-tight drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  Marwa
                </h1>
              </header>

              {/* 4. رسائل التهنئة مع تأثير الكتابة للجملة الخاصة */}
              <div className="space-y-6 text-slate-200 font-serif italic text-lg leading-relaxed">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <p>عيد ميلاد سعيد، نتمنى لك سنة مليئة نجاح وسعادة.</p>
                  <p>أتمنى لك لحظات هادئة، ضحك صادق، وذكريات جميلة.</p>
                  <p>كل عام وأنت بخير، ودمت محاطة بالطمأنينة والفرح.</p>
                </motion.div>
                
                {/* الجملة الرومانسية بتأثير Typewriter */}
                <div className="pt-4">
                  <TypewriterText text="نصيب قلبي الحلو من هالحياة أنك فيه." delay={2000} />
                </div>
              </div>

              {/* 5. عداد الذاكرة والمستقبل */}
              <div className="py-8">
                <MemoryCounter />
              </div>

              {/* 6. مشغل الموسيقى */}
              <div className="w-full">
                <Playlist />
              </div>

              {/* 7. صندوق إرسال الأمنيات */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-2xl text-left mt-10"
              >
                <h3 className="text-gold-500 font-serif text-center text-lg mb-6 tracking-widest uppercase">Leave a Secret Wish ✨</h3>
                <form onSubmit={handleSendWish} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 transition-all placeholder:text-slate-500" 
                  />
                  <textarea 
                    placeholder="Write your heart out..." 
                    value={wish} 
                    onChange={(e) => setWish(e.target.value)} 
                    rows={3} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-gold-500/50 resize-none transition-all placeholder:text-slate-500" 
                  />
                  <button 
                    disabled={isSending} 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-lg shadow-gold-900/20"
                  >
                    {isSending ? 'Sending...' : 'Send Wish'}
                  </button>
                </form>
                {showSuccess && (
                  <p className="mt-4 text-gold-500 text-center text-sm font-medium animate-pulse">
                    Sent to the stars! 🌟
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CelebrationScene;
