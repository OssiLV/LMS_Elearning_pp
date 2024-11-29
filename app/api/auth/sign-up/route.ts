import { hashPass } from "@/lib/hash-password";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface PostBody {
    name?: string;
    phoneNumber?: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse request body
        const body: PostBody = await request.json();
        // Validate required fields
        const { email, password, name, phoneNumber } = body;
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

        if (existingUser) {
            return NextResponse.json(
                { error: "User email already exists" },
                { status: 409 },
            );
        }

        // Hash password
        const hashedPassword = await hashPass(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phoneNumber,
            },
        });

        return NextResponse.json(
            { user: { id: user.id, email: user.email } },
            { status: 201 },
        );
    } catch (error: unknown) {
        console.error("Error creating user:", { error });

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
