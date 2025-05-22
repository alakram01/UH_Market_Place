"use client";

import { AuthenticationResult, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode, useEffect } from "react";
import { msalinstance } from "../msalinstance";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // If no active account is set but there are accounts in cache, set the first one as active
    if (!msalinstance.getActiveAccount() && msalinstance.getAllAccounts().length > 0) {
        msalinstance.setActiveAccount(msalinstance.getAllAccounts()[0]);
    }

    // Enable listening for auth changes across tabs/windows
    msalinstance.enableAccountStorageEvents();

    useEffect(() => {
        // Add an event callback to MSAL to handle login events
        const callbackId = msalinstance.addEventCallback((event) => {
            const authResult = event?.payload as AuthenticationResult;

            if (event.eventType === EventType.LOGIN_SUCCESS && authResult?.account) {
                // Set the logged-in account as the active account
                msalinstance.setActiveAccount(authResult.account);

                // Reload the app to refresh state/UI after login
                window.location.reload();

                // Alternative: Use router.refresh() if using Next.js router
            }
        });

        // Clean up callback when component unmounts
        return () => {
            if (callbackId) msalinstance.removeEventCallback(callbackId);
        };
    }, []);

    // Wrap children in MSAL context provider so MSAL is available throughout the app
    return <MsalProvider instance={msalinstance}>{children}</MsalProvider>;
};

/**
 * ------------------------------------------------------------------
 * ✅ PURPOSE OF THIS COMPONENT:
 *
 * This AuthProvider:
 * 1. Sets up the Microsoft Authentication Library (MSAL) for the app.
 * 2. Automatically restores the user's session from cache on page load.
 * 3. Listens for login success events and updates the active account.
 * 4. Makes MSAL context (accounts, tokens, login/logout) available
 *    to all child components using the `MsalProvider`.
 * 5. Enables cross-tab authentication synchronization.
 *
 * Use this as a wrapper around your app or layout to provide
 * authentication context across all pages.
 * ------------------------------------------------------------------
 */
