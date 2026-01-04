<script setup lang="ts">
    import { Chart, type MonthSummary } from '@/shared/ui/chart';

    defineProps<{
        rentalsStats: MonthSummary[] | undefined;
    }>();
</script>

<template>
    <section class="bg-main-gray-bg rounded-md p-5 shadow-md">
        <h2 class="font-semibold">Rentals overview</h2>
        <div class="mt-5">
            <Chart :rentalsStats="rentalsStats" />
        </div>
    </section>
</template>
