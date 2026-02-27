import CTASection from "@/components/sections/CTASection";
import { Users, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div>
            <div className="relative bg-slate-900 dark:bg-black py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-sm">من نحن</h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        تعرف على فريق برمجلي ورؤيتنا للمستقبل التقني في دعم مسيرة الطلاب البرمجية
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">

                {/* Mission & Vision */}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 text-center md:text-right">
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 dark:text-white inline-block border-b-4 border-primary/30 pb-2">رؤيتنا</h2>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                    نسعى لأن نكون الشريك التقني الأول لكل طالب جامعي في الشرق الأوسط، نمكّنهم من تحويل أفكارهم إلى مشاريع حقيقية ونساعدهم على اكتساب المهارات المطلوبة في سوق العمل.
                                </p>
                            </section>
                            <section>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900 dark:text-white inline-block border-b-4 border-primary/30 pb-2">مهمتنا</h2>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                    توفير خدمات برمجية عالية الجودة، من شرح المواد وحتى تنفيذ المشاريع المعقدة، بأسلوب احترافي وأسعار تنافسية، مع التركيز على التعلم والتطبيق العملي.
                                </p>
                            </section>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-video md:aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-primary/10 shadow-inner">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                            <Target className="w-32 h-32 md:w-48 md:h-48 text-primary/40 animate-pulse relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="group text-center p-10 bg-white dark:bg-slate-900/50 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">المصداقية</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">نلتزم بما نعد به، ونسلم المشاريع في موعدها المحدد.</p>
                    </div>
                    <div className="group text-center p-10 bg-white dark:bg-slate-900/50 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <Target className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">الجودة</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">لا نرضى بأقل من التميز في كل سطر كود نكتبه.</p>
                    </div>
                    <div className="group text-center p-10 bg-white dark:bg-slate-900/50 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300">
                        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <Users className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">الدعم</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">نحن معك في كل خطوة، قبل وأثناء وبعد تسليم المشروع.</p>
                    </div>
                </div>

            </div>

            <CTASection />
        </div>
    );
}
