"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark to-slate-900" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                    جاهز لتبدأ <span className="text-primary">مشروعك القادم؟</span>
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    لا تضيع وقتك في البحث. فريق برمجلي معك لتحويل الفكرة إلى واقع بأعلى معايير الجودة والاحترافية.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-dark rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1"
                >
                    تواصل معنا الآن
                    <ArrowLeft className="w-6 h-6" />
                </Link>
            </div>
        </section>
    );
}
