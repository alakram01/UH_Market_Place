'use client';
import React from "react";
import { SignInButton } from "@/components/userActions/signinButton";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <SignInButton />
      </div>
    </div>
  );
}

