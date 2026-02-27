import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession, decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        // Skip check for login page
        if (pathname === "/admin/login") {
            return NextResponse.next();
        }

        const session = request.cookies.get("barmajli_auth_session")?.value;

        // 1. Check if session cookie exists
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // 2. Check if session is valid
        const parsed = await decrypt(session);
        if (!parsed) {
            const response = NextResponse.redirect(new URL("/admin/login", request.url));
            response.cookies.delete("barmajli_auth_session"); // Clear invalid cookie
            return response;
        }

        // 3. Valid session, refresh if needed and proceed
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
