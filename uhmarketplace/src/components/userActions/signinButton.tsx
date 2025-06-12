"use client";

import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
//import { useState } from "react";
//import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";
import { AccountInfo } from "@azure/msal-browser";
import { signIn } from "next-auth/react";

// Defines a componenent that renders a button, and a handlelogin function for the onClick event
export const SignInButton = () => {
  const { instance } = useMsal();
  const [activeAccount, setActiveAccount] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const account = instance.getActiveAccount();
    if (account) {
      setActiveAccount(account);
    }
  }, [instance]);

  const fetchUserProfile = async (accessToken: string) => {
    const res = await fetch(graphConfig.graphMeEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  };

  const handleLogin = async () => {
    try {
      const loginres = await instance.loginPopup(loginRequest);
      const account = loginres.account || instance.getActiveAccount();
      if (!account) throw new Error("No account found");

      setActiveAccount(account);

      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      })

      const graphUser = await fetchUserProfile(response.accessToken)

      // Simulate MS Graph data
      const userProfile = {
        name: graphUser.name,
        email: graphUser.username,
        photo: "", // you can fetch profile photo separately
      };

      // Store user in DB + create NextAuth session
      const res = await signIn("credentials", {
        redirect: false,
        email: userProfile.email,
        name: userProfile.name,
        profilePicUrl: userProfile.photo,
      });

      if (res?.ok) {
        alert("Signed in and session established!");
      } else {
        alert("Session failed to establish.");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };
  // Handles logout request
  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
    window.location.reload();
  };


 return (
    <>
      <div>
        
      {activeAccount ? (
        <button onClick={handleLogoutRedirect}>Logout</button>

      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      </div>
    </>
  )
}

/**
 * 1. Access the current MSAL instance
 * 2. Check if the user is signed in (getActiveAccount)
 * 3. Run loginRedirect() to initiate login
 * 4. Run logoutPopup to sign out the user
 */