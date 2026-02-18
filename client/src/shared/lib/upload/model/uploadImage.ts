import { apiUploadImage } from '../api/uploadImage.api';

export const uploadImage = async (files: File[]) => {
    const images = Array.from(files);

    try {
        const formData = new FormData();
        images.forEach(img => formData.append('files', img));

        console.log(images);

        await apiUploadImage(formData);
    } catch (error) {
        console.log(error);
    }
};
