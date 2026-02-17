import React, { useState, useEffect } from 'react';

const TimeSinceCounter: React.FC = () => {
  // التعديل: الحساب يبدأ من 18 فبراير 2008
  const birthDate = new Date('2008-02-18T00:00:00'); 
  
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

      // حساب السنوات (مع مراعاة السنوات الكبيسة بشكل تقريبي)
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      // الأيام المتبقية بعد طرح السنوات
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365.25);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ترجمة الأسماء للعربية أو إبقاؤها بالإنجليزية حسب ذوقك
  const labels: { [key: string]: string } = {
    years: "Years",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs"
  };

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col bg-black/20 backdrop-blur-sm p-2 rounded-lg">
          <span className="text-2xl md:text-4xl font-bold text-pink-500 dark:text-gold-500">
            {value}
          </span>
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400">
            {labels[unit]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeSinceCounter;
