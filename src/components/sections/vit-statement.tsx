"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const VitStatement = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.8 });
  const isCard1InView = useInView(card1Ref, { once: true, amount: 0.3 });
  const isCard2InView = useInView(card2Ref, { once: true, amount: 0.3 });

  // Parallax effects
  const buttonY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [200, -100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050505] py-20 md:py-32">

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Gradient orbs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">

        {/* Vistara Student Club Button with Magnetic Effect */}
        <motion.div
          ref={buttonRef}
          style={{ y: buttonY }}
          className="flex justify-center mb-16 md:mb-24"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={isButtonInView ? {
              opacity: 1,
              scale: 1,
              rotateX: 0,
            } : {}}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              opacity: { duration: 0.6 }
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(138, 43, 226, 0.5)",
            }}
            className="group relative animate-shimmer rounded-full border-2 border-slate-400 bg-[linear-gradient(110deg,#000103,45%,#3B1344,55%,#000103)] bg-[length:200%_100%] px-6 py-3 md:px-16 md:py-6 lg:px-32 lg:py-8 font-bricolage text-2xl md:text-4xl lg:text-6xl font-black text-slate-400 transition-all focus:outline-none"
            style={{
              fontFamily: "var(--font-bricolage)",
              letterSpacing: '-0.05em',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <span className="relative z-10">Vistara Student Club</span>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.button>
        </motion.div>

        {/* Cards Grid with Stagger Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Card 1: The Creative Heartbeat */}
          <motion.div
            ref={card1Ref}
            style={{ y: card1Y, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            animate={isCard1InView ? {
              opacity: 1,
              x: 0,
              rotateY: 0
            } : {}}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: -5,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm px-8 py-10 md:px-12 md:py-16 overflow-hidden transition-all duration-300 group-hover:border-[#29B463]/50 group-hover:shadow-[0_20px_60px_-15px_rgba(41,180,99,0.3)]">

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#29B463]/10 via-transparent to-[#DAF7A5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              {/* Floating particles */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-[#29B463] rounded-full animate-ping" />
              <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-[#DAF7A5] rounded-full animate-ping" style={{ animationDelay: '1s' }} />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#29B463]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.h3
                  className="mb-6 text-3xl md:text-4xl font-bold text-white group-hover:text-[#29B463] transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCard1InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  The Creative Heartbeat
                </motion.h3>

                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCard1InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Vistara is the <span className="text-[#FF5733] font-bold">creative heartbeat</span> of our college. It's a space where talent meets passion and ideas turn into performances. From the stage to the screen, we bring together students who love expressing themselves through art, music, media, and fashion.
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  className="mt-8 h-1 bg-gradient-to-r from-[#29B463] to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isCard1InView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Platform to Evolve */}
          <motion.div
            ref={card2Ref}
            style={{ y: card2Y, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={isCard2InView ? {
              opacity: 1,
              x: 0,
              rotateY: 0
            } : {}}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm px-8 py-10 md:px-12 md:py-16 overflow-hidden transition-all duration-300 group-hover:border-[#FFC300]/50 group-hover:shadow-[0_20px_60px_-15px_rgba(255,195,0,0.3)]">

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-[#FFC300]/10 via-transparent to-[#FF5733]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              {/* Floating particles */}
              <div className="absolute top-20 right-20 w-2 h-2 bg-[#FFC300] rounded-full animate-ping" />
              <div className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-[#FF5733] rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-bl from-[#FFC300]/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.h3
                  className="mb-6 text-3xl md:text-4xl font-bold text-white group-hover:text-[#FFC300] transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCard2InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Platform to Evolve
                </motion.h3>

                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCard2InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  We celebrate creativity in every form — whether it's a <span className="text-[#DAF7A5] font-bold">powerful dance performance</span>, soulful music, stunning designs, or confident stage presence. Vistara is not just a club, it's a platform to showcase, explore, and evolve your talent.
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  className="mt-8 h-1 bg-gradient-to-r from-[#FFC300] to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isCard2InView ? { scaleX: 1 } : {}}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VitStatement;