"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, X, Save, UserCircle, Shield, ShieldCheck } from "lucide-react";

interface AdminUser {
    id: string;
    fullName: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

const emptyForm = { fullName: "", username: "", email: "", password: "", role: "Admin" as "Admin" | "SuperAdmin" };

export default function AdminManagementPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => { fetchAdmins(); }, []);

    async function fetchAdmins() {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/create-admin");
            const json = await res.json();
            if (json.success) setAdmins(json.data);
        } catch { } finally { setLoading(false); }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch("/api/admin/create-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                setSuccess(`تم إنشاء المشرف "${form.username}" بنجاح`);
                setForm(emptyForm);
                setShowForm(false);
                fetchAdmins();
            } else {
                setError(json.message || "حدث خطأ");
            }
        } catch { setError("خطأ في الاتصال"); } finally { setSaving(false); }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إدارة المشرفين</h1>
                    <p className="text-gray-500 mt-1">إنشاء وإدارة حسابات المشرفين</p>
                </div>
                <button onClick={() => { setShowForm(true); setError(""); setSuccess(""); }} className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-sm font-medium hover:bg-cyan-700 transition-all shadow-sm">
                    <Plus className="w-4 h-4" /> إضافة مشرف
                </button>
            </div>

            {success && <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">{success}</div>}

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-3 text-right font-medium">المشرف</th>
                                <th className="px-6 py-3 text-right font-medium">البريد</th>
                                <th className="px-6 py-3 text-right font-medium">الدور</th>
                                <th className="px-6 py-3 text-right font-medium">تاريخ الإنشاء</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                                                <UserCircle className="w-5 h-5 text-cyan-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{admin.fullName}</p>
                                                <p className="text-xs text-gray-400">@{admin.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-xs" dir="ltr">{admin.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${admin.role === "SuperAdmin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                                            {admin.role === "SuperAdmin" ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                            {admin.role === "SuperAdmin" ? "مشرف رئيسي" : "مشرف"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {new Date(admin.createdAt).toLocaleDateString("ar-EG")}
                                    </td>
                                </tr>
                            ))}
                            {admins.length === 0 && (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">لا يوجد مشرفون</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">إضافة مشرف جديد</h3>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        {error && <p className="mb-4 text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
                                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم *</label>
                                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" dir="ltr" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" dir="ltr" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور *</label>
                                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none" dir="ltr" required minLength={8} />
                                <p className="text-xs text-gray-400 mt-1">8 أحرف على الأقل</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "Admin" | "SuperAdmin" })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none">
                                    <option value="Admin">مشرف</option>
                                    <option value="SuperAdmin">مشرف رئيسي</option>
                                </select>
                            </div>
                            <button type="submit" disabled={saving} className="w-full py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                إنشاء المشرف
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
