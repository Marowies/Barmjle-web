import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { resourceRepo } from "@/lib/repositories/resource.repo";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const resources = await resourceRepo.findAll();
        return successResponse({ data: resources });
    } catch (err) {
        console.error("Resources fetch error:", err);
        return errorResponse("خطأ في جلب الموارد");
    }
}

export async function POST(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const { title, description, type, url, isVisible, displayOrder } = body;

        if (!title?.trim() || !description?.trim() || !url?.trim()) {
            return errorResponse("العنوان والوصف والرابط مطلوبان", 400);
        }

        const resource = await resourceRepo.create({
            title,
            description,
            type: type || "Other",
            url,
            isVisible: isVisible !== undefined ? isVisible : true,
            displayOrder: displayOrder ?? 0,
        });

        return successResponse({ data: resource }, 201);
    } catch (err) {
        console.error("Resource create error:", err);
        return errorResponse("خطأ في إنشاء المورد");
    }
}
