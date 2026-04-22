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
    AdminCars,
    AdminAddCar,
    AdminEditCar,
    CarDetailsPage,
    LoginPage,
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
                meta: {
                    title: 'landing',
                },
                component: LandingPage,
            },
            {
                path: '/cars',
                meta: {
                    title: 'cars',
                },
                component: CarsPage,
            },
            {
                path: '/cars/:id',
                meta: {
                    title: 'single-car',
                },
                component: SingleCar,
            },
            {
                path: '/book',
                component: BookingLayout,
                children: [
                    {
                        path: ':id',
                        meta: {
                            title: 'book',
                        },
                        component: BookPage,
                    },
                    {
                        path: ':id/payment',
                        meta: { requiresAuth: true, title: 'payment' },
                        component: PaymentPage,
                    },
                ],
            },
            {
                path: '/payment-success',
                meta: { requiresAuth: true, title: 'payment-success' },
                component: PaymentSuccessPage,
            },
            {
                path: '/profile',
                meta: { requiresAuth: true },
                component: ProfileLayout,
                children: [
                    {
                        path: 'account',
                        meta: {
                            title: 'user-profile',
                        },
                        component: AccountPage,
                    },
                    {
                        path: 'rentals',
                        meta: {
                            title: 'user-rentals',
                        },
                        component: RentalsPage,
                    },
                ],
            },
            {
                path: '/login',
                meta: {
                    title: 'login',
                },
                component: LoginPage,
            },
        ],
    },

    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true, roleTitle: 'Admin' },
        children: [
            {
                path: 'dashboard',
                meta: {
                    title: 'admin-dashboard',
                },
                component: AdminDashboardPage,
            },
            {
                path: 'rentals',
                meta: {
                    title: 'rentals',
                },
                component: ProtectedRentalsPage,
            },
            {
                path: 'rentals/create',
                meta: {
                    title: 'new-rental',
                },
                component: AdminCreateRentalPage,
            },
            {
                path: 'rentals/edit/:id',
                meta: {
                    title: 'edit-rental',
                },
                component: AdminEditRentalPage,
            },
            {
                path: 'users',
                meta: {
                    title: 'users',
                },
                component: ProtectedUsersPage,
            },
            {
                path: 'rentals/:id',
                meta: {
                    title: 'rental',
                },
                component: RentalDetailsPage,
            },
            {
                path: 'cars',
                meta: {
                    title: 'cars',
                },
                component: AdminCars,
            },
            {
                path: 'cars/add',
                meta: {
                    title: 'new-car',
                },
                component: AdminAddCar,
            },
            {
                path: 'cars/edit/:id',
                meta: {
                    title: 'edit-car',
                },
                component: AdminEditCar,
            },
            {
                path: 'cars/:id',
                meta: {
                    title: 'car',
                },
                component: CarDetailsPage,
            },
        ],
    },

    {
        path: '/employee',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresEmployee: true, roleTitle: 'Employee' },
        children: [
            {
                path: 'dashboard',
                meta: {
                    title: 'employee-dashboard',
                },
                component: EmployeeDashboard,
            },
            {
                path: 'tickets',
                meta: {
                    title: 'tickets',
                },
                component: TicketsPage,
            },
            {
                path: 'rentals/:id',
                meta: {
                    title: 'rental',
                },
                component: RentalDetailsPage,
            },
        ],
    },
];
