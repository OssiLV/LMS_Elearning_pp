import { isSamePass } from "@/lib/hash-password";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import ms from "ms";

interface PostBody {
    email: string;
    password: string;
}
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION = "1h";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        if (!SECRET_KEY) {
            throw new Error(
                "JWT_SECRET_KEY environment variable is not defined.",
            );
        }
        const cookieStore = await cookies();
        // Parse request body
        const body: PostBody = await request.json();
        // Validate required fields
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 },
            );
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User email not found" },
                { status: 401 },
            );
        }

        // Hash password
        const isCorrectPassword = await isSamePass(
            password,
            existingUser.password,
        );

        if (isCorrectPassword) {
            const token = jwt.sign(
                {
                    id: existingUser.id,
                    email: existingUser.email,
                    name: existingUser.name,
                },
                SECRET_KEY,
                { expiresIn: JWT_EXPIRATION },
            );
            cookieStore.set("token", token, {
                expires: Date.now() + ms(JWT_EXPIRATION),
            });
            return NextResponse.json(
                {
                    token: token,
                    user: { id: existingUser.id, email: existingUser.email },
                },
                { status: 200 },
            );
        } else {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 },
            );
        }
    } catch (error: any) {
        console.error("Error user sign-in:", { error });

        // Handle Prisma-specific errors (e.g., unique constraint violation)
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Unexpected error" },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
