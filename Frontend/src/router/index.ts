import { createMemoryHistory, createRouter } from 'vue-router';
import AuthPage from '../pages/Auth.vue';
import IndexPage from '../pages/Index.vue';

const routes = [
    { path: '/', component: IndexPage },
    { path: '/auth', component: AuthPage },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router