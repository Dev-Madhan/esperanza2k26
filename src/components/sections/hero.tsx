"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { gsap } from "gsap";

const HeroSection: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [nextVideoIndex, setNextVideoIndex] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const previewVideoRef = useRef<HTMLVideoElement>(null);

    const centerBoxRef = useRef<HTMLDivElement>(null);
    const transitionOverlayRef = useRef<HTMLDivElement>(null);
    const perspectiveWrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const dateThisRef = useRef<HTMLParagraphElement>(null);
    const dateMarchRef = useRef<HTMLHeadingElement>(null);
    const dateMarchBgRef = useRef<HTMLDivElement>(null);
    const dateNumbersRef = useRef<HTMLDivElement>(null);

    const videos = [
        "/intro1.mp4",
        "/intro2.mp4",
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setNextVideoIndex((currentVideoIndex + 1) % videos.length);
    }, [currentVideoIndex, videos.length]);

    useEffect(() => {
        if (currentVideoRef.current) {
            currentVideoRef.current.load();
            currentVideoRef.current.play().catch((error) => {
                console.log("Current video autoplay prevented:", error);
            });
        }
    }, [currentVideoIndex]);

    useEffect(() => {
        if (nextVideoRef.current) {
            nextVideoRef.current.load();
        }
    }, [nextVideoIndex]);

    useEffect(() => {
        if (isHovering && previewVideoRef.current && !isTransitioning) {
            previewVideoRef.current.play().catch((error) => {
                console.log("Preview video play prevented:", error);
            });
        } else if (previewVideoRef.current) {
            previewVideoRef.current.pause();
            previewVideoRef.current.currentTime = 0;
        }
    }, [isHovering, isTransitioning]);

    useEffect(() => {
        if (!isMounted) return;

        const tl = gsap.timeline({ delay: 0.2 });

        // Safely check if elements exist before animating
        const elementsToAnimate = [
            dateThisRef.current,
            dateMarchRef.current,
            dateMarchBgRef.current
        ].filter(el => el !== null);

        if (elementsToAnimate.length === 0) return;

        tl.set(elementsToAnimate, {
            opacity: 0,
        });

        if (dateThisRef.current) tl.set(dateThisRef.current, { color: "#9C18FF" });

        if (dateMarchRef.current) {
            tl.set(dateMarchRef.current, {
                color: "#9C18FF",
                fontStyle: "normal",
            });
        }

        if (dateMarchBgRef.current) {
            tl.set(dateMarchBgRef.current, {
                scaleX: 0.3,
                transformOrigin: "left center",
            });
        }

        if (dateThisRef.current && dateMarchBgRef.current) {
            tl.to([dateThisRef.current, dateMarchBgRef.current], {
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
            }, "+=0.8");
        }

        if (dateMarchBgRef.current) {
            tl.to(dateMarchBgRef.current, {
                scaleX: 1,
                duration: 0.3,
                ease: "power2.out",
            }, "+=0.2");
        }

        if (dateMarchRef.current) {
            tl.to(dateMarchRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
            }, "+=0.2");
        }

        if (dateMarchBgRef.current) {
            tl.to(dateMarchBgRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            }, "+=0.1");
        }

        if (dateThisRef.current) {
            tl.to(dateThisRef.current, {
                color: "#ffffff",
                duration: 0.25,
                ease: "power2.inOut",
            }, "+=0.3");
        }

        return () => {
            tl.kill();
        };
    }, [isMounted]);

    const MAX_ROT_X = 8;
    const MAX_ROT_Y = 8;
    const LIFT_SCALE = 1.06;
    const LIFT_Z = 12;
    const ENTER_DUR = 0.25;
    const MOVE_DUR = 0.25;
    const LEAVE_DUR = 0.55;

    const leaveTweenRef = useRef<gsap.core.Tween | null>(null);

    const handleHoverMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isTransitioning) return;
        setIsHovering(true);

        requestAnimationFrame(() => {
            if (!cardRef.current) return;

            if (leaveTweenRef.current) {
                leaveTweenRef.current.kill();
                leaveTweenRef.current = null;
            }

            gsap.to(cardRef.current, {
                scale: LIFT_SCALE,
                z: LIFT_Z,
                duration: ENTER_DUR,
                ease: "power2.out",
                overwrite: "auto",
            });
        });
    }, [isTransitioning]);

    const handleHoverMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isTransitioning) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;

        const targetRotY = (nx - 0.5) * 2 * MAX_ROT_Y;
        const targetRotX = (0.5 - ny) * 2 * MAX_ROT_X;

        gsap.to(cardRef.current, {
            rotationX: targetRotX,
            rotationY: targetRotY,
            duration: MOVE_DUR,
            ease: "power2.out",
            overwrite: "auto",
        });
    }, [isTransitioning]);

    const handleHoverMouseLeave = useCallback(() => {
        setIsHovering(false);

        if (!cardRef.current) return;

        leaveTweenRef.current = gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            z: 0,
            duration: LEAVE_DUR,
            ease: "power4.out",
        });
    }, []);

    const handleClick = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setIsHovering(false);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
                setIsTransitioning(false);
            }
        });

        tl.to(centerBoxRef.current, {
            scale: 3,
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
        })
            .to(transitionOverlayRef.current, {
                opacity: 1,
                duration: 0.4,
            }, "-=0.3")
            .to(currentVideoRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
            }, "-=0.2")
            .call(() => {
                if (nextVideoRef.current) {
                    nextVideoRef.current.play().catch(console.log);
                }
            })
            .to(nextVideoRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
            })
            .to(transitionOverlayRef.current, {
                opacity: 0,
                duration: 0.3,
            }, "-=0.2")
            .set(centerBoxRef.current, {
                scale: 1,
                opacity: 1,
            });
    };

    return (
        <section className="relative h-dvh w-full overflow-hidden select-none bg-black">
            {/* Black background for mobile */}
            <div className="absolute inset-0 bg-black sm:hidden z-0"></div>

            <div id="video-frame" className="relative z-10 h-dvh w-full overflow-hidden">
                <div className="relative h-full w-full">
                    {/* Background Videos - Hidden on Mobile */}
                    <video
                        ref={currentVideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="hidden sm:block absolute left-0 top-0 h-full w-full object-cover object-center"
                        key={`current-${currentVideoIndex}`}
                    >
                        <source src={videos[currentVideoIndex]} type="video/mp4" />
                    </video>

                    <video
                        ref={nextVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="hidden sm:block absolute left-0 top-0 h-full w-full object-cover object-center opacity-0 pointer-events-none"
                        key={`next-${nextVideoIndex}`}
                    >
                        <source src={videos[nextVideoIndex]} type="video/mp4" />
                    </video>

                    {/* Mobile - Logo Top Left */}
                    <div className="sm:hidden absolute top-6 left-4 z-50">
                        <Image
                            src="/logo.svg"
                            alt="Esperanza Logo"
                            width={120}
                            height={40}
                            className="w-[120px] h-auto object-contain"
                        />
                    </div>

                    {/* Mobile - Menu Icon Top Right */}
                    <div className="sm:hidden absolute top-6 right-4 z-50">
                        <button className="p-2 rounded-md border border-white/20 bg-transparent">
                            <Menu className="size-6 text-white" />
                        </button>
                    </div>

                    {/* Mobile Layout - Text Above and Below Center Video */}
                    <div className="sm:hidden absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 px-4 pointer-events-none">
                        {/* ESPERANZA Text Above Video */}
                        <h1
                            className="text-white font-extrabold uppercase text-[3.2rem] leading-[0.9] tracking-tight text-center"
                            style={{
                                fontFamily: "var(--font-display)",
                                letterSpacing: "0.05em"
                            }}
                        >
                            ESPERANZA
                        </h1>

                        {/* Center Video with Rotation */}
                        <div
                            className="relative w-[300px] h-[180px] pointer-events-none"
                            style={{
                                transform: "perspective(1000px) rotateY(-15deg) rotateX(5deg) rotateZ(8deg)",
                                transformOrigin: "center center"
                            }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover rounded-lg shadow-2xl"
                                style={{
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
                                }}
                            >
                                <source src={videos[currentVideoIndex]} type="video/mp4" />
                            </video>
                        </div>

                        {/* 2K26 Text Below Video */}
                        <h2
                            className="text-white font-extrabold text-[5rem] leading-[0.85] tracking-tight text-center"
                            style={{
                                fontFamily: "var(--font-display)",
                                letterSpacing: "0.05em"
                            }}
                        >
                            2K26
                        </h2>
                    </div>

                    {/* Mobile - #VISTARA Bottom Right */}
                    <h1
                        className="sm:hidden absolute bottom-24 right-4 z-40 text-white font-extrabold italic select-none text-sm"
                        style={{
                            letterSpacing: "0.05em",
                            lineHeight: "0.8"
                        }}
                    >
                        #<b>V</b>ISTARA
                    </h1>

                    {/* Desktop - #VISTARA Bottom Right */}
                    <h1
                        className="hidden sm:block absolute bottom-6 right-4 sm:bottom-8 sm:right-5 z-40 text-foreground font-extrabold italic select-none text-sm sm:text-base md:text-lg"
                        style={{
                            letterSpacing: "-0.05em",
                            lineHeight: "0.8"
                        }}
                    >
                        #<b>V</b>ISTARA
                    </h1>

                    {/* Desktop - Interactive Center Video */}
                    <div
                        ref={perspectiveWrapperRef}
                        className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 size-48 sm:size-72 cursor-pointer"
                        style={{ perspective: "800px" }}
                        onMouseEnter={handleHoverMouseEnter}
                        onMouseMove={handleHoverMouseMove}
                        onMouseLeave={handleHoverMouseLeave}
                        onClick={handleClick}
                    >
                        <div
                            ref={cardRef}
                            className="relative size-full"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)",
                            }}
                        >
                            {isHovering && !isTransitioning && (
                                <div
                                    ref={centerBoxRef}
                                    className="relative size-full overflow-hidden rounded-lg shadow-2xl"
                                >
                                    <video
                                        ref={previewVideoRef}
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="size-full object-cover object-center rounded-lg"
                                    >
                                        <source src={videos[nextVideoIndex]} type="video/mp4" />
                                    </video>

                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                                            Click to Switch
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        ref={transitionOverlayRef}
                        className="absolute inset-0 z-40 bg-black/50 opacity-0 pointer-events-none"
                    />
                </div>
            </div>

            {/* Desktop - Date Section (Bottom Left) */}
            <div className="hidden sm:block absolute z-20 bottom-[140px] sm:bottom-[120px] md:bottom-[40px] left-[20px] sm:left-[25px] md:left-[50px]">
                <div className="flex flex-col w-fit h-fit relative">
                    <p
                        ref={dateThisRef}
                        className="font-medium text-[1rem] sm:text-[1.25rem] leading-none mb-1"
                        style={{ fontFamily: "'Impact', 'Anton', sans-serif" }}
                    >
                        This
                    </p>

                    <div className="relative">
                        <div
                            ref={dateMarchBgRef}
                            className="absolute top-[0.4rem] sm:top-[0.6rem] -left-[5%] bg-foreground w-[110%] h-[2.6rem] sm:h-[4rem] -z-10"
                        ></div>

                        <h2
                            ref={dateMarchRef}
                            className="font-extrabold text-[3rem] sm:text-[4.5rem] leading-[0.8] tracking-tighter"
                            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontStyle: "normal" }}
                        >
                            5TH MARCH
                        </h2>
                    </div>

                    <div
                        ref={dateNumbersRef}
                        className="mt-1 text-[1.4rem] sm:text-[1.8rem] font-medium"
                        style={{ fontFamily: "'Impact', 'Anton', sans-serif" }}
                    >
                    </div>
                </div>
            </div>

            {/* Desktop - VSC Logo (Top Right) */}
            <div className="hidden sm:block absolute z-50 top-1 right-1 sm:top-1 sm:right-1">
                <Image
                    src="/vsc.svg"
                    alt="VSC Logo"
                    width={200}
                    height={85}
                    className="w-16 h-16 sm:w-[200px] sm:h-[85px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
            </div>

            {/* Desktop - Action Buttons (Bottom Right) */}
            <div className="hidden sm:flex absolute z-30 items-end sm:items-center justify-end sm:justify-center bottom-[140px] sm:bottom-28 md:bottom-12 right-4 sm:right-0 sm:w-full sm:px-6">
                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                    <button
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-5 sm:px-8 py-2.5 sm:py-3.5 text-white transition-all duration-300 border border-white/10"
                        style={{
                            boxShadow: "inset 0 -8px 10px rgba(255,255,255,0.12)"
                        }}
                    >
                        <div className="absolute inset-0 -z-10 group-hover:animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]"></div>

                        <span className="relative flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
                            Explore Events
                        </span>

                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(156,24,255,0.2)] group-hover:shadow-[inset_0_0_20px_rgba(156,24,255,0.4)] transition-all"></div>
                    </button>

                    <button className="bg-black/60 backdrop-blur-md px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-widest border border-white/60 hover:bg-white/10 transition-all duration-300">
                        Register Now
                    </button>
                </div>
            </div>

            {/* Mobile - Menu Button (Bottom Center) */}
            <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 sm:hidden">
                <button className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full text-white text-base font-medium border border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg">
                    Menu <Menu className="size-5" />
                </button>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-background z-[1]"></div>
        </section >
    );
};

export default HeroSection;
