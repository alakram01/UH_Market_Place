// app/api/analytics/route.ts

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { prisma } from '../../../../prisma/prisma'

export async function GET(req: Request) {
  // 1) Authenticate
  const session = await getServerSession(options)
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  const email = session.user.email

  // 2) Fetch average sentiment per day
  const dailySentiment = await prisma.userCheckIns.groupBy({
    by: ['date'],
    where: { email },
    _avg: { sentimentScore: true },
    orderBy: { date: 'asc' },
  })

  // 3) Fetch top 5 product recommendations
  const topRecs = await prisma.userCheckIns.groupBy({
    by: ['productRec'],
    where: { email },
    _count: { productRec: true },
    orderBy: { _count: { productRec: 'desc' } },
    take: 5,
  })

  // 4) Return both datasets
  return NextResponse.json({ dailySentiment, topRecs })
}
