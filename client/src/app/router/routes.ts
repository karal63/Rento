import type { RouteRecordRaw } from 'vue-router';
import {
    LandingPage,
    CarsPage,
    SingleCar,
    BookPage,
    PaymentPage,
    PaymentSuccessPage,
    AccountPage,
} from '@/pages';
import BookingLayout from '../layouts/BookingLayout.vue';
import ProfileLayout from '../layouts/ProfileLayout.vue';

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
    {
        path: '/payment-success',
        component: PaymentSuccessPage,
    },
    {
        path: '/profile',
        component: ProfileLayout,
        children: [
            {
                path: 'account',
                component: AccountPage,
            },
            {
                path: 'rentals',
                component: AccountPage,
            },
        ],
    },
];
