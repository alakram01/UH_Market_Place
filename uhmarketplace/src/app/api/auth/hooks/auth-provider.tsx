"use client"

import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../auth-config";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { msalinstance } from "../msalinstance";
import { useEffect } from "react";


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children } : AuthProviderProps) => {

    if (!msalinstance.getActiveAccount() && msalinstance.getAllAccounts().length > 0) {
        msalinstance.setActiveAccount(msalinstance.getAllAccounts()[0]);
    }

    msalinstance.enableAccountStorageEvents();

     useEffect(() => {
        const callbackId = msalinstance.addEventCallback((event) => {
            const authResult = event?.payload as AuthenticationResult;
            if (event.eventType === EventType.LOGIN_SUCCESS && authResult?.account) {
                msalinstance.setActiveAccount(authResult.account);
                window.location.reload();
                //router.refresh();
                // If windown.location.reload(); is not the move use the code above this line.
            }
    });

        return () => {
            if (callbackId) msalinstance.removeEventCallback(callbackId);
        };
    }, []);

    return <MsalProvider instance={msalinstance}>{children}</MsalProvider>;
};