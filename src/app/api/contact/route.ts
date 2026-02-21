import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2),
    university: z.string().optional(),
    serviceType: z.string().min(1),
    deadline: z.string().optional(),
    message: z.string().min(10),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = formSchema.parse(body);

        const lead = await prisma.lead.create({
            data: {
                name: validatedData.name,
                university: validatedData.university || null,
                serviceType: validatedData.serviceType,
                deadline: validatedData.deadline || null,
                message: validatedData.message,
            },
        });

        return NextResponse.json({ success: true, message: "Lead received", leadId: lead.id });
    } catch (error) {
        console.error("API Error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: "Validation error", errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
