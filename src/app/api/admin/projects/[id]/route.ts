import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { projectRepo } from "@/lib/repositories/project.repo";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, imagePath, demoUrl, tags, featured } = body;

        const project = await projectRepo.update(params.id, {
            title,
            description,
            imagePath: imagePath || null,
            demoUrl: demoUrl || null,
            tags: tags || null,
            featured: Boolean(featured),
        });

        return successResponse({ data: project });
    } catch (err) {
        console.error("Project update error:", err);
        return errorResponse("خطأ في تحديث المشروع");
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        await projectRepo.softDelete(params.id);
        return successResponse({ message: "تم حذف المشروع" });
    } catch (err) {
        console.error("Project delete error:", err);
        return errorResponse("خطأ في حذف المشروع");
    }
}
