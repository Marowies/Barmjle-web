import { NextResponse } from "next/server";
import { requestRepo } from "@/lib/repositories/request.repo";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, "الاسم مطلوب"),
    university: z.string().optional(),
    serviceNeeded: z.string().min(1, "الخدمة المطلوبة مطلوبة"),
    deadline: z.string().optional(),
    message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
    whatsapp: z.string().regex(/^\+?[0-9]*$/, "يجب أن يحتوي الواتساب على أرقام فقط").optional().or(z.literal("")),
    telegram: z.string().regex(/^@?[\w\d_]+$/, "يوزر تيليجرام غير صالح").optional().or(z.literal("")),
    email: z.string().email("البريد الإلكتروني غير صالح").optional().or(z.literal("")),
}).refine(data => {
    return !!data.whatsapp || !!data.telegram || !!data.email;
}, {
    message: "يجب إدخال وسيلة تواصل واحدة على الأقل (واتساب، تيليجرام، أو البريد الإلكتروني)",
    path: ["contact_method"] // Generic path for the form error
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = formSchema.parse(body);

        console.log("Processing contact request for:", validated.name);

        const newRequest = await requestRepo.create({
            name: validated.name,
            university: validated.university || undefined,
            serviceNeeded: validated.serviceNeeded,
            deadline: validated.deadline || undefined,
            message: validated.message,
            whatsapp: validated.whatsapp || undefined,
            telegram: validated.telegram || undefined,
            email: validated.email || undefined,
        });

        return NextResponse.json({
            success: true,
            message: "تم استلام طلبك بنجاح",
            requestId: newRequest.id
        });
    } catch (error: any) {
        console.error("Contact API Error Details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: "بيانات غير صالحة", errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: false,
            message: "حدث خطأ في الخادم أثناء معالجة طلبك. يرجى المحاولة لاحقاً.",
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
