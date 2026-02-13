import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SONGS = [
  {
    title: "Basrah w Atoh",
    artist: "Cairokee",
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981368/Cairokee_-_Basrah_w_Atoh_%D9%83%D8%A7%D9%8A%D8%B1%D9%88%D9%83%D9%8A_-_%D8%A8%D8%B3%D8%B1%D8%AD_%D9%88%D8%A7%D8%AA%D9%88%D9%87_MP3_70K_wvznzt.mp3"
  },
  {
    title: "Impossible",
    artist: "James Arthur",
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981367/James_Arthur_-_Impossible_Lyrics_MP3_70K_riogqs.mp3"
  },
  {
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    url: "https://res.cloudinary.com/dyvktulzd/video/upload/v1770981368/The_Neighbourhood_-_Sweater_Weather_Lyrics_MP3_70K_iegxp6.mp3"
  }
];

export const Playlist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed in normal flow to save space
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current?.paused) {
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Playback prevented:", error);
            // Don't reset isPlaying here to keep UI state consistent, 
            // user will click again if needed.
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full flex justify-center">
      <audio
        ref={audioRef}
        src={SONGS[currentTrack].url}
        onEnded={() => handleTrackChange((currentTrack + 1) % SONGS.length)}
      />

      <motion.div
        layout
        className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden w-full transition-colors duration-500"
      >
        {/* Header / Toggle */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Album Art / Visualizer */}
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-rose-gold dark:from-gold-600 dark:to-slate-800 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
              {isPlaying ? (
                 <div className="flex items-end justify-center gap-[3px] pb-2 h-full">
                   {[1,2,3,4].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ height: ['20%', '80%', '40%', '100%', '20%'] }}
                       transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                       className="w-1 bg-slate-900/80 dark:bg-white/90 rounded-t-sm"
                     />
                   ))}
                 </div>
              ) : (
                 <span className="text-xl">🎵</span>
              )}
            </div>
            
            {/* Info */}
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gold-600 dark:text-gold-400 font-bold tracking-wider uppercase mb-0.5">Now Playing</span>
              <span className="text-sm text-plum dark:text-slate-100 font-medium truncate pr-4">{SONGS[currentTrack].title}</span>
              <span className="text-xs text-plum/60 dark:text-slate-400 truncate">{SONGS[currentTrack].artist}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
             <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="w-10 h-10 rounded-full bg-gold-500 text-slate-900 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
             >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                )}
             </button>
             <motion.div 
               animate={{ rotate: isOpen ? 180 : 0 }}
               className="text-plum/50 dark:text-slate-400"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
             </motion.div>
          </div>
        </div>

        {/* Expanded Playlist */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-plum/10 dark:border-white/5 overflow-hidden"
            >
              <div className="p-2 space-y-1 max-h-48 overflow-y-auto no-scrollbar bg-white/40 dark:bg-black/20">
                {SONGS.map((song, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: "rgba(125,125,125,0.1)" }}
                    onClick={() => handleTrackChange(index)}
                    className={`
                      flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 group
                      ${currentTrack === index ? 'bg-gold-500/10 border border-gold-500/20' : 'border border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-xs w-4 ${currentTrack === index ? 'text-gold-600 dark:text-gold-400' : 'text-plum/50 dark:text-slate-600'}`}>
                         {currentTrack === index && isPlaying ? (
                            <div className="flex gap-[1px] h-3 items-end">
                              <motion.div animate={{ height: [2,8,2] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-gold-600 dark:bg-gold-400" />
                              <motion.div animate={{ height: [4,10,4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-[2px] bg-gold-600 dark:bg-gold-400" />
                              <motion.div animate={{ height: [2,6,2] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.2 }} className="w-[2px] bg-gold-600 dark:bg-gold-400" />
                            </div>
                         ) : (
                           <span>{index + 1}</span>
                         )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${currentTrack === index ? 'text-gold-600 dark:text-gold-300' : 'text-plum dark:text-slate-300 group-hover:text-black dark:group-hover:text-white'}`}>
                          {song.title}
                        </span>
                        <span className="text-[10px] text-plum/60 dark:text-slate-500 group-hover:text-plum/80 dark:group-hover:text-slate-400">
                          {song.artist}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};