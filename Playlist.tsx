import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';

const songs = [
  { 
    title: "Basrah w Atoh", 
    artist: "Cairokee", 
    url: "https://files.catbox.moe/4d7ba7.mp3" 
  },
  { 
    title: "Impossible", 
    artist: "James Arthur", 
    url: "https://files.catbox.moe/wkvb03.mp3"
  },
  { 
    title: "Sweater Weather", 
    artist: "The Neighbourhood", 
    url: "https://files.catbox.moe/kmfwkf.mp3"
  }
];

const Playlist: React.FC = () => {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (url: string) => {
    if (!audioRef.current) return;

    if (playingUrl === url) {
      audioRef.current.pause();
      setPlayingUrl(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play().catch(e => console.error("Audio error:", e));
      setPlayingUrl(url);
    }
  };

  return (
    <div className="w-full space-y-3 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
      {songs.map((song, index) => (
        <motion.div
          key={index}
          whileHover={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}
          onClick={() => togglePlay(song.url)}
          className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gold-500/30 group"
        >
          <div className="flex items-center gap-4">
            <div className="text-gold-500">
              {playingUrl === song.url ? <Pause size={20} className="animate-pulse" /> : <Play size={20} />}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white tracking-wide">{song.title}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">{song.artist}</p>
            </div>
          </div>
          <Music size={16} className="text-slate-600 group-hover:text-gold-500 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
};

export default Playlist;
