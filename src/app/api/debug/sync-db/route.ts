import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Starting manual database sync...");

        // Add missing columns to the 'requests' table
        await prisma.$executeRawUnsafe(`
            ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "whatsapp" TEXT;
        `);
        await prisma.$executeRawUnsafe(`
            ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "telegram" TEXT;
        `);
        await prisma.$executeRawUnsafe(`
            ALTER TABLE "requests" ADD COLUMN IF NOT EXISTS "email" TEXT;
        `);

        console.log("Database sync completed successfully.");

        return NextResponse.json({
            success: true,
            message: "تم تحديث قاعدة البيانات بنجاح! جرب إرسال الطلب الآن.",
        });
    } catch (error: any) {
        console.error("Database sync failed:", error);
        return NextResponse.json({
            success: false,
            message: "فشل تحديث قاعدة البيانات: " + error.message,
        }, { status: 500 });
    }
}
