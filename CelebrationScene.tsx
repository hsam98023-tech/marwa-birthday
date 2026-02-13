import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// تعديل المسارات: حيدنا ../utils/ و ./ حيت كلشي برا
import { supabase } from './supabaseClient'; 
import { Scene } from './types'; // تأكد من اسم الملف types.ts
import Playlist from './Playlist'; 
import TimeSinceCounter from './TimeSinceCounter';
import confetti from 'canvas-confetti';

// تعريف الـ Interface للميساجات حيت types.ts يقدر يكون فيه مشكل فالمسار
interface Message {
  id: number;
  sender_name: string;
  Message: string;
  created_at: string;
}

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const speed = 40;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="text-left md:text-center relative inline-block">
      <p className="text-lg md:text-xl font-serif text-plum dark:text-slate-200 leading-relaxed font-light tracking-wide">
        {displayedText}
        <span className={`inline-block w-[2px] h-[1em] bg-gold-500 ml-1 align-middle ${isCursorVisible ? 'opacity-100' : 'opacity-0'}`} />
      </p>
    </div>
  );
};

const CelebrationScene: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showRest, setShowRest] = useState(false);

  const birthdayMessage = "Happy Birthday! You truly deserve all the joy and attention today. I wish you a new year filled with personal and professional achievements, good health, and countless enjoyable moments that make your life even brighter.";

  const arabicLines = [
    "عيد ميلاد سعيد، نتمنى لك سنة مليانة نجاح وسعادة.",
    "أتمنى لك لحظات هادئة، ضحك صادق، وذكريات جميلة.",
    "كل عام وأنت بخير، ودمت محاطًا بالطمأنينة والفرح."
  ];

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
    fetchMessages();
  }, []);

  const handleTitleComplete = () => {
    setTimeout(() => setShowTypewriter(true), 500);
  };

  const handleTypewriterComplete = () => {
    setTimeout(() => {
      setShowRest(true);
      setTimeout(() => setShowMessages(true), 1500);
    }, 500);
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('Marwa happy birthday')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setMessages(data as Message[]);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#FDE047', '#EAB308', '#FFFFFF', '#FFB7B2'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('Marwa happy birthday')
        .insert([{ sender_name: newName.trim() || 'Anonymous', Message: newMessage.trim() }]);
      if (error) throw error;
      triggerConfetti();
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex flex-col items-center min-h-screen w-full px-4 pt-10 pb-40 overflow-y-auto no-scrollbar">
      <div className="max-w-3xl w-full space-y-8 text-center mb-6 mt-10 min-h-[40vh] flex flex-col items-center justify-start">
        <AnimatePresence>
          {showTitle && (
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onAnimationComplete={handleTitleComplete} className="text-4xl md:text-6xl font-serif text-gold-500 dark:text-gold-300 mb-4 tracking-wide font-medium drop-shadow-lg">
              Happy Birthday Marwa 💗
            </motion.h1>
          )}
        </AnimatePresence>
        {showTypewriter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl px-4">
            <TypewriterText text={birthdayMessage} onComplete={handleTypewriterComplete} />
          </motion.div>
        )}
        <AnimatePresence>
          {showRest && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="space-y-4 pt-6 opacity-80">
              {arabicLines.map((line, idx) => (
                <p key={idx} className="text-lg md:text-xl font-arabic text-plum dark:text-slate-300" dir="rtl">{line}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showRest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <div className="mb-10 w-full max-w-2xl"><TimeSinceCounter /></div>
            <div className="w-full max-w-md mb-8 relative z-20"><Playlist /></div>
            <div className="w-full max-w-xl">
              <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-slate-800/60 rounded-xl p-6 mb-12 shadow-2xl">
                <h3 className="text-gold-600 dark:text-gold-300 font-serif text-2xl mb-6 text-center">Leave a Wish</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <input type="text" placeholder="Your Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-white/50 dark:bg-slate-950/50 border rounded-lg px-4 py-3 outline-none" />
                  <textarea placeholder="Write a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows={3} className="w-full bg-white/50 dark:bg-slate-950/50 border rounded-lg px-4 py-3 outline-none resize-none" />
                  <button type="submit" disabled={isSubmitting || !newMessage.trim()} className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-900 font-medium rounded-lg">{isSubmitting ? 'Sending...' : 'Send Wish'}</button>
                </form>
              </div>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white/30 dark:bg-slate-900/30 border rounded-lg p-5 backdrop-blur-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gold-600 dark:text-gold-400 font-serif">{msg.sender_name}</span>
                      <span className="text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="font-light">{msg.Message}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20 text-plum/60 dark:text-slate-700 text-[10px] tracking-widest uppercase">Made by Ismail Chekir</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CelebrationScene; // التعديل المهم لـ App.tsx
                
