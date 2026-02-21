"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    imagePath: string | null;
    demoUrl: string | null;
    tags: string | null;
    featured: boolean;
}

export default function ProjectShowcase() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/public/projects")
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setProjects(json.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const featured = projects.find((p) => p.featured) || projects[0];
    const others = projects.filter((p) => p.id !== featured?.id);

    if (loading) {
        return (
            <section className="py-24 bg-dark" id="projects">
                <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            </section>
        );
    }

    if (!featured) return null;

    return (
        <section className="py-24 bg-dark relative" id="projects">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">مشاريعنا المميزة</h2>
                    <p className="text-xl text-slate-400">نماذج حقيقية تعكس جودة واحترافية عملنا</p>
                </div>

                {/* Featured Project */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/30 rounded-[2.5rem] overflow-hidden border border-slate-700 backdrop-blur-sm"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-8 w-fit border border-secondary/20">
                                <Star className="w-4 h-4" fill="currentColor" />
                                مشروع متميز
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                {featured.title}
                            </h3>

                            <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                                {featured.description}
                            </p>

                            {featured.tags && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {featured.tags.split(",").map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-5">
                                {featured.demoUrl && (
                                    <a
                                        href={featured.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-cyan-400 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-3"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        عرض المشروع
                                    </a>
                                )}
                                <a
                                    href="/contact?service=project&ref=featured"
                                    className="px-8 py-4 bg-transparent text-white border border-slate-600 rounded-2xl font-bold hover:bg-slate-800 hover:border-slate-500 transition-all flex items-center justify-center gap-3"
                                >
                                    اطلب مشروع مشابه
                                    <ArrowLeft className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="relative min-h-[400px] lg:min-h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-10 overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] group-hover:bg-secondary/30 transition-colors duration-500" />

                            <div className="relative z-10 w-full max-w-md aspect-video bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                        <ExternalLink className="w-8 h-8 text-slate-500" />
                                    </div>
                                    <span className="text-slate-500 font-medium">معاينة المشروع</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Other Projects */}
                {others.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {others.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-primary/50 transition-all"
                            >
                                <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                {project.tags && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {project.tags.split(",").map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-cyan-400 transition-colors">
                                        <ExternalLink className="w-4 h-4" /> عرض المشروع
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
