"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

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
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/logo_low_fe195da3-opt-640-1.webp", category: "Campus", title: "Vibrance Logo" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/vitlogo_633cc466-opt-640-2.webp", category: "Campus", title: "VIT Chennai" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/SWC_4a94b9cc-opt-750-3.webp", category: "Campus", title: "Student Welfare Council" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
              className="font-power text-[15vw] md:text-[12vw] lg:text-[180px] font-black tracking-tighter leading-none footer-gradient"
            >
              GALLERY
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto"
            >
              Relive the unforgettable moments of Vibrance
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {galleryCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-festival-yellow text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(image)}
                    className="group relative rounded-[1.5rem] overflow-hidden cursor-pointer border border-white/10"
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    >
                      <div>
                        <p className="text-festival-yellow text-sm font-bold mb-1">{image.category}</p>
                        <h3 className="text-white text-xl font-bold">{image.title}</h3>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white text-lg font-bold"
              >
                Close ✕
              </button>
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-festival-yellow font-bold">{selectedImage.category}</p>
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}