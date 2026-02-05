'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Star = ({ fillPercentage }: { fillPercentage: number }) => {
  return (
    <div className="relative w-8 h-8 md:w-12 md:h-12 mx-1">
      {/* Empty Star Background */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gray-800"
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* Filled Star Overlay */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${Math.max(0, Math.min(100, fillPercentage))}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
          style={{ width: '100%', height: '100%', minWidth: '100%' }} /* Ensure SVG doesn't shrink */
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 3500; // Slightly faster for that "chase" feel
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const randomIncrement = Math.random() * 2.0; // More erratic progress
        const next = Math.min(prev + increment + randomIncrement, 100);

        if (next >= 100) {
          clearInterval(timer);
          // Short delay at 100% just like when the stars flash before fading
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsComplete(true);
              onLoadingComplete?.();
            }, 500);
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden font-anton"
        >
          {/* Main Content Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            {/* WANTED / ESPERANZA Text */}
            <motion.div
              className="relative"
              animate={{
                scale: isFadingOut ? [1, 1.1, 1] : 1, // Pulse when done
              }}
            >
              <h1
                className="text-6xl md:text-8xl lg:text-9xl text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                style={{
                  fontStyle: 'italic', // Mimic the urgency
                }}
              >
                ESPERANZA
              </h1>
              {/* Glitch/Shadow effect duplication */}
              <span className="absolute top-0 left-1 text-6xl md:text-8xl lg:text-9xl text-blue-500/30 tracking-wider uppercase -z-10 mix-blend-screen animate-pulse" style={{ fontStyle: 'italic' }}>
                ESPERANZA
              </span>
              <span className="absolute top-0 -left-1 text-6xl md:text-8xl lg:text-9xl text-red-500/30 tracking-wider uppercase -z-10 mix-blend-screen animate-pulse" style={{ fontStyle: 'italic', animationDelay: '0.1s' }}>
                ESPERANZA
              </span>
            </motion.div>

            {/* Stars Container */}
            <div className="flex items-center justify-center mt-4">
              {[0, 1, 2, 3, 4].map((index) => {
                // Calculate fill for this specific star
                // Star 0: 0-20%
                // Star 1: 20-40%
                // etc.
                const starStart = index * 20;
                const starEnd = (index + 1) * 20;

                // Calculate percentage of THIS star that is filled (0 to 100)
                let starFill = 0;
                if (progress >= starEnd) {
                  starFill = 100;
                } else if (progress > starStart) {
                  starFill = ((progress - starStart) / 20) * 100;
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Star fillPercentage={starFill} />
                  </motion.div>
                );
              })}
            </div>

            {/* Loading Percentage Text */}
            <motion.p
              className="mt-4 text-white/50 text-xl font-mono tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              LOADING STYLES... {Math.round(progress)}%
            </motion.p>
          </motion.div>

          {/* Vignette Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;