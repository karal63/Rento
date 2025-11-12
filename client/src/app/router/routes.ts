import type { RouteRecordRaw } from 'vue-router';
import { LandingPage, CarsPage } from '@/pages';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/cars',
        component: CarsPage,
    },
];
