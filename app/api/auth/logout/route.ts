import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session"; // A function to clear the session

export async function POST(): Promise<NextResponse> {
    try {
        // Call the function to clear the session (e.g., delete the token or session from the database)
        await clearSession();

        // Return a successful response
        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.log("LOGOUT: ", error);

        return NextResponse.json(
            { error: "Failed to log out" },
            { status: 500 },
        );
    }
}
