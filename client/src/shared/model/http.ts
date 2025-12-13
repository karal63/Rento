// CAR
export const API_GET_CAR_SINGLE = (id: string) => `/cars/${id}`;
export const API_GET_CAR_LIST = (page: number, brands: string[], search: string) =>
    `/cars/?page=${page}${brands ? brands.map(b => `&brand=${b}`).join('') : ''}${search ? `&search=${search}` : ''}`;

// USER
export const API_POST_USER_SIGNUP = `/auth/signup`;
export const API_POST_USER_LOGIN = `/auth/login`;
export const API_POST_USER_LOGOUT = `/auth/logout`;
export const API_POST_TOKEN_REFRESH = `/auth/refresh`;
