import { NextRequest, NextResponse } from "next/server";
import { getSessionServer } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const session = await getSessionServer(request);

    // If session is invalid, redirect to login
    if (!session) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    // If session is valid, proceed with the request
    return NextResponse.next();
}

export const config = {
    matcher: ["/account"], // Apply middleware to these routes
};
