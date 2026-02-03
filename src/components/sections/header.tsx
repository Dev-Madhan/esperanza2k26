"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", weight: "font-black" },
    { name: "Merch", href: "/merch", weight: "font-normal" },
    { name: "Pro Shows", href: "/proshows", weight: "font-normal", extraClasses: "text-glow [word-spacing:3px]" },
  ];

  const navLinksRight = [
      { name: "Events", href: "/events", weight: "font-normal", extraClasses: "" },
      { name: "Sponsors", href: "/#sponsors", weight: "font-normal", extraClasses: "" },
      { name: "Team", href: "/team", weight: "font-normal", extraClasses: "" },
    ];

  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/94edbd09-30bd-4628-aeb9-93e9fb6900f8-vitvibrance-com/assets/images/logo_low_fe195da3-opt-640-1.webp";

  return (
    <header 
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 font-display uppercase tracking-tight ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-gradient-to-b from-black via-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Mobile Logo */}
        <a className="md:hidden" href="/">
          <Image
            src={logoUrl}
            alt="Vibrance Logo"
            width={100}
            height={100}
            className="-ml-[5px] h-auto w-[80px]"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden w-full items-center justify-center md:flex lg:flex">
          <div className="flex flex-1 justify-end items-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-2 py-2 text-[21px] transition duration-300 ease-in-out hover:scale-[110%] lg:px-3 text-white ${link.weight} ${link.extraClasses || ""}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <a className="flex-shrink-0 mx-6 lg:mx-10" href="/">
            <div className="relative group">
              {/* Optional glow effect around logo like in screenshot */}
              <div className="absolute inset-0 rounded-full bg-[#29B463] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Image
                src={logoUrl}
                alt="Vibrance Logo"
                width={200}
                height={200}
                className="relative h-auto w-[80px] lg:w-[100px]"
                priority
              />
            </div>
          </a>

          <div className="flex flex-1 justify-start items-center gap-2 lg:gap-4">
            {navLinksRight.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-2 py-2 text-[21px] transition duration-300 ease-in-out hover:scale-[110%] lg:px-3 text-white ${link.weight}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 rounded-md border-2 border-white/20 bg-black p-2 text-white md:hidden lg:hidden active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-evenly bg-black/95 py-[10vh] transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen 
            ? "translate-y-0 opacity-100 pointer-events-auto" 
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {[...navLinks, ...navLinksRight].map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className={`whitespace-nowrap px-4 py-2 text-[5vh] transition-all duration-200 ease-in-out text-white ${link.weight} ${link.extraClasses || ""}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;