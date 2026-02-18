import { apiUploadImage } from '../api/uploadImage.api';

export const uploadImage = async (files: FileList) => {
    const images = Array.from(files);

    try {
        const formData = new FormData();
        images.forEach(img => formData.append('file', img));

        return (await apiUploadImage(formData)).data;
    } catch (error) {
        console.log(error);
    }
};
