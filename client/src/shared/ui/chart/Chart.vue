<script setup lang="ts">
    import { useThemeStore } from '@/shared/model';
    import type { ApexOptions } from 'apexcharts';
    import { computed, ref, watch, type ComputedRef } from 'vue';
    import VueApexCharts from 'vue3-apexcharts';
    import type { MonthSummary } from './model/types';

    const themeStore = useThemeStore();

    const props = defineProps<{
        rentalsStats: MonthSummary[] | undefined;
    }>();

    const categories = ref<string[]>();
    const min = ref<number>();
    const series = ref<{ name: string; data: number[] }[]>([]);
    const max = new Date().setDate(0);

    function getLast6MonthsLabels() {
        if (!props.rentalsStats) return;
        const labels: string[] = [];

        props.rentalsStats.forEach(rental => {
            labels.push(rental.isoDate);
        });

        return labels;
    }

    const chartOptions: ComputedRef<ApexOptions> = computed(() => {
        return {
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
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime',
                min: min.value,
                max,
                labels: {
                    formatter: (_value, timestamp) =>
                        timestamp
                            ? new Date(timestamp).toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric',
                              })
                            : '',
                },
                categories: categories.value,
            },
            yaxis: {
                show: true,
            },
            tooltip: {
                custom: function ({
                    series,
                    dataPointIndex,
                    w,
                }: {
                    series: number[][];
                    dataPointIndex: number;
                    w: any;
                }): string {
                    const timestamp = w.globals.seriesX[0][dataPointIndex];

                    const dateLabel = new Date(timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                    });

                    const rows = series
                        .map((s: number[], i: number) => {
                            const value = s[dataPointIndex];
                            const color = w.globals.colors[i];
                            const name = w.globals.seriesNames[i];

                            return `
                                <div class="apex-tooltip-row">
                                <span class="dot" style="background:${color}"></span>
                                <span class="label">${name}: </span>
                                <span class="apex-tooltip-value">${value}</span>
                                </div>
                            `;
                        })
                        .join('');

                    return `
                        <div class="apex-tooltip">
                            <div class="apex-tooltip-title">${dateLabel}</div>
                            <div class="apex-tooltip-body">${rows}</div>
                        </div>
                    `;
                },
                // x: {
                //     format: 'dd/MM/yy',
                // },
            },
        };
    });

    watch(
        () => props.rentalsStats,
        () => {
            if (!props.rentalsStats) return;

            categories.value = getLast6MonthsLabels();
            min.value = new Date((props.rentalsStats[0] as MonthSummary).isoDate).getTime();

            series.value = [
                {
                    name: 'Confirmed',
                    data: props.rentalsStats?.map(rental => rental.confirmedCount),
                },
                {
                    name: 'Cancelled',
                    data: props.rentalsStats?.map(rental => rental.cancelledCount),
                },
            ];
        },
        { immediate: true }
    );
</script>

<template>
    <VueApexCharts type="area" height="350" :options="chartOptions" :series="series" />
</template>

<style>
    .apex-tooltip {
        font-size: 13px;
    }

    .apex-tooltip-row {
        display: flex;
        align-items: center;
        gap: 2px;
    }

    .dot {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--color-primary);
        margin-right: 3px;
    }

    .apex-tooltip-value {
        font-weight: 500;
    }

    .apex-tooltip-title {
        padding: 3px 8px;
        background-color: var(--color-main-border);
        border-bottom: 1px solid var(--color-main-lightgray);
    }

    .apex-tooltip-body {
        background-color: var(--color-main-bg);
        padding: 12px 15px;
        display: flex;
        flex-direction: column;
        gap: 7px;
    }
</style>
