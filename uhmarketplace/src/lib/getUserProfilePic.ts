// lib/getUserProfilePic.ts
import { prisma } from "../../prisma/prisma";

export async function getUserProfilePic(email: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { profilePicUrl: true },
  });
  return user?.profilePicUrl || null;
}
