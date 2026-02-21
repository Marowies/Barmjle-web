"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-dark">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full bg-dark">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-sm text-primary mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">منصتك الأولى للمشاريع البرمجية</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-tight font-sans"
                >
                    حوّل أفكارك إلى <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary animate-gradient-x">
                        واقع برمجي ملموس
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    نقدم خدمات برمجية متكاملة لطلاب الجامعات في الشرق الأوسط.
                    <br className="hidden sm:block" />
                    من مشاريع التخرج وحتى الاستشارات التقنية، نحن معك خطوة بخطوة نحو التميز.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/contact"
                        className="group w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3"
                    >
                        ابدأ مشروعك الآن
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/services"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all backdrop-blur-sm flex items-center justify-center gap-3"
                    >
                        <Code2 className="w-5 h-5 text-gray-400" />
                        استكشف خدماتنا
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
