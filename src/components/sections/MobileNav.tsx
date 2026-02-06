"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Team', href: '/team' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Nav Bar - Only visible on mobile */}
            <div className="sm:hidden fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Esperanza Logo"
                            width={120}
                            height={40}
                            className="w-[100px] h-auto object-contain"
                        />
                    </Link>

                    {/* Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden fixed inset-0 z-[99] bg-black"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-green-900/20" />

                        {/* Animated background orbs */}
                        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] animate-pulse" />
                        <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-green-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

                        {/* Menu Content */}
                        <div className="relative h-full flex flex-col items-center justify-center px-8 pt-20 pb-8">

                            {/* Navigation Links */}
                            <nav className="flex flex-col items-center gap-6 mb-12">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="group relative"
                                        >
                                            <span className="text-3xl font-black text-white font-bricolage tracking-tight hover:text-[#29B463] transition-colors duration-300">
                                                {link.name}
                                            </span>
                                            <motion.div
                                                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#29B463] to-[#FFC300] rounded-full"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="flex flex-col gap-4 w-full max-w-xs"
                            >
                                <button className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#29B463] to-[#FFC300] text-black font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    Register Now
                                </button>
                                <button className="w-full px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                                    Explore Events
                                </button>
                            </motion.div>

                            {/* Social Links or Additional Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="mt-auto pt-8"
                            >
                                <p className="text-white/60 text-sm text-center font-bricolage">
                                    6th March 2026 • #VISTARA
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
