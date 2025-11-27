'use client';

import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';
import { useAudio } from '@/contexts/AudioContext';

export default function AudioPlayer() {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();

  return (
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
  );
}
