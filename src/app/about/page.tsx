import CTASection from "@/components/sections/CTASection";
import { Users, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div>
            <div className="bg-slate-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">من نحن</h1>
                <p className="text-xl text-gray-300">تعرف على فريق برمجلي ورؤيتنا للمستقبل التقني</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">رؤيتنا</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            نسعى لأن نكون الشريك التقني الأول لكل طالب جامعي في الشرق الأوسط، نمكّنهم من تحويل أفكارهم إلى مشاريع حقيقية ونساعدهم على اكتساب المهارات المطلوبة في سوق العمل.
                        </p>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">مهمتنا</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            توفير خدمات برمجية عالية الجودة، من شرح المواد وحتى تنفيذ المشاريع المعقدة، بأسلوب احترافي وأسعار تنافسية، مع التركيز على التعلم والتطبيق العملي.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl h-80 flex items-center justify-center">
                        <Target className="w-32 h-32 text-primary opacity-50" />
                    </div>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">المصداقية</h3>
                        <p className="text-gray-600 dark:text-gray-300">نلتزم بما نعد به، ونسلم المشاريع في موعدها المحدد.</p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">الجودة</h3>
                        <p className="text-gray-600 dark:text-gray-300">لا نرضى بأقل من التميز في كل سطر كود نكتبه.</p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">الدعم</h3>
                        <p className="text-gray-600 dark:text-gray-300">نحن معك في كل خطوة، قبل وأثناء وبعد تسليم المشروع.</p>
                    </div>
                </div>

            </div>

            <CTASection />
        </div>
    );
}
