import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const resources = await prisma.resource.findMany({
            where: { isDeleted: false },
            orderBy: { displayOrder: "asc" },
        });
        return successResponse({ data: resources });
    } catch (err) {
        console.error("Resources fetch error:", err);
        return errorResponse("خطأ في جلب الموارد");
    }
}

export async function POST(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, type, url, isVisible, displayOrder } = body;

        if (!title || !description || !url) {
            return errorResponse("العنوان والوصف والرابط مطلوبين", 400);
        }

        const resource = await prisma.resource.create({
            data: {
                title,
                description,
                type: type || "Other",
                url,
                isVisible: isVisible !== undefined ? isVisible : true,
                displayOrder: displayOrder || 0,
            },
        });

        return successResponse({ data: resource }, 201);
    } catch (err) {
        console.error("Resource create error:", err);
        return errorResponse("خطأ في إنشاء المورد");
    }
}
