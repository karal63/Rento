import type { RouteRecordRaw } from 'vue-router';
import Landing from '../pages/landing/LandingPage.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Landing,
    },
];
