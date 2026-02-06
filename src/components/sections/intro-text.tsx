"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IntroTextSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text items to display sequentially
  const textItems = [
    { text: "One Epic Day", color: "#29B463", weight: "font-black" },
    { text: "Shimmering Talents", color: "#DAF7A5", weight: "font-bold" },
    { text: "Power-Packed Events", color: "#FFC300", weight: "font-bold" },
    { text: "Electrifying Performances", color: "#FF5733", weight: "font-bold" },
    { text: "Unforgettable Moments", color: "#29B463", weight: "font-bold" },
    { text: "Pure Passion", color: "#FFC300", weight: "font-black" },
  ];

  const totalItems = textItems.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A]"
      style={{ height: `${totalItems * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] opacity-60" />

        {/* Text Container with 3D perspective */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div className="relative w-full max-w-6xl px-6">
            {textItems.map((item, index) => {
              // Calculate scroll range for this item
              const itemStart = index / totalItems;
              const itemEnd = (index + 1) / totalItems;
              const itemMid = (itemStart + itemEnd) / 2;

              // Opacity: fade in, stay visible, fade out
              const opacity = useTransform(
                scrollYProgress,
                [
                  Math.max(0, itemStart - 0.05),
                  itemStart + 0.05,
                  itemEnd - 0.05,
                  Math.min(1, itemEnd + 0.05)
                ],
                [0, 1, 1, 0]
              );

              // Y position: slide up and out
              const y = useTransform(
                scrollYProgress,
                [itemStart, itemMid, itemEnd],
                [100, 0, -100]
              );

              // Scale: grow in, shrink out
              const scale = useTransform(
                scrollYProgress,
                [itemStart, itemMid, itemEnd],
                [0.8, 1, 0.8]
              );

              // Rotation X: 3D flip effect
              const rotateX = useTransform(
                scrollYProgress,
                [itemStart, itemMid, itemEnd],
                [45, 0, -45]
              );

              // Blur: sharp in center, blurred at edges
              const blur = useTransform(
                scrollYProgress,
                [itemStart, itemMid, itemEnd],
                [10, 0, 10]
              );

              return (
                <motion.div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center text-center font-display ${item.weight}`}
                  style={{
                    opacity,
                    y,
                    scale,
                    rotateX,
                    filter: useTransform(blur, (b) => `blur(${b}px)`),
                    color: item.color,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  <h2
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight font-bricolage"
                    style={{
                      textShadow: `0 0 40px ${item.color}60, 0 0 80px ${item.color}30`,
                    }}
                  >
                    {item.text}
                  </h2>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator - only show at start */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
          }}
        >
          <p className="text-white/60 text-sm uppercase tracking-widest">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {textItems.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: useTransform(
                  scrollYProgress,
                  [i / totalItems, (i + 0.5) / totalItems, (i + 1) / totalItems],
                  ["rgba(255,255,255,0.2)", "#29B463", "rgba(255,255,255,0.2)"]
                ),
                scale: useTransform(
                  scrollYProgress,
                  [i / totalItems, (i + 0.5) / totalItems, (i + 1) / totalItems],
                  [1, 1.5, 1]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroTextSection;