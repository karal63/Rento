import type { RouteRecordRaw } from 'vue-router';
import { LandingPage, CarsPage, SingleCar, BookPage } from '@/pages';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/cars',
        component: CarsPage,
    },
    {
        path: '/cars/:id',
        component: SingleCar,
    },
    {
        path: '/book/:id',
        component: BookPage,
    },
];
