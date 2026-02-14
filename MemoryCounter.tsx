import React, { useState, useEffect } from 'react';

const MemoryCounter = () => {
  const [memory, setMemory] = useState({ years: 0, days: 0, seconds: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const birthDate = new Date('2008-02-18T00:00:00');
    const nextBirthday = new Date('2026-02-18T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      
      // 1. حساب الوقت اللي فات (Memory)
      const diffPast = now.getTime() - birthDate.getTime();
      setMemory({
        years: Math.floor(diffPast / (1000 * 60 * 60 * 24 * 365.25)),
        days: Math.floor(diffPast / (1000 * 60 * 60 * 24)),
        seconds: Math.floor(diffPast / 1000)
      });

      // 2. حساب الوقت المتبقي (Countdown)
      const diffFuture = nextBirthday.getTime() - now.getTime();
      if (diffFuture > 0) {
        setCountdown({
          days: Math.floor(diffFuture / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffFuture / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffFuture / (1000 * 60)) % 60),
          seconds: Math.floor((diffFuture / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      {/* القسم الأول: شحال عاشت (The Journey) */}
      <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <h4 className="text-gold-500 text-[10px] uppercase tracking-[0.3em] mb-4 text-center">The Journey So Far</h4>
        <div className="grid grid-cols-3 gap-2 font-mono">
          <div className="flex flex-col"><span className="text-white text-xl">{memory.years}</span><span className="text-[8px] text-slate-400 uppercase">Years</span></div>
          <div className="flex flex-col"><span className="text-white text-xl">{memory.days.toLocaleString()}</span><span className="text-[8px] text-slate-400 uppercase">Days</span></div>
          <div className="flex flex-col"><span className="text-gold-500 text-xl animate-pulse">●</span><span className="text-[8px] text-slate-400 uppercase">Living</span></div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-[10px] text-slate-300 font-mono">{memory.seconds.toLocaleString()} seconds of beautiful life</p>
        </div>
      </div>

      {/* القسم الثاني: شحال بقى (The Next Chapter) */}
      <div className="p-6 bg-gold-500/10 backdrop-blur-xl rounded-3xl border border-gold-500/20 shadow-lg">
        <h4 className="text-gold-500 text-[10px] uppercase tracking-[0.3em] mb-4 text-center">Counting down to 18th Feb</h4>
        <div className="grid grid-cols-4 gap-2 font-mono text-center">
          <div className="flex flex-col"><span className="text-white text-2xl font-bold">{countdown.days}</span><span className="text-[8px] text-gold-500/70 uppercase">Days</span></div>
          <div className="flex flex-col"><span className="text-white text-2xl font-bold">{countdown.hours}</span><span className="text-[8px] text-gold-500/70 uppercase">Hrs</span></div>
          <div className="flex flex-col"><span className="text-white text-2xl font-bold">{countdown.minutes}</span><span className="text-[8px] text-gold-500/70 uppercase">Min</span></div>
          <div className="flex flex-col"><span className="text-gold-500 text-2xl font-bold">{countdown.seconds}</span><span className="text-[8px] text-gold-500/70 uppercase">Sec</span></div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCounter;

