"use client";

import {
  AuthenticationResult,
  EventType,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { msalinstance } from "../../auth/msalinstance";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  if (
    !msalinstance.getActiveAccount() &&
    msalinstance.getAllAccounts().length > 0
  ) {
    msalinstance.setActiveAccount(msalinstance.getAllAccounts()[0]);
  }

  msalinstance.enableAccountStorageEvents();

  msalinstance.addEventCallback((event) => {
    const authenticationResult = event?.payload as AuthenticationResult;
    if (
      event.eventType === EventType.LOGIN_SUCCESS &&
      authenticationResult?.account
    ) {
      const account = authenticationResult.account;
      msalinstance.setActiveAccount(account);
      window.location.reload();
    }
  });

  return <MsalProvider instance={msalinstance}>{children}</MsalProvider>;
};


/**
 * ------------------------------------------------------------------
 * This files defines the <AuthProvider> component, which -->
 * 1. Creates an MSAL client instance (new PublicClientApplication)
 * 2. Initializes the active account if one exists in the cache
 * 3. Registers an event callback to handle login success (sets active account + reloads)
 * 4. Wraps your app in <MsalProvider> to make the MSAL instance accessible in your app
 * ------------------------------------------------------------------
 * WHY IS THIS IMPORTANT? => This is the brdige between your app and the azure identity system. It makes sure that your MSAL context is available to all React Components 
 */
