import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { serviceRepo } from "@/lib/repositories/service.repo";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, icon, category, targetAudience, benefits, href, displayOrder, isActive } = body;

        const service = await serviceRepo.update(params.id, {
            title,
            description,
            icon,
            category,
            targetAudience: targetAudience || null,
            benefits: benefits || null,
            href: href || null,
            displayOrder,
            isActive,
        });

        return successResponse({ data: service });
    } catch (err) {
        console.error("Service update error:", err);
        return errorResponse("خطأ في تحديث الخدمة");
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await serviceRepo.softDelete(params.id);
        return successResponse({ message: "تم حذف الخدمة" });
    } catch (err) {
        console.error("Service delete error:", err);
        return errorResponse("خطأ في حذف الخدمة");
    }
}
