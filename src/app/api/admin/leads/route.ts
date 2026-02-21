import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        const where: any = { isDeleted: false };
        if (status && status !== "all") {
            where.status = status;
        }

        const leads = await prisma.lead.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return successResponse({ data: leads });
    } catch (err) {
        console.error("Leads fetch error:", err);
        return errorResponse("خطأ في جلب الطلبات");
    }
}
