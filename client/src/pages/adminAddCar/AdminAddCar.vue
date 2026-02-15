<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { AddCar } from '@/widgets';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.add_car_page.cars'),
            href: '/admin/cars',
        },
        {
            label: t('app.car_form.new'),
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <AddCar />
</template>
