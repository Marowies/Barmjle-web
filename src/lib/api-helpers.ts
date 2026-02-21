import { NextResponse } from "next/server";
import { getSession, SessionPayload } from "@/lib/auth";

export async function requireAdmin(): Promise<{ error: NextResponse | null; session: SessionPayload | null }> {
    const session = await getSession();
    if (!session) {
        return { error: NextResponse.json({ success: false, message: "غير مصرح" }, { status: 401 }), session: null };
    }
    return { error: null, session };
}

export async function requireSuperAdmin(): Promise<{ error: NextResponse | null; session: SessionPayload | null }> {
    const session = await getSession();
    if (!session) {
        return { error: NextResponse.json({ success: false, message: "غير مصرح" }, { status: 401 }), session: null };
    }
    if (session.role !== "SuperAdmin") {
        return { error: NextResponse.json({ success: false, message: "هذا الإجراء للمشرف الرئيسي فقط" }, { status: 403 }), session: null };
    }
    return { error: null, session };
}

export function successResponse(data: object, status = 200) {
    return NextResponse.json({ success: true, ...data }, { status });
}

export function errorResponse(message: string, status = 500) {
    return NextResponse.json({ success: false, message }, { status });
}
