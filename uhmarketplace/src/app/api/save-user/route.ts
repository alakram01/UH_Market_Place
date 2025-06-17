import { prisma } from "../../../../prisma/prisma"; // Import your Prisma client
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Only if you don't have MS ID as ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { displayName, mail, userPrincipalName } = body;

    const email = mail || userPrincipalName; // some MS Graph users have mail=null
    const name = displayName;
    const id = uuidv4(); // optional if you don't already have a unique ID

    if (!email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      console.log("Created new user:", newUser);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
