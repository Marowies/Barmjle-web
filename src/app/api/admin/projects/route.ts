import { prisma } from "@/lib/prisma";
import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const projects = await prisma.project.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: "desc" },
        });
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

        if (!title || !description) {
            return errorResponse("العنوان والوصف مطلوبان", 400);
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                imagePath: imagePath || null,
                demoUrl: demoUrl || null,
                tags: tags || null,
                featured: featured || false,
            },
        });

        return successResponse({ data: project }, 201);
    } catch (err) {
        console.error("Project create error:", err);
        return errorResponse("خطأ في إنشاء المشروع");
    }
}
