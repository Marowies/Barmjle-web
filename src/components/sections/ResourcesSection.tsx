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
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group flex flex-col p-6 rounded-2xl border border-[#0088cc]/30 bg-[#0088cc]/10 hover:border-[#0088cc] hover:bg-[#0088cc]/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0088cc]/10 transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0088cc] flex items-center justify-center flex-shrink-0">
                        {/* Telegram icon using SVG */}
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#0088cc]/20 text-[#0088cc]">
                        بوت تليجرام
                    </span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#0088cc]/60 group-hover:text-[#0088cc] transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0088cc] transition-colors">{resource.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{resource.description}</p>
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0088cc] rounded-xl text-white font-medium text-sm group-hover:bg-[#0099dd] transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                انضم الآن
            </div>
        </motion.a>
    );
}

function GenericResourceCard({ resource, index }: { resource: Resource; index: number }) {
    const typeStyles: Record<string, { badge: string; card: string }> = {
        YouTube: { badge: "bg-red-500/20 text-red-400", card: "bg-slate-800/50 border-slate-700 hover:border-red-500/50 hover:shadow-red-500/10" },
        Course: { badge: "bg-green-500/20 text-green-400", card: "bg-slate-800/50 border-slate-700 hover:border-green-500/50 hover:shadow-green-500/10" },
        Tool: { badge: "bg-violet-500/20 text-violet-400", card: "bg-slate-800/50 border-slate-700 hover:border-violet-500/50 hover:shadow-violet-500/10" },
        Other: { badge: "bg-slate-700 text-slate-400", card: "bg-slate-800/50 border-slate-700 hover:border-primary/50 hover:shadow-primary/10" },
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl ${style.card}`}
        >
            <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                    {typeLabels[resource.type] || resource.type}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{resource.description}</p>
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
