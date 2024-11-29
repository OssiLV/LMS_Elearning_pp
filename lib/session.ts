import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function getSessionServer(request: NextRequest) {
    try {
        if (!SECRET_KEY) {
            throw new Error(
                "JWT_SECRET_KEY environment variable is not defined.",
            );
        }
        const cookieStore = await cookies();
        const localToken = cookieStore.get("token")?.value;

        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ") || !localToken) {
            return null;
        }
        const token = authHeader.split(" ")[1]
            ? authHeader.split(" ")[1]
            : localToken;

        const decoded = jwt.verify(token as string, SECRET_KEY as string);

        return decoded;
    } catch (error: any) {
        console.error("Token verification failed:", error);
        return null; // If token is invalid or expired, return null (session is invalid)
    }
}

export async function clearSession() {
    // Clear the session cookie (or whatever method you're using)
    const cookieStore = await cookies();
    cookieStore.set("token", "", { maxAge: -1 }); // Set the cookie to expire immediately

    // Optionally, if you're storing sessions in a database, invalidate the session
    // await invalidateSessionInDatabase(request);
}
