import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    const session = await getSession();
    if (!session) return errorResponse("غير مصرح", 401);
    return successResponse({ data: { id: session.id, username: session.username, role: session.role } });
}
