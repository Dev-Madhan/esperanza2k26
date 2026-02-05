'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Star = ({ fillPercentage, isFlashing }: { fillPercentage: number; isFlashing: boolean }) => {
  return (
    <div className="relative w-10 h-10 md:w-16 md:h-16 mx-0.5">
      {/* Star Shape */}
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full drop-shadow-lg transition-colors duration-200 ${isFlashing ? 'text-blue-500' : 'text-gray-900/50'
          }`}
        style={{
          filter: isFlashing ? 'drop-shadow(0 0 8px rgba(0,0,255,0.8))' : 'none'
        }}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke={isFlashing ? "white" : "none"} // White outline when flashing
          strokeWidth="0.5"
        />
      </svg>

      {/* Filled Star Overlay (White/Solid) */}
      <div
        className="absolute inset-0 overflow-hidden mix-blend-normal"
        style={{ width: `${Math.max(0, Math.min(100, fillPercentage))}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-full h-full ${isFlashing ? 'text-red-500' : 'text-white'}`}
          style={{
            width: '100%',
            height: '100%',
            minWidth: '100%',
            filter: isFlashing ? 'drop-shadow(0 0 10px rgba(255,0,0,0.8))' : 'none'
          }}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Load the font
    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/pricedown';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const duration = 3000;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const randomIncrement = Math.random() * 2.5;
        const next = Math.min(prev + increment + randomIncrement, 100);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 800);
          return 100;
        }
        return next;
      });
    }, interval);

    // Flashing effect (Police Sirens visual)
    const flashTimer = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 400); // Fast flash

    return () => {
      clearInterval(timer);
      clearInterval(flashTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center overflow-hidden"
          style={{ fontFamily: "'Pricedown', sans-serif" }}
        >
          {/* Main Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex flex-col items-center gap-2 p-8"
          >
            {/* WANTED TEXT */}
            <h1
              className="text-[80px] md:text-[120px] leading-none tracking-widest text-[#d5d5d5] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
              style={{
                textShadow: '0 0 20px rgba(0,0,0,0.5)',
                transform: 'scaleY(1.1)' // Pricedown looks better slightly stretched
              }}
            >
              ESPERANZA
            </h1>

            {/* Stars Container - HUD Style */}
            <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 bg-gradient-to-r from-transparent via-black/20 to-transparent px-8 py-2 rounded-full">
              {[0, 1, 2, 3, 4].map((index) => {
                const starStart = index * 20;
                const starEnd = (index + 1) * 20;

                let starFill = 0;
                if (progress >= starEnd) {
                  starFill = 100;
                } else if (progress > starStart) {
                  starFill = ((progress - starStart) / 20) * 100;
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.1
                    }}
                  >
                    <Star
                      fillPercentage={starFill}
                      isFlashing={isFlashing && starFill < 100 && starFill > 0} // Flash only active/filling stars
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Loading Text */}
            <motion.p
              className="mt-6 text-white/40 text-sm md:text-lg font-sans uppercase tracking-[0.5em] font-bold"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading Assets... {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;