"use client";

import React from "react";
import { useMsal } from "@azure/msal-react";
//import { useState } from "react";
//import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest } from "@/app/api/auth/auth-config";
//import { signIn } from "next-auth/react";

// Defines a componenent that renders a button, and a handlelogin function for the onClick event
export const SignInButton = () => {

  // This line uses the MSAL isntance to get the PublicClientApplication
  const { instance } = useMsal();

  // Returns the current signed-in User (if any)
  const activeAccount = instance.getActiveAccount();

  // Calls loginRedirect() on the MSAL instance
  const handleLogin = async () => {

    instance
      .loginRedirect({
        ...loginRequest,    // Spreads in your configured scopes from auth-config.ts 
        //redirectUri: '/marketplace',
      })
      .catch((error) => console.log(error));    // logs any errors
    }

  // Handles logout request
  const handleLogoutRedirect = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
    });
    window.location.reload();
  };

/*
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
*/
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