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

function TelegramButton({ resource }: { resource: Resource }) {
    return (
        <motion.a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group flex flex-col p-8 rounded-[2rem] border border-[#0088cc]/20 bg-[#0088cc]/5 hover:border-[#0088cc] hover:bg-[#0088cc]/10 hover:-translate-y-2 hover:shadow-premium transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0088cc] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0088cc]/20 group-hover:scale-110 transition-transform duration-300">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/20">
                        بوت تليجرام
                    </span>
                </div>
                <ExternalLink className="w-5 h-5 text-[#0088cc]/40 group-hover:text-[#0088cc] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-[#0088cc] transition-colors">{resource.title}</h3>
            <p className="text-foreground/60 text-base leading-relaxed mb-8 flex-1">{resource.description}</p>
            <div className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0088cc] rounded-2xl text-white font-bold text-lg group-hover:bg-[#0099dd] group-hover:shadow-lg group-hover:shadow-[#0088cc]/30 transition-all duration-300">
                انضم الآن
            </div>
        </motion.a>
    );
}

function GenericResourceCard({ resource, index }: { resource: Resource; index: number }) {
    const typeStyles: Record<string, { badge: string; card: string; hover: string }> = {
        YouTube: { badge: "bg-red-500/10 text-red-500 border-red-500/20", card: "bg-card border-border", hover: "hover:border-red-500/30 hover:shadow-red-500/5" },
        Course: { badge: "bg-green-500/10 text-green-500 border-green-500/20", card: "bg-card border-border", hover: "hover:border-green-500/30 hover:shadow-green-500/5" },
        Tool: { badge: "bg-primary/10 text-primary border-primary/20", card: "bg-card border-border", hover: "hover:border-primary/30 hover:shadow-premium-hover" },
        Other: { badge: "bg-foreground/5 text-foreground/50 border-foreground/10", card: "bg-card border-border", hover: "hover:border-primary/30 hover:shadow-premium-hover" },
    };
    const typeLabels: Record<string, string> = { YouTube: "يوتيوب", Course: "كورس", Tool: "أداة", Other: "مورد" };
    const style = typeStyles[resource.type] || typeStyles.Other;

    return (
        <motion.a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${style.card} ${style.hover} shadow-sm`}
        >
            <div className="flex items-start justify-between mb-6">
                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold border ${style.badge}`}>
                    {typeLabels[resource.type] || resource.type}
                </span>
                <ExternalLink className="w-5 h-5 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{resource.title}</h3>
            <p className="text-foreground/60 text-base leading-relaxed line-clamp-2 md:line-clamp-none">{resource.description}</p>
        </motion.a>
    );
}


export default function ResourcesSection() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/public/resources")
            .then((res) => res.json())
            .then((json) => { if (json.success) setResources(json.data); })
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
                    {resources.map((resource, index) =>
                        resource.type === "TelegramBot" ? (
                            <TelegramButton key={resource.id} resource={resource} />
                        ) : (
                            <GenericResourceCard key={resource.id} resource={resource} index={index} />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
