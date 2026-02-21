"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Trash2, Eye, Filter } from "lucide-react";

const statusLabels: Record<string, string> = {
    new: "جديد",
    contacted: "تم التواصل",
    inprogress: "قيد التنفيذ",
    closed: "مغلق",
};

const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    inprogress: "bg-purple-100 text-purple-700",
    closed: "bg-green-100 text-green-700",
};

export default function RequestsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedLead, setSelectedLead] = useState<any | null>(null);

    useEffect(() => {
        fetchLeads();
    }, [filter]);

    async function fetchLeads() {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/leads?status=${filter}`);
            const json = await res.json();
            if (json.success) setLeads(json.data);
        } catch {
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: string) {
        await fetch(`/api/admin/leads/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchLeads();
        if (selectedLead?.id === id) {
            setSelectedLead({ ...selectedLead, status });
        }
    }

    async function deleteLead(id: string) {
        if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
        await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
        fetchLeads();
        if (selectedLead?.id === id) setSelectedLead(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h1>
                    <p className="text-gray-500 mt-1">عرض ومتابعة جميع الطلبات المستلمة</p>
                </div>
                <span className="px-3 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full">
                    {leads.length} طلب
                </span>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-400" />
                {["all", "new", "contacted", "inprogress", "closed"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === s
                                ? "bg-cyan-600 text-white shadow-sm"
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {s === "all" ? "الكل" : statusLabels[s]}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3 text-right font-medium">الاسم</th>
                                    <th className="px-6 py-3 text-right font-medium">الجامعة</th>
                                    <th className="px-6 py-3 text-right font-medium">الخدمة</th>
                                    <th className="px-6 py-3 text-right font-medium">الحالة</th>
                                    <th className="px-6 py-3 text-right font-medium">التاريخ</th>
                                    <th className="px-6 py-3 text-right font-medium">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{lead.university || "-"}</td>
                                        <td className="px-6 py-4 text-gray-600">{lead.serviceType}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status] || "bg-gray-100"
                                                    }`}
                                            >
                                                {Object.entries(statusLabels).map(([val, label]) => (
                                                    <option key={val} value={val}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                                                    title="عرض"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                                    title="حذف"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {leads.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                                            لا توجد طلبات
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
                    <div
                        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">تفاصيل الطلب</h3>
                            <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الاسم</span>
                                <span className="font-medium text-gray-900">{selectedLead.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الجامعة</span>
                                <span className="font-medium text-gray-900">{selectedLead.university || "-"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الخدمة</span>
                                <span className="font-medium text-gray-900">{selectedLead.serviceType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الموعد</span>
                                <span className="font-medium text-gray-900">{selectedLead.deadline || "-"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الحالة</span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedLead.status]}`}>
                                    {statusLabels[selectedLead.status]}
                                </span>
                            </div>
                            <div className="py-2">
                                <span className="text-gray-500 block mb-2">الرسالة</span>
                                <p className="text-gray-900 bg-gray-50 p-3 rounded-xl leading-relaxed">{selectedLead.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
