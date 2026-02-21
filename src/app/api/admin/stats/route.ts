import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const [
            totalRequests,
            newRequests,
            totalServices,
            totalProjects,
            totalResources,
            latestRequests,
        ] = await Promise.all([
            prisma.lead.count({ where: { isDeleted: false } }),
            prisma.lead.count({ where: { status: "new", isDeleted: false } }),
            prisma.service.count({ where: { isDeleted: false } }),
            prisma.project.count({ where: { isDeleted: false } }),
            prisma.resource.count({ where: { isDeleted: false } }),
            prisma.lead.findMany({
                where: { isDeleted: false },
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
        ]);

        return successResponse({
            data: {
                totalRequests,
                newRequests,
                totalServices,
                totalProjects,
                totalResources,
                latestRequests,
            },
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        return errorResponse("خطأ في جلب الإحصائيات");
    }
}
