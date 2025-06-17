'use client';
import React from "react";
import { SignInButton } from "@/components/userActions/signinButton";


export default function LoginPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/thecollegetouruniversityofhouston_opengraph.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded shadow">
        <SignInButton />
      </div>
    </div>
  );
}

