"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] dark:opacity-[0.02]" />
                <div className="absolute top-20 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] opacity-40 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-primary/10 rounded-full blur-[100px] md:blur-[140px] opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-md text-sm md:text-base text-primary mb-10 shadow-sm"
                >
                    <Sparkles className="w-4 h-4 md:w-5 h-5" />
                    <span className="font-bold tracking-wide">منصتك الأولى للمشاريع البرمجية</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-extrabold tracking-tight text-foreground mb-10 leading-[1.1] font-sans fluid-text-h1"
                >
                    حوّل أفكارك إلى <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary/80 animate-gradient-x">
                        واقع برمجي ملموس
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-16 leading-relaxed fluid-text-p text-balance"
                >
                    نقدم خدمات برمجية متكاملة لطلاب الجامعات في الشرق الأوسط.
                    من مشاريع التخرج وحتى الاستشارات التقنية، نحن معك خطوة بخطوة نحو التميز.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8"
                >
                    <Link
                        href="/contact"
                        className="group w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-extrabold text-lg shadow-premium hover:bg-primary-hover hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        ابدأ مشروعك الآن
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/services"
                        className="w-full sm:w-auto px-10 py-5 bg-background text-foreground border-2 border-border rounded-2xl font-bold text-lg hover:bg-card hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <Code2 className="w-6 h-6 text-primary" />
                        استكشف خدماتنا
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
