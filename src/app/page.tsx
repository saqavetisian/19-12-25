'use client';

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import CountdownTimer from "@/components/CountdownTimer";
import AudioPlayer from "@/components/AudioPlayer";
import { RussianFlag, ArmenianFlag } from "@/components/Flags";
import { motion } from "framer-motion";
import { FiMapPin, FiChevronDown, FiHome, FiHeart, FiPlay, FiPause } from "react-icons/fi";
import { MdChurch, MdRestaurant } from "react-icons/md";
import { useAudio } from "@/contexts/AudioContext";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const { isPlaying, togglePlay } = useAudio();

  const timeline = [
    {
      time: t('groom.house.time'),
      title: t('groom.house.title'),
      location: t('groom.house'),
      icon: FiHome,
      image: null,
      mapUrl: null,
    },
    {
      time: t('bride.house.time'),
      title: t('bride.house.title'),
      location: t('bride.house'),
      icon: FiHeart,
      image: null,
      mapUrl: null,
    },
    {
      time: t('church.time'),
      title: t('church.title'),
      location: t('church'),
      icon: MdChurch,
      image: '/church.jpeg',
      mapUrl: 'https://maps.app.goo.gl/y48U8vDZqqMLPFsg8',
    },
    {
      time: t('restaurant.time'),
      title: t('restaurant.title'),
      location: t('restaurant.location'),
      icon: MdRestaurant,
      image: '/restaurant.jpeg',
      mapUrl: 'https://maps.app.goo.gl/dWqkQPppzWhcDK766',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <AudioPlayer />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/couple-1.jpeg"
            alt="Wedding couple"
            fill
            className="object-cover opacity-40"
            priority
            style={{ backgroundAttachment: 'fixed' }}
          />
        </div>
        
        {/* Overlay - Much lighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/30 z-10"></div>
        
        {/* Content */}
        <motion.div 
          className="relative z-20 text-center px-4 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="font-dancing text-2xl md:text-3xl text-gray-600 mb-6"
            variants={fadeInUp}
          >
            {t('invitation.title')}
          </motion.div>
          
          <motion.h1 
            className={`text-5xl sm:text-7xl md:text-9xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide ${
              language === 'hy' ? 'font-armenian' : 'font-playfair'
            }`}
            variants={fadeInUp}
          >
            {t('groom.name')}
          </motion.h1>
          
          <motion.div 
            className="font-dancing text-4xl sm:text-6xl md:text-8xl text-gray-700 mb-6 sm:mb-8"
            variants={fadeInUp}
          >
            &
          </motion.div>
          
          <motion.h1 
            className={`text-5xl sm:text-7xl md:text-9xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide ${
              language === 'hy' ? 'font-armenian' : 'font-playfair'
            }`}
            variants={fadeInUp}
          >
            {t('bride.name')}
          </motion.h1>
          
          <motion.div 
            className="font-crimson text-xl md:text-2xl text-gray-600 mb-6"
            variants={fadeInUp}
          >
            {t('wishing.hero')}
          </motion.div>
          
          <motion.div 
            className="font-playfair text-3xl md:text-4xl text-gray-800 mb-8"
            variants={fadeInUp}
          >
            {t('date')}
          </motion.div>

          {/* Audio Play/Stop Button */}
          <motion.div 
            className="mb-8"
            variants={fadeInUp}
          >
            <motion.button
              onClick={togglePlay}
              className="bg-white/80 backdrop-blur-sm rounded-full p-4 border-2 border-gray-300 hover:bg-white/90 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Stop' : 'Play'}
            >
              {isPlaying ? (
                <FiPause className="text-3xl text-gray-800" />
              ) : (
                <FiPlay className="text-3xl text-gray-800" />
              )}
            </motion.button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            className="mb-16"
            variants={fadeInUp}
          >
            <CountdownTimer />
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Schedule */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/couple-2.jpeg"
            alt="Wedding background"
            fill
            className="object-cover opacity-30"
            style={{ backgroundAttachment: 'fixed' }}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-white/30 to-white/40"></div>

        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.h2 
            className="font-playfair text-3xl sm:text-5xl md:text-6xl text-center text-gray-900 mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            {t('timeline.title')}
          </motion.h2>

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Icon and Time */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <IconComponent className="text-gray-600 text-2xl" />
                      </div>
                      <div>
                        <div className="font-playfair text-2xl sm:text-3xl text-gray-900 font-semibold">
                          {item.time}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl sm:text-2xl text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-start mb-3">
                        <FiMapPin className="text-gray-500 mr-3 mt-1 text-lg" />
                        <div>
                          <p className="font-crimson text-gray-700 whitespace-pre-line">{item.location}</p>
                        </div>
                      </div>

                      {item.mapUrl && (
                        <motion.a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg font-crimson font-semibold hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                        >
                          <FiMapPin className="mr-2" />
                          {t('open.map')}
                        </motion.a>
                      )}
                    </div>

                    {/* Image */}
                    {item.image && (
                      <div className="sm:w-64 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={300}
                          height={200}
                          className="rounded-xl object-cover w-full h-40 sm:h-48 shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <h3 className={`font-playfair text-3xl mb-6 ${
              language === 'hy' ? 'font-armenian' : ''
            }`}>
              {t('groom.name')} & {t('bride.name')}
            </h3>
            <p className="font-crimson text-xl text-gray-300 mb-8">
              {t('wishing.footer.subtitle')}
            </p>
            <div className="font-crimson text-gray-400">
              <p>{t('wishing.footer.main')}</p>
              <p className="mt-2">{t('date')}</p>
              <p className="mt-4 text-lg text-gray-200 font-semibold">{t('rsvp.text')}</p>
              <p className="mt-2 text-sm">{t('wishing.footer.closing')}</p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Language Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 right-6 z-50 flex gap-2 bg-white/95 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-gray-200"
      >
        <button
          onClick={() => setLanguage('ru')}
          className={`p-2 rounded-full transition-all duration-300 ${
            language === 'ru'
              ? 'bg-gray-100 scale-110 shadow-md ring-2 ring-gray-300'
              : 'hover:scale-105 hover:bg-gray-50'
          }`}
          title="Russian"
        >
          <RussianFlag />
        </button>
        <button
          onClick={() => setLanguage('hy')}
          className={`p-2 rounded-full transition-all duration-300 ${
            language === 'hy'
              ? 'bg-gray-100 scale-110 shadow-md ring-2 ring-gray-300'
              : 'hover:scale-105 hover:bg-gray-50'
          }`}
          title="Armenian"
        >
          <ArmenianFlag />
        </button>
      </motion.div>
    </div>
  );
}
