import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function requireAdmin() {
    const session = await getSession();
    if (!session) {
        return { error: NextResponse.json({ message: "غير مصرح" }, { status: 401 }), session: null };
    }
    return { error: null, session };
}

export function successResponse(data: any, status = 200) {
    return NextResponse.json({ success: true, ...data }, { status });
}

export function errorResponse(message: string, status = 500) {
    return NextResponse.json({ success: false, message }, { status });
}
