"use client";

import React from "react";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { msalinstance } from "@/app/api/auth/msalinstance";
import { loginRequest, graphConfig } from "@/app/api/auth/auth-config";
import { signIn } from "next-auth/react";

// Defines a componenent that renders a button, and a handlelogin function for the onClick event
export const SignInButton = () => {
  const handleLogin = async () => {

     await msalinstance.initialize();

      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);

      const handleLogin = (loginType: any) => {
          setAnchorEl(null);

        if (loginType === "popup") {
            msalinstance.loginPopup(loginRequest).catch((e) =>{ console.error(`loginPopup failed: ${e}`) });
        } else if (loginType === "redirect") {
            msalinstance.loginRedirect(loginRequest).catch((e) => { console.error(`loginRedirect failed: ${e}`) })
            msalinstance.loginRedirect(loginRequest).catch((e) => { console.error(`loginRedirect failed: ${e}`) })
        };
      }
    }

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