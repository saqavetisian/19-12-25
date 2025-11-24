'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let weddingDate = new Date(`${currentYear}-12-19T00:00:00`);
      
      // If December 19 has passed this year, use next year
      if (now > weddingDate) {
        weddingDate = new Date(`${currentYear + 1}-12-19T00:00:00`);
      }
      
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-cream-100/80 backdrop-blur-sm rounded-xl px-6 py-4 min-w-[80px] md:min-w-[100px] shadow-md border border-cream-200/50"
          >
            <div className="text-3xl md:text-4xl font-cormorant font-semibold text-soft-gray-800">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm font-lora text-soft-gray-600 mt-1 uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
