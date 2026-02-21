"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X, Save, Star, ExternalLink } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    imagePath: string | null;
    demoUrl: string | null;
    tags: string | null;
    featured: boolean;
}

const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    imagePath: "",
    demoUrl: "",
    tags: "",
    featured: false,
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyProject);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchProjects(); }, []);

    async function fetchProjects() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/projects");
            const json = await res.json();
            if (json.success) setProjects(json.data);
        } catch { } finally { setLoading(false); }
    }

    function openCreate() { setForm(emptyProject); setEditingId(null); setShowForm(true); }

    function openEdit(p: Project) {
        setForm({ title: p.title, description: p.description, imagePath: p.imagePath || "", demoUrl: p.demoUrl || "", tags: p.tags || "", featured: p.featured });
        setEditingId(p.id); setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSaving(true);
        try {
            const url = editingId ? `/api/admin/projects/${editingId}` : "/api/admin/projects";
            await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setShowForm(false); fetchProjects();
        } catch { } finally { setSaving(false); }
    }

    async function deleteProject(id: string) {
        if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
        await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
        fetchProjects();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h1>
                    <p className="text-gray-500 mt-1">إضافة وتعديل وحذف المشاريع المعروضة</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-medium hover:bg-cyan-700 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> إضافة مشروع
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p) => (
                        <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all relative">
                            {p.featured && (
                                <span className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                    <Star className="w-3 h-3" fill="currentColor" /> مميز
                                </span>
                            )}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                                    <span className="text-xs font-bold">{p.title.charAt(0)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => openEdit(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                                    <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                            {p.tags && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {p.tags.split(",").slice(0, 3).map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg">{tag.trim()}</span>
                                    ))}
                                </div>
                            )}
                            {p.demoUrl && (
                                <a href={p.demoUrl} target="_blank" className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700">
                                    <ExternalLink className="w-3.5 h-3.5" /> عرض المشروع
                                </a>
                            )}
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-16 text-gray-400">لا توجد مشاريع. أضف مشروعاً جديداً!</div>
                    )}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{editingId ? "تعديل المشروع" : "إضافة مشروع جديد"}</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان *</label>
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف *</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">التقنيات المستخدمة (مفصولة بفاصلة)</label>
                                <input value={form.tags || ""} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, PostgreSQL" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">رابط العرض</label>
                                <input value={form.demoUrl || ""} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">مسار الصورة</label>
                                <input value={form.imagePath || ""} onChange={(e) => setForm({ ...form, imagePath: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none" dir="ltr" />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 text-cyan-600 rounded" />
                                <label htmlFor="featured" className="text-sm font-medium text-gray-700">مشروع متميز (يظهر أولاً)</label>
                            </div>
                            <button type="submit" disabled={saving} className="w-full py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {editingId ? "حفظ التعديلات" : "إضافة المشروع"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
