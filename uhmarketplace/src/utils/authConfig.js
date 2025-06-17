import * as msal from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";

const pca = msal.createStandardPublicClientApplication({
    auth: {
        clientId: `${env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        postLogoutRedirectUri: '/',
    },
});
 
const msalInstance = new PublicClientApplication(pca);
await msalInstance.initialize();
