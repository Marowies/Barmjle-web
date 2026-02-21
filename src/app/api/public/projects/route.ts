import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, data: projects });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
