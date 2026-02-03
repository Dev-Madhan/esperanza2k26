"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const IntroTextSection: React.FC = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const capsulesRef = useRef(null);
  
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isCapsulesInView = useInView(capsulesRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const capsules = [
    { text: "Four Days.", color: "#29B463", textColor: "white", rotation: -15, top: "-1rem", right: "2rem" },
    { text: "Stars", color: "#DAF7A5", textColor: "black", rotation: 10, top: "3.5rem", right: "0" },
    { text: "Merch", color: "#FF5733", textColor: "white", rotation: -8, top: "7rem", right: "3rem" },
    { text: "Events", color: "#FFC300", textColor: "black", rotation: 5, top: "11rem", right: "1rem" },
  ];

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-[#131313] py-[5rem]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:flex-col sm:justify-center sm:gap-16 sm:px-4 md:flex-row md:px-16 lg:px-[10rem]">
        
<motion.div 
            ref={textRef} 
            style={{ y: textY }}
            className="w-full font-display leading-[1.3] text-white text-center sm:text-left md:w-[70%]"
          >
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-2 text-2xl font-bold tracking-tight text-[#29B463] sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            Four Incredible Days.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-2 text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            <span className="inline-block font-bold text-[#DAF7A5]">Shimmering Stars</span>
            {" "}Lighting Up Every Corner.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-2 text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            <span className="inline-block font-bold text-[#FFC300]">Epic Events</span>
            {" "}That Leave You Breathless.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-2 text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            <span className="inline-block font-bold text-[#FF5733]">Celebrities</span>
            {" "}Bringing Charisma And Flair.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-2 text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            This is More Than An Experience.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isTextInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:text-[2.7rem]"
          >
            A Wave Of&nbsp;
            <span className="inline-block font-bold text-[#29B463]">Pure,&nbsp;</span>
            <span className="inline-block font-bold text-[#FFC300]">Unfiltered</span>
            {" "}
            <span className="inline-block font-bold text-[#FF5733]">Passion.</span>
          </motion.div>
        </motion.div>

        <div ref={capsulesRef} className="relative mt-20 flex h-[300px] w-full items-center justify-center sm:mt-16 sm:h-[250px] md:mt-0 md:w-[30%]">
          {capsules.map((capsule, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={isCapsulesInView ? { 
                opacity: 1, 
                scale: 1, 
                rotate: capsule.rotation,
              } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ scale: 1.1, rotate: capsule.rotation + 5 }}
              className="absolute flex items-center justify-center rounded-full border-4 border-white px-6 py-2 text-center font-display text-[1.5rem] font-bold shadow-2xl cursor-pointer sm:px-8 sm:text-[1.8rem] lg:px-10 lg:text-[2.2rem] animate-float"
              style={{ 
                backgroundColor: capsule.color, 
                color: capsule.textColor,
                zIndex: 40 - index * 10,
                top: capsule.top,
                right: capsule.right,
                animationDelay: `${index * 0.5}s`
              }}
            >
              {capsule.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroTextSection;