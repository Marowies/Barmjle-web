import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "barmajli-super-secret-change-in-production";
const key = new TextEncoder().encode(SECRET_KEY);

export interface SessionPayload {
    id: string;
    username: string;
    role: string;
    expires?: Date;
}

export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload as any)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<SessionPayload | null> {
    const session = cookies().get("barmajli_auth_session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function logout() {
    cookies().delete("barmajli_auth_session");
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("barmajli_auth_session")?.value;
    if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const parsed = await decrypt(session);
    if (!parsed) {
        const res = NextResponse.redirect(new URL("/admin/login", request.url));
        res.cookies.delete("barmajli_auth_session");
        return res;
    }

    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "barmajli_auth_session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
        path: "/",
        secure: process.env.NODE_ENV === "production",
    });
    return res;
}
