<script setup lang="ts">
    import { useAuth } from '../auth';

    const auth = useAuth();

    async function login() {
        await auth.msalInstance.initialize();
        await auth.msalInstance.loginPopup();
        const myAccounts = auth.msalInstance.getAllAccounts();
        // get first account - need error handling
        auth.account = myAccounts[0];
        const response = await auth.msalInstance.acquireTokenSilent({
            account: auth.account,
            scopes: [`api://${import.meta.env.VITE_CLIENT_ID}/Files.Read`]
        });

        auth.token = response.accessToken;
    }
</script>

<template>
    <div>
        <p v-if="auth.account">{{ auth.account.name }}</p>
        <button v-if="!auth.account" @click="login"class="btn">Click here to login</button>
    </div>
</template>