<script setup lang="ts">
    import { useAllCarsQuery } from '@/entities/car';
    import { Button, type Breadcrumb } from '@/shared/ui';
    import { ProtectedHeader } from '@/widgets';
    import { AdminCarsList } from '@/widgets/adminCarsList';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const emit = defineEmits<{
        (e: 'setBreadcrumbs', breadcrumbs: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.admin_cars_page.cars'),
        },
    ];

    onMounted(() => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const page = ref(1);

    const carsOptions = computed(() => ({
        page: page.value,
    }));

    const { data, isLoading } = useAllCarsQuery(carsOptions);
</script>

<template>
    <ProtectedHeader :title="t('app.admin_cars_page.all_cars')">
        <RouterLink to="cars/create">
            <Button size="sm" class="flex items-center gap-3">
                <Icon icon="material-symbols:add-rounded" class="text-xl" />
                {{ t('app.admin_cars_page.new_car') }}
            </Button>
        </RouterLink>
    </ProtectedHeader>

    <AdminCarsList :cars="data?.cars || []" :loading="isLoading" />
</template>
