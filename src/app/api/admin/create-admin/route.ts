import { requireSuperAdmin, successResponse, errorResponse } from "@/lib/api-helpers";
import { adminUserRepo } from "@/lib/repositories/adminUser.repo";
import { z } from "zod";

const createAdminSchema = z.object({
    fullName: z.string().min(2),
    username: z.string().min(3).regex(/^[a-z0-9_]+$/, "اسم المستخدم يحتوي على أحرف لاتينية وأرقام فقط"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
    password: z.string().min(8, "كلمة المرور 8 أحرف على الأقل"),
    role: z.enum(["Admin", "SuperAdmin"]).default("Admin"),
});

export async function POST(request: Request) {
    const { error } = await requireSuperAdmin();
    if (error) return error;

    try {
        const body = await request.json();
        const data = createAdminSchema.parse(body);

        // Check for existing username/email
        const existingByUsername = await adminUserRepo.findByUsername(data.username);
        if (existingByUsername) {
            return errorResponse("اسم المستخدم موجود بالفعل", 409);
        }

        const existingByEmail = await adminUserRepo.findByEmail(data.email);
        if (existingByEmail) {
            return errorResponse("البريد الإلكتروني موجود بالفعل", 409);
        }

        const admin = await adminUserRepo.create(data);

        return successResponse({
            data: {
                id: admin.id,
                fullName: admin.fullName,
                username: admin.username,
                email: admin.email,
                role: admin.role,
            }
        }, 201);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return errorResponse(err.errors[0].message, 400);
        }
        console.error("Create admin error:", err);
        return errorResponse("خطأ في إنشاء المشرف");
    }
}

export async function GET() {
    const { error } = await requireSuperAdmin();
    if (error) return error;

    try {
        const admins = await adminUserRepo.findAll();
        return successResponse({ data: admins });
    } catch (err) {
        console.error("Get admins error:", err);
        return errorResponse("خطأ في جلب المشرفين");
    }
}
