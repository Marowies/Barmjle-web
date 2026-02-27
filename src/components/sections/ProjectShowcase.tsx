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
        <section className="py-24 bg-background relative" id="projects">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">مشاريعنا المميزة</h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto text-lg">نماذج حقيقية تعكس جودة واحترافية عملنا</p>
                </div>

                {/* Featured Project */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-10 lg:p-20 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-10 w-fit border border-primary/20">
                                <Star className="w-4 h-4" fill="currentColor" />
                                مشروع متميز
                            </div>

                            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                                {featured.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg md:text-xl leading-relaxed">
                                {featured.description}
                            </p>

                            {featured.tags && (
                                <div className="flex flex-wrap gap-2.5 mb-10">
                                    {featured.tags.split(",").map((tag, i) => (
                                        <span key={i} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-6">
                                {featured.demoUrl && (
                                    <a
                                        href={featured.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-extrabold text-lg shadow-premium hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <ExternalLink className="w-6 h-6" />
                                        عرض المشروع
                                    </a>
                                )}
                                <a
                                    href="/contact?service=project&ref=featured"
                                    className="w-full sm:w-auto px-10 py-5 bg-background text-foreground border-2 border-border rounded-2xl font-bold text-lg hover:border-primary/30 hover:bg-card transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    اطلب مشروع مشابه
                                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>

                        <div className="relative min-h-[400px] lg:min-h-full bg-primary/5 flex items-center justify-center p-12 overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-700" />

                            <div className="relative z-10 w-full max-w-lg aspect-video bg-background rounded-2xl shadow-2xl border border-border flex items-center justify-center group-hover:-translate-y-4 transition-transform duration-700 overflow-hidden">
                                {featured.imagePath ? (
                                    <img src={featured.imagePath} alt={featured.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                                            <ExternalLink className="w-10 h-10 text-primary/40" />
                                        </div>
                                        <span className="text-foreground/40 font-bold text-xl uppercase tracking-widest">معاينة المشروع</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Other Projects */}
                {others.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {others.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-8 rounded-[2rem] border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-2 flex flex-col"
                            >
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>
                                {project.tags && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.split(",").map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg border border-slate-100 dark:border-slate-700">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300">
                                        عرض المشروع <ExternalLink className="w-5 h-5" />
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
