"use client";

import React from "react";
import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  const handleLogin = async () => {
    try {
      await msalinstance.initialize();
      const loginResponse = await msalinstance.loginPopup(loginRequest);
      const account = loginResponse.account;

      const tokenResponse = await msalinstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

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
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: userProfile.mail || userProfile.userPrincipalName,
        name: userProfile.displayName,
        profilePicUrl: userProfile.photo || "", // optional
      });

      if (signInRes?.ok) {
        alert("Signed in and session established!");
      } else {
        alert("Session failed to establish.");
      }

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
