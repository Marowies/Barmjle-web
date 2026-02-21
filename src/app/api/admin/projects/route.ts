import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { projectRepo } from "@/lib/repositories/project.repo";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const projects = await projectRepo.findAll();
        return successResponse({ data: projects });
    } catch (err) {
        console.error("Projects fetch error:", err);
        return errorResponse("خطأ في جلب المشاريع");
    }
}

export async function POST(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, imagePath, demoUrl, tags, featured } = body;

        if (!title?.trim() || !description?.trim()) {
            return errorResponse("العنوان والوصف مطلوبان", 400);
        }

        const project = await projectRepo.create({
            title,
            description,
            imagePath: imagePath || null,
            demoUrl: demoUrl || null,
            tags: tags || null,
            featured: featured || false,
        });

        return successResponse({ data: project }, 201);
    } catch (err) {
        console.error("Project create error:", err);
        return errorResponse("خطأ في إنشاء المشروع");
    }
}
