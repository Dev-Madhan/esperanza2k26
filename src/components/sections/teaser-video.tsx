"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const TeaserVideo = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const videoY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
      <section ref={sectionRef} className="bg-[#131313] w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-40 py-8 sm:py-12 md:py-16">
          <div className="mb-4 sm:mb-6 md:mb-10">
            <motion.h3 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
              className="see-you-text font-power font-light text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-white normal-case tracking-normal mb-1 sm:mb-2 md:mb-4 text-center sm:text-left"
            >
              See you at
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="see-you-at-vibrance-effect relative font-power font-black tracking-tight leading-[0.85] text-white text-[12vw] sm:text-[11vw] md:text-[14vw] lg:text-[120px] xl:text-[140px] uppercase text-center sm:text-left"
            >
              VIBRANCE&apos;25
            </motion.h2>
          </div>

        <motion.div 
          style={{ scale: videoScale, y: videoY }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full aspect-video overflow-hidden rounded-sm md:rounded-md shadow-2xl"
        >
          <video
            className="video h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://vitvibrance.com/teaserwebmv25.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeaserVideo;