"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, 
  Trophy, 
  Smile, 
  Gamepad2, 
  DoorOpen, 
  Box, 
  LayoutGrid, 
  Hash, 
  Gem 
} from 'lucide-react';

export default function TeamHero() {
  return (
    <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden mb-12">
      {/* Central Text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-bricolage" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
          The Crew <br />
          <span className="text-white/90">behind the magic</span> <br />
          of Vibrance'25.
        </h1>
      </motion.div>

      {/* Floating Icons */}
      <FloatingIcon 
        Icon={Puzzle} 
        initialX={-300} initialY={-150} 
        delay={0} 
        className="hidden md:block absolute left-[1%] top-[10%] text-white/40" 
      />
      <FloatingIcon 
        Icon={Trophy} 
        initialX={300} initialY={200} 
        delay={1.5} 
        className="hidden md:block absolute right-[1%] bottom-[10%] text-white/40" 
      />
      <FloatingIcon 
        Icon={Smile} 
        initialX={400} initialY={-100} 
        delay={0.5} 
        className="hidden md:block absolute right-[1%] top-[30%] text-white/40" 
      />
      <FloatingIcon 
        Icon={Gamepad2} 
        initialX={-400} initialY={100} 
        delay={2} 
        className="hidden md:block absolute left-[1%] bottom-[30%] text-white/40" 
      />
      <FloatingIcon 
        Icon={DoorOpen} 
        initialX={200} initialY={-200} 
        delay={1} 
        className="hidden md:block absolute right-[3%] top-[5%] text-white/40" 
      />
       <FloatingIcon 
        Icon={Box} 
        initialX={-200} initialY={200} 
        delay={2.5} 
        className="hidden md:block absolute left-[3%] bottom-[5%] text-white/40" 
      />
       <FloatingIcon 
        Icon={LayoutGrid} 
        initialX={-450} initialY={-50} 
        delay={0.8} 
        className="hidden md:block absolute left-[1%] top-[50%] -translate-y-1/2 text-white/40" 
      />
       <FloatingIcon 
        Icon={Hash} 
        initialX={450} initialY={50} 
        delay={1.8} 
        className="hidden md:block absolute right-[1%] bottom-[50%] translate-y-1/2 text-white/40" 
      />
      <FloatingIcon 
        Icon={Gem} 
        initialX={0} initialY={-250} 
        delay={1.2} 
        className="hidden md:block absolute top-[1%] text-white/40" 
      />

    </div>
  );
}

function FloatingIcon({ 
  Icon, 
  initialX, 
  initialY, 
  delay, 
  className 
}: { 
  Icon: React.ElementType; 
  initialX: number; 
  initialY: number; 
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0, rotate: -20 }}
      animate={{ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        rotate: 0,
        transition: { duration: 1.5, delay, ease: "easeOut" }
      }}
      className={className}
    >
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [-5, 5, -5]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 2 
        }}
      >
        <Icon size={48} strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
}
