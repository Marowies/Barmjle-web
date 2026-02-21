"use client";

import Link from "next/link";
import { BookOpen, Code, GraduationCap, LayoutDashboard, MessageSquare, Video, ArrowLeft, Wrench, Globe, Laptop, Smartphone, Database, Server, Shield, Zap, Award, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6" />,
    Code: <Code className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
    LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
    MessageSquare: <MessageSquare className="w-6 h-6" />,
    Video: <Video className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    Globe: <Globe className="w-6 h-6" />,
    Laptop: <Laptop className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Server: <Server className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
};

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string | null;
}

export default function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/public/services")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setServices(json.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-24 bg-dark relative overflow-hidden" id="services">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">خدماتنا</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">حلول شاملة مصممة خصيصاً لدعم مسيرتك الأكاديمية والمهنية</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-primary/50 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                    {iconMap[service.icon] || <Code className="w-6 h-6" />}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed h-[3rem]">
                                    {service.description}
                                </p>
                                <Link
                                    href={service.href || "/services"}
                                    className="inline-flex items-center gap-2 text-white font-medium group-hover:text-primary transition-colors"
                                >
                                    المزيد من التفاصيل
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
