"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const artists = [
  { name: 'Armaan Malik', color: 'bg-[#29B463]' },
  { name: 'Shakthisree Gopalan', color: 'bg-[#DAF7A5]' },
  { name: 'Devi Sri Prasad', color: 'bg-[#FFC300]' },
  { name: 'Julia Bliss', color: 'bg-[#FF5733]' },
  { name: 'Aastha Gill', color: 'bg-[#DAF7A5]' },
  { name: 'Progressive Brothers', color: 'bg-[#FF5733]' },
];

const Inauguration = () => {
  const sectionRef = useRef(null);
  const artistsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isArtistsInView = useInView(artistsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
      <section ref={sectionRef} className="bg-background py-16 px-4 md:py-20 md:px-10 lg:px-20 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12">
            <motion.div 
              style={{ y: textY }}
              className="flex-1"
            >
              <motion.div 
                initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-center lg:justify-start gap-2 md:gap-4 mb-2"
              >
                <h2 className="font-power text-3xl md:text-5xl lg:text-7xl xl:text-[96px] text-festival-yellow leading-none tracking-tight text-center lg:text-left">
                  INAUGURATION
                </h2>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex gap-1 text-festival-orange"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </motion.div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-festival-orange font-bold uppercase tracking-wider mb-4 text-center lg:text-left"
            >
              Chief Guest
            </motion.p>
            
            <motion.h3 
              initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-power text-2xl md:text-4xl lg:text-6xl text-festival-green leading-none mb-6 md:mb-8 text-center lg:text-left"
            >
              Rahul Chahar
            </motion.h3>

            <motion.div 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <p className="text-white/90 text-sm md:text-lg lg:text-2xl font-light leading-relaxed text-center lg:text-left">
                Renowned Indian cricketer and leg-spin bowler, known for his exceptional performances in domestic and international cricket. A key player in the Indian Premier League (IPL), celebrated for his skill, consistency, and contributions to the sport.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5, filter: "blur(20px)" }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] lg:w-[350px] aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl mx-auto lg:mx-0"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/RahulChahar_ac750ab2-opt-1080-15.webp"
              alt="Rahul Chahar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 350px"
              priority
            />
          </motion.div>
        </div>

        <div ref={artistsRef} className="mt-20 md:mt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={isArtistsInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-3 md:gap-6 mb-10 md:mb-16"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-festival-orange"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-8 md:h-8">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
            <h2 className="font-power text-4xl md:text-6xl lg:text-8xl xl:text-[120px] text-festival-yellow text-center leading-none tracking-tighter">
              ARTISTS
            </h2>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-festival-orange"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-8 md:h-8">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="relative">
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
              {artists.map((artist, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)" }}
                  animate={isArtistsInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`flex-shrink-0 w-40 md:w-56 lg:w-72 xl:w-80 h-56 md:h-80 lg:h-96 rounded-[1rem] md:rounded-[1.5rem] ${artist.color} p-4 md:p-6 flex flex-col justify-end cursor-pointer shadow-lg`}
                >
                  <p className="text-black font-black text-sm md:text-lg lg:text-2xl uppercase tracking-tighter leading-none text-center">
                    {artist.name}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inauguration;