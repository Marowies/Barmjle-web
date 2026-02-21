import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, icon, targetAudience, benefits, href, displayOrder } = body;

        const service = await prisma.service.update({
            where: { id: params.id },
            data: {
                title,
                description,
                icon,
                targetAudience,
                benefits,
                href,
                displayOrder,
            },
        });

        return successResponse({ data: service });
    } catch (err) {
        console.error("Service update error:", err);
        return errorResponse("خطأ في تحديث الخدمة");
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await prisma.service.update({
            where: { id: params.id },
            data: { isDeleted: true },
        });

        return successResponse({ message: "تم حذف الخدمة" });
    } catch (err) {
        console.error("Service delete error:", err);
        return errorResponse("خطأ في حذف الخدمة");
    }
}
