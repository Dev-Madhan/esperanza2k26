"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import Footer from '@/components/sections/footer';
import Header from '@/components/sections/header';
import MobileNav from '@/components/sections/MobileNav';
import TeamHero from '@/components/sections/TeamHero';
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


// Data structure for three sections
const teamSections = {
  faculty: {
    title: "Faculty Coordinators",
    groups: [
      {
        category: "",
        members: [
          { name: "Dr. Muthukumar"},
          { name: "Dr. Selvam"},
          { name: "Dr. Balaji"},
        ]
      },
    ]
  },
  students: {
    title: "Student Coordinators",
    groups: [
      {
        category: "Core Team",
        members: [
          { name: "Ganesh K", role: "President" },
          { name: "Arshandhan S U", role: "General Secretary" },
        ]
      },
      {
        category: "Music Club Secretary",
        members: [
          { name: "Sruthika K" },
          { name: "Madhumitha B" },
        ]
      },
      {
        category: "Dance Club Secretary",
        members: [
          { name: "Jervin J V" },
          { name: "Srimathi S" },
        ]
      },
      {
        category: "Tech Club Secretary",
        members: [
          { name: "Kathir Vel S" },
          { name: "Yuvashree M" },
        ]
      },
      {
        category: "Fashion Club Secretary",
        members: [
          { name: "Silvya E" },
        ]
      },
      {
        category: "Media Club Secretary",
        members: [
          { name: "Sai Santhosh P" },
        ]
      },
      {
        category: "Comparing Club Secretary",
        members: [
          { name: "Shivani A" },
        ]
      },
    ]
  },
  vistara: {
    title: "Vistara Club Members",
    groups: [
      {
        category: "Dance Club",
        members: [
          { name: "Jervin J.V", role: "Secretary" },
          { name: "Srimathi S", role: "Secretary" },
          { name: "S.Mohana Priya", role: "BME (Final Year)" },
          { name: "Mohana Priya", role: "BME (Final Year)" },
          { name: "M.Aishwarya", role: "CSBS (Final Year)" },
          { name: "Sindhuja.S", role: "AIDS (3rd Year)" },
          { name: "Manikandan.K", role: "AIDS (3rd Year)" },
          { name: "Hariharan.S", role: "AIDS (3rd Year)" },
          { name: "Rakkesh.S", role: "AIDS (3rd Year)" },
          { name: "Yashwanth.S", role: "IT (3rd Year)" },
          { name: "Manoj.K.N", role: "IT (3rd Year)" },
          { name: "Divya sri", role: "CSBS (3rd Year)" },
          { name: "Amirdhavarshini.S", role: "AIDS (2nd Year)" },
          { name: "Santhosh.R", role: "AIDS (2nd Year)" },
          { name: "Abinaya.J", role: "CSE (2nd Year)" },
          { name: "Bhavana.CP", role: "CSE (2nd Year)" },
          { name: "Sangilidharan", role: "CSBS (2nd Year)" },
          { name: "NithyaShri.K.M", role: "CSBS (2nd Year)" },
          { name: "Dharun N", role: "ECE (2nd Year)" },
          { name: "Mrinalini", role: "ECE (2nd Year)" },
          { name: "Saiprithinga U.S", role: "ECE (2nd Year)" },
          { name: "Kaviya", role: "CSC-CS (2nd Year)" },
          { name: "D.Pushpalatha", role: "BME (1st Year)" },
          { name: "Kavinayaa R", role: "CSBS (1st Year)" },
          { name: "Lakshitha P", role: "CSBS (1st Year)" },
          { name: "Swetha.S", role: "CSE (1st Year)" },
          { name: "Karnika.B", role: "CSE (1st Year)" },
          { name: "Ramya. B", role: "CSE (1st Year)" },
          { name: "Prarthana shree.G", role: "EEE (1st Year)" },
          { name: "Hari prasad.S.A", role: "EEE (1st Year)" },
          { name: "Dharani. I", role: "IT (1st Year)" },
          { name: "Vishnuvaradhan", role: "IT (1st Year)" },
          { name: "Poojith.P", role: "AIDS (1st Year)" },
          { name: "Nishanth.M", role: "AIDS (1st Year)" },

        ]
      },
      {
        category: "Music Club",
        members: [
          { name: "Sruthika K", role: "Secretary" },
          { name: "Madhumitha B", role: "Secretary" },
          { name: "Akash Kumar", role: "AIDS (Final Year)" },
          { name: "Sashangan K.M", role: "AIDS (Final Year)" },
          { name: "Gopal V N", role: "AIDS (Final Year)" },
          { name: "Darshan", role: "AIDS (Final Year)" },
          { name: "Mahalakshmi", role: "BME (Final Year)" },
          { name: "Srinath", role: "ECE (3rd Year)" },
          { name: "Akeesh", role: "AIDS (3rd Year)" },
          { name: "Sandeep", role: "CSBS (3rd Year)" },
          { name: "Persiyal", role: "IT (3rd Year)" },
          { name: "Guganesh", role: "MECH (3rd Year)" },
          { name: "Rohan", role: "ECE (3rd Year)" },
          { name: "Benito Kingsley R", role: "AIDS (1st Year)" },
          { name: "Sanjith Suvan R", role: "CSE (1st Year)" },
          { name: "Sai Manasa C", role: "CSBS (1st Year)" },
          { name: "A Sherley", role: "AIDS (1st Year)" },
          { name: "Dhanush Kumar R", role: "ECE (1st Year)" },
          { name: "Gracy T", role: "ECE (1st Year)" },
        ]
      },
      {
        category: "Comparing Club",
        members: [
          { name: "Thilakavathy P", role: "Secretary" },
          { name: "Shivani A", role: "Secretary" },
          { name: "Meshach Sanderson C", role: "BME (3rd Year)" },
          { name: "Alvin", role: "ECE (3rd Year)" },
          { name: "Mudhra", role: "CSE (1st Year)" },
        ]
      },
      {
        category: "Media Club",
        members: [
          { name: "Sai Santhosh P", role: "Secretary" },
          { name: "Ashvinth", role: "CSE (3rd Year)" },
          { name: "Charukesh", role: "IT (3rd Year)" },
          { name: "Kavin Prasath G", role: "ECE (3rd Year)" },
          { name: "Amith Y", role: "CSE (3rd Year)" },
          { name: "Kabilan S", role: "AIDS (3rd Year)" },
          { name: "Harini R", role: "IT (3rd Year)" },
          { name: "Monish", role: "MECH (3rd Year)" },
          { name: "Adhitya", role: "MECH (3rd Year)" },
          { name: "Kebin", role: "MECH (3rd Year)" },
          { name: "Abishek Sidharth", role: "MECH (3rd Year)" },
          { name: "Akash B", role: "AIDS (2nd Year)" },
          { name: "Vijaya Shanthosh", role: "ECE (2nd Year)" },
          { name: "Harini Priya R", role: "CSBS (2nd Year)" },
          { name: "Dinesh V", role: "IT (2nd Year)" },
        ]
      },
      {
        category: "Tech Club",
        members: [
          { name: "Yuvashree M", role: "Secretary" },
          { name: "Kathirvel S", role: "Secretary" },
          { name: "Santhosh", role: "CSBS (Final Year)" },
          { name: "Jeevith K", role: "CSBS (3rd Year)" },
          { name: "Madhan Kumar V", role: "CSBS (3rd Year)" },
          { name: "Aadhira D", role: "CSE (3rd Year)" },
          { name: "Ranjith", role: "AIDS (3rd Year)" },
          { name: "Jerlin Jaspher", role: "CSE (3rd Year)" },
          { name: "Nandha Kumar V", role: "CSBS (3rd Year)" },
          { name: "Chezhiyan", role: "AIDS (3rd Year)" },
          { name: "Akash", role: "AIDS (2nd Year)" },
          { name: "Arjun", role: "ECE (2nd Year)" },
        ]
      },
      {
        category: "Fashion Club",
        members: [
          { name: "Silvya", role: "Secretary" },
          { name: "Yuvan Raj", role: "CSBS (3rd Year)" },
          { name: "Raheem Meeran Mohideen M", role: "CSBS (3rd Year)" },
          { name: "Nivash R", role: "ECE (3rd Year)" },
          { name: "G Akash Kumar", role: "CSBS (3rd Year)" },
          { name: "Sachin N", role: "CSE (3rd Year)" },
          { name: "Arsath Ahamed S", role: "AIDS (2nd Year)" },
          { name: "Kamalesh R", role: "AIDS (2nd Year)" },
          { name: "Sanjay", role: "CSBS (2nd Year)" },
          { name: "Sentamizh", role: "CSE (1st Year)" },
        ]
      },
    ]
  },
};

type SectionKey = 'faculty' | 'students' | 'vistara';

export default function TeamPage() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);



  // Smooth auto-scroll using Framer Motion's useAnimationFrame
  useAnimationFrame((time, delta) => {
    const container = scrollContainerRef.current;
    if (!container || !isAutoScrolling) return;

    const speed = 0.15;
    const moveBy = speed * delta;

    if (container.scrollTop + container.clientHeight < container.scrollHeight) {
      container.scrollTop += moveBy;
    } else {
      setIsAutoScrolling(false);
    }
  });

  // Reset scroll to top when section changes is no longer needed


  // Handle manual interaction: Pause, then Auto-Resume
  const handleInteraction = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
    }

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      // Only resume if not at bottom
      if (!isAtBottom) {
        setIsAutoScrolling(true);
      }
    }, 2000);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Check if we are near the bottom (within 100px)
    const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
    setIsAtBottom(atBottom);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);



  // Start scrolling after delay (once on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []); // Run only once

  const sections: SectionKey[] = ['faculty', 'students', 'vistara'];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden caret-transparent">
      <MobileNav />
      <Header />
      {/* Background gradients removed for complete black background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
      </div>





      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        onScroll={handleScroll}
        className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          willChange: 'scrollTop'
        }}
      >
        {/* Controls Overlay */}
        <AnimatePresence>
          {!isAutoScrolling && !isAtBottom && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => setIsAutoScrolling(true)}
              className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black font-medium font-poppins rounded-full hover:bg-white/90 transition-colors shadow-lg flex items-center gap-2 text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Resume Scroll
            </motion.button>
          )}
        </AnimatePresence>

        <div className="relative z-40 w-full pt-16 pb-8 flex justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <TeamHero />


          </div>
        </div>

        {/* Spacer */}
        <div className="h-[30px] md:h-[50px]" />

        {/* Content */}
        <motion.div
          ref={contentRef}
          className="relative"
        >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full relative"
            >

              <div className="px-4 md:px-12 max-w-5xl mx-auto relative pb-32 md:pb-48">

                 {/* Credits Roll */}
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="space-y-16 md:space-y-24 font-bricolage"
                 >
                  {sections.map((sectionKey, sIndex) => {
                    const sectionData = teamSections[sectionKey];
                    return (

                        <div key={sectionKey} className="relative">
                             {/* Main Section Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative z-20 py-6 mb-12 md:mb-16"
                                >
                                    <h2 className="text-3xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 uppercase tracking-widest font-bricolage">
                                        {sectionData.title}
                                    </h2>
                                </motion.div>

                             <div className="space-y-16 md:space-y-24">
                                {sectionData.groups.map((group, gIndex) => (
                                    <CreditSection 
                                        key={`${sectionKey}-${gIndex}`} 
                                        group={group} 
                                        // Use a calculated index to keep alternating sides somewhat consistent across sections
                                        index={(sIndex * 10) + gIndex} 
                                    />
                                ))}
                             </div>
                        </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Attached Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <Footer onBackToTop={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} />
              </motion.div>
            </motion.div>
        </motion.div>


      </div>

      {/* Grainy overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}





// CreditSection Component (Sticky Header Style)
function CreditSection({
  group,
  index
}: {
  group: { category: string; members: Array<{ name: string; role?: string }> };
  index: number;
}) {
  const icons = [Puzzle, Trophy, Smile, Gamepad2, DoorOpen, Box, LayoutGrid, Hash, Gem];
  const Icon = icons[index % icons.length];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative"
    >
      {/* Background Floating Icon for this section */}
      <FloatingIcon
        Icon={Icon}
        initialX={isLeft ? -200 : 200}
        initialY={0}
        delay={0.2}
        className={`absolute ${isLeft ? 'left-[-5%] md:left-[-10%]' : 'right-[-5%] md:right-[-10%]'} top-0 text-white/40 md:text-white/60 -z-10`}
        size={32}
      />
      {/* Category Header (No longer sticky) */}
      {group.category && (
        <div className="relative z-20 mb-6 md:mb-10 mix-blend-difference">
            <h3 className="text-xl md:text-3xl font-bold text-white/90 uppercase tracking-wider text-center">
            {group.category}
            </h3>
        </div>
      )}

      {/* Member Names - Continuous Flow */}
      <div className="space-y-4 md:space-y-6">
        {group.members.map((member, mIndex) => (
          <motion.div
            key={`${member.name}-${mIndex}`}
            className="text-center opacity-90 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05, color: "#fff" }}
          >
            <p className="text-xl md:text-3xl font-secondary font-semibold text-white/80 tracking-wide" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              {member.name}
            </p>
            {member.role && (
              <p className="text-sm md:text-lg font-secondary text-white/60 mt-1 tracking-wider uppercase" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                {member.role}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FloatingIcon({
  Icon,
  initialX,
  initialY,
  delay,
  className,
  size = 96
}: {
  Icon: React.ElementType;
  initialX: number;
  initialY: number;
  delay: number;
  className?: string;
  size?: number;
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
        <Icon size={size} strokeWidth={1} className="w-12 h-12 md:w-24 md:h-24 opacity-50 md:opacity-100" />
      </motion.div>
    </motion.div>
  );
}

