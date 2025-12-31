import { apiGetDashboardSummary } from '../api/dashboard';

export const useAdminDashboard = async () => {
    try {
        const res = await apiGetDashboardSummary();

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
