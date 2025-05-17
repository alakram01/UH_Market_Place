"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { SignInButton } from 'src/components/userActions/signinButton';
import { SignOutButton } from 'src/components/userActions/signoutButton';



import { useIsAuthenticated } from '@azure/msal-react';

export default function LoginPage() {
    const handleMicrosoftLogin = async () => {
        await signIn("azure-ad", {
            callbackUrl: "/marketplace" // or wherever you want to redirect after login
        });
    };

    return (
        <>
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
                 <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Microsoft Identity Platform
                </a>
                <div className="collapse navbar-collapse justify-content-end">
                    {useIsAuthenticated() ? <SignOutButton /> : <SignInButton />}
                </div>
            </Navbar>
                <div className="title">
                    <h5>
                        Welcome to the Microsoft Authentication Library For JavaScript - React SPA
                    </h5>
                </div>
                <div className="profileContent">
                    {props.children}
                </div>
            </div>
        </div>
        </>
    );
    
}
