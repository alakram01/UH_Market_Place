// src/components/userActions/SignInButton.tsx
"use client";

import React from "react";
import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";

export const SignInButton = () => {
    const handleLogin = async () => {
        try {
            const loginResponse = await msalinstance.loginPopup(loginRequest);
            const account = loginResponse.account;

            const tokenResponse = await msalinstance.acquireTokenSilent({
                ...loginRequest,
                account,
            });

            const accessToken = tokenResponse.accessToken;

            const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const userProfile = await graphResponse.json();

            await fetch("/api/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
            });

            alert(`Signed in as ${userProfile.displayName}`);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check console for more info.");
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Sign In with Microsoft
        </button>
    );
};

