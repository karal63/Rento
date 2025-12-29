// CAR
export const API_GET_CAR_SINGLE = (id: string) => `/cars/${id}`;
export const API_GET_CAR_LIST = (page: number, brands: string[], search: string) =>
    `/cars/?page=${page}${brands ? brands.map(b => `&brand=${b}`).join('') : ''}${search ? `&search=${search}` : ''}`;

// USER
export const API_POST_USER_SIGNUP = `/auth/signup`;
export const API_POST_USER_LOGIN = `/auth/login`;
export const API_POST_USER_LOGOUT = `/auth/logout`;
export const API_POST_TOKEN_REFRESH = `/auth/refresh`;
export const API_PATCH_USER_EDIT = `/user/edit`;

// PAYMENT
export const API_POST_PAYMENT_CREATE = `/payment/create-payment-intent`;

// RENTAL
export const API_GET_RENTAL_SINGLE = (sessionId: string) => `/rent/${sessionId}`;
export const API_GET_RENTALS_LIST = '/rent/list';
export const API_GET_CAR_AVAILABILITY = (carId: string) => `/rent/get-availability/${carId}`;
export const API_DELETE_RENTAL_CANCEL = (rentalId: string) => `/rent/cancel/${rentalId}`;
export const API_PATCH_RENTAL_EDIT = (rentalId: string) => `/rent/edit/${rentalId}`;
