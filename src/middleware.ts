import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession, decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Allow login page
        if (request.nextUrl.pathname === "/admin/login") {
            return await updateSession(request);
        }

        const session = request.cookies.get("session")?.value;
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const parsed = await decrypt(session);
        if (!parsed) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        return await updateSession(request);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
