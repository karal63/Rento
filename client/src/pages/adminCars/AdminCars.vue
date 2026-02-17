<script setup lang="ts">
    import { useAllCarsQuery, type Car } from '@/entities/car';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useDeleteCar } from '@/features/deleteCar';
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
    const acceptanceModalStore = useAcceptanceModalStore();

    const breadcrumbs = [
        {
            label: t('app.admin_cars_page.cars'),
        },
    ];

    onMounted(() => {
        emit('setBreadcrumbs', breadcrumbs);
    });

    const { deleteCar } = useDeleteCar();
    const page = ref(1);

    const carsOptions = computed(() => ({
        page: page.value,
    }));

    const { data, isLoading } = useAllCarsQuery(carsOptions);

    const handleDelete = (car: Car) => {
        acceptanceModalStore.open({
            title: t('app.acceptance_modal.confirm_action'),
            message: t('app.admin_cars_page.delete_car_desc', { name: car.name }),
            onConfirm: () => {
                deleteCar(car._id);
            },
        });
    };
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
                <RouterLink :to="`/admin/cars/edit/${car._id}`">
                    <Button
                        size="sm"
                        color="transparent"
                        disableUppercase
                        class="w-full flex items-center gap-3"
                    >
                        <Icon icon="lucide:edit" class="text-xl" />
                        Edit
                    </Button>
                </RouterLink>

                <Button
                    @click="handleDelete(car)"
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
