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
        <section className="py-24 bg-background relative overflow-hidden" id="services">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">خدماتنا</h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto text-lg">حلول شاملة مصممة خصيصاً لدعم مسيرتك الأكاديمية والمهنية</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-card p-8 md:p-10 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-2 flex flex-col h-full"
                            >
                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                    {iconMap[service.icon] || <Code className="w-8 h-8" />}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                <p className="text-foreground/60 mb-6 leading-relaxed flex-grow">
                                    {service.description}
                                </p>
                                <div className="mt-auto pt-6 flex w-full">
                                    <Link
                                        href={service.href || "/services"}
                                        className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all duration-300 w-full"
                                    >
                                        المزيد من التفاصيل
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
