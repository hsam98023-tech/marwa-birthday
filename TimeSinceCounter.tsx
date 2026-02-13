import React, { useState, useEffect } from 'react';

const TimeSinceCounter: React.FC = () => {
  // تاريخ ميلاد مروة (تقدر تعدلو إذا بغيتي التاريخ الحقيقي)
  const birthDate = new Date('2000-02-13T00:00:00'); 
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - birthDate.getTime();

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <span className="text-3xl md:text-4xl font-serif text-gold-500">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// هاد السطر هو اللي غادي يحل المشكل ديال Vercel دابا
export default TimeSinceCounter;
