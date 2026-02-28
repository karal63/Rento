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
    <table class="w-full xl:w-1/2">
        <thead class="bg-main-gray-bg">
            <tr>
                <td class="text-left border border-main-border px-4 py-2 w-1/2">
                    {{ t('app.car_form.rental_period') }}
                </td>
                <td class="text-left border border-main-border px-4 py-2 w-1/2">
                    {{ t('app.car_form.price_per_day') }} ({{ t('app.zl') }})
                </td>
            </tr>
        </thead>
        <tbody>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.day') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.day"
                        :min="0"
                        type="number"
                        :is-error="v$.pricing.day.$error"
                        size="medium"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.days2_3') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.days2_3"
                        :min="0"
                        size="medium"
                        type="number"
                        :is-error="v$.pricing.days2_3.$error"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.days4_6') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.days4_6"
                        :min="0"
                        size="medium"
                        type="number"
                        :is-error="v$.pricing.days4_6.$error"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.days7_13') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.days7_13"
                        :min="0"
                        size="medium"
                        type="number"
                        :is-error="v$.pricing.days7_13.$error"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.days14_29') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.days14_29"
                        :min="0"
                        size="medium"
                        type="number"
                        :is-error="v$.pricing.days14_29.$error"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
            <tr class="border border-t-0 border-main-border">
                <td class="py-2 px-4">{{ t('app.prices.month') }}</td>
                <td>
                    <Input
                        v-model="car.pricing.month"
                        :min="0"
                        size="medium"
                        type="number"
                        :is-error="v$.pricing.month.$error"
                        placeholder="500"
                        class="py-2 px-4"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
