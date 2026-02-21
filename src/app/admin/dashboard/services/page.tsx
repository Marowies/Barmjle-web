"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    targetAudience: string | null;
    benefits: string | null;
    href: string | null;
    displayOrder: number;
}

const emptyService = {
    title: "",
    description: "",
    icon: "Code",
    targetAudience: "",
    benefits: "",
    href: "",
    displayOrder: 0,
};

const iconOptions = [
    "BookOpen", "GraduationCap", "Code", "MessageSquare", "Video",
    "LayoutDashboard", "Wrench", "Globe", "Laptop", "Smartphone",
    "Database", "Server", "Shield", "Zap", "Award",
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyService);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/services");
            const json = await res.json();
            if (json.success) setServices(json.data);
        } catch {
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setForm(emptyService);
        setEditingId(null);
        setShowForm(true);
    }

    function openEdit(service: Service) {
        setForm({
            title: service.title,
            description: service.description,
            icon: service.icon,
            targetAudience: service.targetAudience || "",
            benefits: service.benefits || "",
            href: service.href || "",
            displayOrder: service.displayOrder,
        });
        setEditingId(service.id);
        setShowForm(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
            const method = editingId ? "PUT" : "POST";
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setShowForm(false);
            fetchServices();
        } catch {
        } finally {
            setSaving(false);
        }
    }

    async function deleteService(id: string) {
        if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
        await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
        fetchServices();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h1>
                    <p className="text-gray-500 mt-1">إضافة وتعديل وحذف الخدمات المعروضة</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-medium hover:bg-cyan-700 transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    إضافة خدمة
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 text-sm font-bold">
                                    {service.displayOrder}
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEdit(service)}
                                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteService(service.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{service.description}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">{service.icon}</span>
                                {service.href && (
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg truncate max-w-[150px]">{service.href}</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="col-span-full text-center py-16 text-gray-400">
                            لا توجد خدمات. أضف خدمة جديدة!
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div
                        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
                            </h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان *</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف *</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">الأيقونة</label>
                                    <select
                                        value={form.icon}
                                        onChange={(e) => setForm({ ...form, icon: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    >
                                        {iconOptions.map((icon) => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                                    <input
                                        type="number"
                                        value={form.displayOrder}
                                        onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الجمهور المستهدف</label>
                                <input
                                    value={form.targetAudience}
                                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">المميزات</label>
                                <input
                                    value={form.benefits}
                                    onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الرابط</label>
                                <input
                                    value={form.href}
                                    onChange={(e) => setForm({ ...form, href: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                    dir="ltr"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {editingId ? "حفظ التعديلات" : "إضافة الخدمة"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
