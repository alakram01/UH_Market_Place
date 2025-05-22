"use client";

import React from "react";
import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";
import { signIn } from "next-auth/react";

// Defines a componenent that renders a button, and a handlelogin function for the onClick event
export const SignInButton = () => {
  const handleLogin = async () => {

    try {

      // Initializes the MSAL instance
      await msalinstance.initialize();

      // This will pop the signin page for the user to be able to sign in their UH MS account
      const loginResponse = await msalinstance.loginPopup(loginRequest);

      // retrieves the account from the login page
      const account = loginResponse.account;

      // Acquires an access token for the signed in user,
      // Used for also authenticated requests to Microsoft Graph API
      const tokenResponse = await msalinstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      // Makes a request to the microsoft Graph API (/me endpoint) to get the users profile
      // Parses and stores the result in userProfile
      const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      const userProfile = await graphResponse.json();

      // Optionally save to DB yourself (redundant if using CredentialsProvider below)
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      // Now trigger CredentialsProvider to create session
      // sends basic user info (email, name) from Graph response
      // redirect: false prevents automatic page reload
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: userProfile.mail || userProfile.userPrincipalName,
        name: userProfile.displayName,
        profilePicUrl: userProfile.photo || "", // optional
      });

      // checks if sign-in was successful, Displays an alert based on the result
      if (signInRes?.ok) {
        alert("Signed in and session established!");
      } else {
        alert("Session failed to establish.");
      }

    // Catches and logs any error tht occured during the login or Graph
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed — see console for details.");
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

/**
 * 1. Open MS login popup
 * 2. Acquire access token for the user
 * 3. Fetch user profile from Microsoft Graph
 * 4. Optionally save profile to your DB
 * 5. Use NextAuth credentials provider to establish a session
 * 6. Alert user if login succeeded or failed
 */