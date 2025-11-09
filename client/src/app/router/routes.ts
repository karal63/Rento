import type { RouteRecordRaw } from 'vue-router';
import LandingPage from '../../pages/landing/LandingPage.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: LandingPage,
    },
];
