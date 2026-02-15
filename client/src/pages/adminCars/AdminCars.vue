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
        <RouterLink to="cars/add">
            <Button size="sm" class="flex items-center gap-3">
                <Icon icon="material-symbols:add-rounded" class="text-xl" />
                {{ t('app.admin_cars_page.new_car') }}
            </Button>
        </RouterLink>
    </ProtectedHeader>

    <AdminCarsList
        :cars="data?.cars || []"
        :loading="isLoading"
        v-model="page"
        :totalPages="data?.pagesAmount ?? 1"
    >
        <template #actions="{ car }">
            <div class="bg-main-bg rounded-md">
                <Button
                    @click="console.log(car)"
                    size="sm"
                    color="transparent"
                    disableUppercase
                    class="w-full flex items-center gap-3"
                >
                    <Icon icon="lucide:edit" class="text-xl" />
                    Edit
                </Button>
                <Button
                    size="sm"
                    color="transparent"
                    disableUppercase
                    class="w-full flex items-center gap-3"
                >
                    <Icon icon="material-symbols:cancel-outline-rounded" class="text-xl" />
                    Delete
                </Button>
            </div>
        </template>
    </AdminCarsList>
</template>
