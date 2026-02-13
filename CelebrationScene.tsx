import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { Message } from '../types';
import { Playlist } from './Playlist';
import { TimeSinceCounter } from './TimeSinceCounter';
import confetti from 'canvas-confetti';

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const speed = 40; // ms per character

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

  // Cursor blinking effect
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
        <span
          className={`inline-block w-[2px] h-[1em] bg-gold-500 ml-1 align-middle transition-opacity duration-100 ${
            isCursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </p>
    </div>
  );
};

export const CelebrationScene: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  // Sequence state
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
    // Start Sequence
    setTimeout(() => setShowTitle(true), 500);
    fetchMessages();
  }, []);

  const handleTitleComplete = () => {
    setTimeout(() => setShowTypewriter(true), 500);
  };

  const handleTypewriterComplete = () => {
    setTimeout(() => {
      setShowRest(true);
      // Show messages section after a delay
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
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    const usernameToSave = newName.trim() || 'Anonymous';

    try {
      const { error } = await supabase
        .from('Marwa happy birthday')
        .insert([{ sender_name: usernameToSave, Message: newMessage.trim() }]);

      if (error) throw error;

      triggerConfetti();

      // Reset form and refresh messages
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center min-h-screen w-full px-4 pt-10 pb-40 overflow-y-auto no-scrollbar"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
             animate={{ 
               x: (Math.random() - 0.5) * 500, 
               y: (Math.random() - 0.5) * 500, 
               opacity: 0, 
               scale: Math.random() * 1.5 
             }}
             transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
             className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold-400 rounded-full blur-[1px]"
           />
        ))}
      </div>

      {/* Main Greeting Section */}
      <div className="max-w-3xl w-full space-y-8 text-center mb-6 mt-10 min-h-[40vh] flex flex-col items-center justify-start">
        
        {/* Title */}
        <AnimatePresence>
            {showTitle && (
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onAnimationComplete={handleTitleComplete}
                    className="text-4xl md:text-6xl font-serif text-gold-500 dark:text-gold-300 mb-4 tracking-wide font-medium drop-shadow-lg"
                >
                    Happy Birthday Marwa 💗
                </motion.h1>
            )}
        </AnimatePresence>

        {/* Typewriter Message */}
        {showTypewriter && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl px-4"
            >
                <TypewriterText 
                    text={birthdayMessage} 
                    onComplete={handleTypewriterComplete} 
                />
            </motion.div>
        )}

        {/* Arabic Lines (Secondary) */}
        <AnimatePresence>
            {showRest && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="space-y-4 pt-6 opacity-80"
                >
                    {arabicLines.map((line, idx) => (
                        <p key={idx} className="text-lg md:text-xl font-arabic text-plum dark:text-slate-300" dir="rtl">
                            {line}
                        </p>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Rest of the Content */}
      <AnimatePresence>
        {showRest && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-full flex flex-col items-center"
            >
                {/* Live Time Counter */}
                <div className="mb-10 w-full max-w-2xl">
                    <TimeSinceCounter />
                </div>

                {/* Music Player in Normal Flow */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md mb-8 relative z-20"
                >
                    <Playlist />
                </motion.div>

                {/* Message Box Section */}
                <AnimatePresence>
                    {showMessages && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full max-w-xl"
                    >
                        {/* Divider */}
                        <div className="flex items-center justify-center gap-4 mb-10 opacity-50">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400"></div>
                        <span className="text-gold-500 dark:text-gold-300 text-xl">❦</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400"></div>
                        </div>

                        {/* Input Form - Glassmorphism adapting to theme */}
                        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-slate-800/60 rounded-xl p-6 mb-12 shadow-2xl transition-colors duration-500">
                        <h3 className="text-gold-600 dark:text-gold-300 font-serif text-2xl mb-6 text-center">Leave a Wish</h3>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <input
                            type="text"
                            placeholder="Your Name (Optional)"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full bg-white/50 dark:bg-slate-950/50 border border-plum/20 dark:border-slate-700/50 rounded-lg px-4 py-3 text-plum dark:text-slate-200 placeholder:text-plum/50 dark:placeholder:text-slate-600 focus:border-gold-500/30 outline-none transition-colors"
                            />
                            <textarea
                            placeholder="Write a message for Marwa..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={3}
                            className="w-full bg-white/50 dark:bg-slate-950/50 border border-plum/20 dark:border-slate-700/50 rounded-lg px-4 py-3 text-plum dark:text-slate-200 placeholder:text-plum/50 dark:placeholder:text-slate-600 focus:border-gold-500/30 outline-none transition-colors resize-none"
                            ></textarea>
                            <button
                            type="submit"
                            disabled={isSubmitting || !newMessage.trim()}
                            className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-slate-900 font-medium tracking-wider uppercase rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                            >
                            {isSubmitting ? 'Sending...' : 'Send Wish'}
                            </button>
                        </form>
                        </div>

                        {/* Messages Feed */}
                        <div className="space-y-4">
                        {messages.length > 0 && (
                            messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/30 dark:bg-slate-900/30 border border-white/40 dark:border-slate-800/50 rounded-lg p-5 backdrop-blur-sm transition-colors duration-500 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-2">
                                <span className="text-gold-600 dark:text-gold-400 font-serif text-lg">{msg.sender_name}</span>
                                <span className="text-xs text-plum/70 dark:text-slate-600">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                                </div>
                                <p className="text-plum dark:text-slate-300 font-light leading-relaxed whitespace-pre-wrap">{msg.Message}</p>
                            </motion.div>
                            ))
                        )}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="mt-20 text-plum/60 dark:text-slate-700 text-[10px] tracking-widest uppercase transition-colors duration-500"
                >
                    Made by Ismail Chekir
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};