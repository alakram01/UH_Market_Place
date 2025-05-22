import { LogLevel } from '@azure/msal-browser';



export const msalConfig = {
    auth: {
        // This are the core configs passed to the msal client
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        // This where the tokens are stored, in the cache, 
        // storeAuthStateCookie: Useful for legacy browsers with strict storage settings, false is standard for modern apps.
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false, 
    },
    system: {
        // LoggerCallback: Defines how MSAL logs messages (for debugging and monitoring)
        // containsPii: If true, the message may contains personal info and won't be logged 
        // It uses different LogLevel s:
            // Error, Warning, info, and Verbose, each mapped to console method.
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
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

// This defines the permission you're requesting when the user logs in
// "User.Read" gives read access to the user's profile using Microsoft Graph
export const loginRequest = {
    scopes: ["User.Read"]
};

// This is the endpoint to get the signed-in user's profile into from Microsoft Graph
// It returns details like name, email, and ID.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};  
