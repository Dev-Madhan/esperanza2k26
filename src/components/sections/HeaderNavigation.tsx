"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMenu } from "@/context/MenuContext";
import Magnetic from "@/components/ui/magnetic";
import { X } from "lucide-react";
import TextScramble from "@/components/ui/text-scramble";

export function HeaderNavigation() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const headerAnimation = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        // Basic GSAP timeline setup
        headerAnimation.current = gsap
            .timeline({ paused: true })
            .set("#headerNavigation", {
                display: "flex",
                y: "-100%", // Start hidden above
            })
            .to("#headerNavigation", {
                duration: 0.8,
                y: "0%",
                ease: "power3.inOut",
            })
            .fromTo(
                ".headerAnimate",
                {
                    y: "50px",
                    opacity: 0,
                },
                {
                    y: "0px",
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.4"
            );

        return () => {
            headerAnimation.current?.kill();
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            headerAnimation.current?.play();
        } else {
            headerAnimation.current?.reverse();
        }
    }, [isMenuOpen]);

    const headerData = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Sponsors", href: "/#sponsors" },
        { name: "Team", href: "/team" },
    ];

    return (
        <div
            id="headerNavigation"
            className="fixed left-0 top-0 z-[60] hidden h-screen w-full flex-col items-center justify-center bg-black text-white"
        >


            <nav>
                <ul className="flex flex-col items-center justify-center gap-6">
                    {headerData.map((data) => (
                        <li className="headerAnimate" key={data.name}>
                            <Magnetic
                                className="text-[clamp(32px,5vw+1rem,88px)] font-black uppercase tracking-tighter hover:text-primary transition-colors duration-300 cursor-pointer"
                            >
                                <a href={data.href} onClick={toggleMenu} className="block w-full h-full p-4">
                                    <TextScramble className="block">
                                        {data.name}
                                    </TextScramble>
                                </a>
                            </Magnetic>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer / Socials (Optional) */}
            <div className="absolute bottom-10 w-full text-center headerAnimate">
                <p className="text-white/50 text-sm uppercase tracking-widest">
                    ESPERANZA 2K26 - VTMT
                </p>
            </div>

            {/* Background Effects: Dark theme kept as requested previously, but clean like screenshot */}
            <div className="absolute inset-0 pointer-events-none -z-10 bg-black"></div>
        </div>
    );
}
