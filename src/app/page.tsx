"use client";

import { useState } from "react";
import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import IntroTextSection from "@/components/sections/intro-text";
import TeaserVideo from "@/components/sections/teaser-video";
import VitStatement from "@/components/sections/vit-statement";
import Sponsors from "@/components/sections/sponsors";
import Inauguration from "@/components/sections/inauguration";
import Valedictory from "@/components/sections/valedictory";
import Footer from "@/components/sections/footer";
import Loader from "@/components/ui/loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Loader onLoadingComplete={() => setIsLoading(false)} />
      <main 
        className="relative min-h-screen bg-background text-foreground"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
      >
        <div className="grainy-overlay" />
        <Header />
        <HeroSection />
        <IntroTextSection />
        <TeaserVideo />
        <VitStatement />
        <Sponsors />
        <Inauguration />
        <Valedictory />
        <Footer />
      </main>
    </>
  );
}