import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, imagePath, demoUrl, tags, featured } = body;

        const project = await prisma.project.update({
            where: { id: params.id },
            data: { title, description, imagePath, demoUrl, tags, featured },
        });

        return successResponse({ data: project });
    } catch (err) {
        console.error("Project update error:", err);
        return errorResponse("خطأ في تحديث المشروع");
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await prisma.project.update({
            where: { id: params.id },
            data: { isDeleted: true },
        });

        return successResponse({ message: "تم حذف المشروع" });
    } catch (err) {
        console.error("Project delete error:", err);
        return errorResponse("خطأ في حذف المشروع");
    }
}
