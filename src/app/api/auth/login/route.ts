import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const admin = await prisma.admin.findUnique({
            where: { username },
        });

        if (!admin) {
            return NextResponse.json({ message: "بيانات الدخوال غير صحيحة" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            return NextResponse.json({ message: "بيانات الدخول غير صحيحة" }, { status: 401 });
        }

        // Create session
        const session = await encrypt({ id: admin.id, username: admin.username });

        const response = NextResponse.json({ success: true });
        response.cookies.set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
    }
}
