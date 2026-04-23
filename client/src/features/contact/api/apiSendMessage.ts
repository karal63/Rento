import { axiosInstance } from '@/shared/config';
import type { ContactMessage } from '../model/types';
import { API_POST_MESSAGE_SEND } from '@/shared/model';

export const apiSendMessage = async (message: ContactMessage) => {
    await axiosInstance.post(API_POST_MESSAGE_SEND, message);
};
