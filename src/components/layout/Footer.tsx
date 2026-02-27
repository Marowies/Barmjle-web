import Link from "next/link";
import { Code2 } from "lucide-react";
import { WhatsAppIcon, TelegramIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
                        <Code2 className="w-8 h-8 text-primary" />
                        <span>برمجلي</span>
                    </Link>
                    <p className="text-sm leading-relaxed">
                        منصتك الأولى لإنجاز مشاريعك البرمجية باحترافية. نساعد طلاب الجامعات في الشرق الأوسط على تحقيق التميز.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                        <li><Link href="/services" className="hover:text-primary transition-colors">خدماتنا</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-bold mb-4">خدماتنا</h3>
                    <ul className="space-y-2 text-sm">
                        <li>شرح مواد CS</li>
                        <li>مشاريع تخرج</li>
                        <li>استشارات تقنية</li>
                        <li>كورسات مسجلة</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://wa.me/201557541184"
                            target="_blank"
                            className="p-3 bg-[#25D366]/10 rounded-xl text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="واتساب"
                        >
                            <WhatsAppIcon className="w-7 h-7" />
                        </a>
                        <a
                            href="https://t.me/Barmajni"
                            target="_blank"
                            className="p-3 bg-[#0088cc]/10 rounded-xl text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="تيليجرام"
                        >
                            <TelegramIcon className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                <p>© {new Date().getFullYear()} برمجلي. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
}
