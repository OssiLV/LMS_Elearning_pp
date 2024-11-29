import { getSessionServer } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const session = await getSessionServer(request);
    if (session) {
        return NextResponse.json(
            {
                user: session,
            },
            { status: 200 },
        );
    } else {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 },
        );
    }
}
