import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { isDeleted: false },
            orderBy: { displayOrder: "asc" },
        });
        return NextResponse.json({ success: true, data: services });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
