<script setup lang="ts">
    import { useCarQuery } from '@/entities/car';
    import { Button, ImagesCarousel } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const { params } = useRoute();
    const { t } = useI18n();

    const { data } = useCarQuery(params['id'] as string);
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

        <div class="mt-7 flex justify-end">
            <RouterLink :to="`/admin/cars/edit/${params['id']}`">
                <Button size="sm" class="flex items-center gap-2">
                    <Icon icon="lucide:edit" class="text-xl" />
                    {{ t('app.button.edit') }}
                </Button>
            </RouterLink>
        </div>
    </div>
</template>
