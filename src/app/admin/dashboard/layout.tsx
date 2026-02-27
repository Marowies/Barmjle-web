import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <AdminSidebar />
            <main className="lg:mr-72 min-h-screen">
                <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
            </main>
        </div>
    );
}
