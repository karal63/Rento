<script setup lang="ts">
    import { useThemeStore } from '@/shared/model';
    import type { ApexOptions } from 'apexcharts';
    import VueApexCharts from 'vue3-apexcharts';

    const themeStore = useThemeStore();
    const now = new Date();

    function getLast6MonthsLabels() {
        const labels: string[] = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1, 1); // first day of month
            labels.push(d.toISOString()); // ISO string for ApexCharts
        }

        return labels;
    }

    const categories = getLast6MonthsLabels();

    const series = [
        { name: 'Completed', data: [31, 40, 28, 51, 42, 109] },
        { name: 'Cancelled', data: [11, 32, 45, 32, 34, 52] },
    ];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            foreColor: themeStore.isDark ? '#adadad' : '#6d6d6d',
            background: themeStore.isDark ? '#202020' : '#e0e0e0',
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#5A8EF6',
                shadeTo: 'light',
                shadeIntensity: 0.65,
            },
        },
        grid: {
            show: true, // make sure the grid is enabled
            borderColor: themeStore.isDark ? '#292929' : '#d5d5d5', // grid line color
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories,
        },
        yaxis: {
            show: true,
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    };
</script>

<template>
    <VueApexCharts type="area" height="350" :options="chartOptions" :series="series" />
</template>
