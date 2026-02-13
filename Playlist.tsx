import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';

const songs = [
  { 
    title: "Basrah w Atoh", 
    artist: "Cairokee", 
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981368/Cairokee_-Basrah_w_Atoh%D9%83%D8%A7%D9%8A%D8%B1%D9%88%D9%83%D9%8I_-%D8%A8%D8%B3%D8%B1%D8%AD%D9%88%D8%A7%D8%AA%D9%88%D9%87_MP3_70K_wvznzt.mp3" 
  },
  { 
    title: "Impossible", 
    artist: "James Arthur", 
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981367/James_Arthur_-Impossible_Lyrics_MP3_70K_riogqs.mp3"
  },
  { 
    title: "Sweater Weather", 
    artist: "The Neighbourhood", 
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981368/The_Neighbourhood-_Sweater_Weather_Lyrics_MP3_70K_iegxp6.mp3"
  }
];

const Playlist: React.FC = () => {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [audio] = useState(new Audio());

  const togglePlay = (url: string) => {
    if (playingUrl === url) {
      audio.pause();
      setPlayingUrl(null);
    } else {
      audio.src = url;
      audio.play();
      setPlayingUrl(url);
    }
  };

  return (
    <div className="w-full space-y-3 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
      {songs.map((song, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(234, 179, 8, 0.1)" }}
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
