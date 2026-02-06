"use client";

import { Star, Music, Film, Camera, Mic, Mic2, ArrowRight, Download, Phone } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "@/components/sections/header";
import MobileNav from "@/components/sections/MobileNav";
import Footer from "@/components/sections/footer";
import CardFlip from "@/components/kokonutui/card-flip";

/* ----------------------------------
      EVENT CARDS (7 EVENTS)
---------------------------------- */
const eventCards = [
  {
    id: 1,
    title: "ANYBODY CAN DANCE (Group)",
    category: "Group Dance",
    img: "/images/events/group-dance.jpg",
    videoSrc: "/stock-videos/Dance.mp4",
    desc: "Group dance showcasing coordination, expressions & energy!",
    rules: [
      "Team size: 3–12 participants.",
      "Time limit: 3–5 minutes.",
      "Use only non-copyrighted music.",
      "Props allowed.",
      "Judging based on coordination & energy.",
    ],
    contact: "JERVIN J.V- 7418907836",
  },
  {
    id: 2,
    title: "ANYBODY CAN DANCE (Solo)",
    category: "Solo Dance",
    img: "/images/events/solo-dance.jpg",
    videoSrc: "/stock-videos/Solo-Dance.mp4",
    desc: "Join our dance event – rhythm, creativity, and energy!",
    rules: [
      "Perform solo with original choreography.",
      "Performance duration: 2–3 minutes.",
      "Props allowed but must be self-managed.",
      "Costumes must be appropriate.",
      "Report 30 minutes before your slot.",
    ],
    contact: "JERVIN J.V- 7418907836",
  },
  {
    id: 3,
    title: "VOICE QUEST (Group)",
    category: "Group Singing",
    img: "/images/events/group-singing.jpg",
    videoSrc: "/stock-videos/Group-Singing.mp4",
    desc: "Singing event uniting students through music!",
    rules: [
      "Team size: 3–10 participants.",
      "Time limit: 4 minutes.",
      "Live instruments allowed.",
      "No offensive lyrics.",
      "Judging based on harmony & coordination.",
    ],
    contact: "DARSHAN S - 8637466016",
  },
  {
    id: 4,
    title: "VOICE QUEST (Solo)",
    category: "Solo Singing",
    img: "/images/events/solo-singing.jpg",
    videoSrc: "/stock-videos/Singing.mp4",
    desc: "Showcase your vocal talent in this solo singing competition!",
    rules: [
      "Solo performance only.",
      "Maximum time: 3 minutes.",
      "Karaoke track must be submitted beforehand.",
      "Offensive lyrics prohibited.",
      "Judging based on pitch & clarity.",
    ],
    contact: "DARSHAN S - 8637466016",
  },
  {
    id: 5,
    title: "LENS LEGACY",
    category: "Film",
    img: "/images/events/shortfilm.jpg",
    videoSrc: "/stock-videos/videography.mp4",
    desc: "Short-film contest for creative storytellers!",
    rules: [
      "Submit individually or in teams of 1–4.",
      "Film duration: 5–7 minutes including credits.",
      "Background score allowed; songs with lyrics prohibited.",
      "Film must be original & copyright-free.",
      "Upload to Drive and bring a pendrive copy.",
    ],
    contact: "SAI SANTHOSH P - 8072152950",
  },
  {
    id: 6,
    title: "FRAME BY FRAME",
    category: "Photography",
    img: "/images/events/photography.jpg",
    videoSrc: "/stock-videos/photography.mp4",
    desc: "Showcase your talent at our photography contest!",
    rules: [
      "Theme will be revealed on-spot.",
      "Only DSLR or mobile allowed.",
      "No AI-generated photos.",
      "Submit 3 best shots.",
      "Basic editing allowed.",
    ],
    contact: "SAI SANTHOSH P - 8072152950",
  },
  {
    id: 7,
    title: "The Walk of Fame",
    category: "Ramp Walk",
    img: "/images/events/rap.jpg",
    videoSrc: "/stock-videos/Rampwalk.mp4",
    desc: "Strut your style on the ramp in this team fashion showcase!",
    rules: [
      "Team: 5 members. Time: 3-5 mins.",
      "Theme: Workplace attire. Creative & decent.",
      "Submit background music in advance.",
      "Teams must justify concept to judges.",
    ],
    contact: "Silviya E - 9361847450",
  },
];

interface Event {
  id: number;
  title: string;
  category: string;
  img: string;
  desc: string;
  rules: string[];
  contact: string;
  videoSrc?: string;
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <MobileNav />
      <Header />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="pt-24 pb-8 px-4 md:px-8">
        <div ref={heroRef} className="mx-auto max-w-7xl text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[12vw] lg:text-[180px] font-black tracking-tight leading-none text-center select-none bg-gradient-to-b from-white via-[#C0C0C0] to-[#505050] bg-clip-text text-transparent mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] uppercase font-bricolage px-4"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            EVENTS
          </motion.h1>

          <p className="mt-6 text-xl md:text-2xl text-white/80 font-light">          </p>
        </div>
      </section>

      {/* ---------------- EVENT CARDS ---------------- */}
      <section
        className="px-4 md:px-8 pb-12 font-bricolage"
        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {eventCards.map((event) => (
            <div key={event.id} className="flex justify-center">
              <CardFlip
                title={event.title}
                subtitle={event.category}
                description={event.desc}
                features={event.rules.slice(0, 4)}
                actionLabel="View More"
                onAction={() => setSelectedEvent(event)}
                videoSrc={event.videoSrc}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DOWNLOAD BROCHURE BUTTON ---------------- */}
      <div className="text-center pb-20 pt-10">
        <div className="relative inline-block group">
          {/* Main Button Container */}
          <a
            href="https://drive.google.com/file/d/1X549H2ozssnNl1uT1oxslaisqy-7ViyL/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 py-3 md:px-12 md:py-5 rounded-full block overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Animated Gradient Border */}
            <span className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-white/50 to-zinc-700 p-[1px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <span className="absolute inset-0 bg-black rounded-full" />
            </span>

            {/* Inner Glass Background */}
            <span className="absolute inset-[1px] rounded-full bg-zinc-950/90 backdrop-blur-xl group-hover:bg-zinc-900/90 transition-colors duration-300" />

            {/* Highlight Glow */}
            <span className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-t-full transition-opacity duration-500 blur-sm" />

            {/* Content Wrapper */}
            <div className="relative flex items-center justify-center gap-3 md:gap-4 z-10">
              {/* Icon Container */}
              <div className="p-1.5 md:p-2 bg-gradient-to-b from-zinc-800 to-black rounded-full border border-zinc-700 shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow duration-300">
                <Download className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Text */}
              <span
                className="font-bold text-base md:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 group-hover:from-white group-hover:via-white group-hover:to-zinc-300 transition-all font-bricolage"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                Download Brochure
              </span>

              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </a>

          {/* Reflection / Floor Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
      </div>

      {/* ---------------- MODAL POPUP ---------------- */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
              className="bg-[#0c0c0c] rounded-2xl w-full max-w-lg relative border-2 border-zinc-800 shadow-2xl flex flex-col font-inter overflow-hidden"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border-2 border-white/10"
              >
                ✕
              </button>

              {/* Header Content */}
              <div className="pt-10 px-6 sm:px-8 pb-4 text-left">
                <h2
                  className="text-2xl lg:text-3xl font-medium text-white mb-2 leading-snug font-bricolage"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  {selectedEvent.title}
                </h2>
                <p
                  className="text-zinc-400 text-base font-bricolage"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  Event Details & Rules
                </p>
              </div>

              {/* Scrollable Rules */}
              <div className="px-6 sm:px-8 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-full">
                <ul className="space-y-4 text-zinc-300 text-sm lg:text-base">
                  {selectedEvent.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3 text-zinc-400 text-sm p-4 bg-zinc-900/30 rounded-lg border-2 border-white/5">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span className="font-medium text-zinc-300">{selectedEvent.contact}</span>
                </div>
              </div>

              {/* Footer / Action */}
              <div className="mt-6">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full group relative flex items-center justify-between rounded-xl p-4 bg-zinc-800 hover:bg-zinc-800/80 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span
                      className="font-medium text-white relative z-10 transition-colors group-hover:text-orange-400 font-bricolage"
                      style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                      Register Now
                    </span>
                    <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-orange-500 transition-colors relative z-10" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}