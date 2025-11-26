'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay was prevented, user needs to interact
        console.log('Autoplay prevented');
      }
    };

    tryAutoplay();

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio.mp3"
        loop
        preload="auto"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-50 bg-white/95 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-gray-200 flex items-center gap-3"
      >
        <button
          onClick={togglePlay}
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <FiMusic className="w-5 h-5 animate-pulse" />
          ) : (
            <FiMusic className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <FiVolumeX className="w-5 h-5" />
          ) : (
            <FiVolume2 className="w-5 h-5" />
          )}
        </button>
      </motion.div>
    </>
  );
}
