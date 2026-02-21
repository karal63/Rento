<script setup lang="ts">
    import type { CarFormType } from '@/entities/car';
    import { Input } from '@/shared/ui';
    import type { Validation } from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const car = defineModel<CarFormType>({ required: true });

    defineProps<{
        v$: Validation<CarFormType>;
    }>();
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
            <h4
                class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg flex items-center gap-3"
            >
                {{ t('app.acceleration') }}
                <p class="mt-1 text-sm text-red-500">
                    {{
                        v$.details.accelerationTo100.$error
                            ? v$.details.accelerationTo100.$errors[0].$message
                            : ''
                    }}
                </p>
            </h4>
            <div class="flex items-center gap-3 border border-t-0 border-main-border p-4">
                <div class="flex items-center gap-1">
                    <Input
                        type="number"
                        v-model="car.details.accelerationTo100"
                        :is-error="v$.details.accelerationTo100.$error"
                        :min="0"
                        size="medium"
                        placeholder="2.8"
                        class="w-18"
                    />
                    <div class="flex gap-2 items-end">
                        <span class="text-xl">{{ t('app.s') }}</span>
                        <span class="text-main-gray text-sm">({{ t('app.car_form.time') }})</span>
                    </div>
                </div>

                <p class="text-xl">{{ t('app.to') }} 100 {{ t('app.km_h') }}</p>
            </div>
        </div>

        <div>
            <h4
                class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg flex items-center gap-3"
            >
                {{ t('app.transmission') }}
                <p class="mt-1 text-sm text-red-500">
                    {{
                        v$.details.transmission.$error
                            ? v$.details.transmission.$errors[0].$message
                            : ''
                    }}
                </p>
            </h4>
            <Input
                v-model="car.details.transmission"
                size="medium"
                :is-error="v$.details.transmission.$error"
                :min="0"
                :placeholder="t('app.car_form.auto')"
                class="border border-main-border p-4"
            />
        </div>

        <div>
            <h4
                class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg flex items-center gap-3"
            >
                {{ t('app.power') }}
                <p class="mt-1 text-sm text-red-500">
                    {{
                        v$.details.horsepower.$error
                            ? v$.details.horsepower.$errors[0].$message
                            : v$.details.torqueNm.$error
                              ? v$.details.torqueNm.$errors[0].$message
                              : ''
                    }}
                </p>
            </h4>
            <div class="flex items-center gap-3 border border-t-0 border-main-border p-4">
                <div class="flex items-center gap-1">
                    <Input
                        type="number"
                        v-model="car.details.horsepower"
                        :is-error="v$.details.horsepower.$error"
                        :min="0"
                        size="medium"
                        placeholder="640"
                        class="w-18"
                    />
                    <span class="text-xl">{{ t('app.hp') }}</span>
                </div>

                <p class="text-xl">/</p>

                <div class="flex items-center gap-1">
                    <Input
                        type="number"
                        v-model="car.details.torqueNm"
                        :is-error="v$.details.torqueNm.$error"
                        :min="0"
                        size="medium"
                        placeholder="600"
                        class="w-18"
                    />
                    <span class="text-xl">{{ t('app.nm') }}</span>
                </div>
            </div>
        </div>

        <div>
            <h4
                class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg flex items-center gap-3"
            >
                {{ t('app.number_of_seats') }}
                <p class="mt-1 text-sm text-red-500">
                    {{
                        v$.details.numberOfSeats.$error
                            ? v$.details.numberOfSeats.$errors[0].$message
                            : ''
                    }}
                </p>
            </h4>
            <Input
                type="number"
                v-model="car.details.numberOfSeats"
                :is-error="v$.details.numberOfSeats.$error"
                :min="0"
                size="medium"
                placeholder="2"
                class="border border-t-0 border-main-border p-4"
            />
        </div>
    </div>
</template>
