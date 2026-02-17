<script setup lang="ts">
    import { useCarQuery } from '@/entities/car';
    import type { Breadcrumb } from '@/shared/ui';
    import { EditCar } from '@/widgets';
    import { computed, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const { t } = useI18n();
    const { params } = useRoute();
    const { data } = useCarQuery(params['id'] as string);

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = computed(() => [
        {
            label: t('app.edit_car_page.cars'),
            href: '/admin/cars',
        },
        {
            label: data.value?.name ? data.value.name : (params['id'] as string),
        },
    ]);

    watch(
        data,
        name => {
            if (!name) return;

            emit('setBreadcrumbs', breadcrumbs.value);
        },
        { immediate: true }
    );
</script>

<template>
    <EditCar :original-car="data" />
</template>
