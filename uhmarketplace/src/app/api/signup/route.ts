import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        console.log("Request received");
        const body = await req.json();
        console.log("Parsed body:", body);

        const email = body.email?.toLowerCase().trim();
        const password = body.password;
        const name = body.name;

        console.log("Email after trim/lowercase:", email);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        console.log("Existing user lookup:", existingUser);

        if (existingUser) {
            console.log("User already exists, returning 409");
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const hashPass = await hash(password, 10);
        console.log("Password hashed");

        if (email?.endsWith("@uh.edu") || email?.endsWith("@gmail.com")) {
            await prisma.user.create({
                data: {
                    email,
                    hashedPassword: hashPass,
                    name
                }
            });
            console.log("User created successfully in database");
        } else {
            console.log("Invalid email domain");
            return NextResponse.json({ message: "This email is not a valid UH email" }, { status: 400 });
        }

        const verificationToken = await generateVerificationToken(email);
        console.log("Generated verification token:", verificationToken);

        await sendVerificationEmail(email, verificationToken.token);
        console.log("Sent verification email");

        return NextResponse.json({ message: "Signup successful, verification email sent" });
    } catch (error) {
        console.error("Error occurred in signup route:", error);
        return NextResponse.json({ error: "Internal Server Error", detail: error }, { status: 500 });
    }
}
