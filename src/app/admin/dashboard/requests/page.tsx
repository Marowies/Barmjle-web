"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Trash2, Eye, Filter } from "lucide-react";

const statusLabels: Record<string, string> = {
    New: "جديد",
    Contacted: "تم التواصل",
    InProgress: "قيد التنفيذ",
    Closed: "مغلق",
};

const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    InProgress: "bg-purple-100 text-purple-700",
    Closed: "bg-green-100 text-green-700",
};

interface Request {
    id: string;
    name: string;
    university: string | null;
    serviceNeeded: string;
    deadline: string | null;
    message: string;
    status: string;
    createdAt: string;
}

export default function RequestsPage() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState<Request | null>(null);

    useEffect(() => { fetchRequests(); }, [filter]);

    async function fetchRequests() {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/requests?status=${filter}`);
            const json = await res.json();
            if (json.success) setRequests(json.data);
        } catch { } finally { setLoading(false); }
    }

    async function updateStatus(id: string, status: string) {
        await fetch(`/api/admin/requests/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchRequests();
        if (selected?.id === id) setSelected({ ...selected, status });
    }

    async function deleteRequest(id: string) {
        if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
        await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
        fetchRequests();
        if (selected?.id === id) setSelected(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h1>
                    <p className="text-gray-500 mt-1">عرض ومتابعة جميع الطلبات المستلمة</p>
                </div>
                <span className="px-3 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-medium rounded-full">
                    {requests.length} طلب
                </span>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-400" />
                {[{ val: "all", label: "الكل" }, { val: "New", label: "جديد" }, { val: "Contacted", label: "تم التواصل" }, { val: "InProgress", label: "قيد التنفيذ" }, { val: "Closed", label: "مغلق" }].map((s) => (
                    <button
                        key={s.val}
                        onClick={() => setFilter(s.val)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === s.val ? "bg-cyan-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>
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
                                {requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{req.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{req.university || "-"}</td>
                                        <td className="px-6 py-4 text-gray-600">{req.serviceNeeded}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={req.status}
                                                onChange={(e) => updateStatus(req.id, e.target.value)}
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[req.status] || "bg-gray-100"}`}
                                            >
                                                {Object.entries(statusLabels).map(([val, label]) => (
                                                    <option key={val} value={val}>{label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {new Date(req.createdAt).toLocaleDateString("ar-EG")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setSelected(req)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors" title="عرض">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteRequest(req.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors" title="حذف">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">لا توجد طلبات</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">تفاصيل الطلب</h3>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[
                                { label: "الاسم", value: selected.name },
                                { label: "الجامعة", value: selected.university || "-" },
                                { label: "الخدمة المطلوبة", value: selected.serviceNeeded },
                                { label: "الموعد النهائي", value: selected.deadline || "-" },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">{label}</span>
                                    <span className="font-medium text-gray-900">{value}</span>
                                </div>
                            ))}
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">الحالة</span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selected.status] || "bg-gray-100"}`}>
                                    {statusLabels[selected.status] || selected.status}
                                </span>
                            </div>
                            <div className="py-2">
                                <span className="text-gray-500 block mb-2">الرسالة</span>
                                <p className="text-gray-900 bg-gray-50 p-3 rounded-xl leading-relaxed">{selected.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
