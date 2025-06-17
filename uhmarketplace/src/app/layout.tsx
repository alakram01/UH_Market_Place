import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/option"; // ✅ added
import { AuthProvider } from "./api/auth/hooks/auth-provider";
import { getUserProfilePic } from "@/lib/getUserProfilePic";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoogBay",
  description: "UH Marketplace App",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions); // ✅ FIXED

  const profilePicUrl = session?.user?.email
    ? await getUserProfilePic(session.user.email)
    : null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Header session={session} profilePicUrl={profilePicUrl} />
          {children}
          {modal}
        </AuthProvider>
      </body>
    </html>
  );
}

/**
 * Wrapping your entire app in the AuthProvider
 * Showing the header with user session + profile picture
 * Rendering all pages (children) and any modal routes (modal)
 * Fetching the current session with getServerSession(authOptions)
 * ------------
 */