<script setup lang="ts">
    import type { CarForm } from '@/entities/car';
    import { Button, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const car = defineModel<CarForm>({ required: true });

    const props = defineProps<{
        rules: ValidationArgs<CarForm>;
    }>();

    const v$ = useVuelidate(props.rules, car);

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        console.log(isValid);
        console.log(car.value);
    };
</script>

<template>
    <section class="xl:w-2/3 2xl:w-1/2">
        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    1
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_name') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_name_desc') }}
                    </p>
                </div>
            </div>
            <div class="space-y-3 lg:flex lg:space-y-0 gap-3">
                <div class="w-full lg:w-1/4">
                    <Input
                        size="medium"
                        v-model="car.brand"
                        :is-error="v$.brand.$error"
                        :placeholder="t('app.car_form.car_brand')"
                    />
                    <p
                        v-for="e in v$.brand.$errors"
                        :key="e.$uid"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ e.$message }}
                    </p>
                </div>
                <div class="w-full lg:w-3/4">
                    <Input
                        size="medium"
                        v-model="car.name"
                        :is-error="v$.name.$error"
                        :placeholder="t('app.car_form.car_full_name')"
                    />
                    <p v-for="e in v$.name.$errors" :key="e.$uid" class="mt-1 text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    2
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_images') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_images_desc') }}
                    </p>
                </div>
            </div>

            <p v-for="e in v$.image.$errors" :key="e.$uid" class="mt-1 text-sm text-red-500">
                {{ e.$message }}
            </p>
            <div
                class="relative border rounded-md w-1/2"
                :class="v$.image.$error ? 'border-red-500' : 'border-main-border'"
            >
                <!-- Hidden real input -->
                <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" />

                <!-- Custom UI -->

                <div class="pl-10 py-2 pointer-events-none text-gray-500">
                    {{ t('app.car_form.select_image') }}
                </div>

                <Icon
                    icon="proicons:attach"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-xl"
                />
            </div>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    3
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_details') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_details_desc') }}
                    </p>
                </div>
            </div>

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
                                <span class="text-xl">s</span>
                                <span class="text-main-gray text-sm">(time)</span>
                            </div>
                        </div>

                        <p class="text-xl">to 100km/h</p>
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
                        placeholder="Auto"
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
                            <span class="text-xl">KM</span>
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
                            <span class="text-xl">Nm</span>
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
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    4
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_pricing') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_pricing_desc') }}
                    </p>
                </div>
            </div>

            <div>
                <h4 class="text-lg mt-4 mb-1 flex items-center gap-3">
                    {{ t('app.car_form.deposit') }} ({{ t('app.zl') }})
                    <p class="mt-1 text-sm text-red-500">
                        {{ v$.deposit.$error ? v$.deposit.$errors[0]?.$message : '' }}
                    </p>
                </h4>
                <Input
                    type="number"
                    v-model="car.deposit"
                    :is-error="v$.deposit.$error"
                    size="medium"
                    placeholder="30000"
                />
            </div>

            <div class="mt-4">
                <h4 class="text-lg mt-4 mb-1">
                    {{ t('app.car_form.pricing_periods') }}
                </h4>

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
                                    type="number"
                                    :is-error="v$.pricing.day.$error"
                                    size="medium"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.2_3_days') }}</td>
                            <td>
                                <Input
                                    v-model="car.pricing.days2_3"
                                    size="medium"
                                    type="number"
                                    :is-error="v$.pricing.days2_3.$error"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.4_6_days') }}</td>
                            <td>
                                <Input
                                    v-model="car.pricing.days4_6"
                                    size="medium"
                                    type="number"
                                    :is-error="v$.pricing.days4_6.$error"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.7_13_days') }}</td>
                            <td>
                                <Input
                                    v-model="car.pricing.days7_13"
                                    size="medium"
                                    type="number"
                                    :is-error="v$.pricing.days7_13.$error"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.14_29_days') }}</td>
                            <td>
                                <Input
                                    v-model="car.pricing.days14_29"
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
            </div>
        </div>

        <div class="mb-6 space-x-2 flex justify-end">
            <RouterLink to="/admin/rentals">
                <Button size="sm" color="transparent">{{ t('app.button.cancel') }}</Button>
            </RouterLink>
            <Button @click="handleSubmit" :disabled="v$.$error" size="sm">
                {{ t('app.button.submit') }}
            </Button>
        </div>
    </section>
</template>
