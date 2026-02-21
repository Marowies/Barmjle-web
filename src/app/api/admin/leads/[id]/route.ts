import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const { status } = await request.json();
        const validStatuses = ["new", "contacted", "inprogress", "closed"];

        if (!validStatuses.includes(status)) {
            return errorResponse("حالة غير صالحة", 400);
        }

        const lead = await prisma.lead.update({
            where: { id: params.id },
            data: { status },
        });

        return successResponse({ data: lead });
    } catch (err) {
        console.error("Lead update error:", err);
        return errorResponse("خطأ في تحديث الطلب");
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await prisma.lead.update({
            where: { id: params.id },
            data: { isDeleted: true },
        });

        return successResponse({ message: "تم حذف الطلب" });
    } catch (err) {
        console.error("Lead delete error:", err);
        return errorResponse("خطأ في حذف الطلب");
    }
}
