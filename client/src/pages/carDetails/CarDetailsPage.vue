<script setup lang="ts">
    import { useCarQuery } from '@/entities/car';
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { useDeleteCar } from '@/features/deleteCar';
    import { showErrorDialog } from '@/features/dialog';
    import type { AppError } from '@/shared/model';
    import { Button, ImagesCarousel, type Breadcrumb } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute, useRouter } from 'vue-router';

    const { params } = useRoute();
    const { t } = useI18n();
    const acceptanceModalStore = useAcceptanceModalStore();
    const router = useRouter();
    const { deleteCar } = useDeleteCar();

    const { data } = useCarQuery(params['id'] as string);

    const breadcrumbs = computed(() => [
        {
            label: t('app.car_details_page.cars'),
            href: '/admin/cars',
        },
        {
            label: data.value?.name ?? (params['id'] as string),
        },
    ]);

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const handleDelete = () => {
        acceptanceModalStore.open({
            title: t('app.acceptance_modal.confirm_action'),
            message: t('app.admin_cars_page.delete_car_desc', { name: data.value?.name }),
            onConfirm: async () => {
                try {
                    await deleteCar(params['id'] as string);
                } catch (error) {
                    showErrorDialog(error as AppError);
                } finally {
                    router.push('/admin/cars');
                }
            },
        });
    };

    watch(
        breadcrumbs,
        () => {
            emit('setBreadcrumbs', breadcrumbs.value);
        },
        { immediate: true }
    );
</script>

<template>
    <div class="xl:w-2/3">
        <h1 class="text-4xl md:text-5xl xl:text-6xl font-bold mb-7">
            {{ data?.name }}
        </h1>

        <ImagesCarousel :images="data?.images ?? []" />

        <div class="mt-5 grid grid-cols-1 2xl:grid-cols-2 gap-3 2xl:gap-5">
            <div class="bg-main-gray-bg border border-main-border rounded-md px-4 py-3">
                <div class="flex items-center justify-between">
                    <p class="flex items-center gap-3">
                        <Icon icon="ic:outline-speed" class="text-2xl" />
                        <span class="text-xl">{{ t('app.acceleration') }}</span>
                    </p>

                    <p class="text-xl font-semibold">
                        {{ data?.details.accelerationTo100 }}{{ t('app.s') }} {{ t('app.to') }} 100
                        {{ t('app.km_h') }}
                    </p>
                </div>
            </div>

            <div class="bg-main-gray-bg border border-main-border rounded-md px-4 py-3">
                <div class="flex items-center justify-between">
                    <p class="flex items-center gap-3">
                        <Icon icon="ph:horse" class="text-2xl" />
                        <span class="text-xl">{{ t('app.power') }}</span>
                    </p>

                    <p class="text-xl font-semibold">
                        {{ data?.details.horsepower }}{{ t('app.hp') }} /
                        {{ data?.details.torqueNm }}
                        {{ t('app.nm') }}
                    </p>
                </div>
            </div>

            <div class="bg-main-gray-bg border border-main-border rounded-md px-4 py-3">
                <div class="flex items-center justify-between">
                    <p class="flex items-center gap-3">
                        <Icon icon="mingcute:seat-line" class="text-2xl" />
                        <span class="text-xl">{{ t('app.number_of_seats') }}</span>
                    </p>

                    <p class="text-xl font-semibold">
                        {{ data?.details.numberOfSeats }}
                    </p>
                </div>
            </div>

            <div class="bg-main-gray-bg border border-main-border rounded-md px-4 py-3">
                <div class="flex items-center justify-between">
                    <p class="flex items-center gap-3">
                        <Icon icon="fluent:transmission-20-filled" class="text-2xl" />
                        <span class="text-xl">{{ t('app.transmission') }}</span>
                    </p>

                    <p class="text-xl font-semibold">
                        {{ data?.details.transmission }}
                    </p>
                </div>
            </div>
        </div>

        <div>
            <h2 class="mt-10 mb-4 text-2xl font-semibold">{{ t('app.prices_header') }}</h2>
            <table class="w-full border-collapse overflow-hidden rounded-xl">
                <tbody>
                    <tr
                        v-for="(price, key) in data?.pricing"
                        :key="key"
                        class="even:bg-main-gray-bg"
                    >
                        <td class="border border-main-border px-4 py-2 text-lg">
                            {{ t(`app.prices.${key}`) }}
                        </td>
                        <td class="border border-main-border px-4 py-2 text-lg font-medium">
                            {{ price }}
                            {{ t('app.zl') }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-7 flex justify-end gap-3">
            <Button @click="handleDelete" size="sm" color="red" class="flex items-center gap-2">
                <Icon icon="material-symbols:cancel-outline-rounded" class="text-xl" />
                {{ t('app.button.delete') }}
            </Button>
            <RouterLink :to="`/admin/cars/edit/${params['id']}`">
                <Button size="sm" class="flex items-center gap-2">
                    <Icon icon="lucide:edit" class="text-xl" />
                    {{ t('app.button.edit') }}
                </Button>
            </RouterLink>
        </div>
    </div>
</template>
