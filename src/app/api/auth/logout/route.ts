import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    cookies().delete("barmajli_auth_session");
    return NextResponse.json({ success: true });
}
