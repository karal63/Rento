<script setup lang="ts">
    import { RENTAL_STATUS, Status, useRentalQuery } from '@/entities/rental';
    import { normalizeDate } from '@/shared/lib/date';
    import type { Breadcrumb } from '@/shared/ui';
    import { Button } from '@/shared/ui';
    import { ProtectedHeader } from '@/widgets';
    import { Icon } from '@iconify/vue';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const { t } = useI18n();
    const route = useRoute();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.protected_rentals_page.rentals'),
        },
        {
            label: route.params.id as string,
        },
    ];

    const { data, isLoading, error } = useRentalQuery(route.params.id as string);

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <ProtectedHeader title="Rental Details">
        <Button size="sm">Edit</Button>
    </ProtectedHeader>

    <section v-if="isLoading" class="mt-10">
        <div class="skeleton w-full xl:w-[40%] h-[300px] rounded-md"></div>
    </section>

    <section v-else-if="error" class="mt-10">
        <div class="flex-col justify-center items-center mt-20">
            <Icon icon="streamline-freehand:cloud-error-404" class="text-9xl" />
            <h2 class="mt-5 text-3xl font-semibold">{{ t(`app.errors.${error.code}`) }}</h2>
        </div>
    </section>

    <section v-else class="mt-10 xl:flex gap-8">
        <img
            :src="data?.carId.image"
            :alt="data?.carId.name"
            class="rounded-md w-full xl:w-[40%]"
        />

        <div class="flex-col mt-5 xl:mt-0">
            <div class="flex flex-col-reverse xl:flex-row gap-5 xl:items-center">
                <h3 class="text-2xl font-bold">
                    {{ data?.rentFrom && normalizeDate(data?.rentFrom) }} -
                    {{ data?.rentTo && normalizeDate(data?.rentTo) }}
                </h3>

                <Status :status="data?.status ?? RENTAL_STATUS.Pending">
                    {{ t(`app.status.${data?.status}`) }}
                </Status>
            </div>

            <div class="flex-col gap-4">
                <div>
                    <p>{{ data?.carId.name }}</p>
                    <p>
                        {{ data?.pickupLocation }} {{ t('app.rentals_page.at') }}
                        {{ data?.pickupTime }}
                    </p>
                </div>

                <div>
                    <p>
                        <span class="font-semibold">Client:</span>
                        {{ data?.userId.name }} {{ data?.userId.secondName }}
                    </p>
                    <p>
                        <span class="font-semibold">Employee:</span>
                        {{
                            data?.employee
                                ? `${data?.employee.name} ${data?.employee?.secondName}`
                                : '-'
                        }}
                    </p>
                </div>

                <div>
                    <p>
                        <span class="font-semibold">Total price:</span>
                        {{ data?.totalPrice ? `${data.totalPrice}${t('app.zl')}` : '-' }}
                    </p>
                    <p>
                        <span class="font-semibold">Created at:</span>
                        {{ data?.createdAt ? normalizeDate(data.createdAt) : '-' }}
                    </p>
                </div>
            </div>
            <ul class="mt-5 text-lg"></ul>
        </div>
    </section>
</template>
