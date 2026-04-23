import { apiSendMessage } from '../api/apiSendMessage';
import type { ContactMessage } from './types';

export const sendMessage = async (message: ContactMessage) => {
    try {
        await apiSendMessage(message);
    } catch (error) {
        throw error;
    }
};
