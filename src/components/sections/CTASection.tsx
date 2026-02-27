"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
                    className="bg-card p-12 md:p-20 rounded-[3.5rem] border border-border shadow-premium relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-500" />

                    <h2 className="font-extrabold mb-10 text-foreground leading-tight fluid-text-h2 relative z-10 text-balance">
                        جاهز لتبدأ <span className="text-primary italic">مشروعك القادم؟</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/60 mb-16 max-w-2xl mx-auto leading-relaxed relative z-10 text-balance">
                        لا تضيع وقتك في البحث. فريق برمجلي معك لتحويل الفكرة إلى واقع بأعلى معايير الجودة والاحترافية.
                    </p>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] font-extrabold text-2xl shadow-premium hover:bg-primary-hover hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300 relative z-10"
                    >
                        تواصل معنا الآن
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
