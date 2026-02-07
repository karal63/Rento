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
    AdminDashboardPage,
    ProtectedRentalsPage,
    ProtectedUsersPage,
    AdminCreateRentalPage,
    AdminEditRentalPage,
    TicketsPage,
    EmployeeDashboard,
    RentalDetailsPage,
} from '@/pages';

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
        meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin' },
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardPage,
            },
            {
                path: 'rentals',
                component: ProtectedRentalsPage,
            },
            {
                path: 'rentals/create',
                component: AdminCreateRentalPage,
            },
            {
                path: 'rentals/edit/:id',
                component: AdminEditRentalPage,
            },
            {
                path: 'users',
                component: ProtectedUsersPage,
            },
            {
                path: 'rentals/:id',
                component: RentalDetailsPage,
            },
        ],
    },

    {
        path: '/employee',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresEmployee: true, title: 'Employee' },
        children: [
            {
                path: 'dashboard',
                component: EmployeeDashboard,
            },
            {
                path: 'tickets',
                component: TicketsPage,
            },
            {
                path: 'rentals/:id',
                component: RentalDetailsPage,
            },
        ],
    },
];
