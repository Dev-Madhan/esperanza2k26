"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  


  const socialAssets = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/VibranceVIT/',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/fb-colored_5fd5ff7a-13.svg'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vibrancevitchennai/',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/insta-colored_b7ce9091-14.svg'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@VITChennaic',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/svgs/yt-colored_c7245b5d-15.svg'
    },
    {
      name: 'X',
      url: 'https://x.com/vibrancevit',
      icon: 'https://vitvibrance.com/_next/static/media/X.8c0fc61f.svg'
    }
  ];

  return (
    <footer ref={footerRef} className="relative bg-black text-white py-10 md:py-12 px-4 md:px-10 lg:px-20 overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-[1px] bg-white opacity-20 mb-10 md:mb-16 origin-left relative z-10"
        />

        <motion.div 
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-10 md:mb-16 z-10"
        >
          <h2 className="text-[15vw] md:text-[14vw] lg:text-[160px] font-black tracking-tighter leading-none text-center select-none bg-gradient-to-r from-[#FF5733] via-[#FFC300] to-[#29B463] bg-clip-text text-transparent uppercase font-power">
            Vibrance&apos;25
          </h2>
        </motion.div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-8">
            
            <motion.div 
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-md space-y-4 text-center md:text-left"
            >
              <div className="text-sm md:text-lg lg:text-xl font-light leading-relaxed font-power">
                <p>Vellore Institute of Technology University,</p>
                <p>Vandalur Kelambakkam Road,</p>
                <p>Keelakotaiyur,</p>
                <p>Chennai, Tamil Nadu - 600 127</p>
              </div>
              
              <div className="pt-4 md:pt-8 text-sm md:text-lg font-light font-power">
                <p>Copyright 2025 © VIT Chennai</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center md:items-end w-full md:w-auto space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-4">
                {socialAssets.map((social, index) => (
                  <motion.a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="transition-transform duration-300"
                  >
                    <img 
                      src={social.icon} 
                      alt={`${social.name} logo`} 
                      className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col items-center md:items-end space-y-2 font-power">
                <motion.a 
                  href="mailto:admin.chennai@vit.ac.in" 
                  whileHover={{ x: -5, color: "#29B463" }}
                  className="text-sm md:text-lg lg:text-xl font-light transition-colors"
                >
                  admin.chennai@vit.ac.in
                </motion.a>
                <motion.a 
                  href="tel:+914439931555" 
                  whileHover={{ x: -5, color: "#29B463" }}
                  className="text-sm md:text-lg lg:text-xl font-light transition-colors"
                >
                  +91 44 3993 1555
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-4 right-4 md:right-10 text-[10px] sm:text-xs z-10"
      >
        <motion.a 
          href="#" 
          whileHover={{ y: -3 }}
          className="flex flex-col items-center gap-1 font-power"
        >
          <span>↑</span>
        </motion.a>
      </motion.div>
    </footer>
  );
};


export default Footer;