import { BrowserCacheLocation, PublicClientApplication, type AccountInfo } from "@azure/msal-browser";
import { reactive } from "vue";

const config = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        authority: "https://login.microsoftonline.com/" + import.meta.env.VITE_TENANT_ID
    },
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        secureCookies: false, // will need to be turned to true for production
    },
}

const data = reactive({
    account: null as AccountInfo | null,
    msalInstance: new PublicClientApplication(config),
    token: "",
    loadAuthState() {
        const savedToken = sessionStorage.getItem(`msal.token.keys.${import.meta.env.VITE_CLIENT_ID}`);
        if (savedToken) this.token = savedToken;
    },
});

export function useAuth() {
    return data;
}

