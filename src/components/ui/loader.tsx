"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const loadingPhrases = [
    "SYSTEM INITIALIZING",
    "LOADING INTERFACE",
    "PREPARING EXPERIENCE",
    "READY TO ENGAGE"
  ];

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  // Loading simulation with increased duration
  useEffect(() => {
    const duration = 4000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const randomIncrement = Math.random() * 2;
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

    // Rotate loading phrases (slower rotation)
    const phraseInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % loadingPhrases.length);
    }, 1200);

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
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,119,198,0.15)_0%,_transparent_70%)]" />
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            
            {/* Floating particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4">
            {/* Main loader with ring animation */}
            <div className="relative mb-8 sm:mb-12">
              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-56"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <motion.div
                  className="absolute inset-0 rounded-full border-t-2 border-b-2 border-transparent"
                  style={{
                    borderTopColor: "#8B5CF6",
                    borderBottomColor: "#3B82F6",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner ring with gradient */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/5" />
                <motion.div
                  className="absolute inset-8 rounded-full border-2 border-transparent"
                  style={{
                    borderImage: "linear-gradient(45deg, #8B5CF6, #3B82F6, #8B5CF6) 1",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Progress indicator */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, #8B5CF6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                    mask: "radial-gradient(transparent 55%, black 56%)",
                    WebkitMask: "radial-gradient(transparent 55%, black 56%)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div
                      className="font-mono text-3xl sm:text-4xl font-bold text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {Math.round(progress)}%
                    </motion.div>
                    <div className="mt-2 font-mono text-xs text-white/60 tracking-widest">
                      LOADING
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbital dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, #8B5CF6, #3B82F6)`,
                    top: `${50 - 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                    left: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md mb-6">
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #8B5CF6, #3B82F6, #8B5CF6)",
                    width: `${progress}%`,
                  }}
                  initial={{ width: 0 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div
                  className="absolute top-0 h-full w-2 bg-white rounded-full"
                  style={{ left: `${progress}%` }}
                  animate={{ boxShadow: ["0 0 0px #fff", "0 0 12px #fff", "0 0 0px #fff"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Loading phrase */}
            <motion.div
              key={currentWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="font-mono text-sm sm:text-base text-white/80 tracking-wider">
                {loadingPhrases[currentWord]}
              </div>
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-white/50 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Tech specs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-mono text-xs text-white/40 tracking-widest text-center"
            >
              <motion.div
                className="mb-1"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                VERSION 2.0.1 | SYSTEM READY
              </motion.div>
            </motion.div>
          </div>

          {/* Corner elements with animation */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((position) => (
            <motion.div
              key={position}
              className={`absolute ${position.split('-')[0]}-6 ${position.split('-')[1]}-6 w-4 h-4`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={`w-full h-full border-${position.split('-')[0]} border-${position.split('-')[1]} border-white/30`} />
            </motion.div>
          ))}

          {/* Bottom signature */}
          <motion.div
            className="absolute bottom-4 text-white/20 text-xs font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.span
              className="inline-block text-white/40"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ◉ 5 Mar 2026
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;