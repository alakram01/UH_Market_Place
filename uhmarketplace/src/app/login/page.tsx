"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
    const handleMicrosoftLogin = async () => {
        await signIn("azure-ad", {
            callbackUrl: "/marketplace" // or wherever you want to redirect after login
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url('/thecollegetouruniversityofhouston_opengraph.jpg')" }}>
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300">

                {/* Left Side - Image */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
                    <img
                        src="/Login-pic-testing.jpg"
                        alt="University of Houston Logo"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Side - Microsoft Login */}
                <div className="w-full md:w-1/2 p-8" style={{ backgroundColor: 'white' }}>
                    <h1 className="text-3xl font-semibold mb-6">Login with Microsoft</h1>

                    <button
                        onClick={handleMicrosoftLogin}
                        className="w-full py-2 mb-4 text-white rounded-lg flex justify-center items-center hover:bg-blue-700 transition duration-300"
                        style={{ backgroundColor: '#2F2F8F' }} // Microsoft blue
                    >
                        Sign in with Microsoft
                    </button>

                    {/* Optional - Remove if not needed */}
                    <div className="text-center mt-4">
                        <Link href="/" className="text-blue-600 hover:underline">
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
