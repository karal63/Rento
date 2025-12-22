<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { Breadcrumbs } from '@/shared/ui';
    import { BookingSummary } from '@/widgets';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';

    const carStore = useCarStore();
    const { t } = useI18n();

    const breadcrumbs = computed(() => [
        {
            label: t('app.cars'),
            href: '/cars',
        },
        {
            label: carStore.selectedCar?.name || t('app.unknown_name'),
            href: `/cars/${carStore.selectedCar?._id}`,
        },
        {
            label: t('app.rental'),
        },
    ]);
</script>

<template>
    <div>
        <main class="max-w-[1000px] m-auto px-5 mt-32">
            <Breadcrumbs :breadcrumbs="breadcrumbs" />

            <div class="lg:flex gap-10">
                <BookingSummary />
                <router-view />
            </div>
        </main>
    </div>
</template>
