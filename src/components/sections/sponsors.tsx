"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const marqueeItems = [
  "Opportunity", "Exposure", "Visibility", "Branding", "Engagement", 
  "Collaboration", "Impact", "Influence", "Reach", "Recognition", 
  "Partnership", "Audience", "Connection", "Leadership", "Innovation", 
  "Growth", "Exclusivity", "Prestige", "Momentum", "Trust"
];

const Sponsors = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sponsorsRef = useRef(null);
  
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isSponsorsInView = useInView(sponsorsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sponsorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="my-8 min-h-screen w-full overflow-hidden bg-background" id="sponsors">
      <div className="bg-[#29B463] overflow-hidden whitespace-nowrap py-3">
        <div className="flex animate-marquee">
          <div className="flex items-center shrink-0">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span 
                key={index} 
                className="font-power text-2xl text-black flex items-center"
              >
                {item}
                <span className="mx-4 text-black">•</span>
              </span>
            ))}
          </div>
          <div className="flex items-center shrink-0">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span 
                key={`dup-${index}`} 
                className="font-power text-2xl text-black flex items-center"
              >
                {item}
                <span className="mx-4 text-black">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

        <section ref={sectionRef} className="pb-[1rem] pt-[4rem] md:pt-[7rem] px-4">
          <motion.h2 
            ref={titleRef}
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={isTitleInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="footer-gradient flex justify-center text-center font-power text-2xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 tracking-tighter"
          >
            OUR SPONSORS
          </motion.h2>

          <motion.section 
            style={{ y: sponsorY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex scale-90 flex-col items-center justify-center py-[1rem] font-power text-white"
          >
            <h3 className="text-sm md:text-xl lg:text-3xl font-black tracking-tight mb-4 md:mb-8">TITLE SPONSOR</h3>
          <motion.div 
            className="fade-image px-4 md:px-8 py-4 md:py-8"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/pepsi-4.webp"
              alt="Title Sponsor - Pepsi"
              width={500}
              height={500}
              className="w-32 md:w-48 lg:w-72 object-contain"
            />
          </motion.div>
        </motion.section>

        <section ref={sponsorsRef} className="flex flex-col justify-around lg:flex-row lg:gap-8 mt-8 md:mt-12">
          {[
            { title: "MEDIA SPONSOR", img: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/thehindudark-5.webp", alt: "The Hindu" },
            { title: "TELEVISION PARTNER", img: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/news7-6.webp", alt: "News 7" },
            { title: "RADIO PARTNER", img: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/hellofm-7.webp", alt: "Hello FM" },
          ].map((sponsor, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              animate={isSponsorsInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center justify-center pb-6 md:pb-8 font-power text-white"
            >
              <h4 className="pb-2 md:pb-4 text-xs md:text-lg lg:text-2xl font-black tracking-tight">{sponsor.title}</h4>
              <motion.div 
                className="fade-image h-28 md:h-40 lg:h-52 px-4 md:px-8 py-4 md:py-6 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={sponsor.img}
                  alt={sponsor.alt}
                  width={500}
                  height={500}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            </motion.section>
          ))}
        </section>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={isSponsorsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center justify-center pb-10 md:pb-16 font-power text-white"
        >
          <h4 className="text-xs md:text-lg lg:text-2xl font-black tracking-tight opacity-80">OTHER SPONSORS</h4>
        </motion.section>
      </section>
    </div>
  );
};

export default Sponsors;