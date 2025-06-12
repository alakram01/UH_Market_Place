// Import MSAL log level constants
import { LogLevel } from '@azure/msal-browser';

// MSAL configuration for the client application
export const msalConfig = {
    auth: {
        // Application (client) ID from Azure AD - must match the one in your Azure portal
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,

        // Azure Active Directory tenant authority (login endpoint for your tenant)
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,

        // Where to redirect users after login
        redirectUri: "http://localhost:3000/",

        // Where to redirect users after they log out
        postLogoutRedirectUri: '/',

        // If false, MSAL will not navigate back to the original URL after login
        navigateToLoginRequestUrl: false,
    },
    cache: {
        // Specifies where the MSAL cache will be stored (sessionStorage = cleared when tab closes)
        cacheLocation: 'sessionStorage',

        // Set to true for browsers with 3rd-party cookie restrictions (e.g., Safari in strict mode)
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            // Custom logger callback to handle MSAL logs
            loggerCallback: (level: any, message: any, containsPii: any) => {
                // Do not log if the message contains personally identifiable info
                if (containsPii) {
                    return;
                }

                // Log messages to the browser console based on their severity level
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

// This defines the permission scopes you're requesting from Microsoft Graph during login
// "User.Read" allows reading the signed-in user's basic profile info (name, email, etc.)
export const loginRequest = {
    scopes: ["User.Read"],

};

// This is the Microsoft Graph API endpoint to fetch the currently signed-in user's profile
// You will use this endpoint after acquiring a valid access token

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};


