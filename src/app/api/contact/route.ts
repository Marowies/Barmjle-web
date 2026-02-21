import { NextResponse } from "next/server";
import { requestRepo } from "@/lib/repositories/request.repo";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب"),
    university: z.string().optional(),
    serviceNeeded: z.string().min(1, "الخدمة المطلوبة مطلوبة"),
    deadline: z.string().optional(),
    message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = formSchema.parse(body);

        const newRequest = await requestRepo.create({
            name: validated.name,
            university: validated.university || undefined,
            serviceNeeded: validated.serviceNeeded,
            deadline: validated.deadline || undefined,
            message: validated.message,
        });

        return NextResponse.json({ success: true, message: "تم استلام طلبك بنجاح", requestId: newRequest.id });
    } catch (error) {
        console.error("Contact API Error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: "بيانات غير صالحة", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json({ success: false, message: "خطأ في السيرفر" }, { status: 500 });
    }
}
