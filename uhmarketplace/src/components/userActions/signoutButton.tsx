"use client";

import { signOut as nextAuthSignOut } from "next-auth/react";
import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = async () => {
    // Clear NextAuth session (no redirect)
    await nextAuthSignOut({ redirect: false });

    // Logout MSAL with redirect to root
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.logoutRedirect({
        account: accounts[0],
        postLogoutRedirectUri: "/",
      });
    } else {
      window.location.href = "/";
    }
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};
