"use client";


import React from "react";
// A configured instace of MSAL PublicCLientApplication, used to handle Microsoft login
import { msalinstance } from "@/app/api/auth/msalinstance";

// loginRequest: Scopes (permissions) requested during login,
// graphConfig: Contains Microsoft Graph API endpoint like (like https://graph.microsoft.com/v1.0/me)
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";

//React component that returns a button. When click it does the MSAL auth
export const SignInButton = () => {
    const handleLogin = async () => {
        try {
            // 🔧 Make sure MSAL is initialized before calling anything else
            await msalinstance.initialize();

            // Opens a popup window for MS login   ---  The user signs in and grants permission --- You get a loginResponse with user/account info
            const loginResponse = await msalinstance.loginPopup(loginRequest);
            const account = loginResponse.account;

            // Silently gets an access token using the signed-in user's account === This token is used to access Microsoft Graph without showing another popup
            const tokenResponse = await msalinstance.acquireTokenSilent({
                ...loginRequest,
                account,
            });
            const accessToken = tokenResponse.accessToken;

            // Makes a Get request to the microsoft graph API to fetch the user profile --- Sends the access token to JSON (contain user info like name, email, etc)
            const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userProfile = await graphResponse.json();

            // Sends the user's profile to your own API (/api/save-user) so you can save it in your database
            await fetch("/api/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
            });

            // This is when the user successfully signs in
            alert("Signed in and user saved!");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed — see console for details.");
        }
    };

    // This is the button for
    return (
        <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Sign In with Microsoft
        </button>
    );
};
