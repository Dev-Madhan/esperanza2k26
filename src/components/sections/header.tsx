"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";


interface HeaderProps {
  isOpaque?: boolean;
}

const Header = ({ isOpaque = false }: HeaderProps) => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", weight: "font-normal" },
    { name: "Events", href: "/events", weight: "font-normal", extraClasses: "" },
  ];

  const navLinksRight = [
    { name: "Sponsors", href: "/#sponsors", weight: "font-normal", extraClasses: "" },
    { name: "Team", href: "/team", weight: "font-normal", extraClasses: "" },
  ];

  const logoUrl = "/logo.svg";

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 font-display uppercase tracking-tight ${scrolled ? "sm:block" : "hidden sm:block"} ${scrolled || isOpaque ? "bg-black/80 backdrop-blur-md" : "bg-gradient-to-b from-black via-black/40 to-transparent"
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
            className="-ml-[5px] h-auto w-[150px]"
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
                className="relative h-auto w-[120px] lg:w-[150px]"
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


      </div>


    </header>
  );
};

export default Header;