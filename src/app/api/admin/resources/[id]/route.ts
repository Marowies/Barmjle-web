import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { resourceRepo } from "@/lib/repositories/resource.repo";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, type, url, isVisible, displayOrder } = body;

        const resource = await resourceRepo.update(params.id, {
            title,
            description,
            type,
            url,
            isVisible: isVisible !== undefined ? Boolean(isVisible) : undefined,
            displayOrder,
        });

        return successResponse({ data: resource });
    } catch (err) {
        console.error("Resource update error:", err);
        return errorResponse("خطأ في تحديث المورد");
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await resourceRepo.softDelete(params.id);
        return successResponse({ message: "تم حذف المورد" });
    } catch (err) {
        console.error("Resource delete error:", err);
        return errorResponse("خطأ في حذف المورد");
    }
}
