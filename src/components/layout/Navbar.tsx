"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "الرئيسية", href: "/" },
        { name: "خدماتنا", href: "/services" },
        { name: "مشاريعنا", href: "/#projects" },
        { name: "من نحن", href: "/about" },
        { name: "تواصل معنا", href: "/contact" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight transition-transform hover:scale-105"
                    >
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Code2 className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-foreground">برمجلي</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-foreground/70 hover:text-primary transition-colors text-sm font-semibold tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-premium hover:bg-primary-hover hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-0.5"
                        >
                            ابدأ مشروعك
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2.5 rounded-xl bg-primary/5 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="md:hidden border-t border-border bg-background shadow-2xl"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-4 rounded-2xl text-lg font-bold text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 border border-transparent hover:border-primary/10"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center bg-primary text-white py-4 rounded-2xl text-lg font-extrabold shadow-premium hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
                                >
                                    ابدأ مشروعك
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );

};

export default Navbar;
