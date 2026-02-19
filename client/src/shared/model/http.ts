import type { RentalStatus, SortMethod } from '@/entities/rental';
import type { UserRole } from '@/entities/user';

// CAR
export const API_GET_CAR_SINGLE = (id: string) => `/cars/${id}`;
export const API_GET_CAR_LIST = (page: number, brands?: string[], search?: string) =>
    `/cars/?page=${page}${brands ? brands.map(b => `&brand=${b}`).join('') : ''}${search ? `&search=${search}` : ''}`;
export const API_GET_CARS_FOUND = (search: string) => `/cars/found?search=${search}`;
export const API_POST_CAR_ADD = '/cars/add';
export const API_DELETE_CAR_REMOVE = (id: string) => `/cars/remove/${id}`;
export const API_PATCH_CAR_EDIT = (id: string) => `/cars/edit/${id}`;

// USER
export const API_POST_USER_SIGNUP = `/auth/signup`;
export const API_POST_USER_LOGIN = `/auth/login`;
export const API_POST_USER_LOGOUT = `/auth/logout`;
export const API_POST_TOKEN_REFRESH = `/auth/refresh`;
export const API_PATCH_USER_EDIT = `/user/edit`;
export const API_PATCH_USER_EDIT_ID = (id: string) => `/user/edit/${id}`;
export const API_GET_USERS_LIST = (
    search?: string,
    role?: UserRole | '',
    sort?: SortMethod | null,
    page?: number
) =>
    `/user/all?search=${search ? search : ''}&role=${role ? role : ''}&sort=${sort ? sort?.field + ':' + sort?.order : ''}&page=${page ? page : ''}`;
export const API_DELETE_USER = (id: string) => `/user/delete/${id}`;
export const API_POST_USER_CREATE = '/user/create';
export const API_GET_USERS_FOUND = (search: string) => `/user/found?search=${search}`;

// PAYMENT
export const API_POST_PAYMENT_CREATE = `/payment/create-payment-intent`;

// RENTAL
export const API_GET_RENTAL_SINGLE = (sessionId: string) => `/rent/${sessionId}`;
export const API_GET_RENTALS_LIST = '/rent/list'; // user rentals
export const API_GET_CAR_AVAILABILITY = (carId: string, excludedId?: string) =>
    `/rent/get-availability/${carId}?excluded-id=${excludedId}`;
export const API_GET_CAR_FIND = (rentalId: string) => `/rent/get-by-id/${rentalId}`;
export const API_DELETE_RENTAL_CANCEL = (rentalId: string) => `/rent/cancel/${rentalId}`;
export const API_PATCH_RENTAL_EDIT = (rentalId: string) => `/rent/edit/${rentalId}`;
export const API_PATCH_RENTAL_DETAILS_EDIT = (rentalId: string) => `/rent/edit/${rentalId}/details`;
export const API_GET_RENTALS = (
    statuses?: (RentalStatus | '')[],
    search?: string,
    sort?: SortMethod | null,
    page?: number,
    unassigned?: boolean,
    my?: boolean
) =>
    `/rent/all?search=${search ? search : ''}${statuses ? statuses.map(s => '&status=' + s).join('') : ''}&sort=${sort ? sort.field + ':' + sort.order : ''}&page=${page ? page : ''}&unassigned=${unassigned ? unassigned : ''}&my=${my ? my : ''}`;
export const API_DELETE_RENTAL = (id: string) => `/rent/delete/${id}`;
export const API_POST_RENTAL_CREATE = '/rent/create';
export const API_GET_RENTAL_ASSIGNED = (rentalId: string) => `/rent/${rentalId}/employee`;
export const API_GET_RENTAL_ASSIGNED_ADMIN = (rentalId: string, employeeId: string) =>
    `/rent/${rentalId}/employee/${employeeId}`;
export const API_POST_RENTAL_ASSIGN = (rentalId: string) => `/rent/${rentalId}/assign`;
export const API_POST_RENTAL_ASSIGN_ADMIN = (rentalId: string, userId: string) =>
    `/rent/${rentalId}/assign/${userId}`;
export const API_POST_RENTAL_UNASSIGN = (rentalId: string) => `/rent/${rentalId}/unassign`;
export const API_POST_RENTAL_STATUS = (rentalId: string) => `/rent/${rentalId}/change-status`;

// ADMIN DASHBOARD
export const API_GET_DASHBOARD_SUMMARY = '/admin/dashboard/summary';

// IMAGE
export const API_POST_IMAGE_UPLOAD = '/image/upload';
