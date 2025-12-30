import type { RouteRecordRaw } from 'vue-router';
import {
    LandingPage,
    CarsPage,
    SingleCar,
    BookPage,
    PaymentPage,
    PaymentSuccessPage,
    AccountPage,
    RentalsPage,
} from '@/pages';
import { Dashboard } from '@/pages/admin';

import BookingLayout from '../layouts/BookingLayout.vue';
import ProfileLayout from '../layouts/ProfileLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import AppLayout from '../layouts/AppLayout.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        children: [
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
                        meta: { requiresAuth: true },
                        component: PaymentPage,
                    },
                ],
            },
            {
                path: '/payment-success',
                meta: { requiresAuth: true },
                component: PaymentSuccessPage,
            },
            {
                path: '/profile',
                meta: { requiresAuth: true },
                component: ProfileLayout,
                children: [
                    {
                        path: 'account',
                        component: AccountPage,
                    },
                    {
                        path: 'rentals',
                        component: RentalsPage,
                    },
                ],
            },
        ],
    },

    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
            },
        ],
    },
];
