import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma"; // Import your Prisma client

export async function POST(req: NextRequest) {
    try {
        // Get user data from the request body
        const userProfile = await req.json();
        const { id,  mail, userPrincipalName } = userProfile;

        // Determine email (either use `mail` or `userPrincipalName`)
        const email = mail || userPrincipalName;

        // Check if a user with the same email already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            // If user exists, return a message indicating that the user is already in the database
            return NextResponse.json({ message: "User already exists." }, { status: 200 });
        }

        // If user doesn't exist, create a new user
        const newUser = await prisma.user.create({
            data: {
                id,
                email,
            },
        });

        // Return a success message
        return NextResponse.json({ message: "User data saved successfully!", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ error: "Failed to save user data." }, { status: 500 });
    }
}