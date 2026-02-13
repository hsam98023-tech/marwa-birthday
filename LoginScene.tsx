import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

// تأكد أنك حطيتي Playlist.tsx برا حتى هو باش يخدم هاد السطر
import Playlist from './Playlist'; 

interface LoginSceneProps {
  onSuccess: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: 'blur(10px)',
    transition: { duration: 0.8 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const LoginScene: React.FC<LoginSceneProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase().trim() === 'marwa' && password.toLowerCase().trim() === 'happybirthday') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 transition-colors duration-500"
    >
      <div className="w-full max-w-sm">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-serif text-center text-slate-800 dark:text-slate-100 mb-3 tracking-wide drop-shadow-lg transition-colors duration-500">
            Marwa <span className="text-gold-500 dark:text-gold-400">💫</span>
          </h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-center text-slate-500 dark:text-slate-400 text-sm mb-12 font-light tracking-widest uppercase transition-colors duration-500">
          Private Celebration Access
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-800 focus:border-gold-500/50 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 backdrop-blur-md focus:ring-1 focus:ring-gold-500/20 shadow-inner"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-800 focus:border-gold-500/50 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-200 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 backdrop-blur-md focus:ring-1 focus:ring-gold-500/20 shadow-inner"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(234, 179, 8, 1)", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              type="submit"
              className={`w-full py-3.5 rounded-lg text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 border ${
                error 
                  ? 'bg-red-500/20 dark:bg-red-900/20 text-red-700 dark:text-red-200 border-red-400 dark:border-red-800' 
                  : 'bg-transparent text-gold-600 dark:text-gold-300 border-gold-500/30 hover:border-gold-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]'
              }`}
            >
              {error ? 'Access Denied' : 'Begin Experience'}
            </motion.button>
          </motion.div>
        </form>

        {/* إضافة قائمة الأغاني هنا كما طلبت سابقاً */}
        <motion.div variants={itemVariants} className="mt-10">
           <Playlist />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginScene; // ضروري يكون export default

