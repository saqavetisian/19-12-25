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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={index}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: '#f9fafb',
              transition: { duration: 0.3 }
            }}
            className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg"
          >
            <div className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="font-crimson text-sm text-gray-600 uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
