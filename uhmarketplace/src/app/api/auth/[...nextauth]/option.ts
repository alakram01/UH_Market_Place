import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma"; // adjust path if needed

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID!,
      authorization: {
        params: { scope: 'openid email profile User.Read offline_access' },
      },
      httpOptions: { timeout: 10000 },
    }),
    CredentialsProvider({
      name: "Custom MSAL Login",
      credentials: {
        email: { label: "Email", type: "text" },
        name: { label: "Name", type: "text" },
        profilePicUrl: { label: "Profile Picture", type: "text" },
      },
      async authorize(credentials) {
        const { email, name, profilePicUrl } = credentials ?? {};

        if (!email || !name) return null;

        const user = await prisma.user.upsert({
          where: { email },
          update: { name, profilePicUrl },
          create: { email, name, profilePicUrl },
        });

        return {
          id: user.id.toString(), // ✅ must be string per NextAuth type
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
};