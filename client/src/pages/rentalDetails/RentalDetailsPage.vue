<script setup lang="ts">
    import { RENTAL_STATUS, Status, useRentalQuery } from '@/entities/rental';
    import { normalizeDate } from '@/shared/lib/date';
    import { ImagesCarousel, type Breadcrumb } from '@/shared/ui';
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
            href: '/admin/rentals',
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
    <ProtectedHeader title="Rental Details" />

    <section v-if="isLoading" class="mt-10">
        <div class="skeleton w-full xl:w-[40%] h-75 rounded-md"></div>
    </section>

    <section v-else-if="error" class="mt-10">
        <div class="flex-col justify-center items-center mt-20">
            <Icon icon="streamline-freehand:cloud-error-404" class="text-9xl" />
            <h2 class="mt-5 text-3xl font-semibold">{{ t(`app.errors.${error.code}`) }}</h2>
        </div>
    </section>

    <section v-else class="mt-10 xl:flex gap-8">
        <ImagesCarousel :images="data?.carId.images ?? []" class="w-full xl:w-[40%]" />

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
                    <p
                        class="border border-border rounded-md px-4 py-2 my-2 flex items-center gap-2 max-w-max"
                    >
                        <Icon icon="mdi:location" class="text-xl" />

                        {{ data?.pickupLocation }} {{ t('app.rentals_page.at') }}
                        {{ data?.pickupTime }}
                    </p>
                </div>

                <div>
                    <p>
                        <span class="font-semibold">
                            {{ t('app.rental_details_page.client') }}:
                        </span>
                        {{ data?.userId.name }} {{ data?.userId.secondName }}
                    </p>
                    <p>
                        <span class="font-semibold">
                            {{ t('app.rental_details_page.employee') }}:
                        </span>
                        {{
                            data?.employee
                                ? `${data?.employee.name} ${data?.employee?.secondName}`
                                : '-'
                        }}
                    </p>
                </div>

                <div>
                    <p>
                        <span class="font-semibold">
                            {{ t('app.rental_details_page.total_paid') }}:
                        </span>
                        {{ data?.totalPrice ? `${data.totalPrice}${t('app.zl')}` : '-' }}
                    </p>
                    <p>
                        <span class="font-semibold">
                            {{ t('app.rental_details_page.created_at') }}:
                        </span>
                        {{ data?.createdAt ? normalizeDate(data.createdAt) : '-' }}
                    </p>
                </div>

                <div>
                    <h2 class="mb-2 text-2xl font-semibold">Contact</h2>

                    <div class="flex flex-wrap gap-3 items-center">
                        <a
                            v-if="data?.userId.auth_provider === 'local'"
                            :href="`tel:${data?.userId.phoneNumber}`"
                            class="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        >
                            <Icon icon="material-symbols:call" class="text-2xl" />
                            <span class="text-lg">{{ data?.userId.phoneNumber }}</span>
                        </a>

                        <a
                            v-if="data?.userId.auth_provider === 'local'"
                            :href="`mailto:${data?.userId.email}`"
                            class="bg-foreground text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        >
                            <Icon icon="material-symbols:mail" class="text-2xl" />
                            <span class="text-lg">{{ data?.userId.email }}</span>
                        </a>

                        <a
                            v-if="data?.userId.auth_provider === 'telegram'"
                            :href="`https://t.me/${data?.userId.username}`"
                            class="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
                        >
                            <Icon icon="ic:baseline-telegram" class="text-2xl" />
                            <span class="text-lg">{{ data?.userId.username }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
