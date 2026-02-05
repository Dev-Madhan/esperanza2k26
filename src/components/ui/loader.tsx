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
  const [isFadingOut, setIsFadingOut] = useState(false);

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
          setIsFadingOut(true);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 800);
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
          <div className="relative flex flex-col items-center w-full max-w-4xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-4 sm:mb-6 md:mb-8"
            >
              <motion.h1
                className="font-power text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[140px] font-black tracking-tighter leading-none text-center"
                style={{
                  background: 'linear-gradient(90deg, #FF5733, #FFC300, #29B463, #DAF7A5)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ESPERANZA
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative h-[2px] sm:h-[3px] w-[60%] sm:w-[200px] md:w-[280px] bg-white/20 rounded-full overflow-hidden origin-center"
            >
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FF5733, #FFC300, #29B463)',
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-3 sm:mt-4 md:mt-6 text-white/60 font-power text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
            >
              {Math.round(progress)}%
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-4 sm:mt-6 md:mt-8 flex items-center gap-1 sm:gap-2"
            >
              {['ENGAGE', 'ENTHRAL', 'ENTERTAIN'].map((word, index) => (
                <React.Fragment key={word}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.15 }}
                    className="text-white/50 font-display text-[10px] sm:text-xs md:text-sm tracking-wider sm:tracking-widest"
                  >
                    {word}
                  </motion.span>
                  {index < 2 && (
                    <span className="text-white/30 text-[8px] sm:text-xs">•</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 text-white/30 text-[10px] sm:text-xs font-display tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            MAR 5 2026        </motion.div>
      )}
        </AnimatePresence>
      );
};

      export default Loader;