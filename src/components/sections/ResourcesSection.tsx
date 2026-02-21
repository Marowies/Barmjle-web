"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Resource {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
}

export default function ResourcesSection() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/public/resources")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setResources(json.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-dark" id="resources">
                <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            </section>
        );
    }

    if (resources.length === 0) return null;

    return (
        <section className="py-24 bg-dark relative overflow-hidden" id="resources">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">الموارد المجانية</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">أدوات وموارد مجانية لمساعدتك في رحلتك البرمجية</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => (
                        <motion.a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl ${resource.type === "TelegramBot"
                                    ? "bg-[#0088cc]/10 border-[#0088cc]/30 hover:border-[#0088cc] hover:shadow-[#0088cc]/10"
                                    : "bg-slate-800/50 border-slate-700 hover:border-primary/50 hover:shadow-primary/10"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${resource.type === "TelegramBot"
                                        ? "bg-[#0088cc]/20 text-[#0088cc]"
                                        : resource.type === "YouTube"
                                            ? "bg-red-500/20 text-red-400"
                                            : resource.type === "Course"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-slate-700 text-slate-400"
                                    }`}>
                                    {resource.type === "TelegramBot" ? "بوت تليجرام" : resource.type === "YouTube" ? "يوتيوب" : resource.type === "Course" ? "كورس" : "مورد"}
                                </span>
                                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{resource.description}</p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
