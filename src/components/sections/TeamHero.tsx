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
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-bricolage bg-clip-text text-transparent" 
          style={{ 
            backgroundImage: 'linear-gradient(180deg, #B1BCEA 0%, #133EE8 50%, #063188 75%, #0F1C37 100%)',
            fontFamily: '"Bricolage Grotesque", sans-serif' 
          }}
        >
          The minds and muscle <br />
          <span>behind</span> <br />
          Esperanza’26
        </h1>
      </motion.div>

      {/* Floating Icons - Circular Arrangement matching reference */}
      
      {/* Top Left - Puzzle */}
      <FloatingIcon 
        Icon={Puzzle} 
        initialX={-100} initialY={-100} 
        delay={0} 
        className="hidden md:block absolute left-[20%] top-[15%] text-white/40" 
      />

      {/* Top Left-Center - Gamepad */}
      <FloatingIcon 
        Icon={Gamepad2} 
        initialX={-50} initialY={-120} 
        delay={1.2} 
        className="hidden md:block absolute left-[35%] top-[5%] text-white/40" 
      />

      {/* Top Right-Center - Hash */}
      <FloatingIcon 
        Icon={Hash} 
        initialX={50} initialY={-120} 
        delay={0.8} 
        className="hidden md:block absolute right-[35%] top-[5%] text-white/40" 
      />

      {/* Top Right - Smile */}
      <FloatingIcon 
        Icon={Smile} 
        initialX={100} initialY={-100} 
        delay={0.5} 
        className="hidden md:block absolute right-[20%] top-[15%] text-white/40" 
      />
      
      {/* Right - Gem */}
      <FloatingIcon 
        Icon={LayoutGrid} 
        initialX={150} initialY={0} 
        delay={1} 
        className="hidden md:block absolute right-[10%] top-1/2 -translate-y-1/2 text-white/40" 
      />
      
       {/* Bottom Right - Door/Box */}
       <FloatingIcon 
        Icon={Box} 
        initialX={100} initialY={100} 
        delay={1.5} 
        className="hidden md:block absolute right-[20%] bottom-[15%] text-white/40" 
      />

      {/* Bottom Center - Trophy? No, looks like stairs/gem in ref image at bottom, let's use Gem */}
      <FloatingIcon 
        Icon={Gem} 
        initialX={0} initialY={150} 
        delay={2} 
        className="hidden md:block absolute bottom-[10%] left-[55%] -translate-x-1/2 text-white/40" 
      />

       {/* Bottom Left - Trophy */}
       <FloatingIcon 
        Icon={Trophy} 
        initialX={-100} initialY={100} 
        delay={2.5} 
        className="hidden md:block absolute left-[20%] bottom-[15%] text-white/40" 
      />

      {/* Left - DoorOpen/Arrow thing */}
      <FloatingIcon 
        Icon={DoorOpen} 
        initialX={-150} initialY={0} 
        delay={3} 
        className="hidden md:block absolute left-[10%] top-1/2 -translate-y-1/2 text-white/40" 
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
