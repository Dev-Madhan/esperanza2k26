"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import Footer from '@/components/sections/footer';
import Header from '@/components/sections/header';
import TeamHero from '@/components/sections/TeamHero';

// Data structure for three sections
const teamSections = {
  faculty: {
    title: "Faculty Coordinators",
    groups: [
      {
        category: "Core Team",
        members: [
          { name: "Dr. Rajasekaran V", role: "Director, Student Welfare" },
          { name: "Dr. Sathiya Narayanan S", role: "Convenor, Assistant Director" },
          { name: "Dr. Sofana Reka S", role: "Co-Convenor" },
          { name: "Dr. Santosh G", role: "Co-Convenor" },
        ]
      },
      {
        category: "Registration",
        members: [
          { name: "Dr. Bharathi Raja S" },
          { name: "Dr. Christy Jackson J" },
          { name: "Dr. Sandhya P" },
          { name: "Dr. Dhivya M" },
          { name: "Dr. S. Rajkumar" },
          { name: "Dr. B. Jayaram" },
          { name: "Dr. V. Pandiyaraju" },
          { name: "Dr. Balakrishnan R" },
          { name: "Dr. Rahul N" },
          { name: "Dr. Nawin R A" },
          { name: "Dr. Indira B" },
          { name: "Dr. Sivakami R" },
          { name: "Dr. Kanthimathi S" },
          { name: "Mr. P Harris" },
          { name: "Mr. Ashraf K" },
          { name: "Mr. Prabhu S" },
          { name: "Mr. Parthasarathy S" },
        ]
      },
      {
        category: "Website",
        members: [
          { name: "Dr. Premalatha M" },
          { name: "Dr. Thomas Abraham J V" },
          { name: "Dr. Jeetashree Aparajeeta" },
          { name: "Dr. Modigari Narendra" },
        ]
      },
      {
        category: "Budget & Finance",
        members: [
          { name: "Dr. Vasugi K" },
          { name: "Dr. Mohana N" },
          { name: "Dr. Chanthini Baskar" },
        ]
      },
      {
        category: "Sponsorship",
        members: [
          { name: "Dr. Anusha K" },
          { name: "Dr. Muthumanikandan V" },
          { name: "Dr. Padmavathy C" },
          { name: "Dr. Praveen Joe" },
        ]
      },
      {
        category: "Merchandise",
        members: [
          { name: "Dr. Nagajayanthi B" },
          { name: "Dr. Jesica Roshima" },
        ]
      },
      {
        category: "Design & Printing",
        members: [
          { name: "Dr. Dhavakumar P" },
          { name: "Dr. Suganya R" },
        ]
      },
      {
        category: "Pro-Shows",
        members: [
          { name: "Dr. Prakash V" },
          { name: "Dr. Abraham Sudharson Ponraj" },
          { name: "Dr. Arshiya Fathima M.S" },
        ]
      },
      {
        category: "Artists Transportation",
        members: [
          { name: "Dr. Abhishek Kumar Singh" },
          { name: "Dr. Sandosh S" },
          { name: "Dr. Rajesh R" },
        ]
      },
      {
        category: "Artist Guest Care",
        members: [
          { name: "Dr. V Berlin Hency" },
          { name: "Dr. Sanjit Das" },
          { name: "Dr. Sritama Roy" },
        ]
      },
      {
        category: "Marketing",
        members: [
          { name: "Dr. T. Christo Michael" },
          { name: "Dr. Abdul Quadir MD" },
          { name: "Dr. Gopinath Mudhana" },
          { name: "Mr. Naveen" },
        ]
      },
      {
        category: "Ambience",
        members: [
          { name: "Dr. Sriramalaksmi P" },
          { name: "Dr. Sunil Kumar Pradhan" },
        ]
      },
      {
        category: "Stage Arrangements",
        members: [
          { name: "Dr. Anjali Gopakumar" },
          { name: "Dr. Balamurugan P" },
          { name: "Dr. Braveen M" },
          { name: "Dr. Biswajit Jena" },
          { name: "Dr. Kiran Kumar M" },
          { name: "Dr. Chandramauleshwar Roy" },
          { name: "Dr. Soumya Ranjan Mahapatro" },
        ]
      },
      {
        category: "Event Management",
        members: [
          { name: "Dr. Vinitha G" },
          { name: "Dr. Sri Revathi B" },
        ]
      },
      {
        category: "Photography & Videography",
        members: [
          { name: "Dr. Ramesh R" },
          { name: "Dr. Sakthivel V" },
          { name: "Dr. Subbulakshmi P" },
        ]
      },
      {
        category: "Food Stalls",
        members: [
          { name: "Dr. Jagannath M" },
          { name: "Dr. Durgaprasad P" },
          { name: "Dr. Vijayakumar P" },
          { name: "Dr. Rajakumar Arul" },
        ]
      },
      {
        category: "Press & Media",
        members: [
          { name: "Dr. Umadevi S" },
          { name: "Dr. Sivakumar" },
          { name: "Dr. Alli P" },
          { name: "Mr. Yuvaraj M" },
        ]
      },
      {
        category: "Master of Ceremony",
        members: [
          { name: "Dr. Reena Monica" },
          { name: "Dr. Maheswari S" },
          { name: "Dr. M Saranya Nair" },
        ]
      },
      {
        category: "Discipline",
        members: [
          { name: "Dr. Manoj Kumar Rajagopal" },
          { name: "Dr. Rajavenkatesan P R L" },
          { name: "Dr. Velmathi G" },
          { name: "Dr. Balamurugan M S" },
          { name: "Dr. Fateh Veer Singh" },
          { name: "Dr. David Raj M" },
          { name: "Dr. Brintha Therese A" },
          { name: "Dr. Ravi Prakash Dwivedi" },
          { name: "Dr. Tiwari Mahalaxmi Shivshankar" },
          { name: "Dr. Jayanthi R" },
          { name: "Dr. Jani Anbarasi L" },
          { name: "Dr. Rishikeshan C A" },
          { name: "Dr. Ajitha B" },
          { name: "Dr. Manoj Kumar R" },
          { name: "Dr. Gajanand Gupta" },
          { name: "Mr. Praveen Kakada" },
          { name: "Dr. Malay Bhattacharjee" },
          { name: "Dr. Kalaipriyan T" },
          { name: "Dr. Rajivganthi C" },
          { name: "Dr. Sowndarrajan P T" },
          { name: "Dr. Ganesh Nagorao Chilkhe" },
          { name: "Dr. Shalini M G" },
          { name: "Dr. Pulak Konar" },
          { name: "Mr. Abhishek Raj" },
          { name: "Dr. Prema E" },
          { name: "Prof. Santhi Krishna" },
          { name: "Prof. Vijeyendra Kumar M" },
        ]
      },
      {
        category: "Reception",
        members: [
          { name: "Dr. Suganthi K" },
          { name: "Dr. Nathiya N" },
          { name: "Dr. Gugapriya G" },
        ]
      },
      {
        category: "VIP Guest Care",
        members: [
          { name: "Dr. Manivannan A" },
          { name: "Dr. Vijayalakshmi V" },
          { name: "Dr. Vijay Kumar P" },
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
          { name: "Aarav Sharma", role: "President" },
          { name: "Priya Patel", role: "Vice President" },
          { name: "Rohan Kumar", role: "Secretary" },
          { name: "Ananya Singh", role: "Treasurer" },
        ]
      },
      {
        category: "Events",
        members: [
          { name: "Vikram Reddy" },
          { name: "Sneha Desai" },
          { name: "Arjun Mehta" },
          { name: "Divya Iyer" },
          { name: "Karan Malhotra" },
          { name: "Nisha Gupta" },
          { name: "Aditya Rao" },
          { name: "Pooja Nair" },
        ]
      },
      {
        category: "Marketing",
        members: [
          { name: "Rahul Verma" },
          { name: "Meera Krishnan" },
          { name: "Siddharth Jain" },
          { name: "Ishita Kapoor" },
        ]
      },
      {
        category: "Design",
        members: [
          { name: "Tanvi Shah" },
          { name: "Nikhil Agarwal" },
          { name: "Riya Bansal" },
        ]
      },
      {
        category: "Technical",
        members: [
          { name: "Aryan Khanna" },
          { name: "Kavya Menon" },
          { name: "Varun Shetty" },
          { name: "Shreya Pillai" },
        ]
      },
    ]
  },
  website: {
    title: "Website Team",
    groups: [
      {
        category: "Development",
        members: [
          { name: "Dr. Premalatha M", role: "Lead" },
          { name: "Dr. Thomas Abraham J V", role: "Backend Architect" },
          { name: "Dr. Jeetashree Aparajeeta", role: "Frontend Lead" },
          { name: "Dr. Modigari Narendra", role: "DevOps" },
        ]
      },
      {
        category: "Student Developers",
        members: [
          { name: "Arjun Nair" },
          { name: "Priya Menon" },
          { name: "Rohan Patel" },
          { name: "Sneha Reddy" },
          { name: "Vikram Singh" },
        ]
      },
      {
        category: "Design & UX",
        members: [
          { name: "Ananya Kumar" },
          { name: "Karan Shah" },
        ]
      },
    ]
  },
};

type SectionKey = 'faculty' | 'students' | 'website';

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('faculty');
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);



  // Smooth auto-scroll using Framer Motion's useAnimationFrame
  useAnimationFrame((time, delta) => {
    const container = scrollContainerRef.current;
    if (!container || !isAutoScrolling) return;
    
    const speed = 0.08; 
    const moveBy = speed * delta;
    
    if (container.scrollTop + container.clientHeight < container.scrollHeight) {
      container.scrollTop += moveBy;
    } else {
      setIsAutoScrolling(false); 
    }
  });

  // Start scrolling after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Reset scroll to top when section changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeSection]);

  // Handle manual interaction: Pause, then Auto-Resume
  const handleInteraction = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
    }

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);



  const currentSection = teamSections[activeSection];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[80px]" 
          style={{ willChange: 'transform' }} 
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[80px]"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Fixed Header with Section Buttons */}
      <Header isOpaque={true} />


      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          willChange: 'scrollTop'
        }}
      >
        {/* Controls Overlay */}
        <AnimatePresence>
          {!isAutoScrolling && (
             <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => setIsAutoScrolling(true)}
              className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-white text-black font-medium font-poppins rounded-full hover:bg-white/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Resume Scroll
            </motion.button>
          )}
        </AnimatePresence>
        




        <div className="relative z-40 w-full pt-16 pb-8 flex justify-center">
          <div className="max-w-7xl mx-auto px-6">
             <TeamHero />
             
            <div className="flex justify-center gap-3 overflow-x-auto pb-2 no-scrollbar mt-8">
              <SectionButton
                active={activeSection === 'faculty'}
                onClick={() => setActiveSection('faculty')}
              >
                Faculty Coordinators
              </SectionButton>
              <SectionButton
                active={activeSection === 'students'}
                onClick={() => setActiveSection('students')}
              >
                Student Coordinators
              </SectionButton>
              <SectionButton
                active={activeSection === 'website'}
                onClick={() => setActiveSection('website')}
              >
                Website
              </SectionButton>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[50px]" />

        {/* Content */}
        <motion.div
          ref={contentRef}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full relative"
            >

              <div className="px-6 md:px-12 max-w-5xl mx-auto relative">
              
              {/* Team Hero Section */}



              {/* Main Title Removed as per request */}

              


              {/* Credits Roll */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-32 font-bricolage"
              >
                {currentSection.groups.map((group, gIndex) => (
                  <CreditSection key={`${activeSection}-${gIndex}`} group={group} index={gIndex} />
                ))}
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
                <Footer />
              </motion.div>
            </motion.div>
          </AnimatePresence>
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



// Section Button Component
function SectionButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-8 py-3 rounded-full font-medium text-sm md:text-base tracking-wide font-poppins
        transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer
        border-2 outline-none focus:outline-none focus:ring-0 select-none
        ${active 
          ? 'border-white text-white bg-transparent' 
          : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
        }
      `}
    >
      {children}
      
      {active && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 rounded-full border border-white -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

// Credit Section Component (Sticky Header Style)
function CreditSection({ 
  group, 
  index 
}: { 
  group: { category: string; members: Array<{ name: string; role?: string }> };
  index: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative"
    >
      {/* Category Header (No longer sticky) */}
      <div className="relative z-20 py-6 mb-12 mix-blend-difference">
        <h3 className="text-3xl md:text-4xl font-bold text-white/90 uppercase tracking-wider text-center">
          {group.category}
        </h3>
      </div>

      {/* Member Names - Continuous Flow */}
      <div className="space-y-6 md:space-y-8">
        {group.members.map((member, mIndex) => (
          <motion.div
            key={`${member.name}-${mIndex}`}
            className="text-center opacity-90 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05, color: "#fff" }}
          >
            <p className="text-2xl md:text-3xl font-secondary font-semibold text-white/80 tracking-wide" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
              {member.name}
            </p>
            {member.role && (
              <p className="text-base md:text-lg font-secondary text-white/60 mt-1 tracking-wider uppercase" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                {member.role}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}