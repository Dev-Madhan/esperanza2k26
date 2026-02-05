'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const loadingPhrases = [
    "TURNING UP THE BASS",
    "ENTERING THE ARENA",
    "UNLEASHING THE CHAOS"
  ];

  useEffect(() => {
    const duration = 4000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const randomIncrement = Math.random() * 1.5;
        const next = Math.min(prev + increment + randomIncrement, 100);
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 600);
          return 100;
        }
        return next;
      });
    }, interval);

    const phraseInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % loadingPhrases.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(phraseInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-purple-500 overflow-hidden font-bricolage"
        >
          {/* ---------------- STICKERS ---------------- */}
          
          {/* Top Right Sticker */}
          <motion.div 
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ delay: 0.3, duration: 2 }}
            className="absolute top-8 right-8 md:top-12 md:right-12 bg-black border border-purple-800/50 p-6 md:p-8 shadow-lg z-0 w-48 h-22 md:w-50 md:h-30 rounded-2xl"
          >
            <p className="text-[14px] md:text-[17px] font-bold uppercase leading-relaxed text-center text-purple-400">
              With ❤️ From <br /> Vistara
            </p>
          </motion.div>

          {/* Bottom Left Sticker */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 8 }}
            transition={{ delay: 0.4, duration: 2 }}
            className="absolute bottom-24 left-8 md:bottom-16 md:left-12 bg-black border border-purple-800/50 p-5 md:p-6 shadow-lg z-0 min-h-32 md:min-h-40 rounded-2xl"
          >
            <p className="text-[10px] md:text-[16px] font-bold uppercase leading-relaxed text-purple-400">
              CREATE, <br /> COLLIDE, <br /> CELEBRATE <br /> REVERSE
            </p>
          </motion.div>

          {/* ---------------- CENTER CARD ---------------- */}
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[350px] md:max-w-md bg-black p-4 md:p-6 rounded-3xl shadow-2xl z-10 mx-6 border border-purple-800/50"
          >
            <div className="flex gap-1.5 mb-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-2.5 h-2.5 bg-purple-700 rounded-full"
              />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 }}
                className="w-2.5 h-2.5 bg-purple-700 rounded-full"
              />
            </div>

            {/* Loading Phrase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <p className="text-xs md:text-sm font-medium text-purple-400 text-center">
                  {loadingPhrases[currentWord]}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-purple-600 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Grid */}
            <div className="grid grid-cols-10 gap-2 md:gap-3 mb-8">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="origin-bottom"
                >
                  <motion.div
                    className={`h-7 md:h-9 w-6 md:w-8 rounded md:rounded-sm transition-colors duration-300 ${
                      (progress / 10) > i ? 'bg-purple-600' : 'bg-purple-900/50'
                    }`}
                    animate={{
                      y: (progress / 10) > i ? [0, -2, 0] : 0
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="relative h-1 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-purple-400 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Percentage Display */}
            <motion.div 
              className="text-right font-bold text-xl md:text-2xl tabular-nums text-purple-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-48 h-48 border border-purple-900/30 rounded-full"
                style={{
                  left: `${(i * 20) % 100}%`,
                  top: `${(i * 15) % 100}%`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.02, 0.04, 0.02],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Bottom signature */}
          <motion.div
            className="absolute bottom-4 text-purple-600/70 text-xs font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ◉ 6th MAR 2k26
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;