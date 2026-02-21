import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { serviceRepo } from "@/lib/repositories/service.repo";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const services = await serviceRepo.findAll();
        return successResponse({ data: services });
    } catch (err) {
        console.error("Services fetch error:", err);
        return errorResponse("خطأ في جلب الخدمات");
    }
}

export async function POST(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, icon, category, targetAudience, benefits, href, displayOrder } = body;

        if (!title?.trim() || !description?.trim()) {
            return errorResponse("العنوان والوصف مطلوبان", 400);
        }

        const service = await serviceRepo.create({
            title,
            description,
            icon: icon || "Code",
            category: category || "Other",
            targetAudience: targetAudience || null,
            benefits: benefits || null,
            href: href || null,
            displayOrder: displayOrder ?? 0,
        });

        return successResponse({ data: service }, 201);
    } catch (err) {
        console.error("Service create error:", err);
        return errorResponse("خطأ في إنشاء الخدمة");
    }
}
