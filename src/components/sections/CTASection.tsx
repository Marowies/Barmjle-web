"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.03]" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 md:p-16 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-500" />

                    <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-gray-900 leading-tight relative z-10">
                        جاهز لتبدأ <span className="text-primary italic">مشروعك القادم؟</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
                        لا تضيع وقتك في البحث. فريق برمجلي معك لتحويل الفكرة إلى واقع بأعلى معايير الجودة والاحترافية.
                    </p>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-4 px-10 py-5 bg-primary text-white rounded-2xl font-bold text-xl shadow-sm hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 relative z-10"
                    >
                        تواصل معنا الآن
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
