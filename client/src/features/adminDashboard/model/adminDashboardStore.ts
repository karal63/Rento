import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DashboardSummary } from './types';
import { apiGetDashboardSummary } from '../api/dashboard';

export const useAdminDashboardStore = defineStore('adminDashboard', () => {
    const data = ref<DashboardSummary>();
    const loading = ref(true);

    const getData = async () => {
        try {
            loading.value = true;
            const res = await apiGetDashboardSummary();
            data.value = res.data;
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    };

    return { data, getData, loading };
});
