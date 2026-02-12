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
    };
</script>

<template>
    <section class="lg:w-1/2">
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
            <div class="flex gap-3">
                <div class="w-1/4">
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
                <div class="w-3/4">
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

            <div class="relative border border-main-border rounded-md w-1/2">
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
                    <h4 class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg">
                        {{ t('app.acceleration') }}
                    </h4>
                    <div class="flex items-center gap-3 border border-t-0 border-main-border p-4">
                        <div class="flex items-center gap-1">
                            <Input size="medium" type="number" placeholder="2.8" class="w-18" />
                            <div class="flex gap-2 items-end">
                                <span class="text-xl">s</span>
                                <span class="text-main-gray text-sm">(time)</span>
                            </div>
                        </div>

                        <p class="text-xl">to</p>

                        <div class="flex items-center gap-1">
                            <Input size="medium" type="number" placeholder="100" class="w-18" />
                            <span class="text-xl">km/h</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg">
                        {{ t('app.transmission') }}
                    </h4>
                    <Input size="medium" placeholder="Auto" class="border border-main-border p-4" />
                </div>

                <div>
                    <h4 class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg">
                        {{ t('app.power') }}
                    </h4>
                    <div class="flex items-center gap-3 border border-t-0 border-main-border p-4">
                        <div class="flex items-center gap-1">
                            <Input size="medium" type="number" placeholder="640" class="w-18" />
                            <span class="text-xl">KM</span>
                        </div>

                        <p class="text-xl">/</p>

                        <div class="flex items-center gap-1">
                            <Input size="medium" type="number" placeholder="600" class="w-18" />
                            <span class="text-xl">Nm</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="text-lg border border-main-border py-2 px-4 bg-main-gray-bg">
                        {{ t('app.number_of_seats') }}
                    </h4>
                    <Input
                        type="number"
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
                <h4 class="text-lg mt-4 mb-1">
                    {{ t('app.car_form.deposit') }} ({{ t('app.zl') }})
                </h4>
                <Input size="medium" type="number" placeholder="30000" />
            </div>

            <div class="mt-4">
                <h4 class="text-lg mt-4 mb-1">
                    {{ t('app.car_form.pricing_periods') }}
                </h4>

                <!-- change this to table look -->
                <!-- days | price -->
                <!-- 1 day | 3800 -->

                <table class="w-full xl:w-1/2">
                    <thead class="bg-main-gray-bg">
                        <tr class="">
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
                                    size="medium"
                                    type="number"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.2_3_days') }}</td>
                            <td>
                                <Input
                                    size="medium"
                                    type="number"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.4_6_days') }}</td>
                            <td>
                                <Input
                                    size="medium"
                                    type="number"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.7_13_days') }}</td>
                            <td>
                                <Input
                                    size="medium"
                                    type="number"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.14_29_days') }}</td>
                            <td>
                                <Input
                                    size="medium"
                                    type="number"
                                    placeholder="500"
                                    class="py-2 px-4"
                                />
                            </td>
                        </tr>
                        <tr class="border border-t-0 border-main-border">
                            <td class="py-2 px-4">{{ t('app.prices.month') }}</td>
                            <td>
                                <Input
                                    size="medium"
                                    type="number"
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
