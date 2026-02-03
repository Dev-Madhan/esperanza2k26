"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const categories = ["All", "Cultural", "Technical", "Sports", "Gaming", "Literary"];

const events = [
  { name: "Battle of Bands", category: "Cultural", color: "#29B463", description: "Rock the stage with your band" },
  { name: "Solo Singing", category: "Cultural", color: "#29B463", description: "Showcase your vocal talent" },
  { name: "Group Dance", category: "Cultural", color: "#29B463", description: "Synchronized dance performances" },
  { name: "Fashion Show", category: "Cultural", color: "#29B463", description: "Walk the ramp in style" },
  { name: "Stand-up Comedy", category: "Cultural", color: "#29B463", description: "Make the audience laugh" },
  { name: "Drama", category: "Cultural", color: "#29B463", description: "Theatrical performances" },
  { name: "Hackathon", category: "Technical", color: "#FFC300", description: "48-hour coding marathon" },
  { name: "Robotics", category: "Technical", color: "#FFC300", description: "Build and compete with robots" },
  { name: "Code Quest", category: "Technical", color: "#FFC300", description: "Competitive programming" },
  { name: "Tech Quiz", category: "Technical", color: "#FFC300", description: "Test your tech knowledge" },
  { name: "Web Development", category: "Technical", color: "#FFC300", description: "Build stunning websites" },
  { name: "Cricket", category: "Sports", color: "#FF5733", description: "T20 tournament" },
  { name: "Football", category: "Sports", color: "#FF5733", description: "5-a-side football" },
  { name: "Basketball", category: "Sports", color: "#FF5733", description: "3v3 basketball" },
  { name: "Badminton", category: "Sports", color: "#FF5733", description: "Singles & doubles" },
  { name: "BGMI", category: "Gaming", color: "#DAF7A5", description: "Battle Royale tournament" },
  { name: "Valorant", category: "Gaming", color: "#DAF7A5", description: "Tactical shooter showdown" },
  { name: "FIFA", category: "Gaming", color: "#DAF7A5", description: "Virtual football" },
  { name: "Debate", category: "Literary", color: "#9B59B6", description: "Argue your point" },
  { name: "Quiz", category: "Literary", color: "#9B59B6", description: "General knowledge quiz" },
  { name: "Creative Writing", category: "Literary", color: "#9B59B6", description: "Express through words" },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef(null);
  const eventsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.1 });

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(e => e.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="grainy-overlay" />
      <Header />
      
      <section className="pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div ref={heroRef} className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-power text-[15vw] md:text-[12vw] lg:text-[180px] font-black tracking-tighter leading-none text-festival-orange"
            >
              EVENTS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto"
            >
              50+ events across cultural, technical, sports & more
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-festival-green text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <div ref={eventsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-[#1a1a1a] rounded-[1.5rem] overflow-hidden border border-white/10 cursor-pointer"
                >
                  <div 
                    className="h-3 w-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="p-6">
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold text-black mb-4"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-festival-green transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-white/60 text-sm">{event.description}</p>
                  </div>
                  <motion.div 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-festival-green">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <motion.a
              href="https://drive.google.com/file/d/1X549H2ozssnNl1uT1oxslaisqy-7ViyL/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-4 rounded-xl bg-festival-orange text-black font-bold text-lg hover:bg-festival-orange/90 transition-colors"
            >
              Download Events Brochure
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}