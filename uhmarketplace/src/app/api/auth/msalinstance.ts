
// Import the MSAL PublicClientApplication class, used to interact with Azure AD for authentication in a browser
import { PublicClientApplication } from "@azure/msal-browser";

// Import the MSAL configuration object, which contains authentication, cache, and logging settings
import { msalConfig } from "./auth-config";

// Create a new instance of MSAL's PublicClientApplication
// This instance will be used throughout your app to handle login, logout, and token acquisition
export const msalinstance = new PublicClientApplication(msalConfig);


/**
 * This Is gonna be under construction
 */

