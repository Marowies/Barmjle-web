import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const resources = await prisma.resource.findMany({
            where: { isDeleted: false, isVisible: true },
            orderBy: { displayOrder: "asc" },
        });
        return NextResponse.json({ success: true, data: resources });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
