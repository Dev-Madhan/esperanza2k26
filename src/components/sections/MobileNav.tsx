"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CHARS = "!@#$%^&*():{};|,.<>/?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const DecryptLink = ({ href, text, onClick, index }: { href: string; text: string; onClick: () => void; index: number }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    // Scramble effect on mount (appearance)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        let iteration = 0;

        // Delay the start based on index
        const startDelay = setTimeout(() => {
            setIsScrambling(true);
            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((letter, i) => {
                            if (i < iteration) {
                                return text[i];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsScrambling(false);
                }

                iteration += 1 / 3;
            }, 30);
        }, 100 + (index * 150)); // Staggered start

        return () => {
            clearInterval(interval);
            clearTimeout(startDelay);
        };
    }, [text, index]);

    return (
        <Link
            href={href}
            onClick={onClick}
            className="group relative flex items-center justify-center w-full py-4 border-b border-white/5 overflow-hidden"
        >
            <span
                className={`text-3xl sm:text-4xl font-black font-bricolage tracking-tighter uppercase text-center transition-all duration-300 ${isScrambling ? 'text-white/50 blur-[1px]' : 'text-white group-hover:text-[#29B463] group-hover:scale-110'}`}
                style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
            >
                {displayText}
            </span>

            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Link>
    );
};

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'EVENTS', href: '/events' },
        { name: 'GALLERY', href: '/gallery' },
        { name: 'TEAM', href: '/team' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Nav Toggle Bar */}
            <div className={`fixed top-0 left-0 right-0 z-[100] p-4 flex justify-between items-center sm:hidden pointer-events-none transition-all duration-300 ${isOpen ? 'mix-blend-difference' : ''}`}>
                {/* Logo - click through permitted */}
                <Link href="/" className="pointer-events-auto">
                    <Image
                        src="/logo.svg"
                        alt="Esperanza Logo"
                        width={100}
                        height={40}
                        className="w-[100px] h-auto object-contain drop-shadow-lg"
                    />
                </Link>

                {/* Menu Button - click through permitted */}
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto relative group p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5 overflow-hidden">
                        <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-full' : ''}`} />
                        <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[99] bg-black sm:hidden flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

                        {/* Content Container */}
                        <div className="relative flex flex-col h-full w-full max-w-sm mx-auto px-6 pt-32 pb-20 justify-center items-center">

                            {/* Navigation Links */}
                            <nav className="flex flex-col w-full items-center gap-2 mb-12">
                                {navLinks.map((link, index) => (
                                    <DecryptLink
                                        key={link.href}
                                        href={link.href}
                                        text={link.name}
                                        index={index}
                                        onClick={() => setIsOpen(false)}
                                    />
                                ))}
                            </nav>

                            {/* Footer / CTA - Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex flex-col gap-8 w-full items-center"
                            >
                                <div className="flex gap-4 w-full justify-center">
                                    <button className="flex-1 py-4 bg-white text-black font-black font-bricolage uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors max-w-[160px]">
                                        Register
                                    </button>
                                    <button className="flex-1 py-4 border border-white/20 text-white font-black font-bricolage uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors max-w-[160px]">
                                        Login
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-1 font-bricolage">Event Date</span>
                                        <span className="text-white font-bold text-lg font-bricolage text-[#29B463]">MARCH 6, 2026</span>
                                    </div>

                                    <div className="flex gap-8 mt-2">
                                        <a href="#" className="text-white/60 hover:text-[#29B463] hover:scale-110 transition-all duration-300">
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-white/60 hover:text-[#FF0000] hover:scale-110 transition-all duration-300">
                                            <Youtube className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300">
                                            <Twitter className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
