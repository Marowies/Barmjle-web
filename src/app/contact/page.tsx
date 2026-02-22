import ContactForm from "@/components/sections/ContactForm";
import { MapPin } from "lucide-react";
import { WhatsAppIcon, TelegramIcon } from "@/components/icons/SocialIcons";

export default function ContactPage() {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">تواصل معنا</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">نحن هنا للإجابة على استفساراتك ومساعدتك في مشروعك القادم</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800">
                        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">معلومات الاتصال</h3>
                        <ul className="space-y-6">
                            <li>
                                <a
                                    href="https://wa.me/201557541184"
                                    target="_blank"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-3 bg-[#25D366]/10 rounded-xl text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                        <WhatsAppIcon className="w-7 h-7" />
                                    </div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-[#25D366] transition-colors">واتساب</h4>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/Barmajlii"
                                    target="_blank"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-3 bg-[#0088cc]/10 rounded-xl text-[#0088cc] group-hover:bg-[#0088cc] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                        <TelegramIcon className="w-7 h-7" />
                                    </div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-[#0088cc] transition-colors">تيليجرام</h4>
                                </a>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">موقعنا</h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        أونلاين - نخدم جميع طلاب الجامعات في الشرق الأوسط
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-4">لماذا تختار برمجلي؟</h3>
                        <ul className="space-y-2 list-disc list-inside opacity-90">
                            <li>دقة في المواعيد</li>
                            <li>جودة برمجية عالية</li>
                            <li>أسعار تناسب الطلاب</li>
                            <li>دعم فني مستمر</li>
                        </ul>
                    </div>
                </div>

                {/* Contact Form */}
                <ContactForm />
            </div>
        </div>
    );
}
