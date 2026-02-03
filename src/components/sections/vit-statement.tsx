"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const VitStatement = () => {
  const sectionRef = useRef(null);
  const headingsRef = useRef(null);
  const contentRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isHeadingsInView = useInView(headingsRef, { once: true, amount: 0.3 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const contentLines = [
    { 
      parts: [
        { text: "We Push Boundaries", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/right-5.svg" },
        { text: "To Deliver Top-Notch Experiences.", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/analytics-6.svg" }
      ]
    },
    { 
      parts: [
        { text: "Our Diverse Campus", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/layout-7.svg" },
        { text: "Brings The World Together.", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/people-8.svg" }
      ]
    },
    { 
      parts: [
        { text: "Driven By Faculties That Inspires", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/idea-9.svg" },
        { text: "And Empowers.", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/wifi-10.svg" }
      ]
    },
    { 
      parts: [
        { text: "Excellence", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/sparkle-11.svg" },
        { text: "Isn't Just A Goal Here It's How We Live And Grow.", icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/glow-12.svg" }
      ]
    },
  ];

  return (
      <section ref={sectionRef} className="flex w-full flex-col items-center justify-center space-y-4 md:space-y-6 overflow-hidden bg-[#131313] py-16 md:py-20 pt-24 md:pt-32">
        <motion.button 
          initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.05 }}
          className="mt-6 md:mt-10 lg:mt-0 animate-shimmer rounded-full border-2 border-slate-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 py-4 md:px-20 md:py-6 lg:px-40 lg:py-10 font-power text-4xl md:text-6xl lg:text-9xl font-black text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          style={{ letterSpacing: '-0.05em' }}
        >
          VIT
        </motion.button>

        <motion.div 
          ref={headingsRef} 
          style={{ y: headingY }}
          className="headings-container space-y-2 md:space-y-4 px-4 py-8 md:py-12 font-power transition-all duration-700 text-center"
        >
          <motion.p 
            initial={{ opacity: 0, x: -150, filter: "blur(10px)" }}
            animate={isHeadingsInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="heading-1 transform text-xl md:text-4xl lg:text-6xl xl:text-8xl font-black tracking-tight text-[#29B463]"
          >
            A PLACE TO LEARN
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 150, filter: "blur(10px)" }}
            animate={isHeadingsInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="heading-2 transform text-xl md:text-4xl lg:text-6xl xl:text-8xl font-black tracking-tight text-[#FFC300]"
          >
            A CHANCE TO GROW
          </motion.p>
        </motion.div>

        <div ref={contentRef} className="space-y-3 md:space-y-4 px-4 md:px-8 font-power max-w-5xl mx-auto">
          {contentLines.map((line, lineIndex) => (
            <motion.div 
              key={lineIndex}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={isContentInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: lineIndex * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="content-line flex flex-wrap items-center justify-center gap-x-1 gap-y-1 md:gap-y-2 text-xs md:text-lg lg:text-2xl text-center"
            >
              {line.parts.map((part, partIndex) => (
                <div key={partIndex} className="flex items-center gap-1 md:gap-2">
                  <p className="leading-tight">{part.text}</p>
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      alt="icon" 
                      width={40} 
                      height={40} 
                      className="floating-icon cursor-pointer h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" 
                      src={part.icon} 
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>
  );
};

export default VitStatement;