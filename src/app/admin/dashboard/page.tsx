"use client";

import { useEffect, useState } from "react";
import {
    MessageSquare,
    Wrench,
    FolderOpen,
    Globe,
    AlertCircle,
    Loader2,
    Clock,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    totalRequests: number;
    newRequests: number;
    totalServices: number;
    totalProjects: number;
    totalResources: number;
    latestRequests: any[];
}

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

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            const res = await fetch("/api/admin/stats");
            const json = await res.json();
            if (json.success) {
                setStats(json.data);
            } else {
                setError("فشل في جلب البيانات");
            }
        } catch {
            setError("خطأ في الاتصال");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-red-500 gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
            </div>
        );
    }

    const statCards = [
        {
            label: "إجمالي الطلبات",
            value: stats.totalRequests,
            icon: MessageSquare,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            href: "/admin/dashboard/requests",
            badge: stats.newRequests > 0 ? `${stats.newRequests} جديد` : undefined,
        },
        {
            label: "الخدمات",
            value: stats.totalServices,
            icon: Wrench,
            color: "bg-emerald-500",
            lightColor: "bg-emerald-50",
            href: "/admin/dashboard/services",
        },
        {
            label: "المشاريع",
            value: stats.totalProjects,
            icon: FolderOpen,
            color: "bg-violet-500",
            lightColor: "bg-violet-50",
            href: "/admin/dashboard/projects",
        },
        {
            label: "الموارد",
            value: stats.totalResources,
            icon: Globe,
            color: "bg-amber-500",
            lightColor: "bg-amber-50",
            href: "/admin/dashboard/resources",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
                <p className="text-gray-500 mt-1">نظرة عامة على النظام</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group relative"
                        >
                            {card.badge && (
                                <span className="absolute top-4 left-4 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                                    {card.badge}
                                </span>
                            )}
                            <div className={`w-12 h-12 ${card.lightColor} rounded-xl flex items-center justify-center mb-4`}>
                                <Icon className={`w-6 h-6 ${card.color.replace("bg-", "text-")}`} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                            <p className="text-sm text-gray-500">{card.label}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Latest Requests */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">آخر الطلبات</h2>
                            <p className="text-xs text-gray-400">آخر 5 طلبات مستلمة</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/dashboard/requests"
                        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                        عرض الكل ←
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-3 text-right font-medium">الاسم</th>
                                <th className="px-6 py-3 text-right font-medium">الخدمة</th>
                                <th className="px-6 py-3 text-right font-medium">الحالة</th>
                                <th className="px-6 py-3 text-right font-medium">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.latestRequests.map((lead: any) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{lead.serviceType}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {statusLabels[lead.status] || lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                                    </td>
                                </tr>
                            ))}
                            {stats.latestRequests.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        لا توجد طلبات بعد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
