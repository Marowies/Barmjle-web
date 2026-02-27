import { NextResponse } from "next/server";
import { adminUserRepo } from "@/lib/repositories/adminUser.repo";
import { encrypt } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ success: false, message: "اسم المستخدم وكلمة المرور مطلوبان" }, { status: 400 });
        }

        const admin = await adminUserRepo.findByUsername(username);

        if (!admin || !admin.isActive) {
            return NextResponse.json({ success: false, message: "بيانات الدخول غير صحيحة" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, admin.passwordHash);

        if (!isValid) {
            return NextResponse.json({ success: false, message: "بيانات الدخول غير صحيحة" }, { status: 401 });
        }

        const session = await encrypt({ id: admin.id, username: admin.username, role: admin.role });

        const response = NextResponse.json({ success: true, role: admin.role });
        response.cookies.set("barmajli_auth_session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: "خطأ في السيرفر" }, { status: 500 });
    }
}
