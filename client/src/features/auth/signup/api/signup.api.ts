import { axiosInstance } from '@/shared/config';
import { API_POST_USER_SIGNUP } from '@/shared/model';
import type { SignupDto } from '../model/types/types';
import type { AxiosResponse } from 'axios';
import type { User } from '@/entities/user';

export const apiSignup = async (signupDto: SignupDto): Promise<AxiosResponse<{ user: User }>> => {
    return await axiosInstance.post(API_POST_USER_SIGNUP, { ...signupDto });
};
