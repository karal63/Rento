import { axiosInstance } from '@/shared/config';
import { API_POST_IMAGE_UPLOAD } from '@/shared/model';
import type { AxiosResponse } from 'axios';

export const apiUploadImage = async (files: FormData): Promise<AxiosResponse<string[]>> => {
    return await axiosInstance.post(API_POST_IMAGE_UPLOAD, files);
};
