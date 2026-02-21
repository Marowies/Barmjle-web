import { requireAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { requestRepo } from "@/lib/repositories/request.repo";
import { serviceRepo } from "@/lib/repositories/service.repo";
import { projectRepo } from "@/lib/repositories/project.repo";
import { resourceRepo } from "@/lib/repositories/resource.repo";

export const dynamic = "force-dynamic";

export async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;

    try {
        const [
            totalRequests,
            newRequests,
            totalServices,
            totalProjects,
            totalResources,
            latestRequests,
        ] = await Promise.all([
            requestRepo.countAll(),
            requestRepo.countByStatus("New"),
            serviceRepo.count(),
            projectRepo.count(),
            resourceRepo.count(),
            requestRepo.findLatest(5),
        ]);

        return successResponse({
            data: {
                totalRequests,
                newRequests,
                totalServices,
                totalProjects,
                totalResources,
                latestRequests,
            },
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        return errorResponse("خطأ في جلب الإحصائيات");
    }
}
