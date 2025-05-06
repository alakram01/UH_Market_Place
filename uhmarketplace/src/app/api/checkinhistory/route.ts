// app/api/history/route.ts

import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { prisma } from "../../../../prisma/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";
export async function GET(req: Request) {
  // 1) Get the NextAuth session
  const session = await getServerSession(options)

  if (!session?.user?.email) {
    // 2) Not signed in
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  const email = session.user.email

  // 3) Fetch all check‑ins for this user, newest first
  const history = await prisma.userCheckIns.findMany({
    where: { email },
    orderBy: { date: 'desc' },
  })

  // 4) Return as JSON
  return NextResponse.json(history)
}
