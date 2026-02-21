"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    Wrench,
    FolderOpen,
    Globe,
    LogOut,
    Code2,
    Menu,
    X,
    UserCog,
    Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
    superAdminOnly?: boolean;
}

const navItems: NavItem[] = [
    { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
    { href: "/admin/dashboard/requests", label: "الطلبات", icon: MessageSquare },
    { href: "/admin/dashboard/services", label: "الخدمات", icon: Wrench },
    { href: "/admin/dashboard/projects", label: "المشاريع", icon: FolderOpen },
    { href: "/admin/dashboard/resources", label: "الموارد", icon: Globe },
    { href: "/admin/dashboard/admin-management", label: "المشرفون", icon: UserCog, superAdminOnly: true },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((json) => {
                if (json.success) {
                    setUserRole(json.data.role);
                    setUsername(json.data.username);
                }
            })
            .catch(() => { });
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const isActive = (href: string) => {
        if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
        return pathname.startsWith(href);
    };

    const visibleItems = navItems.filter((item) => !item.superAdminOnly || userRole === "SuperAdmin");

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-3 text-gray-900 font-bold text-xl">
                    <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="block leading-tight">برمجلي</span>
                        <span className="text-xs font-normal text-gray-400">لوحة التحكم</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                    ? "bg-cyan-50 text-cyan-700 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? "text-cyan-600" : ""}`} />
                            {item.label}
                            {item.superAdminOnly && (
                                <span className="mr-auto px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">SA</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout */}
            <div className="p-4 border-t border-gray-200 space-y-2">
                {username && (
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-900">@{username}</p>
                            <p className={`text-xs ${userRole === "SuperAdmin" ? "text-purple-500" : "text-blue-500"}`}>
                                {userRole === "SuperAdmin" ? "مشرف رئيسي" : "مشرف"}
                            </p>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                >
                    <LogOut className="w-5 h-5" />
                    تسجيل خروج
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200"
            >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-72 bg-white border-l border-gray-200 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                    }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
