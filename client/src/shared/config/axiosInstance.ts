import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { API_POST_TOKEN_REFRESH } from '../model';

export const baseURL = 'http://localhost:3000/api/';

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (config: AxiosResponse) => {
        return config;
    },
    async (error: AxiosError & { config: { _isRetry: boolean } }) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !error.config?._isRetry &&
            !originalRequest?.url?.includes('/refresh')
        ) {
            originalRequest._isRetry = true;
            try {
                await axiosInstance.post(API_POST_TOKEN_REFRESH);

                return axiosInstance.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
    }
);
