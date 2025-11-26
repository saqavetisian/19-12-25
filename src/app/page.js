'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FaHome, 
  FaChurch, 
  FaUtensils, 
  FaMapMarkerAlt, 
  FaClock,
  FaCamera,
  FaEnvelope,
  FaPlay,
  FaStop,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';

export default function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Set wedding date to November 21, 2025
  const weddingDate = new Date('2025-11-21T16:30:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const audioElement = new Audio('/audio.mp3');
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isSliderOpen) {
        if (e.key === 'Escape') {
          closeSlider();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSliderOpen]);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const openSlider = (index) => {
    setCurrentImageIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const galleryImages = [
    '/photo_2_2025-09-06_12-23-46.jpg',
    '/photo_3_2025-09-06_12-23-46.jpg',
    '/photo_4_2025-09-06_12-23-46.jpg',
    '/photo_5_2025-09-06_12-23-46.jpg',
    '/photo_6_2025-09-06_12-23-46.jpg',
    '/photo_7_2025-09-06_12-23-46.jpg'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
        <Image
            src="/photo_1_2025-09-06_12-23-46.jpg"
            alt="Wedding couple"
            fill
            className="object-cover opacity-60"
          priority
        />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70 z-10"></div>
        
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
            Together with their families
          </motion.div>
          
          <motion.h1 
            className="font-playfair text-5xl sm:text-7xl md:text-9xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide"
            variants={fadeInUp}
          >
            Gevorg
          </motion.h1>
          
          <motion.div 
            className="font-dancing text-4xl sm:text-6xl md:text-8xl text-gray-700 mb-6 sm:mb-8"
            variants={fadeInUp}
          >
            &
          </motion.div>
          
          <motion.h1 
            className="font-playfair text-5xl sm:text-7xl md:text-9xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide"
            variants={fadeInUp}
          >
            Lianna
          </motion.h1>
          
          <motion.div 
            className="font-crimson text-xl md:text-2xl text-gray-600 mb-6"
            variants={fadeInUp}
          >
            invite you to celebrate their wedding
          </motion.div>
          
          <motion.div 
            className="font-playfair text-3xl md:text-4xl text-gray-800 mb-8"
            variants={fadeInUp}
          >
            November 21, 2025
          </motion.div>

          {/* Audio Controls */}
          <motion.div 
            className="mb-16"
            variants={fadeInUp}
          >
            <motion.button
              onClick={toggleAudio}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-gray-300 hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <FaStop className="text-3xl text-gray-800" />
              ) : (
                <FaPlay className="text-3xl text-gray-800" />
              )}
            </motion.button>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16"
            variants={fadeInUp}
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="font-crimson text-sm text-gray-600 uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Schedule - Clean Structured Style */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="absolute inset-0 z-0">
        <Image
            src="/photo_4_2025-09-06_12-23-46.jpg"
            alt="Wedding couple"
            fill
            className="object-cover opacity-60"
          priority
        />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70 z-10"></div>

        <div className="max-w-4xl mx-auto z-[10] relative">
          <motion.h2 
            className="font-playfair text-3xl sm:text-5xl md:text-6xl text-center text-gray-900 mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Wedding Day Schedule
          </motion.h2>

          {/* Structured vertical flow */}
          <div className="space-y-8">
            {[
              {
                time: '11:00 AM',
                event: 'Groom House',
                location: '7728 Goodland Ave \n' +
                    'North Hollywoode',
                description: 'Traditional Armenian wedding preparations begin' + '\n ',
                icon: FaHome
              },
              {
                time: '1:00 PM',
                event: 'Bride House',
                location: '24704 Airville Ave\n' +
                    'Newhall, CA  91321\n' +
                    'United States',
                description: 'Bride preparation and family gathering',
                icon: FaHome
              },
              {
                time: '4:30 PM',
                event: 'Wedding Ceremony',
                location: 'Saint Peter Armenian Apostolic Church',
                address: '17231 Sherman Way, Van Nuys, CA 91406',
                mapLink: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x80c299f4b99dd5a3:0x18cbce8ff3a2aebf?entry=s&sa=X&ved=1t:8290&hl=en-US&ictx=111',
                image: '/church.jpg',
                icon: FaChurch
              },
              {
                time: '6:30 PM',
                event: 'Wedding Reception',
                location: 'Allure Banquet Hall',
                address: '6939 Van Nuys Blvd, Van Nuys, CA 91405',
                mapLink: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x80c29719a287c791:0x5493fd659d32e60e?entry=s&sa=X&ved=1t:8290&hl=en-us&ictx=111',
                image: '/hall.jpg',
                icon: FaUtensils
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Icon and Time */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <item.icon className="text-gray-600 text-2xl" />
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
                      {item.event}
                    </h3>
                    
                    <div className="flex items-start mb-3">
                      <FaMapMarkerAlt className="text-gray-500 mr-3 mt-1 text-lg" />
                      <div>
                        <p className="font-crimson text-gray-700">{item.location}</p>
                        {item.address && (
                          <p className="font-crimson text-sm text-gray-500 mt-1">{item.address}</p>
                        )}
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="font-crimson text-gray-600 italic mb-4">
                        {item.description}
                      </p>
                    )}

                    {item.mapLink && (
                      <motion.a
                        href={item.mapLink}
            target="_blank"
            rel="noopener noreferrer"
                        className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg font-crimson font-semibold hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaMapMarkerAlt className="mr-2" />
                        Get Directions
                      </motion.a>
                    )}
                  </div>

                  {/* Image */}
                  {item.image && (
                    <div className="sm:w-64 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.event}
                        width={300}
                        height={200}
                        className="rounded-xl object-cover w-full h-40 sm:h-48 shadow-lg"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-playfair text-3xl sm:text-5xl md:text-6xl text-center text-gray-900 mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>

          {/* Mobile: Simple Grid, Desktop: Abstract Layout */}
          <div className="block md:hidden">
            {/* Mobile Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              {[
                '/photo_2_2025-09-06_12-23-46.jpg',
                '/photo_3_2025-09-06_12-23-46.jpg',
                '/photo_4_2025-09-06_12-23-46.jpg',
                '/photo_5_2025-09-06_12-23-46.jpg',
                '/photo_6_2025-09-06_12-23-46.jpg',
                '/photo_7_2025-09-06_12-23-46.jpg'
              ].map((src, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openSlider(index)}
                >
                  <Image
                    src={src}
                    alt={`Wedding photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <FaCamera className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Abstract Image Layout */}
          <div className="hidden md:block relative max-w-6xl mx-auto">
            {[
              { src: '/photo_2_2025-09-06_12-23-46.jpg', position: 'top-0 left-0', size: 'w-80 h-96', rotation: 'rotate-3' },
              { src: '/photo_3_2025-09-06_12-23-46.jpg', position: 'top-20 right-0', size: 'w-72 h-88', rotation: '-rotate-2' },
              { src: '/photo_4_2025-09-06_12-23-46.jpg', position: 'top-80 left-8', size: 'w-76 h-92', rotation: 'rotate-1' },
              { src: '/photo_5_2025-09-06_12-23-46.jpg', position: 'top-96 right-12', size: 'w-68 h-84', rotation: '-rotate-3' },
              { src: '/photo_6_2025-09-06_12-23-46.jpg', position: 'top-64 left-1/2 transform -translate-x-1/2', size: 'w-88 h-104', rotation: 'rotate-2' },
              { src: '/photo_7_2025-09-06_12-23-46.jpg', position: 'top-40 left-1/4', size: 'w-64 h-80', rotation: '-rotate-1' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position} ${item.size} ${item.rotation} rounded-2xl overflow-hidden group cursor-pointer shadow-2xl`}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, z: 10 }}
                onClick={() => openSlider(index)}
              >
                <Image
                  src={item.src}
                  alt={`Wedding photo ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <FaCamera className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
            
            {/* Spacer to maintain layout height - only on desktop */}
            <div className="h-[800px]"></div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-3xl mb-6">Gevorg & Lianna</h3>
            <p className="font-crimson text-xl text-gray-300 mb-8">
              We can't wait to celebrate with you!
            </p>
            <div className="font-crimson text-gray-400">
              <p>For any questions, please contact us</p>
              <p className="mt-2">November 21, 2025 • Van Nuys, California</p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Image Slider Modal */}
      {isSliderOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSlider}
        >
          <motion.div
            className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeSlider}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
            >
              <FaTimes className="text-white text-2xl" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
            >
              <FaChevronLeft className="text-white text-2xl" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
            >
              <FaChevronRight className="text-white text-2xl" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
        >
          <Image
                src={galleryImages[currentImageIndex]}
                alt={`Wedding photo ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white font-crimson">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}