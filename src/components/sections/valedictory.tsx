"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Valedictory = () => {
  const sectionRef = useRef(null);
  const blastRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isBlastInView = useInView(blastRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const blastArtists = [
    { name: 'Lost Stories', color: '#29B463', asset: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/loststories-23.webp' },
    { name: 'DJ Danika', color: '#DAF7A5', asset: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/danika-24.webp' },
    { name: 'Andrea Jeremiah', color: '#FFC300', asset: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/andrea-25.webp' },
    { name: 'Jonita Gandhi', color: '#FF5733', asset: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/jonita-26.webp' },
    { name: 'Shreya Ghoshal', color: '#DAF7A5', asset: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/shreya-27.webp' },
    { name: 'Shraey Khanna', color: '#FF5733', asset: null },
  ];

  return (
      <section ref={sectionRef} className="bg-background text-white py-16 px-4 md:py-20 md:px-10 lg:px-20 font-display">
        <div className="relative mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center md:justify-start gap-2 mb-2"
          >
            <motion.svg 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              width="18" height="18" viewBox="0 0 24 24" className="text-festival-orange md:w-6 md:h-6"
            >
              <path fill="currentColor" d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
            </motion.svg>
            <h2 className="text-secondary text-3xl md:text-5xl lg:text-[64px] font-black tracking-tighter uppercase leading-none">
              Valedictory
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
            <motion.div 
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-full md:w-1/3"
            >
              <div className="relative aspect-[3/4] w-full max-w-[240px] md:max-w-[320px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl mx-auto md:mx-0">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/NagaChai_e032696b-opt-750-22.webp"
                alt="Naga Chaitanya"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
              style={{ y: textY }}
              className="w-full md:w-2/3 space-y-4"
            >
              <motion.div 
                initial={{ opacity: 0, x: 80, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-1"
              >
                <p className="text-festival-orange text-base md:text-lg lg:text-2xl font-bold text-center md:text-right">Guest of Honour</p>
                <h3 className="text-festival-green text-2xl md:text-5xl lg:text-[80px] font-black tracking-tighter text-center md:text-right uppercase leading-none">
                  Naga Chaitanya
                </h3>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-sm md:text-lg lg:text-2xl font-light leading-snug text-center md:text-right max-w-2xl mx-auto md:ml-auto md:mr-0 opacity-90"
              >
              Acclaimed Indian actor known for his impactful performances in Telugu cinema. Celebrated for his versatility and dedication to the craft, he has won hearts with his memorable roles and continues to inspire audiences with his cinematic journey.
            </motion.p>
          </motion.div>
        </div>
      </div>

        <div ref={blastRef} className="mt-20 md:mt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={isBlastInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-8 md:mb-12"
          >
            <h2 className="text-festival-green text-4xl md:text-6xl lg:text-[100px] font-black tracking-tighter uppercase leading-none">
              Blast
            </h2>
            <motion.svg 
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              width="24" height="24" viewBox="0 0 24 24" className="text-festival-green opacity-50 md:w-10 md:h-10"
            >
              <path fill="currentColor" d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
            </motion.svg>
          </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {blastArtists.map((artist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(10px)" }}
              animate={isBlastInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group aspect-[4/5] rounded-[1rem] md:rounded-[1.25rem] overflow-hidden cursor-pointer"
              style={{ backgroundColor: artist.color }}
            >
              <div className="absolute inset-0 p-2 md:p-3">
                 <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden relative">
                    {artist.asset ? (
                        <Image 
                            src={artist.asset} 
                            alt={artist.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-black/10" />
                    )}
                 </div>
              </div>
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center px-2">
                <span className="text-black font-black text-[10px] md:text-sm lg:text-base uppercase tracking-tight">
                  {artist.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isBlastInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 md:mt-20 flex justify-center"
        >
          <motion.a 
            href="/gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-2 md:py-3 rounded-lg md:rounded-xl border border-white/30 text-white text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
          >
            View Gallery
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Valedictory;