"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

/* ----------------------------------
      CATEGORY ICONS
---------------------------------- */
const categories = [
  { id: "All", label: "All", icon: "⭐" },
  { id: "Dance", label: "Dance", icon: "💃" },
  { id: "Singing", label: "Singing", icon: "🎤" },
  { id: "Film", label: "Film", icon: "🎥" },
  { id: "Photography", label: "Photography", icon: "📸" },
  { id: "Rap", label: "Rap", icon: "🎙" },
];

/* ----------------------------------
      EVENT CARDS (7 EVENTS)
---------------------------------- */
const eventCards = [
  {
    id: 1,
    title: "ANYBODY CAN DANCE",
    category: "Dance",
    img: "/images/events/solo-dance.jpg",
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
    id: 2,
    title: "VOICE QUEST",
    category: "Singing",
    img: "/images/events/group-dance.jpg",
    desc: "Group dance showcasing coordination, expressions & energy!",
    rules: [
      "Team size: 3–12 participants.",
      "Time limit: 3–5 minutes.",
      "Use only non-copyrighted music.",
      "Props allowed.",
      "Judging based on coordination & energy.",
    ],
    contact: "DARSHAN S - 8637466016",
  },
  {
    id: 3,
    title: "WALK OF FAME",
    category: "Fashion",
    img: "/images/events/solo-singing.jpg",
    desc: "Music event uniting students through vocals!",
    rules: [
      "Solo performance only.",
      "Maximum time: 3 minutes.",
      "Karaoke track must be submitted beforehand.",
      "Offensive lyrics prohibited.",
      "Judging based on pitch & clarity.",
    ],
    contact: "YUVAN RAJ M - 9345986055",
  },
  {
    id: 4,
    title: "FRAME BY FRAME",
    category: "Photography",
    img: "/images/events/photography.jpg",
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
    id: 5,
    title: "LENS LEGACY",
    category: "Film",
    img: "/images/events/shortfilm.jpg",
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
    title: "GROUP SINGING",
    category: "Singing",
    img: "/images/events/group-singing.jpg",
    desc: "Singing event uniting students through music!",
    rules: [
      "Team size: 3–10.",
      "Time limit: 4 minutes.",
      "Live instruments allowed.",
      "No offensive lyrics.",
      "Judging based on harmony & coordination.",
    ],
    contact: "Manoj K – 9988776655",
  },
  {
    id: 7,
    title: "RAP BATTLE",
    category: "Rap",
    img: "/images/events/rap.jpg",
    desc: "Show off your bars, flow & confidence!",
    rules: [
      "Solo competition.",
      "Time: 90 seconds.",
      "No vulgar or abusive content.",
      "Original lyrics preferred.",
      "Judging: flow, delivery, rhythm.",
    ],
    contact: "Arjun S – 9012345678",
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
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  /* -------- FILTER LOGIC -------- */
  const filteredEvents =
    activeCategory === "All"
      ? eventCards
      : eventCards.filter((event) => event.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Header />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="pt-32 pb-10 px-4 md:px-10 lg:px-20">
        <div ref={heroRef} className="mx-auto max-w-7xl text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-power text-[15vw] md:text-[12vw] lg:text-[180px] font-black tracking-tighter leading-none text-festival-orange"
          >
            EVENTS
          </motion.h1>

          <p className="mt-6 text-xl md:text-2xl text-white/80 font-light">          </p>

          {/* -------------- CATEGORY ICON FILTER BAR -------------- */}
          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-full text-lg transition-all
                  ${activeCategory === cat.id
                    ? "bg-red-500 text-white scale-110 shadow-lg"
                    : "bg-[#1a1a1a] text-white/70 hover:bg-[#2a2a2a]"
                  }
                `}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EVENT CARDS ---------------- */}
      <section className="px-4 md:px-10 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1a1a1a] rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition cursor-pointer"
            >
              <img
                src={event.img}
                alt={event.title}
                className="rounded-2xl mb-4 h-48 w-full object-cover"
              />

              <h2 className="text-2xl font-bold text-white mb-2">
                {event.title}
              </h2>

              <p className="text-white/70 mb-4">{event.desc}</p>

              <button
                onClick={() => setSelectedEvent(event)}
                className="text-red-400 font-semibold flex items-center gap-2"
              >
                View More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DOWNLOAD BROCHURE BUTTON ---------------- */}
      <div className="text-center pb-20">
        <a
          href="https://drive.google.com/file/d/1X549H2ozssnNl1uT1oxslaisqy-7ViyL/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 rounded-xl bg-festival-orange text-black font-bold text-lg hover:bg-festival-orange/90"
        >
          Download Events Brochure
        </a>
      </div>

      {/* ---------------- MODAL POPUP ---------------- */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] rounded-3xl p-10 max-w-xl w-full relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-6 text-red-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl font-bold text-red-400 mb-6">
              {selectedEvent.title}
            </h2>

            <ul className="space-y-4 text-white/90">
              {selectedEvent.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">✔</span>
                  {rule}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-white flex items-center gap-3">
              📞 <span>{selectedEvent.contact}</span>
            </p>

            <button className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold">
              Register
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}