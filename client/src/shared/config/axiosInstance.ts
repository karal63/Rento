import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { API_POST_TOKEN_REFRESH, type AppError, type ErrorContext } from '../model';

// export const baseURL = 'http://localhost:3000/api/';
export const baseURL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:2000/api/'
        : 'https://maniacally-clodhopping-bernice.ngrok-free.dev/api/';

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

        if (!error.isAxiosError) {
            throw error;
        }

        const data = error.response?.data as {
            code?: string;
            message?: string;
            context?: ErrorContext;
        };

        const appError: AppError = {
            status: error.response?.status ?? 0,
            code:
                typeof data?.code === 'string'
                    ? data.code
                    : typeof data?.message === 'string'
                      ? data.message
                      : 'UNKNOWN',

            context: typeof data?.context === 'object' ? data.context : undefined,
            original: error,
        };

        throw appError;
    }
);
