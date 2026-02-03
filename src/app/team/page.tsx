"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const departments = ["All", "Core", "Creative", "Technical", "Marketing", "Operations", "Finance"];

const teamMembers = [
  { name: "Aditya Kumar", role: "President", department: "Core", color: "#29B463" },
  { name: "Priya Sharma", role: "Vice President", department: "Core", color: "#29B463" },
  { name: "Rahul Menon", role: "General Secretary", department: "Core", color: "#29B463" },
  { name: "Sneha Reddy", role: "Treasurer", department: "Finance", color: "#FFC300" },
  { name: "Arjun Nair", role: "Creative Head", department: "Creative", color: "#FF5733" },
  { name: "Divya Krishnan", role: "Design Lead", department: "Creative", color: "#FF5733" },
  { name: "Vikram Singh", role: "Tech Lead", department: "Technical", color: "#DAF7A5" },
  { name: "Anjali Gupta", role: "Web Developer", department: "Technical", color: "#DAF7A5" },
  { name: "Karthik Iyer", role: "Marketing Head", department: "Marketing", color: "#9B59B6" },
  { name: "Meera Patel", role: "Social Media", department: "Marketing", color: "#9B59B6" },
  { name: "Sanjay Rao", role: "Operations Head", department: "Operations", color: "#3498DB" },
  { name: "Lakshmi Devi", role: "Logistics", department: "Operations", color: "#3498DB" },
  { name: "Ravi Shankar", role: "Cultural Head", department: "Core", color: "#29B463" },
  { name: "Pooja Nambiar", role: "Sports Head", department: "Core", color: "#29B463" },
  { name: "Deepak Verma", role: "Events Coordinator", department: "Operations", color: "#3498DB" },
  { name: "Shreya Joshi", role: "PR Head", department: "Marketing", color: "#9B59B6" },
];

export default function TeamPage() {
  const [activeDept, setActiveDept] = useState("All");
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.1 });

  const filteredMembers = activeDept === "All" 
    ? teamMembers 
    : teamMembers.filter(m => m.department === activeDept);

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
              className="font-power text-[15vw] md:text-[12vw] lg:text-[180px] font-black tracking-tighter leading-none text-festival-green"
            >
              TEAM
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto"
            >
              The passionate minds behind Vibrance&apos;25
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {departments.map((dept) => (
              <motion.button
                key={dept}
                onClick={() => setActiveDept(dept)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeDept === dept
                    ? 'bg-festival-green text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {dept}
              </motion.button>
            ))}
          </motion.div>

          <div ref={teamRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isTeamInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative bg-[#1a1a1a] rounded-[1.5rem] overflow-hidden border border-white/10"
              >
                <div 
                  className="aspect-square relative overflow-hidden"
                  style={{ backgroundColor: `${member.color}30` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-black"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-xs text-white/50 mt-1">{member.department}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 bg-[#1a1a1a] rounded-[2rem] p-8 md:p-12 border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Join Our Team</h2>
                <p className="text-white/70 max-w-xl">
                  Want to be part of the Vibrance&apos;25 organizing committee? We&apos;re always looking for passionate individuals to join our team.
                </p>
              </div>
              <motion.a
                href="mailto:vibrance@vit.ac.in"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-8 py-4 rounded-xl bg-festival-green text-black font-bold hover:bg-festival-green/90 transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}