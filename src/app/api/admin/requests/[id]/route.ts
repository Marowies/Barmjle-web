import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { requestRepo } from "@/lib/repositories/request.repo";

const VALID_STATUSES = ["New", "Contacted", "InProgress", "Closed"];

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const { status } = await request.json();

        if (!VALID_STATUSES.includes(status)) {
            return errorResponse("حالة غير صالحة", 400);
        }

        const updated = await requestRepo.updateStatus(params.id, status);
        return successResponse({ data: updated });
    } catch (err) {
        console.error("Request update error:", err);
        return errorResponse("خطأ في تحديث الطلب");
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await requestRepo.softDelete(params.id);
        return successResponse({ message: "تم حذف الطلب" });
    } catch (err) {
        console.error("Request delete error:", err);
        return errorResponse("خطأ في حذف الطلب");
    }
}
