import { apiUploadImage } from '../api/uploadImage.api';

export const uploadImage = async (files: File[]) => {
    const images = Array.from(files);

    try {
        const formData = new FormData();
        formData.append('file', images[0]);
        // images.forEach(img => formData.append('file', img));

        return (await apiUploadImage(formData)).data;
    } catch (error) {
        console.log(error);
    }
};
