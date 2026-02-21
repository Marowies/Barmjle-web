"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X, Save, Eye, EyeOff, ExternalLink } from "lucide-react";
import { TelegramIcon } from "@/components/icons/SocialIcons";

interface Resource {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
    isVisible: boolean;
    displayOrder: number;
}

const emptyResource = { title: "", description: "", type: "Other", url: "", isVisible: true, displayOrder: 0 };
const typeOptions = ["TelegramBot", "YouTube", "Course", "Other"];
const typeLabels: Record<string, string> = { TelegramBot: "بوت تليجرام", YouTube: "يوتيوب", Course: "كورس", Other: "أخرى" };

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyResource);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchResources(); }, []);

    async function fetchResources() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/resources");
            const json = await res.json();
            if (json.success) setResources(json.data);
        } catch { } finally { setLoading(false); }
    }

    function openCreate() { setForm(emptyResource); setEditingId(null); setShowForm(true); }

    function openEdit(r: Resource) {
        setForm({ title: r.title, description: r.description, type: r.type, url: r.url, isVisible: r.isVisible, displayOrder: r.displayOrder });
        setEditingId(r.id); setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setSaving(true);
        try {
            const url = editingId ? `/api/admin/resources/${editingId}` : "/api/admin/resources";
            await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            setShowForm(false); fetchResources();
        } catch { } finally { setSaving(false); }
    }

    async function toggleVisibility(r: Resource) {
        await fetch(`/api/admin/resources/${r.id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...r, isVisible: !r.isVisible }),
        });
        fetchResources();
    }

    async function deleteResource(id: string) {
        if (!confirm("هل أنت متأكد من حذف هذا المورد؟")) return;
        await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
        fetchResources();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الموارد</h1>
                    <p className="text-gray-500 mt-1">إدارة الموارد الخارجية وبوتات تليجرام</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-medium hover:bg-cyan-700 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> إضافة مورد
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((r) => (
                        <div key={r.id} className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${r.isVisible ? "border-gray-100" : "border-dashed border-gray-300 opacity-60"}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.type === "TelegramBot" ? "bg-blue-100 text-blue-700" : r.type === "YouTube" ? "bg-red-100 text-red-700" : r.type === "Course" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                        {typeLabels[r.type] || r.type}
                                    </span>
                                    <span className="text-xs text-gray-400">#{r.displayOrder}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => toggleVisibility(r)} className={`p-2 rounded-lg transition-colors ${r.isVisible ? "hover:bg-green-50 text-green-600" : "hover:bg-gray-100 text-gray-400"}`}>
                                        {r.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => openEdit(r)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Pencil className="w-4 h-4" /></button>
                                    <button onClick={() => deleteResource(r.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{r.title}</h3>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{r.description}</p>
                            <a href={r.url} target="_blank" className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700">
                                <ExternalLink className="w-3.5 h-3.5" /> الرابط
                            </a>
                        </div>
                    ))}
                    {resources.length === 0 && <div className="col-span-full text-center py-16 text-gray-400">لا توجد موارد. أضف مورد جديد!</div>}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{editingId ? "تعديل المورد" : "إضافة مورد جديد"}</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان *</label>
                                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف *</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none">
                                        {typeOptions.map((t) => <option key={t} value={t}>{typeLabels[t]}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                                    <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الرابط *</label>
                                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" dir="ltr" required />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="visible" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} className="w-4 h-4 text-cyan-600 rounded" />
                                <label htmlFor="visible" className="text-sm font-medium text-gray-700">مرئي للزوار</label>
                            </div>
                            <button type="submit" disabled={saving} className="w-full py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {editingId ? "حفظ التعديلات" : "إضافة المورد"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
