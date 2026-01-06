import { axiosInstance } from '@/shared/config';
import { API_GET_DASHBOARD_SUMMARY } from '@/shared/model';
import type { AxiosResponse } from 'axios';
import type { DashboardSummary } from '../model/types';

export const apiGetDashboardSummary = async (): Promise<AxiosResponse<DashboardSummary>> => {
    return await axiosInstance.get(API_GET_DASHBOARD_SUMMARY);
};
