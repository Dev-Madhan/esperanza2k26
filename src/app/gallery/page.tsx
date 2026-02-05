"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from "lucide-react";
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import GalleryIntro from '@/components/gallery/GalleryIntro';
import { Skiper34 } from '@/components/ui/skiper-ui/skiper34';

const galleryCategories = ["All", "Pro Shows", "Events", "Behind the Scenes", "Campus"];

const galleryImages = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/RahulChahar_ac750ab2-opt-1080-15.webp", category: "Pro Shows", title: "Inauguration Night" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/NagaChai_e032696b-opt-750-22.webp", category: "Pro Shows", title: "Valedictory Ceremony" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/loststories-23.webp", category: "Pro Shows", title: "Lost Stories Performance" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/danika-24.webp", category: "Pro Shows", title: "DJ Night" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/andrea-25.webp", category: "Pro Shows", title: "Andrea Jeremiah Live" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/jonita-26.webp", category: "Pro Shows", title: "Jonita Gandhi Concert" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/shreya-27.webp", category: "Pro Shows", title: "Shreya Ghoshal Finale" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/pepsi-4.webp", category: "Events", title: "Title Sponsor" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/thehindudark-5.webp", category: "Events", title: "Media Coverage" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/logo_low_fe195da3-opt-640-1.webp", category: "Campus", title: "Esperanza Logo" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/vitlogo_633cc466-opt-640-2.webp", category: "Campus", title: "VTMT" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/SWC_4a94b9cc-opt-750-3.webp", category: "Campus", title: "Student Welfare Council" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);


  
  const galleryRef = useRef(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Header />
      {/* ---------------- GALLERY INTRO SECTION ---------------- */}
      <GalleryIntro />

      {/* ---------------- GALLERY SECTION ---------------- */}

      <section className="relative z-10 bg-background min-h-screen">


        <Skiper34 images={filteredImages} />
      </section>

      {/* ---------------- MODAL ---------------- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0c0c0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-zinc-800 transition-colors"
              >
                ✕
              </button>
              
              <div className="relative aspect-video w-full bg-zinc-950">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6 md:p-8 bg-[#0c0c0c]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-bricolage" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                      {selectedImage.title}
                    </h3>
                    <p className="text-orange-500 font-medium">{selectedImage.category}</p>
                  </div>
                  
                  {/* Optional: Add a download or share button here if needed */}
                  <a href={selectedImage.src} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                     <Download className="w-5 h-5 text-zinc-400" />
                  </a>
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