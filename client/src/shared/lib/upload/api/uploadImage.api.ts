import { axiosInstance } from '@/shared/config';
import { API_POST_IMAGE_UPLOAD } from '@/shared/model';

export const apiUploadImage = async (files: FormData) => {
    return await axiosInstance.post(API_POST_IMAGE_UPLOAD, { files });
};
