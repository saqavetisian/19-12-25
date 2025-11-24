'use client';

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiX, FiChevronDown, FiHome, FiHeart, FiCalendar } from "react-icons/fi";
import { MdChurch, MdRestaurant } from "react-icons/md";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const coupleImages = [
    '/couple-1.jpeg',
    '/couple-2.jpeg',
    '/couple-3.jpeg',
    '/couple-4.jpeg',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-40 to-cream-50">
      {/* Language Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 right-6 z-50 flex gap-2 bg-cream-100/95 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-cream-200/50"
      >
        <button
          onClick={() => setLanguage('ru')}
          className={`px-4 py-1 rounded-full transition-all duration-300 font-lora text-sm ${
            language === 'ru'
              ? 'bg-soft-gray-700 text-cream-50 font-semibold'
              : 'text-soft-gray-600 hover:text-soft-gray-800'
          }`}
        >
          RU
        </button>
        <button
          onClick={() => setLanguage('hy')}
          className={`px-4 py-1 rounded-full transition-all duration-300 font-lora text-sm ${
            language === 'hy'
              ? 'bg-soft-gray-700 text-cream-50 font-semibold'
              : 'text-soft-gray-600 hover:text-soft-gray-800'
          }`}
        >
          HY
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-cream-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-soft-gold-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cormorant font-light text-soft-gray-800 mb-4 tracking-wide">
              {t('groom.name')}
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="flex items-center justify-center gap-4 my-6"
            >
              <div className="h-px w-20 bg-soft-gold-300"></div>
              <span className="text-3xl text-soft-gold-400">✦</span>
              <div className="h-px w-20 bg-soft-gold-300"></div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cormorant font-light text-soft-gray-800 tracking-wide">
              {t('bride.name')}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-crimson text-soft-gray-700 mb-6">
              {t('date')}
            </p>
            <p className="text-lg md:text-xl text-soft-gray-600 font-lora italic mb-4">
              {t('invitation.title')}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8"
            >
              <p className="text-lg md:text-xl text-soft-gray-700 font-lora mb-2">
                {t('wishing.hero')}
              </p>
              <p className="text-base md:text-lg text-soft-gray-600 font-lora italic">
                {t('wishing.hero.subtitle')}
              </p>
            </motion.div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-16"
          >
            <CountdownTimer />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16"
          >
            <FiChevronDown className="w-6 h-6 mx-auto text-soft-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-cream-40/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-cormorant font-light text-center text-soft-gray-800 mb-16 tracking-wide"
          >
            {t('timeline.title')}
          </motion.h2>
          
          <div className="space-y-10">
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-cream-100/60 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 border border-cream-200/50 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image if available */}
                    {item.image && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="lg:w-1/3 h-64 lg:h-auto relative overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                    
                    <div className={`flex-1 p-6 lg:p-8 ${item.image ? 'lg:w-2/3' : ''}`}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0 flex items-center gap-4">
                          <IconComponent className="text-4xl text-soft-gold-600" />
                          <div className="text-right">
                            <div className="text-3xl font-cormorant font-semibold text-soft-gray-800">
                              {item.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-cormorant font-light text-soft-gray-800 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-soft-gray-600 font-lora mb-4">{item.location}</p>
                          
                          {/* Map if available */}
                          {item.mapUrl && (
                            <motion.a
                              href={item.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center gap-2 text-soft-gold-600 hover:text-soft-gold-700 font-lora text-sm transition-colors"
                            >
                              <FiMapPin className="w-4 h-4" />
                              {t('open.map')}
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-cream-40 to-cream-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-cormorant font-light text-center text-soft-gray-800 mb-16 tracking-wide"
          >
            {t('gallery.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupleImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-cream-200/50"
                onClick={() => setSelectedImage(index)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  className="aspect-[4/3] relative overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Couple photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-soft-gray-900/40 to-transparent"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-soft-gray-900/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-4 right-4 text-cream-50 text-4xl hover:text-cream-200 transition-colors font-light z-10"
              onClick={() => setSelectedImage(null)}
            >
              <FiX />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={coupleImages[selectedImage]}
                alt={`Couple photo ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 text-center bg-soft-gray-800 text-cream-50"
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-2xl md:text-3xl font-cormorant font-light mb-4"
          >
            {t('wishing.footer.main')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-cream-200 font-lora italic mb-6 leading-relaxed"
          >
            {t('wishing.footer.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 pt-8 border-t border-cream-200/20"
          >
            <p className="text-xl font-cormorant font-light mb-2">
              {t('groom.name')} & {t('bride.name')}
            </p>
            <p className="text-cream-200 font-lora text-sm mb-4">{t('date')}</p>
            <p className="text-cream-300 font-lora text-sm italic">
              {t('wishing.footer.closing')}
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
