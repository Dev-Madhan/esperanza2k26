"use client";

import { useState } from "react";
import Header from "@/components/sections/header";
import MobileNav from "@/components/sections/MobileNav";
import HeroSection from "@/components/sections/hero";
import IntroTextSection from "@/components/sections/intro-text";
import JuryReveal from "@/components/sections/jury-reveal";
import TeaserVideo from "@/components/sections/teaser-video";
import Vistara from "@/components/sections/vistara";
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
        <MobileNav />
        <Header />
        <HeroSection />
        <IntroTextSection />
        <JuryReveal />
        <TeaserVideo />
        <Vistara />
        <Sponsors />
        <Footer />
      </main>
    </>
  );
}