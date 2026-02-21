import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { requestRepo } from "@/lib/repositories/request.repo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "all";
        const requests = await requestRepo.findAll(status);
        return successResponse({ data: requests });
    } catch (err) {
        console.error("Requests fetch error:", err);
        return errorResponse("خطأ في جلب الطلبات");
    }
}
