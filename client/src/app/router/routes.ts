import type { RouteRecordRaw } from 'vue-router';
import { LandingPage, CarsPage, SingleCar, BookPage } from '@/pages';
import PaymentPage from '@/pages/payment/PaymentPage.vue';
import BookingLayout from '../layouts/BookingLayout.vue';

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
        path: '/book',
        component: BookingLayout,
        children: [
            {
                path: ':id',
                component: BookPage,
            },
            {
                path: ':id/payment',
                component: PaymentPage,
            },
        ],
    },
];
