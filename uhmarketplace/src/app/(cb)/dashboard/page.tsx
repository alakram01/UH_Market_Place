import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../prisma/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { Avatar, user } from "@nextui-org/react";
import Link from "next/link";
import ItemCard from "@/components/itemCard";
import axios from "axios";
import toast from "react-hot-toast";
import UserPosts from "@/components/userActions/UserPosts";
import React from "react";

// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default async function Dashboard() {
  const session = await getServerSession(options);
  const profileImage = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    // Only pulls the profilePicUrl from the user
    select: {
      profilePicUrl: true,
    },
  });

  const userPosts = await prisma.post.findMany({
    where: {
      authorEmail: session?.user?.email as string,
    },
  });

  if (!session) {
    return <a href="/api/auth/signin">Sign in</a>;
  }

    const userInfo = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }, 
        select: {   
            name: true,
            email: true,
            profilePicUrl: true,
            role: true,
        }
    })

  const rating = 4.5;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">CoogBay User Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-0 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-3 gap-3 h-[160px]">
              <div className="flex items-center space-x-4 p-5 bg-white rounded-lg">
                <div>
                  <Avatar
                      src={profileImage?.profilePicUrl}
                      alt="Profile Picture"
                      size="lg"
                  />
                </div>
                <div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Welcome, {userInfo?.name}
                    </h2>
                    <p className="text-gray-600">{session?.user?.email}</p>
                  </div>
                  <div className="gap-4">
                    <Link href={'/dashboard/userProfile'}>
                      <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded mr-2">
                        Edit Profile
                      </button>
                    </Link>
                    {userInfo?.role === 'ADMIN' && (
                        <Link href={'/adminDashboard'}>
                            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                            Admin Dashboard
                            </button>
                        </Link>
                    )}
                    <Link href={'/create_post'}>
                      <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded">
                          Create New Listing
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-4 p-5 bg-white rounded-lg">
                <div className="flex h-[24px] mt-2">
                  <div><p className="font-semibold mr-3">Marketplace Rating:</p></div>
                  <div className="flex items-center text-yellow-500 mb-1">
                    {/* Render rating stars */}
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "fill-current" : "text-gray-300"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.27l5.18 3.73-1.64-6.91L18 7.24l-6.92-.59L10 1 8.92 6.65 2 7.24l4.46 5.85-1.64 6.91L10 15.27z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
                  </div>
                </div>
                <div className="row-span-3 mt-1">
                  <p className="font-semibold">Description:</p>
                  <p>I sell used computes, and Im able to repair your computer when needed!</p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-lg">
                <p className="mt-2 font-semibold">Tutoring History:</p>
                <p>Johny Whales - March 24, 2025</p>
                <p>Ballie Bells - April 3, 2025</p>
              </div>
            </div>
            <div className="rounded-lg h-96 bg-white mt-4">
              {session ? (
                <div className="mt-6">
                  <h3 className="ml-6 pt-8 pl-4 text-2xl font-medium font-semibold">Your Listings:</h3>
                  {/* <ul className="mt-2"> */}
                  <div className="overflow-y-auto max-h-96">
                  {userPosts.length > 0 ? (
                          <UserPosts userPosts={userPosts} />
                      ) : (
                          <p className="text-center text-gray-600 mt-8">
                          No listings, create one now!
                          </p>
                      )}
                  </div>
                </div>
              ) : (
                <p>Please sign in to view your dashboard.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}