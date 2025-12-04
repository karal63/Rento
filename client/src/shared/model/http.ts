export const API_GET_CAR_SINGLE = (id: string) => `/cars/${id}`;
export const API_GET_CAR_LIST = (page: number, brands: string[], search: string) =>
    `/cars/?page=${page}${brands ? brands.map(b => `&brand=${b}`).join('') : ''}${search ? `&search=${search}` : ''}`;
