<script setup lang="ts">
import { onMounted } from 'vue';
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

async function logout() {
    await auth.msalInstance.initialize();
    await auth.msalInstance.logoutPopup();
    auth.account = null;
    auth.token = "";
}

onMounted(() => {
    auth.loadAuthState();
});
</script>

<template>
    <div>
        <button v-if="!auth.token" @click="login"class="btn">Click here to login</button>
        <button v-if="auth.token" @click="logout"class="btn">Click here to logout</button>
    </div>
</template>