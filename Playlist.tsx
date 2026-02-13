import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play } from 'lucide-react';

const songs = [
  { title: "Happy Birthday", artist: "Traditional", duration: "2:10" },
  { title: "Life with You", artist: "Cinematic", duration: "3:45" },
  { title: "Moments", artist: "Acoustic", duration: "2:55" }
];

const Playlist: React.FC = () => {
  return (
    <div className="w-full space-y-3">
      {songs.map((song, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gold-500/20 flex items-center justify-center text-gold-500">
              <Music size={14} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-200 group-hover:text-gold-400 transition-colors">{song.title}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-600 font-mono">{song.duration}</span>
            <Play size={12} className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// هاد السطر هو اللي كيحيد الخطأ ديال LoginScene
export default Playlist;
